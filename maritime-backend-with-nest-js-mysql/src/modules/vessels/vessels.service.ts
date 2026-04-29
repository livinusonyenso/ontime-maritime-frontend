import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class VesselsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.vessel.findMany({ orderBy: { name: 'asc' } })
  }

  findOne(id: string) {
    return this.prisma.vessel.findUnique({ where: { id } })
  }

  create(data: any) {
    return this.prisma.vessel.create({ data })
  }

  update(id: string, data: any) {
    return this.prisma.vessel.update({ where: { id }, data })
  }
}
