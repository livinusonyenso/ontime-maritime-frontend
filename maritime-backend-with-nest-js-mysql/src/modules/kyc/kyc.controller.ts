import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { KycService } from "./kyc.service"
import { CreateKycDto } from "./dto/create-kyc.dto"
import { UpdateKycDto } from "./dto/update-kyc.dto"

@Controller("kyc")
@UseGuards(JwtAuthGuard)
export class KycController {
  constructor(private kycService: KycService) {}

  @Post()
  async create(@Body() createKycDto: CreateKycDto, @Request() req) {
    createKycDto.user_id = req.user.id
    return this.kycService.create(createKycDto)
  }

  @Get("my-kyc")
  async getMyKyc(@Request() req) {
    return this.kycService.findByUserId(req.user.id)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateKycDto: UpdateKycDto) {
    return this.kycService.update(id, updateKycDto)
  }

  @Get("pending")
  async getPendingKyc(@Request() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Only admins can view pending KYC")
    }
    return this.kycService.getPendingKyc()
  }

  @Patch(":id/approve")
  async approveKyc(@Param("id") id: string, @Request() req) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Only admins can approve KYC")
    }
    return this.kycService.approve(id)
  }

  @Patch(":id/reject")
  async rejectKyc(
    @Param("id") id: string,
    @Body("comment") comment: string,
    @Request() req,
  ) {
    if (req.user.role !== "admin") {
      throw new ForbiddenException("Only admins can reject KYC")
    }
    return this.kycService.reject(id, comment)
  }
}
