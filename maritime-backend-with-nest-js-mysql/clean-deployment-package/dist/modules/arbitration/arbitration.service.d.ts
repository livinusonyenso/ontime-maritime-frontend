import { PrismaService } from "../../prisma/prisma.service";
import { CreateArbitrationDto } from './dto/create-arbitration.dto';
export declare class ArbitrationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createArbitrationDto: CreateArbitrationDto): Promise<{
        id: string;
        transaction_id: string;
        complainant_id: string;
        defendant_id: string;
        issue_summary: string;
        evidence_urls: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        resolution: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        transaction_id: string;
        complainant_id: string;
        defendant_id: string;
        issue_summary: string;
        evidence_urls: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        resolution: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    findByTransaction(transactionId: string): Promise<{
        id: string;
        transaction_id: string;
        complainant_id: string;
        defendant_id: string;
        issue_summary: string;
        evidence_urls: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        resolution: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    resolve(id: string, resolution: string): Promise<{
        id: string;
        transaction_id: string;
        complainant_id: string;
        defendant_id: string;
        issue_summary: string;
        evidence_urls: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        resolution: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    escalate(id: string): Promise<{
        id: string;
        transaction_id: string;
        complainant_id: string;
        defendant_id: string;
        issue_summary: string;
        evidence_urls: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        resolution: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getPendingCases(skip?: number, take?: number): Promise<{
        id: string;
        transaction_id: string;
        complainant_id: string;
        defendant_id: string;
        issue_summary: string;
        evidence_urls: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        resolution: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
