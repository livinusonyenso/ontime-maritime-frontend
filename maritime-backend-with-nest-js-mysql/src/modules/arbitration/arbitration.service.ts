import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import {  CreateArbitrationDto  } from './dto/create-arbitration.dto'

@Injectable()
export class ArbitrationService {
  constructor(private prisma: PrismaService) {}

  async create(createArbitrationDto: CreateArbitrationDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: createArbitrationDto.transaction_id },
    })

    if (!transaction) {
      throw new BadRequestException("Transaction not found")
    }

    return this.prisma.arbitrationCase.create({
      data: {
        transaction_id: createArbitrationDto.transaction_id,
        complainant_id: createArbitrationDto.complainant_id,
        defendant_id: createArbitrationDto.defendant_id,
        issue_summary: createArbitrationDto.issue_summary,
        evidence_urls: createArbitrationDto.evidence_urls || [],
        status: "open",
      },
    })
  }

  async findById(id: string) {
    return this.prisma.arbitrationCase.findUnique({
      where: { id },
    })
  }

  async findByTransaction(transactionId: string) {
    return this.prisma.arbitrationCase.findFirst({
      where: { transaction_id: transactionId },
    })
  }

  async resolve(id: string, resolution: string) {
    return this.prisma.arbitrationCase.update({
      where: { id },
      data: {
        status: "resolved",
        resolution,
      },
    })
  }

  async escalate(id: string) {
    return this.prisma.arbitrationCase.update({
      where: { id },
      data: { status: "escalated" },
    })
  }

  async getPendingCases(skip = 0, take = 20) {
    return this.prisma.arbitrationCase.findMany({
      where: { status: "open" },
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
  }
}
