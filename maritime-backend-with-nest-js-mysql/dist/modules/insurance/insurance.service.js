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
exports.InsuranceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InsuranceService);
//# sourceMappingURL=insurance.service.js.map