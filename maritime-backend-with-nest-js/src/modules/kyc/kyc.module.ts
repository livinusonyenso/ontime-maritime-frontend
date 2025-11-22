import { Module } from "@nestjs/common"

import { KycService } from "./kyc.service"
import { KycController } from "./kyc.controller"


@Module({
  imports: [],
  controllers: [KycController],
  providers: [KycService],
  exports: [KycService],
})
export class KycModule {}
