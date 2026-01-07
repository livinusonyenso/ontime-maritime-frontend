import { ListingCategory } from "@prisma/client";
export declare class CreateListingDto {
    category: ListingCategory;
    title: string;
    description: string;
    price_usd: number;
    origin_port: string;
    destination_port: string;
    container_number: string;
    eta: string;
    photos: string[];
    certificates: string[];
    is_perishable: boolean;
    is_dangerous: boolean;
}
