import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  findAllReports() {
    return this.prisma.securityReport.findMany({ orderBy: { created_at: 'desc' } })
  }

  findAllContacts() {
    return this.prisma.securityContact.findMany({ orderBy: { agency: 'asc' } })
  }

  createReport(data: any) {
    return this.prisma.securityReport.create({ data })
  }

  updateReport(id: string, data: any) {
    return this.prisma.securityReport.update({ where: { id }, data })
  }
}
