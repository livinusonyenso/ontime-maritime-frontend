/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const passport_1 = __webpack_require__(5);
const prisma_module_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(9);
const users_module_1 = __webpack_require__(20);
const kyc_module_1 = __webpack_require__(24);
const listings_module_1 = __webpack_require__(30);
const transactions_module_1 = __webpack_require__(42);
const auctions_module_1 = __webpack_require__(46);
const executive_corner_module_1 = __webpack_require__(35);
const tracking_module_1 = __webpack_require__(51);
const documents_module_1 = __webpack_require__(55);
const notifications_module_1 = __webpack_require__(60);
const admin_module_1 = __webpack_require__(64);
const ratings_module_1 = __webpack_require__(67);
const arbitration_module_1 = __webpack_require__(71);
const insurance_module_1 = __webpack_require__(75);
const app_controller_1 = __webpack_require__(79);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            kyc_module_1.KycModule,
            listings_module_1.ListingsModule,
            transactions_module_1.TransactionsModule,
            auctions_module_1.AuctionsModule,
            executive_corner_module_1.ExecutiveCornerModule,
            tracking_module_1.TrackingModule,
            documents_module_1.DocumentsModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
            ratings_module_1.RatingsModule,
            arbitration_module_1.ArbitrationModule,
            insurance_module_1.InsuranceModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(2);
const client_1 = __webpack_require__(8);
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: [
                { emit: "event", level: "query" },
                { emit: "event", level: "error" },
                { emit: "event", level: "warn" },
            ],
        });
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        ;
        this.$on("query", (e) => {
            if (process.env.NODE_ENV === "development") {
                this.logger.debug(`Query: ${e.query} | Duration: ${e.duration}ms`, "PrismaQuery");
            }
        });
        this.$on("error", (e) => {
            this.logger.error(`Prisma Error: ${e.message}`, "PrismaError");
        });
        this.$on("warn", (e) => {
            this.logger.warn(`Prisma Warning: ${e.message}`, "PrismaWarn");
        });
        await this.$connect();
        this.logger.log("Database connected successfully");
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log("Database disconnected");
    }
    async cleanUp() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(10);
const passport_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(11);
const auth_controller_1 = __webpack_require__(13);
const jwt_strategy_1 = __webpack_require__(18);
const users_module_1 = __webpack_require__(20);
const kyc_module_1 = __webpack_require__(24);
const prisma_module_1 = __webpack_require__(6);
const config_1 = __webpack_require__(4);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'ontime-secret-key',
                    signOptions: { expiresIn: '24h' },
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            kyc_module_1.KycModule,
            prisma_module_1.PrismaModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(10);
const prisma_service_1 = __webpack_require__(7);
const bcrypt = __importStar(__webpack_require__(12));
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signup(signupDto) {
        const { email, phone, password, role } = signupDto;
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException("User with this email or phone already exists");
        }
        const password_hash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                phone,
                password_hash,
                role: role || "buyer",
            },
        });
        const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
        await this.prisma.otpToken.create({
            data: {
                user_id: user.id,
                email: user.email,
                otp_code,
                purpose: "signup",
                expires_at: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
        return {
            userId: user.id,
            message: "OTP sent to your email",
        };
    }
    async verifyOtp(userId, otpCode) {
        const otpToken = await this.prisma.otpToken.findFirst({
            where: {
                user_id: userId,
                otp_code: otpCode,
                is_used: false,
                expires_at: {
                    gt: new Date(),
                },
            },
        });
        if (!otpToken) {
            throw new common_1.BadRequestException("Invalid or expired OTP");
        }
        await this.prisma.otpToken.update({
            where: { id: otpToken.id },
            data: { is_used: true },
        });
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                is_email_verified: true,
                is_phone_verified: true,
            },
        });
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });
        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(11);
