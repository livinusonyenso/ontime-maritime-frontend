"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MarketplaceView } from "@/components/features/marketplace/MarketplaceView"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <MarketplaceView />
      </main>
      <Footer />
    </div>
  )
}

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
)
