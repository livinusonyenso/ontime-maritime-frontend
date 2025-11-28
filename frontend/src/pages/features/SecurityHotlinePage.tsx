"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SecurityHotlineView } from "@/components/features/security-hotline/SecurityHotlineView"

export default function SecurityHotlinePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SecurityHotlineView />
      </main>
      <Footer />
    </div>
  )
}
