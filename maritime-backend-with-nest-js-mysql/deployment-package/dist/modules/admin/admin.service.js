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
const mail_service_1 = require("../notifications/mail.service");
const client_1 = require("@prisma/client");
let AdminService = class AdminService {
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
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
        const organizations = await this.prisma.user.count({ where: { role: client_1.UserRole.organization } });
        const admins = await this.prisma.user.count({ where: { role: client_1.UserRole.admin } });
        const verifiedUsers = await this.prisma.user.count({ where: { is_email_verified: true } });
        return { totalUsers, buyers, sellers, organizations, admins, verifiedUsers };
    }
    async updateUserRole(userId, role, adminId, ipAddress, userAgent, actorEmail) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { role } });
        await this.logAction("UPDATED_USER_ROLE", "user", userId, adminId, { previousRole: user.role, newRole: role, targetEmail: user.email }, ipAddress, actorEmail, userAgent);
        return updatedUser;
    }
    async updateUserSubscription(userId, subscriptionStatus, subscriptionExpiry, adminId, ipAddress, userAgent, actorEmail) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { subscription_status: subscriptionStatus, subscription_expiry: subscriptionExpiry },
        });
        await this.logAction("UPDATED_SUBSCRIPTION", "user", userId, adminId, { previousStatus: user.subscription_status, newStatus: subscriptionStatus, expiry: subscriptionExpiry, targetEmail: user.email }, ipAddress, actorEmail, userAgent);
        return updatedUser;
    }
    async suspendUser(userId, adminId, reason, ipAddress, userAgent, actorEmail) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        const suspendedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { subscription_status: "suspended" },
        });
        await this.logAction("SUSPENDED_USER", "user", userId, adminId, { reason, targetEmail: user.email }, ipAddress, actorEmail, userAgent);
        return suspendedUser;
    }
    async deleteUser(userId, adminId, reason, ipAddress, userAgent, actorEmail) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.logAction("DELETED_USER", "user", userId, adminId, { reason, targetEmail: user.email }, ipAddress, actorEmail, userAgent);
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
    async getKycStats() {
        const [pending, approved, rejected] = await Promise.all([
            this.prisma.kyc.count({ where: { status: client_1.KycStatus.pending } }),
            this.prisma.kyc.count({ where: { status: client_1.KycStatus.approved } }),
            this.prisma.kyc.count({ where: { status: client_1.KycStatus.rejected } }),
        ]);
        return { pending, approved, rejected };
    }
    async getKycByStatus(status, skip = 0, take = 20) {
        return this.prisma.kyc.findMany({
            where: { status },
            skip,
            take,
            include: { user: true },
            orderBy: { created_at: "desc" },
        });
    }
    async approveKyc(kycId, adminId, comment, ipAddress, userAgent, actorEmail) {
        const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } });
        if (!kyc)
            throw new common_1.NotFoundException("KYC record not found");
        const approvedKyc = await this.prisma.kyc.update({
            where: { id: kycId },
            data: { status: client_1.KycStatus.approved, admin_comment: comment || "Approved" },
        });
        await this.prisma.user.update({
            where: { id: kyc.user_id },
            data: { is_email_verified: true },
        });
        await this.logAction("APPROVED_KYC", "kyc", kycId, adminId, { comment, userId: kyc.user_id }, ipAddress, actorEmail, userAgent);
        return approvedKyc;
    }
    async rejectKyc(kycId, adminId, comment, ipAddress, userAgent, actorEmail) {
        const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } });
        if (!kyc)
            throw new common_1.NotFoundException("KYC record not found");
        const rejectedKyc = await this.prisma.kyc.update({
            where: { id: kycId },
            data: { status: client_1.KycStatus.rejected, admin_comment: comment },
        });
        await this.logAction("REJECTED_KYC", "kyc", kycId, adminId, { comment, userId: kyc.user_id }, ipAddress, actorEmail, userAgent);
        return rejectedKyc;
    }
    async getAllListings(skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            include: { seller: { select: { id: true, email: true, first_name: true, last_name: true, company_name: true } } },
            orderBy: { created_at: "desc" },
        });
    }
    async getListingsByStatus(status, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            where: { status },
            skip,
            take,
            include: { seller: { select: { id: true, email: true, first_name: true, last_name: true, company_name: true } } },
            orderBy: { created_at: "desc" },
        });
    }
    async getListingStats() {
        const [pending, active, rejected, archived] = await Promise.all([
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.pending } }),
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.active } }),
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.rejected } }),
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.archived } }),
        ]);
        return { pending, active, rejected, archived };
    }
    async approveListing(listingId, adminId, ipAddress, userAgent, actorEmail) {
        const listing = await this.prisma.listing.findUnique({
            where: { id: listingId },
            include: { seller: { select: { email: true } } },
        });
        if (!listing)
            throw new common_1.NotFoundException("Listing not found");
        const updatedListing = await this.prisma.listing.update({
            where: { id: listingId },
            data: { status: client_1.ListingStatus.active, approved_by: adminId, approved_at: new Date(), rejection_reason: null },
        });
        await this.logAction("APPROVED_LISTING", "listing", listingId, adminId, { title: listing.title, sellerId: listing.seller_id }, ipAddress, actorEmail, userAgent);
        if (listing.seller?.email) {
            this.mailService.sendListingApprovedEmail(listing.seller.email, listing.title).catch(() => { });
        }
        return updatedListing;
    }
    async approveHighValueListing(listingId, adminId) {
        return this.approveListing(listingId, adminId);
    }
    async rejectListing(listingId, adminId, reason, ipAddress, userAgent, actorEmail) {
        const listing = await this.prisma.listing.findUnique({
            where: { id: listingId },
            include: { seller: { select: { email: true } } },
        });
        if (!listing)
            throw new common_1.NotFoundException("Listing not found");
        const updatedListing = await this.prisma.listing.update({
            where: { id: listingId },
            data: { status: client_1.ListingStatus.rejected, rejection_reason: reason, rejected_at: new Date() },
        });
        await this.logAction("REJECTED_LISTING", "listing", listingId, adminId, { reason, title: listing.title, sellerId: listing.seller_id }, ipAddress, actorEmail, userAgent);
        if (listing.seller?.email) {
            this.mailService.sendListingRejectedEmail(listing.seller.email, listing.title, reason).catch(() => { });
        }
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
        const [totalUsers, totalListings, pendingListings, totalTransactions, pendingKyc, activeAuctions, revenueData, rawActivity,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.active } }),
            this.prisma.listing.count({ where: { status: client_1.ListingStatus.pending } }),
            this.prisma.transaction.count(),
            this.prisma.kyc.count({ where: { status: client_1.KycStatus.pending } }),
            this.prisma.auction.count({ where: { status: "active" } }),
            this.prisma.transaction.aggregate({
                _sum: { commission_amount: true },
            }),
            this.prisma.auditLog.findMany({
                take: 10,
                orderBy: { timestamp: "desc" },
            }),
        ]);
        const actorIds = [
            ...new Set(rawActivity.map(a => a.actor_id).filter((id) => !!id)),
        ];
        const actors = actorIds.length > 0
            ? await this.prisma.user.findMany({
                where: { id: { in: actorIds } },
                select: { id: true, first_name: true, last_name: true, email: true },
            })
            : [];
        const actorMap = new Map(actors.map(u => [u.id, u]));
        const recentActivity = rawActivity.map(log => {
            const actor = log.actor_id ? actorMap.get(log.actor_id) : null;
            const actorName = actor
                ? [actor.first_name, actor.last_name].filter(Boolean).join(" ") || actor.email
                : "System";
            return {
                id: log.id,
                action: log.action,
                module: log.module,
                actor_id: log.actor_id,
                actor_name: actorName,
                details: log.details,
                timestamp: log.timestamp,
            };
        });
        return {
            total_users: totalUsers,
            total_listings: totalListings,
            pending_listings: pendingListings,
            total_transactions: totalTransactions,
            total_revenue: revenueData._sum.commission_amount || 0,
            pending_kyc: pendingKyc,
            active_auctions: activeAuctions,
            recent_activity: recentActivity,
        };
    }
    async logAction(action, module, targetId, adminId, details, ipAddress = "0.0.0.0", actorEmail, userAgent) {
        return this.prisma.auditLog.create({
            data: {
                action,
                module,
                actor_id: adminId || undefined,
                actor_email: actorEmail || undefined,
                target_id: targetId || undefined,
                details: details,
                ip_address: ipAddress,
                user_agent: userAgent || undefined,
            },
        });
    }
    async getAuditLogs(opts = {}) {
        const where = {};
        if (opts.module)
            where.module = opts.module;
        if (opts.actorId)
            where.actor_id = opts.actorId;
        if (opts.action)
            where.action = { contains: opts.action };
        if (opts.dateFrom || opts.dateTo) {
            where.timestamp = {
                ...(opts.dateFrom && { gte: opts.dateFrom }),
                ...(opts.dateTo && { lte: opts.dateTo }),
            };
        }
        const skip = opts.skip ?? 0;
        const take = opts.take ?? 50;
        const [data, total] = await Promise.all([
            this.prisma.auditLog.findMany({ where, skip, take, orderBy: { timestamp: "desc" } }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { data, total };
    }
    async getAuditLogsByModule(module, skip = 0, take = 50) {
        return this.getAuditLogs({ module, skip, take });
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], AdminService);
//# sourceMappingURL=admin.service.js.map