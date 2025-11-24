import { type CanActivate, type ExecutionContext } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
export declare class SubscriptionGuard implements CanActivate {
    private prisma;
    constructor(prisma: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
