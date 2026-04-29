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
exports.ArbitrationController = void 0;
const common_1 = require("@nestjs/common");
const arbitration_service_1 = require("./arbitration.service");
const create_arbitration_dto_1 = require("./dto/create-arbitration.dto");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
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
    __metadata("design:paramtypes", [create_arbitration_dto_1.CreateArbitrationDto]),
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
    __metadata("design:paramtypes", [arbitration_service_1.ArbitrationService])
], ArbitrationController);
//# sourceMappingURL=arbitration.controller.js.map