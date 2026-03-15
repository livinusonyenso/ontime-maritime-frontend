import { Controller, Post, Body, Req } from "@nestjs/common"
import { Throttle, SkipThrottle } from "@nestjs/throttler"
import { Request } from "express"
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

  // Signup: 10 attempts / minute (generous — real users retry OTP, not signup)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post("signup")
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto)
  }

  // OTP verify: 5 attempts / minute per IP — brute-force protection
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("verify-otp")
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto.pendingId, verifyOtpDto.otp)
  }

  // Resend OTP: 3 / minute
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post("resend-otp")
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(resendOtpDto.email)
  }

  // Login: 5 attempts / minute — credential stuffing + brute-force protection
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post("login")
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    return this.authService.login(loginDto, req.ip ?? "unknown")
  }

  // Forgot password: 5 / minute — prevents email flooding
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
