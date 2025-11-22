import { Injectable, type OnModuleInit, type OnModuleDestroy, Logger } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "warn" },
      ],
    })
  }

  async onModuleInit() {
    // @ts-ignore - Prisma event types
    ;(this as any).$on("query", (e: any) => {
      if (process.env.NODE_ENV === "development") {
        this.logger.debug(`Query: ${e.query} | Duration: ${e.duration}ms`, "PrismaQuery")
      }
    })

    // @ts-ignore - Prisma event types
    ;(this as any).$on("error", (e: any) => {
      this.logger.error(`Prisma Error: ${e.message}`, "PrismaError")
    })

    // @ts-ignore - Prisma event types
    ;(this as any).$on("warn", (e: any) => {
      this.logger.warn(`Prisma Warning: ${e.message}`, "PrismaWarn")
    })

    await this.$connect()
    this.logger.log("Database connected successfully")
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log("Database disconnected")
  }

  async cleanUp() {
    await this.$disconnect()
  }
}
