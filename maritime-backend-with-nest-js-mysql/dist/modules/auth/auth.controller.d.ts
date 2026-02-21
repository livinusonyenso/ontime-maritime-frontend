import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ResendOtpDto } from "./dto/resend-otp.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        pendingId: string;
        message: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        access_token: string;
        user: {
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
            phone: string;
            is_phone_verified: boolean;
            is_email_verified: boolean;
            subscription_status: string;
            subscription_expiry: Date | null;
            first_name: string | null;
            last_name: string | null;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    resendOtp(resendOtpDto: ResendOtpDto): Promise<{
        message: string;
        pendingId?: undefined;
    } | {
        pendingId: string;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            email: string;
            phone: string;
            is_phone_verified: boolean;
            is_email_verified: boolean;
            subscription_status: string;
            subscription_expiry: Date | null;
            first_name: string | null;
            last_name: string | null;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
