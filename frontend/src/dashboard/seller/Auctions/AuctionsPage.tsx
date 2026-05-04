"use client"

import React, { useEffect, useState } from "react"
import { Gavel, Hammer, Clock, AlertTriangle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import api from "@/lib/api"

/* ===================== TYPES ===================== */

type AuctionStatus = "live" | "ending_soon"

interface AuctionSummary {
  id: string
  title: string
  status: AuctionStatus
  currentBid: number
  endsAt: string
}

/* ===================== HELPERS ===================== */

const TWO_HOURS_MS = 2 * 60 * 60 * 1000

function toAuctionSummary(raw: any): AuctionSummary {
  const endTime = raw.end_time ? new Date(raw.end_time) : null
  const msLeft  = endTime ? endTime.getTime() - Date.now() : Infinity
  const status: AuctionStatus = msLeft <= TWO_HOURS_MS ? "ending_soon" : "live"

  const endsAt = endTime
    ? endTime.toLocaleDateString(undefined, {
        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
      })
    : "—"

  return {
    id:         raw.id ?? "",
    title:      raw.listing?.title ?? "—",
    status,
    currentBid: Number(raw.current_price ?? 0),
    endsAt,
  }
}

const STATUS_STYLE: Record<AuctionStatus, string> = {
  live:        "bg-blue-500 text-white",
  ending_soon: "bg-amber-500 text-white",
}

/* ===================== COMPONENT ===================== */

export default function UserAuctionsDashboard() {
  const { user } = useAuth()
  const [auctions, setAuctions] = useState<AuctionSummary[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    api
      .get("/auctions?take=100")
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : []
        const mine = all.filter((a: any) => a.listing?.seller_id === user?.id)
        setAuctions(mine.map(toAuctionSummary))
      })
      .catch(() => setError("Could not load auction data."))
      .finally(() => setLoading(false))
  }, [user?.id])

  const endingSoon = auctions.filter((a) => a.status === "ending_soon").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Auctions</h1>
        <p className="text-muted-foreground mt-1">
          Track active auctions on your listings.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          icon={<Gavel className="h-5 w-5 text-blue-600" />}
          title="Active Auctions"
          value={loading ? "—" : auctions.length}
        />
        <StatCard
          icon={<Clock className="h-5 w-5 text-amber-600" />}
          title="Ending Soon"
          value={loading ? "—" : endingSoon}
        />
      </div>

      {/* Auctions list */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">Active Auction Listings</CardTitle>
          <CardDescription>Live auctions on your marketplace listings</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <p className="py-8 text-center text-muted-foreground">Loading…</p>
          ) : error ? (
            <div className="py-8 text-center text-destructive flex flex-col items-center gap-2">
              <AlertTriangle className="h-8 w-8" />
              <p>{error}</p>
            </div>
          ) : auctions.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Hammer className="h-10 w-10 mx-auto mb-3" />
              <p>No active auctions on your listings.</p>
            </div>
          ) : (
            auctions.map((auction) => (
              <div
                key={auction.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{auction.title}</p>
                  <p className="text-sm text-muted-foreground">Ends: {auction.endsAt}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">${auction.currentBid.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Current Bid</p>
                  </div>
                  <Badge className={STATUS_STYLE[auction.status]}>
                    {auction.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/* ===================== SUB COMPONENT ===================== */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: number | string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="rounded-lg bg-muted p-2">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
