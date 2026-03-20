"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const mail_service_1 = require("../notifications/mail.service");
const REFRESH_TOKEN_EXPIRY_DAYS = 7;
const REFRESH_COOKIE_NAME = "ontime_refresh";
const utcNow = () => new Date(new Date().toISOString());
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.MAX_FAILED_ATTEMPTS = 5;
        this.LOCKOUT_MINUTES = 15;
        this.SAFE_RESET_RESPONSE = { message: "If the email exists, an OTP has been sent." };
    }
    generateAccessToken(user) {
        return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    }
    async generateAndStoreRefreshToken(userId) {
        const raw = (0, crypto_1.randomBytes)(64).toString("hex");
        const hashed = await bcrypt.hash(raw, 10);
        const expiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        await this.prisma.user.update({
            where: { id: userId },
            data: { refresh_token: hashed, refresh_token_expiry: expiry },
        });
        return raw;
    }
    static setRefreshCookie(res, token) {
        res.cookie(REFRESH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
            path: "/",
        });
    }
    static clearRefreshCookie(res) {
        res.clearCookie(REFRESH_COOKIE_NAME, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
    }
    async signup(signupDto) {
        const { email, phone, password, role, company_name, business_address, website } = signupDto;
        const existingUser = await this.prisma.user.findFirst({
            where: { OR: [{ email }, { phone }] },
        });
        if (existingUser) {
            throw new common_1.BadRequestException("An account with this email or phone already exists.");
        }
        await this.prisma.pendingRegistration.deleteMany({
            where: { OR: [{ email }, { phone }] },
        });
        const password_hash = await bcrypt.hash(password, 10);
        const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
        const pending = await this.prisma.pendingRegistration.create({
            data: {
                email,
                phone,
                password_hash,
                role,
                otp_code,
                expires_at: new Date(Date.now() + 10 * 60 * 1000),
                company_name: company_name ?? null,
                business_address: business_address ?? null,
                website: website ?? null,
            },
        });
        const sent = await this.mailService.sendOtpEmail(email, otp_code);
        if (!sent) {
            await this.prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => { });
            this.logger.error(`OTP email failed for ${email} — host=${process.env.MAIL_HOST} port=${process.env.MAIL_PORT} user=${process.env.MAIL_USER ? "***set***" : "MISSING"}`);
            throw new common_1.HttpException({ message: "We could not send your verification email. Please check your email address and try again, or contact support." }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return { pendingId: pending.id, message: "OTP sent to your email." };
    }
    async verifyOtp(pendingId, otpCode, res) {
        const pending = await this.prisma.pendingRegistration.findUnique({
            where: { id: pendingId },
        });
        if (!pending) {
            throw new common_1.BadRequestException("Invalid or expired OTP.");
        }
        if (pending.expires_at < utcNow()) {
            await this.prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => { });
            throw new common_1.BadRequestException("OTP has expired. Please request a new one.");
        }
        if (pending.otp_code !== otpCode) {
            throw new common_1.BadRequestException("Invalid OTP. Please check the code and try again.");
        }
        const user = await this.prisma.user.create({
            data: {
                email: pending.email,
                phone: pending.phone,
                password_hash: pending.password_hash,
                role: pending.role,
                is_email_verified: true,
                is_phone_verified: true,
                company_name: pending.company_name ?? null,
                business_address: pending.business_address ?? null,
                website: pending.website ?? null,
            },
        });
        await this.prisma.pendingRegistration.delete({ where: { id: pending.id } });
        this.mailService.sendWelcomeEmail(user.email).catch((err) => this.logger.error(`Welcome email failed for ${user.email}: ${err.message}`));
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateAndStoreRefreshToken(user.id);
        AuthService_1.setRefreshCookie(res, refreshToken);
        const { password_hash, refresh_token, refresh_token_expiry, ...safe } = user;
        return { access_token: accessToken, user: safe };
    }
    async login(loginDto, res, ip = "unknown") {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            const pending = await this.prisma.pendingRegistration.findUnique({ where: { email } });
            if (pending) {
                throw new common_1.HttpException({
                    message: "Your registration is not complete. Please verify your email to continue.",
                    code: "EMAIL_NOT_VERIFIED",
                    email,
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.UnauthorizedException("Invalid credentials.");
        }
        if (user.lock_until && user.lock_until > utcNow()) {
            const minutesLeft = Math.ceil((user.lock_until.getTime() - Date.now()) / 60_000);
            throw new common_1.HttpException({
                message: `Account temporarily locked. Try again in ${minutesLeft} minute(s).`,
                code: "ACCOUNT_LOCKED",
                lock_until: user.lock_until.toISOString(),
            }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            const attempts = (user.failed_login_attempts ?? 0) + 1;
            const shouldLock = attempts >= this.MAX_FAILED_ATTEMPTS;
            const lockUntil = shouldLock ? new Date(Date.now() + this.LOCKOUT_MINUTES * 60_000) : null;
            await this.prisma.user.update({
                where: { id: user.id },
                data: { failed_login_attempts: attempts, lock_until: lockUntil },
            });
            this.logger.warn(`Failed login for ${email} from ${ip} — attempt ${attempts}${shouldLock ? " → LOCKED" : ""}`);
            if (shouldLock) {
                throw new common_1.HttpException({
                    message: `Too many failed attempts. Account locked for ${this.LOCKOUT_MINUTES} minutes.`,
                    code: "ACCOUNT_LOCKED",
                    lock_until: lockUntil.toISOString(),
                }, common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            throw new common_1.UnauthorizedException("Invalid credentials.");
        }
        if (!user.is_email_verified) {
            throw new common_1.HttpException({ message: "Your email address is not verified.", code: "EMAIL_NOT_VERIFIED", email }, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user.failed_login_attempts > 0 || user.lock_until) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { failed_login_attempts: 0, lock_until: null },
            });
        }
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateAndStoreRefreshToken(user.id);
        AuthService_1.setRefreshCookie(res, refreshToken);
        const { password_hash, refresh_token, refresh_token_expiry, ...safe } = user;
        return { access_token: accessToken, user: safe };
    }
    async refresh(cookieToken, res) {
        if (!cookieToken)
            throw new common_1.UnauthorizedException("No refresh token.");
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
        });
        let matchedUser = null;
        for (const u of users) {
            if (u.refresh_token && (await bcrypt.compare(cookieToken, u.refresh_token))) {
                matchedUser = u;
                break;
            }
        }
        if (!matchedUser) {
            AuthService_1.clearRefreshCookie(res);
            throw new common_1.UnauthorizedException("Invalid or expired refresh token.");
        }
        const accessToken = this.generateAccessToken(matchedUser);
        const refreshToken = await this.generateAndStoreRefreshToken(matchedUser.id);
        AuthService_1.setRefreshCookie(res, refreshToken);
        return { access_token: accessToken };
    }
    async logout(userId, res) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refresh_token: null, refresh_token_expiry: null },
        });
        AuthService_1.clearRefreshCookie(res);
        return { message: "Logged out successfully." };
    }
    async resendOtp(email) {
        const pending = await this.prisma.pendingRegistration.findUnique({ where: { email } });
        if (!pending) {
            return { message: "If a pending registration exists, a new OTP has been sent." };
        }
        const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
        const updated = await this.prisma.pendingRegistration.update({
            where: { id: pending.id },
            data: {
                otp_code,
                expires_at: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
        const sent = await this.mailService.sendOtpEmail(email, otp_code);
        if (!sent) {
            this.logger.error(`Resend OTP failed for ${email} — host=${process.env.MAIL_HOST} user=${process.env.MAIL_USER ? "***set***" : "MISSING"}`);
            throw new common_1.HttpException({ message: "We could not resend your verification email. Please try again or contact support." }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return { pendingId: updated.id, message: "A new OTP has been sent to your email." };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return this.SAFE_RESET_RESPONSE;
        await this.prisma.otpToken.updateMany({
            where: { email, purpose: "password_reset", is_used: false },
            data: { is_used: true },
        });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp_hash = await bcrypt.hash(otp, 10);
        await this.prisma.otpToken.create({
            data: {
                user_id: user.id,
                email,
                otp_code: otp_hash,
                purpose: "password_reset",
                expires_at: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
        const sent = await this.mailService.sendPasswordResetEmail(email, otp);
        if (!sent) {
            await this.prisma.otpToken.updateMany({
                where: { email, purpose: "password_reset", is_used: false },
                data: { is_used: true },
            });
            this.logger.error(`Password-reset email failed for ${email} — host=${process.env.MAIL_HOST} user=${process.env.MAIL_USER ? "***set***" : "MISSING"}`);
            throw new common_1.HttpException({ message: "We could not send your password-reset email. Please try again or contact support." }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return this.SAFE_RESET_RESPONSE;
    }
    async verifyResetOtp(email, otp) {
        const token = await this.prisma.otpToken.findFirst({
            where: {
                email,
                purpose: "password_reset",
                is_used: false,
                expires_at: { gt: utcNow() },
            },
            orderBy: { created_at: "desc" },
        });
        if (!token) {
            throw new common_1.BadRequestException("OTP has expired or was already used. Please request a new one.");
        }
        const isValid = await bcrypt.compare(otp, token.otp_code);
        if (!isValid) {
            throw new common_1.BadRequestException("Invalid OTP. Please check the code and try again.");
        }
        await this.prisma.otpToken.update({
            where: { id: token.id },
            data: { is_used: true },
        });
        const resetToken = this.jwtService.sign({ email, purpose: "password_reset" }, { expiresIn: "15m" });
        return { resetToken };
    }
    async resetPassword(resetToken, newPassword) {
        let payload;
        try {
            payload = this.jwtService.verify(resetToken);
        }
        catch {
            throw new common_1.BadRequestException("Invalid or expired reset token.");
        }
        if (payload.purpose !== "password_reset") {
            throw new common_1.BadRequestException("Invalid reset token.");
        }
        const password_hash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { email: payload.email },
            data: { password_hash },
        });
        return { message: "Password reset successful." };
    }
    async resendEmailVerification(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.is_email_verified) {
            return { message: "If your account exists and is unverified, a link has been sent." };
        }
        await this.prisma.otpToken.updateMany({
            where: { email, purpose: "email_verification", is_used: false },
            data: { is_used: true },
        });
        const rawToken = (0, crypto_1.randomBytes)(32).toString("hex");
        const tokenHash = await bcrypt.hash(rawToken, 10);
        await this.prisma.otpToken.create({
            data: {
                user_id: user.id,
                email,
                otp_code: tokenHash,
                purpose: "email_verification",
                expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
        });
        const sent = await this.mailService.sendEmailVerificationLink(email, rawToken);
        if (!sent) {
            await this.prisma.otpToken.updateMany({
                where: { email, purpose: "email_verification", is_used: false },
                data: { is_used: true },
            });
            this.logger.error(`Email verification link failed for ${email}`);
            throw new common_1.HttpException({ message: "Could not send verification email. Please try again or contact support." }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        return { message: "A verification link has been sent to your email." };
    }
    async verifyEmailToken(email, rawToken) {
        const token = await this.prisma.otpToken.findFirst({
            where: {
                email,
                purpose: "email_verification",
                is_used: false,
                expires_at: { gt: utcNow() },
            },
            orderBy: { created_at: "desc" },
        });
        if (!token) {
            throw new common_1.BadRequestException("Verification link is invalid or has expired. Please request a new one.");
        }
        const isValid = await bcrypt.compare(rawToken, token.otp_code);
        if (!isValid) {
            throw new common_1.BadRequestException("Verification link is invalid or has expired. Please request a new one.");
        }
        await this.prisma.otpToken.update({ where: { id: token.id }, data: { is_used: true } });
        await this.prisma.user.update({ where: { email }, data: { is_email_verified: true } });
        return { message: "Email verified successfully. You can now log in." };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map