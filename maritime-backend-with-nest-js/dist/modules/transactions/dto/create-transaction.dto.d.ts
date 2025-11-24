import { TransactionType } from "@prisma/client";
export declare class CreateTransactionDto {
    buyer_id: string;
    seller_id: string;
    listing_id: string;
    amount: number;
    transaction_type: TransactionType;
    payment_reference: string;
}
