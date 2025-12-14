"use client"

import {
  Gavel,
  Hammer,
  Trophy,
  Clock,
  ArrowUpRight,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* ===================== TYPES ===================== */

interface AuctionSummary {
  id: string
  title: string
  status: "live" | "ending_soon" | "won"
  highestBid: number
  endsAt?: string
}

/* ===================== COMPONENT ===================== */

export default function UserAuctionsDashboard() {
  const auctions: AuctionSummary[] = [
    {
      id: "1",
      title: "Container Freight – Lagos to Rotterdam",
      status: "live",
      highestBid: 12000,
      endsAt: "Today, 18:00",
    },
    {
      id: "2",
      title: "Bulk Cargo – Onne to Antwerp",
      status: "ending_soon",
      highestBid: 18500,
      endsAt: "In 2 hours",
    },
    {
      id: "3",
      title: "Charter Vessel – PH to Hamburg",
      status: "won",
      highestBid: 42000,
    },
  ]

  const getStatusBadge = (status: AuctionSummary["status"]) => {
    switch (status) {
      case "live":
        return "bg-blue-500 text-white"
      case "ending_soon":
        return "bg-amber-500 text-white"
      case "won":
        return "bg-emerald-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="space-y-6">
      {/* ===================== HEADER ===================== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Auctions
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your bids, active auctions, and won listings.
        </p>
      </div>

      {/* ===================== QUICK STATS ===================== */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<Gavel className="h-5 w-5 text-blue-600" />}
          title="Active Bids"
          value="2"
        />
        <StatCard
          icon={<Clock className="h-5 w-5 text-amber-600" />}
          title="Ending Soon"
          value="1"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-emerald-600" />}
          title="Auctions Won"
          value="1"
        />
      </div>

      {/* ===================== AUCTIONS LIST ===================== */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">
            Recent Auction Activity
          </CardTitle>
          <CardDescription>
            Auctions you are currently participating in
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{auction.title}</p>
                {auction.endsAt && (
                  <p className="text-sm text-muted-foreground">
                    Ends: {auction.endsAt}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold">
                    ${auction.highestBid.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Highest Bid
                  </p>
                </div>

                <Badge className={getStatusBadge(auction.status)}>
                  {auction.status.replace("_", " ")}
                </Badge>

                <Button size="sm" variant="outline">
                  View
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          ))}

          {auctions.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <Hammer className="h-10 w-10 mx-auto mb-3" />
              <p>You are not participating in any auctions yet.</p>
            </div>
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
  value: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="rounded-lg bg-muted p-2">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
