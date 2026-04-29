import { IsString, IsEnum, IsOptional, IsUUID, IsNotEmpty } from "class-validator"

export class CreateKycDto {
  // Injected by the controller from req.user.id — never sent by the client
  @IsUUID()
  @IsOptional()
  user_id: string

  // BVN is optional supplemental data
  @IsString()
  @IsOptional()
  bvn?: string

  // Required: government ID type
  @IsEnum(["NIN", "passport", "voter_card", "drivers_license"], {
    message: "id_type must be one of: NIN, passport, voter_card, drivers_license",
  })
  @IsNotEmpty()
  id_type: string

  // Required: the actual ID number
  @IsString()
  @IsNotEmpty()
  id_number: string

  // Required: Cloudinary URL returned from POST /upload
  @IsString()
  @IsNotEmpty()
  id_document_url: string

  // Required: Cloudinary URL returned from POST /upload
  @IsString()
  @IsNotEmpty()
  face_photo_url: string
}
