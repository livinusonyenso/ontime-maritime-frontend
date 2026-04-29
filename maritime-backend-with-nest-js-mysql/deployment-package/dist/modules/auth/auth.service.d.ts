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
    private generateAccessToken;
    private generateAndStoreRefreshToken;
    static setRefreshCookie(res: any, token: string): void;
    static clearRefreshCookie(res: any): void;
    signup(signupDto: SignupDto): Promise<{
        pendingId: string;
        message: string;
    }>;
    verifyOtp(pendingId: string, otpCode: string, res: any): Promise<{
        access_token: string;
        user: any;
    }>;
    private readonly MAX_FAILED_ATTEMPTS;
    private readonly LOCKOUT_MINUTES;
    login(loginDto: LoginDto, res: any, ip?: string): Promise<{
        access_token: string;
        user: any;
    }>;
    refresh(cookieToken: string | undefined, res: any): Promise<{
        access_token: string;
    }>;
    logout(userId: string, res: any): Promise<{
        message: string;
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
    verifyResetOtp(email: string, otp: string): Promise<{
        resetToken: string;
    }>;
    resetPassword(resetToken: string, newPassword: string): Promise<{
        message: string;
    }>;
    resendEmailVerification(email: string): Promise<{
        message: string;
    }>;
    verifyEmailToken(email: string, rawToken: string): Promise<{
        message: string;
    }>;
}
