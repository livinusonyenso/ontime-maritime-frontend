import { Module } from "@nestjs/common"

import { ExecutiveCornerService } from "./executive-corner.service"
import { ExecutiveCornerController } from "./executive-corner.controller"


@Module({
  imports: [],
  controllers: [ExecutiveCornerController],
  providers: [ExecutiveCornerService],
  exports: [ExecutiveCornerService],
})
export class ExecutiveCornerModule {}
