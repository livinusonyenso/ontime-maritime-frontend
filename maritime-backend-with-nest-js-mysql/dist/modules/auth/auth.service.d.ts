import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma/prisma.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { MailService } from "../notifications/mail.service";
export declare class AuthService {
    private prisma;
    private jwtService;
    private mailService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, mailService: MailService);
    signup(signupDto: SignupDto): Promise<{
        pendingId: string;
        message: string;
    }>;
    verifyOtp(pendingId: string, otpCode: string): Promise<{
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
    resendOtp(email: string): Promise<{
        message: string;
        pendingId?: undefined;
    } | {
        pendingId: string;
        message: string;
    }>;
    private readonly SAFE_RESET_RESPONSE;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<{
        message: string;
    }>;
}
