
import { AuthProvider } from "@/contexts/auth-context"
import { TrackingProvider } from "@/contexts/tracking-context"
import { AuctionProvider } from "@/contexts/auction-context"
import { DocumentProvider } from "@/contexts/document-context"
import { NotificationProvider } from "@/contexts/notification-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TrackingProvider>
        <AuctionProvider>
          <DocumentProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </DocumentProvider>
        </AuctionProvider>
      </TrackingProvider>
    </AuthProvider>
  )
}
