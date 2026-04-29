import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.knowledgeResource.findMany({ orderBy: { title: 'asc' } })
  }

  findOne(id: string) {
    return this.prisma.knowledgeResource.findUnique({ where: { id } })
  }

  create(data: any) {
    return this.prisma.knowledgeResource.create({ data })
  }
}
