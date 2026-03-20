import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ResendOtpDto } from "./dto/resend-otp.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { VerifyResetOtpDto } from "./dto/verify-reset-otp.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        pendingId: string;
        message: string;
    }>;
    verifyOtp(dto: VerifyOtpDto, res: Response): Promise<{
        access_token: string;
        user: any;
    }>;
    resendOtp(dto: ResendOtpDto): Promise<{
        message: string;
        pendingId?: undefined;
    } | {
        pendingId: string;
        message: string;
    }>;
    login(loginDto: LoginDto, res: Response, req: Request): Promise<{
        access_token: string;
        user: any;
    }>;
    refresh(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyResetOtp(dto: VerifyResetOtpDto): Promise<{
        resetToken: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    resendEmailVerification(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    verifyEmailToken(body: {
        email: string;
        token: string;
    }): Promise<{
        message: string;
    }>;
}
