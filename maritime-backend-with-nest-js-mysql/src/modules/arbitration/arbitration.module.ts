import { Module } from "@nestjs/common"
import { ArbitrationService } from "./arbitration.service"
import { ArbitrationController } from "./arbitration.controller"
import { PrismaModule } from "../../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  providers: [ArbitrationService],
  controllers: [ArbitrationController],
  exports: [ArbitrationService],
})
export class ArbitrationModule {}
