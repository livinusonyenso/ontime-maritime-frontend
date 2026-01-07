import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { User, UserRole, Listing, ListingStatus, Transaction, AuditLog, Prisma } from "@prisma/client"

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(skip = 0, take = 20): Promise<User[]> {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
  }

  async getUserStats(): Promise<any> {
    const totalUsers = await this.prisma.user.count()
    const buyers = await this.prisma.user.count({ where: { role: UserRole.buyer } })
    const sellers = await this.prisma.user.count({ where: { role: UserRole.seller } })

    return { totalUsers, buyers, sellers }
  }

  async getAllListings(skip = 0, take = 20): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      skip,
      take,
      include: { seller: true },
      orderBy: { created_at: "desc" },
    })
  }

  async getListingsByStatus(status: ListingStatus, skip = 0, take = 20): Promise<Listing[]> {
    return this.prisma.listing.findMany({
      where: { status },
      skip,
      take,
      include: { seller: true },
    })
  }

  async approveHighValueListing(listingId: string, adminId: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } })

    if (!listing) {
      throw new BadRequestException("Listing not found")
    }

    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.active },
    })

    await this.logAction("APPROVED_LISTING", "listing", listingId, adminId, updatedListing)

    return updatedListing
  }

  async rejectListing(listingId: string, adminId: string, reason: string): Promise<Listing> {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } })

    if (!listing) {
      throw new BadRequestException("Listing not found")
    }

    const updatedListing = await this.prisma.listing.update({
      where: { id: listingId },
      data: { status: ListingStatus.archived },
    })

    await this.logAction("REJECTED_LISTING", "listing", listingId, adminId, { reason })

    return updatedListing
  }

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

  async suspendUser(userId: string, adminId: string, reason: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new BadRequestException("User not found")
    }

    await this.logAction("SUSPENDED_USER", "user", userId, adminId, { reason })

    return user
  }

  async deleteUser(userId: string, adminId: string, reason: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new BadRequestException("User not found")
    }

    await this.logAction("DELETED_USER", "user", userId, adminId, { reason })
  }
}
