import {
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsArray,
  IsOptional,
  IsBoolean,
  IsObject,
  Min,
  MinLength,
  MaxLength,
} from "class-validator"
import { ListingCategory } from "../../../common/enums"

export class CreateListingDto {
  @IsEnum(ListingCategory)
  category: ListingCategory

  /** Human-readable marketplace category (equipment, vessel, warehouse, etc.) */
  @IsString()
  @IsOptional()
  marketplace_category?: string

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
  @IsOptional()
  price_type?: string

  @IsString()
  @IsOptional()
  currency?: string

  @IsString()
  @IsOptional()
  origin_port?: string

  @IsString()
  @IsOptional()
  destination_port?: string

  @IsString()
  @IsOptional()
  container_number?: string

  @IsDateString()
  @IsOptional()
  eta?: string

  @IsArray()
  @IsOptional()
  photos?: string[]

  @IsArray()
  @IsOptional()
  images?: string[]

  @IsArray()
  @IsOptional()
  certificates?: string[]

  @IsObject()
  @IsOptional()
  location?: Record<string, any>

  @IsObject()
  @IsOptional()
  specifications?: Record<string, string>

  @IsString()
  @IsOptional()
  condition?: string

  @IsString()
  @IsOptional()
  availability?: string

  @IsBoolean()
  @IsOptional()
  bol_required?: boolean

  @IsString()
  @IsOptional()
  bol_number?: string

  @IsString()
  @IsOptional()
  bol_image?: string

  @IsBoolean()
  @IsOptional()
  bol_verified?: boolean

  @IsBoolean()
  @IsOptional()
  featured?: boolean

  @IsString()
  @IsOptional()
  seller_name?: string

  @IsNumber()
  @IsOptional()
  seller_rating?: number

  @IsBoolean()
  @IsOptional()
  is_perishable?: boolean

  @IsBoolean()
  @IsOptional()
  is_dangerous?: boolean

  @IsBoolean()
  @IsOptional()
  is_high_value?: boolean
}
