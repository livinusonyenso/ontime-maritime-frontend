import { PrismaService } from "../../prisma/prisma.service";
import { Auction, AuctionBid } from "@prisma/client";
import { CreateAuctionDto } from "./dto/create-auction.dto";
import { PlaceBidDto } from "./dto/place-bid.dto";
export declare class AuctionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAuctionDto: CreateAuctionDto): Promise<Auction>;
    findById(id: string): Promise<Auction | null>;
    findByListing(listingId: string): Promise<Auction | null>;
    findActive(skip?: number, take?: number): Promise<Auction[]>;
    placeBid(auctionId: string, placeBidDto: PlaceBidDto): Promise<AuctionBid>;
    endAuction(id: string): Promise<Auction>;
    getBidHistory(auctionId: string): Promise<AuctionBid[]>;
}
