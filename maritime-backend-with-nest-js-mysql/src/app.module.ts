import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from './prisma/prisma.module'

import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { KycModule } from './modules/kyc/kyc.module'
import { ListingsModule } from './modules/listings/listings.module'
import { TransactionsModule } from './modules/transactions/transactions.module'
import { AuctionsModule } from './modules/auctions/auctions.module'
import { ExecutiveCornerModule } from './modules/executive-corner/executive-corner.module'
import { TrackingModule } from './modules/tracking/tracking.module'
import { DocumentsModule } from './modules/documents/documents.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { AdminModule } from './modules/admin/admin.module'
import { RatingsModule } from './modules/ratings/ratings.module'
import { ArbitrationModule } from './modules/arbitration/arbitration.module'
import { InsuranceModule } from './modules/insurance/insurance.module'
import { VesselsModule } from './modules/vessels/vessels.module'
import { BolModule } from './modules/bol/bol.module'
import { DisputesModule } from './modules/disputes/disputes.module'
import { SecurityModule } from './modules/security/security.module'
import { LegalModule } from './modules/legal/legal.module'
import { KnowledgeModule }   from './modules/knowledge/knowledge.module'
import { MarketplaceModule } from './modules/marketplace/marketplace.module'

import { AppController } from './app.controller'
import { UploadModule }  from './modules/upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    PassportModule,

    AuthModule,
    UsersModule,
    KycModule,
    ListingsModule,
    TransactionsModule,
    AuctionsModule,
    ExecutiveCornerModule,
    TrackingModule,
    DocumentsModule,
    NotificationsModule,
    AdminModule,
    RatingsModule,
    ArbitrationModule,
    InsuranceModule,
    UploadModule,
    VesselsModule,
    BolModule,
    DisputesModule,
    SecurityModule,
    LegalModule,
    KnowledgeModule,
    MarketplaceModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
