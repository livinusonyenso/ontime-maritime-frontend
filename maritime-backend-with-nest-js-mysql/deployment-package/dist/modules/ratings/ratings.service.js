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
exports.RatingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RatingsService = class RatingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRatingDto) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: createRatingDto.transaction_id },
        });
        if (!transaction) {
            throw new common_1.BadRequestException('Transaction not found');
        }
        return this.prisma.rating.create({
            data: {
                user_id: createRatingDto.user_id,
                rater_id: createRatingDto.rater_id,
                score: createRatingDto.score,
                comment: createRatingDto.comment,
            },
        });
    }
    async getRatingsForUser(userId, skip = 0, take = 20) {
        return this.prisma.rating.findMany({
            where: { user_id: userId },
            skip,
            take,
            orderBy: { created_at: 'desc' },
        });
    }
    async getAverageRating(userId) {
        const result = await this.prisma.rating.aggregate({
            where: { user_id: userId },
            _avg: { score: true },
        });
        return result._avg.score || 0;
    }
    async getRatingCount(userId) {
        return this.prisma.rating.count({
            where: { user_id: userId },
        });
    }
};
exports.RatingsService = RatingsService;
exports.RatingsService = RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingsService);
//# sourceMappingURL=ratings.service.js.map