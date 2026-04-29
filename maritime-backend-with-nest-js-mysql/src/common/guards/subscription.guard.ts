import { Injectable, type CanActivate, type ExecutionContext, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request.user?.id

    if (!userId) {
      throw new ForbiddenException("User not authenticated")
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new ForbiddenException("User not found")
    }

    if (user.role === "seller" || user.role === "expert") {
      if (user.subscription_status !== "paid") {
        throw new ForbiddenException("Active subscription required for sellers. Please upgrade to continue.")
      }

      if (user.subscription_expiry && new Date() > user.subscription_expiry) {
        throw new ForbiddenException("Subscription expired. Please renew.")
      }
    }

    return true
  }
}
