import { NotificationType } from "@prisma/client";
export declare class CreateNotificationDto {
    user_id: string;
    type: NotificationType;
    title: string;
    body: string;
}
