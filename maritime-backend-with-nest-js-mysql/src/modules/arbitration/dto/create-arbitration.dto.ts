import { IsUUID, IsString, IsArray, IsOptional, MinLength } from "class-validator"

export class CreateArbitrationDto {
  @IsUUID()
  transaction_id: string

  @IsUUID()
  complainant_id: string

  @IsUUID()
  defendant_id: string

  @IsString()
  @MinLength(20)
  issue_summary: string

  @IsArray()
  @IsOptional()
  evidence_urls: string[]
}
