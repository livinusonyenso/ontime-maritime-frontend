"use client"

import { EBOLView } from "@/components/features/ebol/EBOLView"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileSignature, UploadCloud, Users } from "lucide-react"

export default function SellerEBOLDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seller e-BOL Control Center</h1>
          <p className="text-muted-foreground mt-1">
            Create, sign and push digital Bills of Lading to your buyers and partners.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4" />
            Bulk Upload
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Multi-party Signatures
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileSignature className="h-4 w-4 text-primary" />
              e-BOLs Issued
            </CardTitle>
            <CardDescription>Documents you have generated</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Awaiting Buyer Sign-off</CardTitle>
            <CardDescription>Pending buyer confirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-amber-500">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completed e-BOLs</CardTitle>
            <CardDescription>Fully signed & archived</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-emerald-500">19</p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border bg-card">
        <EBOLView />
      </div>
    </div>
  )
}
