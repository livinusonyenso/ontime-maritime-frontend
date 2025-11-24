export declare const COMMISSION_RATE = 0.0025;
export declare const SELLER_SUBSCRIPTION_FEE = 50000;
export declare const EXECUTIVE_CORNER_THRESHOLD = 250000;
export declare const EXECUTIVE_CORNER_DURATION: number;
export declare const SESSION_TIMEOUT: number;
export declare const MAX_LOGIN_ATTEMPTS = 5;
export declare const LOGIN_ATTEMPT_WINDOW: number;
export declare const OTP_EXPIRY: number;
export declare const JWT_EXPIRY = "24h";
export declare const PREMIUM_LISTING_BOOST_PRICE = 5000;
export declare const VERIFIED_SELLER_BADGE_PRICE = 15000;
export declare const HIGH_VALUE_FRAUD_THRESHOLD = 10;
export declare const FRAUD_SEVERITY: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    CRITICAL: number;
};
export declare const CONTRABAND_KEYWORDS: string[];
export declare const RESTRICTED_REGIONS: string[];
export declare const LISTING_STATUS: {
    DRAFT: string;
    PENDING: string;
    EXECUTIVE_REVIEW: string;
    ACTIVE: string;
    SOLD: string;
    ARCHIVED: string;
};
export declare const TRANSACTION_STATUS: {
    PENDING: string;
    COMPLETED: string;
    FAILED: string;
};
export declare const KYC_THRESHOLDS: {
    PHONE_ONLY: number;
    FULL_KYC: number;
    EXECUTIVE_REVIEW: number;
};
