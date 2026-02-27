// src/common/enums.ts
// Local enum definitions to avoid Prisma client dependency issues at runtime
// These MUST match the enums in prisma/schema.prisma exactly

export enum UserRole {
  buyer = 'buyer',
  seller = 'seller',
  admin = 'admin',
  executive = 'executive',
  expert = 'expert',
  organization = 'organization',
}

export enum ListingCategory {
  cargo = 'cargo',
  ship = 'ship',
  spare_part = 'spare_part',
  service = 'service',
}

export enum ListingStatus {
  draft = 'draft',
  pending = 'pending',
  executive_review = 'executive_review',
  active = 'active',
  sold = 'sold',
  archived = 'archived',
}

export enum TransactionType {
  buy_now = 'buy_now',
  auction = 'auction',
}

export enum PayoutStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
}

export enum DocumentType {
  invoice = 'invoice',
  bill_of_lading = 'bill_of_lading',
  packing_list = 'packing_list',
  delivery_order = 'delivery_order',
  charterparty = 'charterparty',
  survey_report = 'survey_report',
  insurance_certificate = 'insurance_certificate',
}

export enum KycStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export enum AuctionStatus {
  active = 'active',
  ended = 'ended',
  cancelled = 'cancelled',
}

export enum ExecutiveCornerStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  auto_released = 'auto_released',
}

export enum NotificationType {
  sms = 'sms',
  email = 'email',
  push = 'push',
}

export enum NotificationStatus {
  sent = 'sent',
  failed = 'failed',
  pending = 'pending',
}
