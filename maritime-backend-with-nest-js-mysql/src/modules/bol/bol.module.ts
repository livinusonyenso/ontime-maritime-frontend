import { Module } from '@nestjs/common'
import { BolService } from './bol.service'
import { BolController } from './bol.controller'

@Module({
  controllers: [BolController],
  providers: [BolService],
})
export class BolModule {}
