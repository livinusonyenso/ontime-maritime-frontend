import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { ExecutiveCornerService } from "./executive-corner.service"
import {  ApproveExecutiveCornerDto  } from './dto/approve-executive-corner.dto'
import {  RejectExecutiveCornerDto  } from './dto/reject-executive-corner.dto'

@Controller("executive-corner")
export class ExecutiveCornerController {
  constructor(private executiveCornerService: ExecutiveCornerService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findPending() {
    const skip = 0
    const take = 20
    return this.executiveCornerService.findPending(skip, take)
  }

  @Get("all")
  @UseGuards(JwtAuthGuard)
  async getAll() {
    const skip = 0
    const take = 20
    return this.executiveCornerService.getAll(skip, take)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.executiveCornerService.findById(id);
  }

  @Post(":id/approve")
  @UseGuards(JwtAuthGuard)
  async approve(@Param('id') id: string, @Body() approveDto: ApproveExecutiveCornerDto, @Request() req) {
    return this.executiveCornerService.approve(id, req.user.id, approveDto.comment)
  }

  @Post(":id/reject")
  @UseGuards(JwtAuthGuard)
  async reject(@Param('id') id: string, @Body() rejectDto: RejectExecutiveCornerDto, @Request() req) {
    return this.executiveCornerService.reject(id, req.user.id, rejectDto.comment)
  }

  @Post("check-auto-release")
  async checkAutoRelease() {
    return this.executiveCornerService.checkAndAutoRelease()
  }
}
