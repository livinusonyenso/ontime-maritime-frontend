"use client"

import { InsuranceMarket } from "@/components/market/insurance-market"

export default function DashboardInsurancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Insurance Quotes</h1>
        <p className="text-muted-foreground mt-2">
          Compare quotes from top insurance providers and protect your cargo
        </p>
      </div>

      <InsuranceMarket />
    </div>
  )
}
