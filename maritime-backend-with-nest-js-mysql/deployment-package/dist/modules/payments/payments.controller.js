"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../guards/jwt-auth.guard");
const payments_service_1 = require("./payments.service");
const initialize_payment_dto_1 = require("./dto/initialize-payment.dto");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async initialize(req, dto) {
        const buyerId = req.user?.id;
        const result = await this.paymentsService.initializePayment(dto.email, dto.amount, dto.metadata ?? {}, buyerId);
        return {
            authorization_url: result.authorization_url,
            reference: result.reference,
            access_code: result.access_code,
        };
    }
    async initializeBolUnlock(req, listingId, body) {
        const buyerId = req.user?.id;
        if (!buyerId)
            throw new common_1.ForbiddenException('Authentication required');
        const result = await this.paymentsService.initializeBolUnlock(listingId, buyerId, body?.callbackUrl);
        return {
            authorization_url: result.authorization_url,
            reference: result.reference,
            access_code: result.access_code,
        };
    }
    async verify(reference) {
        const data = await this.paymentsService.verifyPayment(reference);
        return { status: 'success', message: 'Payment verified', data };
    }
    async webhook(req, res) {
        const signature = req.headers['x-paystack-signature'];
        const rawBody = req.rawBody ?? '';
        if (!this.paymentsService.validateWebhookSignature(rawBody, signature)) {
            throw new common_1.UnauthorizedException('Invalid webhook signature');
        }
        const body = req.body;
        const { event, data } = body;
        res.json({ received: true });
        this.paymentsService.handleWebhookEvent(event, data).catch(() => {
        });
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('initialize'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, initialize_payment_dto_1.InitializePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initialize", null);
__decorate([
    (0, common_1.Post)('bol-unlock/:listingId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('listingId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initializeBolUnlock", null);
__decorate([
    (0, common_1.Get)('verify/:reference'),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "webhook", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map