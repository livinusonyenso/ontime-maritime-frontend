import { PrismaService } from "../../prisma/prisma.service";
import { MailService } from "../notifications/mail.service";
import { User, UserRole, Listing, ListingStatus, Transaction, AuditLog, Kyc, KycStatus, Prisma } from "@prisma/client";
export declare class AdminService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    getAllUsers(skip?: number, take?: number): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserStats(): Promise<any>;
    updateUserRole(userId: string, role: UserRole, adminId: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<User>;
    updateUserSubscription(userId: string, subscriptionStatus: string, subscriptionExpiry: Date | null, adminId: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<User>;
    suspendUser(userId: string, adminId: string, reason: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<User>;
    deleteUser(userId: string, adminId: string, reason: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<void>;
    getPendingKyc(skip?: number, take?: number): Promise<Kyc[]>;
    getKycStats(): Promise<{
        pending: number;
        approved: number;
        rejected: number;
    }>;
    getKycByStatus(status: KycStatus, skip?: number, take?: number): Promise<Kyc[]>;
    approveKyc(kycId: string, adminId: string, comment?: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<Kyc>;
    rejectKyc(kycId: string, adminId: string, comment: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<Kyc>;
    getAllListings(skip?: number, take?: number): Promise<Listing[]>;
    getListingsByStatus(status: ListingStatus, skip?: number, take?: number): Promise<Listing[]>;
    getListingStats(): Promise<{
        pending: number;
        active: number;
        rejected: number;
        archived: number;
    }>;
    approveListing(listingId: string, adminId: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<Listing>;
    approveHighValueListing(listingId: string, adminId: string): Promise<Listing>;
    rejectListing(listingId: string, adminId: string, reason: string, ipAddress?: string, userAgent?: string, actorEmail?: string): Promise<Listing>;
    getAllTransactions(skip?: number, take?: number): Promise<Transaction[]>;
    getTransactionStats(): Promise<any>;
    getDashboardStats(): Promise<any>;
    logAction(action: string, module: string, targetId: string, adminId: string, details: any, ipAddress?: string, actorEmail?: string, userAgent?: string): Promise<AuditLog>;
    getAuditLogs(opts?: {
        module?: string;
        action?: string;
        actorId?: string;
        dateFrom?: Date;
        dateTo?: Date;
        skip?: number;
        take?: number;
    }): Promise<{
        data: AuditLog[];
        total: number;
    }>;
    getAuditLogsByModule(module: string, skip?: number, take?: number): Promise<{
        data: AuditLog[];
        total: number;
    }>;
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
