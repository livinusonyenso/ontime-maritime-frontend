import { KnowledgeService } from './knowledge.service';
export declare class KnowledgeController {
    private readonly service;
    constructor(service: KnowledgeService);
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
    create(body: any): import(".prisma/client").Prisma.Prisma__KnowledgeResourceClient<{
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
