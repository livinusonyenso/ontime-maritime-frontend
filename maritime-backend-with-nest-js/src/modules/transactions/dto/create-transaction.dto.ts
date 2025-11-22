import { IsUUID, IsNumber, IsEnum, IsString, IsOptional, Min } from "class-validator"
import { TransactionType } from "@prisma/client"

export class CreateTransactionDto {
  @IsUUID()
  buyer_id: string

  @IsUUID()
  seller_id: string

  @IsUUID()
  listing_id: string

  @IsNumber()
  @Min(0)
  amount: number

  @IsEnum(TransactionType)
  transaction_type: TransactionType

  @IsString()
  @IsOptional()
  payment_reference: string
}
