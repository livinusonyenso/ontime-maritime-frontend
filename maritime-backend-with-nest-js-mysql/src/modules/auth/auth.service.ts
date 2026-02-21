import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../../prisma/prisma.service"
import * as bcrypt from "bcryptjs"
import { SignupDto } from "./dto/signup.dto"
import { LoginDto } from "./dto/login.dto"
import { MailService } from "../notifications/mail.service"
import { UserRole } from "../../common/enums"

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  /* ------------------------------------------------------------------ */
  /* SIGNUP — creates a PendingRegistration, sends OTP.                  */
  /* No user account is created until OTP is verified.                   */
  /* ------------------------------------------------------------------ */
  async signup(signupDto: SignupDto) {
    const { email, phone, password, role } = signupDto

    // Block if a fully verified user already exists with this email or phone
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    })
    if (existingUser) {
      throw new BadRequestException(
        "An account with this email or phone already exists.",
      )
    }

    // Remove any stale pending registration for this email/phone so the
    // user can retry without hitting unique-constraint errors.
    await this.prisma.pendingRegistration.deleteMany({
      where: { OR: [{ email }, { phone }] },
    })

    const password_hash = await bcrypt.hash(password, 10)
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString()

    const pending = await this.prisma.pendingRegistration.create({
      data: {
        email,
        phone,
        password_hash,
        role,
        otp_code,
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    const sent = await this.mailService.sendOtpEmail(email, otp_code)
    if (!sent) {
      this.logger.error(`OTP email failed to deliver to ${email}`)
    }

    return { pendingId: pending.id, message: "OTP sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* VERIFY OTP — validates OTP, creates the real user, sends welcome.   */
  /* ------------------------------------------------------------------ */
  async verifyOtp(pendingId: string, otpCode: string) {
    const pending = await this.prisma.pendingRegistration.findFirst({
      where: {
        id: pendingId,
        otp_code: otpCode,
        expires_at: { gt: new Date() },
      },
    })

    if (!pending) {
      throw new BadRequestException("Invalid or expired OTP.")
    }

    // Create the real user account — only happens on successful OTP
    const user = await this.prisma.user.create({
      data: {
        email: pending.email,
        phone: pending.phone,
        password_hash: pending.password_hash,
        role: pending.role as UserRole,
        is_email_verified: true,
        is_phone_verified: true,
      },
    })

    // Clean up the temporary registration record
    await this.prisma.pendingRegistration.delete({ where: { id: pending.id } })

    // Send welcome email (non-blocking)
    this.mailService.sendWelcomeEmail(user.email).catch((err) =>
      this.logger.error(`Welcome email failed for ${user.email}: ${err.message}`),
    )

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    const { password_hash, ...userWithoutPassword } = user
    return { access_token: token, user: userWithoutPassword }
  }

  /* ------------------------------------------------------------------ */
  /* LOGIN — blocks accounts where email is not verified.                */
  /* ------------------------------------------------------------------ */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      // If there's a pending registration, surface a helpful message
      const pending = await this.prisma.pendingRegistration.findUnique({
        where: { email },
      })
      if (pending) {
        throw new HttpException(
          {
            message:
              "Your registration is not complete. Please verify your email to continue.",
            code: "EMAIL_NOT_VERIFIED",
            email,
          },
          HttpStatus.UNAUTHORIZED,
        )
      }
      throw new UnauthorizedException("Invalid credentials.")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials.")
    }

    // Legacy guard for any user without a verified email
    if (!user.is_email_verified) {
      throw new HttpException(
        {
          message:
            "Your email address is not verified. Please verify your email to continue.",
          code: "EMAIL_NOT_VERIFIED",
          email,
        },
        HttpStatus.UNAUTHORIZED,
      )
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    const { password_hash, ...userWithoutPassword } = user
    return { access_token: token, user: userWithoutPassword }
  }

  /* ------------------------------------------------------------------ */
  /* RESEND OTP — regenerates OTP for a pending registration.            */
  /* ------------------------------------------------------------------ */
  async resendOtp(email: string) {
    const pending = await this.prisma.pendingRegistration.findUnique({
      where: { email },
    })

    if (!pending) {
      // Same response regardless to avoid email enumeration
      return { message: "If a pending registration exists, a new OTP has been sent." }
    }

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString()

    const updated = await this.prisma.pendingRegistration.update({
      where: { id: pending.id },
      data: {
        otp_code,
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    const sent = await this.mailService.sendOtpEmail(email, otp_code)
    if (!sent) {
      this.logger.error(`Resend OTP email failed for ${email}`)
    }

    return { pendingId: updated.id, message: "A new OTP has been sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* FORGOT PASSWORD — sends a password-reset OTP to the user's email.   */
  /* Always returns the same message to prevent email enumeration.       */
  /* ------------------------------------------------------------------ */
  private readonly SAFE_RESET_RESPONSE = {
    message: "If the email exists, an OTP has been sent.",
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    // Silently succeed if user not found — do not reveal whether email exists
    if (!user) {
      return this.SAFE_RESET_RESPONSE
    }

    // Invalidate all previous unused password-reset OTPs for this email
    await this.prisma.otpToken.updateMany({
      where: { email, purpose: "password_reset", is_used: false },
      data: { is_used: true },
    })

    // Generate OTP, hash it before persisting
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otp_hash = await bcrypt.hash(otp, 10)

    await this.prisma.otpToken.create({
      data: {
        user_id: user.id,
        email,
        otp_code: otp_hash,
        purpose: "password_reset",
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    // Send email non-blocking — failure is logged, never leaked to caller
    this.mailService.sendPasswordResetEmail(email, otp).catch((err) =>
      this.logger.error(`Password-reset email failed for ${email}: ${err.message}`),
    )

    return this.SAFE_RESET_RESPONSE
  }

  /* ------------------------------------------------------------------ */
  /* RESET PASSWORD — validates OTP, updates password, invalidates OTP.  */
  /* ------------------------------------------------------------------ */
  async resetPassword(email: string, otp: string, newPassword: string) {
    // Fetch the latest unused, unexpired password-reset token for this email
    const token = await this.prisma.otpToken.findFirst({
      where: {
        email,
        purpose: "password_reset",
        is_used: false,
        expires_at: { gt: new Date() },
      },
      orderBy: { created_at: "desc" },
    })

    // Validate token existence and OTP hash — same error for all failure modes
    const invalid = !token || !(await bcrypt.compare(otp, token.otp_code))
    if (invalid) {
      throw new BadRequestException("Invalid or expired OTP.")
    }

    const password_hash = await bcrypt.hash(newPassword, 10)

    // Update password and mark OTP used atomically
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { email },
        data: { password_hash },
      }),
      this.prisma.otpToken.update({
        where: { id: token.id },
        data: { is_used: true },
      }),
    ])

    return { message: "Password reset successful." }
  }
}
