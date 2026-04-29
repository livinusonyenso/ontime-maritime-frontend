import { IsString, IsOptional } from "class-validator"

export class ApproveExecutiveCornerDto {
  @IsString()
  @IsOptional()
  comment: string
}
