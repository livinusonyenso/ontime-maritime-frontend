import { AuctionsService } from "./auctions.service";
import { CreateAuctionDto } from './dto/create-auction.dto';
import { PlaceBidDto } from './dto/place-bid.dto';
export declare class AuctionsController {
    private auctionsService;
    constructor(auctionsService: AuctionsService);
    create(createAuctionDto: CreateAuctionDto): Promise<{
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
    }>;
    findActive(skip?: number, take?: number): Promise<{
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
    }[]>;
    findById(id: string): Promise<{
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
    }>;
    getBidHistory(id: string): Promise<{
        id: string;
        auction_id: string;
        bidder_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
    }[]>;
    placeBid(id: string, placeBidDto: PlaceBidDto, req: any): Promise<{
        id: string;
        auction_id: string;
        bidder_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
    }>;
    endAuction(id: string): Promise<{
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
    }>;
}
