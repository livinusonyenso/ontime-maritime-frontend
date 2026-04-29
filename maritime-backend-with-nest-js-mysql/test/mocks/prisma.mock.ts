/**
 * Factory that returns a fresh Prisma mock for each test suite.
 * Call createPrismaMock() in beforeAll, then jest.clearAllMocks() in beforeEach.
 */
export function createPrismaMock() {
  return {
    user: {
      findFirst:  jest.fn(),
      findUnique: jest.fn(),
      findMany:   jest.fn(),
      create:     jest.fn(),
      update:     jest.fn(),
      delete:     jest.fn(),
      count:      jest.fn(),
    },
    pendingRegistration: {
      findFirst:  jest.fn(),
      findUnique: jest.fn(),
      deleteMany: jest.fn(),
      create:     jest.fn(),
      delete:     jest.fn(),
    },
    listing: {
      findFirst:  jest.fn(),
      findUnique: jest.fn(),
      findMany:   jest.fn(),
      create:     jest.fn(),
      update:     jest.fn(),
      delete:     jest.fn(),
      count:      jest.fn(),
    },
    auditLog: {
      create:   jest.fn(),
      findMany: jest.fn(),
    },
    kyc: {
      findFirst: jest.fn(),
      findMany:  jest.fn(),
      create:    jest.fn(),
      update:    jest.fn(),
      count:     jest.fn(),
    },
    bolUnlock: {
      findFirst: jest.fn(),
      create:    jest.fn(),
    },
    transaction: {
      findMany:   jest.fn(),
      findUnique: jest.fn(),
      count:      jest.fn(),
    },
    $transaction: jest.fn((fn: any) => (typeof fn === 'function' ? fn({}) : Promise.resolve(fn))),
    $connect:    jest.fn(),
    $disconnect: jest.fn(),
  }
}

export type PrismaMock = ReturnType<typeof createPrismaMock>
