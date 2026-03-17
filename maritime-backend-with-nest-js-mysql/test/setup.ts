import { JwtService } from '@nestjs/jwt'

export const TEST_JWT_SECRET = 'ontime-secret-key'

// ── Token factory ─────────────────────────────────────────────────────────────

const jwtService = new JwtService({})

export function generateTestToken(user: {
  id: string
  email: string
  role: string
}): string {
  return jwtService.sign(
    { sub: user.id, email: user.email, role: user.role },
    { secret: TEST_JWT_SECRET, expiresIn: '1h' },
  )
}

// ── Seed users ────────────────────────────────────────────────────────────────

export const testUsers = {
  buyer: {
    id:                   'buyer-uuid-0001',
    email:                'buyer@ontimetest.com',
    phone:                '+2348011111111',
    role:                 'buyer',
    password_hash:        '$2a$10$testhashedpassword',
    is_email_verified:    true,
    is_phone_verified:    true,
    subscription_status:  'free',
    subscription_expiry:  null,
    failed_login_attempts: 0,
    lock_until:           null,
    refresh_token:        null,
    refresh_token_expiry: null,
    created_at:           new Date('2024-01-01'),
    updated_at:           new Date('2024-01-01'),
  },
  seller: {
    id:                   'seller-uuid-0001',
    email:                'seller@ontimetest.com',
    phone:                '+2348022222222',
    role:                 'seller',
    password_hash:        '$2a$10$testhashedpassword',
    is_email_verified:    true,
    is_phone_verified:    true,
    subscription_status:  'free',
    subscription_expiry:  null,
    failed_login_attempts: 0,
    lock_until:           null,
    refresh_token:        null,
    refresh_token_expiry: null,
    created_at:           new Date('2024-01-01'),
    updated_at:           new Date('2024-01-01'),
  },
  admin: {
    id:                   'admin-uuid-0001',
    email:                'admin@ontimetest.com',
    phone:                '+2348033333333',
    role:                 'admin',
    password_hash:        '$2a$10$testhashedpassword',
    is_email_verified:    true,
    is_phone_verified:    true,
    subscription_status:  'pro',
    subscription_expiry:  null,
    failed_login_attempts: 0,
    lock_until:           null,
    refresh_token:        null,
    refresh_token_expiry: null,
    created_at:           new Date('2024-01-01'),
    updated_at:           new Date('2024-01-01'),
  },
}

// ── Tokens (pre-signed for convenience) ──────────────────────────────────────

export const tokens = {
  buyer:  generateTestToken(testUsers.buyer),
  seller: generateTestToken(testUsers.seller),
  admin:  generateTestToken(testUsers.admin),
}

// ── Seed listing ──────────────────────────────────────────────────────────────

export const testListing = {
  id:           'listing-uuid-0001',
  seller_id:    testUsers.seller.id,
  category:     'cargo',
  title:        'Test Cargo Listing',
  description:  'A test description long enough to pass validation requirements.',
  price_usd:    15000,
  price_type:   'fixed',
  currency:     'USD',
  condition:    'good',
  availability: 'available',
  status:       'active',
  bol_verified: false,
  featured:     false,
  views:        0,
  inquiries:    0,
  created_at:   new Date('2024-01-15'),
  updated_at:   new Date('2024-01-15'),
}
