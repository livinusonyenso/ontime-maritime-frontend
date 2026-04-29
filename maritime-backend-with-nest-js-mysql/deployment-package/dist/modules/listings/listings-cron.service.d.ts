import { PrismaService } from "../../prisma/prisma.service";
export declare class ListingsCronService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    checkAndAutoRelease(): Promise<void>;
}
