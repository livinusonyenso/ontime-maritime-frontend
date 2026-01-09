import { PrismaService } from "../../prisma/prisma.service";
import { User, Listing, ListingStatus, Transaction, AuditLog } from "@prisma/client";
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(skip?: number, take?: number): Promise<User[]>;
    getUserStats(): Promise<any>;
    getAllListings(skip?: number, take?: number): Promise<Listing[]>;
    getListingsByStatus(status: ListingStatus, skip?: number, take?: number): Promise<Listing[]>;
    approveHighValueListing(listingId: string, adminId: string): Promise<Listing>;
    rejectListing(listingId: string, adminId: string, reason: string): Promise<Listing>;
    getAllTransactions(skip?: number, take?: number): Promise<Transaction[]>;
    getTransactionStats(): Promise<any>;
    logAction(action: string, module: string, entityId: string, adminId: string, details: any, ipAddress?: string): Promise<AuditLog>;
    getAuditLogs(skip?: number, take?: number): Promise<AuditLog[]>;
    getAuditLogsByModule(module: string, skip?: number, take?: number): Promise<AuditLog[]>;
    suspendUser(userId: string, adminId: string, reason: string): Promise<User>;
    deleteUser(userId: string, adminId: string, reason: string): Promise<void>;
}
