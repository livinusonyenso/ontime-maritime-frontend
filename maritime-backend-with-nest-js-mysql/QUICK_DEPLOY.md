# Quick Deployment Guide - 5 Steps

## 🚀 Deploy in 5 Simple Steps

### Step 1: Run Deployment Script (Windows PowerShell)

```powershell
cd c:\Users\USER\OneDrive\Desktop\ONTIME-MARITIME\maritime-backend-with-nest-js-mysql
.\deploy-to-production.ps1
```

**Wait for it to finish.** You'll see a `deployment-package` folder created.

---

### Step 2: Create ZIP File

**Right-click** on `deployment-package` folder → **Send to** → **Compressed (zipped) folder**

Name it: `deployment.zip`

---

### Step 3: Upload to Namecheap

1. Login to **cPanel**
2. Open **File Manager**
3. Navigate to `/home/ontiqaqp/ontime-api/`
4. Click **Upload**
5. Upload `deployment.zip`
6. **Right-click** `deployment.zip` → **Extract**
7. **Delete** `deployment.zip` after extraction

---

### Step 4: Run Commands via SSH/Terminal

Connect via SSH or use cPanel **Terminal**:

```bash
cd /home/ontiqaqp/ontime-api

# Backup old package.json
cp package.json package.json.backup

# Use production package.json
cp deployment-package/package.json package.json

# Rename .env
cp deployment-package/.env.production .env

# Install dependencies (no build, no prisma generate)
npm install --production --legacy-peer-deps

# Verify Prisma Client
ls node_modules/.prisma/client
```

**You should see files listed!**

---

### Step 5: Restart Application

1. Go to cPanel → **Setup Node.js App**
2. Find your app: `ONTIMEMARITIME.COM/API`
3. Click **RESTART**
4. Check the status - should show **Running**

---

## ✅ Verify It's Working

Visit: https://ontimemaritime.com/api

You should see a response from your API!

---

## 🔥 If Something Goes Wrong

### Check Logs
- cPanel → **Setup Node.js App** → View error logs

### Common Fixes:

**"Cannot find module"**
```bash
cd /home/ontiqaqp/ontime-api
npm install --production --legacy-peer-deps
```

**"Prisma Client not initialized"**
```bash
# Re-upload deployment-package/node_modules/.prisma/ folder via File Manager
```

**"Connection refused"**
- Check `.env` file has correct `DATABASE_URL`
- Verify MySQL database exists

---

## 📝 For Next Time

Just repeat these 5 steps. That's it!

1. Run `deploy-to-production.ps1`
2. Zip the `deployment-package`
3. Upload and extract
4. Run `npm install --production --legacy-peer-deps`
5. Restart app

---

**You're done! 🎉**
