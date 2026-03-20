import { PrismaService } from '../../prisma/prisma.service';
export declare class KnowledgeService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        type: string;
        category: string;
        description: string;
        url: string;
        file_size: string | null;
        pages: number | null;
        external_source: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__KnowledgeResourceClient<{
        id: string;
        title: string;
        type: string;
        category: string;
        description: string;
        url: string;
        file_size: string | null;
        pages: number | null;
        external_source: string | null;
        created_at: Date;
        updated_at: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: any): import(".prisma/client").Prisma.Prisma__KnowledgeResourceClient<{
        id: string;
        title: string;
        type: string;
        category: string;
        description: string;
        url: string;
        file_size: string | null;
        pages: number | null;
        external_source: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
