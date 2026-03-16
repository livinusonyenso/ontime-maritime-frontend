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
    // expiry comes from JwtModule.registerAsync ({ expiresIn: '15m' })
  }

  private async generateAndStoreRefreshToken(userId: string): Promise<string> {
    const raw = randomBytes(64).toString("hex")
    const hashed = await bcrypt.hash(raw, 10)
    const expiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

    await this.prisma.user.update({
      where: { id: userId },
      data: { refresh_token: hashed, refresh_token_expiry: expiry },
    })

    return raw  // raw token goes into the cookie; hashed stays in DB
  }

  /** Attach the httpOnly refresh-token cookie to an Express response. */
  static setRefreshCookie(res: any, token: string) {
    res.cookie(REFRESH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      path: "/",
    })
  }

  /** Clear the refresh-token cookie (logout). */
  static clearRefreshCookie(res: any) {
    res.clearCookie(REFRESH_COOKIE_NAME, { httpOnly: true, secure: true, sameSite: "strict", path: "/" })
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

    await this.prisma.pendingRegistration.deleteMany({
      where: { OR: [{ email }, { phone }] },
    })

    const password_hash = await bcrypt.hash(password, 10)
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString()

    const pending = await this.prisma.pendingRegistration.create({
      data: {
        email, phone, password_hash, role,
        otp_code,
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
        company_name:     company_name     ?? null,
        business_address: business_address ?? null,
        website:          website          ?? null,
      },
    })

    const sent = await this.mailService.sendOtpEmail(email, otp_code)
    if (!sent) this.logger.error(`OTP email failed to deliver to ${email}`)

    return { pendingId: pending.id, message: "OTP sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* VERIFY OTP — creates user, issues both tokens                       */
  /* ------------------------------------------------------------------ */
  async verifyOtp(pendingId: string, otpCode: string, res: any) {
    const pending = await this.prisma.pendingRegistration.findFirst({
      where: { id: pendingId, otp_code: otpCode, expires_at: { gt: new Date() } },
    })

    if (!pending) throw new BadRequestException("Invalid or expired OTP.")

    const user = await this.prisma.user.create({
      data: {
        email:            pending.email,
        phone:            pending.phone,
        password_hash:    pending.password_hash,
        role:             pending.role as UserRole,
        is_email_verified: true,
        is_phone_verified: true,
        company_name:     pending.company_name     ?? null,
        business_address: pending.business_address ?? null,
        website:          pending.website          ?? null,
      },
    })

    await this.prisma.pendingRegistration.delete({ where: { id: pending.id } })

    this.mailService.sendWelcomeEmail(user.email).catch((err) =>
      this.logger.error(`Welcome email failed for ${user.email}: ${err.message}`),
    )

    const accessToken   = this.generateAccessToken(user)
    const refreshToken  = await this.generateAndStoreRefreshToken(user.id)
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
          { message: "Your registration is not complete. Please verify your email to continue.", code: "EMAIL_NOT_VERIFIED", email },
          HttpStatus.UNAUTHORIZED,
        )
      }
      throw new UnauthorizedException("Invalid credentials.")
    }

    if (user.lock_until && user.lock_until > new Date()) {
      const minutesLeft = Math.ceil((user.lock_until.getTime() - Date.now()) / 60_000)
      throw new HttpException(
        { message: `Account temporarily locked. Try again in ${minutesLeft} minute(s).`, code: "ACCOUNT_LOCKED" },
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      const attempts   = (user.failed_login_attempts ?? 0) + 1
      const shouldLock = attempts >= this.MAX_FAILED_ATTEMPTS

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failed_login_attempts: attempts,
          lock_until: shouldLock ? new Date(Date.now() + this.LOCKOUT_MINUTES * 60_000) : null,
        },
      })

      this.logger.warn(`Failed login for ${email} from ${ip} — attempt ${attempts}${shouldLock ? " → LOCKED" : ""}`)

      if (shouldLock) {
        throw new HttpException(
          { message: `Too many failed attempts. Account locked for ${this.LOCKOUT_MINUTES} minutes.`, code: "ACCOUNT_LOCKED" },
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

    // Find a user whose refresh token expiry is still valid
    // We'll find all non-expired users and compare hashes (can't query by hash)
    // For scale, a separate RefreshToken table is better; for now we scan active sessions
    const users = await this.prisma.user.findMany({
      where: { refresh_token: { not: null }, refresh_token_expiry: { gt: new Date() } },
      select: {
        id: true, email: true, role: true,
        refresh_token: true, refresh_token_expiry: true,
      },
    })

    let matchedUser: typeof users[0] | null = null
    for (const u of users) {
      if (u.refresh_token && await bcrypt.compare(cookieToken, u.refresh_token)) {
        matchedUser = u
        break
      }
    }

    if (!matchedUser) {
      AuthService.clearRefreshCookie(res)
      throw new UnauthorizedException("Invalid or expired refresh token.")
    }

    // Rotate — generate brand-new tokens
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
      return { message: "If a pending registration exists, a new OTP has been sent." }
    }

    const otp_code = Math.floor(100000 + Math.random() * 900000).toString()

    const updated = await this.prisma.pendingRegistration.update({
      where: { id: pending.id },
      data: { otp_code, expires_at: new Date(Date.now() + 10 * 60 * 1000) },
    })

    const sent = await this.mailService.sendOtpEmail(email, otp_code)
    if (!sent) this.logger.error(`Resend OTP email failed for ${email}`)

    return { pendingId: updated.id, message: "A new OTP has been sent to your email." }
  }

  /* ------------------------------------------------------------------ */
  /* FORGOT PASSWORD                                                      */
  /* ------------------------------------------------------------------ */
  private readonly SAFE_RESET_RESPONSE = { message: "If the email exists, an OTP has been sent." }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return this.SAFE_RESET_RESPONSE

    await this.prisma.otpToken.updateMany({
      where: { email, purpose: "password_reset", is_used: false },
      data: { is_used: true },
    })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otp_hash = await bcrypt.hash(otp, 10)

    await this.prisma.otpToken.create({
      data: {
        user_id: user.id, email,
        otp_code: otp_hash,
        purpose: "password_reset",
        expires_at: new Date(Date.now() + 10 * 60 * 1000),
      },
    })

    this.mailService.sendPasswordResetEmail(email, otp).catch((err) =>
      this.logger.error(`Password-reset email failed for ${email}: ${err.message}`),
    )

    return this.SAFE_RESET_RESPONSE
  }

  /* ------------------------------------------------------------------ */
  /* VERIFY RESET OTP                                                     */
  /* ------------------------------------------------------------------ */
  async verifyResetOtp(email: string, otp: string) {
    const token = await this.prisma.otpToken.findFirst({
      where: { email, purpose: "password_reset", is_used: false, expires_at: { gt: new Date() } },
      orderBy: { created_at: "desc" },
    })

    const invalid = !token || !(await bcrypt.compare(otp, token.otp_code))
    if (invalid) throw new BadRequestException("Invalid or expired OTP.")

    await this.prisma.otpToken.update({ where: { id: token.id }, data: { is_used: true } })

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

    if (payload.purpose !== "password_reset") throw new BadRequestException("Invalid reset token.")

    const password_hash = await bcrypt.hash(newPassword, 10)
    await this.prisma.user.update({ where: { email: payload.email }, data: { password_hash } })

    return { message: "Password reset successful." }
  }
}
