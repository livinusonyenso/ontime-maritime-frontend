import { Request as ExpressRequest, Response } from 'express';
import { PaymentsService } from './payments.service';
import { InitializePaymentDto } from './dto/initialize-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    initialize(req: ExpressRequest, dto: InitializePaymentDto): Promise<{
        authorization_url: any;
        reference: any;
        access_code: any;
    }>;
    initializeBolUnlock(req: ExpressRequest, listingId: string, body: {
        callbackUrl?: string;
    }): Promise<{
        authorization_url: any;
        reference: any;
        access_code: any;
    }>;
    verify(reference: string): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    webhook(req: ExpressRequest, res: Response): Promise<void>;
}
