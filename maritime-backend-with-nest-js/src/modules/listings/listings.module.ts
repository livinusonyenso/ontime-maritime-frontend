import { Module } from "@nestjs/common"

import { ListingsService } from "./listings.service"
import { ListingsController } from "./listings.controller"

import { ExecutiveCornerModule } from "../executive-corner/executive-corner.module"
import { PrismaModule } from "../../prisma/prisma.module"
import { FraudModule } from "../fraud/fraud.module"

@Module({
  imports: [ExecutiveCornerModule, PrismaModule, FraudModule],
  controllers: [ListingsController],
  providers: [ListingsService],
  exports: [ListingsService],
})
export class ListingsModule {}
