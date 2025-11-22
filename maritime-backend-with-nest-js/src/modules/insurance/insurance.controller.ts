import { Controller, Post, Get, Param, UseGuards } from "@nestjs/common"
import {  InsuranceService  } from './insurance.service'
import {  CreateInsurancePolicyDto  } from './dto/create-insurance-policy.dto'
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"

@Controller("insurance")
export class InsuranceController {
  constructor(private insuranceService: InsuranceService) {}

  @Get("providers")
  async getProviders() {
    return this.insuranceService.getProviders()
  }

  @Post("policy")
  @UseGuards(JwtAuthGuard)
  async createPolicy(createPolicyDto: CreateInsurancePolicyDto) {
    return this.insuranceService.createPolicy(createPolicyDto)
  }

  @Get("policies/:buyerId")
  async getPolicies(@Param("buyerId") buyerId: string) {
    return this.insuranceService.getPoliciesByBuyer(buyerId);
  }

  @Get("validate/:policyId")
  async validatePolicy(@Param("policyId") policyId: string) {
    const isValid = await this.insuranceService.validatePolicy(policyId);
    return { valid: isValid };
  }
}
