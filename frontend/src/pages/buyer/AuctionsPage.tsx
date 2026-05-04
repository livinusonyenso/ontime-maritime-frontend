"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuction } from "@/contexts/auction-context"
import { AuctionCard } from "@/components/market/auction-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DollarSign, Gavel } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuctionsPage() {
  const { auctions, placeBid } = useAuction()
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const { toast } = useToast()

  const handlePlaceBid = () => {
    const currentPrice = selectedAuction.current_price || selectedAuction.currentBid
    const amount = Number.parseFloat(bidAmount)
    if (amount <= currentPrice) {
      toast({
        title: "Invalid Bid",
        description: `Bid must be higher than current bid of $${currentPrice.toLocaleString()}`,
        variant: "destructive",
      })
      return
    }

    placeBid(selectedAuction.id, amount)
    toast({
      title: "Bid Placed Successfully",
      description: `Your bid of $${amount.toLocaleString()} has been placed`,
    })
    setSelectedAuction(null)
    setBidAmount("")
  }

  const onBid = (id: string) => {
    const auction = auctions.find((a) => a.id === id)
    if (auction) {
      setSelectedAuction(auction)
      setBidAmount(((auction.current_price || 0) + 100).toString())
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-[url(/bulk-cargo-ship.jpg)] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
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

        {/* Stats */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{auctions.length}</p>
                <p className="text-sm text-muted-foreground">Active Auctions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary">24</p>
                <p className="text-sm text-muted-foreground">Ending Today</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">156</p>
                <p className="text-sm text-muted-foreground">Total Bidders</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">$2.4M</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
            </div>
          </div>
        </section>

        {/* Auctions Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} onBid={onBid} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Auctions Work</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Simple, transparent, and secure bidding process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-primary">
                    1
                  </div>
                  <h3 className="font-semibold">Browse Listings</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Explore available container slots and vessel charters
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-secondary">
                    2
                  </div>
                  <h3 className="font-semibold">Place Your Bid</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Submit competitive bids above the minimum amount
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-accent">
                    3
                  </div>
                  <h3 className="font-semibold">Win Auction</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Highest bid when timer ends wins the slot
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-primary">
                    4
                  </div>
                  <h3 className="font-semibold">Book Shipment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Secure payment and automatic contract generation
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Bid Dialog */}
      <Dialog open={!!selectedAuction} onOpenChange={() => setSelectedAuction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place Your Bid</DialogTitle>
            <DialogDescription>{selectedAuction?.title || `Auction #${selectedAuction?.id}`}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Bid</span>
                <span className="font-semibold">${selectedAuction?.current_price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Minimum Bid</span>
                <span className="font-semibold">
                  $
                  {selectedAuction?.reserve_price?.toLocaleString() ||
                    selectedAuction?.starting_price?.toLocaleString()}
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

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
              <p className="text-primary font-semibold mb-1">Winning this auction includes:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Confirmed booking on vessel</li>
                <li>• Digital contract and documentation</li>
                <li>• Real-time tracking throughout journey</li>
              </ul>
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
