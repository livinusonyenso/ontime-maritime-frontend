import { IsEnum, IsString, IsUUID, IsOptional } from "class-validator"
import { DocumentType } from "@prisma/client"

export class CreateDocumentDto {
  @IsEnum(DocumentType)
  type: DocumentType

  @IsString()
  file_url: string

  @IsUUID()
  @IsOptional()
  listing_id?: string | null

  @IsUUID()
  @IsOptional()
  transaction_id?: string | null
}
