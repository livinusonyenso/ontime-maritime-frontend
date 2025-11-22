import { IsUUID, IsDateString } from "class-validator"

export class CreateExecutiveCornerDto {
  @IsUUID()
  listing_id: string

  @IsDateString()
  submitted_at: string | Date

  @IsDateString()
  deadline_at: string | Date
}
