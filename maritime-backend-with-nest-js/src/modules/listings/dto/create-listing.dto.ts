import {
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsArray,
  IsOptional,
  IsBoolean,
  Min,
  MinLength,
  MaxLength,
} from "class-validator"
import { ListingCategory } from "@prisma/client"

export class CreateListingDto {
  @IsEnum(ListingCategory)
  category: ListingCategory

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  title: string

  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  description: string

  @IsNumber()
  @Min(0)
  price_usd: number

  @IsString()
  @MinLength(2)
  origin_port: string

  @IsString()
  @MinLength(2)
  destination_port: string

  @IsString()
  @IsOptional()
  container_number: string

  @IsDateString()
  eta: string

  @IsArray()
  @IsOptional()
  photos: string[]

  @IsArray()
  @IsOptional()
  certificates: string[]

  @IsBoolean()
  @IsOptional()
  is_perishable: boolean

  @IsBoolean()
  @IsOptional()
  is_dangerous: boolean
}
