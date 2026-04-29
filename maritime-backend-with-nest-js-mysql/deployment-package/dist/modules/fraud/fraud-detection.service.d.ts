import { PrismaService } from '../../prisma/prisma.service';
export declare class FraudDetectionService {
    private prisma;
    constructor(prisma: PrismaService);
    checkUserFraudScore(userId: string): Promise<number>;
    flagSuspiciousActivity(userId: string, trigger: string, severity: number, metadata?: any): Promise<void>;
    checkDuplicateDocuments(documentHash: string): Promise<boolean>;
    checkMultipleAccountsFromEmail(email: string): Promise<number>;
    checkMultipleAccountsFromPhone(phone: string): Promise<number>;
    checkKycMismatch(userId: string, kycData: any): Promise<boolean>;
    checkTransactionVelocity(userId: string, threshold?: number): Promise<boolean>;
}
