import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
        buyer: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        seller: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        listing: {
            id: string;
            seller_id: string;
            category: import(".prisma/client").$Enums.ListingCategory;
            title: string;
            description: string;
            price_usd: import("@prisma/client/runtime/library").Decimal;
            origin_port: string;
            destination_port: string;
            container_number: string | null;
            eta: Date;
            photos: import(".prisma/client").Prisma.JsonValue | null;
            certificates: import(".prisma/client").Prisma.JsonValue | null;
            is_perishable: boolean;
            is_dangerous: boolean;
            is_high_value: boolean;
            status: import(".prisma/client").$Enums.ListingStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        buyer_id: string;
        seller_id: string;
        listing_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        commission_amount: import("@prisma/client/runtime/library").Decimal;
        payment_reference: string | null;
        payout_status: import(".prisma/client").$Enums.PayoutStatus;
        transaction_type: import(".prisma/client").$Enums.TransactionType;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(skip?: number, take?: number): Promise<({
        buyer: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        seller: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        listing: {
            id: string;
            seller_id: string;
            category: import(".prisma/client").$Enums.ListingCategory;
            title: string;
            description: string;
            price_usd: import("@prisma/client/runtime/library").Decimal;
            origin_port: string;
            destination_port: string;
            container_number: string | null;
            eta: Date;
            photos: import(".prisma/client").Prisma.JsonValue | null;
            certificates: import(".prisma/client").Prisma.JsonValue | null;
            is_perishable: boolean;
            is_dangerous: boolean;
            is_high_value: boolean;
            status: import(".prisma/client").$Enums.ListingStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        buyer_id: string;
        seller_id: string;
        listing_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        commission_amount: import("@prisma/client/runtime/library").Decimal;
        payment_reference: string | null;
        payout_status: import(".prisma/client").$Enums.PayoutStatus;
        transaction_type: import(".prisma/client").$Enums.TransactionType;
        created_at: Date;
        updated_at: Date;
    })[]>;
    getMyPurchases(req: any, skip?: number, take?: number): Promise<({
        seller: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        listing: {
            id: string;
            seller_id: string;
            category: import(".prisma/client").$Enums.ListingCategory;
            title: string;
            description: string;
            price_usd: import("@prisma/client/runtime/library").Decimal;
            origin_port: string;
            destination_port: string;
            container_number: string | null;
            eta: Date;
            photos: import(".prisma/client").Prisma.JsonValue | null;
            certificates: import(".prisma/client").Prisma.JsonValue | null;
            is_perishable: boolean;
            is_dangerous: boolean;
            is_high_value: boolean;
            status: import(".prisma/client").$Enums.ListingStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        buyer_id: string;
        seller_id: string;
        listing_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        commission_amount: import("@prisma/client/runtime/library").Decimal;
        payment_reference: string | null;
        payout_status: import(".prisma/client").$Enums.PayoutStatus;
        transaction_type: import(".prisma/client").$Enums.TransactionType;
        created_at: Date;
        updated_at: Date;
    })[]>;
    getMySales(req: any, skip?: number, take?: number): Promise<({
        buyer: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        listing: {
            id: string;
            seller_id: string;
            category: import(".prisma/client").$Enums.ListingCategory;
            title: string;
            description: string;
            price_usd: import("@prisma/client/runtime/library").Decimal;
            origin_port: string;
            destination_port: string;
            container_number: string | null;
            eta: Date;
            photos: import(".prisma/client").Prisma.JsonValue | null;
            certificates: import(".prisma/client").Prisma.JsonValue | null;
            is_perishable: boolean;
            is_dangerous: boolean;
            is_high_value: boolean;
            status: import(".prisma/client").$Enums.ListingStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        buyer_id: string;
        seller_id: string;
        listing_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        commission_amount: import("@prisma/client/runtime/library").Decimal;
        payment_reference: string | null;
        payout_status: import(".prisma/client").$Enums.PayoutStatus;
        transaction_type: import(".prisma/client").$Enums.TransactionType;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findById(id: string): Promise<{
        buyer: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        seller: {
            email: string;
            id: string;
            first_name: string;
            last_name: string;
        };
        documents: {
            id: string;
            type: import(".prisma/client").$Enums.DocumentType;
            listing_id: string | null;
            transaction_id: string | null;
            file_url: string;
            qr_hash: string | null;
            is_revoked: boolean;
            created_at: Date;
        }[];
        listing: {
            id: string;
            seller_id: string;
            category: import(".prisma/client").$Enums.ListingCategory;
            title: string;
            description: string;
            price_usd: import("@prisma/client/runtime/library").Decimal;
            origin_port: string;
            destination_port: string;
            container_number: string | null;
            eta: Date;
            photos: import(".prisma/client").Prisma.JsonValue | null;
            certificates: import(".prisma/client").Prisma.JsonValue | null;
            is_perishable: boolean;
            is_dangerous: boolean;
            is_high_value: boolean;
            status: import(".prisma/client").$Enums.ListingStatus;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        buyer_id: string;
        seller_id: string;
        listing_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        commission_amount: import("@prisma/client/runtime/library").Decimal;
        payment_reference: string | null;
        payout_status: import(".prisma/client").$Enums.PayoutStatus;
        transaction_type: import(".prisma/client").$Enums.TransactionType;
        created_at: Date;
        updated_at: Date;
    }>;
}
