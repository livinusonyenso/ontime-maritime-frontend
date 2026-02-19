import { AdminService } from "./admin.service";
import type { ListingStatus, UserRole } from "@prisma/client";
declare class UpdateUserRoleDto {
    role: UserRole;
}
declare class UpdateSubscriptionDto {
    subscription_status: string;
    subscription_expiry: string | null;
}
declare class SuspendUserDto {
    reason: string;
}
declare class DeleteUserDto {
    reason: string;
}
declare class RejectListingDto {
    reason: string;
}
declare class ApproveKycDto {
    comment?: string;
}
declare class RejectKycDto {
    comment: string;
}
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    private checkAdminRole;
    getDashboardStats(req: any): Promise<any>;
    getAllUsers(skip: string, take: string, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        phone: string;
        password_hash: string;
        is_phone_verified: boolean;
        is_email_verified: boolean;
        subscription_status: string;
        subscription_expiry: Date | null;
        first_name: string | null;
        last_name: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getUserStats(req: any): Promise<any>;
    getUserById(id: string, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        phone: string;
        password_hash: string;
        is_phone_verified: boolean;
        is_email_verified: boolean;
        subscription_status: string;
        subscription_expiry: Date | null;
        first_name: string | null;
        last_name: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    updateUserRole(id: string, body: UpdateUserRoleDto, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        phone: string;
        password_hash: string;
        is_phone_verified: boolean;
        is_email_verified: boolean;
        subscription_status: string;
        subscription_expiry: Date | null;
        first_name: string | null;
        last_name: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    updateUserSubscription(id: string, body: UpdateSubscriptionDto, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        phone: string;
        password_hash: string;
        is_phone_verified: boolean;
        is_email_verified: boolean;
        subscription_status: string;
        subscription_expiry: Date | null;
        first_name: string | null;
        last_name: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    suspendUser(id: string, body: SuspendUserDto, req: any): Promise<{
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        email: string;
        phone: string;
        password_hash: string;
        is_phone_verified: boolean;
        is_email_verified: boolean;
        subscription_status: string;
        subscription_expiry: Date | null;
        first_name: string | null;
        last_name: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    deleteUser(id: string, body: DeleteUserDto, req: any): Promise<{
        message: string;
    }>;
    getPendingKyc(skip: string, take: string, req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    approveKyc(id: string, body: ApproveKycDto, req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    rejectKyc(id: string, body: RejectKycDto, req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getAllListings(skip: string, take: string, req: any): Promise<{
        id: string;
        seller_id: string;
        category: import(".prisma/client").$Enums.ListingCategory;
        title: string;
        description: string;
        price_usd: import("@prisma/client/runtime/library").Decimal;
        origin_port: string;
        destination_port: string;
        container_number: string | null;
        eta: Date;
        photos: import(".prisma/client").Prisma.JsonValue | null;
        certificates: import(".prisma/client").Prisma.JsonValue | null;
        is_perishable: boolean;
        is_dangerous: boolean;
        is_high_value: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getListingsByStatus(status: ListingStatus, skip: string, take: string, req: any): Promise<{
        id: string;
        seller_id: string;
        category: import(".prisma/client").$Enums.ListingCategory;
        title: string;
        description: string;
        price_usd: import("@prisma/client/runtime/library").Decimal;
        origin_port: string;
        destination_port: string;
        container_number: string | null;
        eta: Date;
        photos: import(".prisma/client").Prisma.JsonValue | null;
        certificates: import(".prisma/client").Prisma.JsonValue | null;
        is_perishable: boolean;
        is_dangerous: boolean;
        is_high_value: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        created_at: Date;
        updated_at: Date;
    }[]>;
    approveListing(id: string, req: any): Promise<{
        id: string;
        seller_id: string;
        category: import(".prisma/client").$Enums.ListingCategory;
        title: string;
        description: string;
        price_usd: import("@prisma/client/runtime/library").Decimal;
        origin_port: string;
        destination_port: string;
        container_number: string | null;
        eta: Date;
        photos: import(".prisma/client").Prisma.JsonValue | null;
        certificates: import(".prisma/client").Prisma.JsonValue | null;
        is_perishable: boolean;
        is_dangerous: boolean;
        is_high_value: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        created_at: Date;
        updated_at: Date;
    }>;
    rejectListing(id: string, body: RejectListingDto, req: any): Promise<{
        id: string;
        seller_id: string;
        category: import(".prisma/client").$Enums.ListingCategory;
        title: string;
        description: string;
        price_usd: import("@prisma/client/runtime/library").Decimal;
        origin_port: string;
        destination_port: string;
        container_number: string | null;
        eta: Date;
        photos: import(".prisma/client").Prisma.JsonValue | null;
        certificates: import(".prisma/client").Prisma.JsonValue | null;
        is_perishable: boolean;
        is_dangerous: boolean;
        is_high_value: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        created_at: Date;
        updated_at: Date;
    }>;
    getAllTransactions(skip: string, take: string, req: any): Promise<{
        id: string;
        buyer_id: string;
        seller_id: string;
        listing_id: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        commission_amount: import("@prisma/client/runtime/library").Decimal;
        payment_reference: string | null;
        payout_status: import(".prisma/client").$Enums.PayoutStatus;
        transaction_type: import(".prisma/client").$Enums.TransactionType;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getTransactionStats(req: any): Promise<any>;
    getAuditLogs(skip: string, take: string, req: any): Promise<{
        id: string;
        actor_id: string | null;
        action: string;
        module: string;
        details: import(".prisma/client").Prisma.JsonValue | null;
        ip_address: string;
        timestamp: Date;
    }[]>;
    getAuditLogsByModule(module: string, skip: string, take: string, req: any): Promise<{
        id: string;
        actor_id: string | null;
        action: string;
        module: string;
        details: import(".prisma/client").Prisma.JsonValue | null;
        ip_address: string;
        timestamp: Date;
    }[]>;
    getFraudFlags(skip: string, take: string, req: any): Promise<{
        id: string;
        user_id: string;
        trigger: string;
        severity: number;
        metadata: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
    }[]>;
    getUserFraudScore(userId: string, req: any): Promise<{
        userId: string;
        flags: {
            id: string;
            user_id: string;
            trigger: string;
            severity: number;
            metadata: import(".prisma/client").Prisma.JsonValue | null;
            created_at: Date;
        }[];
        count: number;
    }>;
}
export {};
