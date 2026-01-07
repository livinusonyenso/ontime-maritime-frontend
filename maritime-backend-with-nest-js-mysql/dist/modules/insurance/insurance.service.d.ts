import { PrismaService } from "../../prisma/prisma.service";
import { CreateInsurancePolicyDto } from './dto/create-insurance-policy.dto';
export declare class InsuranceService {
    private prisma;
    constructor(prisma: PrismaService);
    createProvider(providerData: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        website: string | null;
        is_verified: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    getProviders(skip?: number, take?: number): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        website: string | null;
        is_verified: boolean;
        created_at: Date;
        updated_at: Date;
    }[]>;
    createPolicy(createPolicyDto: CreateInsurancePolicyDto): Promise<{
        id: string;
        buyer_id: string;
        listing_id: string | null;
        provider_id: string;
        policy_number: string;
        policy_pdf_url: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    }>;
    getPoliciesByBuyer(buyerId: string): Promise<({
        provider: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            website: string | null;
            is_verified: boolean;
            created_at: Date;
            updated_at: Date;
        };
    } & {
        id: string;
        buyer_id: string;
        listing_id: string | null;
        provider_id: string;
        policy_number: string;
        policy_pdf_url: string;
        status: string;
        created_at: Date;
        updated_at: Date;
    })[]>;
    validatePolicy(policyId: string): Promise<boolean>;
}
