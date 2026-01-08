import { PrismaService } from "../../prisma/prisma.service";
import { Kyc } from "@prisma/client";
import { CreateKycDto } from "./dto/create-kyc.dto";
import { UpdateKycDto } from "./dto/update-kyc.dto";
export declare class KycService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createKycDto: CreateKycDto): Promise<Kyc>;
    findByUserId(userId: string): Promise<Kyc | null>;
    update(id: string, updateKycDto: UpdateKycDto): Promise<Kyc>;
    approve(id: string): Promise<Kyc>;
    reject(id: string, comment: string): Promise<Kyc>;
    getPendingKyc(): Promise<Kyc[]>;
}
