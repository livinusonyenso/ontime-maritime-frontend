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
exports.ListingsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const listings_service_1 = require("./listings.service");
const create_listing_dto_1 = require("./dto/create-listing.dto");
const update_listing_dto_1 = require("./dto/update-listing.dto");
let ListingsController = class ListingsController {
    constructor(listingsService) {
        this.listingsService = listingsService;
    }
    async create(createListingDto, req) {
        return this.listingsService.create(createListingDto, req.user.id);
    }
    async findAll(skip = 0, take = 20) {
        return this.listingsService.findAll(skip, take);
    }
    async search(query, skip = 0, take = 20) {
        return this.listingsService.search(query, skip, take);
    }
    async findByCategory(category, skip = 0, take = 20) {
        return this.listingsService.findByCategory(category, skip, take);
    }
    async findMySeller(req) {
        return this.listingsService.findMySeller(req.user.id);
    }
    async findById(id) {
        return this.listingsService.findById(id);
    }
    async update(id, updateListingDto) {
        return this.listingsService.update(id, updateListingDto);
    }
    async delete(id) {
        await this.listingsService.delete(id);
        return { message: 'Listing deleted successfully' };
    }
};
exports.ListingsController = ListingsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_listing_dto_1.CreateListingDto, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("category/:category"),
    __param(0, (0, common_1.Param)('category')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findMySeller", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_listing_dto_1.UpdateListingDto]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListingsController.prototype, "delete", null);
exports.ListingsController = ListingsController = __decorate([
    (0, common_1.Controller)("listings"),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], ListingsController);
//# sourceMappingURL=listings.controller.js.map