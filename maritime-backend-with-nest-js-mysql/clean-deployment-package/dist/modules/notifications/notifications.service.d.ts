import { PrismaService } from "../../prisma/prisma.service";
import { Notification } from "@prisma/client";
import { CreateNotificationDto } from "./dto/create-notification.dto";
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<Notification>;
    findById(id: string): Promise<Notification | null>;
    findByUser(userId: string, skip?: number, take?: number): Promise<Notification[]>;
    markAsSent(id: string): Promise<Notification>;
    markAsFailed(id: string): Promise<Notification>;
    sendSms(userId: string, title: string, message: string): Promise<Notification>;
    sendEmail(userId: string, title: string, message: string): Promise<Notification>;
    sendPush(userId: string, title: string, message: string): Promise<Notification>;
    sendAuctionAlert(userId: string, auctionId: string, message: string): Promise<void>;
    sendExecutiveCornerAlert(userId: string, listingId: string): Promise<void>;
    sendTransactionAlert(userId: string, transactionId: string, amount: number): Promise<void>;
}
