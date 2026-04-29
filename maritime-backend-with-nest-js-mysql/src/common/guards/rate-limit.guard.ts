import { Injectable, type CanActivate, type ExecutionContext, HttpException, HttpStatus } from "@nestjs/common"
import type { Request } from "express"

@Injectable()
export class RateLimitGuard implements CanActivate {
  private requestMap = new Map<string, { count: number; resetTime: number }>()
  private readonly MAX_REQUESTS = 100
  private readonly WINDOW_MS = 15 * 60 * 1000 // 15 minutes

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const ip = (request.ip || "unknown") as string
    const now = Date.now()

    const record = this.requestMap.get(ip)

    if (!record || now > record.resetTime) {
      this.requestMap.set(ip, { count: 1, resetTime: now + this.WINDOW_MS })
      return true
    }

    record.count++
    if (record.count > this.MAX_REQUESTS) {
      throw new HttpException("Too many requests", HttpStatus.TOO_MANY_REQUESTS)
    }

    return true
  }
}
