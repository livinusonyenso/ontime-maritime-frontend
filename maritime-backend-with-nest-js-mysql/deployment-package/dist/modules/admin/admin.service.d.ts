import { PrismaService } from "../../prisma/prisma.service";
import { User, UserRole, Listing, ListingStatus, Transaction, AuditLog, Kyc, Prisma } from "@prisma/client";
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(skip?: number, take?: number): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserStats(): Promise<any>;
    updateUserRole(userId: string, role: UserRole, adminId: string): Promise<User>;
    updateUserSubscription(userId: string, subscriptionStatus: string, subscriptionExpiry: Date | null, adminId: string): Promise<User>;
    suspendUser(userId: string, adminId: string, reason: string): Promise<User>;
    deleteUser(userId: string, adminId: string, reason: string): Promise<void>;
    getPendingKyc(skip?: number, take?: number): Promise<Kyc[]>;
    approveKyc(kycId: string, adminId: string, comment?: string): Promise<Kyc>;
    rejectKyc(kycId: string, adminId: string, comment: string): Promise<Kyc>;
    getAllListings(skip?: number, take?: number): Promise<Listing[]>;
    getListingsByStatus(status: ListingStatus, skip?: number, take?: number): Promise<Listing[]>;
    approveHighValueListing(listingId: string, adminId: string): Promise<Listing>;
    rejectListing(listingId: string, adminId: string, reason: string): Promise<Listing>;
    getAllTransactions(skip?: number, take?: number): Promise<Transaction[]>;
    getTransactionStats(): Promise<any>;
    getDashboardStats(): Promise<any>;
    logAction(action: string, module: string, entityId: string, adminId: string, details: any, ipAddress?: string): Promise<AuditLog>;
    getAuditLogs(skip?: number, take?: number): Promise<AuditLog[]>;
    getAuditLogsByModule(module: string, skip?: number, take?: number): Promise<AuditLog[]>;
    getFraudFlags(skip?: number, take?: number): Promise<{
        id: string;
        user_id: string;
        trigger: string;
        severity: number;
        metadata: Prisma.JsonValue | null;
        created_at: Date;
    }[]>;
    getUserFraudScore(userId: string): Promise<{
        userId: string;
        flags: {
            id: string;
            user_id: string;
            trigger: string;
            severity: number;
            metadata: Prisma.JsonValue | null;
            created_at: Date;
        }[];
        count: number;
    }>;
}
