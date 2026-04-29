# Complete Deployment Script
Write-Host "=== OnTime Maritime - FULL Production Deployment ===" -ForegroundColor Cyan
Write-Host ""

# Generate Prisma Client with Linux binary
Write-Host "Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error generating Prisma Client!" -ForegroundColor Red
    exit 1
}

# Build the application
Write-Host "Step 2: Building application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building application!" -ForegroundColor Red
    exit 1
}

# Prune dev dependencies
Write-Host "Step 3: Removing dev dependencies..." -ForegroundColor Yellow
npm prune --production

# Create deployment folder
Write-Host "Step 4: Creating deployment package..." -ForegroundColor Yellow
$deployFolder = ".\full-deployment-package"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder | Out-Null

# Copy files
Write-Host "Step 5: Copying files..." -ForegroundColor Yellow
Copy-Item -Path ".\dist" -Destination "$deployFolder\dist" -Recurse
Copy-Item -Path ".\node_modules" -Destination "$deployFolder\node_modules" -Recurse
Copy-Item -Path ".\prisma" -Destination "$deployFolder\prisma" -Recurse
Copy-Item -Path ".\package.json" -Destination "$deployFolder\package.json"
Copy-Item -Path ".\.env.production" -Destination "$deployFolder\.env"

# Create ZIP
Write-Host "Step 6: Creating ZIP..." -ForegroundColor Yellow
$zipPath = ".\full-deployment.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}
Compress-Archive -Path "$deployFolder\*" -DestinationPath $zipPath

Write-Host ""
Write-Host "=== Done! ===" -ForegroundColor Green
Write-Host "File: $zipPath" -ForegroundColor Yellow
