import { AuthService } from "./auth.service";
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        userId: string;
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
}
