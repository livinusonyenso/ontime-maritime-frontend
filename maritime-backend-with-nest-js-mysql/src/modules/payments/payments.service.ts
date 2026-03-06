import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'
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

  async initializePayment(email: string, amount: number, metadata: Record<string, any> = {}) {
    // Paystack expects amount in kobo (smallest currency unit)
    // amount here is in USD cents — or your app's base unit; document accordingly.
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
          // Cast to `any` until `npx prisma migrate dev` regenerates the client
          // with the gateway_reference / paid_at columns.
          await (this.prisma.transaction as any).updateMany({
            where: { gateway_reference: reference },
            data: {
              payout_status: 'completed',
              paid_at: new Date(),
            },
          })
          this.logger.log(`Webhook charge.success processed for reference: ${reference}`)
        } catch (err) {
          // Log but don't throw — Paystack requires a fast 200 response
          this.logger.error(`Failed to update transaction for reference ${reference}`, err)
        }
      }
    }

    return { received: true }
  }
}
