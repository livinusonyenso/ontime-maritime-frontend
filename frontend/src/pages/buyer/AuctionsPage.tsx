
import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuction } from "@/contexts/auction-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Ship, MapPin, Package, Users, Clock, DollarSign, Gavel } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuctionsPage() {
  const { auctions, placeBid } = useAuction()
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({})
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining: { [key: string]: string } = {}
      auctions.forEach((auction) => {
        const end = new Date(auction.endTime).getTime()
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

  const handlePlaceBid = () => {
    const amount = Number.parseFloat(bidAmount)
    if (amount <= selectedAuction.currentBid) {
      toast({
        title: "Invalid Bid",
        description: `Bid must be higher than current bid of $${selectedAuction.currentBid.toLocaleString()}`,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {auctions.map((auction) => (
                <Card
                  key={auction.id}
                  className="glass border-2 hover:border-primary/50 transition-all overflow-hidden"
                >
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <img
                      src={`/generic-placeholder-300px.png?height=300&width=600`}
                      alt={auction.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground border-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {timeRemaining[auction.id] || "Loading..."}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{auction.title}</CardTitle>
                    <CardDescription>{auction.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Ship className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{auction.vessel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-secondary" />
                        <span className="text-muted-foreground">{auction.cargo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground text-xs">{auction.route}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{auction.bidders} bidders</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Bid</span>
                        <span className="text-2xl font-bold text-primary">${auction.currentBid.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Minimum Bid</span>
                        <span className="font-semibold">${auction.minimumBid.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={() => {
                        setSelectedAuction(auction)
                        setBidAmount((auction.currentBid + 100).toString())
                      }}
                    >
                      <Gavel className="mr-2 h-4 w-4" />
                      Place Bid
                    </Button>
                  </CardContent>
                </Card>
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
            <DialogDescription>{selectedAuction?.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Bid</span>
                <span className="font-semibold">${selectedAuction?.currentBid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Minimum Bid</span>
                <span className="font-semibold">${selectedAuction?.minimumBid.toLocaleString()}</span>
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

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
              <p className="text-primary font-semibold mb-1">Winning this auction includes:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Confirmed booking on {selectedAuction?.vessel}</li>
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
