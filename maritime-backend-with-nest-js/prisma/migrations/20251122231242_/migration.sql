-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('buyer', 'seller', 'admin', 'executive', 'expert');

-- CreateEnum
CREATE TYPE "ListingCategory" AS ENUM ('cargo', 'ship', 'spare_part', 'service');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('draft', 'pending', 'executive_review', 'active', 'sold', 'archived');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('buy_now', 'auction');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('invoice', 'bill_of_lading', 'packing_list', 'delivery_order', 'charterparty', 'survey_report', 'insurance_certificate');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "AuctionStatus" AS ENUM ('active', 'ended', 'cancelled');

-- CreateEnum
CREATE TYPE "ExecutiveCornerStatus" AS ENUM ('pending', 'approved', 'rejected', 'auto_released');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('sms', 'email', 'push');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('sent', 'failed', 'pending');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'buyer',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "subscription_status" TEXT NOT NULL DEFAULT 'free',
    "subscription_expiry" TIMESTAMP(3),
    "first_name" TEXT,
    "last_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listings" (
    "id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "category" "ListingCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price_usd" DECIMAL(18,2) NOT NULL,
    "origin_port" TEXT NOT NULL,
    "destination_port" TEXT NOT NULL,
    "container_number" TEXT,
    "eta" TIMESTAMP(3) NOT NULL,
    "photos" JSONB,
    "certificates" JSONB,
    "is_perishable" BOOLEAN NOT NULL DEFAULT false,
    "is_dangerous" BOOLEAN NOT NULL DEFAULT false,
    "is_high_value" BOOLEAN NOT NULL DEFAULT false,
    "status" "ListingStatus" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "commission_amount" DECIMAL(18,2) NOT NULL,
    "payment_reference" TEXT,
    "payout_status" "PayoutStatus" NOT NULL DEFAULT 'pending',
    "transaction_type" "TransactionType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "listing_id" TEXT,
    "transaction_id" TEXT,
    "file_url" TEXT NOT NULL,
    "qr_hash" TEXT,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kyc" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bvn" TEXT,
    "id_type" TEXT,
    "id_number" TEXT,
    "id_document_url" TEXT,
    "face_photo_url" TEXT,
    "status" "KycStatus" NOT NULL DEFAULT 'pending',
    "admin_comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auctions" (
    "id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "starting_price" DECIMAL(18,2) NOT NULL,
    "current_price" DECIMAL(18,2) NOT NULL,
    "reserve_price" DECIMAL(18,2),
    "status" "AuctionStatus" NOT NULL DEFAULT 'active',
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "winner_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auctions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction_bids" (
    "id" TEXT NOT NULL,
    "auction_id" TEXT NOT NULL,
    "bidder_id" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auction_bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "executive_corner" (
    "id" TEXT NOT NULL,
    "listing_id" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "deadline_at" TIMESTAMP(3) NOT NULL,
    "status" "ExecutiveCornerStatus" NOT NULL DEFAULT 'pending',
    "decided_by" TEXT,
    "decided_at" TIMESTAMP(3),
    "decision_comment" TEXT,
    "logs" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "executive_corner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking_logs" (
    "id" TEXT NOT NULL,
    "container_number" TEXT NOT NULL,
    "vessel_imo" TEXT,
    "lat" DECIMAL(10,6) NOT NULL,
    "lng" DECIMAL(10,6) NOT NULL,
    "speed" DECIMAL(5,2),
    "heading" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tracking_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_id" TEXT,
    "action" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "details" JSONB,
    "ip_address" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fraud_flags" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "severity" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fraud_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rater_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insurance_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_policies" (
    "id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "listing_id" TEXT,
    "provider_id" TEXT NOT NULL,
    "policy_number" TEXT NOT NULL,
    "policy_pdf_url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insurance_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arbitration_cases" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "complainant_id" TEXT NOT NULL,
    "defendant_id" TEXT NOT NULL,
    "issue_summary" TEXT NOT NULL,
    "evidence_urls" JSONB,
    "status" TEXT NOT NULL DEFAULT 'open',
    "resolution" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "arbitration_cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_usage_logs" (
    "id" TEXT NOT NULL,
    "api_name" TEXT NOT NULL,
    "request_url" TEXT NOT NULL,
    "cost" DECIMAL(10,4),
    "returned" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_type" TEXT NOT NULL DEFAULT 'hidden',
    "restrictions" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'free',
    "amount" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "started_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "renewal_date" TIMESTAMP(3),
    "payment_ref" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_attempts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "ip_address" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_tokens" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp_code" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_subscription_status_idx" ON "users"("subscription_status");

-- CreateIndex
CREATE INDEX "listings_seller_id_idx" ON "listings"("seller_id");

-- CreateIndex
CREATE INDEX "listings_status_idx" ON "listings"("status");

-- CreateIndex
CREATE INDEX "listings_is_high_value_idx" ON "listings"("is_high_value");

-- CreateIndex
CREATE INDEX "listings_created_at_idx" ON "listings"("created_at");

-- CreateIndex
CREATE INDEX "transactions_buyer_id_idx" ON "transactions"("buyer_id");

-- CreateIndex
CREATE INDEX "transactions_seller_id_idx" ON "transactions"("seller_id");

-- CreateIndex
CREATE INDEX "transactions_payout_status_idx" ON "transactions"("payout_status");

-- CreateIndex
CREATE INDEX "transactions_created_at_idx" ON "transactions"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "auctions_listing_id_key" ON "auctions"("listing_id");

-- CreateIndex
CREATE INDEX "auctions_status_idx" ON "auctions"("status");

-- CreateIndex
CREATE INDEX "auctions_end_time_idx" ON "auctions"("end_time");

-- CreateIndex
CREATE INDEX "auctions_winner_id_idx" ON "auctions"("winner_id");

-- CreateIndex
CREATE UNIQUE INDEX "executive_corner_listing_id_key" ON "executive_corner"("listing_id");

-- CreateIndex
CREATE INDEX "executive_corner_status_idx" ON "executive_corner"("status");

-- CreateIndex
CREATE INDEX "executive_corner_deadline_at_idx" ON "executive_corner"("deadline_at");

-- CreateIndex
CREATE INDEX "fraud_flags_user_id_idx" ON "fraud_flags"("user_id");

-- CreateIndex
CREATE INDEX "fraud_flags_severity_idx" ON "fraud_flags"("severity");

-- CreateIndex
CREATE INDEX "fraud_flags_created_at_idx" ON "fraud_flags"("created_at");

-- CreateIndex
CREATE INDEX "ratings_user_id_idx" ON "ratings"("user_id");

-- CreateIndex
CREATE INDEX "ratings_rater_id_idx" ON "ratings"("rater_id");

-- CreateIndex
CREATE INDEX "ratings_created_at_idx" ON "ratings"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_providers_email_key" ON "insurance_providers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "insurance_policies_policy_number_key" ON "insurance_policies"("policy_number");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_user_id_key" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "login_attempts_email_idx" ON "login_attempts"("email");

-- CreateIndex
CREATE INDEX "login_attempts_success_idx" ON "login_attempts"("success");

-- CreateIndex
CREATE INDEX "login_attempts_timestamp_idx" ON "login_attempts"("timestamp");

-- CreateIndex
CREATE INDEX "otp_tokens_email_idx" ON "otp_tokens"("email");

-- CreateIndex
CREATE INDEX "otp_tokens_expires_at_idx" ON "otp_tokens"("expires_at");

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kyc" ADD CONSTRAINT "kyc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctions" ADD CONSTRAINT "auctions_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_bids" ADD CONSTRAINT "auction_bids_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_bids" ADD CONSTRAINT "auction_bids_bidder_id_fkey" FOREIGN KEY ("bidder_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "executive_corner" ADD CONSTRAINT "executive_corner_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "executive_corner" ADD CONSTRAINT "executive_corner_decided_by_fkey" FOREIGN KEY ("decided_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_policies" ADD CONSTRAINT "insurance_policies_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "insurance_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_policies" ADD CONSTRAINT "insurance_policies_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arbitration_cases" ADD CONSTRAINT "arbitration_cases_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_accounts" ADD CONSTRAINT "staff_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
