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
exports.MarketplaceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const PUBLIC_SELECT = {
    id: true,
    title: true,
    description: true,
    price_usd: true,
    price_type: true,
    currency: true,
    category: true,
    marketplace_category: true,
    condition: true,
    images: true,
    location: true,
    specifications: true,
    seller_name: true,
    seller_rating: true,
    bol_required: true,
    bol_verified: true,
    featured: true,
    views: true,
    inquiries: true,
    availability: true,
    status: true,
    created_at: true,
    updated_at: true,
    seller: { select: { first_name: true, last_name: true } },
};
const DETAIL_SELECT = {
    ...PUBLIC_SELECT,
    bol_image: true,
};
function toPublic(row, includeBol = false) {
    const nameFromSeller = `${row.seller?.first_name ?? ""} ${row.seller?.last_name ?? ""}`.trim();
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        price: Number(row.price_usd),
        price_type: row.price_type ?? "fixed",
        currency: row.currency ?? "USD",
        category: row.marketplace_category ?? row.category,
        condition: row.condition ?? "good",
        images: row.images ?? [],
        preview_image: (row.images ?? [])[0] ?? null,
        location: row.location ?? {},
        specifications: row.specifications ?? {},
        seller_name: row.seller_name || nameFromSeller || "Seller",
        seller_rating: Number(row.seller_rating ?? 0),
        bol_required: row.bol_required ?? false,
        bol_verified: row.bol_verified ?? false,
        bol_has_image: !!row.bol_image,
        ...(includeBol ? { bol_image: row.bol_image ?? null } : {}),
        featured: row.featured ?? false,
        views: row.views ?? 0,
        inquiries: row.inquiries ?? 0,
        availability: row.availability ?? "available",
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
}
function buildWhere(q) {
    const where = {
        status: client_1.ListingStatus.active,
        availability: "available",
    };
    if (q.search?.trim()) {
        where.OR = [
            { title: { contains: q.search } },
            { description: { contains: q.search } },
        ];
    }
    if (q.category && q.category !== "all") {
        where.marketplace_category = { contains: q.category };
    }
    if (q.minPrice !== undefined || q.maxPrice !== undefined) {
        where.price_usd = {
            ...(q.minPrice !== undefined ? { gte: q.minPrice } : {}),
            ...(q.maxPrice !== undefined ? { lte: q.maxPrice } : {}),
        };
    }
    if (q.condition && q.condition !== "all") {
        where.condition = q.condition;
    }
    return where;
}
function buildOrderBy(sort) {
    switch (sort) {
        case "price_asc": return { price_usd: "asc" };
        case "price_desc": return { price_usd: "desc" };
        case "featured": return { featured: "desc" };
        default: return { created_at: "desc" };
    }
}
let MarketplaceService = class MarketplaceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPublic(query) {
        const skip = query.skip ?? 0;
        const take = query.take ?? 20;
        const where = buildWhere(query);
        const orderBy = buildOrderBy(query.sort);
        const { rows, total } = await this.prisma.$transaction(async (tx) => {
            await tx.$executeRaw `SET SESSION sort_buffer_size = 8388608`;
            const [data, count] = await Promise.all([
                tx.listing.findMany({ skip, take, where, orderBy, select: PUBLIC_SELECT }),
                tx.listing.count({ where }),
            ]);
            return { rows: data, total: count };
        });
        return {
            data: rows.map(r => toPublic(r)),
            total,
            skip,
            take,
            hasMore: skip + take < total,
        };
    }
    async findPublicById(id, buyerId) {
        const row = await this.prisma.listing.findFirst({
            where: { id, status: client_1.ListingStatus.active },
            select: DETAIL_SELECT,
        });
        if (!row)
            throw new common_1.NotFoundException("Listing not found");
        this.prisma.listing
            .update({ where: { id }, data: { views: { increment: 1 } } })
            .catch(() => { });
        let includeBol = false;
        if (buyerId) {
            const unlock = await this.prisma.bolUnlock.findUnique({
                where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: id } },
            });
            includeBol = !!unlock;
        }
        return toPublic(row, includeBol);
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map