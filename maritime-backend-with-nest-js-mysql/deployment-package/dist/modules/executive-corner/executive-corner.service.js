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
exports.ExecutiveCornerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ExecutiveCornerService = class ExecutiveCornerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createExecutiveCornerDto) {
        return this.prisma.executiveCorner.create({
            data: createExecutiveCornerDto,
        });
    }
    async findById(id) {
        return this.prisma.executiveCorner.findUnique({
            where: { id },
            include: {
                listing: true,
                decidedBy: true,
            },
        });
    }
    async findPending(skip = 0, take = 20) {
        return this.prisma.executiveCorner.findMany({
            where: { status: client_1.ExecutiveCornerStatus.pending },
            include: {
                listing: {
                    include: {
                        seller: true,
                    },
                },
            },
            skip,
            take,
            orderBy: { deadline_at: "asc" },
        });
    }
    async approve(id, executiveId, comment) {
        const executiveCorner = await this.findById(id);
        if (!executiveCorner) {
            throw new common_1.BadRequestException("Executive Corner record not found");
        }
        const logs = executiveCorner.logs || [];
        logs.push({
            action: "APPROVED",
            by: executiveId,
            at: new Date(),
            comment,
        });
        return this.prisma.executiveCorner.update({
            where: { id },
            data: {
                status: client_1.ExecutiveCornerStatus.approved,
                decided_by: executiveId,
                decided_at: new Date(),
                decision_comment: comment,
                logs: logs,
            },
        });
    }
    async reject(id, executiveId, comment) {
        const executiveCorner = await this.findById(id);
        if (!executiveCorner) {
            throw new common_1.BadRequestException("Executive Corner record not found");
        }
        const logs = executiveCorner.logs || [];
        logs.push({
            action: "REJECTED",
            by: executiveId,
            at: new Date(),
            comment,
        });
        return this.prisma.executiveCorner.update({
            where: { id },
            data: {
                status: client_1.ExecutiveCornerStatus.rejected,
                decided_by: executiveId,
                decided_at: new Date(),
                decision_comment: comment,
                logs: logs,
            },
        });
    }
    async autoRelease(id) {
        const executiveCorner = await this.findById(id);
        if (!executiveCorner) {
            throw new common_1.BadRequestException("Executive Corner record not found");
        }
        const logs = executiveCorner.logs || [];
        logs.push({
            action: "AUTO_RELEASED",
            at: new Date(),
            reason: "48 hours deadline passed",
        });
        return this.prisma.executiveCorner.update({
            where: { id },
            data: {
                status: client_1.ExecutiveCornerStatus.auto_released,
                decided_at: new Date(),
                logs: logs,
            },
        });
    }
    async checkAndAutoRelease() {
        const now = new Date();
        const expiredItems = await this.prisma.executiveCorner.findMany({
            where: {
                status: client_1.ExecutiveCornerStatus.pending,
                deadline_at: {
                    lte: now,
                },
            },
        });
        const autoReleasedItems = [];
        for (const item of expiredItems) {
            const released = await this.autoRelease(item.id);
            autoReleasedItems.push(released);
        }
        return autoReleasedItems;
    }
    async getAll(skip = 0, take = 20) {
        return this.prisma.executiveCorner.findMany({
            include: {
                listing: {
                    include: {
                        seller: true,
                    },
                },
                decidedBy: true,
            },
            skip,
            take,
            orderBy: { created_at: "desc" },
        });
    }
};
exports.ExecutiveCornerService = ExecutiveCornerService;
exports.ExecutiveCornerService = ExecutiveCornerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExecutiveCornerService);
//# sourceMappingURL=executive-corner.service.js.map