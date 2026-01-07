import { Module } from "@nestjs/common"

import { AuctionsService } from "./auctions.service"
import { AuctionsController } from "./auctions.controller"


@Module({
  imports: [],
  controllers: [AuctionsController],
  providers: [AuctionsService],
  exports: [AuctionsService],
})
export class AuctionsModule {}
