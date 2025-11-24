import { UserRole } from "@prisma/client";
export declare class SignupDto {
    email: string;
    phone: string;
    password: string;
    role: UserRole;
}
