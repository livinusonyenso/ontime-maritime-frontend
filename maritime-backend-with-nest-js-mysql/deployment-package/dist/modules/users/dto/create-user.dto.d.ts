import { UserRole } from "../../../common/enums";
export declare class CreateUserDto {
    email: string;
    phone: string;
    password_hash: string;
    role: UserRole;
    is_phone_verified?: boolean;
    is_email_verified?: boolean;
}
