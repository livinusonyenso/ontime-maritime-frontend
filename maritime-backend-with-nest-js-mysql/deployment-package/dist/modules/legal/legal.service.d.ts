import { PrismaService } from '../../prisma/prisma.service';
export declare class LegalService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllConsultants(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        title: string;
        specialization: import(".prisma/client").Prisma.JsonValue;
        jurisdiction: import(".prisma/client").Prisma.JsonValue;
        rating: import("@prisma/client/runtime/library").Decimal;
        review_count: number;
        hourly_rate: import("@prisma/client/runtime/library").Decimal;
        available: boolean;
        avatar: string | null;
        bio: string | null;
        experience: number;
        email: string;
        phone: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllTemplates(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        category: string;
        description: string;
        download_url: string;
        premium: boolean;
        downloads: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllServices(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        type: string;
        title: string;
        description: string;
        price: import("@prisma/client/runtime/library").Decimal;
        duration: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllResources(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        type: string;
        category: string;
        summary: string;
        url: string;
        premium: boolean;
        publish_date: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    incrementTemplateDownloads(id: string): import(".prisma/client").Prisma.Prisma__LegalTemplateClient<{
        id: string;
        name: string;
        category: string;
        description: string;
        download_url: string;
        premium: boolean;
        downloads: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
