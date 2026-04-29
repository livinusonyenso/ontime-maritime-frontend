export const COMMISSION_RATE = 0.0025 // 0.25%
export const SELLER_SUBSCRIPTION_FEE = 50000 // ₦50,000/year
export const EXECUTIVE_CORNER_THRESHOLD = 250000 // $250,000
export const EXECUTIVE_CORNER_DURATION = 48 * 60 * 60 * 1000 // 48 hours
export const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
export const MAX_LOGIN_ATTEMPTS = 5
export const LOGIN_ATTEMPT_WINDOW = 15 * 60 * 1000 // 15 minutes
export const OTP_EXPIRY = 10 * 60 * 1000 // 10 minutes
export const JWT_EXPIRY = "24h"
export const PREMIUM_LISTING_BOOST_PRICE = 5000 // ₦5,000
export const VERIFIED_SELLER_BADGE_PRICE = 15000 // ₦15,000
export const HIGH_VALUE_FRAUD_THRESHOLD = 10 // Fraud score threshold

export const FRAUD_SEVERITY = {
  LOW: 1,
  MEDIUM: 5,
  HIGH: 8,
  CRITICAL: 10,
}

export const CONTRABAND_KEYWORDS = [
  "weapon",
  "explosive",
  "drug",
  "cocaine",
  "heroin",
  "counterfeit",
  "stolen",
  "illegal",
]

export const RESTRICTED_REGIONS = ["iran", "north korea", "syria", "crimea"]

export const LISTING_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  EXECUTIVE_REVIEW: "executive_review",
  ACTIVE: "active",
  SOLD: "sold",
  ARCHIVED: "archived",
}

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
}

export const KYC_THRESHOLDS = {
  PHONE_ONLY: 10000, // $10,000
  FULL_KYC: 50000, // $50,000
  EXECUTIVE_REVIEW: 250000, // $250,000
}
