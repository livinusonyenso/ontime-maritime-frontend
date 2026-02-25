import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { User, UserRole, Listing, ListingStatus, Transaction, AuditLog, Kyc, KycStatus, Prisma } from "@prisma/client"

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // ==================== USER MANAGEMENT ====================

  async getAllUsers(skip = 0, take = 20): Promise<User[]> {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        kyc: true,
        listings: {
          take: 5,
          orderBy: { created_at: "desc" },
        },
      },
    })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    return user
  }

  async getUserStats(): Promise<any> {
    const totalUsers = await this.prisma.user.count()
    const buyers = await this.prisma.user.count({ where: { role: UserRole.buyer } })
    const sellers = await this.prisma.user.count({ where: { role: UserRole.seller } })
    const admins = await this.prisma.user.count({ where: { role: UserRole.admin } })
    const verifiedUsers = await this.prisma.user.count({ where: { is_email_verified: true } })

    return { totalUsers, buyers, sellers, admins, verifiedUsers }
  }

  async updateUserRole(userId: string, role: UserRole, adminId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { role },
    })

    await this.logAction("UPDATED_USER_ROLE", "user", userId, adminId, {
      previousRole: user.role,
      newRole: role,
    })

    return updatedUser
  }

  async updateUserSubscription(
    userId: string,
    subscriptionStatus: string,
    subscriptionExpiry: Date | null,
    adminId: string
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscription_status: subscriptionStatus,
        subscription_expiry: subscriptionExpiry,
      },
    })

    await this.logAction("UPDATED_SUBSCRIPTION", "user", userId, adminId, {
      previousStatus: user.subscription_status,
      newStatus: subscriptionStatus,
      expiry: subscriptionExpiry,
    })

    return updatedUser
  }

  async suspendUser(userId: string, adminId: string, reason: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Update subscription status to "suspended"
    const suspendedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { subscription_status: "suspended" },
    })

    await this.logAction("SUSPENDED_USER", "user", userId, adminId, { reason })

    return suspendedUser
  }

  async deleteUser(userId: string, adminId: string, reason: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new NotFoundException("User not found")
    }

    // Log before deletion
    await this.logAction("DELETED_USER", "user", userId, adminId, {
      reason,
      deletedUserEmail: user.email,
    })

    // Actually delete the user (cascade will handle related records)
    await this.prisma.user.delete({ where: { id: userId } })
  }

  // ==================== KYC MANAGEMENT ====================

  async getPendingKyc(skip = 0, take = 20): Promise<Kyc[]> {
    return this.prisma.kyc.findMany({
      where: { status: KycStatus.pending },
      skip,
      take,
      include: { user: true },
      orderBy: { created_at: "desc" },
    })
  }

  async getKycStats(): Promise<{ pending: number; approved: number; rejected: number }> {
    const [pending, approved, rejected] = await Promise.all([
      this.prisma.kyc.count({ where: { status: KycStatus.pending } }),
      this.prisma.kyc.count({ where: { status: KycStatus.approved } }),
      this.prisma.kyc.count({ where: { status: KycStatus.rejected } }),
    ])
    return { pending, approved, rejected }
  }

  async getKycByStatus(status: KycStatus, skip = 0, take = 20): Promise<Kyc[]> {
    return this.prisma.kyc.findMany({
      where: { status },
      skip,
      take,
      include: { user: true },
      orderBy: { created_at: "desc" },
    })
  }

  async approveKyc(kycId: string, adminId: string, comment?: string): Promise<Kyc> {
    const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } })

    if (!kyc) {
      throw new NotFoundException("KYC record not found")
    }

    const approvedKyc = await this.prisma.kyc.update({
      where: { id: kycId },
      data: {
        status: KycStatus.approved,
        admin_comment: comment || "Approved",
      },
    })

    // Also update user verification status
    await this.prisma.user.update({
      where: { id: kyc.user_id },
      data: { is_email_verified: true },
    })

    await this.logAction("APPROVED_KYC", "kyc", kycId, adminId, { comment })

    return approvedKyc
  }

  async rejectKyc(kycId: string, adminId: string, comment: string): Promise<Kyc> {
    const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } })

    if (!kyc) {
      throw new NotFoundException("KYC record not found")
    }

    const rejectedKyc = await this.prisma.kyc.update({
      where: { id: kycId },
      data: {
        status: KycStatus.rejected,
        admin_comment: comment,
      },
    })

    await this.logAction("REJECTED_KYC", "kyc", kycId, adminId, { comment })

    return rejectedKyc
  }

  // ==================== LISTING MANAGEMENT ====================

  async getAllListings(skip = 0, take = 20): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      skip,
      take,
      include: { seller: { select: { id: true, email: true, first_name: true, last_name: true } } },
      orderBy: { created_at: "desc" },
    })
  }

  async getListingsByStatus(status: ListingStatus, skip = 0, take = 20): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: { status },
      skip,
      take,
      include: { seller: { select: { id: true, email: true, first_name: true, last_name: true } } },
      orderBy: { created_at: "desc" },
    })
  }

  async getListingStats(): Promise<{ pending: number; active: number; rejected: number; archived: number }> {
    const [pending, active, rejected, archived] = await Promise.all([
      this.prisma.listing.count({ where: { status: ListingStatus.pending } }),
      this.prisma.listing.count({ where: { status: ListingStatus.active } }),
      this.prisma.listing.count({ where: { status: ListingStatus.rejected } }),
      this.prisma.listing.count({ where: { status: ListingStatus.archived } }),
    ])
    return { pending, active, rejected, archived }
  }

  async approveListing(listingId: string, adminId: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } })
    if (!listing) throw new NotFoundException("Listing not found")

    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        status: ListingStatus.active,
        approved_by: adminId,
        approved_at: new Date(),
        rejection_reason: null,
      },
    })

    await this.logAction("APPROVED_LISTING", "listing", listingId, adminId, { title: listing.title })

    return updatedListing
  }

  // Keep old name as alias for backward compat
  async approveHighValueListing(listingId: string, adminId: string): Promise<Listing> {
    return this.approveListing(listingId, adminId)
  }

  async rejectListing(listingId: string, adminId: string, reason: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } })
    if (!listing) throw new NotFoundException("Listing not found")

    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: {
        status: ListingStatus.rejected,
        rejection_reason: reason,
        rejected_at: new Date(),
      },
    })

    await this.logAction("REJECTED_LISTING", "listing", listingId, adminId, { reason, title: listing.title })

    return updatedListing
  }

  // ==================== TRANSACTION MANAGEMENT ====================

  async getAllTransactions(skip = 0, take = 20): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      skip,
      take,
      include: {
        buyer: true,
        seller: true,
        listing: true,
      },
      orderBy: { created_at: "desc" },
    })
  }

  async getTransactionStats(): Promise<any> {
    const totalTransactions = await this.prisma.transaction.count()
    const aggregations = await this.prisma.transaction.aggregate({
      _sum: {
        commission_amount: true,
        amount: true,
      },
    })

    return {
      totalTransactions,
      totalCommission: aggregations._sum.commission_amount || 0,
      totalVolume: aggregations._sum.amount || 0,
    }
  }

  // ==================== DASHBOARD STATS ====================

  async getDashboardStats(): Promise<any> {
    const [
      totalUsers,
      totalListings,
      totalTransactions,
      pendingKyc,
      activeAuctions,
      revenueData,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.listing.count({ where: { status: ListingStatus.active } }),
      this.prisma.transaction.count(),
      this.prisma.kyc.count({ where: { status: KycStatus.pending } }),
      this.prisma.auction.count({ where: { status: "active" } }),
      this.prisma.transaction.aggregate({
        _sum: { commission_amount: true },
      }),
    ])

    return {
      total_users: totalUsers,
      total_listings: totalListings,
      total_transactions: totalTransactions,
      total_revenue: revenueData._sum.commission_amount || 0,
      pending_kyc: pendingKyc,
      active_auctions: activeAuctions,
    }
  }

  // ==================== AUDIT LOGS ====================

  async logAction(
    action: string,
    module: string,
    entityId: string,
    adminId: string,
    details: any,
    ipAddress = "0.0.0.0",
  ): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data: {
        action,
        module,
        actor_id: adminId,
        details: { ...details, entityId } as Prisma.JsonObject,
        ip_address: ipAddress,
      },
    })
  }

  async getAuditLogs(skip = 0, take = 20): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      skip,
      take,
      orderBy: { timestamp: "desc" },
    })
  }

  async getAuditLogsByModule(module: string, skip = 0, take = 20): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      where: { module },
      skip,
      take,
      orderBy: { timestamp: "desc" },
    })
  }

  // ==================== FRAUD MANAGEMENT ====================

  async getFraudFlags(skip = 0, take = 20) {
    return this.prisma.fraudFlag.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
  }

  async getUserFraudScore(userId: string) {
    const flags = await this.prisma.fraudFlag.findMany({
      where: { user_id: userId },
    })
    return { userId, flags, count: flags.length }
  }
}
