# Deployment Script for Namecheap Production - With File Lock Fix
# This script builds locally and prepares files for upload

Write-Host "=== OnTime Maritime - Production Deployment ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: This script will close VS Code to unlock Prisma files." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to cancel, or any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Step 1: Kill VS Code to unlock files
Write-Host ""
Write-Host "Closing VS Code..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*Code*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 2: Clean and install dependencies
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error installing dependencies!" -ForegroundColor Red
    exit 1
}

# Step 3: Remove locked Prisma files manually
Write-Host "Step 2: Cleaning old Prisma Client..." -ForegroundColor Yellow
Remove-Item -Path ".\node_modules\.prisma" -Recurse -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Step 4: Generate Prisma Client
Write-Host "Step 3: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error generating Prisma Client!" -ForegroundColor Red
    Write-Host "Try manually deleting node_modules\.prisma folder and run again" -ForegroundColor Yellow
    exit 1
}

# Step 5: Build the application
Write-Host "Step 4: Building application..." -ForegroundColor Yellow
npx nest build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building application!" -ForegroundColor Red
    exit 1
}

# Step 6: Create deployment folder
Write-Host "Step 5: Creating deployment package..." -ForegroundColor Yellow
$deployFolder = ".\deployment-package"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder | Out-Null

# Step 7: Copy necessary files
Write-Host "Step 6: Copying files..." -ForegroundColor Yellow

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

# Copy package files (use production version)
Copy-Item -Path ".\package.production.json" -Destination "$deployFolder\package.json"
Copy-Item -Path ".\package-lock.json" -Destination "$deployFolder\package-lock.json" -ErrorAction SilentlyContinue

# Copy .npmrc
Copy-Item -Path ".\.npmrc.production" -Destination "$deployFolder\.npmrc"

# Copy .env.production
Copy-Item -Path ".\.env.production" -Destination "$deployFolder\.env.production"

# Copy src folder for reference (optional, not needed for runtime)
# Copy-Item -Path ".\src" -Destination "$deployFolder\src" -Recurse

Write-Host ""
Write-Host "=== Deployment Package Ready! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Compress 'deployment-package' folder into a ZIP file" -ForegroundColor White
Write-Host "2. Upload ZIP to /home/ontiqaqp/ontime-api/ via cPanel File Manager" -ForegroundColor White
Write-Host "3. Extract the ZIP on the server" -ForegroundColor White
Write-Host "4. SSH: cd /home/ontiqaqp/ontime-api" -ForegroundColor White
Write-Host "5. SSH: cp deployment-package/.env.production .env" -ForegroundColor White
Write-Host "6. SSH: npm install --production --legacy-peer-deps" -ForegroundColor White
Write-Host "7. Restart the app from cPanel Node.js manager" -ForegroundColor White
Write-Host ""
Write-Host "Files are in: $deployFolder" -ForegroundColor Yellow
Write-Host ""
Write-Host "Creating ZIP file..." -ForegroundColor Yellow

# Create ZIP file
$zipPath = ".\deployment-package.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$deployFolder\*" -DestinationPath $zipPath

Write-Host "ZIP file created: deployment-package.zip" -ForegroundColor Green
Write-Host "Ready to upload to Namecheap!" -ForegroundColor Green
