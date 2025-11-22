import { IsEmail, IsString, IsEnum, MinLength, IsPhoneNumber, Matches } from "class-validator"
import { UserRole } from "@prisma/client"

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
}
