'use client'

import type { ReactNode } from 'react'
import {
  AuthProvider,
  UsersProvider,
  ListingsProvider,
  TransactionsProvider,
  AuctionProvider,
  ExecutiveCornerProvider,
  TrackingProvider,
  DocumentProvider,
  NotificationProvider,
  AdminProvider,
  RatingsProvider,
  ArbitrationProvider,
  InsuranceProvider,
} from '@/contexts'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <UsersProvider>
        <ListingsProvider>
          <TransactionsProvider>
            <AuctionProvider>
              <ExecutiveCornerProvider>
                <TrackingProvider>
                  <DocumentProvider>
                    <NotificationProvider>
                      <AdminProvider>
                        <RatingsProvider>
                          <ArbitrationProvider>
                            <InsuranceProvider>
                              {children}
                            </InsuranceProvider>
                          </ArbitrationProvider>
                        </RatingsProvider>
                      </AdminProvider>
                    </NotificationProvider>
                  </DocumentProvider>
                </TrackingProvider>
              </ExecutiveCornerProvider>
            </AuctionProvider>
          </TransactionsProvider>
        </ListingsProvider>
      </UsersProvider>
    </AuthProvider>
  )
}
