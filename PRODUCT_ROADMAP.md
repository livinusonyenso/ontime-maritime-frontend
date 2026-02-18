# OnTime Maritime — Product Roadmap & February Execution Plan
> **Assessment Date:** February 18, 2026
> **Branch:** `production-phase-1`
> **Reviewed by:** Senior PM (Maritime & Technical)

---

## Table of Contents
1. [High-Level Product Assessment](#1-high-level-product-assessment)
2. [February Milestone Definition](#2-february-milestone-definition)
3. [Daily February Task Breakdown](#3-daily-february-task-breakdown)
4. [Engineering & Product Prioritization](#4-engineering--product-prioritization)

---

## 1. High-Level Product Assessment

### Current Maturity: **Late MVP → Pre-Production**

You are past prototype. The core domain model is solid, the backend modules are architecturally correct, and the frontend has real structure. But the gap between "code exists" and "production-ready" is where most of the remaining risk lives.

---

### Key Strengths

**Domain modeling is exceptional for this stage.**
The Prisma schema covers 21 models — `ExecutiveCorner`, `ArbitrationCase`, `FraudFlag`, `AuditLog`, `TrackingLog` — these are not afterthoughts. Someone understood the maritime business before writing code. That is rare and valuable.

**Role-based architecture is correct.**
Buyer / Seller / Admin / Executive / Expert separation with JWT guards and route protection is properly implemented. Most teams get this wrong and bolt it on later.

**Audit trail exists from day one.**
`AuditLog` with `actor`, `action`, `module`, `ip_address`, `details` is a fundamental maritime compliance requirement. It is already in the schema. This saves weeks.

**Executive Corner (48-hour review) is genuinely maritime-aware.**
High-value listing review with `auto_release` on deadline expiry is a real operational workflow. This is not a generic feature — it reflects actual port/cargo trading practice.

---

### Critical Weaknesses & Blockers

| # | Weakness | Severity | Impact |
|---|----------|----------|--------|
| 1 | **Zero test coverage** | 🔴 Critical | Any deployment is a risk without tests |
| 2 | **Payment processing incomplete** | 🔴 Critical | Users cannot transact — core product loop is broken |
| 3 | **File uploads unimplemented** | 🔴 Critical | KYC docs, cargo certificates, BOL attachments cannot be submitted |
| 4 | **Email/SMS delivery not wired** | 🔴 Critical | OTP, KYC approval, bid notifications all silently fail |
| 5 | **No password reset flow** | 🟠 High | Users who forget passwords are permanently locked out |
| 6 | **CORS + port config unstable** | 🟠 High | Still being resolved — deployment is unreliable |
| 7 | **Demo fallback tokens in auth** | 🟠 High | Silent auth failures masked as success, corrupts session state |
| 8 | **No API rate limiting** | 🟠 High | Fraud and abuse exposure on all public endpoints |
| 9 | **Real-time features absent** | 🟡 Medium | Security hotline, bid updates, tracking need WebSocket |
| 10 | **No Swagger/OpenAPI docs** | 🟡 Medium | Blocks any third-party or mobile integration |

---

### Maritime-Specific Concerns

**Data Integrity**
- `TrackingLog` has no source validation — any client can POST arbitrary GPS coordinates for any vessel IMO. AIS data must be signed or sourced from a verified provider (MarineTraffic, ExactEarth, VesselFinder).
- `Document` QR hash is SHA256 of content, but there is no certificate authority or timestamp proof. For BOL legal validity, immutable timestamping is required.

**Audit Trail Gaps**
- `AuditLog` exists in the DB but is not consistently written across all modules. Admin actions write logs; listing creation, bid placement, and KYC submission paths do not consistently log.

**Operational Reliability**
- No retry logic on the notification service. A failed SMS for OTP means a user cannot register — no fallback, no retry queue, no alert.
- `ExecutiveCorner.checkAndAutoRelease()` appears to be manually triggered, not scheduled. Without a cron job, the 48-hour SLA is meaningless.

**Compliance**
- KYC stores BVN and ID documents but there is no encryption at rest beyond MySQL defaults. For Nigerian fintech/maritime regulations, PII must be encrypted at the field level.
- No GDPR/NDPR data deletion flow exists.

---

### Implementation Completeness Score

| Feature | Status | Completion |
|---------|--------|------------|
| Authentication | Complete | 100% |
| User Management | Complete | 100% |
| Listing Management | Complete | 95% |
| Auctions | Complete | 100% |
| Tracking | Complete | 100% |
| Documents | Complete | 100% |
| Executive Corner | Complete | 100% |
| Arbitration | Mostly Complete | 85% |
| Insurance | Complete | 90% |
| KYC | Complete | 100% |
| Admin Dashboard | Complete | 95% |
| Transactions | Complete | 90% |
| Notifications | Partial | 60% |
| Fraud Detection | Partial | 70% |
| Frontend UI | Mostly Complete | 85% |
| Backend API | Mostly Complete | 90% |
| **Overall** | **Production-Phase-1** | **~85%** |

---

## 2. February Milestone Definition

### Milestone Name: **"Admin-Verified Live"**

### What Will Be Demonstrable by Feb 28

> The OnTime Maritime platform can onboard a real user, verify their KYC, list cargo/ship for sale, have an admin review and approve it, and the listing appears live on the marketplace — with a complete, tamper-evident audit trail viewable by the admin.

Specifically:
- ✅ Admin logs in with database credentials
- ✅ Admin views all registered users by role (tabbed)
- ⬜ Admin approves/rejects KYC submissions
- ⬜ Admin views pending listings and approves/rejects
- ⬜ User registration → OTP verification → profile complete → KYC submitted
- ⬜ Listing created by seller → visible on marketplace after approval
- ⬜ All actions recorded in audit log visible to admin

### Who Can Use It
- **Internal**: Admin team, executive reviewers
- **Beta sellers**: Invited sellers who can submit listings
- **Not yet**: General public buyers transacting with payments

### Definition of "Done"
- All listed flows work end-to-end with real database data
- No demo/fallback tokens in any flow
- Errors surface to user clearly — no silent failures
- Admin dashboard shows real platform stats
- Backend restarts without data loss
- Deployable to Namecheap without manual intervention

---

## 3. Daily February Task Breakdown

> **Remaining days: Feb 18–28 (11 days)**
> Priority order: Stability → Auth completeness → Admin flows → Listing flow → Foundation for March

---

### WEEK 3 — Stabilize the Foundation (Feb 18–21)

---

#### Day: Feb 18 — CORS, Auth & Session Hardening
| | |
|---|---|
| **Goal** | Eliminate all auth-related instability causing logouts and session corruption |
| **Frontend Tasks** | ✅ 1. Remove demo fallback token from `auth-context.tsx` — fail loudly instead of silently. 2. Confirm `withCredentials: true` on axios works with production CORS config. 3. Fix API base URL across environments — create `.env.local` for dev, `.env.production` for prod. |
| **Backend Tasks** | 4. Confirm CORS `origin` list includes production domain. 5. Test full login → admin dashboard → user list flow end-to-end. |
| **Deliverable** | Admin can log in, view users, and remain logged in across page navigation without being redirected |
| **Status** | 🟡 In Progress |

---

#### Day: Feb 19 — Email/SMS OTP Delivery
| | |
|---|---|
| **Goal** | OTP registration actually delivers to user's phone/email |
| **Backend Tasks** | 1. Wire Termii API key (already in `.env`) to notification service — implement `sendSms()`. 2. Add SMTP config (Sendgrid or Gmail SMTP) for email OTP. 3. Add retry once on OTP send failure with a logged error. |
| **Test** | 4. Test registration → real OTP received → verified. |
| **Deliverable** | A new user can register with real phone number and receive OTP. No more silent failures. |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 20 — Password Reset Flow
| | |
|---|---|
| **Goal** | Users who forget passwords can recover without admin intervention |
| **Backend Tasks** | 1. Add `POST /auth/forgot-password` endpoint — sends OTP to email. 2. Add `POST /auth/reset-password` endpoint — validates OTP, accepts new password. 3. Write OTP to `OtpToken` table with `purpose: password_reset`. |
| **Frontend Tasks** | 4. Add "Forgot password?" link on login page with 2-step form. |
| **Deliverable** | Forgotten password recovered via email OTP in under 2 minutes |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 21 — File Upload Infrastructure
| | |
|---|---|
| **Goal** | KYC documents, listing photos, and BOL attachments can be uploaded |
| **Backend Tasks** | 1. Configure AWS S3 credentials (already in `.env` template). 2. Create `POST /upload` endpoint using `@nestjs/platform-express` multer + S3 SDK. 3. Return signed URL after upload. |
| **Frontend Tasks** | 4. Wire KYC form to upload face photo and ID document. 5. Wire listing form to upload cargo photos. |
| **Deliverable** | Files upload to S3. URLs stored in DB. Viewable by admin in dashboard. |
| **Status** | ⬜ Not Started |

---

### WEEK 4 — Admin & KYC Flows (Feb 22–25)

---

#### Day: Feb 22 — Admin KYC Management Frontend
| | |
|---|---|
| **Goal** | Admin can review, view documents, and approve/reject KYC submissions |
| **Frontend Tasks** | 1. Wire `AdminKYCPage.tsx` to `getPendingKyc()` from admin-context. 2. Show submitted documents (face photo, ID) from S3 URL. 3. Add Approve / Reject buttons with comment input. 4. On action — call backend, update list optimistically. 5. Show approved/rejected counts in tab badges. |
| **Backend Tasks** | 6. Confirm KYC approval/rejection writes to `AuditLog`. |
| **Deliverable** | Admin can process KYC queue with real submitted documents |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 23 — Listing Approval Workflow
| | |
|---|---|
| **Goal** | Admin can approve/reject listings; approved listings go live on marketplace |
| **Frontend Tasks** | 1. Wire admin pending listings tab (listings with `status: pending`). 2. Add approve/reject actions with reason input. |
| **Backend Tasks** | 3. Add NestJS `@Cron` job (every 30 min) to call `checkAndAutoRelease()` for 48-hour SLA. |
| **Data** | 4. Marketplace: only show listings with `status: active`. |
| **Deliverable** | Seller submits listing → admin approves → listing visible on marketplace |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 24 — Admin Dashboard Stats (Real Data)
| | |
|---|---|
| **Goal** | Admin home page shows real platform metrics, not placeholders |
| **Frontend Tasks** | 1. Wire `AdminPage.tsx` (index) to `getDashboardStats()`. 2. Display: total users, active listings, pending KYC count, pending listings, total transactions. 3. Add recent activity feed from `AuditLog` (last 10 entries). 4. Add auto-refresh every 60 seconds. |
| **Deliverable** | Admin opens dashboard and sees live platform health at a glance |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 25 — Audit Log Frontend
| | |
|---|---|
| **Goal** | Full audit trail visible and searchable by admin |
| **Frontend Tasks** | 1. Wire `AdminAuditLogsPage.tsx` to `getAuditLogs()`. 2. Add filter by module (users, listings, kyc, auctions). 3. Show: actor, action, timestamp, IP address, details. 4. Add pagination (load more). |
| **Backend Tasks** | 5. Ensure every admin action (approve KYC, suspend user, reject listing) writes to audit log. |
| **Deliverable** | Regulator-ready audit trail — every admin action is traceable |
| **Status** | ⬜ Not Started |

---

### WEEK 5 — Seller & Marketplace Flow (Feb 26–28)

---

#### Day: Feb 26 — Seller Listing Creation (End-to-End)
| | |
|---|---|
| **Goal** | Verified seller can create a listing with photos and it enters approval queue |
| **Frontend Tasks** | 1. Wire seller listing creation form to `POST /listings` with file uploads. 2. Set initial status to `pending`. 3. Show listing status on seller dashboard (`pending`, `active`, `rejected`). |
| **Backend Tasks** | 4. Send notification to seller on approval/rejection (email/SMS). |
| **Deliverable** | Seller creates listing → admin sees it in queue → approves → seller sees status change |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 27 — Marketplace Public Page
| | |
|---|---|
| **Goal** | Public marketplace shows real active listings with search |
| **Frontend Tasks** | 1. Wire `/marketplace` page to `GET /listings` (status: active only). 2. Add search by keyword. 3. Add filter by category (cargo, ship, spare_part, service). 4. Listing card shows: title, price, seller name, category, location. 5. Clicking listing opens detail page with photos and contact/buy action. |
| **Deliverable** | Public visitor can browse real listings without logging in |
| **Status** | ⬜ Not Started |

---

#### Day: Feb 28 — Hardening, Environment Config & Deployment
| | |
|---|---|
| **Goal** | Everything tested, environment variables locked, and deployed cleanly to Namecheap |
| **Tasks** | 1. Create `.env.production` with all secrets set (DB URL, JWT secret, S3 keys, Termii key). 2. Run `prisma migrate deploy` on production DB. 3. Run `prisma db seed` for admin user. 4. Build frontend (`npm run build`) and deploy to Namecheap. 5. Smoke test every critical path on production URL. 6. Write internal handover doc listing all credentials, URLs, and known limitations. |
| **Deliverable** | Platform running on `ontimemaritime.com` with real data, real users, real admin access |
| **Status** | ⬜ Not Started |

---

## 4. Engineering & Product Prioritization

### Build Now (Non-Negotiable for Feb Milestone)

| Priority | Item | Reason |
|----------|------|--------|
| 🔴 P0 | Remove demo auth fallback | Silent failures destroy trust in production |
| 🔴 P0 | OTP delivery (Termii + email) | Registration is broken without it |
| 🔴 P0 | File uploads (S3) | KYC is unusable without document upload |
| 🔴 P0 | Admin KYC frontend wired | Core admin workflow |
| 🔴 P0 | Listing approval in admin | Core product loop |
| 🟠 P1 | Password reset | Users will get locked out |
| 🟠 P1 | Real admin dashboard stats | Current page shows nothing real |
| 🟠 P1 | Marketplace shows real data | Platform feels empty otherwise |
| 🟠 P1 | Production env config + deploy | February milestone requires it |

---

### Defer to March (Do Not Build Now)

| Item | Why Defer |
|------|-----------|
| WebSocket / real-time bidding | Adds weeks of complexity; polling works for MVP |
| Payment processing (Paystack) | Cannot launch payments without KYC complete first |
| Advanced fraud detection algorithms | Basic flagging sufficient; ML/rules can wait |
| Security hotline chat | Requires WebSocket; out of scope for Feb |
| Two-factor authentication (2FA) | Password reset must come first |
| CSV/PDF export | Admin can screenshot for now |
| Multi-currency support | NGN-only is fine for Nigerian maritime market initially |
| API rate limiting | Add in March before public launch |
| Swagger/OpenAPI docs | Add when API stabilizes post-launch |
| Unit/integration tests | Write in March against a stable API — do not ship March without them |

---

### Acceptable MVP Shortcuts (With Justification)

| Shortcut | Justification |
|----------|---------------|
| **No unit tests for Feb** | Focus on end-to-end flow stability. Write tests in March. Do not ship March without them. |
| **Polling instead of WebSocket** | 30-second polls for bid updates and listing status are fine for beta users. Avoids infrastructure complexity. |
| **S3 direct upload (no CDN)** | CloudFront CDN can be added in March. Direct S3 serves the MVP. |
| **Single admin account seeded** | Invite-only admin team for Feb. Self-service admin registration is a March feature. |
| **No field-level KYC encryption** | Add in March with proper key management. MySQL encryption-at-rest is acceptable for internal beta. |
| **Manual cron for auto-release** | Add `@Cron` in NestJS for the 48-hour executive corner deadline. 30 minutes of work — do not defer this. |

---

## Quick Reference: Key Credentials & Config

| Item | Value | Notes |
|------|-------|-------|
| Admin Email | `admin@ontimemaritime.com` | Seeded via `npm run prisma:seed` |
| Admin Password | `admin123` | Change on first production login |
| Backend Port | `3001` (default) | Set via `PORT` in `.env` |
| Frontend Dev Port | `3000` | Vite default |
| DB Connection | See `.env` `DATABASE_URL` | MySQL on port 3306 |
| JWT Secret | See `.env` `JWT_SECRET` | Change in production |
| Termii API | See `.env` `TERMII_API_KEY` | For SMS OTP |
| S3 Bucket | See `.env` `AWS_S3_BUCKET` | For file uploads |

---

## Quick Reference: Useful Commands

```bash
# Backend
cd maritime-backend-with-nest-js-mysql
npm run start:dev              # Start dev server
npm run prisma:generate        # Generate Prisma client
npx prisma migrate deploy      # Apply migrations (production)
npx prisma migrate dev         # Create new migration (dev only)
npm run prisma:seed            # Seed admin user
npx prisma studio              # Open DB browser (port 5555)

# Frontend
cd frontend
npm run dev                    # Start dev server (port 3000)
npm run build                  # Build for production
```

---

## March Priorities (Post-Feb Milestone)

1. Payment processing (Paystack full integration)
2. WebSocket for real-time bid updates and security hotline
3. Rate limiting on all public API endpoints
4. Unit and integration test suite (target 70% coverage)
5. API documentation (Swagger/OpenAPI)
6. Field-level encryption for KYC PII data
7. CDN setup (CloudFront) for file serving
8. Password reset via email
9. Two-factor authentication
10. AIS data source validation for vessel tracking

---

> **The single highest risk to the February milestone is over-scoping.**
> Every day spent on a new feature is a day not spent stabilizing the flows that already exist.
> The **Admin-Verified Live** milestone is achievable — but only if the team resists scope creep for the remaining 10 days.

---

*Last updated: February 18, 2026*
