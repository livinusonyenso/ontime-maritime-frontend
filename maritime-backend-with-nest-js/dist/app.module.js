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
const app_controller_1 = require("./app.controller");
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
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map