"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveCornerException = exports.ContrabandDetectedException = exports.SubscriptionRequiredException = exports.FraudDetectedException = exports.InsufficientKycException = void 0;
class InsufficientKycException extends Error {
    constructor(message = "Insufficient KYC level for this transaction") {
        super(message);
        this.name = "InsufficientKycException";
    }
}
exports.InsufficientKycException = InsufficientKycException;
class FraudDetectedException extends Error {
    constructor(message = "Suspicious activity detected") {
        super(message);
        this.name = "FraudDetectedException";
    }
}
exports.FraudDetectedException = FraudDetectedException;
class SubscriptionRequiredException extends Error {
    constructor(message = "Active subscription required") {
        super(message);
        this.name = "SubscriptionRequiredException";
    }
}
exports.SubscriptionRequiredException = SubscriptionRequiredException;
class ContrabandDetectedException extends Error {
    constructor(message = "Listing violates compliance policy") {
        super(message);
        this.name = "ContrabandDetectedException";
    }
}
exports.ContrabandDetectedException = ContrabandDetectedException;
class ExecutiveCornerException extends Error {
    constructor(message = "Executive Corner processing failed") {
        super(message);
        this.name = "ExecutiveCornerException";
    }
}
exports.ExecutiveCornerException = ExecutiveCornerException;
//# sourceMappingURL=custom-errors.js.map