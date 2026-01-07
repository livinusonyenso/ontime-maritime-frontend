import { ExecutiveCornerService } from "./executive-corner.service";
import { ApproveExecutiveCornerDto } from './dto/approve-executive-corner.dto';
import { RejectExecutiveCornerDto } from './dto/reject-executive-corner.dto';
export declare class ExecutiveCornerController {
    private executiveCornerService;
    constructor(executiveCornerService: ExecutiveCornerService);
    findPending(): Promise<{
        id: string;
        listing_id: string;
        submitted_at: Date;
        deadline_at: Date;
        status: import(".prisma/client").$Enums.ExecutiveCornerStatus;
        decided_by: string | null;
        decided_at: Date | null;
        decision_comment: string | null;
        logs: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getAll(): Promise<{
        id: string;
        listing_id: string;
        submitted_at: Date;
        deadline_at: Date;
        status: import(".prisma/client").$Enums.ExecutiveCornerStatus;
        decided_by: string | null;
        decided_at: Date | null;
        decision_comment: string | null;
        logs: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        listing_id: string;
        submitted_at: Date;
        deadline_at: Date;
        status: import(".prisma/client").$Enums.ExecutiveCornerStatus;
        decided_by: string | null;
        decided_at: Date | null;
        decision_comment: string | null;
        logs: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }>;
    approve(id: string, approveDto: ApproveExecutiveCornerDto, req: any): Promise<{
        id: string;
        listing_id: string;
        submitted_at: Date;
        deadline_at: Date;
        status: import(".prisma/client").$Enums.ExecutiveCornerStatus;
        decided_by: string | null;
        decided_at: Date | null;
        decision_comment: string | null;
        logs: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }>;
    reject(id: string, rejectDto: RejectExecutiveCornerDto, req: any): Promise<{
        id: string;
        listing_id: string;
        submitted_at: Date;
        deadline_at: Date;
        status: import(".prisma/client").$Enums.ExecutiveCornerStatus;
        decided_by: string | null;
        decided_at: Date | null;
        decision_comment: string | null;
        logs: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }>;
    checkAutoRelease(): Promise<{
        id: string;
        listing_id: string;
        submitted_at: Date;
        deadline_at: Date;
        status: import(".prisma/client").$Enums.ExecutiveCornerStatus;
        decided_by: string | null;
        decided_at: Date | null;
        decision_comment: string | null;
        logs: import(".prisma/client").Prisma.JsonValue | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
