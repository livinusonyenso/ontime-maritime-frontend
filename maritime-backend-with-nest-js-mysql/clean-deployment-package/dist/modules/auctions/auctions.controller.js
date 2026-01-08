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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const auctions_service_1 = require("./auctions.service");
const create_auction_dto_1 = require("./dto/create-auction.dto");
const place_bid_dto_1 = require("./dto/place-bid.dto");
let AuctionsController = class AuctionsController {
    constructor(auctionsService) {
        this.auctionsService = auctionsService;
    }
    async create(createAuctionDto) {
        return this.auctionsService.create(createAuctionDto);
    }
    async findActive(skip = 0, take = 20) {
        return this.auctionsService.findActive(skip, take);
    }
    async findById(id) {
        return this.auctionsService.findById(id);
    }
    async getBidHistory(id) {
        return this.auctionsService.getBidHistory(id);
    }
    async placeBid(id, placeBidDto, req) {
        placeBidDto.bidder_id = req.user.id;
        return this.auctionsService.placeBid(id, placeBidDto);
    }
    async endAuction(id) {
        return this.auctionsService.endAuction(id);
    }
};
exports.AuctionsController = AuctionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auction_dto_1.CreateAuctionDto]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/bids'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "getBidHistory", null);
__decorate([
    (0, common_1.Post)(":id/bid"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, place_bid_dto_1.PlaceBidDto, Object]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "placeBid", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuctionsController.prototype, "endAuction", null);
exports.AuctionsController = AuctionsController = __decorate([
    (0, common_1.Controller)("auctions"),
    __metadata("design:paramtypes", [auctions_service_1.AuctionsService])
], AuctionsController);
//# sourceMappingURL=auctions.controller.js.map