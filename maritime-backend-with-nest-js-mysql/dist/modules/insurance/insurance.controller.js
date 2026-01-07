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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceController = void 0;
const common_1 = require("@nestjs/common");
const insurance_service_1 = require("./insurance.service");
const create_insurance_policy_dto_1 = require("./dto/create-insurance-policy.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
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
    __metadata("design:paramtypes", [create_insurance_policy_dto_1.CreateInsurancePolicyDto]),
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
    __metadata("design:paramtypes", [insurance_service_1.InsuranceService])
], InsuranceController);
//# sourceMappingURL=insurance.controller.js.map