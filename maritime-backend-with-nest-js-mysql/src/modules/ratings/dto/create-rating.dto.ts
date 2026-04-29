import { IsUUID, IsNumber, IsString, IsOptional, Min, Max } from "class-validator"

export class CreateRatingDto {
  @IsUUID()
  transaction_id: string

  @IsUUID()
  user_id: string

  @IsUUID()
  rater_id: string

  @IsNumber()
  @Min(1)
  @Max(5)
  score: number

  @IsString()
  @IsOptional()
  comment: string
}
