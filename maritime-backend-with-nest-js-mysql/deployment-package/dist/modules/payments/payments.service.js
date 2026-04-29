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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PaymentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
const DEFAULT_BOL_PRICE_KOBO = 200_000;
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        this.paystackBaseUrl = this.config.get('PAYSTACK_BASE_URL') || 'https://api.paystack.co';
        this.secretKey = this.config.get('PAYSTACK_SECRET_KEY') || '';
        this.bolUnlockPriceKobo = Number(this.config.get('BOL_UNLOCK_PRICE_KOBO') || DEFAULT_BOL_PRICE_KOBO);
    }
    async initializePayment(email, amount, metadata = {}, buyerId) {
        const response = await axios_1.default.post(`${this.paystackBaseUrl}/transaction/initialize`, { email, amount, metadata, currency: 'NGN' }, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
                'Content-Type': 'application/json',
            },
        });
        const { authorization_url, reference, access_code } = response.data.data;
        if (buyerId && metadata?.listingId) {
            try {
                const listing = await this.prisma.listing.findUnique({
                    where: { id: metadata.listingId },
                });
                if (listing) {
                    const amountNGN = amount / 100;
                    await this.prisma.transaction.create({
                        data: {
                            buyer_id: buyerId,
                            seller_id: listing.seller_id,
                            listing_id: listing.id,
                            amount: amountNGN,
                            commission_amount: amountNGN * 0.05,
                            transaction_type: client_1.TransactionType.buy_now,
                            payout_status: client_1.PayoutStatus.pending,
                            payment_gateway: 'paystack',
                            gateway_reference: reference,
                            buyer_email: email,
                            payment_status: 'pending',
                        },
                    });
                    this.logger.log(`Transaction created for reference: ${reference}`);
                }
            }
            catch (err) {
                this.logger.error('Failed to create transaction record during initialization', err);
            }
        }
        return { authorization_url, reference, access_code };
    }
    async initializeBolUnlock(listingId, buyerId, callbackUrl) {
        const buyer = await this.prisma.user.findUnique({
            where: { id: buyerId },
            select: { email: true },
        });
        if (!buyer)
            throw new common_1.BadRequestException('Buyer not found');
        const listing = await this.prisma.listing.findUnique({
            where: { id: listingId },
            select: { id: true, bol_verified: true, bol_image: true },
        });
        if (!listing)
            throw new common_1.BadRequestException('Listing not found');
        if (!listing.bol_image)
            throw new common_1.BadRequestException('This listing does not have a Bill of Lading uploaded');
        const existing = await this.prisma.bolUnlock.findUnique({
            where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: listingId } },
        });
        if (existing)
            throw new common_1.BadRequestException('You have already unlocked the BOL for this listing');
        const response = await axios_1.default.post(`${this.paystackBaseUrl}/transaction/initialize`, {
            email: buyer.email,
            amount: this.bolUnlockPriceKobo,
            currency: 'NGN',
            ...(callbackUrl ? { callback_url: callbackUrl } : {}),
            metadata: {
                type: 'bol_unlock',
                listingId,
                buyerId,
            },
        }, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
                'Content-Type': 'application/json',
            },
        });
        const { authorization_url, reference, access_code } = response.data.data;
        this.logger.log(`BOL unlock payment initialized for listing ${listingId} by buyer ${buyerId}, ref: ${reference}`);
        return { authorization_url, reference, access_code };
    }
    async isBolUnlocked(buyerId, listingId) {
        const record = await this.prisma.bolUnlock.findUnique({
            where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: listingId } },
        });
        return !!record;
    }
    async verifyPayment(reference) {
        const response = await axios_1.default.get(`${this.paystackBaseUrl}/transaction/verify/${encodeURIComponent(reference)}`, {
            headers: { Authorization: `Bearer ${this.secretKey}` },
        });
        const data = response.data.data;
        if (data.status !== 'success') {
            throw new common_1.BadRequestException(`Payment not successful. Status: ${data.status}`);
        }
        try {
            await this.prisma.transaction.updateMany({
                where: { gateway_reference: reference },
                data: {
                    payout_status: client_1.PayoutStatus.completed,
                    payment_status: 'success',
                    paid_at: new Date(),
                },
            });
        }
        catch (err) {
            this.logger.warn(`Could not update transaction on verify for ref ${reference}`, err);
        }
        if (data.metadata?.type === 'bol_unlock' && data.metadata?.listingId && data.metadata?.buyerId) {
            try {
                await this.prisma.bolUnlock.upsert({
                    where: {
                        buyer_id_listing_id: {
                            buyer_id: data.metadata.buyerId,
                            listing_id: data.metadata.listingId,
                        },
                    },
                    create: { buyer_id: data.metadata.buyerId, listing_id: data.metadata.listingId },
                    update: {},
                });
                this.logger.log(`BolUnlock upserted on verify for listing ${data.metadata.listingId} buyer ${data.metadata.buyerId}`);
            }
            catch (err) {
                this.logger.error(`Failed to upsert BolUnlock on verify for ref ${reference}`, err);
            }
        }
        return data;
    }
    validateWebhookSignature(rawPayload, signature) {
        const hash = crypto
            .createHmac('sha512', this.secretKey)
            .update(rawPayload)
            .digest('hex');
        return hash === signature;
    }
    async handleWebhookEvent(event, data) {
        if (event === 'charge.success') {
            const reference = data?.reference;
            const metadata = data?.metadata ?? {};
            if (metadata?.type === 'bol_unlock') {
                const { buyerId, listingId } = metadata;
                if (buyerId && listingId) {
                    try {
                        await this.prisma.bolUnlock.upsert({
                            where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: listingId } },
                            create: { buyer_id: buyerId, listing_id: listingId },
                            update: {},
                        });
                        this.logger.log(`BOL unlocked for listing ${listingId} by buyer ${buyerId} (ref: ${reference})`);
                    }
                    catch (err) {
                        this.logger.error(`Failed to create BolUnlock record for ref ${reference}`, err);
                    }
                }
            }
            else if (reference) {
                try {
                    await this.prisma.transaction.updateMany({
                        where: { gateway_reference: reference },
                        data: {
                            payout_status: client_1.PayoutStatus.completed,
                            payment_status: 'success',
                            paid_at: new Date(),
                        },
                    });
                    this.logger.log(`Webhook charge.success processed for reference: ${reference}`);
                }
                catch (err) {
                    this.logger.error(`Failed to update transaction for reference ${reference}`, err);
                }
            }
        }
        return { received: true };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map