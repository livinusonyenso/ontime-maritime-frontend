import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class BolService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.billOfLading.findMany({ orderBy: { created_at: 'desc' } })
  }

  findOne(id: string) {
    return this.prisma.billOfLading.findUnique({ where: { id } })
  }

  create(data: any) {
    return this.prisma.billOfLading.create({ data })
  }

  update(id: string, data: any) {
    return this.prisma.billOfLading.update({ where: { id }, data })
  }
}
