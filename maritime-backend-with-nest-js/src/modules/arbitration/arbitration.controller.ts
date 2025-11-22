import { Controller, Post, Get, Body, Param, UseGuards, Patch } from "@nestjs/common"
import {  ArbitrationService  } from './arbitration.service'
import {  CreateArbitrationDto  } from './dto/create-arbitration.dto'
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"

@Controller("arbitration")
export class ArbitrationController {
  constructor(private arbitrationService: ArbitrationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createArbitrationDto: CreateArbitrationDto) {
    return this.arbitrationService.create(createArbitrationDto);
  }

  @Get("case/:id")
  async getCase(@Param("id") id: string) {
    return this.arbitrationService.findById(id);
  }

  @Get("transaction/:transactionId")
  async getCaseByTransaction(@Param("transactionId") transactionId: string) {
    return this.arbitrationService.findByTransaction(transactionId);
  }

  @Patch(":id/resolve")
  @UseGuards(JwtAuthGuard)
  async resolve(@Param("id") id: string, @Body("resolution") resolution: string) {
    return this.arbitrationService.resolve(id, resolution)
  }

  @Patch(":id/escalate")
  @UseGuards(JwtAuthGuard)
  async escalate(@Param("id") id: string) {
    return this.arbitrationService.escalate(id);
  }

  @Get("pending")
  @UseGuards(JwtAuthGuard)
  async getPending() {
    return this.arbitrationService.getPendingCases()
  }
}
