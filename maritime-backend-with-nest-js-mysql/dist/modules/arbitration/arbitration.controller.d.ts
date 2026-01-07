import { ArbitrationService } from './arbitration.service';
import { CreateArbitrationDto } from './dto/create-arbitration.dto';
export declare class ArbitrationController {
    private arbitrationService;
    constructor(arbitrationService: ArbitrationService);
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
    getCase(id: string): Promise<{
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
    getCaseByTransaction(transactionId: string): Promise<{
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
    getPending(): Promise<{
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
