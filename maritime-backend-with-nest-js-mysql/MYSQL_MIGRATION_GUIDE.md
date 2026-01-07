# PostgreSQL to MySQL Conversion Guide

## Overview

This guide explains how to convert the OnTime Maritime Backend from PostgreSQL to MySQL.

## Changes Summary

### 1. Prisma Schema Changes

| Change | PostgreSQL | MySQL |
|--------|------------|-------|
| Provider | `provider = "postgresql"` | `provider = "mysql"` |
| UUID fields | `@id @default(uuid())` | `@id @default(uuid()) @db.VarChar(36)` |
| String fields | Implicit length | Explicit `@db.VarChar(n)` required |
| Text fields | `@db.Text` | `@db.Text` (same) |
| JSON fields | `Json` | `Json` (MySQL 5.7.8+) |

### 2. Environment Variable Change

**PostgreSQL format:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ontime_maritime?schema=public"
```

**MySQL format:**
```env
DATABASE_URL="mysql://username:password@localhost:3306/ontime_maritime"
```

## Step-by-Step Conversion

### Step 1: Update Environment Variables

Edit your `.env` file:

```env
# Old PostgreSQL connection
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ontime_maritime?schema=public"

# New MySQL connection
DATABASE_URL="mysql://root:password@localhost:3306/ontime_maritime"
```

### Step 2: Replace the Prisma Schema

Replace `prisma/schema.prisma` with the MySQL version provided in this package.

### Step 3: Create MySQL Database

```sql
CREATE DATABASE ontime_maritime CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 4: Regenerate Prisma Client

```bash
# Remove old migrations (start fresh for MySQL)
rm -rf prisma/migrations

# Generate new Prisma client
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init

# Or push schema directly (for development)
npx prisma db push
```

### Step 5: Verify Installation

```bash
# Check database connection
npx prisma db pull

# Open Prisma Studio to verify tables
npx prisma studio
```

## Key Differences to Note

### 1. UUID Handling
- PostgreSQL has native UUID type with `gen_random_uuid()`
- MySQL stores UUIDs as `VARCHAR(36)` strings
- Prisma handles this automatically with `@default(uuid())`

### 2. Case Sensitivity
- PostgreSQL: Case-sensitive by default
- MySQL: Case-insensitive on Windows, configurable on Linux
- The code uses `mode: "insensitive"` which Prisma handles automatically

### 3. JSON Support
- PostgreSQL: Full JSONB support with indexing
- MySQL: JSON support from 5.7.8+ (no JSONB equivalent)
- Works fine for this application's use case

### 4. Boolean Type
- PostgreSQL: Native `boolean`
- MySQL: `TINYINT(1)` (0 or 1)
- Prisma handles this transparently

### 5. Enum Values
- Both support enums natively
- MySQL enum values are stored as strings
- No code changes required

## Code Changes Required

**None!** The application code doesn't need any changes because:

1. Prisma ORM abstracts database differences
2. All queries use Prisma's query API
3. No raw SQL queries in the codebase
4. Date/time handling is consistent

## Performance Considerations

### MySQL Optimizations

Add to your MySQL configuration (`my.cnf`):

```ini
[mysqld]
# InnoDB settings for better performance
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# JSON optimization
max_allowed_packet = 64M
```

### Indexing
All indexes from PostgreSQL schema are preserved in MySQL schema.

## Rollback Plan

If you need to switch back to PostgreSQL:

1. Keep a backup of your PostgreSQL schema
2. Export data from MySQL using Prisma
3. Restore PostgreSQL schema
4. Import data

## Testing Checklist

After conversion, test these critical paths:

- [ ] User signup and login
- [ ] OTP verification
- [ ] Listing creation with JSON fields (photos, certificates)
- [ ] Transaction processing
- [ ] Auction bidding
- [ ] Executive Corner workflow
- [ ] Search functionality (case-insensitive)
- [ ] Admin operations
- [ ] Audit logging

## Troubleshooting

### Common Issues

**1. Connection refused**
```
Error: Can't connect to MySQL server
```
Solution: Check MySQL is running and credentials are correct.

**2. Unknown database**
```
Error: Unknown database 'ontime_maritime'
```
Solution: Create the database first with `CREATE DATABASE`.

**3. JSON column errors (MySQL < 5.7.8)**
```
Error: Unknown column type 'json'
```
Solution: Upgrade MySQL to 5.7.8+ or use `@db.Text` for JSON fields.

**4. Emoji/Unicode issues**
```
Error: Incorrect string value
```
Solution: Ensure database uses `utf8mb4` charset.

## MySQL Version Requirements

- **Minimum**: MySQL 5.7.8 (for JSON support)
- **Recommended**: MySQL 8.0+ (better JSON performance, native UUID functions)

## MariaDB Compatibility

This schema also works with MariaDB 10.2.7+ with one change:

```prisma
datasource db {
  provider = "mysql"  // MariaDB uses mysql provider
  url      = env("DATABASE_URL")
}
```
