export declare enum UserRole {
    buyer = "buyer",
    seller = "seller",
    admin = "admin",
    executive = "executive",
    expert = "expert"
}
export declare enum ListingCategory {
    cargo = "cargo",
    ship = "ship",
    spare_part = "spare_part",
    service = "service"
}
export declare enum ListingStatus {
    draft = "draft",
    pending = "pending",
    executive_review = "executive_review",
    active = "active",
    sold = "sold",
    archived = "archived"
}
export declare enum TransactionType {
    buy_now = "buy_now",
    auction = "auction"
}
export declare enum PayoutStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export declare enum DocumentType {
    invoice = "invoice",
    bill_of_lading = "bill_of_lading",
    packing_list = "packing_list",
    delivery_order = "delivery_order",
    charterparty = "charterparty",
    survey_report = "survey_report",
    insurance_certificate = "insurance_certificate"
}
export declare enum KycStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export declare enum AuctionStatus {
    active = "active",
    ended = "ended",
    cancelled = "cancelled"
}
export declare enum ExecutiveCornerStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    auto_released = "auto_released"
}
export declare enum NotificationType {
    sms = "sms",
    email = "email",
    push = "push"
}
export declare enum NotificationStatus {
    sent = "sent",
    failed = "failed",
    pending = "pending"
}
