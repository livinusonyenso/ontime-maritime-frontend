import { DocumentsService } from "./documents.service";
import { CreateDocumentDto } from './dto/create-document.dto';
export declare class DocumentsController {
    private documentsService;
    constructor(documentsService: DocumentsService);
    create(createDocumentDto: CreateDocumentDto): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }>;
    findByListing(listingId: string): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }[]>;
    findByTransaction(transactionId: string): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }[]>;
    verify(id: string): Promise<{
        valid: boolean;
        document: import(".prisma/client").Document;
    }>;
    revoke(id: string): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }>;
    generateBillOfLading(body: {
        transactionId: string;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }>;
    generateInvoice(body: {
        transactionId: string;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }>;
    generatePackingList(body: {
        transactionId: string;
    }): Promise<{
        id: string;
        type: import(".prisma/client").$Enums.DocumentType;
        listing_id: string | null;
        transaction_id: string | null;
        file_url: string;
        qr_hash: string | null;
        is_revoked: boolean;
        created_at: Date;
    }>;
}
