import { IsEmail, IsString, IsEnum, IsOptional } from "class-validator"
import { UserRole } from "../../../common/enums"

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  phone: string

  @IsString()
  password_hash: string

  @IsEnum(UserRole)
  role: UserRole

  @IsOptional()
  is_phone_verified?: boolean

  @IsOptional()
  is_email_verified?: boolean
}
