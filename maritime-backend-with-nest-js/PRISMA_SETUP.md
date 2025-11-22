# Prisma Setup Guide for OnTime Maritime

## Installation

Prisma is already installed in this project. If you need to reinstall:

\`\`\`bash
npm install @prisma/client
npm install -D prisma
\`\`\`

## Initial Setup

### 1. Generate Prisma Client
\`\`\`bash
npx prisma generate
\`\`\`

### 2. Run Migrations
\`\`\`bash
npx prisma migrate deploy
\`\`\`

### 3. Seed Database (Optional)
\`\`\`bash
npx prisma db seed
\`\`\`

## Database URL

Set your DATABASE_URL in `.env`:

\`\`\`
DATABASE_URL="postgresql://username:password@host:port/dbname?schema=public"
\`\`\`

### PostgreSQL Connection String Format
\`\`\`
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
\`\`\`

**Local Development Example:**
\`\`\`
DATABASE_URL="postgresql://postgres:password@localhost:5432/ontime_maritime?schema=public"
\`\`\`

**Production Example (with SSL):**
\`\`\`
DATABASE_URL="postgresql://user:password@prod-host:5432/ontime_maritime?schema=public&sslmode=require"
\`\`\`

## Daily Operations

### Check Database Status
\`\`\`bash
npx prisma db pull
\`\`\`

### View Data in Studio
\`\`\`bash
npx prisma studio
\`\`\`

### Create a New Migration
\`\`\`bash
# After modifying schema.prisma:
npx prisma migrate dev --name describe_change_here
\`\`\`

## Advanced Usage

### Seeding with Prisma
Create `prisma/seed.ts`:

\`\`\`typescript
import { PrismaClient, UserRole } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("Admin@12345", 10)
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@ontime.com" },
    update: {},
    create: {
      email: "admin@ontime.com",
      phone: "+234801234567",
      password_hash: adminPassword,
      role: UserRole.admin,
      is_phone_verified: true,
      is_email_verified: true,
      subscription_status: "paid",
    },
  })

  console.log("Seed data created:", admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
\`\`\`

Update `package.json`:
\`\`\`json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
\`\`\`

Then run:
\`\`\`bash
npx prisma db seed
\`\`\`

### Reset Database (Development Only)
\`\`\`bash
npx prisma migrate reset
\`\`\`

## Debugging

### Enable Query Logging
Set in `.env`:
\`\`\`
NODE_ENV=development
\`\`\`

Queries will be logged to console in development mode.

### Inspect Generated SQL
\`\`\`bash
npx prisma db execute --stdin < query.sql
\`\`\`

## Performance Optimization

### 1. Connection Pooling
Configured via DATABASE_URL with PgBouncer (recommended for production):

\`\`\`
postgresql://user:password@pgbouncer-host:6432/ontime_maritime?schema=public
\`\`\`

### 2. Query Optimization
Always use `select` to fetch only needed fields and use `include` selectively.

### 3. Indexes
The schema includes strategic indexes on:
- Foreign keys (automatic)
- Status fields for filtering
- Date fields for sorting
- High-value flags

## Common Issues

### "Cannot find module '@prisma/client'"
\`\`\`bash
npx prisma generate
npm install
\`\`\`

### "P1000: Authentication failed"
Check your DATABASE_URL connection string.

### "P2000: The provided value for the column is too long"
Check field type lengths in schema (e.g., VARCHAR(255)).

### Prisma Client Out of Sync
\`\`\`bash
npx prisma generate
\`\`\`

## Security Best Practices

1. **Never commit .env files** - Use `.env.local` for local development
2. **Use environment variables** - All secrets via env vars
3. **Validate input** - Always validate before Prisma operations
4. **Use transactions** - For operations that must be atomic
5. **Enable query logging** - In development only
6. **Rotate credentials** - Regularly update database passwords

## Resources

- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
- [Connection Pooling Guide](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
