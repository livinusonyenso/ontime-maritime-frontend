import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        id: string;
        user_id: string;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        created_at: Date;
    }>;
    getMyNotifications(req: any, skip?: number, take?: number): Promise<{
        id: string;
        user_id: string;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        created_at: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        user_id: string;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        created_at: Date;
    }>;
    markAsSent(id: string): Promise<{
        id: string;
        user_id: string;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        created_at: Date;
    }>;
    markAsFailed(id: string): Promise<{
        id: string;
        user_id: string;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        body: string;
        status: import(".prisma/client").$Enums.NotificationStatus;
        created_at: Date;
    }>;
}
