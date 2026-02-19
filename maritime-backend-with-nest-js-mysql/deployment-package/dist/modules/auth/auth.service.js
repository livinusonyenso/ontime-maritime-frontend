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
const mail_service_1 = require("../notifications/mail.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService, mailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signup(signupDto) {
        const { email, phone, password, role } = signupDto;
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
            },
        });
        const sent = await this.mailService.sendOtpEmail(email, otp_code);
        if (!sent) {
            this.logger.error(`OTP email failed to deliver to ${email}`);
        }
        return { pendingId: pending.id, message: "OTP sent to your email." };
    }
    async verifyOtp(pendingId, otpCode) {
        const pending = await this.prisma.pendingRegistration.findFirst({
            where: {
                id: pendingId,
                otp_code: otpCode,
                expires_at: { gt: new Date() },
            },
        });
        if (!pending) {
            throw new common_1.BadRequestException("Invalid or expired OTP.");
        }
        const user = await this.prisma.user.create({
            data: {
                email: pending.email,
                phone: pending.phone,
                password_hash: pending.password_hash,
                role: pending.role,
                is_email_verified: true,
                is_phone_verified: true,
            },
        });
        await this.prisma.pendingRegistration.delete({ where: { id: pending.id } });
        this.mailService.sendWelcomeEmail(user.email).catch((err) => this.logger.error(`Welcome email failed for ${user.email}: ${err.message}`));
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        const { password_hash, ...userWithoutPassword } = user;
        return { access_token: token, user: userWithoutPassword };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            const pending = await this.prisma.pendingRegistration.findUnique({
                where: { email },
            });
            if (pending) {
                throw new common_1.HttpException({
                    message: "Your registration is not complete. Please verify your email to continue.",
                    code: "EMAIL_NOT_VERIFIED",
                    email,
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.UnauthorizedException("Invalid credentials.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials.");
        }
        if (!user.is_email_verified) {
            throw new common_1.HttpException({
                message: "Your email address is not verified. Please verify your email to continue.",
                code: "EMAIL_NOT_VERIFIED",
                email,
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        const { password_hash, ...userWithoutPassword } = user;
        return { access_token: token, user: userWithoutPassword };
    }
    async resendOtp(email) {
        const pending = await this.prisma.pendingRegistration.findUnique({
            where: { email },
        });
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
            this.logger.error(`Resend OTP email failed for ${email}`);
        }
        return { pendingId: updated.id, message: "A new OTP has been sent to your email." };
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