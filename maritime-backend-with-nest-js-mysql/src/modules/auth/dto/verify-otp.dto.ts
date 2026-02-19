import { IsString, IsUUID } from "class-validator"

export class VerifyOtpDto {
  @IsUUID()
  pendingId: string

  @IsString()
  otp: string
}
