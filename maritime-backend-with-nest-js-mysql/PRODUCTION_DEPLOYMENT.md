# OnTime Maritime Backend - Production Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (for caching)
- AWS S3 bucket (for file storage)

## Database Setup

### 1. Create PostgreSQL Database
\`\`\`bash
createdb ontime_maritime
\`\`\`

### 2. Run Migrations
\`\`\`bash
npm run prisma:migrate:deploy
\`\`\`

### 3. Verify Schema
\`\`\`bash
npm run prisma:generate
\`\`\`

## Environment Variables

Copy `.env.example` to `.env` and update all values:
- JWT_SECRET: Generate with `openssl rand -base64 32`
- Database credentials from PostgreSQL
- API keys from Termii, Paystack, MarineTraffic
- AWS credentials for S3

## Critical Security Checks

### Authentication
- ✅ OTP verification enabled for signup
- ✅ 30-minute session timeout implemented
- ✅ Login attempt rate limiting (5 failures/15 mins)
- ✅ Password complexity validation

### Data Protection
- ✅ All passwords hashed with bcrypt
- ✅ JWT tokens in HTTP-only cookies
- ✅ HTTPS/TLS enforced in production
- ✅ CORS configured for frontend domain only

### Compliance
- ✅ Fraud detection engine active
- ✅ Contraband keyword filtering
- ✅ Restricted region blocking
- ✅ KYC tier enforcement (< $50k, $50k+, $250k+)

### Audit & Logging
- ✅ All admin actions logged with IP
- ✅ Transaction audit trail stored 7 years
- ✅ Login attempt tracking
- ✅ Fraud flag scoring system

## Production Startup

### 1. Install Dependencies
\`\`\`bash
npm ci
\`\`\`

### 2. Build Project
\`\`\`bash
npm run build
\`\`\`

### 3. Run Database Migrations
\`\`\`bash
npm run prisma:migrate:deploy
\`\`\`

### 4. Start Server
\`\`\`bash
npm run start:prod
\`\`\`

## Health Checks

Monitor these endpoints:
- `GET /health` - Server status
- `GET /api/admin/stats` - Platform metrics
- `GET /api/audit-logs` - Recent activity

## Monitoring & Alerts

### Key Metrics to Monitor
1. Failed login attempts > 10/min
2. Fraud flags > 5/hour
3. Transaction failures > 5%
4. API error rate > 1%

### Log Aggregation
All logs sent to CloudWatch/ELK with:
- ERROR: System errors, failed transactions
- WARN: Suspicious activities, retries
- INFO: User actions, approvals
- DEBUG: Detailed flow information

## Backup Strategy

- Database: Daily snapshots, 7-year retention
- Files: Daily S3 snapshots
- Disaster Recovery: Monthly restoration tests
- RTO: 4-8 hours, RPO: ≤ 12 hours

## Known Limitations (MVP)

1. OTP via Termii requires SMS credits
2. MarineTraffic API calls cached to reduce costs
3. No load balancing (implement in Phase 2)
4. Manual arbitration escalation required
5. Insurance validation requires broker API setup

## Troubleshooting

### High API Costs
- Check MarineTraffic cache hit rate
- Reduce polling frequency if needed
- Monitor api_usage_logs table

### Slow Transaction Processing
- Check transaction queue depth
- Verify database indexes
- Monitor Paystack API latency

### Fraud False Positives
- Adjust fraud_severity thresholds
- Review CONTRABAND_KEYWORDS list
- Analyze flagged transactions

## Security Incident Response

1. **Compromised Account**: Revoke tokens, force password reset
2. **Fraudulent Transaction**: Reverse transaction, freeze account
3. **Data Breach**: Activate incident response, notify users
4. **API Abuse**: Block IP, implement rate limiting

## Contact & Support

- Email: support@ontimemaritime.com
- Emergency: +234-xxx-xxx-xxxx
- Status: status.ontimemaritime.com
