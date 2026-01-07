import { Controller, Post, Get, Patch, Param, UseGuards, Request, ForbiddenException } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import {  KycService  } from './kyc.service'
import {  CreateKycDto  } from './dto/create-kyc.dto'
import {  UpdateKycDto  } from './dto/update-kyc.dto'

@Controller("kyc")
export class KycController {
  constructor(private kycService: KycService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createKycDto: CreateKycDto, @Request() req) {
    createKycDto.user_id = req.user.id
    return this.kycService.create(createKycDto)
  }

  @Get("my-kyc")
  @UseGuards(JwtAuthGuard)
  async getMyKyc(@Request() req) {
    return this.kycService.findByUserId(req.user.id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, updateKycDto: UpdateKycDto) {
    return this.kycService.update(id, updateKycDto)
  }

  @Get("pending")
  @UseGuards(JwtAuthGuard)
  async getPendingKyc(@Request() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Only admins can view pending KYC");
    }
    return this.kycService.getPendingKyc();
  }

  @Patch(":id/approve")
  @UseGuards(JwtAuthGuard)
  async approveKyc(@Param("id") id: string, @Request() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Only admins can approve KYC")
    }
    return this.kycService.approve(id)
  }

  @Patch(":id/reject")
  @UseGuards(JwtAuthGuard)
  async rejectKyc(@Param("id") id: string, comment: string, @Request() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Only admins can reject KYC")
    }
    return this.kycService.reject(id, comment)
  }
}
