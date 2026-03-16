import { Controller, Post, Body, Req, Res, UseGuards } from "@nestjs/common"
import { Throttle, SkipThrottle } from "@nestjs/throttler"
import { Request, Response } from "express"
import { AuthGuard } from "@nestjs/passport"
import { AuthService } from "./auth.service"
import { SignupDto } from "./dto/signup.dto"
import { LoginDto } from "./dto/login.dto"
import { VerifyOtpDto } from "./dto/verify-otp.dto"
import { ResendOtpDto } from "./dto/resend-otp.dto"
import { ForgotPasswordDto } from "./dto/forgot-password.dto"
import { VerifyResetOtpDto } from "./dto/verify-reset-otp.dto"
import { ResetPasswordDto } from "./dto/reset-password.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // Signup: 10 / minute
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }

  // OTP verify: 5 / minute
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("verify-otp")
  async verifyOtp(@Body() dto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.verifyOtp(dto.pendingId, dto.otp, res)
  }

  // Resend OTP: 3 / minute
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post("resend-otp")
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto.email)
  }

  // Login: 5 / minute
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("login")
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.login(loginDto, res, req.ip ?? "unknown")
  }

  // Refresh: 20 / minute (silent background call — needs some headroom)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Post("refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.["ontime_refresh"]
    return this.authService.refresh(token, res)
  }

  // Logout: requires valid JWT access token
  @SkipThrottle()
  @UseGuards(AuthGuard("jwt"))
  @Post("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const userId = (req as any).user?.id
    return this.authService.logout(userId, res)
  }

  // Forgot password: 5 / minute
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("forgot-password")
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email)
  }

  // Reset OTP verify: 5 / minute
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("verify-reset-otp")
  async verifyResetOtp(@Body() dto: VerifyResetOtpDto) {
    return this.authService.verifyResetOtp(dto.email, dto.otp)
  }

  // Reset password: 3 / minute
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.resetToken, dto.newPassword)
  }
}
