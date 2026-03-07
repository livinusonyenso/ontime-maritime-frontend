import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'
import { TransactionType, PayoutStatus } from '@prisma/client'
import axios from 'axios'
import * as crypto from 'crypto'

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)
  private readonly paystackBaseUrl: string
  private readonly secretKey: string

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.paystackBaseUrl = this.config.get<string>('PAYSTACK_BASE_URL') || 'https://api.paystack.co'
    this.secretKey = this.config.get<string>('PAYSTACK_SECRET_KEY') || ''
  }

  // ─── Initialize Payment ────────────────────────────────────────────────────

  async initializePayment(
    email: string,
    amount: number,
    metadata: Record<string, any> = {},
    buyerId?: string,
  ) {
    // Paystack expects amount in kobo (smallest currency unit)
    const response = await axios.post(
      `${this.paystackBaseUrl}/transaction/initialize`,
      { email, amount, metadata, currency: 'NGN' },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      },
    )

    const { authorization_url, reference, access_code } = response.data.data

    // Persist a pending Transaction record so the webhook can update it later
    if (buyerId && metadata?.listingId) {
      try {
        const listing = await this.prisma.listing.findUnique({
          where: { id: metadata.listingId },
        })

        if (listing) {
          // amount is in kobo → convert to base unit (NGN)
          const amountNGN = amount / 100

          await this.prisma.transaction.create({
            data: {
              buyer_id: buyerId,
              seller_id: listing.seller_id,
              listing_id: listing.id,
              amount: amountNGN,
              commission_amount: amountNGN * 0.05,
              transaction_type: TransactionType.buy_now,
              payout_status: PayoutStatus.pending,
              payment_gateway: 'paystack',
              gateway_reference: reference,
              buyer_email: email,
              payment_status: 'pending',
            },
          })

          this.logger.log(`Transaction created for reference: ${reference}`)
        }
      } catch (err) {
        // Log but don't block payment — the webhook will handle recovery
        this.logger.error('Failed to create transaction record during initialization', err)
      }
    }

    return { authorization_url, reference, access_code }
  }

  // ─── Verify Payment ────────────────────────────────────────────────────────

  async verifyPayment(reference: string) {
    const response = await axios.get(
      `${this.paystackBaseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${this.secretKey}` },
      },
    )

    const data = response.data.data

    if (data.status !== 'success') {
      throw new BadRequestException(`Payment not successful. Status: ${data.status}`)
    }

    // Sync the transaction status in DB if it exists
    try {
      await this.prisma.transaction.updateMany({
        where: { gateway_reference: reference },
        data: {
          payout_status: PayoutStatus.completed,
          payment_status: 'success',
          paid_at: new Date(),
        },
      })
    } catch (err) {
      this.logger.warn(`Could not update transaction on verify for ref ${reference}`, err)
    }

    return data
  }

  // ─── Validate Webhook Signature ────────────────────────────────────────────

  validateWebhookSignature(rawPayload: string, signature: string): boolean {
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(rawPayload)
      .digest('hex')
    return hash === signature
  }

  // ─── Handle Webhook Event ──────────────────────────────────────────────────

  async handleWebhookEvent(event: string, data: any): Promise<{ received: boolean }> {
    if (event === 'charge.success') {
      const reference: string = data?.reference

      if (reference) {
        try {
          await (this.prisma.transaction as any).updateMany({
            where: { gateway_reference: reference },
            data: {
              payout_status: PayoutStatus.completed,
              payment_status: 'success',
              paid_at: new Date(),
            },
          })
          this.logger.log(`Webhook charge.success processed for reference: ${reference}`)
        } catch (err) {
          this.logger.error(`Failed to update transaction for reference ${reference}`, err)
        }
      }
    }

    return { received: true }
  }
}
