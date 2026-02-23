import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class LegalService {
  constructor(private prisma: PrismaService) {}

  findAllConsultants() {
    return this.prisma.legalConsultant.findMany({ orderBy: { name: 'asc' } })
  }

  findAllTemplates() {
    return this.prisma.legalTemplate.findMany({ orderBy: { name: 'asc' } })
  }

  findAllServices() {
    return this.prisma.legalService.findMany({ orderBy: { title: 'asc' } })
  }

  findAllResources() {
    return this.prisma.legalResource.findMany({ orderBy: { title: 'asc' } })
  }

  incrementTemplateDownloads(id: string) {
    return this.prisma.legalTemplate.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    })
  }
}
