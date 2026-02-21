import { IsString, MinLength, Matches } from "class-validator"

export class ResetPasswordDto {
  @IsString()
  resetToken: string

  @IsString()
  @MinLength(8)
  @Matches(/[A-Z]/, { message: "Password must contain an uppercase letter" })
  @Matches(/[0-9]/, { message: "Password must contain a number" })
  @Matches(/[!@#$%^&*]/, { message: "Password must contain a special character" })
  newPassword: string
}
