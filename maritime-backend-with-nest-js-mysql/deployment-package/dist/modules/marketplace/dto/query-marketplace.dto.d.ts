export declare class QueryMarketplaceDto {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
    sort?: "newest" | "price_asc" | "price_desc" | "featured";
    skip?: number;
    take?: number;
}
