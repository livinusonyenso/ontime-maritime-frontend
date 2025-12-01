"use client"

import { ArbitrationView } from "@/components/features/arbitration/ArbitrationView"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, AlertTriangle, MessageCircle } from "lucide-react"

export default function BuyerArbitrationDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Dispute & Arbitration</h1>
          <p className="text-muted-foreground mt-1">
            Raise disputes, attach evidence, and track outcomes for problematic shipments.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Buyer Protection
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Legal Support
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Open Cases
            </CardTitle>
            <CardDescription>Disputes you initiated</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Resolved in Your Favour</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-emerald-500">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card">
        <ArbitrationView />
      </div>
    </div>
  )
}
