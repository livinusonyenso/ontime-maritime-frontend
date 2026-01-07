import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { ExecutiveCorner, ExecutiveCornerStatus, Prisma } from "@prisma/client"
import { CreateExecutiveCornerDto } from "./dto/create-executive-corner.dto"

@Injectable()
export class ExecutiveCornerService {
  constructor(private prisma: PrismaService) {}

  async create(createExecutiveCornerDto: CreateExecutiveCornerDto): Promise<ExecutiveCorner> {
    return this.prisma.executiveCorner.create({
      data: createExecutiveCornerDto,
    })
  }

  async findById(id: string): Promise<ExecutiveCorner | null> {
    return this.prisma.executiveCorner.findUnique({
      where: { id },
      include: {
        listing: true,
        decidedBy: true,
      },
    })
  }

  async findPending(skip = 0, take = 20): Promise<ExecutiveCorner[]> {
    return this.prisma.executiveCorner.findMany({
      where: { status: ExecutiveCornerStatus.pending },
      include: {
        listing: {
          include: {
            seller: true,
          },
        },
      },
      skip,
      take,
      orderBy: { deadline_at: "asc" },
    })
  }

  async approve(id: string, executiveId: string, comment?: string): Promise<ExecutiveCorner> {
    const executiveCorner = await this.findById(id)
    if (!executiveCorner) {
      throw new BadRequestException("Executive Corner record not found")
    }

    const logs = (executiveCorner.logs as any[]) || []
    logs.push({
      action: "APPROVED",
      by: executiveId,
      at: new Date(),
      comment,
    })

    return this.prisma.executiveCorner.update({
      where: { id },
      data: {
        status: ExecutiveCornerStatus.approved,
        decided_by: executiveId,
        decided_at: new Date(),
        decision_comment: comment,
        logs: logs as Prisma.JsonArray,
      },
    })
  }

  async reject(id: string, executiveId: string, comment: string): Promise<ExecutiveCorner> {
    const executiveCorner = await this.findById(id)
    if (!executiveCorner) {
      throw new BadRequestException("Executive Corner record not found")
    }

    const logs = (executiveCorner.logs as any[]) || []
    logs.push({
      action: "REJECTED",
      by: executiveId,
      at: new Date(),
      comment,
    })

    return this.prisma.executiveCorner.update({
      where: { id },
      data: {
        status: ExecutiveCornerStatus.rejected,
        decided_by: executiveId,
        decided_at: new Date(),
        decision_comment: comment,
        logs: logs as Prisma.JsonArray,
      },
    })
  }

  async autoRelease(id: string): Promise<ExecutiveCorner> {
    const executiveCorner = await this.findById(id)
    if (!executiveCorner) {
      throw new BadRequestException("Executive Corner record not found")
    }

    const logs = (executiveCorner.logs as any[]) || []
    logs.push({
      action: "AUTO_RELEASED",
      at: new Date(),
      reason: "48 hours deadline passed",
    })

    return this.prisma.executiveCorner.update({
      where: { id },
      data: {
        status: ExecutiveCornerStatus.auto_released,
        decided_at: new Date(),
        logs: logs as Prisma.JsonArray,
      },
    })
  }

  async checkAndAutoRelease(): Promise<ExecutiveCorner[]> {
    const now = new Date()
    const expiredItems = await this.prisma.executiveCorner.findMany({
      where: {
        status: ExecutiveCornerStatus.pending,
        deadline_at: {
          lte: now,
        },
      },
    })

    const autoReleasedItems = []
    for (const item of expiredItems) {
      const released = await this.autoRelease(item.id)
      autoReleasedItems.push(released)
    }

    return autoReleasedItems
  }

  async getAll(skip = 0, take = 20): Promise<ExecutiveCorner[]> {
    return this.prisma.executiveCorner.findMany({
      include: {
        listing: {
          include: {
            seller: true,
          },
        },
        decidedBy: true,
      },
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
  }
}
