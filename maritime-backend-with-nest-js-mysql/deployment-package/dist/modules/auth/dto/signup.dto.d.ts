import { UserRole } from "../../../common/enums";
export declare class SignupDto {
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    company_name?: string;
    business_address?: string;
    website?: string;
}
