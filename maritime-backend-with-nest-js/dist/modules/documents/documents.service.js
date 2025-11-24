"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const crypto = __importStar(require("crypto"));
let DocumentsService = class DocumentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateHash(content) {
        return crypto.createHash("sha256").update(content).digest("hex");
    }
    async create(createDocumentDto) {
        const qrHash = this.generateHash(createDocumentDto.file_url);
        return this.prisma.document.create({
            data: {
                ...createDocumentDto,
                qr_hash: qrHash,
            },
        });
    }
    async findById(id) {
        return this.prisma.document.findUnique({
            where: { id },
            include: {
                listing: true,
                transaction: true,
            },
        });
    }
    async findByListing(listingId) {
        return this.prisma.document.findMany({
            where: { listing_id: listingId },
        });
    }
    async findByTransaction(transactionId) {
        return this.prisma.document.findMany({
            where: { transaction_id: transactionId },
        });
    }
    async verify(id) {
        const document = await this.findById(id);
        if (!document) {
            throw new common_1.BadRequestException("Document not found");
        }
        return {
            valid: !document.is_revoked,
            document,
        };
    }
    async revoke(id) {
        const document = await this.findById(id);
        if (!document) {
            throw new common_1.BadRequestException("Document not found");
        }
        return this.prisma.document.update({
            where: { id },
            data: { is_revoked: true },
        });
    }
    async generateBillOfLading(transactionId) {
        const document = await this.create({
            type: client_1.DocumentType.bill_of_lading,
            transaction_id: transactionId,
            listing_id: null,
            file_url: `https://ontime-maritime.s3.amazonaws.com/documents/bl-${transactionId}.pdf`,
        });
        return document;
    }
    async generateInvoice(transactionId) {
        const document = await this.create({
            type: client_1.DocumentType.invoice,
            transaction_id: transactionId,
            listing_id: null,
            file_url: `https://ontime-maritime.s3.amazonaws.com/documents/invoice-${transactionId}.pdf`,
        });
        return document;
    }
    async generatePackingList(transactionId) {
        const document = await this.create({
            type: client_1.DocumentType.packing_list,
            transaction_id: transactionId,
            listing_id: null,
            file_url: `https://ontime-maritime.s3.amazonaws.com/documents/packing-${transactionId}.pdf`,
        });
        return document;
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map