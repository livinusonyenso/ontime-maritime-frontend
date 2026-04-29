import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { SecurityService } from './security.service'

@Controller('security')
@UseGuards(JwtAuthGuard)
export class SecurityController {
  constructor(private readonly service: SecurityService) {}

  @Get('reports')
  findAllReports() {
    return this.service.findAllReports()
  }

  @Get('contacts')
  findAllContacts() {
    return this.service.findAllContacts()
  }

  @Post('reports')
  createReport(@Body() body: any) {
    return this.service.createReport(body)
  }

  @Patch('reports/:id')
  updateReport(@Param('id') id: string, @Body() body: any) {
    return this.service.updateReport(id, body)
  }
}
