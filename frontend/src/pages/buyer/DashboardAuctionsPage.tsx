"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuction } from "@/contexts/auction-context"
import { Clock, Gavel } from "lucide-react"

export default function DashboardAuctionsPage() {
  const { auctions } = useAuction()
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining: { [key: string]: string } = {}
      auctions.forEach((auction) => {
        const end = new Date(auction.end_time).getTime()
        const now = new Date().getTime()
        const diff = end - now

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          newTimeRemaining[auction.id] = `${days}d ${hours}h`
        } else {
          newTimeRemaining[auction.id] = "Ended"
        }
      })
      setTimeRemaining(newTimeRemaining)
    }, 1000)
    return () => clearInterval(timer)
  }, [auctions])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auctions</h1>
          <p className="text-muted-foreground">Bid on available shipping slots.</p>
        </div>
        <Button>View My Bids</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <Card key={auction.id} className="flex flex-col">
            <div className="aspect-video bg-muted relative">
              <img
                src={`/generic-placeholder-300px.png?height=300&width=600`}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2">
                <Clock className="w-3 h-3 mr-1" />
                {timeRemaining[auction.id] || "..."}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{auction.title}</CardTitle>
              <CardDescription>{auction.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Current Bid</span>
                <span className="font-bold text-lg">${auction.current_bid.toLocaleString()}</span>
              </div>
              <Button className="w-full">
                <Gavel className="w-4 h-4 mr-2" /> Place Bid
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
