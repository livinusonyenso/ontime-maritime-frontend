import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import {  CreateInsurancePolicyDto  } from './dto/create-insurance-policy.dto'

@Injectable()
export class InsuranceService {
  constructor(private prisma: PrismaService) {}

  async createProvider(providerData: any) {
    const existing = await this.prisma.insuranceProvider.findUnique({
      where: { email: providerData.email },
    })

    if (existing) {
      throw new BadRequestException("Provider already registered")
    }

    return this.prisma.insuranceProvider.create({
      data: providerData,
    })
  }

  async getProviders(skip = 0, take = 20) {
    return this.prisma.insuranceProvider.findMany({
      where: { is_verified: true },
      skip,
      take,
    })
  }

  async createPolicy(createPolicyDto: CreateInsurancePolicyDto) {
    const provider = await this.prisma.insuranceProvider.findUnique({
      where: { id: createPolicyDto.provider_id },
    })

    if (!provider || !provider.is_verified) {
      throw new BadRequestException("Invalid insurance provider")
    }

    return this.prisma.insurancePolicy.create({
      data: {
        buyer_id: createPolicyDto.buyer_id,
        listing_id: createPolicyDto.listing_id,
        provider_id: createPolicyDto.provider_id,
        policy_number: createPolicyDto.policy_number,
        policy_pdf_url: createPolicyDto.policy_pdf_url,
      },
    })
  }

  async getPoliciesByBuyer(buyerId: string) {
    return this.prisma.insurancePolicy.findMany({
      where: { buyer_id: buyerId },
      include: { provider: true },
    })
  }

  async validatePolicy(policyId: string): Promise<boolean> {
    const policy = await this.prisma.insurancePolicy.findUnique({
      where: { id: policyId },
    })

    if (!policy) return false
    if (policy.status !== "active") return false

    return true
  }
}
