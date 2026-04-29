#!/bin/bash

echo "OnTime Maritime - Database Setup Script"
echo "========================================"

# Check if .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found"
    echo "Please create .env with DATABASE_URL"
    exit 1
fi

echo "Step 1: Generating Prisma Client..."
npx prisma generate

echo "Step 2: Running Migrations..."
npx prisma migrate deploy

echo "Step 3: Seeding Database..."
npx prisma db seed

echo ""
echo "✓ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Start your application: npm run start"
echo "2. View database: npx prisma studio"
