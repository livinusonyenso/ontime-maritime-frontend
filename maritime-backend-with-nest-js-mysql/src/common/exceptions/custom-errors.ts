export class InsufficientKycException extends Error {
  constructor(message = "Insufficient KYC level for this transaction") {
    super(message)
    this.name = "InsufficientKycException"
  }
}

export class FraudDetectedException extends Error {
  constructor(message = "Suspicious activity detected") {
    super(message)
    this.name = "FraudDetectedException"
  }
}

export class SubscriptionRequiredException extends Error {
  constructor(message = "Active subscription required") {
    super(message)
    this.name = "SubscriptionRequiredException"
  }
}

export class ContrabandDetectedException extends Error {
  constructor(message = "Listing violates compliance policy") {
    super(message)
    this.name = "ContrabandDetectedException"
  }
}

export class ExecutiveCornerException extends Error {
  constructor(message = "Executive Corner processing failed") {
    super(message)
    this.name = "ExecutiveCornerException"
  }
}
