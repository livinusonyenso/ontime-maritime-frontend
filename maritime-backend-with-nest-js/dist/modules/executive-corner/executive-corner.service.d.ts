import { PrismaService } from "../../prisma/prisma.service";
import { ExecutiveCorner } from "@prisma/client";
import { CreateExecutiveCornerDto } from "./dto/create-executive-corner.dto";
export declare class ExecutiveCornerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExecutiveCornerDto: CreateExecutiveCornerDto): Promise<ExecutiveCorner>;
    findById(id: string): Promise<ExecutiveCorner | null>;
    findPending(skip?: number, take?: number): Promise<ExecutiveCorner[]>;
    approve(id: string, executiveId: string, comment?: string): Promise<ExecutiveCorner>;
    reject(id: string, executiveId: string, comment: string): Promise<ExecutiveCorner>;
    autoRelease(id: string): Promise<ExecutiveCorner>;
    checkAndAutoRelease(): Promise<ExecutiveCorner[]>;
    getAll(skip?: number, take?: number): Promise<ExecutiveCorner[]>;
}
