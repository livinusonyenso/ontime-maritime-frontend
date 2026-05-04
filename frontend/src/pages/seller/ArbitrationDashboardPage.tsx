"use client"

import { ArbitrationView } from "@/components/features/arbitration/ArbitrationView"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, FileWarning, Users } from "lucide-react"

export default function SellerArbitrationDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller Arbitration & Case Management</h1>
          <p className="text-muted-foreground mt-1">
            Respond to buyer disputes, manage evidence, and collaborate with legal teams.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <FileWarning className="h-4 w-4 text-amber-500" />
            High-Risk Cases
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Multi-party Arbitration
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Active Cases
            </CardTitle>
            <CardDescription>Disputes involving your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Settlement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-emerald-500">76%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Escalated to Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-rose-500">1</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card">
        <ArbitrationView />
      </div>
    </div>
  )
}
