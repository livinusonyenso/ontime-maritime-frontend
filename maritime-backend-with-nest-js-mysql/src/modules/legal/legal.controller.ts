import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { LegalService } from './legal.service'

@Controller('legal')
@UseGuards(JwtAuthGuard)
export class LegalController {
  constructor(private readonly service: LegalService) {}

  @Get('consultants')
  findAllConsultants() {
    return this.service.findAllConsultants()
  }

  @Get('templates')
  findAllTemplates() {
    return this.service.findAllTemplates()
  }

  @Get('services')
  findAllServices() {
    return this.service.findAllServices()
  }

  @Get('resources')
  findAllResources() {
    return this.service.findAllResources()
  }

  @Patch('templates/:id/download')
  incrementDownload(@Param('id') id: string) {
    return this.service.incrementTemplateDownloads(id)
  }
}
