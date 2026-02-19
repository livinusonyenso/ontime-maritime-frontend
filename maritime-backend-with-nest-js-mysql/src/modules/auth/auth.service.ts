import { Injectable, UnauthorizedException, BadRequestException, Logger } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../../prisma/prisma.service"
import * as bcrypt from "bcryptjs"
import {  SignupDto  } from './dto/signup.dto'
import {  LoginDto  } from './dto/login.dto'
import { MailService } from "../notifications/mail.service"

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, phone, password, role } = signupDto

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    })

    if (existingUser) {
      throw new BadRequestException("User with this email or phone already exists")
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        phone,
        password_hash,
        role: role || "buyer",
      },
    })

    // Generate OTP (simplified - in production use a proper OTP service)
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString()

    await this.prisma.otpToken.create({
      data: {
        user_id: user.id,
        email: user.email,
        otp_code,
        purpose: "signup",
        expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    })

    const sent = await this.mailService.sendOtpEmail(user.email, otp_code)
    if (!sent) {
      this.logger.error(`Failed to deliver OTP email to ${user.email} for user ${user.id}`)
    }

    return {
      userId: user.id,
      message: "OTP sent to your email",
    }
  }

  async verifyOtp(userId: string, otpCode: string) {
    const otpToken = await this.prisma.otpToken.findFirst({
      where: {
        user_id: userId,
        otp_code: otpCode,
        is_used: false,
        expires_at: {
          gt: new Date(),
        },
      },
    })

    if (!otpToken) {
      throw new BadRequestException("Invalid or expired OTP")
    }

    // Mark OTP as used
    await this.prisma.otpToken.update({
      where: { id: otpToken.id },
      data: { is_used: true },
    })

    // Update user verification status
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        is_email_verified: true,
        is_phone_verified: true,
      },
    })

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    // Return full user object (excluding password_hash)
    const { password_hash, ...userWithoutPassword } = user

    return {
      access_token: token,
      user: userWithoutPassword,
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    // Return full user object (excluding password_hash)
    const { password_hash, ...userWithoutPassword } = user

    return {
      access_token: token,
      user: userWithoutPassword,
    }
  }
}
