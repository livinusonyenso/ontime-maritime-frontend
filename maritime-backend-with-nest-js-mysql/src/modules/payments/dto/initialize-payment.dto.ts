import { IsEmail, IsNumber, IsObject, IsOptional, IsPositive, IsString, IsUrl } from 'class-validator'

export class InitializePaymentDto {
  @IsEmail()
  email: string

  @IsNumber()
  @IsPositive()
  amount: number

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>

  @IsOptional()
  @IsString()
  callbackUrl?: string
}
