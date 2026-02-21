import { IsEmail, IsString, Length, MinLength, Matches } from "class-validator"

export class ResetPasswordDto {
  @IsEmail()
  email: string

  @IsString()
  @Length(6, 6, { message: "OTP must be exactly 6 digits" })
  otp: string

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: "Password must contain an uppercase letter" })
  @Matches(/[0-9]/, { message: "Password must contain a number" })
  @Matches(/[!@#$%^&*]/, { message: "Password must contain a special character" })
  newPassword: string
}
