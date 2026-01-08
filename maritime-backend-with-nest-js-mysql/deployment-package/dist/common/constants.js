"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYC_THRESHOLDS = exports.TRANSACTION_STATUS = exports.LISTING_STATUS = exports.RESTRICTED_REGIONS = exports.CONTRABAND_KEYWORDS = exports.FRAUD_SEVERITY = exports.HIGH_VALUE_FRAUD_THRESHOLD = exports.VERIFIED_SELLER_BADGE_PRICE = exports.PREMIUM_LISTING_BOOST_PRICE = exports.JWT_EXPIRY = exports.OTP_EXPIRY = exports.LOGIN_ATTEMPT_WINDOW = exports.MAX_LOGIN_ATTEMPTS = exports.SESSION_TIMEOUT = exports.EXECUTIVE_CORNER_DURATION = exports.EXECUTIVE_CORNER_THRESHOLD = exports.SELLER_SUBSCRIPTION_FEE = exports.COMMISSION_RATE = void 0;
exports.COMMISSION_RATE = 0.0025;
exports.SELLER_SUBSCRIPTION_FEE = 50000;
exports.EXECUTIVE_CORNER_THRESHOLD = 250000;
exports.EXECUTIVE_CORNER_DURATION = 48 * 60 * 60 * 1000;
exports.SESSION_TIMEOUT = 30 * 60 * 1000;
exports.MAX_LOGIN_ATTEMPTS = 5;
exports.LOGIN_ATTEMPT_WINDOW = 15 * 60 * 1000;
exports.OTP_EXPIRY = 10 * 60 * 1000;
exports.JWT_EXPIRY = "24h";
exports.PREMIUM_LISTING_BOOST_PRICE = 5000;
exports.VERIFIED_SELLER_BADGE_PRICE = 15000;
exports.HIGH_VALUE_FRAUD_THRESHOLD = 10;
exports.FRAUD_SEVERITY = {
    LOW: 1,
    MEDIUM: 5,
    HIGH: 8,
    CRITICAL: 10,
};
exports.CONTRABAND_KEYWORDS = [
    "weapon",
    "explosive",
    "drug",
    "cocaine",
    "heroin",
    "counterfeit",
    "stolen",
    "illegal",
];
exports.RESTRICTED_REGIONS = ["iran", "north korea", "syria", "crimea"];
exports.LISTING_STATUS = {
    DRAFT: "draft",
    PENDING: "pending",
    EXECUTIVE_REVIEW: "executive_review",
    ACTIVE: "active",
    SOLD: "sold",
    ARCHIVED: "archived",
};
exports.TRANSACTION_STATUS = {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
};
exports.KYC_THRESHOLDS = {
    PHONE_ONLY: 10000,
    FULL_KYC: 50000,
    EXECUTIVE_REVIEW: 250000,
};
//# sourceMappingURL=constants.js.map