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
exports.KycController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const kyc_service_1 = require("./kyc.service");
const create_kyc_dto_1 = require("./dto/create-kyc.dto");
const update_kyc_dto_1 = require("./dto/update-kyc.dto");
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kyc_dto_1.CreateKycDto, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("my-kyc"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getMyKyc", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_kyc_dto_1.UpdateKycDto]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("pending"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "getPendingKyc", null);
__decorate([
    (0, common_1.Patch)(":id/approve"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "approveKyc", null);
__decorate([
    (0, common_1.Patch)(":id/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("comment")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "rejectKyc", null);
exports.KycController = KycController = __decorate([
    (0, common_1.Controller)("kyc"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [kyc_service_1.KycService])
], KycController);
//# sourceMappingURL=kyc.controller.js.map