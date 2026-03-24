"use client"

import { useEffect, useState } from "react"
import { FileText, Ship, CheckCircle2, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/api"

/* ===================== TYPES ===================== */

type EbolStatus = "draft" | "issued" | "transferred" | "released"

interface Ebol {
  id: string
  bolNumber: string
  title: string
  portOfLoading: string
  portOfDischarge: string
  issuedDate: string
  bolVerified: boolean
  status: EbolStatus
}

/* ===================== MAPPER ===================== */

function toEbol(listing: any): Ebol {
  const listingStatus: string = listing.status ?? "pending"
  const bolVerified: boolean  = listing.bol_verified ?? false

  let status: EbolStatus = "draft"
  if      (listingStatus === "sold")                        status = "released"
  else if (listingStatus === "active" && bolVerified)       status = "transferred"
  else if (listingStatus === "active" && !bolVerified)      status = "issued"

  return {
    id:              listing.id ?? "",
    bolNumber:       listing.bol_number ?? `BOL-${(listing.id ?? "").slice(0, 8).toUpperCase()}`,
    title:           listing.title ?? "—",
    portOfLoading:   listing.origin_port ?? "—",
    portOfDischarge: listing.destination_port ?? "—",
    issuedDate:      listing.created_at
                       ? new Date(listing.created_at).toISOString().slice(0, 10)
                       : "—",
    bolVerified,
    status,
  }
}

const STATUS_COLOR: Record<EbolStatus, string> = {
  draft:       "bg-gray-500",
  issued:      "bg-blue-500",
  transferred: "bg-purple-500",
  released:    "bg-green-500",
}

/* ===================== COMPONENT ===================== */

export default function SellerEBOLPage() {
  const [ebols, setEbols]     = useState<Ebol[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    api
      .get("/listings/my")
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : []
        setEbols(
          all
            .filter((l: any) => l.bol_required === true || Boolean(l.bol_number))
            .map(toEbol)
        )
      })
      .catch(() => setError("Could not load eBOL data."))
      .finally(() => setLoading(false))
  }, [])

  const inTransit = ebols.filter((e) => e.status === "issued" || e.status === "transferred").length
  const released  = ebols.filter((e) => e.status === "released").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My e-Bills of Lading</h1>
        <p className="text-muted-foreground mt-1">
          View, track, and manage your electronic Bills of Lading.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Total eBOLs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{loading ? "—" : ebols.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              In Transit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{loading ? "—" : inTransit}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Released
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{loading ? "—" : released}</p>
          </CardContent>
        </Card>
      </div>

      {/* eBOL list */}
      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Loading…
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="py-12 text-center text-destructive">
              {error}
            </CardContent>
          </Card>
        ) : ebols.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No eBOLs Found</h3>
              <p className="text-muted-foreground">
                Listings with BOL requirements will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          ebols.map((ebol) => (
            <Card key={ebol.id}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <Ship className="h-5 w-5 text-muted-foreground" />
                    <span className="font-mono text-sm text-muted-foreground">
                      {ebol.bolNumber}
                    </span>
                    {ebol.bolVerified && (
                      <Badge variant="outline" className="text-green-600 border-green-300 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="font-semibold">{ebol.title}</div>

                  <div className="text-sm text-muted-foreground">
                    {ebol.portOfLoading} → {ebol.portOfDischarge}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Issued: {ebol.issuedDate}
                  </div>
                </div>

                <Badge className={`${STATUS_COLOR[ebol.status]} text-white capitalize`}>
                  {ebol.status}
                </Badge>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
