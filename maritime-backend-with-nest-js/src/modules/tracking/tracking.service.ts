import { Injectable } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { TrackingLog } from "@prisma/client"
import { CreateTrackingLogDto } from "./dto/create-tracking-log.dto"

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackingLogDto: CreateTrackingLogDto): Promise<TrackingLog> {
    return this.prisma.trackingLog.create({
      data: createTrackingLogDto,
    })
  }

  async findByContainer(containerNumber: string, limit = 100): Promise<TrackingLog[]> {
    return this.prisma.trackingLog.findMany({
      where: { container_number: containerNumber },
      orderBy: { timestamp: "desc" },
      take: limit,
    })
  }

  async findByVessel(vesselImo: string, limit = 100): Promise<TrackingLog[]> {
    return this.prisma.trackingLog.findMany({
      where: { vessel_imo: vesselImo },
      orderBy: { timestamp: "desc" },
      take: limit,
    })
  }

  async getLatestPosition(containerNumber: string): Promise<TrackingLog | null> {
    return this.prisma.trackingLog.findFirst({
      where: { container_number: containerNumber },
      orderBy: { timestamp: "desc" },
    })
  }

  async getLatestVesselPosition(vesselImo: string): Promise<TrackingLog | null> {
    return this.prisma.trackingLog.findFirst({
      where: { vessel_imo: vesselImo },
      orderBy: { timestamp: "desc" },
    })
  }

  async getMovementHistory(containerNumber: string, startDate: Date, endDate: Date): Promise<TrackingLog[]> {
    return this.prisma.trackingLog.findMany({
      where: {
        container_number: containerNumber,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { timestamp: "asc" },
    })
  }
}
