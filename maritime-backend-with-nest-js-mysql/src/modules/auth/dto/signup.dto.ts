import {
  IsEmail,
  IsString,
  IsEnum,
  MinLength,
  IsPhoneNumber,
  Matches,
  IsOptional,
  MaxLength,
  ValidateIf,
} from "class-validator"
import { UserRole } from "../../../common/enums"

export class SignupDto {
  @IsEmail()
  email: string

  @IsPhoneNumber("NG")
  phone: string

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: "Password must contain uppercase letter" })
  @Matches(/[0-9]/, { message: "Password must contain number" })
  @Matches(/[!@#$%^&*]/, { message: "Password must contain special character" })
  password: string

  @IsEnum(UserRole)
  role: UserRole

  // Required when role === 'organization'
  @ValidateIf((o) => o.role === UserRole.organization)
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  company_name?: string

  // Optional org fields — ignored for buyer/seller
  @IsOptional()
  @IsString()
  @MaxLength(500)
  business_address?: string

  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string
}
