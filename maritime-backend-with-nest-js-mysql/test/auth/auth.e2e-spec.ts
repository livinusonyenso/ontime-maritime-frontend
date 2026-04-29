import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from 'src/modules/auth/auth.controller'
import { AuthService } from 'src/modules/auth/auth.service'
import { JwtStrategy } from 'src/modules/auth/jwt.strategy'
import { PrismaService } from 'src/prisma/prisma.service'
import { MailService } from 'src/modules/notifications/mail.service'

import { createPrismaMock, PrismaMock } from '../mocks/prisma.mock'
import { TEST_JWT_SECRET } from '../setup'

describe('Auth (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaMock
  let mailService: { sendOtpEmail: jest.Mock; sendWelcomeEmail: jest.Mock }

  beforeAll(async () => {
    prisma = createPrismaMock()
    mailService = {
      sendOtpEmail:    jest.fn().mockResolvedValue(true),
      sendWelcomeEmail: jest.fn().mockResolvedValue(true),
    }

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        PassportModule,
        JwtModule.register({
          secret: TEST_JWT_SECRET,
          signOptions: { expiresIn: '15m' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        { provide: PrismaService, useValue: prisma },
        { provide: MailService, useValue: mailService },
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => { await app.close() })
  beforeEach(() => { jest.clearAllMocks() })

  // ── POST /auth/signup ──────────────────────────────────────────────────────

  describe('POST /auth/signup', () => {
    const validPayload = {
      email:    'newuser@ontimetest.com',
      phone:    '+2348012345678',
      password: 'SecurePass1!',
      role:     'buyer',
    }

    it('201 — creates pending registration and sends OTP email', async () => {
      prisma.user.findFirst.mockResolvedValue(null)
      prisma.pendingRegistration.deleteMany.mockResolvedValue({ count: 0 })
      prisma.pendingRegistration.create.mockResolvedValue({
        id:         'pending-uuid-test',
        otp_code:   '123456',
        expires_at: new Date(Date.now() + 600_000),
        ...validPayload,
      })

      const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(validPayload)
        .expect(201)

      expect(res.body).toHaveProperty('pendingId', 'pending-uuid-test')
      expect(res.body).toHaveProperty('message')
      expect(mailService.sendOtpEmail).toHaveBeenCalledTimes(1)
      expect(mailService.sendOtpEmail).toHaveBeenCalledWith(validPayload.email, expect.any(String))
    })

    it('400 — rejects duplicate email / phone', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'existing-user', email: validPayload.email })

      const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(validPayload)
        .expect(400)

      expect(res.body.message).toMatch(/already exists/i)
    })

    it('400 — rejects weak password (no special char)', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ ...validPayload, password: 'NoSpecial1' })
        .expect(400)
    })

    it('400 — rejects missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'incomplete@test.com' })
        .expect(400)
    })

    it('400 — rejects invalid Nigerian phone format', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ ...validPayload, phone: '12345' })
        .expect(400)
    })
  })

  // ── POST /auth/verify-otp ──────────────────────────────────────────────────

  describe('POST /auth/verify-otp', () => {
    const PENDING_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' // valid UUID
    const OTP        = '654321'

    const mockPending = {
      id:               PENDING_ID,
      email:            'newuser@ontimetest.com',
      phone:            '+2348012345678',
      password_hash:    '$2a$10$fakehash',
      role:             'buyer',
      otp_code:         OTP,
      expires_at:       new Date(Date.now() + 300_000),
      company_name:     null,
      business_address: null,
      website:          null,
    }

    const mockCreatedUser = {
      id:                   'user-uuid-new',
      email:                mockPending.email,
      phone:                mockPending.phone,
      role:                 'buyer',
      is_email_verified:    true,
      is_phone_verified:    true,
      password_hash:        mockPending.password_hash,
      refresh_token:        null,
      refresh_token_expiry: null,
      failed_login_attempts: 0,
      lock_until:           null,
      subscription_status:  'free',
      subscription_expiry:  null,
      company_name:         null,
      business_address:     null,
      website:              null,
      created_at:           new Date(),
      updated_at:           new Date(),
    }

    it('201 — valid OTP creates user and returns access_token', async () => {
      prisma.pendingRegistration.findFirst.mockResolvedValue(mockPending)
      prisma.user.create.mockResolvedValue(mockCreatedUser)
      prisma.pendingRegistration.delete.mockResolvedValue(mockPending)
      prisma.user.update.mockResolvedValue({
        ...mockCreatedUser,
        refresh_token:        'hashed-refresh',
        refresh_token_expiry: new Date(Date.now() + 7 * 86_400_000),
      })

      const res = await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ pendingId: PENDING_ID, otp: OTP })
        .expect(201)

      expect(res.body).toHaveProperty('access_token')
      expect(res.body).toHaveProperty('user')
      expect(res.body.user).not.toHaveProperty('password_hash')
      expect(res.body.user).not.toHaveProperty('refresh_token')
      expect(res.body.user.email).toBe(mockPending.email)
    })

    it('400 — invalid OTP returns error', async () => {
      prisma.pendingRegistration.findFirst.mockResolvedValue(null) // OTP mismatch

      const res = await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ pendingId: PENDING_ID, otp: '000000' })
        .expect(400)

      expect(res.body.message).toMatch(/invalid or expired/i)
    })

    it('400 — expired pending registration is rejected', async () => {
      prisma.pendingRegistration.findFirst.mockResolvedValue(null) // expired_at check in query

      await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ pendingId: PENDING_ID, otp: OTP })
        .expect(400)
    })

    it('400 — pendingId must be a valid UUID', async () => {
      await request(app.getHttpServer())
        .post('/auth/verify-otp')
        .send({ pendingId: 'not-a-uuid', otp: OTP })
        .expect(400)
    })
  })
})
