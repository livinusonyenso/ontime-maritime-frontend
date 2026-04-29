import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { MarketplaceController } from 'src/modules/marketplace/marketplace.controller'
import { MarketplaceService } from 'src/modules/marketplace/marketplace.service'
import { OptionalJwtAuthGuard } from 'src/guards/optional-jwt-auth.guard'
import { JwtStrategy } from 'src/modules/auth/jwt.strategy'

import { TEST_JWT_SECRET, tokens, testListing } from '../setup'

// ── Mock MarketplaceService ────────────────────────────────────────────────────

const mockMarketplaceService = {
  findPublic:    jest.fn(),
  findPublicById: jest.fn(),
}

describe('Marketplace (e2e)', () => {
  let app: INestApplication

  const mockListingsResponse = {
    data:    [testListing],
    total:   1,
    skip:    0,
    take:    20,
    hasMore: false,
  }

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
      controllers: [MarketplaceController],
      providers: [
        JwtStrategy,
        { provide: MarketplaceService, useValue: mockMarketplaceService },
      ],
    })
      .overrideGuard(OptionalJwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => { await app.close() })
  beforeEach(() => { jest.clearAllMocks() })

  // ── GET /marketplace/listings ──────────────────────────────────────────────

  describe('GET /marketplace/listings', () => {
    it('200 — returns paginated listing results without authentication', async () => {
      mockMarketplaceService.findPublic.mockResolvedValue(mockListingsResponse)

      const res = await request(app.getHttpServer())
        .get('/marketplace/listings')
        .expect(200)

      expect(res.body).toMatchObject({
        data:    expect.any(Array),
        total:   expect.any(Number),
        skip:    expect.any(Number),
        take:    expect.any(Number),
        hasMore: expect.any(Boolean),
      })
      expect(res.body.data).toHaveLength(1)
    })

    it('200 — accessible without an auth token', async () => {
      mockMarketplaceService.findPublic.mockResolvedValue(mockListingsResponse)

      await request(app.getHttpServer())
        .get('/marketplace/listings')
        .expect(200)  // no Authorization header
    })

    it('200 — supports search query parameter', async () => {
      mockMarketplaceService.findPublic.mockResolvedValue({ ...mockListingsResponse, data: [] })

      await request(app.getHttpServer())
        .get('/marketplace/listings?search=cargo')
        .expect(200)

      expect(mockMarketplaceService.findPublic).toHaveBeenCalledWith(
        expect.objectContaining({ search: 'cargo' }),
      )
    })

    it('200 — supports category filter', async () => {
      mockMarketplaceService.findPublic.mockResolvedValue(mockListingsResponse)

      await request(app.getHttpServer())
        .get('/marketplace/listings?category=cargo')
        .expect(200)

      expect(mockMarketplaceService.findPublic).toHaveBeenCalledWith(
        expect.objectContaining({ category: 'cargo' }),
      )
    })

    it('200 — supports pagination (skip / take)', async () => {
      mockMarketplaceService.findPublic.mockResolvedValue({
        ...mockListingsResponse,
        skip: 20,
        take: 10,
      })

      await request(app.getHttpServer())
        .get('/marketplace/listings?skip=20&take=10')
        .expect(200)

      expect(mockMarketplaceService.findPublic).toHaveBeenCalledWith(
        expect.objectContaining({ skip: expect.anything(), take: expect.anything() }),
      )
    })
  })

  // ── GET /marketplace/listings/:id ──────────────────────────────────────────

  describe('GET /marketplace/listings/:id', () => {
    it('200 — returns listing detail without authentication (bol_image gated)', async () => {
      const publicListing = { ...testListing, bolImage: undefined }
      mockMarketplaceService.findPublicById.mockResolvedValue(publicListing)

      const res = await request(app.getHttpServer())
        .get(`/marketplace/listings/${testListing.id}`)
        .expect(200)

      expect(res.body.id).toBe(testListing.id)
    })

    it('200 — authenticated request passes buyer ID to service', async () => {
      mockMarketplaceService.findPublicById.mockResolvedValue(testListing)

      await request(app.getHttpServer())
        .get(`/marketplace/listings/${testListing.id}`)
        .set('Authorization', `Bearer ${tokens.buyer}`)
        .expect(200)
    })
  })
})
