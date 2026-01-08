import { NotificationType } from "../../../common/enums";
export declare class CreateNotificationDto {
    user_id: string;
    type: NotificationType;
    title: string;
    body: string;
}
