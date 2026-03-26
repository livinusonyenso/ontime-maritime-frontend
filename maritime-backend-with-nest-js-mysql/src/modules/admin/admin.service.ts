import { Injectable, BadRequestException, NotFoundException, Inject } from "@nestjs/common"
import { CACHE_MANAGER } from "@nestjs/cache-manager"
import { Cache } from "cache-manager"
import { PrismaService } from "../../prisma/prisma.service"
import { MailService } from "../notifications/mail.service"
import { User, UserRole, Listing, ListingStatus, Transaction, AuditLog, Kyc, KycStatus, Prisma } from "@prisma/client"

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
    const totalUsers    = await this.prisma.user.count()
    const buyers        = await this.prisma.user.count({ where: { role: UserRole.buyer } })
    const sellers       = await this.prisma.user.count({ where: { role: UserRole.seller } })
    const organizations = await this.prisma.user.count({ where: { role: UserRole.organization } })
    const admins        = await this.prisma.user.count({ where: { role: UserRole.admin } })
    const verifiedUsers = await this.prisma.user.count({ where: { is_email_verified: true } })

    return { totalUsers, buyers, sellers, organizations, admins, verifiedUsers }
  }

  async updateUserRole(
    userId: string,
    role: UserRole,
    adminId: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException("User not found")

    const updatedUser = await this.prisma.user.update({ where: { id: userId }, data: { role } })

    await this.logAction("UPDATED_USER_ROLE", "user", userId, adminId,
      { previousRole: user.role, newRole: role, targetEmail: user.email },
      ipAddress, actorEmail, userAgent,
    )

    return updatedUser
  }

  async updateUserSubscription(
    userId: string,
    subscriptionStatus: string,
    subscriptionExpiry: Date | null,
    adminId: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException("User not found")

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { subscription_status: subscriptionStatus, subscription_expiry: subscriptionExpiry },
    })

    await this.logAction("UPDATED_SUBSCRIPTION", "user", userId, adminId,
      { previousStatus: user.subscription_status, newStatus: subscriptionStatus, expiry: subscriptionExpiry, targetEmail: user.email },
      ipAddress, actorEmail, userAgent,
    )

    return updatedUser
  }

  async suspendUser(
    userId: string,
    adminId: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException("User not found")

    const suspendedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { subscription_status: "suspended" },
    })

    await this.logAction("SUSPENDED_USER", "user", userId, adminId,
      { reason, targetEmail: user.email },
      ipAddress, actorEmail, userAgent,
    )

    return suspendedUser
  }

  async deleteUser(
    userId: string,
    adminId: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException("User not found")

    // Log before deletion so the record exists
    await this.logAction("DELETED_USER", "user", userId, adminId,
      { reason, targetEmail: user.email },
      ipAddress, actorEmail, userAgent,
    )

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

  async approveKyc(
    kycId: string,
    adminId: string,
    comment?: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<Kyc> {
    const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } })
    if (!kyc) throw new NotFoundException("KYC record not found")

    const approvedKyc = await this.prisma.kyc.update({
      where: { id: kycId },
      data: { status: KycStatus.approved, admin_comment: comment || "Approved" },
    })

    await this.prisma.user.update({
      where: { id: kyc.user_id },
      data: { is_email_verified: true },
    })

    await this.logAction("APPROVED_KYC", "kyc", kycId, adminId,
      { comment, userId: kyc.user_id },
      ipAddress, actorEmail, userAgent,
    )

    return approvedKyc
  }

  async rejectKyc(
    kycId: string,
    adminId: string,
    comment: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<Kyc> {
    const kyc = await this.prisma.kyc.findUnique({ where: { id: kycId } })
    if (!kyc) throw new NotFoundException("KYC record not found")

    const rejectedKyc = await this.prisma.kyc.update({
      where: { id: kycId },
      data: { status: KycStatus.rejected, admin_comment: comment },
    })

    await this.logAction("REJECTED_KYC", "kyc", kycId, adminId,
      { comment, userId: kyc.user_id },
      ipAddress, actorEmail, userAgent,
    )

    return rejectedKyc
  }

  // ==================== LISTING MANAGEMENT ====================

  async getAllListings(skip = 0, take = 20): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      skip,
      take,
      include: { seller: { select: { id: true, email: true, first_name: true, last_name: true, company_name: true } } },
      orderBy: { created_at: "desc" },
    })
  }

  async getListingsByStatus(status: ListingStatus, skip = 0, take = 20): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: { status },
      skip,
      take,
      include: { seller: { select: { id: true, email: true, first_name: true, last_name: true, company_name: true } } },
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

  async approveListing(
    listingId: string,
    adminId: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: { seller: { select: { email: true } } },
    })
    if (!listing) throw new NotFoundException("Listing not found")

    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.active, approved_by: adminId, approved_at: new Date(), rejection_reason: null },
    })

    await this.logAction("APPROVED_LISTING", "listing", listingId, adminId,
      { title: listing.title, sellerId: listing.seller_id },
      ipAddress, actorEmail, userAgent,
    )

    // Invalidate marketplace cache so fresh data is served
    await this.cacheManager.del("marketplace_listings").catch(() => {})
    await this.cacheManager.del(`marketplace_listing_${listingId}`).catch(() => {})

    // Fire-and-forget — don't block the response if email fails
    if ((listing as any).seller?.email) {
      this.mailService.sendListingApprovedEmail((listing as any).seller.email, listing.title).catch(() => {})
    }

    return updatedListing
  }

  // Keep old name as alias for backward compat
  async approveHighValueListing(listingId: string, adminId: string): Promise<Listing> {
    return this.approveListing(listingId, adminId)
  }

  async rejectListing(
    listingId: string,
    adminId: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
    actorEmail?: string,
  ): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: { seller: { select: { email: true } } },
    })
    if (!listing) throw new NotFoundException("Listing not found")

    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.rejected, rejection_reason: reason, rejected_at: new Date() },
    })

    await this.logAction("REJECTED_LISTING", "listing", listingId, adminId,
      { reason, title: listing.title, sellerId: listing.seller_id },
      ipAddress, actorEmail, userAgent,
    )

    // Invalidate marketplace cache so fresh data is served
    await this.cacheManager.del("marketplace_listings").catch(() => {})
    await this.cacheManager.del(`marketplace_listing_${listingId}`).catch(() => {})

    // Fire-and-forget — don't block the response if email fails
    if ((listing as any).seller?.email) {
      this.mailService.sendListingRejectedEmail((listing as any).seller.email, listing.title, reason).catch(() => {})
    }

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
      pendingListings,
      totalTransactions,
      pendingKyc,
      activeAuctions,
      revenueData,
      rawActivity,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.listing.count({ where: { status: ListingStatus.active } }),
      this.prisma.listing.count({ where: { status: ListingStatus.pending } }),
      this.prisma.transaction.count(),
      this.prisma.kyc.count({ where: { status: KycStatus.pending } }),
      this.prisma.auction.count({ where: { status: "active" } }),
      this.prisma.transaction.aggregate({
        _sum: { commission_amount: true },
      }),
      this.prisma.auditLog.findMany({
        take: 10,
        orderBy: { timestamp: "desc" },
      }),
    ])

    // Resolve actor names in one query (no N+1)
    const actorIds = [
      ...new Set(rawActivity.map(a => a.actor_id).filter((id): id is string => !!id)),
    ]
    const actors = actorIds.length > 0
      ? await this.prisma.user.findMany({
          where:  { id: { in: actorIds } },
          select: { id: true, first_name: true, last_name: true, email: true },
        })
      : []
    const actorMap = new Map(actors.map(u => [u.id, u]))

    const recentActivity = rawActivity.map(log => {
      const actor = log.actor_id ? actorMap.get(log.actor_id) : null
      const actorName = actor
        ? [actor.first_name, actor.last_name].filter(Boolean).join(" ") || actor.email
        : "System"
      return {
        id:         log.id,
        action:     log.action,
        module:     log.module,
        actor_id:   log.actor_id,
        actor_name: actorName,
        details:    log.details,
        timestamp:  log.timestamp,
      }
    })

    return {
      total_users:        totalUsers,
      total_listings:     totalListings,
      pending_listings:   pendingListings,
      total_transactions: totalTransactions,
      total_revenue:      revenueData._sum.commission_amount || 0,
      pending_kyc:        pendingKyc,
      active_auctions:    activeAuctions,
      recent_activity:    recentActivity,
    }
  }

  // ==================== AUDIT LOGS ====================

  // Append-only — no update/delete of audit records allowed
  async logAction(
    action: string,
    module: string,
    targetId: string,
    adminId: string,
    details: any,
    ipAddress = "0.0.0.0",
    actorEmail?: string,
    userAgent?: string,
  ): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data: {
        action,
        module,
        actor_id:    adminId   || undefined,
        actor_email: actorEmail || undefined,
        target_id:   targetId  || undefined,
        details:     details   as Prisma.JsonObject,
        ip_address:  ipAddress,
        user_agent:  userAgent || undefined,
      } as any, // cast until `prisma generate` refreshes client types
    })
  }

  async getAuditLogs(opts: {
    module?:   string
    action?:   string
    actorId?:  string
    dateFrom?: Date
    dateTo?:   Date
    skip?:     number
    take?:     number
  } = {}): Promise<{ data: AuditLog[]; total: number }> {
    const where: Prisma.AuditLogWhereInput = {}

    if (opts.module)  where.module   = opts.module
    if (opts.actorId) where.actor_id = opts.actorId
    if (opts.action)  where.action   = { contains: opts.action }
    if (opts.dateFrom || opts.dateTo) {
      where.timestamp = {
        ...(opts.dateFrom && { gte: opts.dateFrom }),
        ...(opts.dateTo   && { lte: opts.dateTo   }),
      }
    }

    const skip = opts.skip ?? 0
    const take = opts.take ?? 50

    const [data, total] = await Promise.all([
      this.prisma.auditLog.findMany({ where, skip, take, orderBy: { timestamp: "desc" } }),
      this.prisma.auditLog.count({ where }),
    ])

    return { data, total }
  }

  async getAuditLogsByModule(module: string, skip = 0, take = 50): Promise<{ data: AuditLog[]; total: number }> {
    return this.getAuditLogs({ module, skip, take })
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
