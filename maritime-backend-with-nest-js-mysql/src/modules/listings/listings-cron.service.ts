import { Injectable, Logger } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { PrismaService } from "../../prisma/prisma.service"
import { ListingStatus } from "@prisma/client"

@Injectable()
export class ListingsCronService {
  private readonly logger = new Logger(ListingsCronService.name)

  constructor(private prisma: PrismaService) {}

  /**
   * Runs every 30 minutes.
   * If a listing has been in `pending` status for ≥48 hours, flag it so
   * an admin review can be escalated. Business rule: auto-archive after 48 h
   * if no admin action has been taken.
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async checkAndAutoRelease() {
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000) // 48 hours ago

    const staleListings = await this.prisma.listing.findMany({
      where: {
        status: ListingStatus.pending,
        created_at: { lte: cutoff },
      },
      select: { id: true, title: true, seller_id: true },
    })

    if (staleListings.length === 0) return

    this.logger.warn(
      `SLA breach: ${staleListings.length} listing(s) pending for >48 h — archiving: ${staleListings.map((l) => l.id).join(", ")}`
    )

    // Auto-archive overdue pending listings
    await this.prisma.listing.updateMany({
      where: { id: { in: staleListings.map((l) => l.id) } },
      data: {
        status: ListingStatus.archived,
        rejection_reason: "Auto-archived: no admin review within 48 hours (SLA breach).",
      },
    })
  }
}
