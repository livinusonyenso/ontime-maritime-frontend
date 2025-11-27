"use client"

import { useState, useEffect } from "react"
import { useListings } from "@/contexts/listings-context"
import { useAuction } from "@/contexts/auction-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Filter, Ship, Package, Gavel, Clock, MapPin, DollarSign, ArrowRight, ShieldCheck, Loader2, Bot, CheckCircle2, XCircle } from "lucide-react"

export function MarketView() {
  const { getAllListings, searchListings } = useListings()
  const { } = useAuction() // Keep hook for potential future use but ignore data

  // DUMMY DATA FOR DEMONSTRATION
  const listings = [
    {
      id: '1',
      seller_id: 'seller1',
      category: 'vessel',
      title: '2015 Supramax Bulk Carrier',
      description: '58,000 DWT, built in Japan. Excellent condition, special survey passed recently.',
      price_usd: 14500000,
      origin_port: 'Singapore',
      destination_port: 'Rotterdam',
      container_number: null,
      eta: null,
      photos: ['https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1000&auto=format&fit=crop'],
      certificates: [],
      is_perishable: false,
      is_dangerous: false,
      is_high_value: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      seller_id: 'seller2',
      category: 'container',
      title: '20ft Standard Dry Containers (Batch of 50)',
      description: 'Cargo worthy condition, located in Shanghai. Immediate availability.',
      price_usd: 85000,
      origin_port: 'Shanghai',
      destination_port: 'Los Angeles',
      container_number: null,
      eta: null,
      photos: ['https://images.unsplash.com/photo-1494412651409-ae5d985a3f3f?q=80&w=1000&auto=format&fit=crop'],
      certificates: [],
      is_perishable: false,
      is_dangerous: false,
      is_high_value: false,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      seller_id: 'seller3',
      category: 'cargo',
      title: 'Electronics Shipment - 5 TEU',
      description: 'Consumer electronics requiring temperature controlled transport.',
      price_usd: 12000,
      origin_port: 'Shenzhen',
      destination_port: 'Hamburg',
      container_number: null,
      eta: null,
      photos: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop'],
      certificates: [],
      is_perishable: false,
      is_dangerous: false,
      is_high_value: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      seller_id: 'seller4',
      category: 'equipment',
      title: 'Port Crane - Liebherr LHM 550',
      description: 'Mobile harbour crane, max lifting capacity 144t. Year 2018.',
      price_usd: 2800000,
      origin_port: 'Dubai',
      destination_port: 'Mumbai',
      container_number: null,
      eta: null,
      photos: ['https://images.unsplash.com/photo-1590930591148-5216718d4158?q=80&w=1000&auto=format&fit=crop'],
      certificates: [],
      is_perishable: false,
      is_dangerous: false,
      is_high_value: true,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ] as any[] // Cast to any to avoid strict type checking against the full interface if some optional fields are missing

  const auctions = [
    {
      id: 'a1',
      listing_id: 'l_a1',
      starting_price: 50000,
      current_price: 65000,
      reserve_price: 100000,
      status: 'active',
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 86400000 * 2).toISOString(), // Ends in 2 days
      winner_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'a2',
      listing_id: 'l_a2',
      starting_price: 120000,
      current_price: 145000,
      reserve_price: 200000,
      status: 'active',
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 86400000 * 5).toISOString(), // Ends in 5 days
      winner_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'a3',
      listing_id: 'l_a3',
      starting_price: 10000,
      current_price: 12500,
      reserve_price: 25000,
      status: 'active',
      start_time: new Date().toISOString(),
      end_time: new Date(Date.now() + 3600000 * 4).toISOString(), // Ends in 4 hours
      winner_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ] as any[]
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // getAllListings()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // searchListings(searchQuery)
      console.log("Searching for:", searchQuery)
    } else {
      // getAllListings()
    }
  }

  // Calculate time remaining for auctions
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

  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerifyAndPay = () => {
    setIsVerifying(true)
    // Simulate AI/Grok validation
    setTimeout(() => {
      setVerificationResult({
        bolValid: true,
        ownershipVerified: true,
        originVerified: true,
        destinationVerified: true,
        inconsistencies: [],
        riskLevel: "low",
      })
      setIsVerifying(false)
    }, 2500)
  }

  const handleConfirmPurchase = () => {
    // Simulate payment processing
    const transactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    
    // Update state to show success message
    setVerificationResult((prev: any) => ({
      ...prev,
      paymentComplete: true,
      transactionId: transactionId
    }))
  }

  return (
    <div className="p-6 space-y-8 min-h-screen bg-muted/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/cargo-ship-at-sea.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm" variant="outline">
            Global Marketplace
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Find the Perfect <span className="text-primary">Vessel</span> or <span className="text-secondary">Cargo</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            Access a worldwide network of maritime logistics. Buy, sell, and auction shipping containers, vessels, and equipment.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-0">
              Browse Listings
            </Button>
            <Button size="lg" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              Start Selling
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-background p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by name, category, or location..." 
            className="pl-10 bg-muted/30 border-0 focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-muted/30 border-0">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vessel">Vessels</SelectItem>
              <SelectItem value="container">Containers</SelectItem>
              <SelectItem value="cargo">Cargo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="bg-muted/30 border-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent p-0 h-auto gap-6 border-b w-full justify-start rounded-none">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            All Items
          </TabsTrigger>
          <TabsTrigger 
            value="auctions" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Live Auctions
          </TabsTrigger>
          <TabsTrigger 
            value="listings" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-2 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Direct Sales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {/* Featured Auctions */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Gavel className="h-6 w-6 text-primary" />
                Live Auctions
              </h2>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {auctions.slice(0, 4).map((auction) => (
                <Card key={auction.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <img
                      src={`/generic-placeholder-300px.png?height=300&width=400`}
                      alt="Auction Item"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border-white/10 text-white hover:bg-black/60">
                      <Clock className="w-3 h-3 mr-1.5 text-primary" />
                      {timeRemaining[auction.id] || "..."}
                    </Badge>
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
                      Auction
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">Listing #{auction.listing_id.substring(0, 8)}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Auction Item</p>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Bid</div>
                      <div className="font-bold text-lg text-primary">${auction.current_price.toLocaleString()}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-0 shadow-none">
                      Place Bid
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Latest Listings */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Package className="h-6 w-6 text-secondary" />
                Latest Listings
              </h2>
              <Button variant="ghost" className="text-secondary hover:text-secondary/80">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.slice(0, 8).map((listing) => (
                <Card key={listing.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-background">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    <img
                      src={listing.photos[0] || `/generic-placeholder-300px.png?height=300&width=400`}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge variant="secondary" className="absolute top-3 left-3 shadow-sm">
                      {listing.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-secondary transition-colors">{listing.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate">{listing.origin_port}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold">${listing.price_usd.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">USD</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0">
                    <Button variant="outline" className="w-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="auctions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {auctions.map((auction) => (
              <Card key={auction.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                {/* ... Auction Card Content (Same as above) ... */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img
                    src={`/generic-placeholder-300px.png?height=300&width=400`}
                    alt="Auction Item"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border-white/10 text-white hover:bg-black/60">
                    <Clock className="w-3 h-3 mr-1.5 text-primary" />
                    {timeRemaining[auction.id] || "..."}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">Listing #{auction.listing_id.substring(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">Auction Item</p>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground">Current Bid</div>
                    <div className="font-bold text-lg text-primary">${auction.current_price.toLocaleString()}</div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border-0 shadow-none">
                    Place Bid
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="listings">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <Card 
                key={listing.id} 
                className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-background cursor-pointer"
                onClick={() => setSelectedListing(listing)}
              >
                {/* ... Listing Card Content (Same as above) ... */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img
                    src={listing.photos[0] || `/generic-placeholder-300px.png?height=300&width=400`}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3 shadow-sm">
                    {listing.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-secondary transition-colors">{listing.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">{listing.origin_port}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold">${listing.price_usd.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">USD</span>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button variant="outline" className="w-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Listing Detail Dialog */}
      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedListing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Images */}
              <div>
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedListing.photos[0] || `/generic-placeholder-300px.png?height=300&width=400`}
                    alt={selectedListing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  {selectedListing.photos.slice(1).map((img: string, i: number) => (
                    <div key={i} className="h-20 w-20 bg-muted rounded overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedListing.category}
                  </Badge>
                  <Badge variant={selectedListing.status === "active" ? "default" : "secondary"}>
                    {selectedListing.status}
                  </Badge>
                </div>

                <h2 className="text-2xl font-bold mb-2">{selectedListing.title}</h2>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  {selectedListing.origin_port}
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary">
                    ${selectedListing.price_usd.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-2">USD</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{selectedListing.description}</p>

                {/* Seller Info */}
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Seller ID: {selectedListing.seller_id}</div>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        ★★★★★ <span className="text-muted-foreground">(5.0)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={() => setShowPurchaseDialog(true)}
                  >
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Verify & Pay
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Purchase/Verify Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Verify & Purchase
            </DialogTitle>
            <DialogDescription>
              AI/Grok validates BOL details, ownership, and shipment information before purchase.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {!verificationResult ? (
              <>
                <div>
                  <Label>Bill of Lading Number (if applicable)</Label>
                  <Input placeholder="Enter BOL number for verification" />
                </div>

                <div>
                  <Label>Message to Seller</Label>
                  <Input placeholder="Any questions or special requests..." />
                </div>

                <Button
                  className="w-full"
                  onClick={handleVerifyAndPay}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying with AI...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Run AI Verification
                    </>
                  )}
                </Button>
              </>
            ) : verificationResult.paymentComplete ? (
              <div className="text-center space-y-4 py-6">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-700">Payment Successful!</h3>
                  <p className="text-muted-foreground">Your transaction has been processed securely.</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-left">
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-mono font-medium">{verificationResult.transactionId}</p>
                  <div className="my-2 border-t" />
                  <div className="flex justify-between text-sm">
                    <span>Amount Paid</span>
                    <span className="font-bold">${selectedListing?.price_usd.toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => {
                  setShowPurchaseDialog(false)
                  setVerificationResult(null)
                  setSelectedListing(null)
                }}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-600">Verification Complete</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      BOL Valid
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Ownership Verified
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Origin Verified
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Destination Verified
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                    <Badge className="bg-green-500 text-white">
                      Risk Level: LOW
                    </Badge>
                  </div>
                </div>

                {selectedListing && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="text-2xl font-bold">
                        ${selectedListing.price_usd.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg" onClick={handleConfirmPurchase}>
                  <DollarSign className="h-5 w-5 mr-2" />
                  Proceed to Payment
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
