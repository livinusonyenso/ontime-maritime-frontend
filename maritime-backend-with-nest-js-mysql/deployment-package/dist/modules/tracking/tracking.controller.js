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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const tracking_service_1 = require("./tracking.service");
const create_tracking_log_dto_1 = require("./dto/create-tracking-log.dto");
let TrackingController = class TrackingController {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }
    async create(createTrackingLogDto) {
        return this.trackingService.create(createTrackingLogDto);
    }
    async findByContainer(containerNumber, limit = 100) {
        return this.trackingService.findByContainer(containerNumber, limit);
    }
    async findByVessel(vesselImo, limit = 100) {
        return this.trackingService.findByVessel(vesselImo, limit);
    }
    async getLatestPosition(containerNumber) {
        return this.trackingService.getLatestPosition(containerNumber);
    }
    async getLatestVesselPosition(vesselImo) {
        return this.trackingService.getLatestVesselPosition(vesselImo);
    }
    async getMovementHistory(containerNumber, startDate, endDate) {
        return this.trackingService.getMovementHistory(containerNumber, new Date(startDate), new Date(endDate));
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tracking_log_dto_1.CreateTrackingLogDto]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("container/:containerNumber"),
    __param(0, (0, common_1.Param)('containerNumber')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "findByContainer", null);
__decorate([
    (0, common_1.Get)("vessel/:vesselImo"),
    __param(0, (0, common_1.Param)('vesselImo')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "findByVessel", null);
__decorate([
    (0, common_1.Get)('latest/container/:containerNumber'),
    __param(0, (0, common_1.Param)('containerNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getLatestPosition", null);
__decorate([
    (0, common_1.Get)('latest/vessel/:vesselImo'),
    __param(0, (0, common_1.Param)('vesselImo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getLatestVesselPosition", null);
__decorate([
    (0, common_1.Get)("history/:containerNumber"),
    __param(0, (0, common_1.Param)('containerNumber')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getMovementHistory", null);
exports.TrackingController = TrackingController = __decorate([
    (0, common_1.Controller)("tracking"),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService])
], TrackingController);
//# sourceMappingURL=tracking.controller.js.map