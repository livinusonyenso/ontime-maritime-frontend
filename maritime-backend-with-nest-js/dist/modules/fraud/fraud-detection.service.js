"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FraudDetectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FraudDetectionService);
//# sourceMappingURL=fraud-detection.service.js.map