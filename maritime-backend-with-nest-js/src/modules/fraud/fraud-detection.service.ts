import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class FraudDetectionService {
  constructor(private prisma: PrismaService) {}

  async checkUserFraudScore(userId: string): Promise<number> {
    const flags = await this.prisma.fraudFlag.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 100,
    })

    const now = Date.now()
    let score = 0

    for (const flag of flags) {
      const ageInDays = (now - flag.created_at.getTime()) / (1000 * 60 * 60 * 24)
      const decay = Math.max(0, 1 - ageInDays / 30)
      score += flag.severity * decay
    }

    return Math.min(score, 100)
  }

  async flagSuspiciousActivity(
    userId: string,
    trigger: string,
    severity: number,
    metadata?: any,
  ): Promise<void> {
    await this.prisma.fraudFlag.create({
      data: {
        user_id: userId,
        trigger,
        severity: Math.min(severity, 10),
        metadata: metadata || {},
      },
    })
  }

  async checkDuplicateDocuments(documentHash: string): Promise<boolean> {
    const existing = await this.prisma.document.findFirst({
      where: { qr_hash: documentHash },
    })
    return !!existing
  }

  async checkMultipleAccountsFromEmail(email: string): Promise<number> {
    const count = await this.prisma.user.count({
      where: { email },
    })
    return count
  }

  async checkMultipleAccountsFromPhone(phone: string): Promise<number> {
    const count = await this.prisma.user.count({
      where: { phone },
    })
    return count
  }

  async checkKycMismatch(userId: string, kycData: any): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) return false

    const kyc = await this.prisma.kyc.findFirst({
      where: { user_id: userId, status: 'approved' },
    })

    if (kyc && kycData.phone && kycData.phone !== user.phone) {
      return true
    }

    return false
  }

  async checkTransactionVelocity(userId: string, threshold = 5): Promise<boolean> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    const recentTransactions = await this.prisma.transaction.count({
      where: {
        buyer_id: userId,
        created_at: { gte: oneHourAgo },
      },
    })

    return recentTransactions > threshold
  }
}
