import { PrismaService } from "../../prisma/prisma.service";
import { ListingCategory } from "@prisma/client";
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
export declare class ListingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createListingDto: CreateListingDto, sellerId: string): Promise<{
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
    }>;
    findAll(skip?: number, take?: number): Promise<({
        seller: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
        };
    } & {
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
    })[]>;
    search(query: string, skip?: number, take?: number): Promise<({
        seller: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
        };
    } & {
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
    })[]>;
    findByCategory(category: ListingCategory, skip?: number, take?: number): Promise<({
        seller: {
            id: string;
            email: string;
            first_name: string;
            last_name: string;
        };
    } & {
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
    })[]>;
    findById(id: string): Promise<{
        seller: {
            id: string;
            email: string;
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
        auctions: {
            id: string;
            listing_id: string;
            starting_price: import("@prisma/client/runtime/library").Decimal;
            current_price: import("@prisma/client/runtime/library").Decimal;
            reserve_price: import("@prisma/client/runtime/library").Decimal | null;
            status: import(".prisma/client").$Enums.AuctionStatus;
            start_time: Date;
            end_time: Date;
            winner_id: string | null;
            created_at: Date;
            updated_at: Date;
        }[];
    } & {
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
    }>;
    update(id: string, updateListingDto: UpdateListingDto): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
    }>;
}
