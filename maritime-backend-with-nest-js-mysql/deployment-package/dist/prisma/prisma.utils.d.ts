import { Prisma } from "@prisma/client";
export declare class PrismaUtils {
    static getPaginationParams(skip?: number, take?: number): {
        skip: number;
        take: number;
    };
    static getDateRangeFilter(startDate?: Date, endDate?: Date): Prisma.DateTimeFilter;
    static formatCurrency(amount: number | string): Prisma.Decimal;
    static handlePrismaError(error: any): {
        message: string;
        code: string;
        status: number;
        field?: undefined;
    } | {
        message: string;
        code: string;
        field: string;
        status: number;
    };
    static buildSearchFilter(query: string, fields: string[]): {
        OR?: undefined;
    } | {
        OR: {
            [x: string]: {
                contains: string;
                mode: string;
            };
        }[];
    };
}
