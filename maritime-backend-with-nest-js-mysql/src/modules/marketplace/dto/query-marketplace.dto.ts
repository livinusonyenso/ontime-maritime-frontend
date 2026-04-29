import { IsOptional, IsString, IsNumber, IsIn, Min, Max } from "class-validator"
import { Type } from "class-transformer"

export class QueryMarketplaceDto {
  /** Full-text search against title + description */
  @IsOptional()
  @IsString()
  search?: string

  /** Frontend category (equipment, vessel, container, …) */
  @IsOptional()
  @IsString()
  category?: string

  /** Minimum price in USD */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number

  /** Maximum price in USD */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number

  /** Item condition (new, like_new, good, fair, used) */
  @IsOptional()
  @IsString()
  condition?: string

  /** Sort order */
  @IsOptional()
  @IsIn(["newest", "price_asc", "price_desc", "featured"])
  sort?: "newest" | "price_asc" | "price_desc" | "featured"

  /** Pagination offset */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number

  /** Page size (max 100) */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  take?: number
}
