import { Controller, Post, Get, Param, Query, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { TrackingService } from "./tracking.service"
import {  CreateTrackingLogDto  } from './dto/create-tracking-log.dto'

@Controller("tracking")
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createTrackingLogDto: CreateTrackingLogDto) {
    return this.trackingService.create(createTrackingLogDto)
  }

  @Get("container/:containerNumber")
  async findByContainer(@Param('containerNumber') containerNumber: string, @Query('limit') limit = 100) {
    return this.trackingService.findByContainer(containerNumber, limit)
  }

  @Get("vessel/:vesselImo")
  async findByVessel(@Param('vesselImo') vesselImo: string, @Query('limit') limit = 100) {
    return this.trackingService.findByVessel(vesselImo, limit)
  }

  @Get('latest/container/:containerNumber')
  async getLatestPosition(@Param('containerNumber') containerNumber: string) {
    return this.trackingService.getLatestPosition(containerNumber);
  }

  @Get('latest/vessel/:vesselImo')
  async getLatestVesselPosition(@Param('vesselImo') vesselImo: string) {
    return this.trackingService.getLatestVesselPosition(vesselImo);
  }

  @Get("history/:containerNumber")
  async getMovementHistory(
    @Param('containerNumber') containerNumber: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.trackingService.getMovementHistory(containerNumber, new Date(startDate), new Date(endDate))
  }
}
