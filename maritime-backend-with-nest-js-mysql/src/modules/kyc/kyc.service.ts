import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { Kyc, KycStatus } from "@prisma/client"
import { CreateKycDto } from "./dto/create-kyc.dto"
import { UpdateKycDto } from "./dto/update-kyc.dto"

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

  async create(createKycDto: CreateKycDto): Promise<Kyc> {
    return this.prisma.kyc.create({
      data: createKycDto,
    })
  }

  async findByUserId(userId: string): Promise<Kyc | null> {
    return this.prisma.kyc.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    })
  }

  async update(id: string, updateKycDto: UpdateKycDto): Promise<Kyc> {
    return this.prisma.kyc.update({
      where: { id },
      data: updateKycDto,
    })
  }

  async approve(id: string): Promise<Kyc> {
    const kyc = await this.prisma.kyc.findUnique({ where: { id } })
    if (!kyc) {
      throw new BadRequestException("KYC record not found")
    }
    return this.prisma.kyc.update({
      where: { id },
      data: { status: KycStatus.approved },
    })
  }

  async reject(id: string, comment: string): Promise<Kyc> {
    const kyc = await this.prisma.kyc.findUnique({ where: { id } })
    if (!kyc) {
      throw new BadRequestException("KYC record not found")
    }
    return this.prisma.kyc.update({
      where: { id },
      data: {
        status: KycStatus.rejected,
        admin_comment: comment,
      },
    })
  }

  async getPendingKyc(): Promise<Kyc[]> {
    return this.prisma.kyc.findMany({
      where: { status: KycStatus.pending },
      orderBy: { created_at: "desc" },
    })
  }
}
