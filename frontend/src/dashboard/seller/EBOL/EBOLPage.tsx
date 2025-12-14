"use client"

import { useState } from "react"
import {
  FileText,
  Ship,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
} from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/* ===================== TYPES ===================== */

type EbolStatus = "draft" | "issued" | "transferred" | "released"

interface Ebol {
  id: string
  bolNumber: string
  vesselName: string
  voyage: string
  shipper: string
  consignee: string
  portOfLoading: string
  portOfDischarge: string
  issuedDate: string
  status: EbolStatus
}

/* ===================== COMPONENT ===================== */

export default function SellerEBOLPage() {
  const [ebols] = useState<Ebol[]>([
    {
      id: "1",
      bolNumber: "EBOL-2025-001",
      vesselName: "MV Atlantic Grace",
      voyage: "AG-0925",
      shipper: "Pillar Pole Ltd",
      consignee: "BlueWave Shipping",
      portOfLoading: "Lagos",
      portOfDischarge: "Rotterdam",
      issuedDate: "2025-09-12",
      status: "issued",
    },
    {
      id: "2",
      bolNumber: "EBOL-2025-002",
      vesselName: "MV Ocean Crown",
      voyage: "OC-104",
      shipper: "Kazfield Integrated",
      consignee: "EuroTrade BV",
      portOfLoading: "Onne",
      portOfDischarge: "Antwerp",
      issuedDate: "2025-09-18",
      status: "transferred",
    },
    {
      id: "3",
      bolNumber: "EBOL-2025-003",
      vesselName: "MV Blue Horizon",
      voyage: "BH-221",
      shipper: "D’roid Logistics",
      consignee: "Global Imports Ltd",
      portOfLoading: "Apapa",
      portOfDischarge: "Hamburg",
      issuedDate: "2025-09-25",
      status: "released",
    },
  ])

  const getStatusBadge = (status: EbolStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-500"
      case "issued":
        return "bg-blue-500"
      case "transferred":
        return "bg-purple-500"
      case "released":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My e-Bills of Lading
        </h1>
        <p className="text-muted-foreground mt-1">
          View, track, and manage your electronic Bills of Lading.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Total eBOLs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{ebols.length}</p>
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
            <p className="text-3xl font-semibold">
              {ebols.filter((e) => e.status === "issued" || e.status === "transferred").length}
            </p>
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
            <p className="text-3xl font-semibold">
              {ebols.filter((e) => e.status === "released").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* eBOL List */}
      <div className="grid gap-4">
        {ebols.map((ebol) => (
          <Card key={ebol.id}>
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <Ship className="h-5 w-5 text-muted-foreground" />
                  <span className="font-mono text-sm text-muted-foreground">
                    {ebol.bolNumber}
                  </span>
                </div>

                <div className="font-semibold">
                  {ebol.vesselName} — {ebol.voyage}
                </div>

                <div className="text-sm text-muted-foreground">
                  {ebol.portOfLoading} → {ebol.portOfDischarge}
                </div>

                <div className="text-xs text-muted-foreground">
                  Issued: {ebol.issuedDate}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge className={`${getStatusBadge(ebol.status)} text-white capitalize`}>
                  {ebol.status}
                </Badge>

                <Button size="sm" variant="outline">
                  View
                </Button>

                {ebol.status === "issued" && (
                  <Button size="sm">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Transfer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {ebols.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No eBOLs Found</h3>
              <p className="text-muted-foreground">
                Your electronic Bills of Lading will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
