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
let ListingsService = class ListingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createListingDto, sellerId) {
        return this.prisma.listing.create({
            data: {
                ...createListingDto,
                seller_id: sellerId,
                status: client_1.ListingStatus.draft,
            },
        });
    }
    async findAll(skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            where: {
                status: client_1.ListingStatus.active,
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
    }
    async search(query, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            where: {
                AND: [
                    {
                        status: client_1.ListingStatus.active,
                    },
                    {
                        OR: [
                            { title: { contains: query, mode: "insensitive" } },
                            { description: { contains: query, mode: "insensitive" } },
                        ],
                    },
                ],
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
    }
    async findByCategory(category, skip = 0, take = 20) {
        return this.prisma.listing.findMany({
            skip,
            take,
            where: {
                category,
                status: client_1.ListingStatus.active,
            },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        const listing = await this.prisma.listing.findUnique({
            where: { id },
            include: {
                seller: {
                    select: {
                        id: true,
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
                documents: true,
                auctions: true,
            },
        });
        if (!listing) {
            throw new common_1.NotFoundException("Listing not found");
        }
        return listing;
    }
    async update(id, updateListingDto) {
        return this.prisma.listing.update({
            where: { id },
            data: updateListingDto,
        });
    }
    async delete(id) {
        return this.prisma.listing.delete({
            where: { id },
        });
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map