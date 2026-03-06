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
} from '@nestjs/common'
import { Request, Response } from 'express'
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
  async initialize(@Body() dto: InitializePaymentDto) {
    const result = await this.paymentsService.initializePayment(
      dto.email,
      dto.amount,
      dto.metadata ?? {},
    )
    return {
      authorization_url: result.authorization_url,
      reference: result.reference,
      access_code: result.access_code,
    }
  }

  // ─── GET /payments/verify/:reference ──────────────────────────────────────
  // Protected: only authenticated users can verify
  @Get('verify/:reference')
  @UseGuards(JwtAuthGuard)
  async verify(@Param('reference') reference: string) {
    const data = await this.paymentsService.verifyPayment(reference)
    return { status: 'success', message: 'Payment verified', data }
  }

  // ─── POST /payments/webhook ────────────────────────────────────────────────
  // Public: called directly by Paystack — must return 200 quickly
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async webhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['x-paystack-signature'] as string

    // rawBody is attached by the verify callback in main.ts
    const rawBody: string = (req as any).rawBody ?? ''

    if (!this.paymentsService.validateWebhookSignature(rawBody, signature)) {
      throw new UnauthorizedException('Invalid webhook signature')
    }

    const { event, data } = req.body as { event: string; data: any }

    // Respond immediately — process async so Paystack gets its 200 fast
    res.json({ received: true })

    // Process after response is sent
    this.paymentsService.handleWebhookEvent(event, data).catch(() => {
      // Already logged inside the service
    })
  }
}
