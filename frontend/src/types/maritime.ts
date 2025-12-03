// Maritime Platform Types

// Vessel Tracking Types
export interface Vessel {
  id: string
  imo: string
  mmsi: string
  name: string
  type: 'cargo' | 'tanker' | 'container' | 'bulk_carrier' | 'passenger'
  flag: string
  destination: string
  eta: string
  status: 'underway' | 'anchored' | 'moored' | 'not_under_command'
  lat: number
  lng: number
  speed: number
  heading: number
  course: number
  lastUpdate: string
}

// Digital Bill of Lading (e-BOL) Types
export interface BillOfLading {
  id: string
  bolNumber: string
  shipper: {
    name: string
    address: string
    email: string
    phone: string
  }
  consignee: {
    name: string
    address: string
    email: string
    phone: string
  }
  notifyParty: {
    name: string
    address: string
    email: string
    phone: string
  }
  vesselName: string
  voyageNumber: string
  portOfLoading: string
  portOfDischarge: string
  placeOfDelivery: string
  dateOfShipment: string
  cargoDescription: string
  grossWeight: number
  weightUnit: 'kg' | 'lbs' | 'mt'
  numberOfPackages: number
  packageType: string
  containerNumber: string | null
  sealNumber: string | null
  freightCharges: number
  freightPayableAt: 'origin' | 'destination'
  declaredValue: number
  blockchainHash: string
  status: 'draft' | 'issued' | 'verified' | 'transferred' | 'surrendered' | 'revoked'
  validationStatus: 'pending' | 'valid' | 'invalid' | 'flagged'
  validationNotes: string[]
  createdAt: string
  updatedAt: string
  fee: number
}

export interface ShippingQuoteRequest {
  id: string
  originPort: string
  destinationPort: string
  cargoType: string
  weight: number
  volume: number
  dangerous: boolean
  perishable: boolean
  requestDate: string
  status: 'pending' | 'quoted' | 'accepted' | 'rejected'
  quotes: ShippingQuote[]
}

export interface ShippingQuote {
  id: string
  requestId: string
  carrier: string
  price: number
  transitTime: number
  validUntil: string
  notes: string
}

// Maritime Legal & Compliance Types
export interface LegalConsultant {
  id: string
  name: string
  title: string
  specialization: string[]
  jurisdiction: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  available: boolean
  avatar: string
  bio: string
  experience: number
  email: string
  phone: string
}

export interface LegalTemplate {
  id: string
  name: string
  category: 'charterparty' | 'bol' | 'nvocc' | 'contract' | 'compliance'
  description: string
  downloadUrl: string
  premium: boolean
  downloads: number
}

export interface LegalService {
  id: string
  type: 'contract_review' | 'compliance_consulting' | 'dispute_resolution' | 'advisory'
  title: string
  description: string
  price: number
  duration: string
}

export interface LegalResource {
  id: string
  title: string
  type: 'article' | 'checklist' | 'guide' | 'framework'
  category: string
  summary: string
  url: string
  premium: boolean
  publishDate: string
}

// Security & Enforcement Hotline Types
export interface SecurityReport {
  id: string
  type: 'fraud' | 'piracy' | 'missing_shipment' | 'fake_documents' | 'scam' | 'other'
  urgency: 'low' | 'medium' | 'high' | 'critical'
  agency: 'maritime_police' | 'efcc' | 'coast_guard'
  title: string
  description: string
  location: string
  coordinates?: { lat: number; lng: number }
  evidence: string[]
  reporterContact: {
    name: string
    email: string
    phone: string
    anonymous: boolean
  }
  status: 'submitted' | 'acknowledged' | 'investigating' | 'resolved' | 'closed'
  caseNumber: string
  createdAt: string
  updatedAt: string
}

export interface SecurityContact {
  agency: string
  name: string
  phone: string
  email: string
  region: string
  available24x7: boolean
}

// AI Arbitration & Dispute Resolution Types
export interface DisputeCase {
  id: string
  caseNumber: string
  type: 'shipment_delay' | 'cargo_damage' | 'cargo_loss' | 'payment_dispute' | 'contract_breach' | 'documentation'
  complainantId: string
  complainantName: string
  respondentId: string
  respondentName: string
  transactionId?: string
  bolNumber?: string
  description: string
  claimAmount: number
  evidence: {
    id: string
    name: string
    type: string
    url: string
  }[]
  status: 'submitted' | 'ai_analysis' | 'under_review' | 'mediation' | 'resolved' | 'escalated'
  aiAnalysis?: {
    breachEvaluation: string
    liabilityScore: number
    riskScore: number
    settlementRecommendation: string
    deviationReport: string
    confidenceLevel: number
    analyzedAt: string
  }
  resolution?: {
    outcome: string
    settlementAmount: number
    terms: string
    resolvedAt: string
  }
  createdAt: string
  updatedAt: string
}

// Maritime Equipment & Warehouse Marketplace Types
export interface MarketplaceListing {
  id: string
  sellerId: string
  sellerName: string
  sellerRating: number
  category: 'equipment' | 'warehouse' | 'container' | 'crane' | 'spare_parts' | 'repairs' | 'insurance' | 'vessel'
  title: string
  description: string
  price: number
  priceType: 'fixed' | 'negotiable' | 'per_day' | 'per_month'
  currency: string
  images: string[]
  location: {
    country: string
    city: string
    port?: string
    coordinates?: { lat: number; lng: number }
  }
  bolImage?: string // URL or base64 of the Bill of Lading image
  specifications: Record<string, string>
  condition: 'new' | 'like_new' | 'good' | 'fair' | 'used'
  availability: 'available' | 'pending' | 'sold' | 'rented'
  bolRequired: boolean
  bolNumber?: string
  bolVerified: boolean
  featured: boolean
  views: number
  inquiries: number
  createdAt: string
  updatedAt: string
}

export interface SellerProfile {
  id: string
  businessName: string
  email: string
  phone: string
  country: string
  verified: boolean
  rating: number
  totalSales: number
  memberSince: string
  listings: number
  responseRate: number
  responseTime: string
}

export interface PurchaseRequest {
  id: string
  listingId: string
  buyerId: string
  buyerName: string
  sellerId: string
  sellerName: string
  message: string
  bolNumber?: string
  verificationStatus: 'pending' | 'verified' | 'failed' | 'flagged'
  aiValidation?: {
    bolValid: boolean
    ownershipVerified: boolean
    originVerified: boolean
    destinationVerified: boolean
    inconsistencies: string[]
    riskLevel: 'low' | 'medium' | 'high'
    validatedAt: string
  }
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'disputed'
  paymentStatus: 'unpaid' | 'escrow' | 'released' | 'refunded'
  createdAt: string
  updatedAt: string
}

// Knowledge & Guidance Types
export interface KnowledgeResource {
  id: string
  title: string
  type: 'pdf' | 'guide' | 'policy' | 'training' | 'external_link'
  category: 'imo' | 'customs' | 'ais' | 'safety' | 'compliance' | 'operations'
  description: string
  url: string
  fileSize?: string
  pages?: number
  externalSource?: string
  createdAt: string
  updatedAt: string
}

// Platform stats and metrics
export interface PlatformStats {
  totalVesselsTracked: number
  totalBolsIssued: number
  totalDisputes: number
  resolvedDisputes: number
  marketplaceListings: number
  activeSellers: number
  totalTransactions: number
}
