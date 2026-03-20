import { KycService } from "./kyc.service";
import { CreateKycDto } from "./dto/create-kyc.dto";
import { UpdateKycDto } from "./dto/update-kyc.dto";
export declare class KycController {
    private kycService;
    constructor(kycService: KycService);
    create(createKycDto: CreateKycDto, req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getMyKyc(req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, updateKycDto: UpdateKycDto): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    getPendingKyc(req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    approveKyc(id: string, req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    rejectKyc(id: string, comment: string, req: any): Promise<{
        id: string;
        user_id: string;
        bvn: string | null;
        id_type: string | null;
        id_number: string | null;
        id_document_url: string | null;
        face_photo_url: string | null;
        status: import(".prisma/client").$Enums.KycStatus;
        admin_comment: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
}
