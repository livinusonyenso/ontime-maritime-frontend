import { DocumentType } from "../../../common/enums";
export declare class CreateDocumentDto {
    type: DocumentType;
    file_url: string;
    listing_id?: string | null;
    transaction_id?: string | null;
}
