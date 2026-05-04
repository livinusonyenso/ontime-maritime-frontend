"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useAuction } from "@/contexts/auction-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DollarSign, Gavel, ArrowLeft, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DashboardAuctionsPage() {
  const { isAuthenticated, loading } = useAuth()
  const { auctions, placeBid } = useAuction()
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

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
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

          if (days > 0) {
            newTimeRemaining[auction.id] = `${days}d ${hours}h`
          } else if (hours > 0) {
            newTimeRemaining[auction.id] = `${hours}h ${minutes}m`
          } else {
            newTimeRemaining[auction.id] = `${minutes}m`
          }
        } else {
          newTimeRemaining[auction.id] = "Ended"
        }
      })
      setTimeRemaining(newTimeRemaining)
    }, 1000)

    return () => clearInterval(timer)
  }, [auctions])

  const handlePlaceBid = async () => {
    const amount = Number.parseFloat(bidAmount)
    if (amount <= selectedAuction.current_bid) {
      toast({
        title: "Invalid Bid",
        description: `Bid must be higher than current bid of $${selectedAuction.current_bid.toLocaleString()}`,
        variant: "destructive",
      })
      return
    }

    try {
      await placeBid(selectedAuction.id, amount)
      toast({
        title: "Bid Placed Successfully",
        description: `Your bid of $${amount.toLocaleString()} has been placed`,
      })
      setSelectedAuction(null)
      setBidAmount("")
    } catch (error) {
      toast({
        title: "Bid Failed",
        description: "Could not place bid. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="mb-4 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30" variant="outline">
                Live Auctions
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Cargo Auction Marketplace</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Bid on container slots and charter vessels from verified shipping companies
              </p>
            </div>
          </div>
        </section>

        {/* Auctions Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Auctions</h1>
                <p className="text-muted-foreground">Manage your active listings and bids.</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Create Auction
              </Button>
            </div>
            {auctions.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                <Gavel className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg">No Active Auctions</h3>
                <p className="text-muted-foreground mb-4">Create a new auction to start selling.</p>
                <Button variant="outline">Create First Auction</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {auctions.map((auction) => (
                  <Card
                    key={auction.id}
                    className="glass border-2 hover:border-primary/50 transition-all overflow-hidden flex flex-col"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl line-clamp-1" title={auction.title}>
                            {auction.title}
                          </CardTitle>
                          <CardDescription>ID: {auction.id.slice(0, 8)}</CardDescription>
                        </div>
                        <Badge variant={timeRemaining[auction.id] === "Ended" ? "secondary" : "default"}>
                          {timeRemaining[auction.id] || "..."}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Highest Bid</span>
                          <span className="text-2xl font-bold text-primary">
                            ${auction.current_bid.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Starting</span>
                          <span className="font-semibold">${auction.starting_bid.toLocaleString()}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                        onClick={() => {
                          setSelectedAuction(auction)
                          setBidAmount((auction.current_bid + 100).toString())
                        }}
                      >
                        Manage Auction
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bid Dialog */}
      <Dialog open={!!selectedAuction} onOpenChange={() => setSelectedAuction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place Your Bid</DialogTitle>
            <DialogDescription>Auction #{selectedAuction?.id.slice(0, 8)}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Bid</span>
                <span className="font-semibold">${selectedAuction?.current_bid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Remaining</span>
                <span className="font-semibold text-accent">
                  {selectedAuction && timeRemaining[selectedAuction.id]}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bid">Your Bid Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="bid"
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10 text-lg font-semibold"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAuction(null)}>
              Cancel
            </Button>
            <Button className="bg-accent hover:bg-accent/90" onClick={handlePlaceBid}>
              <Gavel className="mr-2 h-4 w-4" />
              Confirm Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
