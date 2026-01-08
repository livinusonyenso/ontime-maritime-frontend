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
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    checkAdminRole(req) {
        if (req.user.role !== "admin" && req.user.role !== "executive") {
            throw new common_1.ForbiddenException("Admin access required");
        }
    }
    async getAllUsers(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAllUsers(skip, take);
    }
    async getUserStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getUserStats();
    }
    async getAllListings(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAllListings(skip, take);
    }
    async getListingsByStatus(status, skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getListingsByStatus(status, skip, take);
    }
    async approveListing(id, req) {
        this.checkAdminRole(req);
        return this.adminService.approveHighValueListing(id, req.user.id);
    }
    async rejectListing(id, body, req) {
        this.checkAdminRole(req);
        return this.adminService.rejectListing(id, req.user.id, body.reason);
    }
    async getAllTransactions(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAllTransactions(skip, take);
    }
    async getTransactionStats(req) {
        this.checkAdminRole(req);
        return this.adminService.getTransactionStats();
    }
    async getAuditLogs(skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogs(skip, take);
    }
    async getAuditLogsByModule(module, skip, take, req) {
        this.checkAdminRole(req);
        return this.adminService.getAuditLogsByModule(module, skip, take);
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
    async getFraudFlags(skip, take, req) {
        this.checkAdminRole(req);
        const flags = await req.prisma.fraudFlag.findMany({
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
        return flags;
    }
    async getUserFraudScore(userId, req) {
        this.checkAdminRole(req);
        const flags = await req.prisma.fraudFlag.findMany({
            where: { user_id: userId },
        });
        return { userId, flags, count: flags.length };
    }
    async getDashboardStats(req) {
        this.checkAdminRole(req);
        const userStats = await this.adminService.getUserStats();
        const transactionStats = await this.adminService.getTransactionStats();
        return {
            users: userStats,
            transactions: transactionStats,
            timestamp: new Date(),
        };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)("users"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
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
    (0, common_1.Get)("listings"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllListings", null);
__decorate([
    (0, common_1.Get)("listings/status/:status"),
    __param(0, (0, common_1.Param)("status")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
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
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectListing", null);
__decorate([
    (0, common_1.Get)("transactions"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
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
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogs", null);
__decorate([
    (0, common_1.Get)("audit-logs/:module"),
    __param(0, (0, common_1.Param)("module")),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogsByModule", null);
__decorate([
    (0, common_1.Post)("users/:id/suspend"),
    __param(0, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Post)("users/:id/delete"),
    __param(0, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)("fraud/flags"),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
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
__decorate([
    (0, common_1.Get)("stats/dashboard"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("admin"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map