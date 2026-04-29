#!/bin/bash
# Deployment Script for Namecheap Production
# This script builds locally and prepares files for upload

echo "=== OnTime Maritime - Production Deployment ==="
echo ""

# Step 1: Clean and install dependencies
echo "Step 1: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing dependencies!"
    exit 1
fi

# Step 2: Generate Prisma Client
echo "Step 2: Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "Error generating Prisma Client!"
    exit 1
fi

# Step 3: Build the application
echo "Step 3: Building application..."
npx nest build
if [ $? -ne 0 ]; then
    echo "Error building application!"
    exit 1
fi

# Step 4: Create deployment folder
echo "Step 4: Creating deployment package..."
deployFolder="./deployment-package"
rm -rf "$deployFolder"
mkdir -p "$deployFolder"

# Step 5: Copy necessary files
echo "Step 5: Copying files..."

# Copy dist folder
cp -r ./dist "$deployFolder/dist"

# Copy Prisma generated files
mkdir -p "$deployFolder/node_modules/.prisma"
cp -r ./node_modules/.prisma/client "$deployFolder/node_modules/.prisma/client"

mkdir -p "$deployFolder/node_modules/@prisma"
cp -r ./node_modules/@prisma/client "$deployFolder/node_modules/@prisma/client"

# Copy prisma schema
mkdir -p "$deployFolder/prisma"
cp ./prisma/schema.prisma "$deployFolder/prisma/schema.prisma"

# Copy package files
cp ./package.json "$deployFolder/package.json"
cp ./package-lock.json "$deployFolder/package-lock.json" 2>/dev/null || true

# Copy .env.production
cp ./.env.production "$deployFolder/.env.production"

echo ""
echo "=== Deployment Package Ready! ==="
echo ""
echo "Next Steps:"
echo "1. Upload the 'deployment-package' folder contents to /home/ontiqaqp/ontime-api/"
echo "2. Rename .env.production to .env on the server"
echo "3. Run: npm install --production --legacy-peer-deps"
echo "4. Restart the app from cPanel Node.js manager"
echo ""
echo "Files are in: $deployFolder"
