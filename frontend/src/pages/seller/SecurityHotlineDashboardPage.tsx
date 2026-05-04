"use client"

import { SecurityHotlineView } from "@/components/features/security-hotline/SecurityHotlineView"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Users, FileSpreadsheet } from "lucide-react"

export default function SellerSecurityHotlineDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller Security & Compliance</h1>
          <p className="text-muted-foreground mt-1">
            Collaborate with agencies and buyers to keep your routes, crew and cargo safe.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Compliance Ready
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Multi-stakeholder
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Incidents Involving Your Vessels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Resolved with Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-emerald-500">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Compliance Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Export PDF summaries for port authorities & insurers.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card">
        <SecurityHotlineView />
      </div>
    </div>
  )
}
