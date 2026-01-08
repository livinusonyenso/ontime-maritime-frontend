# OnTime Maritime - Namecheap Deployment Guide

## Problem
Namecheap shared hosting has memory limits (4GB) that prevent `prisma generate` from running on the server. We need to build locally and upload the pre-built files.

## Solution Overview
1. Build the application locally (Windows)
2. Generate Prisma Client locally
3. Upload pre-built files to Namecheap
4. Skip `prisma generate` on the server

---

## Step-by-Step Deployment

### Part 1: Build Locally (On Your Computer)

#### Option A: Using PowerShell Script (Recommended for Windows)

1. Open PowerShell in the project directory:
   ```powershell
   cd c:\Users\USER\OneDrive\Desktop\ONTIME-MARITIME\maritime-backend-with-nest-js-mysql
   ```

2. Run the deployment script:
   ```powershell
   .\deploy-to-production.ps1
   ```

3. Wait for the script to complete. It will create a `deployment-package` folder.

#### Option B: Using Bash Script (Git Bash/WSL)

1. Open Git Bash or WSL in the project directory
2. Make the script executable:
   ```bash
   chmod +x deploy-to-production.sh
   ```

3. Run the script:
   ```bash
   ./deploy-to-production.sh
   ```

#### Option C: Manual Build

If scripts don't work, build manually:

```powershell
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Build the application
npx nest build
```

---

### Part 2: Prepare Files for Upload

After building, you need to upload these folders/files to the server:

```
deployment-package/
├── dist/                          # Built JavaScript files
├── node_modules/
│   ├── .prisma/client/           # Pre-generated Prisma Client
│   └── @prisma/client/           # Prisma Client runtime
├── prisma/
│   └── schema.prisma             # Database schema
├── package.json                   # Production package.json (no build scripts)
└── .env.production               # Production environment variables
```

---

### Part 3: Upload to Namecheap via cPanel

#### Method 1: File Manager (For Small Files)

1. Log into cPanel
2. Go to **File Manager**
3. Navigate to `/home/ontiqaqp/ontime-api/`
4. **Delete old files** (backup first if needed):
   - Delete `dist/` folder
   - Delete `node_modules/.prisma/` folder
   - Delete `node_modules/@prisma/` folder

5. **Upload new files**:
   - Upload `deployment-package/dist/` → `/home/ontiqaqp/ontime-api/dist/`
   - Upload `deployment-package/node_modules/.prisma/` → `/home/ontiqaqp/ontime-api/node_modules/.prisma/`
   - Upload `deployment-package/node_modules/@prisma/` → `/home/ontiqaqp/ontime-api/node_modules/@prisma/`
   - Upload `deployment-package/prisma/schema.prisma` → `/home/ontiqaqp/ontime-api/prisma/schema.prisma`
   - Upload `deployment-package/package.json` → `/home/ontiqaqp/ontime-api/package.json` (REPLACE)
   - Upload `deployment-package/.env.production` → `/home/ontiqaqp/ontime-api/.env`

#### Method 2: FTP/SFTP (Recommended for Large Files)

1. Use FileZilla or WinSCP
2. Connect to your server:
   - **Host**: Your domain or IP
   - **Username**: ontiqaqp
   - **Password**: Your cPanel password
   - **Port**: 21 (FTP) or 22 (SFTP)

3. Navigate to `/home/ontiqaqp/ontime-api/`
4. Upload the folders as described above

#### Method 3: ZIP Upload

1. **On your computer**, create a ZIP file:
   ```powershell
   Compress-Archive -Path ".\deployment-package\*" -DestinationPath ".\deployment.zip"
   ```

2. Upload `deployment.zip` to `/home/ontiqaqp/ontime-api/` via cPanel File Manager

3. Extract it in cPanel:
   - Right-click `deployment.zip` → **Extract**

4. Move files to correct locations if needed

---

### Part 4: Configure on Server (SSH or cPanel Terminal)

#### Option A: Using SSH

```bash
# Connect via SSH
ssh ontiqaqp@yourdomain.com

# Navigate to project
cd /home/ontiqaqp/ontime-api

# Rename .env.production to .env
mv .env.production .env

# Install production dependencies (no devDependencies, no build)
npm install --production --legacy-peer-deps

# Verify Prisma Client exists
ls -la node_modules/.prisma/client/

# If successful, you should see files there
```

#### Option B: Using cPanel Terminal

1. Go to cPanel → **Terminal**
2. Run the same commands as above

---

### Part 5: Configure Environment Variables in cPanel

1. Go to cPanel → **Setup Node.js App**
2. Click on your application (`ONTIMEMARITIME.COM/API`)
3. Scroll to **Environment Variables**
4. Add these variables one by one:

| Variable Name | Value |
|--------------|-------|
| `DATABASE_URL` | `mysql://ontiqaqp_ontime_maritime:ontimeMaritime%40123@localhost:3306/ontiqaqp_ontime_maritime` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-in-production-use-a-long-random-string` |
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `FRONTEND_URL` | `https://ontimemaritime.com` |

5. Click **Save**

---

### Part 6: Restart the Application

1. In cPanel → **Setup Node.js App**
2. Click **STOP APP** (if running)
3. Wait 5 seconds
4. Click **START APP** or **RESTART**
5. Check the logs for any errors

---

## Troubleshooting

### Error: "Cannot find module '@nestjs/core'"

**Solution**: Run `npm install --production --legacy-peer-deps` on the server

### Error: "@prisma/client did not initialize"

**Solution**:
1. Verify `node_modules/.prisma/client/` exists on the server
2. Re-upload the `.prisma` folder from your local `deployment-package`

### Error: "Out of memory"

**Solution**: This should NOT happen anymore since we're not running `prisma generate` on the server. If it does, contact Namecheap support to increase LVE limits.

### Application Won't Start

**Solution**:
1. Check logs in cPanel Node.js App manager
2. Verify `.env` file exists with correct values
3. Verify `dist/main.js` exists
4. SSH into server and run: `node dist/main.js` to see errors

---

## Future Deployments

For future updates:

1. Make code changes locally
2. Run `.\deploy-to-production.ps1` again
3. Upload only the changed files:
   - Always upload `dist/` folder
   - Only upload `node_modules/.prisma/` if you changed `schema.prisma`
4. Restart the app in cPanel

---

## Alternative: GitHub Actions CI/CD (Advanced)

If you want automated deployments:

1. Push code to GitHub
2. Set up GitHub Actions to:
   - Build the project
   - Generate Prisma Client
   - Deploy via FTP to Namecheap

(This requires additional setup - let me know if you want this)

---

## Support

If you encounter issues:

1. Check cPanel error logs
2. Check server SSH access: `ssh ontiqaqp@yourdomain.com`
3. Verify file permissions: `chmod -R 755 /home/ontiqaqp/ontime-api`
4. Contact Namecheap support for LVE limit issues

---

## Summary Checklist

- [ ] Built application locally
- [ ] Generated Prisma Client locally
- [ ] Created deployment package
- [ ] Uploaded `dist/` folder
- [ ] Uploaded `node_modules/.prisma/` folder
- [ ] Uploaded `node_modules/@prisma/` folder
- [ ] Uploaded `package.json` (production version)
- [ ] Renamed `.env.production` to `.env`
- [ ] Set environment variables in cPanel
- [ ] Ran `npm install --production --legacy-peer-deps`
- [ ] Restarted application
- [ ] Verified application is running

---

**Your backend should now be running on Namecheap!**

Test it by visiting: `https://ontimemaritime.com/api`
