"use client"

import { useEffect, useState } from "react"
import { useAuction } from "@/contexts/auction-context"
import { AuctionCard } from "./auction-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function AuctionsMarket() {
  const { auctions, getActiveAuctions, loading, placeBid } = useAuction()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getActiveAuctions()
  }, [])

  const handleBid = async (id: string) => {
    // For demo purposes, we'll just log or alert,
    // as real bidding requires a dialog/amount input
    const amount = prompt("Enter bid amount:")
    if (amount) {
      try {
        await placeBid(id, Number.parseFloat(amount))
        alert("Bid placed successfully!")
      } catch (e) {
        alert("Failed to place bid")
      }
    }
  }

  const filteredAuctions = auctions.filter((a) => a.id.includes(searchTerm) || a.listing_id.includes(searchTerm))

  return (
    <div className="space-y-6">
      {/* Market Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search auctions by ID or Listing..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ))}
        </div>
      ) : filteredAuctions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No active auctions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} onBid={handleBid} />
          ))}
        </div>
      )}
    </div>
  )
}
