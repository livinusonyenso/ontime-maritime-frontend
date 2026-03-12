import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common'
import { Request as ExpressRequest, Response } from 'express'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'
import { PaymentsService } from './payments.service'
import { InitializePaymentDto } from './dto/initialize-payment.dto'

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // ─── POST /payments/initialize ─────────────────────────────────────────────
  // Protected: only authenticated users can start a payment
  @Post('initialize')
  @UseGuards(JwtAuthGuard)
  async initialize(@Req() req: ExpressRequest, @Body() dto: InitializePaymentDto) {
    const buyerId: string | undefined = (req as any).user?.id
    const result = await this.paymentsService.initializePayment(
      dto.email,
      dto.amount,
      dto.metadata ?? {},
      buyerId,
    )
    return {
      authorization_url: result.authorization_url,
      reference: result.reference,
      access_code: result.access_code,
    }
  }

  // ─── POST /payments/bol-unlock/:listingId ─────────────────────────────────
  // Protected: initializes a BOL unlock Paystack payment
  @Post('bol-unlock/:listingId')
  @UseGuards(JwtAuthGuard)
  async initializeBolUnlock(
    @Req() req: ExpressRequest,
    @Param('listingId') listingId: string,
    @Body() body: { callbackUrl?: string },
  ) {
    const buyerId: string | undefined = (req as any).user?.id
    if (!buyerId) throw new ForbiddenException('Authentication required')

    const result = await this.paymentsService.initializeBolUnlock(listingId, buyerId, body?.callbackUrl)
    return {
      authorization_url: result.authorization_url,
      reference: result.reference,
      access_code: result.access_code,
    }
  }

  // ─── GET /payments/verify/:reference ──────────────────────────────────────
  // Public: the Paystack reference is the proof of payment — no auth required.
  // This prevents 401 errors on the callback page from wiping the user's session.
  @Get('verify/:reference')
  async verify(@Param('reference') reference: string) {
    const data = await this.paymentsService.verifyPayment(reference)
    return { status: 'success', message: 'Payment verified', data }
  }

  // ─── POST /payments/webhook ────────────────────────────────────────────────
  // Public: called directly by Paystack — must return 200 quickly
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async webhook(@Req() req: ExpressRequest, @Res() res: Response) {
    const signature = req.headers['x-paystack-signature'] as string

    // rawBody is attached by the verify callback in main.ts
    const rawBody: string = (req as any).rawBody ?? ''

    if (!this.paymentsService.validateWebhookSignature(rawBody, signature)) {
      throw new UnauthorizedException('Invalid webhook signature')
    }

    const body = req.body as unknown as { event: string; data: any }
    const { event, data } = body

    // Respond immediately — process async so Paystack gets its 200 fast
    res.json({ received: true })

    // Process after response is sent
    this.paymentsService.handleWebhookEvent(event, data).catch(() => {
      // Already logged inside the service
    })
  }
}
