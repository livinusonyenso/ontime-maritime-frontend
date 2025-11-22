import { Controller, Post, Get, Param, Query, UseGuards, Request } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { AuctionsService } from "./auctions.service"
import {  CreateAuctionDto  } from './dto/create-auction.dto'
import {  PlaceBidDto  } from './dto/place-bid.dto'

@Controller("auctions")
export class AuctionsController {
  constructor(private auctionsService: AuctionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto)
  }

  @Get()
  async findActive(@Query('skip') skip = 0, @Query('take') take = 20) {
    return this.auctionsService.findActive(skip, take)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.auctionsService.findById(id);
  }

  @Get(':id/bids')
  async getBidHistory(@Param('id') id: string) {
    return this.auctionsService.getBidHistory(id);
  }

  @Post(":id/bid")
  @UseGuards(JwtAuthGuard)
  async placeBid(@Param('id') id: string, placeBidDto: PlaceBidDto, @Request() req) {
    placeBidDto.bidder_id = req.user.id
    return this.auctionsService.placeBid(id, placeBidDto)
  }

  @Post(':id/end')
  @UseGuards(JwtAuthGuard)
  async endAuction(@Param('id') id: string) {
    return this.auctionsService.endAuction(id);
  }
}
