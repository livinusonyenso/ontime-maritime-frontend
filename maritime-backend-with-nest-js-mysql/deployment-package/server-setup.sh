#!/bin/bash
# Server Setup Script - Run this on Namecheap server via SSH

echo "=== OnTime Maritime - Server Setup ==="
echo ""

cd /home/ontiqaqp/ontime-api

# Step 1: Verify deployment-package exists
if [ ! -d "deployment-package" ]; then
    echo "Error: deployment-package folder not found!"
    echo "Please upload and extract deployment-package.zip first"
    exit 1
fi

echo "Step 1: Backing up current files..."
mkdir -p backup-$(date +%Y%m%d-%H%M%S)
cp -r dist backup-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true
cp package.json backup-$(date +%Y%m%d-%H%M%S)/ 2>/dev/null || true

echo "Step 2: Copying dist folder..."
rm -rf dist
cp -r deployment-package/dist ./

echo "Step 3: Copying Prisma Client..."
# Create directories if they don't exist
mkdir -p node_modules/.prisma
mkdir -p node_modules/@prisma

# Remove old Prisma Client
rm -rf node_modules/.prisma/client
rm -rf node_modules/@prisma/client

# Copy new Prisma Client
cp -r deployment-package/node_modules/.prisma/client node_modules/.prisma/
cp -r deployment-package/node_modules/@prisma/client node_modules/@prisma/

echo "Step 4: Copying configuration files..."
cp deployment-package/package.json ./package.json
cp deployment-package/.npmrc ./.npmrc 2>/dev/null || true
cp deployment-package/.env.production ./.env

echo "Step 5: Copying Prisma schema..."
mkdir -p prisma
cp deployment-package/prisma/schema.prisma ./prisma/

echo "Step 6: Verifying Prisma Client installation..."
if [ -d "node_modules/.prisma/client" ]; then
    echo "✓ Prisma Client found at: node_modules/.prisma/client"
    ls -la node_modules/.prisma/client/ | head -10
else
    echo "✗ Error: Prisma Client not found!"
    exit 1
fi

if [ -d "node_modules/@prisma/client" ]; then
    echo "✓ @prisma/client found"
else
    echo "✗ Error: @prisma/client not found!"
    exit 1
fi

echo ""
echo "Step 7: Installing production dependencies..."
npm install --production --legacy-peer-deps

echo ""
echo "Step 8: Final verification..."
echo "Checking file structure:"
echo "- dist/main.js: $([ -f "dist/main.js" ] && echo "✓ Found" || echo "✗ Missing")"
echo "- node_modules/.prisma/client: $([ -d "node_modules/.prisma/client" ] && echo "✓ Found" || echo "✗ Missing")"
echo "- node_modules/@prisma/client: $([ -d "node_modules/@prisma/client" ] && echo "✓ Found" || echo "✗ Missing")"
echo "- .env: $([ -f ".env" ] && echo "✓ Found" || echo "✗ Missing")"
echo "- package.json: $([ -f "package.json" ] && echo "✓ Found" || echo "✗ Missing")"

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Next Steps:"
echo "1. Go to cPanel → Setup Node.js App"
echo "2. Click RESTART on your application"
echo "3. Check the application logs for any errors"
echo "4. Visit: https://ontimemaritime.com/api"
echo ""
echo "If you see errors, check the logs:"
echo "  tail -50 /home/ontiqaqp/ontime-api/stderr.log"
echo ""
