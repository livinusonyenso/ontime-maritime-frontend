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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const enums_1 = require("../../common/enums");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        return this.prisma.notification.create({
            data: {
                ...createNotificationDto,
                status: enums_1.NotificationStatus.pending,
            },
        });
    }
    async findById(id) {
        return this.prisma.notification.findUnique({ where: { id } });
    }
    async findByUser(userId, skip = 0, take = 20) {
        return this.prisma.notification.findMany({
            where: { user_id: userId },
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
    async markAsSent(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { status: enums_1.NotificationStatus.sent },
        });
    }
    async markAsFailed(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { status: enums_1.NotificationStatus.failed },
        });
    }
    async sendSms(userId, title, message) {
        const notification = await this.create({
            user_id: userId,
            type: enums_1.NotificationType.sms,
            title,
            body: message,
        });
        console.log(`[SMS] ${userId}: ${message}`);
        return this.markAsSent(notification.id);
    }
    async sendEmail(userId, title, message) {
        const notification = await this.create({
            user_id: userId,
            type: enums_1.NotificationType.email,
            title,
            body: message,
        });
        console.log(`[EMAIL] ${userId}: ${message}`);
        return this.markAsSent(notification.id);
    }
    async sendPush(userId, title, message) {
        const notification = await this.create({
            user_id: userId,
            type: enums_1.NotificationType.push,
            title,
            body: message,
        });
        console.log(`[PUSH] ${userId}: ${message}`);
        return this.markAsSent(notification.id);
    }
    async sendAuctionAlert(userId, auctionId, message) {
        await this.sendSms(userId, "Auction Update", message);
        await this.sendEmail(userId, "Auction Update", message);
    }
    async sendExecutiveCornerAlert(userId, listingId) {
        const message = `New high-value listing ≥$250,000 in Executive Corner. Listing ID: ${listingId}`;
        await this.sendSms(userId, "Executive Corner Alert", message);
        await this.sendEmail(userId, "Executive Corner Alert", message);
    }
    async sendTransactionAlert(userId, transactionId, amount) {
        const message = `New transaction: $${amount.toFixed(2)}. Transaction ID: ${transactionId}`;
        await this.sendSms(userId, "Transaction Alert", message);
        await this.sendEmail(userId, "Transaction Alert", message);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map