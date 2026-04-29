import { IsString, IsEnum, IsUUID } from "class-validator"
import { NotificationType } from "../../../common/enums"

export class CreateNotificationDto {
  @IsUUID()
  user_id: string

  @IsEnum(NotificationType)
  type: NotificationType

  @IsString()
  title: string

  @IsString()
  body: string
}
