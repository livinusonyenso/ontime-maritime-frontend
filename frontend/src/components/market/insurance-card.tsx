"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Star, CheckCircle2 } from "lucide-react"

// Define a type for the insurance provider display since it's not strictly in the DB types
export interface InsuranceProviderDisplay {
  id: string
  name: string
  rating: number
  reviews: number
  coverage: string
  premium: string
  features: string[]
}

interface InsuranceCardProps {
  provider: InsuranceProviderDisplay
  onSelect: (id: string) => void
}

export function InsuranceCard({ provider, onSelect }: InsuranceCardProps) {
  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{provider.name}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(provider.rating) ? "fill-accent text-accent" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({provider.reviews})</span>
            </div>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 py-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/30 p-2 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Coverage</p>
            <p className="font-bold text-primary text-sm">{provider.coverage}</p>
          </div>
          <div className="bg-muted/30 p-2 rounded-lg text-center">
            <p className="text-xs text-muted-foreground mb-1">Premium</p>
            <p className="font-bold text-secondary text-sm">{provider.premium}</p>
          </div>
        </div>

        <div className="space-y-2">
          {provider.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={() => onSelect(provider.id)}>
          Get Quote
        </Button>
      </CardFooter>
    </Card>
  )
}
