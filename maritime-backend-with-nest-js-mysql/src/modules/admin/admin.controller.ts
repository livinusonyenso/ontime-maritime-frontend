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
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { AdminService } from "./admin.service"
import type { ListingStatus, UserRole, KycStatus } from "@prisma/client"

// DTOs for request body validation
class UpdateUserRoleDto {
  role: UserRole
}

class UpdateSubscriptionDto {
  subscription_status: string
  subscription_expiry: string | null
}

class SuspendUserDto {
  reason: string
}

class DeleteUserDto {
  reason: string
}

class RejectListingDto {
  reason: string
}

class ApproveKycDto {
  comment?: string
}

class RejectKycDto {
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
    return this.adminService.updateUserRole(id, body.role, req.user.id)
  }

  @Patch("users/:id/subscription")
  async updateUserSubscription(
    @Param("id") id: string,
    @Body() body: UpdateSubscriptionDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    const expiry = body.subscription_expiry ? new Date(body.subscription_expiry) : null
    return this.adminService.updateUserSubscription(
      id,
      body.subscription_status,
      expiry,
      req.user.id
    )
  }

  @Post("users/:id/suspend")
  async suspendUser(
    @Param("id") id: string,
    @Body() body: SuspendUserDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.suspendUser(id, req.user.id, body.reason)
  }

  @Delete("users/:id")
  async deleteUser(
    @Param("id") id: string,
    @Body() body: DeleteUserDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    await this.adminService.deleteUser(id, req.user.id, body.reason)
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
    return this.adminService.approveKyc(id, req.user.id, body.comment)
  }

  @Post("kyc/:id/reject")
  async rejectKyc(
    @Param("id") id: string,
    @Body() body: RejectKycDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.rejectKyc(id, req.user.id, body.comment)
  }

  // ==================== LISTING MANAGEMENT ====================

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
    return this.adminService.approveHighValueListing(id, req.user.id)
  }

  @Post("listings/:id/reject")
  async rejectListing(
    @Param("id") id: string,
    @Body() body: RejectListingDto,
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.rejectListing(id, req.user.id, body.reason)
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
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
  ) {
    this.checkAdminRole(req)
    return this.adminService.getAuditLogs(parseInt(skip), parseInt(take))
  }

  @Get("audit-logs/:module")
  async getAuditLogsByModule(
    @Param("module") module: string,
    @Query("skip") skip: string = "0",
    @Query("take") take: string = "20",
    @Request() req: any
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
