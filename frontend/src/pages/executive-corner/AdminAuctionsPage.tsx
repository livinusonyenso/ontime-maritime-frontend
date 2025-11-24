import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useAuction } from "@/contexts/auction-context"
import { Gavel, Plus, Edit, Trash2 } from "lucide-react"

export default function AdminAuctionsPage() {
  const { user, isAuthenticated } = useAuth()
  const { auctions } = useAuction()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      // router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
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
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Auctions</p>
                    <p className="text-3xl font-bold mt-2">{auctions.length}</p>
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

          <Card className="glass">
            <CardHeader>
              <CardTitle>All Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auctions.map((auction) => (
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
