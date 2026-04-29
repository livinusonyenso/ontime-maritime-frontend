import { IsUUID, IsNumber, IsDateString, IsOptional } from "class-validator"

export class CreateAuctionDto {
  @IsUUID()
  listing_id: string

  @IsNumber()
  starting_price: number

  @IsNumber()
  @IsOptional()
  reserve_price: number

  @IsDateString()
  start_time: string

  @IsDateString()
  end_time: string
}
