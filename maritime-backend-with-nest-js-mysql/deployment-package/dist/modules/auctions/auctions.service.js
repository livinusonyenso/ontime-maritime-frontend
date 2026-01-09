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
exports.AuctionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AuctionsService = class AuctionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAuctionDto) {
        return this.prisma.auction.create({
            data: {
                ...createAuctionDto,
                current_price: createAuctionDto.starting_price,
                status: client_1.AuctionStatus.active,
            },
        });
    }
    async findById(id) {
        return this.prisma.auction.findUnique({
            where: { id },
            include: {
                listing: true,
                bids: true,
                winner: true,
            },
        });
    }
    async findByListing(listingId) {
        return this.prisma.auction.findFirst({
            where: { listing_id: listingId },
            include: {
                bids: true,
            },
            orderBy: { created_at: "desc" },
        });
    }
    async findActive(skip = 0, take = 20) {
        return this.prisma.auction.findMany({
            where: { status: client_1.AuctionStatus.active },
            include: {
                listing: true,
            },
            skip,
            take,
            orderBy: { end_time: "asc" },
        });
    }
    async placeBid(auctionId, placeBidDto) {
        return this.prisma.$transaction(async (prisma) => {
            const auction = await prisma.auction.findUnique({ where: { id: auctionId } });
            if (!auction) {
                throw new common_1.BadRequestException("Auction not found");
            }
            if (auction.status !== client_1.AuctionStatus.active) {
                throw new common_1.BadRequestException("Auction is not active");
            }
            if (new Date() > auction.end_time) {
                throw new common_1.BadRequestException("Auction has ended");
            }
            if (placeBidDto.amount <= Number(auction.current_price)) {
                throw new common_1.BadRequestException(`Bid must be greater than current price: ${auction.current_price}`);
            }
            if (auction.reserve_price && placeBidDto.amount < Number(auction.reserve_price)) {
                throw new common_1.BadRequestException(`Bid must meet reserve price: ${auction.reserve_price}`);
            }
            await prisma.auction.update({
                where: { id: auctionId },
                data: { current_price: placeBidDto.amount },
            });
            return prisma.auctionBid.create({
                data: {
                    auction_id: auctionId,
                    bidder_id: placeBidDto.bidder_id,
                    amount: placeBidDto.amount,
                },
            });
        });
    }
    async endAuction(id) {
        const auction = await this.findById(id);
        if (!auction) {
            throw new common_1.BadRequestException("Auction not found");
        }
        const highestBid = await this.prisma.auctionBid.findFirst({
            where: { auction_id: id },
            orderBy: { amount: "desc" },
        });
        return this.prisma.auction.update({
            where: { id },
            data: {
                status: client_1.AuctionStatus.ended,
                winner_id: highestBid ? highestBid.bidder_id : null,
            },
        });
    }
    async getBidHistory(auctionId) {
        return this.prisma.auctionBid.findMany({
            where: { auction_id: auctionId },
            include: {
                bidder: true,
            },
            orderBy: { created_at: "desc" },
        });
    }
};
exports.AuctionsService = AuctionsService;
exports.AuctionsService = AuctionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuctionsService);
//# sourceMappingURL=auctions.service.js.map