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
var ListingsCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ListingsCronService = ListingsCronService_1 = class ListingsCronService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ListingsCronService_1.name);
    }
    async checkAndAutoRelease() {
        const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const staleListings = await this.prisma.listing.findMany({
            where: {
                status: client_1.ListingStatus.pending,
                created_at: { lte: cutoff },
            },
            select: { id: true, title: true, seller_id: true },
        });
        if (staleListings.length === 0)
            return;
        this.logger.warn(`SLA breach: ${staleListings.length} listing(s) pending for >48 h — archiving: ${staleListings.map((l) => l.id).join(", ")}`);
        await this.prisma.listing.updateMany({
            where: { id: { in: staleListings.map((l) => l.id) } },
            data: {
                status: client_1.ListingStatus.archived,
                rejection_reason: "Auto-archived: no admin review within 48 hours (SLA breach).",
            },
        });
    }
};
exports.ListingsCronService = ListingsCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListingsCronService.prototype, "checkAndAutoRelease", null);
exports.ListingsCronService = ListingsCronService = ListingsCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsCronService);
//# sourceMappingURL=listings-cron.service.js.map