"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const kyc_module_1 = require("./modules/kyc/kyc.module");
const listings_module_1 = require("./modules/listings/listings.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const auctions_module_1 = require("./modules/auctions/auctions.module");
const executive_corner_module_1 = require("./modules/executive-corner/executive-corner.module");
const tracking_module_1 = require("./modules/tracking/tracking.module");
const documents_module_1 = require("./modules/documents/documents.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const admin_module_1 = require("./modules/admin/admin.module");
const ratings_module_1 = require("./modules/ratings/ratings.module");
const arbitration_module_1 = require("./modules/arbitration/arbitration.module");
const insurance_module_1 = require("./modules/insurance/insurance.module");
const vessels_module_1 = require("./modules/vessels/vessels.module");
const bol_module_1 = require("./modules/bol/bol.module");
const disputes_module_1 = require("./modules/disputes/disputes.module");
const security_module_1 = require("./modules/security/security.module");
const legal_module_1 = require("./modules/legal/legal.module");
const knowledge_module_1 = require("./modules/knowledge/knowledge.module");
const marketplace_module_1 = require("./modules/marketplace/marketplace.module");
const payments_module_1 = require("./modules/payments/payments.module");
const app_controller_1 = require("./app.controller");
const upload_module_1 = require("./modules/upload/upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                { ttl: 60_000, limit: 60 },
            ]),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            kyc_module_1.KycModule,
            listings_module_1.ListingsModule,
            transactions_module_1.TransactionsModule,
            auctions_module_1.AuctionsModule,
            executive_corner_module_1.ExecutiveCornerModule,
            tracking_module_1.TrackingModule,
            documents_module_1.DocumentsModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
            ratings_module_1.RatingsModule,
            arbitration_module_1.ArbitrationModule,
            insurance_module_1.InsuranceModule,
            upload_module_1.UploadModule,
            vessels_module_1.VesselsModule,
            bol_module_1.BolModule,
            disputes_module_1.DisputesModule,
            security_module_1.SecurityModule,
            legal_module_1.LegalModule,
            knowledge_module_1.KnowledgeModule,
            marketplace_module_1.MarketplaceModule,
            payments_module_1.PaymentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map