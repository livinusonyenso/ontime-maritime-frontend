import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
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

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}
