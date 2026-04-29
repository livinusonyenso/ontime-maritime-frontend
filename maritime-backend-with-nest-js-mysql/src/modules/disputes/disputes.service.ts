import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class DisputesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.dispute.findMany({ orderBy: { created_at: 'desc' } })
  }

  findOne(id: string) {
    return this.prisma.dispute.findUnique({ where: { id } })
  }

  create(data: any) {
    return this.prisma.dispute.create({ data })
  }

  update(id: string, data: any) {
    return this.prisma.dispute.update({ where: { id }, data })
  }
}
