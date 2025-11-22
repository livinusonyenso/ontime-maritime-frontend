import { IsString, IsEnum, IsOptional, IsUUID } from "class-validator"

export class CreateKycDto {
  @IsUUID()
  @IsOptional()
  user_id: string

  @IsString()
  @IsOptional()
  bvn: string

  @IsEnum(["NIN", "passport", "voter_card", "drivers_license"])
  @IsOptional()
  id_type: string

  @IsString()
  @IsOptional()
  id_number: string

  @IsString()
  @IsOptional()
  id_document_url: string

  @IsString()
  @IsOptional()
  face_photo_url: string
}
