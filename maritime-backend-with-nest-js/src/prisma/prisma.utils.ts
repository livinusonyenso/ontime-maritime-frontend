import { Prisma } from "@prisma/client"

export class PrismaUtils {
  /**
   * Safely get pagination parameters with limits
   */
  static getPaginationParams(skip?: number, take?: number) {
    const MAX_PAGE_SIZE = 100
    return {
      skip: Math.max(0, skip || 0),
      take: Math.min(take || 20, MAX_PAGE_SIZE),
    }
  }

  /**
   * Build date range filter for query
   */
  static getDateRangeFilter(startDate?: Date, endDate?: Date): Prisma.DateTimeFilter {
    const filter: Prisma.DateTimeFilter = {}

    if (startDate) {
      filter.gte = startDate
    }

    if (endDate) {
      filter.lte = endDate
    }

    return filter
  }

  /**
   * Format currency to 2 decimal places
   */
  static formatCurrency(amount: number | string): Prisma.Decimal {
    return new Prisma.Decimal(Number(amount).toFixed(2))
  }

  /**
   * Handle Prisma errors with meaningful messages
   */
  static handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        message: "Invalid data provided",
        code: "VALIDATION_ERROR",
        status: 400,
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return {
            message: "Record already exists (unique constraint violation)",
            code: "DUPLICATE_ENTRY",
            field: (error.meta?.target as string[])?.[0],
            status: 409,
          }
        case "P2025":
          return {
            message: "Record not found",
            code: "NOT_FOUND",
            status: 404,
          }
        case "P2003":
          return {
            message: "Invalid reference (foreign key constraint failed)",
            code: "FOREIGN_KEY_ERROR",
            status: 400,
          }
        case "P2014":
          return {
            message: "Required relation violation",
            code: "RELATION_ERROR",
            status: 400,
          }
        default:
          return {
            message: "Database operation failed",
            code: error.code,
            status: 500,
          }
      }
    }

    return {
      message: "Unknown database error",
      code: "DATABASE_ERROR",
      status: 500,
    }
  }

  /**
   * Build search filter with case-insensitive search across multiple fields
   */
  static buildSearchFilter(query: string, fields: string[]) {
    if (!query || !fields.length) return {}

    return {
      OR: fields.map((field) => ({
        [field]: { contains: query, mode: "insensitive" },
      })),
    }
  }
}
