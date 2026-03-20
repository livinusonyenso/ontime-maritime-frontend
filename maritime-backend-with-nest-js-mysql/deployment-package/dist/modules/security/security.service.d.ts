import { PrismaService } from '../../prisma/prisma.service';
export declare class SecurityService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllReports(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        type: string;
        urgency: string;
        agency: string;
        title: string;
        description: string;
        location: string | null;
        coordinates: import(".prisma/client").Prisma.JsonValue | null;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        reporter_contact: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        case_number: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllContacts(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        agency: string;
        name: string;
        phone: string;
        email: string;
        region: string;
        available24x7: boolean;
        created_at: Date;
    }[]>;
    createReport(data: any): import(".prisma/client").Prisma.Prisma__SecurityReportClient<{
        id: string;
        type: string;
        urgency: string;
        agency: string;
        title: string;
        description: string;
        location: string | null;
        coordinates: import(".prisma/client").Prisma.JsonValue | null;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        reporter_contact: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        case_number: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateReport(id: string, data: any): import(".prisma/client").Prisma.Prisma__SecurityReportClient<{
        id: string;
        type: string;
        urgency: string;
        agency: string;
        title: string;
        description: string;
        location: string | null;
        coordinates: import(".prisma/client").Prisma.JsonValue | null;
        evidence: import(".prisma/client").Prisma.JsonValue | null;
        reporter_contact: import(".prisma/client").Prisma.JsonValue | null;
        status: string;
        case_number: string | null;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
