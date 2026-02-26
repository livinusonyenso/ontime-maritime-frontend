import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from "@nestjs/common"
import { IsString, IsNotEmpty, IsOptional, IsIn } from "class-validator"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { AdminService } from "./admin.service"
import type { ListingStatus, UserRole, KycStatus } from "@prisma/client"

// ─── DTOs (all fields decorated so ValidationPipe whitelist passes) ────────────

class UpdateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  role: UserRole
}

class UpdateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  subscription_status: string

  @IsOptional()
  @IsString()
  subscription_expiry: string | null
}

class SuspendUserDto {
  @IsString()
  @IsNotEmpty()
  reason: string
}

class DeleteUserDto {
  @IsString()
  @IsNotEmpty()
  reason: string
}

class RejectListingDto {
  @IsString()
  @IsNotEmpty()
  reason: string
}

class ApproveKycDto {
  @IsOptional()
  @IsString()
  comment?: string
}

class RejectKycDto {
  @IsString()
  @IsNotEmpty()
  comment: string
}

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  private checkAdminRole(req: any): void {
    if (req.user.role !== "admin" && req.user.role !== "executive") {
      throw new ForbiddenException("Admin access required")
    }
  }

  /** Extract IP, user-agent and actor email from the request for audit logging. */
  private getCtx(req: any): { ip: string; ua: string | undefined; email: string | undefined } {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      "0.0.0.0"
    return {
      ip,
      ua:    req.headers["user-agent"] as string | undefined,
      email: req.user?.email as string | undefined,
    }
  }

  // ==================== DASHBOARD ====================

  @Get("stats")
  async getDashboardStats(@Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getDashboardStats()
  }

  // ==================== USER MANAGEMENT ====================

  @Get("users")
  async getAllUsers(
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getAllUsers(parseInt(skip), parseInt(take))
  }

  @Get("users/stats")
  async getUserStats(@Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getUserStats()
  }

  @Get("users/:id")
  async getUserById(@Param("id") id: string, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getUserById(id)
  }

  @Patch("users/:id/role")
  async updateUserRole(
    @Param("id") id: string,
    @Body() body: UpdateUserRoleDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    return this.adminService.updateUserRole(id, body.role, req.user.id, ip, ua, email)
  }

  @Patch("users/:id/subscription")
  async updateUserSubscription(
    @Param("id") id: string,
    @Body() body: UpdateSubscriptionDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    const expiry = body.subscription_expiry ? new Date(body.subscription_expiry) : null
    return this.adminService.updateUserSubscription(
      id, body.subscription_status, expiry, req.user.id, ip, ua, email,
    )
  }

  @Post("users/:id/suspend")
  async suspendUser(
    @Param("id") id: string,
    @Body() body: SuspendUserDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    return this.adminService.suspendUser(id, req.user.id, body.reason, ip, ua, email)
  }

  @Delete("users/:id")
  async deleteUser(
    @Param("id") id: string,
    @Body() body: DeleteUserDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    await this.adminService.deleteUser(id, req.user.id, body.reason, ip, ua, email)
    return { message: "User deleted successfully" }
  }

  // ==================== KYC MANAGEMENT ====================

  @Get("kyc/stats")
  async getKycStats(@Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getKycStats()
  }

  @Get("kyc/pending")
  async getPendingKyc(
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getPendingKyc(parseInt(skip), parseInt(take))
  }

  @Get("kyc/list")
  async getKycList(
    @Query("status") status: string = "pending",
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getKycByStatus(status as KycStatus, parseInt(skip), parseInt(take))
  }

  @Post("kyc/:id/approve")
  async approveKyc(
    @Param("id") id: string,
    @Body() body: ApproveKycDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    return this.adminService.approveKyc(id, req.user.id, body.comment, ip, ua, email)
  }

  @Post("kyc/:id/reject")
  async rejectKyc(
    @Param("id") id: string,
    @Body() body: RejectKycDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    return this.adminService.rejectKyc(id, req.user.id, body.comment, ip, ua, email)
  }

  // ==================== LISTING MANAGEMENT ====================

  @Get("listings/stats")
  async getListingStats(@Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getListingStats()
  }

  @Get("listings")
  async getAllListings(
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getAllListings(parseInt(skip), parseInt(take))
  }

  @Get("listings/status/:status")
  async getListingsByStatus(
    @Param("status") status: ListingStatus,
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getListingsByStatus(status, parseInt(skip), parseInt(take))
  }

  @Post("listings/:id/approve")
  async approveListing(@Param("id") id: string, @Request() req: any) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    return this.adminService.approveListing(id, req.user.id, ip, ua, email)
  }

  @Post("listings/:id/reject")
  async rejectListing(
    @Param("id") id: string,
    @Body() body: RejectListingDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const { ip, ua, email } = this.getCtx(req)
    return this.adminService.rejectListing(id, req.user.id, body.reason, ip, ua, email)
  }

  // ==================== TRANSACTION MANAGEMENT ====================

  @Get("transactions")
  async getAllTransactions(
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getAllTransactions(parseInt(skip), parseInt(take))
  }

  @Get("transactions/stats")
  async getTransactionStats(@Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getTransactionStats()
  }

  // ==================== AUDIT LOGS ====================

  @Get("audit-logs")
  async getAuditLogs(
    @Query("module")   module?: string,
    @Query("action")   action?: string,
    @Query("actorId")  actorId?: string,
    @Query("dateFrom") dateFrom?: string,
    @Query("dateTo")   dateTo?: string,
    @Query("skip")     skip: string = "0",
    @Query("take")     take: string = "50",
    @Request()         req?: any,
  ) {
    this.checkAdminRole(req)
    return this.adminService.getAuditLogs({
      module,
      action,
      actorId,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo:   dateTo   ? new Date(dateTo)   : undefined,
      skip:     parseInt(skip),
      take:     parseInt(take),
    })
  }

  @Get("audit-logs/module/:module")
  async getAuditLogsByModule(
    @Param("module") module: string,
    @Query("skip")   skip: string = "0",
    @Query("take")   take: string = "50",
    @Request()       req?: any,
  ) {
    this.checkAdminRole(req)
    return this.adminService.getAuditLogsByModule(module, parseInt(skip), parseInt(take))
  }

  // ==================== FRAUD MANAGEMENT ====================

  @Get("fraud/flags")
  async getFraudFlags(
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getFraudFlags(parseInt(skip), parseInt(take))
  }

  @Get("fraud/user/:userId")
  async getUserFraudScore(@Param("userId") userId: string, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getUserFraudScore(userId)
  }
}