const signup_dto_1 = __webpack_require__(14);
const login_dto_1 = __webpack_require__(16);
const verify_otp_dto_1 = __webpack_require__(17);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(signupDto) {
        return this.authService.signup(signupDto);
    }
    async verifyOtp(verifyOtpDto) {
        return this.authService.verifyOtp(verifyOtpDto.userId, verifyOtpDto.otp);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof verify_otp_dto_1.VerifyOtpDto !== "undefined" && verify_otp_dto_1.VerifyOtpDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignupDto = void 0;
const class_validator_1 = __webpack_require__(15);
const client_1 = __webpack_require__(8);
class SignupDto {
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)("NG"),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/[A-Z]/, { message: "Password must contain uppercase letter" }),
    (0, class_validator_1.Matches)(/[0-9]/, { message: "Password must contain number" }),
    (0, class_validator_1.Matches)(/[!@#$%^&*]/, { message: "Password must contain special character" }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", typeof (_a = typeof client_1.UserRole !== "undefined" && client_1.UserRole) === "function" ? _a : Object)
], SignupDto.prototype, "role", void 0);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(15);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyOtpDto = void 0;
const class_validator_1 = __webpack_require__(15);
class VerifyOtpDto {
}
exports.VerifyOtpDto = VerifyOtpDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyOtpDto.prototype, "otp", void 0);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(5);
const passport_jwt_1 = __webpack_require__(19);
const config_1 = __webpack_require__(4);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET", "ontime-secret-key"),
        });
    }
    async validate(payload) {
        return { id: payload.id, email: payload.email, role: payload.role };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(2);
const users_service_1 = __webpack_require__(21);
const users_controller_1 = __webpack_require__(22);
const prisma_module_1 = __webpack_require__(6);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        return this.prisma.user.create({
            data: {
                ...createUserDto,
                role: createUserDto.role || 'buyer',
            },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findByPhone(phone) {
        return this.prisma.user.findUnique({ where: { phone } });
    }
    async update(id, updateData) {
        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
    async activateSubscription(userId, months = 12) {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + months);
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                subscription_status: 'paid',
                subscription_expiry: expiryDate,
            },
        });
    }
    async deactivateSubscription(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                subscription_status: 'free',
            },
        });
    }
    async isSubscriptionActive(userId) {
        const user = await this.findById(userId);
        if (!user)
            return false;
        if (user.subscription_status !== 'paid')
            return false;
        if (!user.subscription_expiry)
            return false;
        return new Date() <= user.subscription_expiry;
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const users_service_1 = __webpack_require__(21);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(req) {
        return this.usersService.findById(req.user.id);
    }
    async getAll() {
        return this.usersService.findAll();
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)("profile"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(5);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KycModule = void 0;
const common_1 = __webpack_require__(2);
const kyc_service_1 = __webpack_require__(25);
const kyc_controller_1 = __webpack_require__(26);
let KycModule = class KycModule {
};
exports.KycModule = KycModule;
exports.KycModule = KycModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [kyc_controller_1.KycController],
        providers: [kyc_service_1.KycService],
        exports: [kyc_service_1.KycService],
    })
], KycModule);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KycService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let KycService = class KycService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createKycDto) {
        return this.prisma.kyc.create({
            data: createKycDto,
        });
    }
    async findByUserId(userId) {
        return this.prisma.kyc.findFirst({
            where: { user_id: userId },
            orderBy: { created_at: "desc" },
        });
    }
    async update(id, updateKycDto) {
        return this.prisma.kyc.update({
            where: { id },
            data: updateKycDto,
        });
    }
    async approve(id) {
        const kyc = await this.prisma.kyc.findUnique({ where: { id } });
        if (!kyc) {
            throw new common_1.BadRequestException("KYC record not found");
        }
        return this.prisma.kyc.update({
            where: { id },
            data: { status: client_1.KycStatus.approved },
        });
    }
    async reject(id, comment) {
        const kyc = await this.prisma.kyc.findUnique({ where: { id } });
        if (!kyc) {
            throw new common_1.BadRequestException("KYC record not found");
        }
        return this.prisma.kyc.update({
            where: { id },
            data: {
                status: client_1.KycStatus.rejected,
                admin_comment: comment,
            },
        });
    }
    async getPendingKyc() {
        return this.prisma.kyc.findMany({
            where: { status: client_1.KycStatus.pending },
            orderBy: { created_at: "desc" },
        });
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], KycService);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KycController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const kyc_service_1 = __webpack_require__(25);
const create_kyc_dto_1 = __webpack_require__(27);
const update_kyc_dto_1 = __webpack_require__(28);
let KycController = class KycController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    async create(createKycDto, req) {
        createKycDto.user_id = req.user.id;
        return this.kycService.create(createKycDto);
    }
    async getMyKyc(req) {
        return this.kycService.findByUserId(req.user.id);
    }
    async update(id, updateKycDto) {
        return this.kycService.update(id, updateKycDto);
    }
    async getPendingKyc(req) {
        if (req.user.role !== "admin") {
            throw new common_1.ForbiddenException("Only admins can view pending KYC");
        }
        return this.kycService.getPendingKyc();
    }
    async approveKyc(id, req) {
        if (req.user.role !== "admin") {
            throw new common_1.ForbiddenException("Only admins can approve KYC");
        }
        return this.kycService.approve(id);
    }
    async rejectKyc(id, comment, req) {
        if (req.user.role !== "admin") {
            throw new common_1.ForbiddenException("Only admins can reject KYC");
        }
        return this.kycService.reject(id, comment);
    }
};
exports.KycController = KycController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_kyc_dto_1.CreateKycDto !== "undefined" && create_kyc_dto_1.CreateKycDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("my-kyc"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getMyKyc", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_kyc_dto_1.UpdateKycDto !== "undefined" && update_kyc_dto_1.UpdateKycDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("pending"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getPendingKyc", null);
__decorate([
    (0, common_1.Patch)(":id/approve"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "approveKyc", null);
__decorate([
    (0, common_1.Patch)(":id/reject"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "rejectKyc", null);
exports.KycController = KycController = __decorate([
    (0, common_1.Controller)("kyc"),
    __metadata("design:paramtypes", [typeof (_a = typeof kyc_service_1.KycService !== "undefined" && kyc_service_1.KycService) === "function" ? _a : Object])
], KycController);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateKycDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateKycDto {
}
exports.CreateKycDto = CreateKycDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKycDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKycDto.prototype, "bvn", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(["NIN", "passport", "voter_card", "drivers_license"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKycDto.prototype, "id_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKycDto.prototype, "id_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKycDto.prototype, "id_document_url", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKycDto.prototype, "face_photo_url", void 0);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateKycDto = void 0;
const mapped_types_1 = __webpack_require__(29);
const create_kyc_dto_1 = __webpack_require__(27);
class UpdateKycDto extends (0, mapped_types_1.PartialType)(create_kyc_dto_1.CreateKycDto) {
}
exports.UpdateKycDto = UpdateKycDto;


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListingsModule = void 0;
const common_1 = __webpack_require__(2);
const listings_service_1 = __webpack_require__(31);
const listings_controller_1 = __webpack_require__(32);
const executive_corner_module_1 = __webpack_require__(35);
const prisma_module_1 = __webpack_require__(6);
const fraud_module_1 = __webpack_require__(40);
let ListingsModule = class ListingsModule {
};
exports.ListingsModule = ListingsModule;
exports.ListingsModule = ListingsModule = __decorate([
    (0, common_1.Module)({
        imports: [executive_corner_module_1.ExecutiveCornerModule, prisma_module_1.PrismaModule, fraud_module_1.FraudModule],
        controllers: [listings_controller_1.ListingsController],
        providers: [listings_service_1.ListingsService],
        exports: [listings_service_1.ListingsService],
    })
], ListingsModule);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListingsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let ListingsService = class ListingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createListingDto, sellerId) {
        return this.prisma.listing.create({
            data: {
                ...createListingDto,
                seller_id: sellerId,
                status: client_1.ListingStatus.draft,
            },
        });
    }
    async findAll(skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            where: {
                status: client_1.ListingStatus.active,
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }
    async search(query, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            where: {
                AND: [
                    {
                        status: client_1.ListingStatus.active,
                    },
                    {
                        OR: [
                            { title: { contains: query, mode: "insensitive" } },
                            { description: { contains: query, mode: "insensitive" } },
                        ],
                    },
                ],
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
    }
    async findByCategory(category, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            where: {
                category,
                status: client_1.ListingStatus.active,
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        const listing = await this.prisma.listing.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                documents: true,
                auctions: true,
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException("Listing not found");
        }
        return listing;
    }
    async update(id, updateListingDto) {
        return this.prisma.listing.update({
            where: { id },
            data: updateListingDto,
        });
    }
    async delete(id) {
        return this.prisma.listing.delete({
            where: { id },
        });
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ListingsService);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListingsController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const listings_service_1 = __webpack_require__(31);
const create_listing_dto_1 = __webpack_require__(33);
const update_listing_dto_1 = __webpack_require__(34);
let ListingsController = class ListingsController {
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    async create(createListingDto, req) {
        return this.listingsService.create(createListingDto, req.user.id);
    }
    async findAll(skip = 0, take = 20) {
        return this.listingsService.findAll(skip, take);
    }
    async search(query, skip = 0, take = 20) {
        return this.listingsService.search(query, skip, take);
    }
    async findByCategory(category, skip = 0, take = 20) {
        return this.listingsService.findByCategory(category, skip, take);
    }
    async findById(id) {
        return this.listingsService.findById(id);
    }
    async update(id, updateListingDto) {
        return this.listingsService.update(id, updateListingDto);
    }
    async delete(id) {
        await this.listingsService.delete(id);
        return { message: 'Listing deleted successfully' };
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_listing_dto_1.CreateListingDto !== "undefined" && create_listing_dto_1.CreateListingDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("category/:category"),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_listing_dto_1.UpdateListingDto !== "undefined" && update_listing_dto_1.UpdateListingDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "delete", null);
exports.ListingsController = ListingsController = __decorate([
    (0, common_1.Controller)("listings"),
    __metadata("design:paramtypes", [typeof (_a = typeof listings_service_1.ListingsService !== "undefined" && listings_service_1.ListingsService) === "function" ? _a : Object])
], ListingsController);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateListingDto = void 0;
const class_validator_1 = __webpack_require__(15);
const client_1 = __webpack_require__(8);
class CreateListingDto {
}
exports.CreateListingDto = CreateListingDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ListingCategory),
    __metadata("design:type", typeof (_a = typeof client_1.ListingCategory !== "undefined" && client_1.ListingCategory) === "function" ? _a : Object)
], CreateListingDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateListingDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    (0, class_validator_1.MaxLength)(5000),
    __metadata("design:type", String)
], CreateListingDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateListingDto.prototype, "price_usd", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateListingDto.prototype, "origin_port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateListingDto.prototype, "destination_port", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateListingDto.prototype, "container_number", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateListingDto.prototype, "eta", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateListingDto.prototype, "photos", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateListingDto.prototype, "certificates", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateListingDto.prototype, "is_perishable", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateListingDto.prototype, "is_dangerous", void 0);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateListingDto = void 0;
const mapped_types_1 = __webpack_require__(29);
const create_listing_dto_1 = __webpack_require__(33);
class UpdateListingDto extends (0, mapped_types_1.PartialType)(create_listing_dto_1.CreateListingDto) {
}
exports.UpdateListingDto = UpdateListingDto;


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecutiveCornerModule = void 0;
const common_1 = __webpack_require__(2);
const executive_corner_service_1 = __webpack_require__(36);
const executive_corner_controller_1 = __webpack_require__(37);
let ExecutiveCornerModule = class ExecutiveCornerModule {
};
exports.ExecutiveCornerModule = ExecutiveCornerModule;
exports.ExecutiveCornerModule = ExecutiveCornerModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [executive_corner_controller_1.ExecutiveCornerController],
        providers: [executive_corner_service_1.ExecutiveCornerService],
        exports: [executive_corner_service_1.ExecutiveCornerService],
    })
], ExecutiveCornerModule);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecutiveCornerService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let ExecutiveCornerService = class ExecutiveCornerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createExecutiveCornerDto) {
        return this.prisma.executiveCorner.create({
            data: createExecutiveCornerDto,
        });
    }
    async findById(id) {
        return this.prisma.executiveCorner.findUnique({
            where: { id },
            include: {
                listing: true,
                decidedBy: true,
            },
        });
    }
    async findPending(skip = 0, take = 20) {
        return this.prisma.executiveCorner.findMany({
            where: { status: client_1.ExecutiveCornerStatus.pending },
            include: {
                listing: {
                    include: {
                        seller: true,
                    },
                },
            },
            skip,
            take,
            orderBy: { deadline_at: "asc" },
        });
    }
    async approve(id, executiveId, comment) {
        const executiveCorner = await this.findById(id);
        if (!executiveCorner) {
            throw new common_1.BadRequestException("Executive Corner record not found");
        }
        const logs = executiveCorner.logs || [];
        logs.push({
            action: "APPROVED",
            by: executiveId,
            at: new Date(),
            comment,
        });
        return this.prisma.executiveCorner.update({
            where: { id },
            data: {
                status: client_1.ExecutiveCornerStatus.approved,
                decided_by: executiveId,
                decided_at: new Date(),
                decision_comment: comment,
                logs: logs,
            },
        });
    }
    async reject(id, executiveId, comment) {
        const executiveCorner = await this.findById(id);
        if (!executiveCorner) {
            throw new common_1.BadRequestException("Executive Corner record not found");
        }
        const logs = executiveCorner.logs || [];
        logs.push({
            action: "REJECTED",
            by: executiveId,
            at: new Date(),
            comment,
        });
        return this.prisma.executiveCorner.update({
            where: { id },
            data: {
                status: client_1.ExecutiveCornerStatus.rejected,
                decided_by: executiveId,
                decided_at: new Date(),
                decision_comment: comment,
                logs: logs,
            },
        });
    }
    async autoRelease(id) {
        const executiveCorner = await this.findById(id);
        if (!executiveCorner) {
            throw new common_1.BadRequestException("Executive Corner record not found");
        }
        const logs = executiveCorner.logs || [];
        logs.push({
            action: "AUTO_RELEASED",
            at: new Date(),
            reason: "48 hours deadline passed",
        });
        return this.prisma.executiveCorner.update({
            where: { id },
            data: {
                status: client_1.ExecutiveCornerStatus.auto_released,
                decided_at: new Date(),
                logs: logs,
            },
        });
    }
    async checkAndAutoRelease() {
        const now = new Date();
        const expiredItems = await this.prisma.executiveCorner.findMany({
            where: {
                status: client_1.ExecutiveCornerStatus.pending,
                deadline_at: {
                    lte: now,
                },
            },
        });
        const autoReleasedItems = [];
        for (const item of expiredItems) {
            const released = await this.autoRelease(item.id);
            autoReleasedItems.push(released);
        }
        return autoReleasedItems;
    }
    async getAll(skip = 0, take = 20) {
        return this.prisma.executiveCorner.findMany({
            include: {
                listing: {
                    include: {
                        seller: true,
                    },
                },
                decidedBy: true,
            },
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
};
exports.ExecutiveCornerService = ExecutiveCornerService;
exports.ExecutiveCornerService = ExecutiveCornerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ExecutiveCornerService);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecutiveCornerController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const executive_corner_service_1 = __webpack_require__(36);
const approve_executive_corner_dto_1 = __webpack_require__(38);
const reject_executive_corner_dto_1 = __webpack_require__(39);
let ExecutiveCornerController = class ExecutiveCornerController {
    constructor(executiveCornerService) {
        this.executiveCornerService = executiveCornerService;
    }
    async findPending() {
        const skip = 0;
        const take = 20;
        return this.executiveCornerService.findPending(skip, take);
    }
    async getAll() {
        const skip = 0;
        const take = 20;
        return this.executiveCornerService.getAll(skip, take);
    }
    async findById(id) {
        return this.executiveCornerService.findById(id);
    }
    async approve(id, approveDto, req) {
        return this.executiveCornerService.approve(id, req.user.id, approveDto.comment);
    }
    async reject(id, rejectDto, req) {
        return this.executiveCornerService.reject(id, req.user.id, rejectDto.comment);
    }
    async checkAutoRelease() {
        return this.executiveCornerService.checkAndAutoRelease();
    }
};
exports.ExecutiveCornerController = ExecutiveCornerController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)("all"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(":id/approve"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof approve_executive_corner_dto_1.ApproveExecutiveCornerDto !== "undefined" && approve_executive_corner_dto_1.ApproveExecutiveCornerDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(":id/reject"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof reject_executive_corner_dto_1.RejectExecutiveCornerDto !== "undefined" && reject_executive_corner_dto_1.RejectExecutiveCornerDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "reject", null);
__decorate([
    (0, common_1.Post)("check-auto-release"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "checkAutoRelease", null);
exports.ExecutiveCornerController = ExecutiveCornerController = __decorate([
    (0, common_1.Controller)("executive-corner"),
    __metadata("design:paramtypes", [typeof (_a = typeof executive_corner_service_1.ExecutiveCornerService !== "undefined" && executive_corner_service_1.ExecutiveCornerService) === "function" ? _a : Object])
], ExecutiveCornerController);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApproveExecutiveCornerDto = void 0;
const class_validator_1 = __webpack_require__(15);
class ApproveExecutiveCornerDto {
}
exports.ApproveExecutiveCornerDto = ApproveExecutiveCornerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApproveExecutiveCornerDto.prototype, "comment", void 0);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RejectExecutiveCornerDto = void 0;
const class_validator_1 = __webpack_require__(15);
class RejectExecutiveCornerDto {
}
exports.RejectExecutiveCornerDto = RejectExecutiveCornerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RejectExecutiveCornerDto.prototype, "comment", void 0);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FraudModule = void 0;
const common_1 = __webpack_require__(2);
const fraud_detection_service_1 = __webpack_require__(41);
const prisma_module_1 = __webpack_require__(6);
let FraudModule = class FraudModule {
};
exports.FraudModule = FraudModule;
exports.FraudModule = FraudModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [fraud_detection_service_1.FraudDetectionService],
        exports: [fraud_detection_service_1.FraudDetectionService],
    })
], FraudModule);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FraudDetectionService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let FraudDetectionService = class FraudDetectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkUserFraudScore(userId) {
        const flags = await this.prisma.fraudFlag.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            take: 100,
        });
        const now = Date.now();
        let score = 0;
        for (const flag of flags) {
            const ageInDays = (now - flag.created_at.getTime()) / (1000 * 60 * 60 * 24);
            const decay = Math.max(0, 1 - ageInDays / 30);
            score += flag.severity * decay;
        }
        return Math.min(score, 100);
    }
    async flagSuspiciousActivity(userId, trigger, severity, metadata) {
        await this.prisma.fraudFlag.create({
            data: {
                user_id: userId,
                trigger,
                severity: Math.min(severity, 10),
                metadata: metadata || {},
            },
        });
    }
    async checkDuplicateDocuments(documentHash) {
        const existing = await this.prisma.document.findFirst({
            where: { qr_hash: documentHash },
        });
        return !!existing;
    }
    async checkMultipleAccountsFromEmail(email) {
        const count = await this.prisma.user.count({
            where: { email },
        });
        return count;
    }
    async checkMultipleAccountsFromPhone(phone) {
        const count = await this.prisma.user.count({
            where: { phone },
        });
        return count;
    }
    async checkKycMismatch(userId, kycData) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            return false;
        const kyc = await this.prisma.kyc.findFirst({
            where: { user_id: userId, status: 'approved' },
        });
        if (kyc && kycData.phone && kycData.phone !== user.phone) {
            return true;
        }
        return false;
    }
    async checkTransactionVelocity(userId, threshold = 5) {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentTransactions = await this.prisma.transaction.count({
            where: {
                buyer_id: userId,
                created_at: { gte: oneHourAgo },
            },
        });
        return recentTransactions > threshold;
    }
};
exports.FraudDetectionService = FraudDetectionService;
exports.FraudDetectionService = FraudDetectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], FraudDetectionService);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionsModule = void 0;
const common_1 = __webpack_require__(2);
const transactions_service_1 = __webpack_require__(43);
const transactions_controller_1 = __webpack_require__(44);
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [transactions_controller_1.TransactionsController],
        providers: [transactions_service_1.TransactionsService],
        exports: [transactions_service_1.TransactionsService],
    })
], TransactionsModule);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let TransactionsService = class TransactionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTransactionDto) {
        const { buyer_id, seller_id, listing_id, amount, transaction_type } = createTransactionDto;
        const commission_amount = Number(amount) * 0.05;
        return this.prisma.transaction.create({
            data: {
                buyer_id,
                seller_id,
                listing_id,
                amount,
                commission_amount,
                transaction_type: transaction_type || client_1.TransactionType.buy_now,
                payout_status: client_1.PayoutStatus.pending,
            },
            include: {
                buyer: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                listing: true,
            },
        });
    }
    async findAll(skip = 0, take = 20) {
        return this.prisma.transaction.findMany({
            skip,
            take,
            include: {
                buyer: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                listing: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }
    async findById(id) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: {
                buyer: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                listing: true,
                documents: true,
            },
        });
        if (!transaction) {
            throw new common_1.NotFoundException("Transaction not found");
        }
        return transaction;
    }
    async findByBuyer(buyerId, skip = 0, take = 20) {
        return this.prisma.transaction.findMany({
            skip,
            take,
            where: {
                buyer_id: buyerId,
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                listing: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }
    async findBySeller(sellerId, skip = 0, take = 20) {
        return this.prisma.transaction.findMany({
            skip,
            take,
            where: {
                seller_id: sellerId,
            },
            include: {
                buyer: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                listing: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], TransactionsService);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionsController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const transactions_service_1 = __webpack_require__(43);
const create_transaction_dto_1 = __webpack_require__(45);
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async create(createTransactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }
    async findAll(skip = 0, take = 20) {
        return this.transactionsService.findAll(skip, take);
    }
    async getMyPurchases(req, skip = 0, take = 20) {
        return this.transactionsService.findByBuyer(req.user.id, skip, take);
    }
    async getMySales(req, skip = 0, take = 20) {
        return this.transactionsService.findBySeller(req.user.id, skip, take);
    }
    async findById(id) {
        return this.transactionsService.findById(id);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_transaction_dto_1.CreateTransactionDto !== "undefined" && create_transaction_dto_1.CreateTransactionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("my-purchases"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getMyPurchases", null);
__decorate([
    (0, common_1.Get)("my-sales"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getMySales", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findById", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)("transactions"),
    __metadata("design:paramtypes", [typeof (_a = typeof transactions_service_1.TransactionsService !== "undefined" && transactions_service_1.TransactionsService) === "function" ? _a : Object])
], TransactionsController);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTransactionDto = void 0;
const class_validator_1 = __webpack_require__(15);
const client_1 = __webpack_require__(8);
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "buyer_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "seller_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "listing_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.TransactionType),
    __metadata("design:type", typeof (_a = typeof client_1.TransactionType !== "undefined" && client_1.TransactionType) === "function" ? _a : Object)
], CreateTransactionDto.prototype, "transaction_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "payment_reference", void 0);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuctionsModule = void 0;
const common_1 = __webpack_require__(2);
const auctions_service_1 = __webpack_require__(47);
const auctions_controller_1 = __webpack_require__(48);
let AuctionsModule = class AuctionsModule {
};
exports.AuctionsModule = AuctionsModule;
exports.AuctionsModule = AuctionsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [auctions_controller_1.AuctionsController],
        providers: [auctions_service_1.AuctionsService],
        exports: [auctions_service_1.AuctionsService],
    })
], AuctionsModule);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuctionsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let AuctionsService = class AuctionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAuctionDto) {
        return this.prisma.auction.create({
            data: {
                ...createAuctionDto,
                current_price: createAuctionDto.starting_price,
                status: client_1.AuctionStatus.active,
            },
        });
    }
    async findById(id) {
        return this.prisma.auction.findUnique({
            where: { id },
            include: {
                listing: true,
                bids: true,
                winner: true,
            },
        });
    }
    async findByListing(listingId) {
        return this.prisma.auction.findFirst({
            where: { listing_id: listingId },
            include: {
                bids: true,
            },
            orderBy: { created_at: "desc" },
        });
    }
    async findActive(skip = 0, take = 20) {
        return this.prisma.auction.findMany({
            where: { status: client_1.AuctionStatus.active },
            include: {
                listing: true,
            },
            skip,
            take,
            orderBy: { end_time: "asc" },
        });
    }
    async placeBid(auctionId, placeBidDto) {
        return this.prisma.$transaction(async (prisma) => {
            const auction = await prisma.auction.findUnique({ where: { id: auctionId } });
            if (!auction) {
                throw new common_1.BadRequestException("Auction not found");
            }
            if (auction.status !== client_1.AuctionStatus.active) {
                throw new common_1.BadRequestException("Auction is not active");
            }
            if (new Date() > auction.end_time) {
                throw new common_1.BadRequestException("Auction has ended");
            }
            if (placeBidDto.amount <= Number(auction.current_price)) {
                throw new common_1.BadRequestException(`Bid must be greater than current price: ${auction.current_price}`);
            }
            if (auction.reserve_price && placeBidDto.amount < Number(auction.reserve_price)) {
                throw new common_1.BadRequestException(`Bid must meet reserve price: ${auction.reserve_price}`);
            }
            await prisma.auction.update({
                where: { id: auctionId },
                data: { current_price: placeBidDto.amount },
            });
            return prisma.auctionBid.create({
                data: {
                    auction_id: auctionId,
                    bidder_id: placeBidDto.bidder_id,
                    amount: placeBidDto.amount,
                },
            });
        });
    }
    async endAuction(id) {
        const auction = await this.findById(id);
        if (!auction) {
            throw new common_1.BadRequestException("Auction not found");
        }
        const highestBid = await this.prisma.auctionBid.findFirst({
            where: { auction_id: id },
            orderBy: { amount: "desc" },
        });
        return this.prisma.auction.update({
            where: { id },
            data: {
                status: client_1.AuctionStatus.ended,
                winner_id: highestBid ? highestBid.bidder_id : null,
            },
        });
    }
    async getBidHistory(auctionId) {
        return this.prisma.auctionBid.findMany({
            where: { auction_id: auctionId },
            include: {
                bidder: true,
            },
            orderBy: { created_at: "desc" },
        });
    }
};
exports.AuctionsService = AuctionsService;
exports.AuctionsService = AuctionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AuctionsService);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuctionsController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const auctions_service_1 = __webpack_require__(47);
const create_auction_dto_1 = __webpack_require__(49);
const place_bid_dto_1 = __webpack_require__(50);
let AuctionsController = class AuctionsController {
    constructor(auctionsService) {
        this.auctionsService = auctionsService;
    }
    async create(createAuctionDto) {
        return this.auctionsService.create(createAuctionDto);
    }
    async findActive(skip = 0, take = 20) {
        return this.auctionsService.findActive(skip, take);
    }
    async findById(id) {
        return this.auctionsService.findById(id);
    }
    async getBidHistory(id) {
        return this.auctionsService.getBidHistory(id);
    }
    async placeBid(id, placeBidDto, req) {
        placeBidDto.bidder_id = req.user.id;
        return this.auctionsService.placeBid(id, placeBidDto);
    }
    async endAuction(id) {
        return this.auctionsService.endAuction(id);
    }
};
exports.AuctionsController = AuctionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_auction_dto_1.CreateAuctionDto !== "undefined" && create_auction_dto_1.CreateAuctionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/bids'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "getBidHistory", null);
__decorate([
    (0, common_1.Post)(":id/bid"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof place_bid_dto_1.PlaceBidDto !== "undefined" && place_bid_dto_1.PlaceBidDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "placeBid", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "endAuction", null);
exports.AuctionsController = AuctionsController = __decorate([
    (0, common_1.Controller)("auctions"),
    __metadata("design:paramtypes", [typeof (_a = typeof auctions_service_1.AuctionsService !== "undefined" && auctions_service_1.AuctionsService) === "function" ? _a : Object])
], AuctionsController);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAuctionDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateAuctionDto {
}
exports.CreateAuctionDto = CreateAuctionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAuctionDto.prototype, "listing_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAuctionDto.prototype, "starting_price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateAuctionDto.prototype, "reserve_price", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAuctionDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAuctionDto.prototype, "end_time", void 0);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlaceBidDto = void 0;
const class_validator_1 = __webpack_require__(15);
class PlaceBidDto {
}
exports.PlaceBidDto = PlaceBidDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PlaceBidDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlaceBidDto.prototype, "bidder_id", void 0);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackingModule = void 0;
const common_1 = __webpack_require__(2);
const tracking_service_1 = __webpack_require__(52);
const tracking_controller_1 = __webpack_require__(53);
let TrackingModule = class TrackingModule {
};
exports.TrackingModule = TrackingModule;
exports.TrackingModule = TrackingModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [tracking_controller_1.TrackingController],
        providers: [tracking_service_1.TrackingService],
        exports: [tracking_service_1.TrackingService],
    })
], TrackingModule);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackingService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let TrackingService = class TrackingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTrackingLogDto) {
        return this.prisma.trackingLog.create({
            data: createTrackingLogDto,
        });
    }
    async findByContainer(containerNumber, limit = 100) {
        return this.prisma.trackingLog.findMany({
            where: { container_number: containerNumber },
            orderBy: { timestamp: "desc" },
            take: limit,
        });
    }
    async findByVessel(vesselImo, limit = 100) {
        return this.prisma.trackingLog.findMany({
            where: { vessel_imo: vesselImo },
            orderBy: { timestamp: "desc" },
            take: limit,
        });
    }
    async getLatestPosition(containerNumber) {
        return this.prisma.trackingLog.findFirst({
            where: { container_number: containerNumber },
            orderBy: { timestamp: "desc" },
        });
    }
    async getLatestVesselPosition(vesselImo) {
        return this.prisma.trackingLog.findFirst({
            where: { vessel_imo: vesselImo },
            orderBy: { timestamp: "desc" },
        });
    }
    async getMovementHistory(containerNumber, startDate, endDate) {
        return this.prisma.trackingLog.findMany({
            where: {
                container_number: containerNumber,
                timestamp: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { timestamp: "asc" },
        });
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], TrackingService);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackingController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const tracking_service_1 = __webpack_require__(52);
const create_tracking_log_dto_1 = __webpack_require__(54);
let TrackingController = class TrackingController {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async create(createTrackingLogDto) {
        return this.trackingService.create(createTrackingLogDto);
    }
    async findByContainer(containerNumber, limit = 100) {
        return this.trackingService.findByContainer(containerNumber, limit);
    }
    async findByVessel(vesselImo, limit = 100) {
        return this.trackingService.findByVessel(vesselImo, limit);
    }
    async getLatestPosition(containerNumber) {
        return this.trackingService.getLatestPosition(containerNumber);
    }
    async getLatestVesselPosition(vesselImo) {
        return this.trackingService.getLatestVesselPosition(vesselImo);
    }
    async getMovementHistory(containerNumber, startDate, endDate) {
        return this.trackingService.getMovementHistory(containerNumber, new Date(startDate), new Date(endDate));
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_tracking_log_dto_1.CreateTrackingLogDto !== "undefined" && create_tracking_log_dto_1.CreateTrackingLogDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("container/:containerNumber"),
    __param(0, (0, common_1.Param)('containerNumber')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "findByContainer", null);
__decorate([
    (0, common_1.Get)("vessel/:vesselImo"),
    __param(0, (0, common_1.Param)('vesselImo')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "findByVessel", null);
__decorate([
    (0, common_1.Get)('latest/container/:containerNumber'),
    __param(0, (0, common_1.Param)('containerNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getLatestPosition", null);
__decorate([
    (0, common_1.Get)('latest/vessel/:vesselImo'),
    __param(0, (0, common_1.Param)('vesselImo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getLatestVesselPosition", null);
__decorate([
    (0, common_1.Get)("history/:containerNumber"),
    __param(0, (0, common_1.Param)('containerNumber')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getMovementHistory", null);
exports.TrackingController = TrackingController = __decorate([
    (0, common_1.Controller)("tracking"),
    __metadata("design:paramtypes", [typeof (_a = typeof tracking_service_1.TrackingService !== "undefined" && tracking_service_1.TrackingService) === "function" ? _a : Object])
], TrackingController);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTrackingLogDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateTrackingLogDto {
}
exports.CreateTrackingLogDto = CreateTrackingLogDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTrackingLogDto.prototype, "container_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTrackingLogDto.prototype, "vessel_imo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTrackingLogDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTrackingLogDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTrackingLogDto.prototype, "speed", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTrackingLogDto.prototype, "heading", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTrackingLogDto.prototype, "timestamp", void 0);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsModule = void 0;
const common_1 = __webpack_require__(2);
const documents_service_1 = __webpack_require__(56);
const documents_controller_1 = __webpack_require__(58);
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService],
        exports: [documents_service_1.DocumentsService],
    })
], DocumentsModule);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
const crypto = __importStar(__webpack_require__(57));
let DocumentsService = class DocumentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateHash(content) {
        return crypto.createHash("sha256").update(content).digest("hex");
    }
    async create(createDocumentDto) {
        const qrHash = this.generateHash(createDocumentDto.file_url);
        return this.prisma.document.create({
            data: {
                ...createDocumentDto,
                qr_hash: qrHash,
            },
        });
    }
    async findById(id) {
        return this.prisma.document.findUnique({
            where: { id },
            include: {
                listing: true,
                transaction: true,
            },
        });
    }
    async findByListing(listingId) {
        return this.prisma.document.findMany({
            where: { listing_id: listingId },
        });
    }
    async findByTransaction(transactionId) {
        return this.prisma.document.findMany({
            where: { transaction_id: transactionId },
        });
    }
    async verify(id) {
        const document = await this.findById(id);
        if (!document) {
            throw new common_1.BadRequestException("Document not found");
        }
        return {
            valid: !document.is_revoked,
            document,
        };
    }
    async revoke(id) {
        const document = await this.findById(id);
        if (!document) {
            throw new common_1.BadRequestException("Document not found");
        }
        return this.prisma.document.update({
            where: { id },
            data: { is_revoked: true },
        });
    }
    async generateBillOfLading(transactionId) {
        const document = await this.create({
            type: client_1.DocumentType.bill_of_lading,
            transaction_id: transactionId,
            listing_id: null,
            file_url: `https://ontime-maritime.s3.amazonaws.com/documents/bl-${transactionId}.pdf`,
        });
        return document;
    }
    async generateInvoice(transactionId) {
        const document = await this.create({
            type: client_1.DocumentType.invoice,
            transaction_id: transactionId,
            listing_id: null,
            file_url: `https://ontime-maritime.s3.amazonaws.com/documents/invoice-${transactionId}.pdf`,
        });
        return document;
    }
    async generatePackingList(transactionId) {
        const document = await this.create({
            type: client_1.DocumentType.packing_list,
            transaction_id: transactionId,
            listing_id: null,
            file_url: `https://ontime-maritime.s3.amazonaws.com/documents/packing-${transactionId}.pdf`,
        });
        return document;
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], DocumentsService);


/***/ }),
/* 57 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentsController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const documents_service_1 = __webpack_require__(56);
const create_document_dto_1 = __webpack_require__(59);
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async create(createDocumentDto) {
        return this.documentsService.create(createDocumentDto);
    }
    async findById(id) {
        return this.documentsService.findById(id);
    }
    async findByListing(listingId) {
        return this.documentsService.findByListing(listingId);
    }
    async findByTransaction(transactionId) {
        return this.documentsService.findByTransaction(transactionId);
    }
    async verify(id) {
        return this.documentsService.verify(id);
    }
    async revoke(id) {
        return this.documentsService.revoke(id);
    }
    async generateBillOfLading(body) {
        return this.documentsService.generateBillOfLading(body.transactionId);
    }
    async generateInvoice(body) {
        return this.documentsService.generateInvoice(body.transactionId);
    }
    async generatePackingList(body) {
        return this.documentsService.generatePackingList(body.transactionId);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_document_dto_1.CreateDocumentDto !== "undefined" && create_document_dto_1.CreateDocumentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('listing/:listingId'),
    __param(0, (0, common_1.Param)('listingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findByListing", null);
__decorate([
    (0, common_1.Get)('transaction/:transactionId'),
    __param(0, (0, common_1.Param)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findByTransaction", null);
__decorate([
    (0, common_1.Get)(':id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)(':id/revoke'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "revoke", null);
__decorate([
    (0, common_1.Post)('generate/bill-of-lading'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "generateBillOfLading", null);
__decorate([
    (0, common_1.Post)('generate/invoice'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "generateInvoice", null);
__decorate([
    (0, common_1.Post)('generate/packing-list'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "generatePackingList", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)("documents"),
    __metadata("design:paramtypes", [typeof (_a = typeof documents_service_1.DocumentsService !== "undefined" && documents_service_1.DocumentsService) === "function" ? _a : Object])
], DocumentsController);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateDocumentDto = void 0;
const class_validator_1 = __webpack_require__(15);
const client_1 = __webpack_require__(8);
class CreateDocumentDto {
}
exports.CreateDocumentDto = CreateDocumentDto;
__decorate([
    (0, class_validator_1.IsEnum)(client_1.DocumentType),
    __metadata("design:type", typeof (_a = typeof client_1.DocumentType !== "undefined" && client_1.DocumentType) === "function" ? _a : Object)
], CreateDocumentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "file_url", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "listing_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "transaction_id", void 0);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsModule = void 0;
const common_1 = __webpack_require__(2);
const notifications_service_1 = __webpack_require__(61);
const notifications_controller_1 = __webpack_require__(62);
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [notifications_service_1.NotificationsService],
        exports: [notifications_service_1.NotificationsService],
    })
], NotificationsModule);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        return this.prisma.notification.create({
            data: {
                ...createNotificationDto,
                status: client_1.NotificationStatus.pending,
            },
        });
    }
    async findById(id) {
        return this.prisma.notification.findUnique({ where: { id } });
    }
    async findByUser(userId, skip = 0, take = 20) {
        return this.prisma.notification.findMany({
            where: { user_id: userId },
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
    async markAsSent(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { status: client_1.NotificationStatus.sent },
        });
    }
    async markAsFailed(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { status: client_1.NotificationStatus.failed },
        });
    }
    async sendSms(userId, title, message) {
        const notification = await this.create({
            user_id: userId,
            type: client_1.NotificationType.sms,
            title,
            body: message,
        });
        console.log(`[SMS] ${userId}: ${message}`);
        return this.markAsSent(notification.id);
    }
    async sendEmail(userId, title, message) {
        const notification = await this.create({
            user_id: userId,
            type: client_1.NotificationType.email,
            title,
            body: message,
        });
        console.log(`[EMAIL] ${userId}: ${message}`);
        return this.markAsSent(notification.id);
    }
    async sendPush(userId, title, message) {
        const notification = await this.create({
            user_id: userId,
            type: client_1.NotificationType.push,
            title,
            body: message,
        });
        console.log(`[PUSH] ${userId}: ${message}`);
        return this.markAsSent(notification.id);
    }
    async sendAuctionAlert(userId, auctionId, message) {
        await this.sendSms(userId, "Auction Update", message);
        await this.sendEmail(userId, "Auction Update", message);
    }
    async sendExecutiveCornerAlert(userId, listingId) {
        const message = `New high-value listing ≥$250,000 in Executive Corner. Listing ID: ${listingId}`;
        await this.sendSms(userId, "Executive Corner Alert", message);
        await this.sendEmail(userId, "Executive Corner Alert", message);
    }
    async sendTransactionAlert(userId, transactionId, amount) {
        const message = `New transaction: $${amount.toFixed(2)}. Transaction ID: ${transactionId}`;
        await this.sendSms(userId, "Transaction Alert", message);
        await this.sendEmail(userId, "Transaction Alert", message);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], NotificationsService);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const notifications_service_1 = __webpack_require__(61);
const create_notification_dto_1 = __webpack_require__(63);
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async create(createNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }
    async getMyNotifications(req, skip = 0, take = 20) {
        return this.notificationsService.findByUser(req.user.id, skip, take);
    }
    async findById(id) {
        return this.notificationsService.findById(id);
    }
    async markAsSent(id) {
        return this.notificationsService.markAsSent(id);
    }
    async markAsFailed(id) {
        return this.notificationsService.markAsFailed(id);
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_notification_dto_1.CreateNotificationDto !== "undefined" && create_notification_dto_1.CreateNotificationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("my-notifications"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getMyNotifications", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':id/sent'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsSent", null);
__decorate([
    (0, common_1.Post)(':id/failed'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsFailed", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)("notifications"),
    __metadata("design:paramtypes", [typeof (_a = typeof notifications_service_1.NotificationsService !== "undefined" && notifications_service_1.NotificationsService) === "function" ? _a : Object])
], NotificationsController);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateNotificationDto = void 0;
const class_validator_1 = __webpack_require__(15);
const client_1 = __webpack_require__(8);
class CreateNotificationDto {
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.NotificationType),
    __metadata("design:type", typeof (_a = typeof client_1.NotificationType !== "undefined" && client_1.NotificationType) === "function" ? _a : Object)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "body", void 0);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(2);
const admin_service_1 = __webpack_require__(65);
const admin_controller_1 = __webpack_require__(66);
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
        exports: [admin_service_1.AdminService],
    })
], AdminModule);


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
const client_1 = __webpack_require__(8);
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers(skip = 0, take = 20) {
        return this.prisma.user.findMany({
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
    async getUserStats() {
        const totalUsers = await this.prisma.user.count();
        const buyers = await this.prisma.user.count({ where: { role: client_1.UserRole.buyer } });
        const sellers = await this.prisma.user.count({ where: { role: client_1.UserRole.seller } });
        return { totalUsers, buyers, sellers };
    }
    async getAllListings(skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            include: { seller: true },
            orderBy: { created_at: "desc" },
        });
    }
    async getListingsByStatus(status, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            where: { status },
            skip,
            take,
            include: { seller: true },
        });
    }
    async approveHighValueListing(listingId, adminId) {
        const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            throw new common_1.BadRequestException("Listing not found");
        }
        const updatedListing = await this.prisma.listing.update({
            where: { id: listingId },
            data: { status: client_1.ListingStatus.active },
        });
        await this.logAction("APPROVED_LISTING", "listing", listingId, adminId, updatedListing);
        return updatedListing;
    }
    async rejectListing(listingId, adminId, reason) {
        const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            throw new common_1.BadRequestException("Listing not found");
        }
        const updatedListing = await this.prisma.listing.update({
            where: { id: listingId },
            data: { status: client_1.ListingStatus.archived },
        });
        await this.logAction("REJECTED_LISTING", "listing", listingId, adminId, { reason });
        return updatedListing;
    }
    async getAllTransactions(skip = 0, take = 20) {
        return this.prisma.transaction.findMany({
            skip,
            take,
            include: {
                buyer: true,
                seller: true,
                listing: true,
            },
            orderBy: { created_at: "desc" },
        });
    }
    async getTransactionStats() {
        const totalTransactions = await this.prisma.transaction.count();
        const aggregations = await this.prisma.transaction.aggregate({
            _sum: {
                commission_amount: true,
                amount: true,
            },
        });
        return {
            totalTransactions,
            totalCommission: aggregations._sum.commission_amount || 0,
            totalVolume: aggregations._sum.amount || 0,
        };
    }
    async logAction(action, module, entityId, adminId, details, ipAddress = "0.0.0.0") {
        return this.prisma.auditLog.create({
            data: {
                action,
                module,
                actor_id: adminId,
                details: { ...details, entityId },
                ip_address: ipAddress,
            },
        });
    }
    async getAuditLogs(skip = 0, take = 20) {
        return this.prisma.auditLog.findMany({
            skip,
            take,
            orderBy: { timestamp: "desc" },
        });
    }
    async getAuditLogsByModule(module, skip = 0, take = 20) {
        return this.prisma.auditLog.findMany({
            where: { module },
            skip,
            take,
            orderBy: { timestamp: "desc" },
        });
    }
    async suspendUser(userId, adminId, reason) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        await this.logAction("SUSPENDED_USER", "user", userId, adminId, { reason });
        return user;
    }
    async deleteUser(userId, adminId, reason) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        await this.logAction("DELETED_USER", "user", userId, adminId, { reason });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AdminService);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(23);
const admin_service_1 = __webpack_require__(65);
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    checkAdminRole(req) {
        if (req.user.role !== "admin" && req.user.role !== "executive") {
            throw new common_1.ForbiddenException("Admin access required");
        }
    }
    async getAllUsers(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAllUsers(skip, take);
    }
    async getUserStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getUserStats();
    }
    async getAllListings(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAllListings(skip, take);
    }
    async getListingsByStatus(status, skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getListingsByStatus(status, skip, take);
    }
    async approveListing(id, req) {
        this.checkAdminRole(req);
        return this.adminService.approveHighValueListing(id, req.user.id);
    }
    async rejectListing(id, body, req) {
        this.checkAdminRole(req);
        return this.adminService.rejectListing(id, req.user.id, body.reason);
    }
    async getAllTransactions(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAllTransactions(skip, take);
    }
    async getTransactionStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getTransactionStats();
    }
    async getAuditLogs(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogs(skip, take);
    }
    async getAuditLogsByModule(module, skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogsByModule(module, skip, take);
    }
    async suspendUser(id, body, req) {
        this.checkAdminRole(req);
        return this.adminService.suspendUser(id, req.user.id, body.reason);
    }
    async deleteUser(id, body, req) {
        this.checkAdminRole(req);
        await this.adminService.deleteUser(id, req.user.id, body.reason);
        return { message: "User deleted successfully" };
    }
    async getFraudFlags(skip, take, req) {
        this.checkAdminRole(req);
        const flags = await req.prisma.fraudFlag.findMany({
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
        return flags;
    }
    async getUserFraudScore(userId, req) {
        this.checkAdminRole(req);
        const flags = await req.prisma.fraudFlag.findMany({
            where: { user_id: userId },
        });
        return { userId, flags, count: flags.length };
    }
    async getDashboardStats(req) {
        this.checkAdminRole(req);
        const userStats = await this.adminService.getUserStats();
        const transactionStats = await this.adminService.getTransactionStats();
        return {
            users: userStats,
            transactions: transactionStats,
            timestamp: new Date(),
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("users"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)("users/stats"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)("listings"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllListings", null);
__decorate([
    (0, common_1.Get)("listings/status/:status"),
    __param(0, (0, common_1.Param)("status")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListingsByStatus", null);
__decorate([
    (0, common_1.Post)("listings/:id/approve"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveListing", null);
__decorate([
    (0, common_1.Post)("listings/:id/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectListing", null);
__decorate([
    (0, common_1.Get)("transactions"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllTransactions", null);
__decorate([
    (0, common_1.Get)("transactions/stats"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTransactionStats", null);
__decorate([
    (0, common_1.Get)("audit-logs"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)("audit-logs/:module"),
    __param(0, (0, common_1.Param)("module")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogsByModule", null);
__decorate([
    (0, common_1.Post)("users/:id/suspend"),
    __param(0, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Post)("users/:id/delete"),
    __param(0, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)("fraud/flags"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getFraudFlags", null);
__decorate([
    (0, common_1.Get)("fraud/user/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserFraudScore", null);
__decorate([
    (0, common_1.Get)("stats/dashboard"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsModule = void 0;
const common_1 = __webpack_require__(2);
const ratings_service_1 = __webpack_require__(68);
const ratings_controller_1 = __webpack_require__(69);
const prisma_module_1 = __webpack_require__(6);
let RatingsModule = class RatingsModule {
};
exports.RatingsModule = RatingsModule;
exports.RatingsModule = RatingsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [ratings_service_1.RatingsService],
        controllers: [ratings_controller_1.RatingsController],
        exports: [ratings_service_1.RatingsService],
    })
], RatingsModule);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let RatingsService = class RatingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRatingDto) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: createRatingDto.transaction_id },
        });
        if (!transaction) {
            throw new common_1.BadRequestException('Transaction not found');
        }
        return this.prisma.rating.create({
            data: {
                user_id: createRatingDto.user_id,
                rater_id: createRatingDto.rater_id,
                score: createRatingDto.score,
                comment: createRatingDto.comment,
            },
        });
    }
    async getRatingsForUser(userId, skip = 0, take = 20) {
        return this.prisma.rating.findMany({
            where: { user_id: userId },
            skip,
            take,
            orderBy: { created_at: 'desc' },
        });
    }
    async getAverageRating(userId) {
        const result = await this.prisma.rating.aggregate({
            where: { user_id: userId },
            _avg: { score: true },
        });
        return result._avg.score || 0;
    }
    async getRatingCount(userId) {
        return this.prisma.rating.count({
            where: { user_id: userId },
        });
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], RatingsService);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RatingsController = void 0;
const common_1 = __webpack_require__(2);
const ratings_service_1 = __webpack_require__(68);
const create_rating_dto_1 = __webpack_require__(70);
const jwt_auth_guard_1 = __webpack_require__(23);
let RatingsController = class RatingsController {
    constructor(ratingsService) {
        this.ratingsService = ratingsService;
    }
    async create(createRatingDto) {
        return this.ratingsService.create(createRatingDto);
    }
    async getRatings(userId) {
        const ratings = await this.ratingsService.getRatingsForUser(userId);
        const average = await this.ratingsService.getAverageRating(userId);
        const count = await this.ratingsService.getRatingCount(userId);
        return { ratings, average, count };
    }
};
exports.RatingsController = RatingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_rating_dto_1.CreateRatingDto !== "undefined" && create_rating_dto_1.CreateRatingDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getRatings", null);
exports.RatingsController = RatingsController = __decorate([
    (0, common_1.Controller)("ratings"),
    __metadata("design:paramtypes", [typeof (_a = typeof ratings_service_1.RatingsService !== "undefined" && ratings_service_1.RatingsService) === "function" ? _a : Object])
], RatingsController);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRatingDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateRatingDto {
}
exports.CreateRatingDto = CreateRatingDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "transaction_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "rater_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateRatingDto.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRatingDto.prototype, "comment", void 0);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArbitrationModule = void 0;
const common_1 = __webpack_require__(2);
const arbitration_service_1 = __webpack_require__(72);
const arbitration_controller_1 = __webpack_require__(73);
const prisma_module_1 = __webpack_require__(6);
let ArbitrationModule = class ArbitrationModule {
};
exports.ArbitrationModule = ArbitrationModule;
exports.ArbitrationModule = ArbitrationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [arbitration_service_1.ArbitrationService],
        controllers: [arbitration_controller_1.ArbitrationController],
        exports: [arbitration_service_1.ArbitrationService],
    })
], ArbitrationModule);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArbitrationService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let ArbitrationService = class ArbitrationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createArbitrationDto) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: createArbitrationDto.transaction_id },
        });
        if (!transaction) {
            throw new common_1.BadRequestException("Transaction not found");
        }
        return this.prisma.arbitrationCase.create({
            data: {
                transaction_id: createArbitrationDto.transaction_id,
                complainant_id: createArbitrationDto.complainant_id,
                defendant_id: createArbitrationDto.defendant_id,
                issue_summary: createArbitrationDto.issue_summary,
                evidence_urls: createArbitrationDto.evidence_urls || [],
                status: "open",
            },
        });
    }
    async findById(id) {
        return this.prisma.arbitrationCase.findUnique({
            where: { id },
        });
    }
    async findByTransaction(transactionId) {
        return this.prisma.arbitrationCase.findFirst({
            where: { transaction_id: transactionId },
        });
    }
    async resolve(id, resolution) {
        return this.prisma.arbitrationCase.update({
            where: { id },
            data: {
                status: "resolved",
                resolution,
            },
        });
    }
    async escalate(id) {
        return this.prisma.arbitrationCase.update({
            where: { id },
            data: { status: "escalated" },
        });
    }
    async getPendingCases(skip = 0, take = 20) {
        return this.prisma.arbitrationCase.findMany({
            where: { status: "open" },
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
};
exports.ArbitrationService = ArbitrationService;
exports.ArbitrationService = ArbitrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ArbitrationService);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArbitrationController = void 0;
const common_1 = __webpack_require__(2);
const arbitration_service_1 = __webpack_require__(72);
const create_arbitration_dto_1 = __webpack_require__(74);
const jwt_auth_guard_1 = __webpack_require__(23);
let ArbitrationController = class ArbitrationController {
    constructor(arbitrationService) {
        this.arbitrationService = arbitrationService;
    }
    async create(createArbitrationDto) {
        return this.arbitrationService.create(createArbitrationDto);
    }
    async getCase(id) {
        return this.arbitrationService.findById(id);
    }
    async getCaseByTransaction(transactionId) {
        return this.arbitrationService.findByTransaction(transactionId);
    }
    async resolve(id, resolution) {
        return this.arbitrationService.resolve(id, resolution);
    }
    async escalate(id) {
        return this.arbitrationService.escalate(id);
    }
    async getPending() {
        return this.arbitrationService.getPendingCases();
    }
};
exports.ArbitrationController = ArbitrationController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_arbitration_dto_1.CreateArbitrationDto !== "undefined" && create_arbitration_dto_1.CreateArbitrationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ArbitrationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("case/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArbitrationController.prototype, "getCase", null);
__decorate([
    (0, common_1.Get)("transaction/:transactionId"),
    __param(0, (0, common_1.Param)("transactionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArbitrationController.prototype, "getCaseByTransaction", null);
__decorate([
    (0, common_1.Patch)(":id/resolve"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("resolution")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ArbitrationController.prototype, "resolve", null);
__decorate([
    (0, common_1.Patch)(":id/escalate"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArbitrationController.prototype, "escalate", null);
__decorate([
    (0, common_1.Get)("pending"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArbitrationController.prototype, "getPending", null);
exports.ArbitrationController = ArbitrationController = __decorate([
    (0, common_1.Controller)("arbitration"),
    __metadata("design:paramtypes", [typeof (_a = typeof arbitration_service_1.ArbitrationService !== "undefined" && arbitration_service_1.ArbitrationService) === "function" ? _a : Object])
], ArbitrationController);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateArbitrationDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateArbitrationDto {
}
exports.CreateArbitrationDto = CreateArbitrationDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateArbitrationDto.prototype, "transaction_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateArbitrationDto.prototype, "complainant_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateArbitrationDto.prototype, "defendant_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], CreateArbitrationDto.prototype, "issue_summary", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateArbitrationDto.prototype, "evidence_urls", void 0);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsuranceModule = void 0;
const common_1 = __webpack_require__(2);
const insurance_service_1 = __webpack_require__(76);
const insurance_controller_1 = __webpack_require__(77);
const prisma_module_1 = __webpack_require__(6);
let InsuranceModule = class InsuranceModule {
};
exports.InsuranceModule = InsuranceModule;
exports.InsuranceModule = InsuranceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [insurance_service_1.InsuranceService],
        controllers: [insurance_controller_1.InsuranceController],
        exports: [insurance_service_1.InsuranceService],
    })
], InsuranceModule);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsuranceService = void 0;
const common_1 = __webpack_require__(2);
const prisma_service_1 = __webpack_require__(7);
let InsuranceService = class InsuranceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProvider(providerData) {
        const existing = await this.prisma.insuranceProvider.findUnique({
            where: { email: providerData.email },
        });
        if (existing) {
            throw new common_1.BadRequestException("Provider already registered");
        }
        return this.prisma.insuranceProvider.create({
            data: providerData,
        });
    }
    async getProviders(skip = 0, take = 20) {
        return this.prisma.insuranceProvider.findMany({
            where: { is_verified: true },
            skip,
            take,
        });
    }
    async createPolicy(createPolicyDto) {
        const provider = await this.prisma.insuranceProvider.findUnique({
            where: { id: createPolicyDto.provider_id },
        });
        if (!provider || !provider.is_verified) {
            throw new common_1.BadRequestException("Invalid insurance provider");
        }
        return this.prisma.insurancePolicy.create({
            data: {
                buyer_id: createPolicyDto.buyer_id,
                listing_id: createPolicyDto.listing_id,
                provider_id: createPolicyDto.provider_id,
                policy_number: createPolicyDto.policy_number,
                policy_pdf_url: createPolicyDto.policy_pdf_url,
            },
        });
    }
    async getPoliciesByBuyer(buyerId) {
        return this.prisma.insurancePolicy.findMany({
            where: { buyer_id: buyerId },
            include: { provider: true },
        });
    }
    async validatePolicy(policyId) {
        const policy = await this.prisma.insurancePolicy.findUnique({
            where: { id: policyId },
        });
        if (!policy)
            return false;
        if (policy.status !== "active")
            return false;
        return true;
    }
};
exports.InsuranceService = InsuranceService;
exports.InsuranceService = InsuranceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], InsuranceService);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsuranceController = void 0;
const common_1 = __webpack_require__(2);
const insurance_service_1 = __webpack_require__(76);
const create_insurance_policy_dto_1 = __webpack_require__(78);
const jwt_auth_guard_1 = __webpack_require__(23);
let InsuranceController = class InsuranceController {
    constructor(insuranceService) {
        this.insuranceService = insuranceService;
    }
    async getProviders() {
        return this.insuranceService.getProviders();
    }
    async createPolicy(createPolicyDto) {
        return this.insuranceService.createPolicy(createPolicyDto);
    }
    async getPolicies(buyerId) {
        return this.insuranceService.getPoliciesByBuyer(buyerId);
    }
    async validatePolicy(policyId) {
        const isValid = await this.insuranceService.validatePolicy(policyId);
        return { valid: isValid };
    }
};
exports.InsuranceController = InsuranceController;
__decorate([
    (0, common_1.Get)("providers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getProviders", null);
__decorate([
    (0, common_1.Post)("policy"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_insurance_policy_dto_1.CreateInsurancePolicyDto !== "undefined" && create_insurance_policy_dto_1.CreateInsurancePolicyDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "createPolicy", null);
__decorate([
    (0, common_1.Get)("policies/:buyerId"),
    __param(0, (0, common_1.Param)("buyerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "getPolicies", null);
__decorate([
    (0, common_1.Get)("validate/:policyId"),
    __param(0, (0, common_1.Param)("policyId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InsuranceController.prototype, "validatePolicy", null);
exports.InsuranceController = InsuranceController = __decorate([
    (0, common_1.Controller)("insurance"),
    __metadata("design:paramtypes", [typeof (_a = typeof insurance_service_1.InsuranceService !== "undefined" && insurance_service_1.InsuranceService) === "function" ? _a : Object])
], InsuranceController);


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInsurancePolicyDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateInsurancePolicyDto {
}
exports.CreateInsurancePolicyDto = CreateInsurancePolicyDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInsurancePolicyDto.prototype, "buyer_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInsurancePolicyDto.prototype, "listing_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateInsurancePolicyDto.prototype, "provider_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInsurancePolicyDto.prototype, "policy_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInsurancePolicyDto.prototype, "policy_pdf_url", void 0);


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(2);
let AppController = class AppController {
    getHello() {
        return { message: 'OnTime Maritime Backend is running' };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecurityMiddleware = void 0;
const common_1 = __webpack_require__(2);
let SecurityMiddleware = class SecurityMiddleware {
    use(req, res, next) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('Content-Security-Policy', "default-src 'self'");
        next();
    }
};
exports.SecurityMiddleware = SecurityMiddleware;
exports.SecurityMiddleware = SecurityMiddleware = __decorate([
    (0, common_1.Injectable)()
], SecurityMiddleware);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const security_middleware_1 = __webpack_require__(80);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(new security_middleware_1.SecurityMiddleware().use);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const PORT = process.env.PORT || 3001;
    await app.listen(PORT);
    console.log(`[OnTime Maritime] Backend running on port ${PORT} | Environment: ${process.env.NODE_ENV}`);
}
bootstrap().catch((err) => {
    console.error('Fatal error during startup:', err);
    process.exit(1);
});

})();

/******/ })()
;