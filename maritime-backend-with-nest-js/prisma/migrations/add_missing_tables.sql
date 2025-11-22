-- Add FraudFlag table
CREATE TABLE IF NOT EXISTS "fraud_flags" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "trigger" TEXT NOT NULL,
  "severity" INTEGER NOT NULL DEFAULT 1,
  "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fraud_flags_pkey" PRIMARY KEY ("id")
);

-- Add Rating table
CREATE TABLE IF NOT EXISTS "ratings" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "rater_id" UUID NOT NULL,
  "score" INTEGER NOT NULL,
  "comment" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- Add InsuranceProvider table
CREATE TABLE IF NOT EXISTS "insurance_providers" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "website" TEXT,
  "is_verified" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "insurance_providers_pkey" PRIMARY KEY ("id")
);

-- Add InsurancePolicy table
CREATE TABLE IF NOT EXISTS "insurance_policies" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "buyer_id" UUID NOT NULL,
  "listing_id" UUID,
  "provider_id" UUID NOT NULL,
  "policy_number" TEXT NOT NULL UNIQUE,
  "policy_pdf_url" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'active',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "insurance_policies_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "insurance_policies_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "insurance_providers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Add ArbitrationCase table
CREATE TABLE IF NOT EXISTS "arbitration_cases" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "transaction_id" UUID NOT NULL,
  "complainant_id" UUID NOT NULL,
  "defendant_id" UUID NOT NULL,
  "issue_summary" TEXT NOT NULL,
  "evidence_urls" JSONB,
  "status" TEXT NOT NULL DEFAULT 'open',
  "resolution" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "arbitration_cases_pkey" PRIMARY KEY ("id")
);

-- Add ApiUsageLog table
CREATE TABLE IF NOT EXISTS "api_usage_logs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "api_name" TEXT NOT NULL,
  "request_url" TEXT NOT NULL,
  "cost" DECIMAL(10,4),
  "returned" BOOLEAN NOT NULL DEFAULT true,
  "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "api_usage_logs_pkey" PRIMARY KEY ("id")
);

-- Add StaffAccount table
CREATE TABLE IF NOT EXISTS "staff_accounts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "account_type" TEXT NOT NULL DEFAULT 'hidden',
  "restrictions" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "staff_accounts_pkey" PRIMARY KEY ("id")
);

-- Add Subscription table
CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL UNIQUE,
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

-- Add LoginAttempt table
CREATE TABLE IF NOT EXISTS "login_attempts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL,
  "success" BOOLEAN NOT NULL,
  "ip_address" TEXT NOT NULL,
  "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "login_attempts_pkey" PRIMARY KEY ("id")
);

-- Add OtpToken table
CREATE TABLE IF NOT EXISTS "otp_tokens" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID NOT NULL,
  "email" TEXT NOT NULL,
  "otp_code" TEXT NOT NULL,
  "purpose" TEXT NOT NULL,
  "is_used" BOOLEAN NOT NULL DEFAULT false,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "otp_tokens_pkey" PRIMARY KEY ("id")
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "fraud_flags_user_id_idx" ON "fraud_flags"("user_id");
CREATE INDEX IF NOT EXISTS "ratings_user_id_idx" ON "ratings"("user_id");
CREATE INDEX IF NOT EXISTS "login_attempts_email_idx" ON "login_attempts"("email", "timestamp");
CREATE INDEX IF NOT EXISTS "otp_tokens_user_id_idx" ON "otp_tokens"("user_id", "expires_at");
CREATE INDEX IF NOT EXISTS "arbitration_cases_transaction_id_idx" ON "arbitration_cases"("transaction_id");
