// User Types
export interface User {
  id: string
  role: 'buyer' | 'seller' | 'admin' | 'executive' | 'expert'
  email: string
  phone: string
  is_phone_verified: boolean
  is_email_verified: boolean
  subscription_status: 'free' | 'premium' | 'enterprise'
  subscription_expiry: string | null
  first_name: string | null
  last_name: string | null
  created_at: string
  updated_at: string
}

// KYC Types
export interface KYC {
  id: string
  user_id: string
  bvn: string | null
  id_type: 'NIN' | 'passport' | 'voter_card' | 'drivers_license' | null
  id_number: string | null
  id_document_url: string | null
  face_photo_url: string | null
  status: 'pending' | 'approved' | 'rejected'
  admin_comment: string | null
  created_at: string
  updated_at: string
  user?: { email: string; first_name?: string | null; last_name?: string | null }
}

export interface KycStats {
  pending: number
  approved: number
  rejected: number
}

// Listing Types
export type ListingCategory = 'cargo' | 'vessel' | 'container' | 'equipment'
export type ListingStatus = 'draft' | 'pending' | 'active' | 'sold' | 'archived' | 'rejected' | 'executive_review'

export interface AdminListing {
  id: string
  title: string
  description: string
  status: ListingStatus
  price_usd: number
  currency: string
  category: string
  marketplace_category: string
  condition: string
  rejection_reason: string | null
  approved_at: string | null
  rejected_at: string | null
  created_at: string
  updated_at: string
  seller: {
    id: string
    email: string
    first_name: string | null
    last_name: string | null
  } | null
}

export interface ListingStats {
  pending: number
  active: number
  rejected: number
  archived: number
}

export interface Listing {
  id: string
  seller_id: string
  category: ListingCategory
  title: string
  description: string
  price_usd: number
  origin_port: string
  destination_port: string
  container_number: string | null
  eta: string | null
  photos: string[]
  certificates: string[]
  is_perishable: boolean
  is_dangerous: boolean
  is_high_value: boolean
  status: ListingStatus
  created_at: string
  updated_at: string
}

// Transaction Types
export type TransactionType = 'buy_now' | 'auction_win'
export type PayoutStatus = 'pending' | 'completed' | 'failed'

export interface Transaction {
  id: string
  buyer_id: string
  seller_id: string
  listing_id: string
  amount: number
  commission_amount: number
  payment_reference: string
  payout_status: PayoutStatus
  transaction_type: TransactionType
  created_at: string
  updated_at: string
}

// Auction Types
export type AuctionStatus = 'active' | 'ended' | 'cancelled'

export interface Auction {
  id: string
  listing_id: string
  starting_price: number
  current_price: number
  reserve_price: number
  status: AuctionStatus
  start_time: string
  end_time: string
  winner_id: string | null
  created_at: string
  updated_at: string
}

export interface Bid {
  id: string
  auction_id: string
  bidder_id: string
  amount: number
  created_at: string
}

// Executive Corner Types
export type ExecutiveCornerStatus = 'pending' | 'approved' | 'rejected' | 'auto_released'

export interface ExecutiveCorner {
  id: string
  listing_id: string
  submitted_at: string
  deadline_at: string
  status: ExecutiveCornerStatus
  decided_by: string | null
  decided_at: string | null
  decision_comment: string | null
  created_at: string
  updated_at: string
}

// Tracking Types
export interface TrackingLog {
  id: string
  container_number: string | null
  vessel_imo: string | null
  lat: number
  lng: number
  speed: number | null
  heading: string | null
  timestamp: string
  created_at: string
}

// Document Types
export type DocumentType = 'bill_of_lading' | 'invoice' | 'packing_list' | 'certificate'

export interface Document {
  id: string
  type: DocumentType
  file_url: string
  qr_hash: string
  is_revoked: boolean
  transaction_id: string | null
  listing_id: string | null
  created_at: string
}

// Notification Types
export type NotificationType = 'email' | 'sms' | 'push'
export type NotificationStatus = 'pending' | 'sent' | 'failed'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string
  status: NotificationStatus
  created_at: string
}

// Rating Types
export interface Rating {
  id: string
  user_id: string
  rater_id: string
  score: number
  comment: string | null
  created_at: string
}

// Arbitration Types
export type ArbitrationStatus = 'pending' | 'in_progress' | 'resolved' | 'cancelled'

export interface Arbitration {
  id: string
  transaction_id: string
  complainant_id: string
  respondent_id: string
  description: string
  status: ArbitrationStatus
  resolution: string | null
  created_at: string
  updated_at: string
}

// Insurance Types
export type InsurancePolicyStatus = 'active' | 'expired' | 'claimed' | 'cancelled'

export interface InsurancePolicy {
  id: string
  user_id: string
  listing_id: string
  policy_number: string
  coverage_amount: number
  premium_amount: number
  start_date: string
  end_date: string
  status: InsurancePolicyStatus
  created_at: string
  updated_at: string
}

// Admin Types
export interface DashboardStats {
  total_users: number
  total_listings: number
  total_transactions: number
  total_revenue: number
  pending_kyc: number
  active_auctions: number
}

export interface AuditLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  details: Record<string, any>
  created_at: string
}

// API Response Types
export interface ApiError {
  status: number
  message: string
  data?: any
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  skip: number
  take: number
}
