"use client"

import { useState } from "react"
import { InsuranceCard, type InsuranceProviderDisplay } from "./insurance-card"
import { Input } from "@/components/ui/input"
import { Search, ShieldCheck } from "lucide-react"

// Dummy data for the market view
const MOCK_PROVIDERS: InsuranceProviderDisplay[] = [
  {
    id: "1",
    name: "Global Marine Insurance",
    rating: 4.8,
    reviews: 1250,
    coverage: "Up to $5M",
    premium: "$2,500/yr",
    features: ["Worldwide coverage", "24/7 claims support", "Fast payouts"],
  },
  {
    id: "2",
    name: "Oceanic Shield",
    rating: 4.6,
    reviews: 980,
    coverage: "Up to $10M",
    premium: "$3,200/yr",
    features: ["Premium coverage", "Dedicated manager", "Weather protection"],
  },
  {
    id: "3",
    name: "Maritime Protection",
    rating: 4.7,
    reviews: 1100,
    coverage: "Up to $3M",
    premium: "$1,800/yr",
    features: ["Affordable rates", "Quick approval", "Online claims"],
  },
  {
    id: "4",
    name: "Cargo Guard Intl",
    rating: 4.9,
    reviews: 1500,
    coverage: "Unlimited",
    premium: "$4,500/yr",
    features: ["Unlimited coverage", "White-glove service", "Risk assessment"],
  },
  {
    id: "5",
    name: "SafeSea Logistics",
    rating: 4.5,
    reviews: 450,
    coverage: "Up to $1M",
    premium: "$900/yr",
    features: ["Basic coverage", "Instant certificate", "Low deductible"],
  },
]

export function InsuranceMarket() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProviders = MOCK_PROVIDERS.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelect = (id: string) => {
    // Navigate to details or open modal
    console.log("Selected provider:", id)
    alert("Quote request initiated for provider " + id)
  }

  return (
    <div className="space-y-8">
      {/* Hero / Intro for the component section */}
      <div className="bg-primary/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Find Best Coverage
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Compare quotes from top-rated maritime insurance providers. Secure your cargo with just a few clicks.
          </p>
        </div>
        <div className="w-full md:w-auto min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              className="pl-9 bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProviders.map((provider) => (
          <InsuranceCard key={provider.id} provider={provider} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  )
}
