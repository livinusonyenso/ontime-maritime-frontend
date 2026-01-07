import { IsNumber, IsUUID, IsOptional } from "class-validator"

export class PlaceBidDto {
  @IsNumber()
  amount: number

  @IsUUID()
  @IsOptional()
  bidder_id: string
}
