# Clean Deployment Script for CloudLinux/Namecheap
Write-Host "=== Clean Deployment (No node_modules) ===" -ForegroundColor Cyan

# Generate Prisma Client
Write-Host "Step 1: Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) { exit 1 }

# Build
Write-Host "Step 2: Building..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

# Prune
Write-Host "Step 3: Pruning dev deps..." -ForegroundColor Yellow
npm prune --production

# Create folder
Write-Host "Step 4: Creating package..." -ForegroundColor Yellow
$deployFolder = ".\clean-deployment-package"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder | Out-Null

# Copy files
Write-Host "Step 5: Copying files..." -ForegroundColor Yellow
Copy-Item -Path ".\dist" -Destination "$deployFolder\dist" -Recurse
Copy-Item -Path ".\prisma" -Destination "$deployFolder\prisma" -Recurse
Copy-Item -Path ".\package.json" -Destination "$deployFolder\package.json"
if (Test-Path ".\package-lock.json") {
    Copy-Item -Path ".\package-lock.json" -Destination "$deployFolder\package-lock.json"
}
Copy-Item -Path ".\.env.production" -Destination "$deployFolder\.env"

# Create ZIP
Write-Host "Step 6: Creating ZIP..." -ForegroundColor Yellow
$zipPath = ".\clean-deployment.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}
Compress-Archive -Path "$deployFolder\*" -DestinationPath $zipPath

# Restore dev dependencies for local work
Write-Host "Step 7: Restoring dev dependencies..." -ForegroundColor Yellow
npm install --silent

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "File: $zipPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "Upload to: /home/ontiqaqp/ontime-api/" -ForegroundColor White
Write-Host "Delete node_modules first!" -ForegroundColor Red
Write-Host "Then: Run NPM Install in cPanel" -ForegroundColor White
