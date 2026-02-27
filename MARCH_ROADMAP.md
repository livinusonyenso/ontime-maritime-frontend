# OnTime Maritime — March 2026 Product & Engineering Roadmap
> **Effective Date:** March 1, 2026
> **Branch:** `production-phase-2`
> **Reviewed by:** Senior PM / Tech Lead
> **February Milestone Status:** ✅ Admin-Verified Live — Delivered

---

## Table of Contents
1. [February Exit Assessment](#1-february-exit-assessment)
2. [March Milestone Definition](#2-march-milestone-definition)
3. [Weekly March Execution Plan](#3-weekly-march-execution-plan)
4. [Payment & Monetization Plan](#4-payment--monetization-plan)
5. [Security Roadmap](#5-security-roadmap)
6. [Performance & Optimization](#6-performance--optimization)
7. [Engineering Prioritization](#7-engineering-prioritization)
8. [KPIs & Acceptance Criteria](#8-kpis--acceptance-criteria)

---

## 1. February Exit Assessment

### What Was Delivered ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Admin login + session management | ✅ Complete | JWT, role-based guards |
| Admin user management (tabbed by role) | ✅ Complete | Suspend, delete, role change |
| Admin KYC approve/reject (backend) | ✅ Complete | Writes to AuditLog |
| Admin listing approve/reject | ✅ Complete | Email notification on action |
| Seller verification guard | ✅ Complete | Unverified sellers blocked from creating listings |
| Email notifications (approve/reject) | ✅ Complete | nodemailer wired |
| Full audit log system | ✅ Complete | Module filter, date range, actor search, load more |
| Admin dashboard with live metrics | ✅ Complete | Auto-refresh every 60s |
| Public marketplace page | ✅ Complete | Real API, search, category, sort, pagination |
| Marketplace detail page | ✅ Complete | Auth-gated interactions, 404 for non-active |
| Password reset flow | ✅ Complete | Forgot → OTP → Reset (frontend + backend) |
| File upload infrastructure | ✅ Complete | Cloudinary via multer, PDF + images |
| Listing auto-archive cron (48h SLA) | ✅ Complete | Every 30 minutes |

### February Carry-Forwards (P0 for March Week 1)

| Item | Reason Not Completed | Risk |
|------|---------------------|------|
| **Termii SMS OTP** | `sendSms()` logs to console only — no provider wired | 🔴 Critical: users on non-email devices cannot register |
| **User-facing KYC submission form** | Backend ready (`POST /kyc`); frontend form missing | 🔴 Critical: sellers cannot submit KYC documents |
| **Admin KYC frontend wired** | Backend and `AdminKYCPage.tsx` exist; API calls not connected | 🔴 Critical: admin cannot process KYC queue |
| **Production deployment** | Namecheap deployment not executed | 🟠 High: milestone requires production URL |

### Inherited Technical Debt

| Item | Location | Severity |
|------|----------|----------|
| No API rate limiting | `main.ts` — no throttler | 🟠 High |
| No Swagger/OpenAPI docs | Not installed | 🟡 Medium |
| No Redis caching | Marketplace hits DB on every request | 🟡 Medium |
| No JWT refresh tokens | Sessions die on expiry, force re-login | 🟡 Medium |
| No field-level KYC encryption | `Kyc` table stores BVN/ID plain | 🟠 High |
| No GDPR/NDPR data deletion flow | Missing entirely | 🟡 Medium |
| SMS delivery is a no-op | `notifications.service.ts:61` | 🔴 Critical |
| No Paystack integration | `TransactionsModule` records exist; no gateway | 🔴 Critical |
| User-facing KYC form missing | Frontend gap | 🔴 Critical |

---

## 2. March Milestone Definition

### Milestone Name: **"Beta-Ready with Payments"**

### What Will Be Demonstrable by March 31

> OnTime Maritime handles real money. A verified seller lists cargo, an admin approves it, a buyer pays via Paystack, the transaction is recorded with commission split, and both parties receive confirmation. The platform is rate-limited, documented, and deployed with HTTPS on `ontimemaritime.com`.

Specifically:
- ✅ SMS OTP delivery works for Nigerian phone numbers (Termii)
- ✅ Seller completes KYC submission form with ID + face photo upload
- ✅ Admin reviews and processes KYC queue end-to-end
- ✅ Buyer initiates payment via Paystack for a marketplace listing
- ✅ Webhook confirms payment and marks transaction complete
- ✅ Commission (5%) is tracked and visible in admin dashboard
- ✅ API rate limiting active on all public endpoints
- ✅ Swagger UI live at `/api/docs`
- ✅ Platform deployed to `ontimemaritime.com` — zero manual intervention required

### Who Can Use It by March 31
- **Buyers**: Browse, save, and pay for listings
- **Sellers**: Complete KYC, create listings, receive approval/rejection emails
- **Admin**: Full KYC queue, listing queue, audit trail, financial overview
- **Not yet**: Real-time auction bidding (April), WebSocket features (April)

### March Definition of "Done"
- All Paystack payment flows tested with Paystack test keys
- Rate limiting verified — brute-force OTP attempt blocked after 5 requests/min
- Swagger UI accessible without authentication
- Zero `console.log` fallbacks in notification paths
- KYC form submits documents to Cloudinary, persists URLs in DB
- Admin KYC page loads pending KYC records from live API
- Production smoke test passes all critical paths
- No hardcoded credentials in source code

---

## 3. Weekly March Execution Plan

> **Total working days: ~22**
> **Theme order:** Carry-Forwards → Payments → Security → Quality → Scale

---

### WEEK 1 — Clear the Carry-Forwards (Mar 2–7)

*Goal: Eliminate every February item that blocks real users from using the platform.*

---

#### Day: Mar 2–3 — Termii SMS Integration
| | |
|---|---|
| **Goal** | Nigerian phone numbers receive OTP via SMS |
| **Backend Tasks** | 1. Install `axios` call to `https://api.ng.termii.com/api/sms/otp/send`. 2. Update `notifications/notifications.service.ts` `sendSms()` to call Termii API with `TERMII_API_KEY` from `.env`. 3. Add retry-once with logged error on failure. 4. Wire fallback: if SMS fails, attempt email OTP and log warning. |
| **Test** | 5. End-to-end: register with real Nigerian phone → receive SMS OTP → verify → account active. |
| **Files** | `src/modules/notifications/notifications.service.ts` (line 61 stub), `.env` |
| **Deliverable** | Real OTP via SMS — registration works on mobile devices |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 4 — User-Facing KYC Submission Form
| | |
|---|---|
| **Goal** | Verified seller can submit KYC documents from their dashboard |
| **Frontend Tasks** | 1. Create `frontend/src/pages/seller/KYCSubmissionPage.tsx` with fields: `id_type` (NIN/BVN/Passport), `id_number`, ID document upload, face photo upload. 2. Wire uploads to `POST /upload` (Cloudinary). 3. Submit form data to `POST /kyc`. 4. Show submission status on seller dashboard. |
| **Backend** | 5. Confirm `POST /kyc` DTO validates all fields and stores Cloudinary URLs. |
| **Files** | New: `KYCSubmissionPage.tsx`, update `App.tsx` route `/dashboard/seller/kyc` |
| **Deliverable** | Seller fills form, uploads ID + photo, submission lands in admin KYC queue |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 5 — Admin KYC Frontend Wired
| | |
|---|---|
| **Goal** | Admin reviews, views documents, approves or rejects KYC submissions |
| **Frontend Tasks** | 1. Wire `AdminKYCPage.tsx` to `getPendingKyc()` from admin-context. 2. Display Cloudinary image URLs (face photo + ID scan). 3. Add Approve button (calls `POST /admin/kyc/:id/approve`) and Reject button with comment input. 4. Optimistic UI update on action. 5. Show pending/approved/rejected tab counts from live data. |
| **Acceptance** | Admin sees real KYC queue, can approve/reject with audit trail written. |
| **Files** | `frontend/src/pages/executive-corner/AdminKYCPage.tsx`, `frontend/src/contexts/admin-context.tsx` |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 6–7 — Production Deployment
| | |
|---|---|
| **Goal** | `ontimemaritime.com` runs live with real data |
| **Tasks** | 1. Create `.env.production` — DB URL, JWT secret, Cloudinary keys, Termii key, mail SMTP. 2. Run `npx prisma migrate deploy` on production MySQL. 3. Run `npm run prisma:seed` for admin user. 4. Build frontend: `npm run build`, deploy static files to Namecheap. 5. Configure NGINX reverse proxy for backend on port 3001. 6. Enable HTTPS (Let's Encrypt). 7. Smoke test: register → OTP → login → create listing → admin approval → marketplace visibility. |
| **Deliverable** | Live URL, zero manual steps to restart or redeploy |
| **Status** | ⬜ Not Started |

---

### WEEK 2 — Payment & Monetization Foundation (Mar 9–14)

*Goal: The platform handles real money for the first time.*

---

#### Day: Mar 9–10 — Paystack Integration Backend
| | |
|---|---|
| **Goal** | Payment gateway connected end-to-end |
| **Backend Tasks** | 1. Install `paystack-node` or use direct Axios to Paystack API. 2. Create `src/modules/payments/` module with: `PaymentsService`, `PaymentsController`. 3. `POST /payments/initialize` — calls Paystack `initialize`, returns `authorization_url` + `reference`. 4. `POST /payments/verify/:reference` — verifies payment status, marks transaction. 5. `POST /payments/webhook` — Paystack webhook handler (validate signature with `PAYSTACK_SECRET_KEY`). 6. On webhook: update `Transaction.payment_reference`, set `payout_status: completed`. |
| **Schema** | 7. Update `Transaction` Prisma model: add `payment_gateway`, `gateway_reference`, `paid_at`. Run `prisma migrate dev`. |
| **Files** | New: `src/modules/payments/`, update `prisma/schema.prisma` |
| **Deliverable** | Payment can be initialized and verified; webhook updates transaction state |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 11 — Buyer Payment Flow (Frontend)
| | |
|---|---|
| **Goal** | Buyer clicks "Buy Now" → Paystack checkout → confirmation |
| **Frontend Tasks** | 1. Wire "Buy Now" button on `MarketplaceListingDetailPage.tsx` (authenticated users). 2. Call `POST /payments/initialize` → redirect buyer to `authorization_url`. 3. After Paystack redirect back: call `POST /payments/verify/:reference`. 4. Show success/failure page. 5. Update listing availability on successful purchase. |
| **Security** | Never trust frontend for payment verification — always verify via backend webhook. |
| **Files** | `frontend/src/pages/features/MarketplaceListingDetailPage.tsx` |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 12 — BOL Unlock Payment
| | |
|---|---|
| **Goal** | Buyer pays $20 to unlock Bill of Lading document |
| **Backend Tasks** | 1. `POST /payments/bol-unlock/:listingId` — initializes $20 Paystack payment. 2. On webhook: create `BolUnlock` record (buyer_id, listing_id, unlocked_at). 3. `GET /marketplace/listings/:id` — return `bol_image` only if `BolUnlock` record exists for requesting user. |
| **Frontend Tasks** | 4. Wire the existing BOL unlock UI in `ListingDetailModal` to real endpoint. 5. Replace simulation with real Paystack flow. |
| **Deliverable** | BOL monetization live — verifiable $20 unlock per listing |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 13–14 — Commission Tracking & Admin Financial View
| | |
|---|---|
| **Goal** | Admin sees financial health: revenue, commission earned, pending payouts |
| **Backend Tasks** | 1. `GET /admin/financials` — aggregate: total_revenue, total_commission (5%), pending_payouts, completed_transactions. 2. Add `commission_amount` auto-calculation on transaction create (already at 5% in TransactionsModule — verify and harden). |
| **Frontend Tasks** | 3. Add "Financials" card to `AdminPage.tsx` dashboard. 4. Create `AdminTransactionsPage.tsx` — list all transactions with status, buyer, seller, amount, commission, date. 5. Add route `/admin/transactions`. |
| **Deliverable** | Admin has financial oversight from day one of payment activation |
| **Status** | ⬜ Not Started |

---

### WEEK 3 — Security Hardening & Test Foundation (Mar 16–22)

*Goal: The platform resists abuse and has a testable baseline.*

---

#### Day: Mar 16 — API Rate Limiting
| | |
|---|---|
| **Goal** | Brute-force, credential stuffing, and OTP abuse are blocked |
| **Backend Tasks** | 1. Install `@nestjs/throttler`. 2. Add `ThrottlerModule.forRoot([{ ttl: 60, limit: 60 }])` to `AppModule` — 60 req/min global default. 3. Add `@Throttle({ default: { limit: 5, ttl: 60 } })` to: `POST /auth/login`, `POST /auth/forgot-password`, `POST /auth/verify-otp`. 4. Add `@Throttle({ default: { limit: 3, ttl: 60 } })` to: `POST /auth/reset-password`. 5. Return `429 Too Many Requests` with retry header. |
| **Files** | `src/app.module.ts`, `src/modules/auth/auth.controller.ts` |
| **Deliverable** | 5 failed logins/minute → 429; brute force OTP impossible |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 17 — JWT Refresh Tokens
| | |
|---|---|
| **Goal** | Users stay logged in across sessions without re-authenticating every hour |
| **Backend Tasks** | 1. Add `refresh_token` (hashed) and `refresh_token_expiry` to `User` schema. 2. `POST /auth/refresh` endpoint — validates refresh token, issues new access token (15 min) + new refresh token (7 days). 3. Store refresh token as `httpOnly` cookie (not localStorage). |
| **Frontend Tasks** | 4. Add axios interceptor: on 401 → attempt `POST /auth/refresh` → retry original request. If refresh fails → logout. |
| **Files** | `src/modules/auth/auth.service.ts`, `src/modules/auth/auth.controller.ts`, `frontend/src/lib/api.ts` |
| **Deliverable** | Users remain authenticated for 7 days; access tokens short-lived |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 18–19 — Backend Test Suite Foundation
| | |
|---|---|
| **Goal** | Critical paths are tested; regressions are caught before they reach production |
| **Backend Tasks** | 1. Set up Jest config for NestJS testing (`jest.config.js`). 2. Write integration tests for: `POST /auth/signup` + `verify-otp` flow, `POST /listings` (seller only), `GET /marketplace/listings` (public), `POST /admin/listings/:id/approve` (admin only). 3. Mock Prisma with `@prisma/client` jest mock. 4. Target: 40% coverage on `auth`, `listings`, `marketplace`, `admin` modules. |
| **Deliverable** | `npm test` passes — CI pipeline can run on every push |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 20 — Frontend Component Tests
| | |
|---|---|
| **Goal** | UI regressions caught; confidence in critical components |
| **Frontend Tasks** | 1. Set up Vitest + React Testing Library (Vite project). 2. Write tests for: `ProtectedRoute` (redirects unauthenticated), `CreateListingPage` (blocked for unverified seller), `MarketplacePage` (renders listing cards, search input filters). 3. Target: 30% coverage on key page components. |
| **Deliverable** | `npm test` passes in CI |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 21–22 — KYC Field-Level Encryption
| | |
|---|---|
| **Goal** | BVN and ID numbers are encrypted at rest — NDPR compliant for Nigerian fintech |
| **Backend Tasks** | 1. Create `src/common/crypto.util.ts` — AES-256-GCM encrypt/decrypt using `KYC_ENCRYPTION_KEY` from `.env`. 2. In `KycService.create()`: encrypt `bvn`, `id_number` before write. 3. In `KycService.findOne()`: decrypt on read. 4. Run migration to re-encrypt any existing plaintext records. 5. Never log decrypted values. |
| **Compliance Note** | This satisfies NDPR Article 24 (security of processing) and is required before launch to any financial institution. |
| **Files** | New: `src/common/crypto.util.ts`, update `src/modules/kyc/kyc.service.ts` |
| **Deliverable** | `SELECT * FROM Kyc` — BVN is ciphertext; plaintext only decrypted in service layer |
| **Status** | ⬜ Not Started |

---

### WEEK 4 — Performance, API Maturity & Growth Features (Mar 23–29)

*Goal: Platform is fast, documented, and has features that drive user acquisition.*

---

#### Day: Mar 23 — Swagger / OpenAPI Documentation
| | |
|---|---|
| **Goal** | All API endpoints are self-documenting; mobile/third-party integration is unblocked |
| **Backend Tasks** | 1. Install `@nestjs/swagger` + `swagger-ui-express`. 2. Initialize Swagger in `main.ts` at `/api/docs` (available without auth). 3. Add `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiBearerAuth` decorators to: auth, listings, marketplace, admin, kyc, payments controllers. 4. Add `@ApiProperty` to all DTOs. |
| **Files** | `src/main.ts`, all controller files |
| **Deliverable** | `https://ontimemaritime.com/api/docs` returns interactive Swagger UI |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 24–25 — Redis Caching (Marketplace Performance)
| | |
|---|---|
| **Goal** | Marketplace browse is fast under load; DB not hit on every public request |
| **Backend Tasks** | 1. Install `@nestjs/cache-manager` + `cache-manager-redis-store`. 2. Configure `CacheModule.registerAsync()` with Redis URL from `.env`. 3. Add `@CacheKey('marketplace')` + `@CacheTTL(60)` to `GET /marketplace/listings`. 4. Invalidate cache on listing approve/reject in `AdminService`. 5. Cache `GET /marketplace/listings/:id` with 30s TTL; invalidate on listing update. |
| **Infrastructure** | Add Redis to production server (Docker or managed Redis). |
| **Files** | `src/app.module.ts`, `src/modules/marketplace/marketplace.controller.ts` |
| **Deliverable** | Marketplace list endpoint: avg response < 80ms under 50 concurrent requests |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 26 — Two-Factor Authentication (TOTP)
| | |
|---|---|
| **Goal** | Admin and high-value seller accounts can enable TOTP 2FA |
| **Backend Tasks** | 1. Install `speakeasy` + `qrcode`. 2. `POST /auth/2fa/setup` — generates TOTP secret, returns QR code URL. 3. `POST /auth/2fa/verify` — validates TOTP code, marks `is_2fa_enabled: true` on User. 4. Modify login: if `is_2fa_enabled`, require second step before issuing JWT. |
| **Frontend Tasks** | 5. Add 2FA setup to seller + admin profile settings pages. 6. Add TOTP input step after login if 2FA enabled. |
| **Scope Note** | Optional for sellers in March; **required** for admin accounts at launch. |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 27–28 — GDPR/NDPR Data Deletion Flow
| | |
|---|---|
| **Goal** | Users can request account deletion; data is purged or anonymized |
| **Backend Tasks** | 1. `DELETE /users/me` — soft delete: anonymize email, name, phone; set `deleted_at`. 2. Hard delete associated `Kyc`, `OtpToken` records. 3. Anonymize `AuditLog` actor details for deleted users (replace email with `[deleted]`). 4. Admin endpoint `POST /admin/users/:id/purge` — permanent wipe for NDPR requests. |
| **Frontend Tasks** | 5. Add "Delete Account" button in user profile settings. 6. Confirmation dialog requiring typed consent. |
| **Files** | `src/modules/users/users.service.ts`, `src/modules/admin/admin.service.ts` |
| **Deliverable** | Account deletion works; data minimized within 24h |
| **Status** | ⬜ Not Started |

---

#### Day: Mar 29 — Seller Dashboard Listing Status View
| | |
|---|---|
| **Goal** | Seller sees listing lifecycle clearly: pending, active, rejected |
| **Frontend Tasks** | 1. Update `frontend/src/pages/seller/ListingsPage.tsx` — add status badges per listing (`pending` = amber, `active` = green, `rejected` = red). 2. Show rejection reason in a collapsible row for rejected listings. 3. Add "Resubmit" button on rejected listings (clears rejection, resets to pending). 4. Add listing count by status in tab header badges. |
| **Backend Tasks** | 5. Add `POST /listings/:id/resubmit` — resets `status: pending`, clears `rejection_reason`. |
| **Deliverable** | Seller has full visibility into listing lifecycle without contacting admin |
| **Status** | ⬜ Not Started |

---

### BUFFER — Stabilize & Retrospective (Mar 30–31)

| Task | Description |
|------|-------------|
| End-to-end smoke test | Full buyer + seller flow on production URL |
| Load test | Run `k6` or `Artillery` against marketplace endpoint — target 100 concurrent users |
| Credential audit | Rotate all secrets (JWT, Paystack, Termii, Cloudinary) |
| Monitoring setup | Sentry (error tracking) + Logtail or Datadog for backend logs |
| April planning | Scope WebSocket, auction bidding, and advanced fraud detection |

---

## 4. Payment & Monetization Plan

### Revenue Streams (March Foundation Only)

| Stream | Mechanism | March Target |
|--------|-----------|--------------|
| **Listing transaction fee** | 5% of sale value, auto-split on payment confirm | Foundation only — track in DB, no payout automation |
| **BOL unlock** | $20 per listing unlock via Paystack | Live by Mar 12 |
| **Premium listings** | Featured placement (flat fee) | Not in March scope |
| **Subscription** | Seller monthly plan | Not in March scope — defer to April |

### Paystack Integration Architecture

```
Buyer clicks "Buy Now"
    ↓
POST /payments/initialize
    → Paystack API: {amount, email, reference, callback_url}
    → Returns: authorization_url
    ↓
Browser redirects to Paystack checkout
    ↓
Paystack webhook → POST /payments/webhook
    → Validate PAYSTACK_SECRET_KEY HMAC-SHA512 signature
    → Update Transaction.payout_status = completed
    → Update Listing.availability = pending
    → Fire email: buyer confirmation + seller notification
    ↓
Buyer redirected to callback_url → /marketplace/:id?payment=success
    → POST /payments/verify/:reference (idempotent confirmation)
```

### Commission Model
- Platform takes **5% commission** — already tracked in `TransactionsModule`
- March: Record commission in DB only; no automated payout to sellers
- April: Paystack Transfer API for seller payouts after 7-day escrow period

### March Monetization KPIs
- Total payment volume processed (target: first ₦50,000)
- Commission earned (target: first ₦2,500)
- BOL unlocks sold (target: 5+)
- Payment success rate (target: >95%)

---

## 5. Security Roadmap

### Priority Matrix

| Item | Priority | Week | Effort |
|------|----------|------|--------|
| API rate limiting (auth endpoints) | 🔴 P0 | Week 3 | 2h |
| Paystack webhook signature validation | 🔴 P0 | Week 2 | 1h |
| JWT refresh tokens | 🟠 P1 | Week 3 | 1 day |
| KYC field-level encryption | 🟠 P1 | Week 3 | 1 day |
| 2FA (TOTP) for admin | 🟠 P1 | Week 4 | 2 days |
| GDPR/NDPR deletion flow | 🟡 P2 | Week 4 | 1 day |
| AIS GPS source validation | 🟡 P2 | April | — |
| Swagger endpoint auth enforcement | 🟡 P2 | Week 4 | 2h |
| Helmet.js HTTP security headers | 🟡 P2 | Week 3 | 1h |
| SQL injection review (raw queries) | 🟠 P1 | Week 3 | 2h |

### Non-Negotiable Security Actions

1. **Paystack webhook must validate signature** — never trust a webhook without HMAC-SHA512 verification against `PAYSTACK_SECRET_KEY`. A missing check allows fraudulent payment confirmations.

2. **Rate limit OTP endpoints** — without throttling, an attacker can brute-force a 6-digit OTP in 100,000 requests. With 5 req/min limit, it takes 33 hours — effectively blocked.

3. **Never log decrypted KYC data** — once field-level encryption is in place, ensure no `console.log` or `Logger.debug` outputs plaintext BVN or ID numbers.

4. **CORS production lock** — `main.ts` must whitelist only `https://ontimemaritime.com` and `https://www.ontimemaritime.com`. Remove `*` if present.

---

## 6. Performance & Optimization

### Current Bottlenecks

| Bottleneck | Location | Impact | Fix |
|------------|----------|--------|-----|
| No caching on marketplace | `marketplace.service.ts` `findPublic()` | Full DB scan per request | Redis TTL 60s |
| `SET SESSION sort_buffer_size` on every query | `listings.service.ts`, `marketplace.service.ts` | Extra DB round-trip | Persist connection config at pool level |
| N+1 potential on audit log actor resolution | `admin.service.ts getDashboardStats()` | Already fixed with bulk user query | Monitor |
| No DB connection pooling config | `PrismaService` | Default pool may be too small under load | Set `connection_limit` in DATABASE_URL |
| Frontend bundle size unknown | Vite | Unknown — could be large | Run `vite build --profile`, analyze with rollup-plugin-visualizer |

### March Performance Targets

| Metric | Current (estimated) | March Target |
|--------|--------------------|----|
| `GET /marketplace/listings` p95 latency | ~400ms | <80ms (cached) |
| Admin dashboard load | ~800ms | <300ms |
| Frontend initial load (FCP) | Unknown | <2.5s on 4G |
| API error rate | Unknown | <0.5% |

### Infrastructure Additions

| Item | When | Why |
|------|------|-----|
| Redis (managed or Docker) | Week 4 | Caching + rate limiter store |
| Sentry (error tracking) | Buffer week | First production errors will be invisible without it |
| NGINX gzip compression | Week 1 deployment | Reduces static asset transfer by ~60% |
| Prisma connection pool tuning | Week 3 | Prevent pool exhaustion under load |

---

## 7. Engineering Prioritization

### Build in March (Non-Negotiable)

| Priority | Item | Week | Dependency |
|----------|------|------|------------|
| 🔴 P0 | Termii SMS OTP | 1 | Termii API key in `.env` |
| 🔴 P0 | User KYC submission form | 1 | Cloudinary upload (already done) |
| 🔴 P0 | Admin KYC frontend wired | 1 | Backend KYC endpoints (done) |
| 🔴 P0 | Production deployment (Namecheap) | 1 | `.env.production` |
| 🔴 P0 | Paystack payment gateway | 2 | Paystack account + API keys |
| 🟠 P1 | BOL unlock payment | 2 | Paystack integration |
| 🟠 P1 | API rate limiting | 3 | `@nestjs/throttler` |
| 🟠 P1 | JWT refresh tokens | 3 | Schema migration |
| 🟠 P1 | KYC field-level encryption | 3 | `KYC_ENCRYPTION_KEY` in `.env` |
| 🟠 P1 | Backend test suite (40% coverage) | 3 | Jest config |
| 🟠 P1 | Swagger/OpenAPI | 4 | `@nestjs/swagger` |
| 🟠 P1 | Redis marketplace caching | 4 | Redis server |
| 🟡 P2 | 2FA (TOTP) | 4 | `speakeasy` |
| 🟡 P2 | GDPR/NDPR deletion flow | 4 | — |
| 🟡 P2 | Seller listing status UI + resubmit | 4 | — |
| 🟡 P2 | Admin transactions page | 2 | Paystack integration |

### Defer to April (Do Not Build in March)

| Item | Why Defer |
|------|-----------|
| WebSocket / real-time bidding | Requires Socket.io + Redis pub/sub infrastructure; distinct project |
| Paystack seller payout (Transfer API) | Needs compliance review; payouts via bank transfer require NUBAN validation |
| AIS GPS source validation | Requires third-party API contract (MarineTraffic/VesselFinder) |
| Multi-currency support | NGN-only is correct for Nigerian maritime launch |
| CSV/PDF export for admin | Low priority; screenshot acceptable during beta |
| Mobile app (React Native) | Out of scope; ensure API is mobile-friendly via Swagger first |
| Advanced fraud ML | Basic `FraudFlag` model sufficient; ML requires labeled data |
| Auction WebSocket bidding | Polling every 30s is acceptable for auction MVP |
| BOL blockchain timestamping | Requires Ethereum/Hyperledger research; April feasibility study |
| CDN (CloudFront) | Cloudinary handles image CDN; CloudFront adds S3 complexity for no March gain |

---

## 8. KPIs & Acceptance Criteria

### Platform Health KPIs (March 31 Checkpoint)

| KPI | Target | How to Measure |
|-----|--------|----------------|
| API uptime | ≥ 99.5% | UptimeRobot ping on `/health` endpoint |
| API p95 response time (marketplace) | < 80ms | Sentry Performance or k6 |
| Failed registration rate (OTP) | < 2% | Count `OtpToken` failures vs total |
| Payment success rate | > 95% | Paystack dashboard + webhook logs |
| Admin action audit coverage | 100% | Every `POST /admin/*` writes to AuditLog |
| KYC processing time (admin) | < 24h | `updated_at - created_at` on Kyc records |

### User-Facing Feature Acceptance Criteria

| Feature | Acceptance Criteria |
|---------|---------------------|
| SMS OTP | Nigerian number receives OTP within 30 seconds; 99% delivery rate |
| KYC form | Form submits, Cloudinary URLs stored in DB, admin sees submission within 60s |
| Paystack buy flow | Payment initializes, webhook fires, transaction marked complete, email sent to buyer + seller |
| BOL unlock | $20 payment unlocks `bol_image` for that buyer; refreshing still shows it |
| Rate limiting | 6th OTP attempt within 60s returns `429`; IP blocked for 60s |
| 2FA | TOTP app scan works; wrong code rejected; correct code grants access |
| Data deletion | Account deleted within 5 seconds; DB shows `email: [deleted@removed.com]`, KYC purged |

### Engineering Quality Metrics

| Metric | Target |
|--------|--------|
| Backend test coverage | ≥ 40% by March 31 |
| Frontend test coverage | ≥ 30% by March 31 |
| Open security vulnerabilities (npm audit) | 0 critical, < 3 high |
| TypeScript errors (strict mode) | 0 |
| API endpoints documented in Swagger | 100% |

---

## Quick Reference: New March Environment Variables

| Variable | Purpose | Provider |
|----------|---------|----------|
| `TERMII_API_KEY` | SMS OTP delivery | termii.com |
| `TERMII_SENDER_ID` | SMS sender name | termii.com |
| `PAYSTACK_SECRET_KEY` | Payment gateway | paystack.com |
| `PAYSTACK_PUBLIC_KEY` | Frontend init (non-secret) | paystack.com |
| `PAYSTACK_WEBHOOK_SECRET` | Webhook signature validation | paystack.com |
| `KYC_ENCRYPTION_KEY` | AES-256-GCM for BVN/ID | Generate: `openssl rand -hex 32` |
| `REDIS_URL` | Cache + rate limiter store | Redis server |
| `SENTRY_DSN` | Error tracking | sentry.io |
| `FRONTEND_URL` | Callback URL for Paystack | `https://ontimemaritime.com` |

---

## Quick Reference: New March Commands

```bash
# Backend
npm install @nestjs/throttler @nestjs/swagger swagger-ui-express
npm install @nestjs/cache-manager cache-manager cache-manager-redis-store
npm install speakeasy qrcode
npm install paystack-node

# Generate Paystack webhook secret (store in .env)
openssl rand -hex 32

# Generate KYC encryption key (store in .env)
openssl rand -hex 32

# Run backend tests
npm run test
npm run test:cov

# Frontend
npm install vitest @testing-library/react @testing-library/user-event
npm run test

# Load test (install k6 separately)
k6 run --vus 50 --duration 30s scripts/load-test-marketplace.js
```

---

## Implementation Completeness Score (Projected March 31)

| Feature | Feb Exit | March Target |
|---------|----------|-------------|
| Authentication | 100% | 100% (+ refresh tokens, 2FA) |
| User Management | 100% | 100% (+ deletion flow) |
| Listing Management | 95% | 100% (+ resubmit, seller status view) |
| KYC | 80% | 100% (+ frontend form, encryption) |
| Admin Dashboard | 95% | 100% (+ financials tab) |
| Marketplace | 100% | 100% |
| Payments | 10% | 75% (Paystack buy + BOL unlock; no payout) |
| Notifications | 60% | 85% (+ SMS, payment emails) |
| Security | 40% | 80% (+ rate limiting, 2FA, encryption, JWT refresh) |
| Testing | 0% | 40% |
| API Documentation | 0% | 100% (Swagger) |
| Performance | 40% | 75% (+ Redis caching) |
| Compliance (NDPR) | 20% | 70% (+ encryption, deletion) |
| **Overall** | **~85%** | **~92%** |

---

> **The single highest risk to the March milestone is payment integration complexity.**
> Paystack's webhook flow introduces asynchronous state that is easy to get wrong.
> Implement and test with Paystack test keys for the full first week before switching to live keys.
> **Never switch to live Paystack keys until webhook signature validation is confirmed working.**

---

*Last updated: February 27, 2026*
*Next review: March 15, 2026 (mid-month checkpoint)*
