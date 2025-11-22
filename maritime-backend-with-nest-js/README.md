# OnTime Maritime Backend API

A comprehensive NestJS-based digital maritime commerce platform backend built with PostgreSQL, providing real-time cargo tracking, marketplace functionality, and executive-level deal management.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Core Modules](#core-modules)
- [Future Integrations](#future-integrations)
- [Contributing](#contributing)

## Overview

OnTime Maritime is a revolution in digital maritime commerce, providing:

- **Cargo Marketplace**: Buy/sell maritime cargo with real-time pricing
- **Executive Corner**: Private high-value listing pre-review system
- **Live Tracking**: Real-time AIS vessel and container tracking
- **Auction System**: Competitive bidding for maritime assets
- **Smart Documents**: Auto-generated PDFs with QR-code verification
- **KYC Integration**: Tiered identity verification system
- **Admin Dashboard**: Complete platform control and analytics
- **Commission Enforcement**: 0.25% auto-deduction on all transactions

## Installation

### Prerequisites

- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

### Setup

\`\`\`bash
# Clone repository
git clone <repository-url>
cd ontime-maritime-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure database connection in .env
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
# DB_NAME=ontime_maritime

# Run database migrations
npm run migrate

# Start development server
npm run start:dev

# Production build
npm run build
npm run start:prod
\`\`\`

## Configuration

### Environment Variables

\`\`\`env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=ontime_maritime

# JWT Configuration
JWT_SECRET=your-secret-key-here

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Third-party APIs (To be configured)
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
TERMII_API_KEY=
MARINETRAFFIC_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
\`\`\`

## Project Structure

\`\`\`
src/
├── entities/              # TypeORM database entities
│   ├── user.entity.ts
│   ├── listing.entity.ts
│   ├── transaction.entity.ts
│   ├── auction.entity.ts
│   ├── executive-corner.entity.ts
│   ├── document.entity.ts
│   ├── tracking-log.entity.ts
│   ├── notification.entity.ts
│   └── audit-log.entity.ts
├── modules/               # Feature modules
│   ├── auth/
│   ├── users/
│   ├── kyc/
│   ├── listings/
│   ├── transactions/
│   ├── auctions/
│   ├── executive-corner/
│   ├── tracking/
│   ├── documents/
│   ├── notifications/
│   └── admin/
├── guards/                # Authentication guards
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
\`\`\`

## API Endpoints

### Authentication

#### Signup
\`\`\`http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "+234801234567",
  "password": "SecurePassword123",
  "role": "buyer"
}

Response: 
{
  "message": "User created successfully. Please verify your phone.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+234801234567",
    "role": "buyer"
  }
}
\`\`\`

#### Verify OTP
\`\`\`http
POST /auth/verify-otp
Content-Type: application/json

{
  "userId": "uuid",
  "otp": "123456"
}

Response:
{
  "message": "Phone verified successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+234801234567",
    "role": "buyer"
  }
}
\`\`\`

#### Login
\`\`\`http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "+234801234567",
    "role": "buyer",
    "subscription_status": "free"
  }
}
\`\`\`

### Users

#### Get Profile
\`\`\`http
GET /users/profile
Authorization: Bearer <token>

Response:
{
  "id": "uuid",
  "role": "buyer",
  "email": "user@example.com",
  "phone": "+234801234567",
  "is_phone_verified": true,
  "is_email_verified": false,
  "subscription_status": "free",
  "subscription_expiry": null,
  "first_name": null,
  "last_name": null,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### Get All Users
\`\`\`http
GET /users
\`\`\`

### KYC (Know Your Customer)

#### Submit KYC
\`\`\`http
POST /kyc
Authorization: Bearer <token>
Content-Type: application/json

{
  "bvn": "123456789",
  "id_type": "NIN",
  "id_number": "12345678901",
  "id_document_url": "https://s3.amazonaws.com/...",
  "face_photo_url": "https://s3.amazonaws.com/..."
}

Response:
{
  "id": "uuid",
  "user_id": "uuid",
  "bvn": "123456789",
  "id_type": "NIN",
  "id_number": "12345678901",
  "id_document_url": "https://s3.amazonaws.com/...",
  "face_photo_url": "https://s3.amazonaws.com/...",
  "status": "pending",
  "admin_comment": null,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### Get My KYC
\`\`\`http
GET /kyc/my-kyc
Authorization: Bearer <token>

Response: [KYC object]
\`\`\`

#### Update KYC
\`\`\`http
PATCH /kyc/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "bvn": "123456789",
  "id_type": "passport"
}

Response: [Updated KYC object]
\`\`\`

### Listings

#### Create Listing
\`\`\`http
POST /listings
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "cargo",
  "title": "Premium Cocoa Beans - Nigeria Export",
  "description": "High-quality cocoa beans from Nigeria, Grade A",
  "price_usd": 150000,
  "origin_port": "Lagos",
  "destination_port": "Rotterdam",
  "container_number": "CONT123456",
  "eta": "2024-02-15T10:00:00Z",
  "photos": ["https://s3.amazonaws.com/..."],
  "certificates": ["https://s3.amazonaws.com/..."],
  "is_perishable": true,
  "is_dangerous": false
}

Response:
{
  "id": "uuid",
  "seller_id": "uuid",
  "category": "cargo",
  "title": "Premium Cocoa Beans - Nigeria Export",
  "description": "High-quality cocoa beans from Nigeria, Grade A",
  "price_usd": 150000,
  "origin_port": "Lagos",
  "destination_port": "Rotterdam",
  "container_number": "CONT123456",
  "eta": "2024-02-15T10:00:00Z",
  "photos": ["https://s3.amazonaws.com/..."],
  "certificates": ["https://s3.amazonaws.com/..."],
  "is_perishable": true,
  "is_dangerous": false,
  "is_high_value": false,
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### List All Listings
\`\`\`http
GET /listings?skip=0&take=20

Response: [Listing objects...]
\`\`\`

#### Search Listings
\`\`\`http
GET /listings/search?q=cocoa&skip=0&take=20

Response: [Listing objects matching query...]
\`\`\`

#### Get Listing by Category
\`\`\`http
GET /listings/category/cargo?skip=0&take=20

Response: [Listing objects of category...]
\`\`\`

#### Get Listing Details
\`\`\`http
GET /listings/:id

Response: [Full Listing object with relations]
\`\`\`

#### Update Listing
\`\`\`http
PATCH /listings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price_usd": 160000,
  "description": "Updated description"
}

Response: [Updated Listing object]
\`\`\`

#### Delete Listing
\`\`\`http
DELETE /listings/:id
Authorization: Bearer <token>

Response: { "message": "Listing deleted successfully" }
\`\`\`

### Transactions

#### Create Transaction (Buy Now)
\`\`\`http
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "listing_id": "uuid",
  "amount": 150000,
  "transaction_type": "buy_now",
  "payment_reference": "paystack_reference_123"
}

Response:
{
  "id": "uuid",
  "buyer_id": "uuid",
  "seller_id": "uuid",
  "listing_id": "uuid",
  "amount": 150000,
  "commission_amount": 375,
  "payment_reference": "paystack_reference_123",
  "payout_status": "pending",
  "transaction_type": "buy_now",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### Get My Purchases
\`\`\`http
GET /transactions/my-purchases?skip=0&take=20
Authorization: Bearer <token>

Response: [Transaction objects where user is buyer...]
\`\`\`

#### Get My Sales
\`\`\`http
GET /transactions/my-sales?skip=0&take=20
Authorization: Bearer <token>

Response: [Transaction objects where user is seller...]
\`\`\`

#### Get All Transactions
\`\`\`http
GET /transactions?skip=0&take=20
Authorization: Bearer <token>

Response: [All Transaction objects]
\`\`\`

#### Get Transaction Details
\`\`\`http
GET /transactions/:id

Response: [Full Transaction object with relations]
\`\`\`

### Auctions

#### Create Auction
\`\`\`http
POST /auctions
Authorization: Bearer <token>
Content-Type: application/json

{
  "listing_id": "uuid",
  "starting_price": 100000,
  "reserve_price": 120000,
  "start_time": "2024-01-16T10:00:00Z",
  "end_time": "2024-01-17T10:00:00Z"
}

Response:
{
  "id": "uuid",
  "listing_id": "uuid",
  "starting_price": 100000,
  "current_price": 100000,
  "reserve_price": 120000,
  "status": "active",
  "start_time": "2024-01-16T10:00:00Z",
  "end_time": "2024-01-17T10:00:00Z",
  "winner_id": null,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### Get Active Auctions
\`\`\`http
GET /auctions?skip=0&take=20

Response: [Active Auction objects...]
\`\`\`

#### Get Auction Details
\`\`\`http
GET /auctions/:id

Response: [Full Auction object with bids]
\`\`\`

#### Get Bid History
\`\`\`http
GET /auctions/:id/bids

Response: [Bid objects in descending order]
\`\`\`

#### Place Bid
\`\`\`http
POST /auctions/:id/bid
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 125000
}

Response:
{
  "id": "uuid",
  "auction_id": "uuid",
  "bidder_id": "uuid",
  "amount": 125000,
  "created_at": "2024-01-15T10:35:00Z"
}
\`\`\`

#### End Auction
\`\`\`http
POST /auctions/:id/end
Authorization: Bearer <token>

Response: [Auction object with winner_id populated]
\`\`\`

### Executive Corner

#### Get Pending High-Value Listings
\`\`\`http
GET /executive-corner?skip=0&take=20
Authorization: Bearer <token>

Response: [ExecutiveCorner objects with pending status]
\`\`\`

#### Get All Executive Corner Records
\`\`\`http
GET /executive-corner/all?skip=0&take=20
Authorization: Bearer <token>

Response: [All ExecutiveCorner objects]
\`\`\`

#### Get Executive Corner Record Details
\`\`\`http
GET /executive-corner/:id

Response:
{
  "id": "uuid",
  "listing_id": "uuid",
  "submitted_at": "2024-01-15T09:00:00Z",
  "deadline_at": "2024-01-17T09:00:00Z",
  "status": "pending",
  "decided_by": null,
  "decided_at": null,
  "decision_comment": null,
  "logs": [],
  "created_at": "2024-01-15T09:00:00Z",
  "updated_at": "2024-01-15T09:00:00Z",
  "listing": [Listing object]
}
\`\`\`

#### Approve High-Value Listing
\`\`\`http
POST /executive-corner/:id/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Approved - meets all criteria"
}

Response: [Updated ExecutiveCorner object with status APPROVED]
\`\`\`

#### Reject High-Value Listing
\`\`\`http
POST /executive-corner/:id/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "comment": "Does not meet safety standards"
}

Response: [Updated ExecutiveCorner object with status REJECTED]
\`\`\`

#### Check & Auto-Release
\`\`\`http
POST /executive-corner/check-auto-release

Response: [Array of auto-released ExecutiveCorner objects]
\`\`\`

### Tracking

#### Log Tracking Data
\`\`\`http
POST /tracking
Authorization: Bearer <token>
Content-Type: application/json

{
  "container_number": "CONT123456",
  "vessel_imo": "9234567890",
  "lat": 6.5244,
  "lng": 3.3792,
  "speed": 15.5,
  "heading": "NE",
  "timestamp": "2024-01-15T10:30:00Z"
}

Response: [TrackingLog object]
\`\`\`

#### Get Container Tracking History
\`\`\`http
GET /tracking/container/CONT123456?limit=100

Response: [TrackingLog objects for container in descending time order]
\`\`\`

#### Get Vessel Tracking History
\`\`\`http
GET /tracking/vessel/9234567890?limit=100

Response: [TrackingLog objects for vessel in descending time order]
\`\`\`

#### Get Latest Container Position
\`\`\`http
GET /tracking/latest/container/CONT123456

Response: [Latest TrackingLog object for container]
\`\`\`

#### Get Latest Vessel Position
\`\`\`http
GET /tracking/latest/vessel/9234567890

Response: [Latest TrackingLog object for vessel]
\`\`\`

#### Get Movement History (Date Range)
\`\`\`http
GET /tracking/history/CONT123456?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z

Response: [TrackingLog objects within date range]
\`\`\`

### Documents

#### Create Document
\`\`\`http
POST /documents
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "bill_of_lading",
  "file_url": "https://s3.amazonaws.com/documents/bl-123.pdf",
  "transaction_id": "uuid"
}

Response:
{
  "id": "uuid",
  "type": "bill_of_lading",
  "file_url": "https://s3.amazonaws.com/documents/bl-123.pdf",
  "qr_hash": "abc123def456...",
  "is_revoked": false,
  "transaction_id": "uuid",
  "created_at": "2024-01-15T10:30:00Z"
}
\`\`\`

#### Get Document
\`\`\`http
GET /documents/:id

Response: [Document object]
\`\`\`

#### Get Listing Documents
\`\`\`http
GET /documents/listing/:listingId

Response: [Document objects for listing]
\`\`\`

#### Get Transaction Documents
\`\`\`http
GET /documents/transaction/:transactionId

Response: [Document objects for transaction]
\`\`\`

#### Verify Document
\`\`\`http
GET /documents/:id/verify

Response:
{
  "valid": true,
  "document": [Document object]
}
\`\`\`

#### Revoke Document
\`\`\`http
POST /documents/:id/revoke
Authorization: Bearer <token>

Response: [Document object with is_revoked set to true]
\`\`\`

#### Generate Bill of Lading
\`\`\`http
POST /documents/generate/bill-of-lading
Authorization: Bearer <token>
Content-Type: application/json

{
  "transactionId": "uuid"
}

Response: [Document object]
\`\`\`

#### Generate Invoice
\`\`\`http
POST /documents/generate/invoice
Authorization: Bearer <token>
Content-Type: application/json

{
  "transactionId": "uuid"
}

Response: [Document object]
\`\`\`

#### Generate Packing List
\`\`\`http
POST /documents/generate/packing-list
Authorization: Bearer <token>
Content-Type: application/json

{
  "transactionId": "uuid"
}

Response: [Document object]
\`\`\`

### Notifications

#### Create Notification
\`\`\`http
POST /notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "user_id": "uuid",
  "type": "email",
  "title": "Transaction Alert",
  "body": "You have received a new transaction"
}

Response: [Notification object]
\`\`\`

#### Get My Notifications
\`\`\`http
GET /notifications/my-notifications?skip=0&take=20
Authorization: Bearer <token>

Response: [Notification objects for current user]
\`\`\`

#### Get Notification Details
\`\`\`http
GET /notifications/:id

Response: [Notification object]
\`\`\`

#### Mark as Sent
\`\`\`http
POST /notifications/:id/sent

Response: [Notification object with status SENT]
\`\`\`

#### Mark as Failed
\`\`\`http
POST /notifications/:id/failed

Response: [Notification object with status FAILED]
\`\`\`

### Admin

#### Get All Users
\`\`\`http
GET /admin/users?skip=0&take=20
Authorization: Bearer <token>

Response: [User objects]
\`\`\`

#### Get User Statistics
\`\`\`http
GET /admin/users/stats
Authorization: Bearer <token>

Response:
{
  "totalUsers": 150,
  "buyers": 95,
  "sellers": 55
}
\`\`\`

#### Get All Listings
\`\`\`http
GET /admin/listings?skip=0&take=20
Authorization: Bearer <token>

Response: [Listing objects with seller relations]
\`\`\`

#### Get Listings by Status
\`\`\`http
GET /admin/listings/status/active?skip=0&take=20
Authorization: Bearer <token>

Response: [Listing objects filtered by status]
\`\`\`

#### Approve High-Value Listing
\`\`\`http
POST /admin/listings/:id/approve
Authorization: Bearer <token>

Response: [Updated Listing object]
\`\`\`

#### Reject Listing
\`\`\`http
POST /admin/listings/:id/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Violates community guidelines"
}

Response: [Updated Listing object]
\`\`\`

#### Get All Transactions
\`\`\`http
GET /admin/transactions?skip=0&take=20
Authorization: Bearer <token>

Response: [Transaction objects with relations]
\`\`\`

#### Get Transaction Statistics
\`\`\`http
GET /admin/transactions/stats
Authorization: Bearer <token>

Response:
{
  "totalTransactions": 500,
  "totalCommission": 1250,
  "totalVolume": 500000
}
\`\`\`

#### Get Audit Logs
\`\`\`http
GET /admin/audit-logs?skip=0&take=20
Authorization: Bearer <token>

Response: [AuditLog objects]
\`\`\`

#### Get Audit Logs by Module
\`\`\`http
GET /admin/audit-logs/listing?skip=0&take=20
Authorization: Bearer <token>

Response: [AuditLog objects filtered by module]
\`\`\`

#### Suspend User
\`\`\`http
POST /admin/users/:id/suspend
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Suspicious activity"
}

Response: [User object]
\`\`\`

#### Delete User
\`\`\`http
POST /admin/users/:id/delete
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Fraud detected"
}

Response: { "message": "User deleted successfully" }
\`\`\`

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(50) DEFAULT 'buyer',
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_phone_verified BOOLEAN DEFAULT FALSE,
  is_email_verified BOOLEAN DEFAULT FALSE,
  subscription_status VARCHAR(50) DEFAULT 'free',
  subscription_expiry TIMESTAMP,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Listings Table
\`\`\`sql
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES users(id),
  category VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price_usd NUMERIC(18,2) NOT NULL,
  origin_port VARCHAR(100),
  destination_port VARCHAR(100),
  container_number VARCHAR(50),
  eta TIMESTAMP,
  photos JSONB,
  certificates JSONB,
  is_perishable BOOLEAN DEFAULT FALSE,
  is_dangerous BOOLEAN DEFAULT FALSE,
  is_high_value BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Transactions Table
\`\`\`sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES users(id),
  listing_id UUID NOT NULL REFERENCES listings(id),
  amount NUMERIC(18,2) NOT NULL,
  commission_amount NUMERIC(18,2),
  payment_reference VARCHAR(255),
  payout_status VARCHAR(50) DEFAULT 'pending',
  transaction_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Auctions Table
\`\`\`sql
CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id),
  starting_price NUMERIC(18,2) NOT NULL,
  current_price NUMERIC(18,2),
  reserve_price NUMERIC(18,2),
  status VARCHAR(50) DEFAULT 'active',
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  winner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <jwt_token>
\`\`\`

Tokens are issued upon successful login and are valid for 24 hours.

### Refresh Token (TODO)

Token refresh mechanism will be implemented in Phase 2.

## Core Modules

### 1. Authentication Module
- User signup/login
- Phone OTP verification
- JWT token management
- Password hashing with bcrypt

### 2. KYC Module
- Tiered verification system
- Phone-only verification (<$50k)
- Full KYC with BVN & ID (>$50k)
- Admin approval workflow

### 3. Listings Module
- Create/update/delete cargo listings
- Multi-category support
- Auto-routing to Executive Corner for ≥$250k items
- Search and filtering

### 4. Transactions Module
- Buy-now transactions
- Auto commission deduction (0.25%)
- Seller payout processing
- Transaction history

### 5. Auctions Module
- Create and manage auctions
- Real-time bidding
- Auto-winner selection
- Bid history tracking

### 6. Executive Corner Module
- 48-hour review period for ≥$250k listings
- Approve/Reject workflow
- Auto-release on deadline
- Comprehensive logging

### 7. Tracking Module
- Real-time AIS position logging
- Container & vessel tracking
- Movement history retrieval
- Latest position queries

### 8. Documents Module
- Auto-generate PDFs (Invoice, B/L, Packing List)
- QR-code verification system
- Document hashing for authenticity
- Revocation capability

### 9. Notifications Module
- SMS alerts via Termii
- Email notifications
- Push notifications
- Auction and Executive Corner alerts

### 10. Admin Module
- User management
- Listing approval/rejection
- Transaction monitoring
- Audit logging
- Statistics and analytics

## Future Integrations

### Phase 2 (1-3 Months)
- Paystack payment integration
- Termii SMS/OTP service
- Advanced fraud detection
- Insurance marketplace
- Chat system
- Trade intelligence engine

### Phase 3 (4-9 Months)
- MarineTraffic AIS integration
- AI-powered arbitration
- Alibaba data enrichment
- Computer vision for cargo inspection
- Mobile app (iOS/Android)
- Global maritime crime database

### Phase 4 (9-18 Months)
- Customs/Port authority APIs
- Blockchain-based escrow
- Global trading desk
- AI legal co-pilot

## Running Tests

\`\`\`bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
\`\`\`

## Development Commands

\`\`\`bash
# Start development server with hot reload
npm run start:dev

# Start debug mode
npm run start:debug

# Build for production
npm run build

# Start production server
npm run start:prod

# Lint code
npm run lint

# Format code
npm run format
\`\`\`

## Error Handling

All endpoints return standardized error responses:

\`\`\`json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "BadRequest"
}
\`\`\`

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Best Practices

1. **Password Security**: All passwords are hashed with bcrypt (10 rounds)
2. **JWT Tokens**: Tokens expire after 24 hours
3. **CORS**: Configured to accept requests from frontend URL only
4. **Input Validation**: All inputs validated with class-validator
5. **SQL Injection**: Protected via TypeORM parameterized queries
6. **Rate Limiting**: To be implemented in Phase 2
7. **Audit Logging**: All sensitive actions logged with timestamps and actor IDs

## Commission System

OnTime Maritime enforces a **0.25% commission** on all transactions:

\`\`\`
Commission = Transaction Amount × 0.0025
Seller Receives = Transaction Amount - Commission
\`\`\`

Example:
- Cargo Price: $100,000
- Commission: $250
- Seller Payout: $99,750

All commissions are automatically deducted and logged in the transactions table.

## Deployment

### Hostinger (MVP)
\`\`\`bash
# Build
npm run build

# Upload dist/ folder to Hostinger
# Configure Node.js environment
# Set environment variables
# Start application
\`\`\`

### AWS (Phase 2)
\`\`\`bash
# Build Docker image
docker build -t ontime-maritime .

# Push to ECR
aws ecr push-image

# Deploy to ECS
aws ecs update-service
\`\`\`

## Support & Contribution

For issues, feature requests, or contributions, please contact the development team.

## License

MIT License - OnTime Resources Limited

---

**Last Updated**: January 2024
**Version**: 1.0.0 (MVP)
**Status**: Production Ready
