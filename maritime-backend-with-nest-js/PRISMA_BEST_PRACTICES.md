# Prisma Best Practices for OnTime Maritime

## Overview
This project uses Prisma ORM with PostgreSQL for all database operations. This guide ensures consistent and production-ready usage.

## Key Principles

### 1. Connection Management
- PrismaService handles connection lifecycle automatically
- Never create multiple PrismaClient instances
- Always use dependency injection to inject PrismaService

\`\`\`typescript
constructor(private prisma: PrismaService) {}
\`\`\`

### 2. Query Optimization

#### Use Select to Limit Fields
\`\`\`typescript
// Good: Fetch only needed fields
await this.prisma.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
    role: true,
  },
})

// Avoid: Fetching all fields
await this.prisma.user.findUnique({
  where: { id: userId },
})
\`\`\`

#### Use Relations Wisely
\`\`\`typescript
// Good: Include only necessary relations
await this.prisma.listing.findMany({
  include: {
    seller: {
      select: { id: true, email: true },
    },
  },
})

// Avoid: Including all relations
await this.prisma.listing.findMany({
  include: {
    seller: true,
    transactions: true,
    auctions: true,
    documents: true,
  },
})
\`\`\`

### 3. Pagination
Always use PrismaUtils for safe pagination:

\`\`\`typescript
import { PrismaUtils } from "src/prisma/prisma.utils"

const { skip, take } = PrismaUtils.getPaginationParams(page, pageSize)
const items = await this.prisma.listing.findMany({
  skip,
  take,
  orderBy: { created_at: "desc" },
})
\`\`\`

### 4. Transactions
Use transactions for operations that must succeed or fail together:

\`\`\`typescript
await this.prisma.transaction(async (tx) => {
  const user = await tx.user.create({ data: {...} })
  await tx.subscription.create({
    data: { user_id: user.id, ... }
  })
  return user
})
\`\`\`

### 5. Error Handling
Use PrismaUtils.handlePrismaError for consistent error handling:

\`\`\`typescript
try {
  await this.prisma.user.create({ data: {...} })
} catch (error) {
  const err = PrismaUtils.handlePrismaError(error)
  throw new HttpException(err.message, err.status)
}
\`\`\`

### 6. Currency Handling
Always use PrismaUtils.formatCurrency for decimal values:

\`\`\`typescript
const amount = PrismaUtils.formatCurrency(100.50)
\`\`\`

### 7. Search Filters
Use PrismaUtils.buildSearchFilter for consistent search:

\`\`\`typescript
const filter = PrismaUtils.buildSearchFilter(query, ["title", "description"])
const results = await this.prisma.listing.findMany({
  where: filter,
})
\`\`\`

## Common Patterns

### Finding by Unique Field
\`\`\`typescript
const user = await this.prisma.user.findUnique({
  where: { email: "user@example.com" },
})
\`\`\`

### Finding Many with Filters
\`\`\`typescript
const listings = await this.prisma.listing.findMany({
  where: {
    status: ListingStatus.active,
    is_high_value: true,
  },
  orderBy: { created_at: "desc" },
})
\`\`\`

### Aggregating Data
\`\`\`typescript
const stats = await this.prisma.transaction.aggregate({
  _sum: { commission_amount: true },
  _count: true,
  where: { created_at: { gte: startDate } },
})
\`\`\`

### Updating Related Data
\`\`\`typescript
await this.prisma.user.update({
  where: { id: userId },
  data: {
    email: "newemail@example.com",
  },
})
\`\`\`

## Performance Tips

1. **Use Indexes**: The schema includes strategic indexes for common queries
2. **Lazy Load**: Don't include all relations by default
3. **Batch Operations**: Use `createMany`, `updateMany` for bulk operations
4. **Connection Pooling**: Configured automatically via DATABASE_URL
5. **Query Logging**: Enabled in development for debugging

## Migration Guide

### Creating a Migration
\`\`\`bash
npx prisma migrate dev --name add_new_table
\`\`\`

### Applying Migrations
\`\`\`bash
npx prisma migrate deploy
\`\`\`

### Resetting Database (Development Only)
\`\`\`bash
npx prisma migrate reset
\`\`\`

### Generating Prisma Client
\`\`\`bash
npx prisma generate
\`\`\`

## Monitoring

Enable query logging in development by setting:
\`\`\`
NODE_ENV=development
\`\`\`

Query duration and details will be logged to console automatically.

## Resources
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Query Optimization](https://www.postgresql.org/docs/current/sql-explain.html)
