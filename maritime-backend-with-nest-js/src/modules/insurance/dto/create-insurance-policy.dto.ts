import { IsUUID, IsString, IsOptional } from "class-validator"

export class CreateInsurancePolicyDto {
  @IsUUID()
  buyer_id: string

  @IsUUID()
  @IsOptional()
  listing_id: string

  @IsUUID()
  provider_id: string

  @IsString()
  policy_number: string

  @IsString()
  policy_pdf_url: string
}
