import { Controller, Get, Post, Param, UseGuards, Request, ForbiddenException } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import {  AdminService  } from './admin.service'
import type { ListingStatus } from "@prisma/client"

@Controller("admin")
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  private checkAdminRole(req: any): void {
    if (req.user.role !== "admin" && req.user.role !== "executive") {
      throw new ForbiddenException("Admin access required")
    }
  }

  @Get("users")
  async getAllUsers(skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getAllUsers(skip, take)
  }

  @Get("users/stats")
  async getUserStats(@Request() req: any) {
    this.checkAdminRole(req);
    return this.adminService.getUserStats();
  }

  @Get("listings")
  async getAllListings(skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getAllListings(skip, take)
  }

  @Get("listings/status/:status")
  async getListingsByStatus(@Param("status") status: ListingStatus, skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getListingsByStatus(status, skip, take)
  }

  @Post("listings/:id/approve")
  async approveListing(@Param("id") id: string, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.approveHighValueListing(id, req.user.id)
  }

  @Post("listings/:id/reject")
  async rejectListing(@Param("id") id: string, body: { reason: string }, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.rejectListing(id, req.user.id, body.reason)
  }

  @Get("transactions")
  async getAllTransactions(skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getAllTransactions(skip, take)
  }

  @Get("transactions/stats")
  async getTransactionStats(@Request() req: any) {
    this.checkAdminRole(req);
    return this.adminService.getTransactionStats();
  }

  @Get("audit-logs")
  async getAuditLogs(skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getAuditLogs(skip, take)
  }

  @Get("audit-logs/:module")
  async getAuditLogsByModule(@Param("module") module: string, skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.getAuditLogsByModule(module, skip, take)
  }

  @Post("users/:id/suspend")
  async suspendUser(@Param("id") id: string, body: { reason: string }, @Request() req: any) {
    this.checkAdminRole(req)
    return this.adminService.suspendUser(id, req.user.id, body.reason)
  }

  @Post("users/:id/delete")
  async deleteUser(@Param("id") id: string, body: { reason: string }, @Request() req: any) {
    this.checkAdminRole(req)
    await this.adminService.deleteUser(id, req.user.id, body.reason)
    return { message: "User deleted successfully" }
  }

  @Get("fraud/flags")
  async getFraudFlags(skip: number, take: number, @Request() req: any) {
    this.checkAdminRole(req)
    const flags = await req.prisma.fraudFlag.findMany({
      skip,
      take,
      orderBy: { created_at: "desc" },
    })
    return flags
  }

  @Get("fraud/user/:userId")
  async getUserFraudScore(@Param("userId") userId: string, @Request() req: any) {
    this.checkAdminRole(req)
    const flags = await req.prisma.fraudFlag.findMany({
      where: { user_id: userId },
    })
    return { userId, flags, count: flags.length }
  }

  @Get("stats/dashboard")
  async getDashboardStats(@Request() req: any) {
    this.checkAdminRole(req);
    const userStats = await this.adminService.getUserStats();
    const transactionStats = await this.adminService.getTransactionStats();

    return {
      users: userStats,
      transactions: transactionStats,
      timestamp: new Date(),
    };
  }
}
