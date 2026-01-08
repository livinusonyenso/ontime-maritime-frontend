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
exports.ArbitrationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArbitrationService);
//# sourceMappingURL=arbitration.service.js.map