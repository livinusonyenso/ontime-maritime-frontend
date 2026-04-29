# OnTime Maritime Backend - API Endpoints Documentation

## Base URL
\`\`\`
Production: https://api.ontimemaritime.com
Staging: https://staging-api.ontimemaritime.com
Development: http://localhost:3001
\`\`\`

## Authentication Endpoints

### 1. Signup
\`\`\`
POST /auth/signup
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "phone": "+2341234567890",
  "password": "SecurePass123!",
  "role": "buyer" // or "seller", "expert"
}

Response:
{
  "message": "User created successfully. OTP sent to your phone.",
  "user_id": "uuid",
  "phone": "+2341234567890"
}
\`\`\`

### 2. Verify OTP
\`\`\`
POST /auth/verify-otp
Content-Type: application/json

Request Body:
{
  "userId": "uuid",
  "otp": "123456"
}

Response:
{
  "message": "Phone verified successfully",
  "user_id": "uuid",
  "email": "user@example.com"
}
\`\`\`

### 3. Login
\`\`\`
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "access_token": "jwt.token.here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+2341234567890",
    "role": "buyer",
    "subscription_status": "free"
  }
}
\`\`\`

### 4. Request Password Reset
\`\`\`
POST /auth/request-password-reset
Content-Type: application/json

Request Body:
{
  "email": "user@example.com"
}

Response:
{
  "message": "If email exists, reset link will be sent"
}
\`\`\`

### 5. Reset Password
\`\`\`
POST /auth/reset-password
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "userId": "uuid",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}

Response:
{
  "message": "Password reset successfully"
}
\`\`\`

---

## Listings Endpoints

### 1. Create Listing
\`\`\`
POST /listings
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "category": "cargo",
  "title": "100 Tons of Premium Cocoa",
  "description": "Fresh cocoa from Ghana...",
  "price_usd": 50000,
  "origin_port": "Lagos, Nigeria",
  "destination_port": "Rotterdam, Netherlands",
  "container_number": "MAEU123456789",
  "eta": "2024-12-15T10:00:00Z",
  "is_perishable": true,
  "is_dangerous": false,
  "photos": ["url1", "url2"],
  "certificates": ["cert_url"]
}

Response:
{
  "id": "uuid",
  "seller_id": "uuid",
  "title": "100 Tons of Premium Cocoa",
  "price_usd": 50000,
  "status": "active",
  "is_high_value": false,
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 2. Get Listings
\`\`\`
GET /listings?skip=0&take=20
Authorization: Bearer {token}

Response:
{
  "listings": [
    {
      "id": "uuid",
      "title": "...",
      "price_usd": 50000,
      "seller": { "id": "uuid", "email": "..." },
      ...
    }
  ],
  "total": 150
}
\`\`\`

### 3. Search Listings
\`\`\`
GET /listings/search?query=cocoa&skip=0&take=20
Authorization: Bearer {token}

Response: [listings matching "cocoa"]
\`\`\`

### 4. Get Listing Details
\`\`\`
GET /listings/{listingId}
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "title": "...",
  "seller": { ... },
  "transactions": [ ... ],
  ...
}
\`\`\`

---

## KYC Endpoints

### 1. Create/Submit KYC
\`\`\`
POST /kyc
Content-Type: multipart/form-data
Authorization: Bearer {token}

Request Body (form-data):
- bvn: "12345678901"
- id_type: "NIN"
- id_number: "12345678901"
- id_document: <file>
- face_photo: <file>

Response:
{
  "id": "uuid",
  "user_id": "uuid",
  "status": "pending",
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 2. Get My KYC
\`\`\`
GET /kyc/my-kyc
Authorization: Bearer {token}

Response:
{
  "id": "uuid",
  "status": "approved",
  "bvn": "12345678901",
  ...
}
\`\`\`

### 3. Admin: Get Pending KYC
\`\`\`
GET /kyc/pending
Authorization: Bearer {admin_token}

Response: [list of pending KYC records]
\`\`\`

### 4. Admin: Approve KYC
\`\`\`
PATCH /kyc/{kycId}/approve
Authorization: Bearer {admin_token}

Response:
{
  "id": "uuid",
  "status": "approved"
}
\`\`\`

### 5. Admin: Reject KYC
\`\`\`
PATCH /kyc/{kycId}/reject
Content-Type: application/json
Authorization: Bearer {admin_token}

Request Body:
{
  "comment": "Reason for rejection..."
}

Response:
{
  "id": "uuid",
  "status": "rejected",
  "admin_comment": "Reason for rejection..."
}
\`\`\`

---

## Transactions Endpoints

### 1. Create Transaction (Buy Now)
\`\`\`
POST /transactions
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "listing_id": "uuid",
  "amount": 50000,
  "transaction_type": "buy_now",
  "payment_reference": "paystack_ref_123"
}

Response:
{
  "id": "uuid",
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "amount": 50000,
  "commission_amount": 125,
  "payout_status": "pending",
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 2. Get My Transactions (as Buyer)
\`\`\`
GET /transactions/my-purchases?skip=0&take=20
Authorization: Bearer {token}

Response: [list of user's purchases]
\`\`\`

### 3. Get My Transactions (as Seller)
\`\`\`
GET /transactions/my-sales?skip=0&take=20
Authorization: Bearer {token}

Response: [list of user's sales]
\`\`\`

---

## Auctions Endpoints

### 1. Create Auction
\`\`\`
POST /auctions
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "listing_id": "uuid",
  "starting_price": 10000,
  "reserve_price": 8000,
  "start_time": "2024-11-22T12:00:00Z",
  "end_time": "2024-11-23T12:00:00Z"
}

Response:
{
  "id": "uuid",
  "listing_id": "uuid",
  "current_price": 10000,
  "status": "active"
}
\`\`\`

### 2. Place Bid
\`\`\`
POST /auctions/{auctionId}/bid
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "amount": 12000
}

Response:
{
  "id": "uuid",
  "auction_id": "uuid",
  "bidder_id": "uuid",
  "amount": 12000,
  "created_at": "2024-11-22T10:30:00Z"
}
\`\`\`

### 3. Get Active Auctions
\`\`\`
GET /auctions/active?skip=0&take=20
Authorization: Bearer {token}

Response: [list of active auctions]
\`\`\`

### 4. Get Bid History
\`\`\`
GET /auctions/{auctionId}/bids
Authorization: Bearer {token}

Response: [list of all bids for auction]
\`\`\`

---

## Executive Corner Endpoints

### 1. Get Pending Reviews
\`\`\`
GET /executive-corner/pending
Authorization: Bearer {executive_token}

Response:
{
  "items": [
    {
      "id": "uuid",
      "listing": { ... },
      "deadline_at": "2024-11-24T10:00:00Z",
      "status": "pending"
    }
  ]
}
\`\`\`

### 2. Approve Listing
\`\`\`
POST /executive-corner/{id}/approve
Content-Type: application/json
Authorization: Bearer {executive_token}

Request Body:
{
  "comment": "Approved for marketplace"
}

Response:
{
  "id": "uuid",
  "status": "approved",
  "decided_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 3. Reject Listing
\`\`\`
POST /executive-corner/{id}/reject
Content-Type: application/json
Authorization: Bearer {executive_token}

Request Body:
{
  "comment": "Reason for rejection..."
}

Response:
{
  "id": "uuid",
  "status": "rejected",
  "decided_at": "2024-11-22T10:00:00Z"
}
\`\`\`

---

## Documents Endpoints

### 1. Generate Document
\`\`\`
POST /documents/generate
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "type": "invoice",
  "listing_id": "uuid",
  "transaction_id": "uuid"
}

Response:
{
  "id": "uuid",
  "type": "invoice",
  "file_url": "https://...",
  "qr_hash": "hash_value",
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 2. Verify Document
\`\`\`
GET /documents/verify/{documentId}

Response:
{
  "valid": true,
  "document": { ... },
  "verified_at": "2024-11-22T10:00:00Z"
}
\`\`\`

---

## Arbitration Endpoints

### 1. Create Arbitration Case
\`\`\`
POST /arbitration
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "transaction_id": "uuid",
  "complainant_id": "uuid",
  "defendant_id": "uuid",
  "issue_summary": "Cargo not delivered as described...",
  "evidence_urls": ["url1", "url2"]
}

Response:
{
  "id": "uuid",
  "status": "open",
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 2. Get Case Details
\`\`\`
GET /arbitration/case/{caseId}
Authorization: Bearer {token}

Response: [case details]
\`\`\`

### 3. Resolve Case
\`\`\`
PATCH /arbitration/{caseId}/resolve
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "resolution": "Refund granted to buyer..."
}

Response:
{
  "id": "uuid",
  "status": "resolved",
  "resolution": "..."
}
\`\`\`

---

## Ratings Endpoints

### 1. Submit Rating
\`\`\`
POST /ratings
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "transaction_id": "uuid",
  "user_id": "uuid",
  "rater_id": "uuid",
  "score": 5,
  "comment": "Excellent service!"
}

Response:
{
  "id": "uuid",
  "score": 5,
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

### 2. Get User Ratings
\`\`\`
GET /ratings/user/{userId}

Response:
{
  "ratings": [ ... ],
  "average": 4.8,
  "count": 25
}
\`\`\`

---

## Insurance Endpoints

### 1. Get Providers
\`\`\`
GET /insurance/providers
Authorization: Bearer {token}

Response: [list of verified insurance providers]
\`\`\`

### 2. Create Policy
\`\`\`
POST /insurance/policy
Content-Type: application/json
Authorization: Bearer {token}

Request Body:
{
  "buyer_id": "uuid",
  "listing_id": "uuid",
  "provider_id": "uuid",
  "policy_number": "POL123456",
  "policy_pdf_url": "url"
}

Response:
{
  "id": "uuid",
  "status": "active",
  "created_at": "2024-11-22T10:00:00Z"
}
\`\`\`

---

## Admin Endpoints

### 1. Get All Users
\`\`\`
GET /admin/users?skip=0&take=20
Authorization: Bearer {admin_token}

Response: [list of users]
\`\`\`

### 2. Get User Statistics
\`\`\`
GET /admin/users/stats
Authorization: Bearer {admin_token}

Response:
{
  "totalUsers": 1500,
  "buyers": 1000,
  "sellers": 500
}
\`\`\`

### 3. Get All Transactions
\`\`\`
GET /admin/transactions?skip=0&take=20
Authorization: Bearer {admin_token}

Response: [list of transactions]
\`\`\`

### 4. Get Transaction Statistics
\`\`\`
GET /admin/transactions/stats
Authorization: Bearer {admin_token}

Response:
{
  "totalTransactions": 5000,
  "totalCommission": 12500,
  "totalVolume": 5000000
}
\`\`\`

### 5. Get Audit Logs
\`\`\`
GET /admin/audit-logs?skip=0&take=20
Authorization: Bearer {admin_token}

Response: [audit log entries]
\`\`\`

### 6. Get Fraud Flags
\`\`\`
GET /admin/fraud/flags?skip=0&take=20
Authorization: Bearer {admin_token}

Response: [fraud flag records]
\`\`\`

### 7. Dashboard Statistics
\`\`\`
GET /admin/stats/dashboard
Authorization: Bearer {admin_token}

Response:
{
  "users": { ... },
  "transactions": { ... },
  "timestamp": "2024-11-22T10:00:00Z"
}
\`\`\`

---

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "statusCode": 400,
  "message": "Validation failed",
  "timestamp": "2024-11-22T10:00:00Z",
  "path": "/listings"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "statusCode": 401,
  "message": "Invalid or expired token",
  "timestamp": "2024-11-22T10:00:00Z"
}
\`\`\`

### 403 Forbidden
\`\`\`json
{
  "statusCode": 403,
  "message": "Insufficient permissions",
  "timestamp": "2024-11-22T10:00:00Z"
}
\`\`\`

### 429 Too Many Requests
\`\`\`json
{
  "statusCode": 429,
  "message": "Too many requests",
  "timestamp": "2024-11-22T10:00:00Z"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "statusCode": 500,
  "message": "Internal server error",
  "timestamp": "2024-11-22T10:00:00Z"
}
\`\`\`

---

## Rate Limits

- **Default**: 100 requests per 15 minutes per IP
- **Auth**: 5 failed login attempts per 15 minutes
- **OTP**: 3 attempts per 10 minutes
- **Payment**: 10 transactions per hour per user

---

## Authentication

All endpoints except signup, login, and public endpoints require JWT token in Authorization header:

\`\`\`
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

Token expires in 24 hours.

---

## Pagination

Endpoints support pagination with query parameters:
- `skip`: Number of records to skip (default: 0)
- `take`: Number of records to take (default: 20, max: 100)

\`\`\`
GET /listings?skip=0&take=50
