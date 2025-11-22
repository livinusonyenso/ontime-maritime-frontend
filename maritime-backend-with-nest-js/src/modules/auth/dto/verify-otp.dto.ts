import { IsString, IsUUID } from "class-validator"

export class VerifyOtpDto {
  @IsUUID()
  userId: string

  @IsString()
  otp: string
}
