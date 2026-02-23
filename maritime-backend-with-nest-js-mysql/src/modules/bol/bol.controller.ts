import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { BolService } from './bol.service'

@Controller('bol')
@UseGuards(JwtAuthGuard)
export class BolController {
  constructor(private readonly service: BolService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id)
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body)
  }
}
