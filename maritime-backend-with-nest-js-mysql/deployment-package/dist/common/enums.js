"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatus = exports.NotificationType = exports.ExecutiveCornerStatus = exports.AuctionStatus = exports.KycStatus = exports.DocumentType = exports.PayoutStatus = exports.TransactionType = exports.ListingStatus = exports.ListingCategory = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["buyer"] = "buyer";
    UserRole["seller"] = "seller";
    UserRole["admin"] = "admin";
    UserRole["executive"] = "executive";
    UserRole["expert"] = "expert";
    UserRole["organization"] = "organization";
})(UserRole || (exports.UserRole = UserRole = {}));
var ListingCategory;
(function (ListingCategory) {
    ListingCategory["cargo"] = "cargo";
    ListingCategory["ship"] = "ship";
    ListingCategory["spare_part"] = "spare_part";
    ListingCategory["service"] = "service";
})(ListingCategory || (exports.ListingCategory = ListingCategory = {}));
var ListingStatus;
(function (ListingStatus) {
    ListingStatus["draft"] = "draft";
    ListingStatus["pending"] = "pending";
    ListingStatus["executive_review"] = "executive_review";
    ListingStatus["active"] = "active";
    ListingStatus["sold"] = "sold";
    ListingStatus["archived"] = "archived";
})(ListingStatus || (exports.ListingStatus = ListingStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["buy_now"] = "buy_now";
    TransactionType["auction"] = "auction";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var PayoutStatus;
(function (PayoutStatus) {
    PayoutStatus["pending"] = "pending";
    PayoutStatus["completed"] = "completed";
    PayoutStatus["failed"] = "failed";
})(PayoutStatus || (exports.PayoutStatus = PayoutStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["invoice"] = "invoice";
    DocumentType["bill_of_lading"] = "bill_of_lading";
    DocumentType["packing_list"] = "packing_list";
    DocumentType["delivery_order"] = "delivery_order";
    DocumentType["charterparty"] = "charterparty";
    DocumentType["survey_report"] = "survey_report";
    DocumentType["insurance_certificate"] = "insurance_certificate";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var KycStatus;
(function (KycStatus) {
    KycStatus["pending"] = "pending";
    KycStatus["approved"] = "approved";
    KycStatus["rejected"] = "rejected";
})(KycStatus || (exports.KycStatus = KycStatus = {}));
var AuctionStatus;
(function (AuctionStatus) {
    AuctionStatus["active"] = "active";
    AuctionStatus["ended"] = "ended";
    AuctionStatus["cancelled"] = "cancelled";
})(AuctionStatus || (exports.AuctionStatus = AuctionStatus = {}));
var ExecutiveCornerStatus;
(function (ExecutiveCornerStatus) {
    ExecutiveCornerStatus["pending"] = "pending";
    ExecutiveCornerStatus["approved"] = "approved";
    ExecutiveCornerStatus["rejected"] = "rejected";
    ExecutiveCornerStatus["auto_released"] = "auto_released";
})(ExecutiveCornerStatus || (exports.ExecutiveCornerStatus = ExecutiveCornerStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["sms"] = "sms";
    NotificationType["email"] = "email";
    NotificationType["push"] = "push";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["sent"] = "sent";
    NotificationStatus["failed"] = "failed";
    NotificationStatus["pending"] = "pending";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
//# sourceMappingURL=enums.js.map