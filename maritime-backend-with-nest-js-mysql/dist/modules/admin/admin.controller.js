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
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const admin_service_1 = require("./admin.service");
class UpdateUserRoleDto {
}
class UpdateSubscriptionDto {
}
class SuspendUserDto {
}
class DeleteUserDto {
}
class RejectListingDto {
}
class ApproveKycDto {
}
class RejectKycDto {
}
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    checkAdminRole(req) {
        if (req.user.role !== "admin" && req.user.role !== "executive") {
            throw new common_1.ForbiddenException("Admin access required");
        }
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
        return this.adminService.updateUserRole(id, body.role, req.user.id);
    }
    async updateUserSubscription(id, body, req) {
        this.checkAdminRole(req);
        const expiry = body.subscription_expiry ? new Date(body.subscription_expiry) : null;
        return this.adminService.updateUserSubscription(id, body.subscription_status, expiry, req.user.id);
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
    async getPendingKyc(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getPendingKyc(parseInt(skip), parseInt(take));
    }
    async approveKyc(id, body, req) {
        this.checkAdminRole(req);
        return this.adminService.approveKyc(id, req.user.id, body.comment);
    }
    async rejectKyc(id, body, req) {
        this.checkAdminRole(req);
        return this.adminService.rejectKyc(id, req.user.id, body.comment);
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
        return this.adminService.approveHighValueListing(id, req.user.id);
    }
    async rejectListing(id, body, req) {
        this.checkAdminRole(req);
        return this.adminService.rejectListing(id, req.user.id, body.reason);
    }
    async getAllTransactions(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getAllTransactions(parseInt(skip), parseInt(take));
    }
    async getTransactionStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getTransactionStats();
    }
    async getAuditLogs(skip = "0", take = "20", req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogs(parseInt(skip), parseInt(take));
    }
    async getAuditLogsByModule(module, skip = "0", take = "20", req) {
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
    (0, common_1.Get)("kyc/pending"),
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPendingKyc", null);
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
    __param(0, (0, common_1.Query)("skip")),
    __param(1, (0, common_1.Query)("take")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)("audit-logs/:module"),
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