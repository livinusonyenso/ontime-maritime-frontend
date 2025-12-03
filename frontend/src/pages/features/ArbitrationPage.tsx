"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import ArbitrationView from "@/components/features/arbitration/ArbitrationView"

export default function ArbitrationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ArbitrationView />
      </main>
      <Footer />
    </div>
  )
}
