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
import { randomBytes } from "crypto"
import { SignupDto } from "./dto/signup.dto"
import { LoginDto } from "./dto/login.dto"
import { MailService } from "../notifications/mail.service"
import { UserRole } from "../../common/enums"

const REFRESH_TOKEN_EXPIRY_DAYS = 7
const REFRESH_COOKIE_NAME = "ontime_refresh"

/** Always use UTC "now" so Node.js and MySQL agree on the current time. */
const utcNow = () => new Date(new Date().toISOString())

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // ── Internal helpers ────────────────────────────────────────────────────────

  private generateAccessToken(user: { id: string; email: string; role: string }) {
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role })
  }

  private async generateAndStoreRefreshToken(userId: string): Promise<string> {
    const raw = randomBytes(64).toString("hex")
    const hashed = await bcrypt.hash(raw, 10)
    const expiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

    await this.prisma.user.update({
      where: { id: userId },
      data: { refresh_token: hashed, refresh_token_expiry: expiry },
    })

    return raw
  }

  static setRefreshCookie(res: any, token: string) {
    res.cookie(REFRESH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      path: "/",
    })
  }

  static clearRefreshCookie(res: any) {
    res.clearCookie(REFRESH_COOKIE_NAME, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    })
  }

  /* ------------------------------------------------------------------ */
  /* SIGNUP                                                               */
  /* ------------------------------------------------------------------ */
  async signup(signupDto: SignupDto) {
    const { email, phone, password, role, company_name, business_address, website } = signupDto

    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    })
    if (existingUser) {
      throw new BadRequestException("An account with this email or phone already exists.")
    }

    // Clean up any previous pending registrations for this email/phone
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
        otp_code, // stored plain — temporary table, deleted after verification
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
        company_name:     company_name     ?? null,
        business_address: business_address ?? null,
        website:          website          ?? null,
      },
    })

    const sent = await this.mailService.sendOtpEmail(email, otp_code)
    if (!sent) {
      await this.prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => {})
      this.logger.error(
        `OTP email failed for ${email} — host=${process.env.MAIL_HOST} port=${process.env.MAIL_PORT} user=${process.env.MAIL_USER ? "***set***" : "MISSING"}`,
      )
      throw new HttpException(
        { message: "We could not send your verification email. Please check your email address and try again, or contact support." },
        HttpStatus.SERVICE_UNAVAILABLE,
      )
    }

    return { pendingId: pending.id, message: "OTP sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* VERIFY OTP — creates user, issues both tokens                       */
  /* ------------------------------------------------------------------ */
  async verifyOtp(pendingId: string, otpCode: string, res: any) {
    // Fetch pending record by ID first (no OTP in WHERE — compare manually below)
    const pending = await this.prisma.pendingRegistration.findUnique({
      where: { id: pendingId },
    })

    if (!pending) {
      throw new BadRequestException("Invalid or expired OTP.")
    }

    // Check expiry using UTC now to avoid timezone mismatch
    if (pending.expires_at < utcNow()) {
      await this.prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => {})
      throw new BadRequestException("OTP has expired. Please request a new one.")
    }

    // Plain string comparison (OTP stored as plain text in pending_registration)
    if (pending.otp_code !== otpCode) {
      throw new BadRequestException("Invalid OTP. Please check the code and try again.")
    }

    const user = await this.prisma.user.create({
      data: {
        email:             pending.email,
        phone:             pending.phone,
        password_hash:     pending.password_hash,
        role:              pending.role as UserRole,
        is_email_verified: true,
        is_phone_verified: true,
        company_name:      pending.company_name     ?? null,
        business_address:  pending.business_address ?? null,
        website:           pending.website          ?? null,
      },
    })

    await this.prisma.pendingRegistration.delete({ where: { id: pending.id } })

    this.mailService.sendWelcomeEmail(user.email).catch((err) =>
      this.logger.error(`Welcome email failed for ${user.email}: ${err.message}`),
    )

    const accessToken  = this.generateAccessToken(user)
    const refreshToken = await this.generateAndStoreRefreshToken(user.id)
    AuthService.setRefreshCookie(res, refreshToken)

    const { password_hash, refresh_token, refresh_token_expiry, ...safe } = user as any
    return { access_token: accessToken, user: safe }
  }

  /* ------------------------------------------------------------------ */
  /* LOGIN                                                                */
  /* ------------------------------------------------------------------ */
  private readonly MAX_FAILED_ATTEMPTS = 5
  private readonly LOCKOUT_MINUTES     = 15

  async login(loginDto: LoginDto, res: any, ip = "unknown") {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      const pending = await this.prisma.pendingRegistration.findUnique({ where: { email } })
      if (pending) {
        throw new HttpException(
          {
            message: "Your registration is not complete. Please verify your email to continue.",
            code: "EMAIL_NOT_VERIFIED",
            email,
          },
          HttpStatus.UNAUTHORIZED,
        )
      }
      throw new UnauthorizedException("Invalid credentials.")
    }

    // Check account lock using UTC now
    if (user.lock_until && user.lock_until > utcNow()) {
      const minutesLeft = Math.ceil((user.lock_until.getTime() - Date.now()) / 60_000)
      throw new HttpException(
        {
          message: `Account temporarily locked. Try again in ${minutesLeft} minute(s).`,
          code: "ACCOUNT_LOCKED",
          lock_until: user.lock_until.toISOString(),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      const attempts   = (user.failed_login_attempts ?? 0) + 1
      const shouldLock = attempts >= this.MAX_FAILED_ATTEMPTS
      const lockUntil  = shouldLock ? new Date(Date.now() + this.LOCKOUT_MINUTES * 60_000) : null

      await this.prisma.user.update({
        where: { id: user.id },
        data: { failed_login_attempts: attempts, lock_until: lockUntil },
      })

      this.logger.warn(
        `Failed login for ${email} from ${ip} — attempt ${attempts}${shouldLock ? " → LOCKED" : ""}`,
      )

      if (shouldLock) {
        throw new HttpException(
          {
            message: `Too many failed attempts. Account locked for ${this.LOCKOUT_MINUTES} minutes.`,
            code: "ACCOUNT_LOCKED",
            lock_until: lockUntil!.toISOString(),
          },
          HttpStatus.TOO_MANY_REQUESTS,
        )
      }

      throw new UnauthorizedException("Invalid credentials.")
    }

    if (!user.is_email_verified) {
      throw new HttpException(
        { message: "Your email address is not verified.", code: "EMAIL_NOT_VERIFIED", email },
        HttpStatus.UNAUTHORIZED,
      )
    }

    // Reset failed attempts on successful login
    if (user.failed_login_attempts > 0 || user.lock_until) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failed_login_attempts: 0, lock_until: null },
      })
    }

    const accessToken  = this.generateAccessToken(user)
    const refreshToken = await this.generateAndStoreRefreshToken(user.id)
    AuthService.setRefreshCookie(res, refreshToken)

    const { password_hash, refresh_token, refresh_token_expiry, ...safe } = user as any
    return { access_token: accessToken, user: safe }
  }

  /* ------------------------------------------------------------------ */
  /* REFRESH — rotate tokens                                              */
  /* ------------------------------------------------------------------ */
  async refresh(cookieToken: string | undefined, res: any) {
    if (!cookieToken) throw new UnauthorizedException("No refresh token.")

    const users = await this.prisma.user.findMany({
      where: {
        refresh_token: { not: null },
        refresh_token_expiry: { gt: utcNow() },
      },
      select: {
        id: true,
        email: true,
        role: true,
        refresh_token: true,
        refresh_token_expiry: true,
      },
    })

    let matchedUser: (typeof users)[0] | null = null
    for (const u of users) {
      if (u.refresh_token && (await bcrypt.compare(cookieToken, u.refresh_token))) {
        matchedUser = u
        break
      }
    }

    if (!matchedUser) {
      AuthService.clearRefreshCookie(res)
      throw new UnauthorizedException("Invalid or expired refresh token.")
    }

    const accessToken  = this.generateAccessToken(matchedUser as any)
    const refreshToken = await this.generateAndStoreRefreshToken(matchedUser.id)
    AuthService.setRefreshCookie(res, refreshToken)

    return { access_token: accessToken }
  }

  /* ------------------------------------------------------------------ */
  /* LOGOUT                                                               */
  /* ------------------------------------------------------------------ */
  async logout(userId: string, res: any) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refresh_token: null, refresh_token_expiry: null },
    })
    AuthService.clearRefreshCookie(res)
    return { message: "Logged out successfully." }
  }

  /* ------------------------------------------------------------------ */
  /* RESEND OTP                                                           */
  /* ------------------------------------------------------------------ */
  async resendOtp(email: string) {
    const pending = await this.prisma.pendingRegistration.findUnique({ where: { email } })

    if (!pending) {
      // Don't reveal whether the email exists
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
      this.logger.error(
        `Resend OTP failed for ${email} — host=${process.env.MAIL_HOST} user=${process.env.MAIL_USER ? "***set***" : "MISSING"}`,
      )
      throw new HttpException(
        { message: "We could not resend your verification email. Please try again or contact support." },
        HttpStatus.SERVICE_UNAVAILABLE,
      )
    }

    return { pendingId: updated.id, message: "A new OTP has been sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* FORGOT PASSWORD                                                      */
  /* ------------------------------------------------------------------ */
  private readonly SAFE_RESET_RESPONSE = { message: "If the email exists, an OTP has been sent." }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return this.SAFE_RESET_RESPONSE

    // Invalidate any existing unused OTPs for this email
    await this.prisma.otpToken.updateMany({
      where: { email, purpose: "password_reset", is_used: false },
      data: { is_used: true },
    })

    const otp     = Math.floor(100000 + Math.random() * 900000).toString()
    const otp_hash = await bcrypt.hash(otp, 10)

    await this.prisma.otpToken.create({
      data: {
        user_id:    user.id,
        email,
        otp_code:   otp_hash,
        purpose:    "password_reset",
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    const sent = await this.mailService.sendPasswordResetEmail(email, otp)
    if (!sent) {
      // Revoke the OTP we just created so it can't be guessed
      await this.prisma.otpToken.updateMany({
        where: { email, purpose: "password_reset", is_used: false },
        data: { is_used: true },
      })
      this.logger.error(
        `Password-reset email failed for ${email} — host=${process.env.MAIL_HOST} user=${process.env.MAIL_USER ? "***set***" : "MISSING"}`,
      )
      throw new HttpException(
        { message: "We could not send your password-reset email. Please try again or contact support." },
        HttpStatus.SERVICE_UNAVAILABLE,
      )
    }

    return this.SAFE_RESET_RESPONSE
  }

  /* ------------------------------------------------------------------ */
  /* VERIFY RESET OTP                                                     */
  /* ------------------------------------------------------------------ */
  async verifyResetOtp(email: string, otp: string) {
    // Fetch the latest unused, non-expired OTP for this email
    const token = await this.prisma.otpToken.findFirst({
      where: {
        email,
        purpose:    "password_reset",
        is_used:    false,
        expires_at: { gt: utcNow() }, // UTC comparison — fixes timezone mismatch
      },
      orderBy: { created_at: "desc" },
    })

    if (!token) {
      throw new BadRequestException("OTP has expired or was already used. Please request a new one.")
    }

    const isValid = await bcrypt.compare(otp, token.otp_code)
    if (!isValid) {
      throw new BadRequestException("Invalid OTP. Please check the code and try again.")
    }

    // Mark as used immediately so it can't be reused
    await this.prisma.otpToken.update({
      where: { id: token.id },
      data: { is_used: true },
    })

    const resetToken = this.jwtService.sign(
      { email, purpose: "password_reset" },
      { expiresIn: "15m" },
    )

    return { resetToken }
  }

  /* ------------------------------------------------------------------ */
  /* RESET PASSWORD                                                       */
  /* ------------------------------------------------------------------ */
  async resetPassword(resetToken: string, newPassword: string) {
    let payload: { email: string; purpose: string }

    try {
      payload = this.jwtService.verify(resetToken)
    } catch {
      throw new BadRequestException("Invalid or expired reset token.")
    }

    if (payload.purpose !== "password_reset") {
      throw new BadRequestException("Invalid reset token.")
    }

    const password_hash = await bcrypt.hash(newPassword, 10)
    await this.prisma.user.update({
      where: { email: payload.email },
      data: { password_hash },
    })

    return { message: "Password reset successful." }
  }

  /* ------------------------------------------------------------------ */
  /* RESEND EMAIL VERIFICATION (magic link for users already in DB)      */
  /* ------------------------------------------------------------------ */
  async resendEmailVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    // Always return success to avoid email enumeration
    if (!user || user.is_email_verified) {
      return { message: "If your account exists and is unverified, a link has been sent." }
    }

    // Invalidate any previous unused email-verification tokens
    await this.prisma.otpToken.updateMany({
      where: { email, purpose: "email_verification", is_used: false },
      data: { is_used: true },
    })

    const rawToken  = randomBytes(32).toString("hex")       // 64-char hex
    const tokenHash = await bcrypt.hash(rawToken, 10)

    await this.prisma.otpToken.create({
      data: {
        user_id:    user.id,
        email,
        otp_code:   tokenHash,
        purpose:    "email_verification",
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 h
      },
    })

    const sent = await this.mailService.sendEmailVerificationLink(email, rawToken)
    if (!sent) {
      await this.prisma.otpToken.updateMany({
        where: { email, purpose: "email_verification", is_used: false },
        data: { is_used: true },
      })
      this.logger.error(`Email verification link failed for ${email}`)
      throw new HttpException(
        { message: "Could not send verification email. Please try again or contact support." },
        HttpStatus.SERVICE_UNAVAILABLE,
      )
    }

    return { message: "A verification link has been sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* VERIFY EMAIL TOKEN (called when user clicks magic link)             */
  /* ------------------------------------------------------------------ */
  async verifyEmailToken(email: string, rawToken: string) {
    const token = await this.prisma.otpToken.findFirst({
      where: {
        email,
        purpose:    "email_verification",
        is_used:    false,
        expires_at: { gt: utcNow() },
      },
      orderBy: { created_at: "desc" },
    })

    if (!token) {
      throw new BadRequestException("Verification link is invalid or has expired. Please request a new one.")
    }

    const isValid = await bcrypt.compare(rawToken, token.otp_code)
    if (!isValid) {
      throw new BadRequestException("Verification link is invalid or has expired. Please request a new one.")
    }

    await this.prisma.otpToken.update({ where: { id: token.id }, data: { is_used: true } })
    await this.prisma.user.update({ where: { email }, data: { is_email_verified: true } })

    return { message: "Email verified successfully. You can now log in." }
  }
}