import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { Notification, NotificationStatus, NotificationType } from "@prisma/client"
import { CreateNotificationDto } from "./dto/create-notification.dto"

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        ...createNotificationDto,
        status: NotificationStatus.pending,
      },
    })
  }

  async findById(id: string): Promise<Notification | null> {
    return this.prisma.notification.findUnique({ where: { id } })
  }

  async findByUser(userId: string, skip = 0, take = 20): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { user_id: userId },
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
  }

  async markAsSent(id: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: { status: NotificationStatus.sent },
    })
  }

  async markAsFailed(id: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: { status: NotificationStatus.failed },
    })
  }

  async sendSms(userId: string, title: string, message: string): Promise<Notification> {
    const notification = await this.create({
      user_id: userId,
      type: NotificationType.sms,
      title,
      body: message,
    })

    console.log(`[SMS] ${userId}: ${message}`)
    return this.markAsSent(notification.id)
  }

  async sendEmail(userId: string, title: string, message: string): Promise<Notification> {
    const notification = await this.create({
      user_id: userId,
      type: NotificationType.email,
      title,
      body: message,
    })

    console.log(`[EMAIL] ${userId}: ${message}`)
    return this.markAsSent(notification.id)
  }

  async sendPush(userId: string, title: string, message: string): Promise<Notification> {
    const notification = await this.create({
      user_id: userId,
      type: NotificationType.push,
      title,
      body: message,
    })

    console.log(`[PUSH] ${userId}: ${message}`)
    return this.markAsSent(notification.id)
  }

  async sendAuctionAlert(userId: string, auctionId: string, message: string): Promise<void> {
    await this.sendSms(userId, "Auction Update", message)
    await this.sendEmail(userId, "Auction Update", message)
  }

  async sendExecutiveCornerAlert(userId: string, listingId: string): Promise<void> {
    const message = `New high-value listing ≥$250,000 in Executive Corner. Listing ID: ${listingId}`
    await this.sendSms(userId, "Executive Corner Alert", message)
    await this.sendEmail(userId, "Executive Corner Alert", message)
  }

  async sendTransactionAlert(userId: string, transactionId: string, amount: number): Promise<void> {
    const message = `New transaction: $${amount.toFixed(2)}. Transaction ID: ${transactionId}`
    await this.sendSms(userId, "Transaction Alert", message)
    await this.sendEmail(userId, "Transaction Alert", message)
  }
}
