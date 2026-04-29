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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const admin_service_1 = require("./admin.service");
class UpdateUserRoleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserRoleDto.prototype, "role", void 0);
class UpdateSubscriptionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "subscription_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSubscriptionDto.prototype, "subscription_expiry", void 0);
class SuspendUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SuspendUserDto.prototype, "reason", void 0);
class DeleteUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteUserDto.prototype, "reason", void 0);
class RejectListingDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RejectListingDto.prototype, "reason", void 0);
class ApproveKycDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApproveKycDto.prototype, "comment", void 0);
class RejectKycDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RejectKycDto.prototype, "comment", void 0);
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    checkAdminRole(req) {
        if (req.user.role !== "admin" && req.user.role !== "executive") {
            throw new common_1.ForbiddenException("Admin access required");
        }
    }
    getCtx(req) {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.ip ||
            req.socket?.remoteAddress ||
            "0.0.0.0";
        return {
            ip,
            ua: req.headers["user-agent"],
            email: req.user?.email,
        };
    }
    async getDashboardStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getDashboardStats();
    }
    async getAllUsers(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getAllUsers(parseInt(skip), parseInt(take));
    }
    async getUserStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getUserStats();
    }
    async getUserById(id, req) {
        this.checkAdminRole(req);
        return this.adminService.getUserById(id);
    }
    async updateUserRole(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        return this.adminService.updateUserRole(id, body.role, req.user.id, ip, ua, email);
    }
    async updateUserSubscription(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        const expiry = body.subscription_expiry ? new Date(body.subscription_expiry) : null;
        return this.adminService.updateUserSubscription(id, body.subscription_status, expiry, req.user.id, ip, ua, email);
    }
    async suspendUser(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        return this.adminService.suspendUser(id, req.user.id, body.reason, ip, ua, email);
    }
    async deleteUser(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        await this.adminService.deleteUser(id, req.user.id, body.reason, ip, ua, email);
        return { message: "User deleted successfully" };
    }
    async getKycStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getKycStats();
    }
    async getPendingKyc(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getPendingKyc(parseInt(skip), parseInt(take));
    }
    async getKycList(status = "pending", skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getKycByStatus(status, parseInt(skip), parseInt(take));
    }
    async approveKyc(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        return this.adminService.approveKyc(id, req.user.id, body.comment, ip, ua, email);
    }
    async rejectKyc(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        return this.adminService.rejectKyc(id, req.user.id, body.comment, ip, ua, email);
    }
    async getListingStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getListingStats();
    }
    async getAllListings(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getAllListings(parseInt(skip), parseInt(take));
    }
    async getListingsByStatus(status, skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getListingsByStatus(status, parseInt(skip), parseInt(take));
    }
    async approveListing(id, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        return this.adminService.approveListing(id, req.user.id, ip, ua, email);
    }
    async rejectListing(id, body, req) {
        this.checkAdminRole(req);
        const { ip, ua, email } = this.getCtx(req);
        return this.adminService.rejectListing(id, req.user.id, body.reason, ip, ua, email);
    }
    async getAllTransactions(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getAllTransactions(parseInt(skip), parseInt(take));
    }
    async getTransactionStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getTransactionStats();
    }
    async getAuditLogs(module, action, actorId, dateFrom, dateTo, skip = "0", take = "50", req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogs({
            module,
            action,
            actorId,
            dateFrom: dateFrom ? new Date(dateFrom) : undefined,
            dateTo: dateTo ? new Date(dateTo) : undefined,
            skip: parseInt(skip),
            take: parseInt(take),
        });
    }
    async getAuditLogsByModule(module, skip = "0", take = "50", req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogsByModule(module, parseInt(skip), parseInt(take));
    }
    async getFraudFlags(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getFraudFlags(parseInt(skip), parseInt(take));
    }
    async getUserFraudScore(userId, req) {
        this.checkAdminRole(req);
        return this.adminService.getUserFraudScore(userId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("stats"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)("users"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
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
    (0, common_1.Get)("users/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)("users/:id/role"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserRoleDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Patch)("users/:id/subscription"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateSubscriptionDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserSubscription", null);
__decorate([
    (0, common_1.Post)("users/:id/suspend"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SuspendUserDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Delete)("users/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DeleteUserDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)("kyc/stats"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getKycStats", null);
__decorate([
    (0, common_1.Get)("kyc/pending"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPendingKyc", null);
__decorate([
    (0, common_1.Get)("kyc/list"),
    __param(0, (0, common_1.Query)("status")),
    __param(1, (0, common_1.Query)("skip")),
    __param(2, (0, common_1.Query)("take")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getKycList", null);
__decorate([
    (0, common_1.Post)("kyc/:id/approve"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ApproveKycDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveKyc", null);
__decorate([
    (0, common_1.Post)("kyc/:id/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RejectKycDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectKyc", null);
__decorate([
    (0, common_1.Get)("listings/stats"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getListingStats", null);
__decorate([
    (0, common_1.Get)("listings"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllListings", null);
__decorate([
    (0, common_1.Get)("listings/status/:status"),
    __param(0, (0, common_1.Param)("status")),
    __param(1, (0, common_1.Query)("skip")),
    __param(2, (0, common_1.Query)("take")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
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
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, RejectListingDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectListing", null);
__decorate([
    (0, common_1.Get)("transactions"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
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
    __param(0, (0, common_1.Query)("module")),
    __param(1, (0, common_1.Query)("action")),
    __param(2, (0, common_1.Query)("actorId")),
    __param(3, (0, common_1.Query)("dateFrom")),
    __param(4, (0, common_1.Query)("dateTo")),
    __param(5, (0, common_1.Query)("skip")),
    __param(6, (0, common_1.Query)("take")),
    __param(7, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)("audit-logs/module/:module"),
    __param(0, (0, common_1.Param)("module")),
    __param(1, (0, common_1.Query)("skip")),
    __param(2, (0, common_1.Query)("take")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogsByModule", null);
__decorate([
    (0, common_1.Get)("fraud/flags"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
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
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map