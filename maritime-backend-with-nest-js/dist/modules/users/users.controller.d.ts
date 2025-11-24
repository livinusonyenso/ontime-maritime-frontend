import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
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
    getAll(): Promise<{
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
}
