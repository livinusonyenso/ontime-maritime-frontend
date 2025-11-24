import { PrismaService } from "../../prisma/prisma.service";
import { Document } from "@prisma/client";
import { CreateDocumentDto } from "./dto/create-document.dto";
export declare class DocumentsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateHash;
    create(createDocumentDto: CreateDocumentDto): Promise<Document>;
    findById(id: string): Promise<Document | null>;
    findByListing(listingId: string): Promise<Document[]>;
    findByTransaction(transactionId: string): Promise<Document[]>;
    verify(id: string): Promise<{
        valid: boolean;
        document: Document;
    }>;
    revoke(id: string): Promise<Document>;
    generateBillOfLading(transactionId: string): Promise<Document>;
    generateInvoice(transactionId: string): Promise<Document>;
    generatePackingList(transactionId: string): Promise<Document>;
}
