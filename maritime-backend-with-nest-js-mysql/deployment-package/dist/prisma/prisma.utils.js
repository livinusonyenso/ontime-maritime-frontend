"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUtils = void 0;
const client_1 = require("@prisma/client");
class PrismaUtils {
    static getPaginationParams(skip, take) {
        const MAX_PAGE_SIZE = 100;
        return {
            skip: Math.max(0, skip || 0),
            take: Math.min(take || 20, MAX_PAGE_SIZE),
        };
    }
    static getDateRangeFilter(startDate, endDate) {
        const filter = {};
        if (startDate) {
            filter.gte = startDate;
        }
        if (endDate) {
            filter.lte = endDate;
        }
        return filter;
    }
    static formatCurrency(amount) {
        return new client_1.Prisma.Decimal(Number(amount).toFixed(2));
    }
    static handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            return {
                message: "Invalid data provided",
                code: "VALIDATION_ERROR",
                status: 400,
            };
        }
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2002":
                    return {
                        message: "Record already exists (unique constraint violation)",
                        code: "DUPLICATE_ENTRY",
                        field: error.meta?.target?.[0],
                        status: 409,
                    };
                case "P2025":
                    return {
                        message: "Record not found",
                        code: "NOT_FOUND",
                        status: 404,
                    };
                case "P2003":
                    return {
                        message: "Invalid reference (foreign key constraint failed)",
                        code: "FOREIGN_KEY_ERROR",
                        status: 400,
                    };
                case "P2014":
                    return {
                        message: "Required relation violation",
                        code: "RELATION_ERROR",
                        status: 400,
                    };
                default:
                    return {
                        message: "Database operation failed",
                        code: error.code,
                        status: 500,
                    };
            }
        }
        return {
            message: "Unknown database error",
            code: "DATABASE_ERROR",
            status: 500,
        };
    }
    static buildSearchFilter(query, fields) {
        if (!query || !fields.length)
            return {};
        return {
            OR: fields.map((field) => ({
                [field]: { contains: query, mode: "insensitive" },
            })),
        };
    }
}
exports.PrismaUtils = PrismaUtils;
//# sourceMappingURL=prisma.utils.js.map