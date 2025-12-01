"use client"

import { EBOLView } from "@/components/features/ebol/EBOLView"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, FileText, ScanBarcode } from "lucide-react"

export default function BuyerEBOLDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer e-BOL Workspace</h1>
          <p className="text-muted-foreground mt-1">
            Upload, verify and manage digital Bills of Lading for your incoming shipments.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Secured Verification
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <ScanBarcode className="h-4 w-4" />
            Container-linked
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Active e-BOLs
            </CardTitle>
            <CardDescription>Documents linked to shipments in transit</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pending Verifications</CardTitle>
            <CardDescription>Awaiting authenticity checks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-amber-500">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Disputed e-BOLs</CardTitle>
            <CardDescription>Linked to arbitration cases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-rose-500">1</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card">
        <EBOLView />
      </div>
    </div>
  )
}
