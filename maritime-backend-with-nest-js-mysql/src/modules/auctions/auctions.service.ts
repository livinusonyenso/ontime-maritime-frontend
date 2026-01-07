import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { Auction, AuctionBid, AuctionStatus } from "@prisma/client"
import { CreateAuctionDto } from "./dto/create-auction.dto"
import { PlaceBidDto } from "./dto/place-bid.dto"

@Injectable()
export class AuctionsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    return this.prisma.auction.create({
      data: {
        ...createAuctionDto,
        current_price: createAuctionDto.starting_price,
        status: AuctionStatus.active,
      },
    })
  }

  async findById(id: string): Promise<Auction | null> {
    return this.prisma.auction.findUnique({
      where: { id },
      include: {
        listing: true,
        bids: true,
        winner: true,
      },
    })
  }

  async findByListing(listingId: string): Promise<Auction | null> {
    return this.prisma.auction.findFirst({
      where: { listing_id: listingId },
      include: {
        bids: true,
      },
      orderBy: { created_at: "desc" },
    })
  }

  async findActive(skip = 0, take = 20): Promise<Auction[]> {
    return this.prisma.auction.findMany({
      where: { status: AuctionStatus.active },
      include: {
        listing: true,
      },
      skip,
      take,
      orderBy: { end_time: "asc" },
    })
  }

  async placeBid(auctionId: string, placeBidDto: PlaceBidDto): Promise<AuctionBid> {
    return this.prisma.$transaction(async (prisma) => {
      const auction = await prisma.auction.findUnique({ where: { id: auctionId } })

      if (!auction) {
        throw new BadRequestException("Auction not found")
      }

      if (auction.status !== AuctionStatus.active) {
        throw new BadRequestException("Auction is not active")
      }

      if (new Date() > auction.end_time) {
        throw new BadRequestException("Auction has ended")
      }

      if (placeBidDto.amount <= Number(auction.current_price)) {
        throw new BadRequestException(`Bid must be greater than current price: ${auction.current_price}`)
      }

      if (auction.reserve_price && placeBidDto.amount < Number(auction.reserve_price)) {
        throw new BadRequestException(`Bid must meet reserve price: ${auction.reserve_price}`)
      }

      await prisma.auction.update({
        where: { id: auctionId },
        data: { current_price: placeBidDto.amount },
      })

      return prisma.auctionBid.create({
        data: {
          auction_id: auctionId,
          bidder_id: placeBidDto.bidder_id,
          amount: placeBidDto.amount,
        },
      })
    })
  }

  async endAuction(id: string): Promise<Auction> {
    const auction = await this.findById(id)

    if (!auction) {
      throw new BadRequestException("Auction not found")
    }

    const highestBid = await this.prisma.auctionBid.findFirst({
      where: { auction_id: id },
      orderBy: { amount: "desc" },
    })

    return this.prisma.auction.update({
      where: { id },
      data: {
        status: AuctionStatus.ended,
        winner_id: highestBid ? highestBid.bidder_id : null,
      },
    })
  }

  async getBidHistory(auctionId: string): Promise<AuctionBid[]> {
    return this.prisma.auctionBid.findMany({
      where: { auction_id: auctionId },
      include: {
        bidder: true,
      },
      orderBy: { created_at: "desc" },
    })
  }
}
