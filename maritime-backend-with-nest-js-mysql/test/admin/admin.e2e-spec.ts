import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import request from 'supertest'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AdminController } from 'src/modules/admin/admin.controller'
import { AdminService } from 'src/modules/admin/admin.service'
import { JwtStrategy } from 'src/modules/auth/jwt.strategy'

import { TEST_JWT_SECRET, tokens, testUsers, testListing, generateTestToken } from '../setup'

// ── Mock AdminService ──────────────────────────────────────────────────────────

const mockAdminService = {
  getDashboardStats:   jest.fn(),
  getAllUsers:         jest.fn(),
  getUserStats:        jest.fn(),
  getUserById:         jest.fn(),
  updateUserRole:      jest.fn(),
  suspendUser:         jest.fn(),
  deleteUser:          jest.fn(),
  getListings:         jest.fn(),
  getListingsByStatus: jest.fn(),
  getListingStats:     jest.fn(),
  approveListing:      jest.fn(),
  rejectListing:       jest.fn(),
  getKycPending:       jest.fn(),
  getKycList:          jest.fn(),
  getKycStats:         jest.fn(),
  approveKyc:          jest.fn(),
  rejectKyc:           jest.fn(),
  getAuditLogs:        jest.fn(),
  getAllTransactions:   jest.fn(),
  getFraudFlags:       jest.fn(),
  updateUserSubscription: jest.fn(),
}

describe('Admin (e2e)', () => {
  let app: INestApplication

  // Non-admin user token (buyer)
  const buyerToken  = tokens.buyer
  const adminToken  = tokens.admin

  // Executive role token
  const execToken = generateTestToken({
    id:    'exec-uuid-0001',
    email: 'exec@ontimetest.com',
    role:  'executive',
  })

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
      controllers: [AdminController],
      providers: [
        JwtStrategy,
        { provide: AdminService, useValue: mockAdminService },
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => { await app.close() })
  beforeEach(() => { jest.clearAllMocks() })

  // ── POST /admin/listings/:id/approve ───────────────────────────────────────

  describe('POST /admin/listings/:id/approve', () => {
    const listingId = testListing.id

    it('200 — admin can approve a listing', async () => {
      mockAdminService.approveListing.mockResolvedValue({
        ...testListing,
        status:      'active',
        approved_by: testUsers.admin.id,
        approved_at: new Date(),
      })

      const res = await request(app.getHttpServer())
        .post(`/admin/listings/${listingId}/approve`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(201)

      const [[calledId, calledUserId, , , calledEmail]] = mockAdminService.approveListing.mock.calls
      expect(calledId).toBe(listingId)
      expect(calledUserId).toBe(testUsers.admin.id)
      expect(calledEmail).toBe(testUsers.admin.email)
    })

    it('200 — executive role can also approve a listing', async () => {
      mockAdminService.approveListing.mockResolvedValue({
        ...testListing,
        status: 'active',
      })

      await request(app.getHttpServer())
        .post(`/admin/listings/${listingId}/approve`)
        .set('Authorization', `Bearer ${execToken}`)
        .expect(201)
    })

    it('403 — buyer role is forbidden', async () => {
      const res = await request(app.getHttpServer())
        .post(`/admin/listings/${listingId}/approve`)
        .set('Authorization', `Bearer ${buyerToken}`)
        .expect(403)

      expect(res.body.message).toMatch(/admin access required/i)
      expect(mockAdminService.approveListing).not.toHaveBeenCalled()
    })

    it('403 — seller role is forbidden', async () => {
      await request(app.getHttpServer())
        .post(`/admin/listings/${listingId}/approve`)
        .set('Authorization', `Bearer ${tokens.seller}`)
        .expect(403)

      expect(mockAdminService.approveListing).not.toHaveBeenCalled()
    })

    it('401 — unauthenticated request is rejected', async () => {
      await request(app.getHttpServer())
        .post(`/admin/listings/${listingId}/approve`)
        .expect(401)

      expect(mockAdminService.approveListing).not.toHaveBeenCalled()
    })
  })

  // ── GET /admin/stats ───────────────────────────────────────────────────────

  describe('GET /admin/stats', () => {
    it('200 — admin can fetch dashboard stats', async () => {
      mockAdminService.getDashboardStats.mockResolvedValue({
        totalUsers: 100,
        totalListings: 50,
        totalTransactions: 30,
      })

      const res = await request(app.getHttpServer())
        .get('/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      expect(res.body).toHaveProperty('totalUsers')
    })

    it('403 — buyer cannot access admin stats', async () => {
      await request(app.getHttpServer())
        .get('/admin/stats')
        .set('Authorization', `Bearer ${buyerToken}`)
        .expect(403)
    })

    it('401 — unauthenticated access returns 401', async () => {
      await request(app.getHttpServer())
        .get('/admin/stats')
        .expect(401)
    })
  })

  // ── GET /admin/users ───────────────────────────────────────────────────────

  describe('GET /admin/users', () => {
    it('200 — admin can list all users', async () => {
      mockAdminService.getAllUsers.mockResolvedValue({
        users: [testUsers.buyer, testUsers.seller],
        total: 2,
      })

      const res = await request(app.getHttpServer())
        .get('/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)

      expect(res.body).toHaveProperty('users')
      expect(res.body).toHaveProperty('total')
    })

    it('403 — non-admin cannot list users', async () => {
      await request(app.getHttpServer())
        .get('/admin/users')
        .set('Authorization', `Bearer ${buyerToken}`)
        .expect(403)
    })
  })
})
