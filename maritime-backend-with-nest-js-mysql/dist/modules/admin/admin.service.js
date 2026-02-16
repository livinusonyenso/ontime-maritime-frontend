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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers(skip = 0, take = 20) {
        return this.prisma.user.findMany({
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                kyc: true,
                listings: {
                    take: 5,
                    orderBy: { created_at: "desc" },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async getUserStats() {
        const totalUsers = await this.prisma.user.count();
        const buyers = await this.prisma.user.count({ where: { role: client_1.UserRole.buyer } });
        const sellers = await this.prisma.user.count({ where: { role: client_1.UserRole.seller } });
        const admins = await this.prisma.user.count({ where: { role: client_1.UserRole.admin } });
        const verifiedUsers = await this.prisma.user.count({ where: { is_email_verified: true } });
        return { totalUsers, buyers, sellers, admins, verifiedUsers };
    }
    async updateUserRole(userId, role, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        await this.logAction("UPDATED_USER_ROLE", "user", userId, adminId, {
            previousRole: user.role,
            newRole: role,
        });
        return updatedUser;
    }
    async updateUserSubscription(userId, subscriptionStatus, subscriptionExpiry, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                subscription_status: subscriptionStatus,
                subscription_expiry: subscriptionExpiry,
            },
        });
        await this.logAction("UPDATED_SUBSCRIPTION", "user", userId, adminId, {
            previousStatus: user.subscription_status,
            newStatus: subscriptionStatus,
            expiry: subscriptionExpiry,
        });
        return updatedUser;
    }
    async suspendUser(userId, adminId, reason) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const suspendedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { subscription_status: "suspended" },
        });
        await this.logAction("SUSPENDED_USER", "user", userId, adminId, { reason });
        return suspendedUser;
    }
    async deleteUser(userId, adminId, reason) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        await this.logAction("DELETED_USER", "user", userId, adminId, {
            reason,
            deletedUserEmail: user.email,
        });
        await this.prisma.user.delete({ where: { id: userId } });
    }
    async getPendingKyc(skip = 0, take = 20) {
        return this.prisma.kyc.findMany({
            where: { status: client_1.KycStatus.pending },
            skip,
            take,
            include: { user: true },
            orderBy: { created_at: "desc" },
        });
    }
    async approveKyc(kycId, adminId, comment) {
        const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } });
        if (!kyc) {
            throw new common_1.NotFoundException("KYC record not found");
        }
        const approvedKyc = await this.prisma.kyc.update({
            where: { id: kycId },
            data: {
                status: client_1.KycStatus.approved,
                admin_comment: comment || "Approved",
            },
        });
        await this.prisma.user.update({
            where: { id: kyc.user_id },
            data: { is_email_verified: true },
        });
        await this.logAction("APPROVED_KYC", "kyc", kycId, adminId, { comment });
        return approvedKyc;
    }
    async rejectKyc(kycId, adminId, comment) {
        const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } });
        if (!kyc) {
            throw new common_1.NotFoundException("KYC record not found");
        }
        const rejectedKyc = await this.prisma.kyc.update({
            where: { id: kycId },
            data: {
                status: client_1.KycStatus.rejected,
                admin_comment: comment,
            },
        });
        await this.logAction("REJECTED_KYC", "kyc", kycId, adminId, { comment });
        return rejectedKyc;
    }
    async getAllListings(skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            include: { seller: true },
            orderBy: { created_at: "desc" },
        });
    }
    async getListingsByStatus(status, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            where: { status },
            skip,
            take,
            include: { seller: true },
        });
    }
    async approveHighValueListing(listingId, adminId) {
        const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            throw new common_1.NotFoundException("Listing not found");
        }
        const updatedListing = await this.prisma.listing.update({
            where: { id: listingId },
            data: { status: client_1.ListingStatus.active },
        });
        await this.logAction("APPROVED_LISTING", "listing", listingId, adminId, updatedListing);
        return updatedListing;
    }
    async rejectListing(listingId, adminId, reason) {
        const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });
        if (!listing) {
            throw new common_1.NotFoundException("Listing not found");
        }
        const updatedListing = await this.prisma.listing.update({
            where: { id: listingId },
            data: { status: client_1.ListingStatus.archived },
        });
        await this.logAction("REJECTED_LISTING", "listing", listingId, adminId, { reason });
        return updatedListing;
    }
    async getAllTransactions(skip = 0, take = 20) {
        return this.prisma.transaction.findMany({
            skip,
            take,
            include: {
                buyer: true,
                seller: true,
                listing: true,
            },
            orderBy: { created_at: "desc" },
        });
    }
    async getTransactionStats() {
        const totalTransactions = await this.prisma.transaction.count();
        const aggregations = await this.prisma.transaction.aggregate({
            _sum: {
                commission_amount: true,
                amount: true,
            },
        });
        return {
            totalTransactions,
            totalCommission: aggregations._sum.commission_amount || 0,
            totalVolume: aggregations._sum.amount || 0,
        };
    }
    async getDashboardStats() {
        const [totalUsers, totalListings, totalTransactions, pendingKyc, activeAuctions, revenueData,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.active } }),
            this.prisma.transaction.count(),
            this.prisma.kyc.count({ where: { status: client_1.KycStatus.pending } }),
            this.prisma.auction.count({ where: { status: "active" } }),
            this.prisma.transaction.aggregate({
                _sum: { commission_amount: true },
            }),
        ]);
        return {
            total_users: totalUsers,
            total_listings: totalListings,
            total_transactions: totalTransactions,
            total_revenue: revenueData._sum.commission_amount || 0,
            pending_kyc: pendingKyc,
            active_auctions: activeAuctions,
        };
    }
    async logAction(action, module, entityId, adminId, details, ipAddress = "0.0.0.0") {
        return this.prisma.auditLog.create({
            data: {
                action,
                module,
                actor_id: adminId,
                details: { ...details, entityId },
                ip_address: ipAddress,
            },
        });
    }
    async getAuditLogs(skip = 0, take = 20) {
        return this.prisma.auditLog.findMany({
            skip,
            take,
            orderBy: { timestamp: "desc" },
        });
    }
    async getAuditLogsByModule(module, skip = 0, take = 20) {
        return this.prisma.auditLog.findMany({
            where: { module },
            skip,
            take,
            orderBy: { timestamp: "desc" },
        });
    }
    async getFraudFlags(skip = 0, take = 20) {
        return this.prisma.fraudFlag.findMany({
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
    async getUserFraudScore(userId) {
        const flags = await this.prisma.fraudFlag.findMany({
            where: { user_id: userId },
        });
        return { userId, flags, count: flags.length };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map