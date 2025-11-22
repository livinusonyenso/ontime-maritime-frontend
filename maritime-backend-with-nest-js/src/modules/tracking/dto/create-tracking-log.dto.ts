import { IsString, IsNumber, IsDateString, IsOptional } from "class-validator"

export class CreateTrackingLogDto {
  @IsString()
  container_number: string

  @IsString()
  @IsOptional()
  vessel_imo: string

  @IsNumber()
  lat: number

  @IsNumber()
  lng: number

  @IsNumber()
  @IsOptional()
  speed: number

  @IsString()
  @IsOptional()
  heading: string

  @IsDateString()
  timestamp: string
}
