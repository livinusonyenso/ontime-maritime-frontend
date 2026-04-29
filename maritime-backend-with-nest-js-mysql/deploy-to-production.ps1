# Deployment Script for Namecheap Production
# This script builds locally and prepares files for upload

Write-Host "=== OnTime Maritime - Production Deployment ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean and install dependencies
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error installing dependencies!" -ForegroundColor Red
    exit 1
}

# Step 2: Generate Prisma Client
Write-Host "Step 2: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error generating Prisma Client!" -ForegroundColor Red
    exit 1
}

# Step 3: Build the application
Write-Host "Step 3: Building application..." -ForegroundColor Yellow
npx nest build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building application!" -ForegroundColor Red
    exit 1
}

# Step 4: Create deployment folder
Write-Host "Step 4: Creating deployment package..." -ForegroundColor Yellow
$deployFolder = ".\deployment-package"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder | Out-Null

# Step 5: Copy necessary files
Write-Host "Step 5: Copying files..." -ForegroundColor Yellow

# Copy dist folder
Copy-Item -Path ".\dist" -Destination "$deployFolder\dist" -Recurse

# Copy Prisma generated files
New-Item -ItemType Directory -Path "$deployFolder\node_modules\.prisma" -Force | Out-Null
Copy-Item -Path ".\node_modules\.prisma\client" -Destination "$deployFolder\node_modules\.prisma\client" -Recurse

New-Item -ItemType Directory -Path "$deployFolder\node_modules\@prisma" -Force | Out-Null
Copy-Item -Path ".\node_modules\@prisma\client" -Destination "$deployFolder\node_modules\@prisma\client" -Recurse

# Copy prisma schema
New-Item -ItemType Directory -Path "$deployFolder\prisma" -Force | Out-Null
Copy-Item -Path ".\prisma\schema.prisma" -Destination "$deployFolder\prisma\schema.prisma"

# Copy package files
Copy-Item -Path ".\package.json" -Destination "$deployFolder\package.json"
Copy-Item -Path ".\package-lock.json" -Destination "$deployFolder\package-lock.json" -ErrorAction SilentlyContinue

# Copy .env.production
Copy-Item -Path ".\.env.production" -Destination "$deployFolder\.env.production"

Write-Host ""
Write-Host "=== Deployment Package Ready! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Upload the 'deployment-package' folder contents to /home/ontiqaqp/ontime-api/" -ForegroundColor White
Write-Host "2. Rename .env.production to .env on the server" -ForegroundColor White
Write-Host "3. Run: npm install --production --legacy-peer-deps" -ForegroundColor White
Write-Host "4. Restart the app from cPanel Node.js manager" -ForegroundColor White
Write-Host ""
Write-Host "Files are in: $deployFolder" -ForegroundColor Yellow
