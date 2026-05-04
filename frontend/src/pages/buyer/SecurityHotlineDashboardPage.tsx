"use client"

import { SecurityHotlineView } from "@/components/features/security-hotline/SecurityHotlineView"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, PhoneCall, MapPin } from "lucide-react"

export default function BuyerSecurityHotlineDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Security Hotline</h1>
          <p className="text-muted-foreground mt-1">
            Report fraud, piracy or suspicious activity tied to your shipments and documents.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            24/7 Protection
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4" />
            Rapid Response
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Reports Filed</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">6</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Critical Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-amber-500">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Hot Zones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gulf of Guinea, Red Sea, Malacca Strait
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
