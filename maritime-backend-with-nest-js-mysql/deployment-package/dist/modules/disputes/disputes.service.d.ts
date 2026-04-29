import { PrismaService } from '../../prisma/prisma.service';
export declare class DisputesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        case_number: string;
        type: string;
        complainant_name: string;
        respondent_name: string;
        bol_number: string | null;
        description: string;
        claim_amount: import("@prisma/client/runtime/library").Decimal;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        ai_analysis: import(".prisma/client").Prisma.JsonValue | null;
        resolution: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__DisputeClient<{
        id: string;
        case_number: string;
        type: string;
        complainant_name: string;
        respondent_name: string;
        bol_number: string | null;
        description: string;
        claim_amount: import("@prisma/client/runtime/library").Decimal;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        ai_analysis: import(".prisma/client").Prisma.JsonValue | null;
        resolution: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(data: any): import(".prisma/client").Prisma.Prisma__DisputeClient<{
        id: string;
        case_number: string;
        type: string;
        complainant_name: string;
        respondent_name: string;
        bol_number: string | null;
        description: string;
        claim_amount: import("@prisma/client/runtime/library").Decimal;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        ai_analysis: import(".prisma/client").Prisma.JsonValue | null;
        resolution: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, data: any): import(".prisma/client").Prisma.Prisma__DisputeClient<{
        id: string;
        case_number: string;
        type: string;
        complainant_name: string;
        respondent_name: string;
        bol_number: string | null;
        description: string;
        claim_amount: import("@prisma/client/runtime/library").Decimal;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        ai_analysis: import(".prisma/client").Prisma.JsonValue | null;
        resolution: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
