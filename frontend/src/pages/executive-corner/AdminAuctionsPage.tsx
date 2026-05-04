import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gavel, Plus, Edit, Trash2 } from "lucide-react"

const dummyAuctions = [
  { id: "1", title: "Container Slot - Shanghai to LA", vessel: "MSC Diana", route: "Shanghai → Los Angeles", bidders: 12, currentBid: 45000 },
  { id: "2", title: "Bulk Cargo - Rotterdam to Lagos", vessel: "Maersk Emerald", route: "Rotterdam → Lagos", bidders: 8, currentBid: 32500 },
  { id: "3", title: "Reefer Container - Dubai to Mumbai", vessel: "CMA CGM Marco", route: "Dubai → Mumbai", bidders: 15, currentBid: 28000 },
  { id: "4", title: "Heavy Lift - Hamburg to Singapore", vessel: "Hapag Atlas", route: "Hamburg → Singapore", bidders: 6, currentBid: 67000 },
  { id: "5", title: "Break Bulk - Durban to Santos", vessel: "PIL Harmony", route: "Durban → Santos", bidders: 9, currentBid: 41000 },
]

export default function AdminAuctionsPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Auction Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage cargo auctions</p>
        </div>
        <Button size="lg">
          <Plus className="mr-2 h-5 w-5" />
          Create Auction
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Auctions</p>
                <p className="text-3xl font-bold mt-2">{dummyAuctions.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bids</p>
                <p className="text-3xl font-bold mt-2">1,234</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-xl">
                <Gavel className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold mt-2">$2.4M</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-xl">
                <Gavel className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auctions List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>All Auctions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dummyAuctions.map((auction) => (
              <div
                key={auction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
              >
                <div className="flex-1">
                  <p className="font-semibold">{auction.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm text-muted-foreground">{auction.vessel}</p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{auction.route}</p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{auction.bidders} bidders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="font-bold text-lg text-primary">${auction.currentBid.toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
