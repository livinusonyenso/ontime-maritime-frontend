# OnTime Maritime API Documentation

**Production URL:** `https://ontimemaritime.com/api`

---

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Listings](#listings)
- [KYC](#kyc)
- [Transactions](#transactions)
- [Auctions](#auctions)
- [Documents](#documents)
- [Tracking](#tracking)
- [Notifications](#notifications)
- [Ratings](#ratings)
- [Arbitration](#arbitration)
- [Insurance](#insurance)
- [Executive Corner](#executive-corner)
- [Admin](#admin)

---

## Authentication

### 1. Signup
**POST** `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+2348012345678",
  "password": "SecurePass123!",
  "role": "buyer"
}
```

**Valid Roles:** `buyer`, `seller`, `admin`, `executive`, `expert`

**Password Requirements:**
- Minimum 8 characters
- Must contain uppercase letter
- Must contain number
- Must contain special character (!@#$%^&*)

**Response:**
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "message": "OTP sent to your email"
}
```

---

### 2. Verify OTP
**POST** `/api/auth/verify-otp`

Verify OTP after signup.

**Request Body:**
```json
{
  "userId": "uuid-from-signup",
  "otp": "123456"
}
```

**Response:**
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "buyer"
  }
}
```

---

### 3. Login
**POST** `/api/auth/login`

Login to existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "buyer"
  }
}
```

---

## Users

### 1. Get User Profile
**GET** `/api/users/profile`

Get current user's profile.

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "phone": "+2348012345678",
  "role": "buyer",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Get All Users
**GET** `/api/users`

Get all users (public endpoint).

**Response:**
```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "buyer",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## Listings

### 1. Create Listing
**POST** `/api/listings`

Create a new listing (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "category": "cargo",
  "title": "Fresh Bananas Export",
  "description": "Premium quality bananas from Nigeria, ready for export. Grade A quality with all necessary certifications.",
  "price_usd": 5000,
  "origin_port": "Lagos Port",
  "destination_port": "Rotterdam Port",
  "container_number": "HLCU1234567",
  "eta": "2024-12-31T00:00:00.000Z",
  "photos": ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
  "certificates": ["https://example.com/cert1.pdf"],
  "is_perishable": true,
  "is_dangerous": false
}
```

**Valid Categories:** `cargo`, `ship`, `spare_part`, `service`

**Response:**
```json
{
  "id": "uuid",
  "category": "cargo",
  "title": "Fresh Bananas Export",
  "price_usd": 5000,
  "status": "pending",
  "seller_id": "uuid",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Get All Listings
**GET** `/api/listings?skip=0&take=20`

Get all active listings with pagination.

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `take` (optional): Number of records to return (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "category": "cargo",
      "title": "Fresh Bananas Export",
      "price_usd": 5000,
      "status": "active",
      "seller_id": "uuid"
    }
  ],
  "total": 100,
  "skip": 0,
  "take": 20
}
```

---

### 3. Search Listings
**GET** `/api/listings/search?q=bananas&skip=0&take=20`

Search listings by keyword.

**Query Parameters:**
- `q` (required): Search query
- `skip` (optional): Number of records to skip (default: 0)
- `take` (optional): Number of records to return (default: 20)

---

### 4. Get Listings by Category
**GET** `/api/listings/category/{category}?skip=0&take=20`

Get listings filtered by category.

**URL Parameters:**
- `category`: One of `cargo`, `ship`, `spare_part`, `service`

---

### 5. Get Listing by ID
**GET** `/api/listings/{id}`

Get a specific listing by ID.

**Response:**
```json
{
  "id": "uuid",
  "category": "cargo",
  "title": "Fresh Bananas Export",
  "description": "Premium quality bananas...",
  "price_usd": 5000,
  "origin_port": "Lagos Port",
  "destination_port": "Rotterdam Port",
  "container_number": "HLCU1234567",
  "eta": "2024-12-31T00:00:00.000Z",
  "photos": ["https://example.com/photo1.jpg"],
  "certificates": ["https://example.com/cert1.pdf"],
  "is_perishable": true,
  "is_dangerous": false,
  "status": "active",
  "seller": {
    "id": "uuid",
    "email": "seller@example.com"
  },
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

### 6. Update Listing
**PATCH** `/api/listings/{id}`

Update a listing (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "price_usd": 6000,
  "description": "Updated description"
}
```

---

### 7. Delete Listing
**DELETE** `/api/listings/{id}`

Delete a listing (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Response:**
```json
{
  "message": "Listing deleted successfully"
}
```

---

## KYC

### 1. Submit KYC
**POST** `/api/kyc`

Submit KYC information (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "bvn": "12345678901",
  "id_type": "NIN",
  "id_number": "12345678901",
  "id_document_url": "https://example.com/id.jpg",
  "face_photo_url": "https://example.com/face.jpg"
}
```

**Valid ID Types:** `NIN`, `passport`, `voter_card`, `drivers_license`

---

### 2. Get My KYC
**GET** `/api/kyc/my-kyc`

Get current user's KYC status (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Response:**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "status": "pending",
  "bvn": "12345678901",
  "id_type": "NIN",
  "submitted_at": "2024-01-01T00:00:00.000Z"
}
```

---

### 3. Update KYC
**PATCH** `/api/kyc/{id}`

Update KYC information (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:** (All fields optional)
```json
{
  "id_number": "98765432109",
  "id_document_url": "https://example.com/new-id.jpg"
}
```

---

### 4. Get Pending KYC (Admin Only)
**GET** `/api/kyc/pending`

Get all pending KYC submissions (admin only).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 5. Approve KYC (Admin Only)
**PATCH** `/api/kyc/{id}/approve`

Approve a KYC submission (admin only).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 6. Reject KYC (Admin Only)
**PATCH** `/api/kyc/{id}/reject`

Reject a KYC submission (admin only).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "comment": "Reason for rejection"
}
```

---

## Transactions

### 1. Create Transaction
**POST** `/api/transactions`

Create a new transaction (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "listing_id": "uuid",
  "amount": 5000,
  "transaction_type": "buy_now",
  "payment_reference": "PAY123456"
}
```

**Valid Transaction Types:** `buy_now`, `auction`

---

### 2. Get All Transactions
**GET** `/api/transactions?skip=0&take=20`

Get all transactions (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 3. Get My Purchases
**GET** `/api/transactions/my-purchases?skip=0&take=20`

Get current user's purchases (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 4. Get My Sales
**GET** `/api/transactions/my-sales?skip=0&take=20`

Get current user's sales (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 5. Get Transaction by ID
**GET** `/api/transactions/{id}`

Get a specific transaction.

**Response:**
```json
{
  "id": "uuid",
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "listing_id": "uuid",
  "amount": 5000,
  "transaction_type": "buy_now",
  "payment_reference": "PAY123456",
  "status": "completed",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

---

## Auctions

### 1. Create Auction
**POST** `/api/auctions`

Create a new auction (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "listing_id": "uuid",
  "starting_price": 5000,
  "reserve_price": 8000,
  "start_time": "2024-01-01T00:00:00.000Z",
  "end_time": "2024-01-07T00:00:00.000Z"
}
```

---

### 2. Get Active Auctions
**GET** `/api/auctions?skip=0&take=20`

Get all active auctions.

---

### 3. Get Auction by ID
**GET** `/api/auctions/{id}`

Get a specific auction.

**Response:**
```json
{
  "id": "uuid",
  "listing_id": "uuid",
  "starting_price": 5000,
  "reserve_price": 8000,
  "current_highest_bid": 6500,
  "start_time": "2024-01-01T00:00:00.000Z",
  "end_time": "2024-01-07T00:00:00.000Z",
  "status": "active"
}
```

---

### 4. Get Bid History
**GET** `/api/auctions/{id}/bids`

Get bid history for an auction.

**Response:**
```json
[
  {
    "id": "uuid",
    "auction_id": "uuid",
    "bidder_id": "uuid",
    "amount": 6500,
    "created_at": "2024-01-02T00:00:00.000Z"
  }
]
```

---

### 5. Place Bid
**POST** `/api/auctions/{id}/bid`

Place a bid on an auction (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "amount": 7000
}
```

---

### 6. End Auction
**POST** `/api/auctions/{id}/end`

End an auction (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

## Documents

### 1. Create Document
**POST** `/api/documents`

Upload a document (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "type": "invoice",
  "file_url": "https://example.com/document.pdf",
  "listing_id": "uuid",
  "transaction_id": "uuid"
}
```

**Valid Document Types:** `invoice`, `bill_of_lading`, `packing_list`, `delivery_order`, `charterparty`, `survey_report`, `insurance_certificate`

---

### 2. Get Document by ID
**GET** `/api/documents/{id}`

Get a specific document.

---

### 3. Get Documents by Listing
**GET** `/api/documents/listing/{listingId}`

Get all documents for a listing.

---

### 4. Get Documents by Transaction
**GET** `/api/documents/transaction/{transactionId}`

Get all documents for a transaction.

---

### 5. Verify Document
**GET** `/api/documents/{id}/verify`

Verify a document's authenticity.

**Response:**
```json
{
  "verified": true,
  "document_id": "uuid",
  "blockchain_hash": "0x123..."
}
```

---

### 6. Revoke Document
**POST** `/api/documents/{id}/revoke`

Revoke a document (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 7. Generate Bill of Lading
**POST** `/api/documents/generate/bill-of-lading`

Generate a Bill of Lading (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "transactionId": "uuid"
}
```

---

### 8. Generate Invoice
**POST** `/api/documents/generate/invoice`

Generate an invoice (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "transactionId": "uuid"
}
```

---

### 9. Generate Packing List
**POST** `/api/documents/generate/packing-list`

Generate a packing list (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "transactionId": "uuid"
}
```

---

## Tracking

### 1. Create Tracking Log
**POST** `/api/tracking`

Create a tracking log entry (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "container_number": "HLCU1234567",
  "vessel_imo": "IMO1234567",
  "lat": 6.5244,
  "lng": 3.3792,
  "speed": 15.5,
  "heading": "NE",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 2. Track by Container
**GET** `/api/tracking/container/{containerNumber}?limit=100`

Get tracking history for a container.

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 100)

---

### 3. Track by Vessel
**GET** `/api/tracking/vessel/{vesselImo}?limit=100`

Get tracking history for a vessel.

---

### 4. Get Latest Container Position
**GET** `/api/tracking/latest/container/{containerNumber}`

Get the latest position of a container.

**Response:**
```json
{
  "container_number": "HLCU1234567",
  "vessel_imo": "IMO1234567",
  "lat": 6.5244,
  "lng": 3.3792,
  "speed": 15.5,
  "heading": "NE",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### 5. Get Latest Vessel Position
**GET** `/api/tracking/latest/vessel/{vesselImo}`

Get the latest position of a vessel.

---

### 6. Get Movement History
**GET** `/api/tracking/history/{containerNumber}?startDate=2024-01-01&endDate=2024-01-31`

Get movement history for a container within a date range.

**Query Parameters:**
- `startDate` (required): Start date (ISO 8601 format)
- `endDate` (required): End date (ISO 8601 format)

---

## Notifications

### 1. Create Notification
**POST** `/api/notifications`

Create a notification (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "user_id": "uuid",
  "type": "email",
  "title": "New Order",
  "body": "You have a new order from..."
}
```

**Valid Types:** `sms`, `email`, `push`

---

### 2. Get My Notifications
**GET** `/api/notifications/my-notifications?skip=0&take=20`

Get current user's notifications (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 3. Get Notification by ID
**GET** `/api/notifications/{id}`

Get a specific notification.

---

### 4. Mark as Sent
**POST** `/api/notifications/{id}/sent`

Mark a notification as sent.

---

### 5. Mark as Failed
**POST** `/api/notifications/{id}/failed`

Mark a notification as failed.

---

## Ratings

### 1. Create Rating
**POST** `/api/ratings`

Create a rating (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "transaction_id": "uuid",
  "user_id": "uuid",
  "rater_id": "uuid",
  "score": 5,
  "comment": "Excellent seller, highly recommended!"
}
```

**Score Range:** 1-5

---

### 2. Get User Ratings
**GET** `/api/ratings/user/{userId}`

Get all ratings for a user.

**Response:**
```json
{
  "ratings": [
    {
      "id": "uuid",
      "score": 5,
      "comment": "Excellent seller!",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "average": 4.8,
  "count": 42
}
```

---

## Arbitration

### 1. Create Arbitration Case
**POST** `/api/arbitration`

Create an arbitration case (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "transaction_id": "uuid",
  "complainant_id": "uuid",
  "defendant_id": "uuid",
  "issue_summary": "The goods delivered were not as described in the listing. Expected Grade A bananas but received Grade B.",
  "evidence_urls": ["https://example.com/evidence1.jpg", "https://example.com/evidence2.jpg"]
}
```

---

### 2. Get Case by ID
**GET** `/api/arbitration/case/{id}`

Get a specific arbitration case.

---

### 3. Get Case by Transaction
**GET** `/api/arbitration/transaction/{transactionId}`

Get arbitration case for a transaction.

---

### 4. Resolve Case
**PATCH** `/api/arbitration/{id}/resolve`

Resolve an arbitration case (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "resolution": "Refund issued to buyer. Seller warned."
}
```

---

### 5. Escalate Case
**PATCH** `/api/arbitration/{id}/escalate`

Escalate an arbitration case (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 6. Get Pending Cases
**GET** `/api/arbitration/pending`

Get all pending arbitration cases (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

## Insurance

### 1. Get Providers
**GET** `/api/insurance/providers`

Get all insurance providers.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Maritime Insurance Co.",
    "contact": "insurance@example.com"
  }
]
```

---

### 2. Create Policy
**POST** `/api/insurance/policy`

Create an insurance policy (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "buyer_id": "uuid",
  "listing_id": "uuid",
  "provider_id": "uuid",
  "policy_number": "POL123456",
  "policy_pdf_url": "https://example.com/policy.pdf"
}
```

---

### 3. Get Policies by Buyer
**GET** `/api/insurance/policies/{buyerId}`

Get all policies for a buyer.

---

### 4. Validate Policy
**GET** `/api/insurance/validate/{policyId}`

Validate an insurance policy.

**Response:**
```json
{
  "valid": true
}
```

---

## Executive Corner

### 1. Get Pending Items
**GET** `/api/executive-corner`

Get pending items for executive review (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 2. Get All Items
**GET** `/api/executive-corner/all`

Get all executive corner items (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 3. Get Item by ID
**GET** `/api/executive-corner/{id}`

Get a specific executive corner item.

---

### 4. Approve Item
**POST** `/api/executive-corner/{id}/approve`

Approve an executive corner item (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "comment": "Approved after thorough review"
}
```

---

### 5. Reject Item
**POST** `/api/executive-corner/{id}/reject`

Reject an executive corner item (requires authentication).

**Headers:**
```
Authorization: Bearer {jwt-token}
```

**Request Body:**
```json
{
  "comment": "Rejected due to insufficient documentation"
}
```

---

### 6. Check Auto Release
**POST** `/api/executive-corner/check-auto-release`

Check and auto-release items that have been pending for too long.

---

## Admin

**Note:** All admin endpoints require authentication with admin or executive role.

**Headers:**
```
Authorization: Bearer {jwt-token}
```

---

### 1. Get All Users
**GET** `/api/admin/users?skip=0&take=20`

Get all users (admin only).

---

### 2. Get User Statistics
**GET** `/api/admin/users/stats`

Get user statistics (admin only).

**Response:**
```json
{
  "total": 1000,
  "buyers": 600,
  "sellers": 350,
  "admins": 5,
  "executives": 10,
  "experts": 35
}
```

---

### 3. Get All Listings
**GET** `/api/admin/listings?skip=0&take=20`

Get all listings (admin only).

---

### 4. Get Listings by Status
**GET** `/api/admin/listings/status/{status}?skip=0&take=20`

Get listings filtered by status (admin only).

**Valid Statuses:** `draft`, `pending`, `executive_review`, `active`, `sold`, `archived`

---

### 5. Approve Listing
**POST** `/api/admin/listings/{id}/approve`

Approve a high-value listing (admin only).

---

### 6. Reject Listing
**POST** `/api/admin/listings/{id}/reject`

Reject a listing (admin only).

**Request Body:**
```json
{
  "reason": "Does not meet quality standards"
}
```

---

### 7. Get All Transactions
**GET** `/api/admin/transactions?skip=0&take=20`

Get all transactions (admin only).

---

### 8. Get Transaction Statistics
**GET** `/api/admin/transactions/stats`

Get transaction statistics (admin only).

**Response:**
```json
{
  "total": 500,
  "completed": 450,
  "pending": 30,
  "failed": 20,
  "total_volume_usd": 2500000
}
```

---

### 9. Get Audit Logs
**GET** `/api/admin/audit-logs?skip=0&take=20`

Get audit logs (admin only).

---

### 10. Get Audit Logs by Module
**GET** `/api/admin/audit-logs/{module}?skip=0&take=20`

Get audit logs filtered by module (admin only).

---

### 11. Suspend User
**POST** `/api/admin/users/{id}/suspend`

Suspend a user (admin only).

**Request Body:**
```json
{
  "reason": "Fraudulent activity detected"
}
```

---

### 12. Delete User
**POST** `/api/admin/users/{id}/delete`

Delete a user (admin only).

**Request Body:**
```json
{
  "reason": "User requested account deletion"
}
```

---

### 13. Get Fraud Flags
**GET** `/api/admin/fraud/flags?skip=0&take=20`

Get fraud flags (admin only).

---

### 14. Get User Fraud Score
**GET** `/api/admin/fraud/user/{userId}`

Get fraud score for a user (admin only).

**Response:**
```json
{
  "userId": "uuid",
  "flags": [
    {
      "id": "uuid",
      "reason": "Multiple failed payments",
      "severity": "high",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 3
}
```

---

### 15. Get Dashboard Statistics
**GET** `/api/admin/stats/dashboard`

Get dashboard statistics (admin only).

**Response:**
```json
{
  "users": {
    "total": 1000,
    "buyers": 600,
    "sellers": 350
  },
  "transactions": {
    "total": 500,
    "completed": 450,
    "total_volume_usd": 2500000
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Testing with cURL

### Example 1: Signup
```bash
curl -X POST https://ontimemaritime.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "+2348012345678",
    "password": "SecurePass123!",
    "role": "buyer"
  }'
```

### Example 2: Login
```bash
curl -X POST https://ontimemaritime.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

### Example 3: Get Listings
```bash
curl -X GET https://ontimemaritime.com/api/listings?skip=0&take=10
```

### Example 4: Create Listing (with auth)
```bash
curl -X POST https://ontimemaritime.com/api/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "category": "cargo",
    "title": "Fresh Bananas Export",
    "description": "Premium quality bananas from Nigeria, ready for export. Grade A quality with all necessary certifications.",
    "price_usd": 5000,
    "origin_port": "Lagos Port",
    "destination_port": "Rotterdam Port",
    "container_number": "HLCU1234567",
    "eta": "2024-12-31T00:00:00.000Z",
    "photos": ["https://example.com/photo1.jpg"],
    "certificates": ["https://example.com/cert1.pdf"],
    "is_perishable": true,
    "is_dangerous": false
  }'
```

### Example 5: Get User Profile
```bash
curl -X GET https://ontimemaritime.com/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Testing with Postman

1. **Import Collection**: Create a new collection in Postman named "OnTime Maritime API"

2. **Set Base URL**: Create an environment variable:
   - Variable: `baseUrl`
   - Value: `https://ontimemaritime.com/api`

3. **Set Auth Token**: After login, save the JWT token as:
   - Variable: `authToken`
   - Value: `YOUR_JWT_TOKEN`

4. **Use Variables in Requests**:
   - URL: `{{baseUrl}}/listings`
   - Authorization: Bearer Token → `{{authToken}}`

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be at least 8 characters"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Admin access required",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Health Check

**GET** `/api/`

Check if the API is running.

**Response:**
```json
{
  "message": "OnTime Maritime Backend is running"
}
```

---

## Notes

- All timestamps are in ISO 8601 format
- All UUIDs are version 4
- All authenticated endpoints require a valid JWT token in the Authorization header
- Pagination uses `skip` and `take` parameters
- Phone numbers must be in Nigerian format (+234...)
- All prices are in USD

---

## Support

For issues or questions, contact the OnTime Maritime development team.
