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
exports.KycService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KycService);
//# sourceMappingURL=kyc.service.js.map