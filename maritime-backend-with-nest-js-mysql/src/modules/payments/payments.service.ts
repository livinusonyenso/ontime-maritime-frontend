import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'
import { TransactionType, PayoutStatus } from '@prisma/client'
import axios from 'axios'
import * as crypto from 'crypto'

// BOL unlock fee in kobo (₦2,000 ≈ $20 equivalent). Override via env BOL_UNLOCK_PRICE_KOBO.
const DEFAULT_BOL_PRICE_KOBO = 200_000

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)
  private readonly paystackBaseUrl: string
  private readonly secretKey: string
  private readonly bolUnlockPriceKobo: number

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.paystackBaseUrl = this.config.get<string>('PAYSTACK_BASE_URL') || 'https://api.paystack.co'
    this.secretKey = this.config.get<string>('PAYSTACK_SECRET_KEY') || ''
    this.bolUnlockPriceKobo = Number(this.config.get<string>('BOL_UNLOCK_PRICE_KOBO') || DEFAULT_BOL_PRICE_KOBO)
  }

  // ─── Initialize Payment (Listing Purchase) ────────────────────────────────

  async initializePayment(
    email: string,
    amount: number,
    metadata: Record<string, any> = {},
    buyerId?: string,
    callbackUrl?: string,
  ) {
    // Paystack expects amount in kobo (smallest currency unit)
    const response = await axios.post(
      `${this.paystackBaseUrl}/transaction/initialize`,
      {
        email,
        amount,
        metadata,
        currency: 'NGN',
        ...(callbackUrl ? { callback_url: callbackUrl } : {}),
      },
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

  // ─── Initialize BOL Unlock Payment ────────────────────────────────────────

  async initializeBolUnlock(listingId: string, buyerId: string, callbackUrl?: string) {
    // Look up buyer email from DB — never trust the client
    const buyer = await this.prisma.user.findUnique({
      where: { id: buyerId },
      select: { email: true },
    })

    if (!buyer) throw new BadRequestException('Buyer not found')

    // Check listing exists and has a verified BOL
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, bol_verified: true, bol_image: true },
    })

    if (!listing) throw new BadRequestException('Listing not found')
    if (!listing.bol_image) throw new BadRequestException('This listing does not have a Bill of Lading uploaded')

    // Check if already unlocked
    const existing = await this.prisma.bolUnlock.findUnique({
      where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: listingId } },
    })
    if (existing) throw new BadRequestException('You have already unlocked the BOL for this listing')

    const response = await axios.post(
      `${this.paystackBaseUrl}/transaction/initialize`,
      {
        email: buyer.email,
        amount: this.bolUnlockPriceKobo,
        currency: 'NGN',
        ...(callbackUrl ? { callback_url: callbackUrl } : {}),
        metadata: {
          type: 'bol_unlock',
          listingId,
          buyerId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
      },
    )

    const { authorization_url, reference, access_code } = response.data.data
    this.logger.log(`BOL unlock payment initialized for listing ${listingId} by buyer ${buyerId}, ref: ${reference}`)

    return { authorization_url, reference, access_code }
  }

  // ─── Check BOL Unlock Status ───────────────────────────────────────────────

  async isBolUnlocked(buyerId: string, listingId: string): Promise<boolean> {
    const record = await this.prisma.bolUnlock.findUnique({
      where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: listingId } },
    })
    return !!record
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

    // Always sync the DB regardless of outcome — never leave a transaction stuck in "pending"
    try {
      if (data.status === 'success') {
        await this.prisma.transaction.updateMany({
          where: { gateway_reference: reference },
          data: {
            payout_status: PayoutStatus.completed,
            payment_status: 'success',
            paid_at: new Date(data.paid_at ?? Date.now()),
          },
        })
      } else {
        // abandoned / failed — mark it so the buyer knows it's not pending
        await this.prisma.transaction.updateMany({
          where: { gateway_reference: reference, payment_status: 'pending' },
          data: {
            payout_status: PayoutStatus.failed,
            payment_status: data.status ?? 'failed',
          },
        })
      }
    } catch (err) {
      this.logger.warn(`Could not update transaction on verify for ref ${reference}`, err)
    }

    if (data.status !== 'success') {
      throw new BadRequestException(`Payment not successful. Status: ${data.status}`)
    }

    // For BOL unlock payments — upsert the BolUnlock record immediately so the
    // frontend can access the BOL without waiting for the async webhook.
    if (data.metadata?.type === 'bol_unlock' && data.metadata?.listingId && data.metadata?.buyerId) {
      try {
        await this.prisma.bolUnlock.upsert({
          where: {
            buyer_id_listing_id: {
              buyer_id: data.metadata.buyerId,
              listing_id: data.metadata.listingId,
            },
          },
          create: { buyer_id: data.metadata.buyerId, listing_id: data.metadata.listingId },
          update: {},
        })
        this.logger.log(`BolUnlock upserted on verify for listing ${data.metadata.listingId} buyer ${data.metadata.buyerId}`)
      } catch (err) {
        this.logger.error(`Failed to upsert BolUnlock on verify for ref ${reference}`, err)
      }
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
      const metadata: Record<string, any> = data?.metadata ?? {}

      if (metadata?.type === 'bol_unlock') {
        // BOL unlock payment — create BolUnlock record
        const { buyerId, listingId } = metadata

        if (buyerId && listingId) {
          try {
            await this.prisma.bolUnlock.upsert({
              where: { buyer_id_listing_id: { buyer_id: buyerId, listing_id: listingId } },
              create: { buyer_id: buyerId, listing_id: listingId },
              update: {}, // already exists — no-op
            })
            this.logger.log(`BOL unlocked for listing ${listingId} by buyer ${buyerId} (ref: ${reference})`)
          } catch (err) {
            this.logger.error(`Failed to create BolUnlock record for ref ${reference}`, err)
          }
        }
      } else if (reference) {
        // Regular listing purchase — update Transaction
        try {
          await this.prisma.transaction.updateMany({
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
