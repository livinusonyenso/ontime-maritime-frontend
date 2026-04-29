import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { ListingsController } from 'src/modules/listings/listings.controller'
import { ListingsService } from 'src/modules/listings/listings.service'
import { JwtStrategy } from 'src/modules/auth/jwt.strategy'

import { TEST_JWT_SECRET, tokens, testUsers, testListing } from '../setup'

// ── Mock ListingsService (avoids wiring Prisma / ExecutiveCorner / Fraud) ──────

const mockListingsService = {
  create:         jest.fn(),
  findAll:        jest.fn(),
  findById:       jest.fn(),
  search:         jest.fn(),
  findByCategory: jest.fn(),
  findMySeller:   jest.fn(),
  update:         jest.fn(),
  delete:         jest.fn(),
}

describe('Listings (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        PassportModule,
        JwtModule.register({
          secret: TEST_JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [ListingsController],
      providers: [
        JwtStrategy,
        { provide: ListingsService, useValue: mockListingsService },
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => { await app.close() })
  beforeEach(() => { jest.clearAllMocks() })

  // ── POST /listings ─────────────────────────────────────────────────────────

  describe('POST /listings', () => {
    const validListing = {
      category:    'cargo',
      title:       'Fresh Test Cargo Listing',
      description: 'A detailed description that is definitely long enough for validation purposes.',
      price_usd:   25000,
    }

    it('201 — authenticated user can create a listing', async () => {
      mockListingsService.create.mockResolvedValue(testListing)

      const res = await request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${tokens.seller}`)
        .send(validListing)
        .expect(201)

      expect(res.body).toHaveProperty('id')
      expect(mockListingsService.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: validListing.title }),
        testUsers.seller.id,
      )
    })

    it('401 — unauthenticated request is rejected', async () => {
      await request(app.getHttpServer())
        .post('/listings')
        .send(validListing)
        .expect(401)

      expect(mockListingsService.create).not.toHaveBeenCalled()
    })

    it('401 — invalid JWT token is rejected', async () => {
      await request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', 'Bearer not.a.real.token')
        .send(validListing)
        .expect(401)
    })

    it('400 — missing required title fails validation', async () => {
      await request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${tokens.seller}`)
        .send({ category: 'cargo', price_usd: 100 })
        .expect(400)
    })

    it('400 — price_usd must be a number', async () => {
      await request(app.getHttpServer())
        .post('/listings')
        .set('Authorization', `Bearer ${tokens.seller}`)
        .send({ ...validListing, price_usd: 'not-a-number' })
        .expect(400)
    })
  })

  // ── GET /listings ──────────────────────────────────────────────────────────

  describe('GET /listings', () => {
    it('200 — public endpoint returns listing list', async () => {
      mockListingsService.findAll.mockResolvedValue({
        listings: [testListing],
        total: 1,
      })

      const res = await request(app.getHttpServer())
        .get('/listings')
        .expect(200)

      expect(res.body).toHaveProperty('listings')
      expect(res.body).toHaveProperty('total')
      expect(Array.isArray(res.body.listings)).toBe(true)
    })

    it('200 — no auth required (public access)', async () => {
      mockListingsService.findAll.mockResolvedValue({ listings: [], total: 0 })

      await request(app.getHttpServer())
        .get('/listings')
        .expect(200)
    })
  })

  // ── GET /listings/:id ──────────────────────────────────────────────────────

  describe('GET /listings/:id', () => {
    it('200 — returns listing by id', async () => {
      mockListingsService.findById.mockResolvedValue(testListing)

      const res = await request(app.getHttpServer())
        .get(`/listings/${testListing.id}`)
        .expect(200)

      expect(res.body.id).toBe(testListing.id)
    })
  })
})
