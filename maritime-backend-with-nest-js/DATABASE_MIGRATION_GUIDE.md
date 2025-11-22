# Database Migration Guide

## What is a Migration?

A migration is a file that describes changes to your database schema. It allows you to:
- Track schema changes in version control
- Deploy changes consistently across environments
- Roll back changes if needed

## Creating Migrations

### Automatic Migration (Development)
After modifying `prisma/schema.prisma`:

\`\`\`bash
npx prisma migrate dev --name add_feature_name
\`\`\`

This will:
1. Detect schema changes
2. Generate migration file
3. Apply migration to database
4. Regenerate Prisma Client

### Manual Migration
For complex changes:

\`\`\`bash
npx prisma migrate dev --name manual_migration --skip-generate
\`\`\`

Then edit the generated migration file before applying.

## Migration Files

Located in `prisma/migrations/`, each contains:
- Timestamp
- Description
- SQL statements

Example: `prisma/migrations/20240101120000_add_users_table/migration.sql`

## Applying Migrations

### Development
\`\`\`bash
npx prisma migrate dev
\`\`\`

### Staging/Production
\`\`\`bash
npx prisma migrate deploy
\`\`\`

**Never** use `migrate reset` in production!

## Rolling Back

### Last Migration (Development Only)
\`\`\`bash
npx prisma migrate resolve --rolled-back migration_name
npx prisma migrate dev
\`\`\`

### All Migrations (Development Only)
\`\`\`bash
npx prisma migrate reset
\`\`\`

## Checking Migration Status

\`\`\`bash
npx prisma migrate status
\`\`\`

Shows:
- Successfully applied migrations
- Pending migrations
- Failed migrations

## Best Practices

1. **Name migrations descriptively**
   \`\`\`bash
   npx prisma migrate dev --name add_user_subscription_fields
   \`\`\`

2. **Test migrations locally first**
   - Create local database copy
   - Test migration
   - Verify data integrity

3. **Review generated SQL**
   - Check migration file before applying
   - Ensure changes match intentions

4. **Backup before production migrations**
   \`\`\`bash
   pg_dump ontime_maritime > backup.sql
   \`\`\`

5. **Deploy migrations separately from code**
   - Run migrations on schedule
   - Verify success before deploying new code

6. **Use transactions**
   - Prisma migrations are automatically transactional
   - They succeed completely or fail completely

## Troubleshooting

### "Migration history is behind"
\`\`\`bash
npx prisma migrate resolve --applied migration_name
\`\`\`

### "Failed to apply migration"
1. Check error message
2. Review migration SQL
3. Fix issues manually if needed
4. Mark as resolved:
   \`\`\`bash
   npx prisma migrate resolve --rolled-back migration_name
   \`\`\`

### "Cannot delete record: foreign key constraint fails"
Use `onDelete: Cascade` in schema relationships:
\`\`\`prisma
model Listing {
  seller User @relation(fields: [seller_id], references: [id], onDelete: Cascade)
}
