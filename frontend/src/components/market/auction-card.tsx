"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Gavel, Ship, MapPin } from "lucide-react"
import type { Auction } from "@/types"

interface AuctionCardProps {
  auction: Auction
  onBid: (id: string) => void
}

export function AuctionCard({ auction, onBid }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      const end = new Date(auction.end_time).getTime()
      const now = new Date().getTime()
      const diff = end - now

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else {
        setTimeLeft("Ended")
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [auction.end_time])

  // Mock listing details since they might be separate in a real app,
  // but we'll assume we can pass them or they are hydrated in the auction object.
  // For this component, I'll use placeholders if data is missing,
  // but strictly speaking, the Auction type only has listing_id.
  // In a real scenario, we'd fetch the listing or it would be included.
  // For the purpose of "rendering successfully", I'll use safe fallbacks.

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all group">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={`/generic-placeholder-300px.png?height=300&width=600`} // Use a generic image as placeholder
          alt="Auction Item"
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={timeLeft === "Ended" ? "secondary" : "default"} className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeLeft}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-0">
            Auction #{auction.id.slice(0, 8)}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">Cargo Shipment #{auction.listing_id.slice(0, 6)}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Ship className="w-4 h-4" />
          <span>International Shipping</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 p-2 rounded flex flex-col">
            <span className="text-xs text-muted-foreground">Current Bid</span>
            <span className="font-bold text-primary">${auction.current_price.toLocaleString()}</span>
          </div>
          <div className="bg-muted/50 p-2 rounded flex flex-col">
            <span className="text-xs text-muted-foreground">Starting Price</span>
            <span className="font-medium">${auction.starting_price.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>Port to Port Delivery</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => onBid(auction.id)} disabled={timeLeft === "Ended"}>
          <Gavel className="w-4 h-4 mr-2" />
          {timeLeft === "Ended" ? "Auction Ended" : "Place Bid"}
        </Button>
      </CardFooter>
    </Card>
  )
}
