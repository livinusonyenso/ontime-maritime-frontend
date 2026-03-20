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
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const LIST_SELECT = {
    id: true,
    seller_id: true,
    category: true,
    marketplace_category: true,
    title: true,
    description: true,
    price_usd: true,
    price_type: true,
    currency: true,
    images: true,
    location: true,
    specifications: true,
    condition: true,
    availability: true,
    bol_required: true,
    bol_number: true,
    bol_verified: true,
    featured: true,
    views: true,
    inquiries: true,
    seller_name: true,
    seller_rating: true,
    status: true,
    rejection_reason: true,
    approved_at: true,
    rejected_at: true,
    created_at: true,
    updated_at: true,
    seller: { select: { id: true, email: true, first_name: true, last_name: true } },
};
let ListingsService = class ListingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapListing(listing) {
        const sellerFirst = listing.seller?.first_name ?? '';
        const sellerLast = listing.seller?.last_name ?? '';
        return {
            id: listing.id,
            seller_id: listing.seller_id,
            seller_name: (listing.seller_name ?? `${sellerFirst} ${sellerLast}`.trim()) || listing.seller?.email,
            seller_rating: Number(listing.seller_rating ?? 0),
            marketplace_category: listing.marketplace_category ?? listing.category,
            category: listing.marketplace_category ?? listing.category,
            title: listing.title,
            description: listing.description,
            price: Number(listing.price_usd),
            price_type: listing.price_type ?? 'fixed',
            currency: listing.currency ?? 'USD',
            images: listing.images ?? listing.photos ?? [],
            location: listing.location ?? {},
            bol_image: listing.bol_image ?? null,
            specifications: listing.specifications ?? {},
            condition: listing.condition ?? 'good',
            availability: listing.availability ?? 'available',
            bol_required: listing.bol_required ?? false,
            bol_number: listing.bol_number ?? null,
            bol_verified: listing.bol_verified ?? false,
            featured: listing.featured ?? false,
            views: listing.views ?? 0,
            inquiries: listing.inquiries ?? 0,
            status: listing.status,
            rejection_reason: listing.rejection_reason ?? null,
            created_at: listing.created_at,
            updated_at: listing.updated_at,
        };
    }
    async create(createListingDto, sellerId) {
        const row = await this.prisma.listing.create({
            data: {
                ...createListingDto,
                seller_id: sellerId,
                status: client_1.ListingStatus.pending,
            },
            select: LIST_SELECT,
        });
        return this.mapListing(row);
    }
    async findMySeller(sellerId) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRaw `SET SESSION sort_buffer_size = 8388608`;
            const rows = await tx.listing.findMany({
                where: { seller_id: sellerId },
                orderBy: { created_at: 'desc' },
                take: 200,
                select: LIST_SELECT,
            });
            return rows.map(r => this.mapListing(r));
        });
    }
    async findAll(skip = 0, take = 20) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRaw `SET SESSION sort_buffer_size = 8388608`;
            const rows = await tx.listing.findMany({
                skip: Number(skip),
                take: Number(take),
                where: { status: client_1.ListingStatus.active },
                orderBy: { created_at: 'desc' },
                select: LIST_SELECT,
            });
            return rows.map(r => this.mapListing(r));
        });
    }
    async search(query, skip = 0, take = 20) {
        const rows = await this.prisma.listing.findMany({
            skip: Number(skip),
            take: Number(take),
            where: {
                AND: [
                    { status: client_1.ListingStatus.active },
                    { OR: [{ title: { contains: query } }, { description: { contains: query } }] },
                ],
            },
            select: LIST_SELECT,
        });
        return rows.map(r => this.mapListing(r));
    }
    async findByCategory(category, skip = 0, take = 20) {
        const rows = await this.prisma.listing.findMany({
            skip: Number(skip),
            take: Number(take),
            where: { category, status: client_1.ListingStatus.active },
            select: LIST_SELECT,
        });
        return rows.map(r => this.mapListing(r));
    }
    async findById(id) {
        const listing = await this.prisma.listing.findUnique({
            where: { id },
            include: {
                seller: { select: { id: true, email: true, first_name: true, last_name: true } },
                documents: true,
                auctions: true,
            },
        });
        if (!listing)
            throw new common_1.NotFoundException("Listing not found");
        return this.mapListing(listing);
    }
    async update(id, updateListingDto) {
        const row = await this.prisma.listing.update({
            where: { id },
            data: updateListingDto,
            include: {
                seller: { select: { id: true, email: true, first_name: true, last_name: true } },
            },
        });
        return this.mapListing(row);
    }
    async delete(id) {
        await this.prisma.listing.delete({ where: { id } });
        return { success: true, id };
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map