import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PaymentsService {
    private config;
    private prisma;
    private readonly logger;
    private readonly paystackBaseUrl;
    private readonly secretKey;
    private readonly bolUnlockPriceKobo;
    constructor(config: ConfigService, prisma: PrismaService);
    initializePayment(email: string, amount: number, metadata?: Record<string, any>, buyerId?: string): Promise<{
        authorization_url: any;
        reference: any;
        access_code: any;
    }>;
    initializeBolUnlock(listingId: string, buyerId: string, callbackUrl?: string): Promise<{
        authorization_url: any;
        reference: any;
        access_code: any;
    }>;
    isBolUnlocked(buyerId: string, listingId: string): Promise<boolean>;
    verifyPayment(reference: string): Promise<any>;
    validateWebhookSignature(rawPayload: string, signature: string): boolean;
    handleWebhookEvent(event: string, data: any): Promise<{
        received: boolean;
    }>;
}
