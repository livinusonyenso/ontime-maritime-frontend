import { IsString } from "class-validator"

export class RejectExecutiveCornerDto {
  @IsString()
  comment: string
}
