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
exports.ExecutiveCornerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const executive_corner_service_1 = require("./executive-corner.service");
const approve_executive_corner_dto_1 = require("./dto/approve-executive-corner.dto");
const reject_executive_corner_dto_1 = require("./dto/reject-executive-corner.dto");
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
    __metadata("design:paramtypes", [String, approve_executive_corner_dto_1.ApproveExecutiveCornerDto, Object]),
    __metadata("design:returntype", Promise)
], ExecutiveCornerController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(":id/reject"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_executive_corner_dto_1.RejectExecutiveCornerDto, Object]),
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
    __metadata("design:paramtypes", [executive_corner_service_1.ExecutiveCornerService])
], ExecutiveCornerController);
//# sourceMappingURL=executive-corner.controller.js.map