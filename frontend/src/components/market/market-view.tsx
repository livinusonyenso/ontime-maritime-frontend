"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAllListings } from "@/store/slices/marketplaceSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Ship, Package, Gavel, Clock, MapPin, DollarSign, ArrowRight } from "lucide-react"

import { ListingDetailModal } from "@/components/marketplace/ListingDetailModal"

export function MarketView() {
  // Get listings from Redux instead of Context
  const allListings = useSelector(selectAllListings)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredListings, setFilteredListings] = useState(allListings)
  
  // State for detail modal
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // Update filtered listings when Redux state changes
  useEffect(() => {
    setFilteredListings(allListings)
  }, [allListings])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const filtered = allListings.filter((listing: MarketplaceListing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredListings(filtered)
    } else {
      setFilteredListings(allListings)
    }
  }

  const handleListingClick = (listing: MarketplaceListing) => {
    setSelectedListing(listing)
    setDetailModalOpen(true)
  }

  // For now, we'll use empty array for auctions until you add them to Redux
  const auctions: any[] = []

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
          <form onSubmit={handleSearch}>
            <Input 
              placeholder="Search for vessels, containers, or equipment..." 
              className="pl-10 h-12 text-base border-0 bg-transparent focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] h-12 border-0 bg-muted/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vessel">Vessels</SelectItem>
              <SelectItem value="container">Containers</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
          <Button size="lg" className="h-12 px-8">Search</Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList className="bg-transparent p-0 h-auto gap-6 border-b w-full justify-start rounded-none">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            All Listings
          </TabsTrigger>
          <TabsTrigger 
            value="auctions" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Live Auctions
          </TabsTrigger>
          <TabsTrigger 
            value="saved" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
          >
            Saved Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing: MarketplaceListing) => (
              <Card 
                key={listing.id} 
                className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleListingClick(listing)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={listing.images[0] || "/placeholder.svg"} 
                    alt={listing.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm shadow-sm">
                      {listing.category}
                    </Badge>
                  </div>
                  {listing.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-amber-500 text-white border-0 shadow-sm">Featured</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                      {listing.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-xs mt-1">
                    <MapPin className="h-3 w-3" /> {listing.location.city}, {listing.location.country}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-xl font-bold text-primary">{listing.currency} {listing.price.toLocaleString()}</span>
                    {listing.priceType !== 'fixed' && (
                      <span className="text-xs text-muted-foreground capitalize">/ {listing.priceType.replace('_', ' ')}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {listing.condition.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal border-dashed">
                      {Object.keys(listing.specifications).length} Specs
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="secondary">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="auctions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {auctions.map((auction) => (
              <Card key={auction.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={auction.image} 
                    alt={auction.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" className="font-semibold">Place Bid</Button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive" className="animate-pulse shadow-sm">
                      Live Auction
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-black/70 backdrop-blur-md text-white text-xs font-medium py-1.5 px-3 rounded-full flex items-center justify-center gap-2 shadow-sm">
                      <Clock className="h-3 w-3 text-red-400" />
                      <span>Ends in: {timeRemaining[auction.id]}</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                    {auction.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs mt-1">
                    <Gavel className="h-3 w-3" /> {auction.bids} Bids placed
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Bid</p>
                      <p className="text-xl font-bold text-primary">${auction.current_bid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Buy Now</p>
                      <p className="text-sm font-semibold">${auction.buy_now_price.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {auctions.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No active auctions at the moment. Check back later!
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved">
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


      </Tabs>

      <ListingDetailModal 
        open={detailModalOpen} 
        onClose={() => setDetailModalOpen(false)} 
        listing={selectedListing} 
      />
    </div>
  )
}
