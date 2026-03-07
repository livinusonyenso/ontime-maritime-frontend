"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/store"
import {
  fetchListings,
  fetchMoreListings,
  fetchListingDetail,
  clearSelectedListing,
  selectAllListings,
  selectSelectedListing,
  selectMarketplaceTotal,
  selectMarketplaceHasMore,
  selectMarketplaceLoading,
  selectMarketplaceLoadingMore,
} from "@/store/slices/marketplaceSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Gavel,
  Clock,
  MapPin,
  ArrowRight,
  SlidersHorizontal,
  Loader2,
  PackageSearch,
  X,
  ShoppingCart,
} from "lucide-react"
import { ListingDetailModal } from "@/components/marketplace/ListingDetailModal"
import { useAuth } from "@/contexts/auth-context"
import api from "@/lib/api"

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 12

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "vessel", label: "Vessels" },
  { value: "container", label: "Containers" },
  { value: "equipment", label: "Equipment" },
  { value: "warehouse", label: "Warehouse" },
  { value: "crane", label: "Cranes" },
  { value: "spare_parts", label: "Spare Parts" },
  { value: "repairs", label: "Repairs" },
  { value: "insurance", label: "Insurance" },
]

const CONDITIONS = [
  { value: "all", label: "Any Condition" },
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "used", label: "Used" },
]

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
]

// ─── Skeleton card ────────────────────────────────────────────────────────────

function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-sm animate-pulse">
      <div className="aspect-[4/3] bg-muted" />
      <CardHeader className="p-4 pb-2">
        <div className="h-5 bg-muted rounded w-3/4 mb-2" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="h-6 bg-muted rounded w-1/3 mb-3" />
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded w-20" />
          <div className="h-5 bg-muted rounded w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-9 bg-muted rounded w-full" />
      </CardFooter>
    </Card>
  )
}

// ─── Listing card ─────────────────────────────────────────────────────────────

interface ListingCardProps {
  listing: MarketplaceListing
  onClick: () => void
  onBuyNow: (e: React.MouseEvent) => void
  buying: boolean
}

function ListingCard({ listing, onClick, onBuyNow, buying }: ListingCardProps) {
  const city    = listing.location?.city    ?? ""
  const country = listing.location?.country ?? ""
  const locationText = [city, country].filter(Boolean).join(", ") || "Location not specified"
  const firstImage = listing.images?.[0] ?? "/placeholder.svg"

  return (
    <Card
      className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={firstImage}
          alt={listing.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm shadow-sm capitalize">
            {listing.category?.replace(/_/g, " ")}
          </Badge>
        </div>
        {listing.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-500 text-white border-0 shadow-sm">Featured</Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {listing.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs mt-1">
          <MapPin className="h-3 w-3 shrink-0" />
          {locationText}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xl font-bold text-primary">
            {listing.currency ?? "USD"} {listing.price?.toLocaleString()}
          </span>
          {listing.priceType && listing.priceType !== "fixed" && (
            <span className="text-xs text-muted-foreground capitalize">
              / {listing.priceType.replace(/_/g, " ")}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs font-normal capitalize">
            {listing.condition?.replace(/_/g, " ")}
          </Badge>
          {listing.bolVerified && (
            <Badge variant="outline" className="text-xs font-normal border-dashed text-green-600 border-green-400">
              BOL Verified
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          className="flex-1 group-hover:bg-primary group-hover:text-white transition-colors"
          variant="secondary"
        >
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          className="flex-1"
          disabled={buying}
          onClick={onBuyNow}
        >
          {buying
            ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
            : <ShoppingCart className="h-4 w-4 mr-1.5" />
          }
          {buying ? "Redirecting…" : "Buy Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MarketView() {
  const dispatch        = useDispatch<AppDispatch>()
  const { isAuthenticated, user } = useAuth()
  const listings        = useSelector(selectAllListings)
  const selectedListing = useSelector(selectSelectedListing)
  const total           = useSelector(selectMarketplaceTotal)
  const hasMore         = useSelector(selectMarketplaceHasMore)
  const loading         = useSelector(selectMarketplaceLoading)
  const loadingMore     = useSelector(selectMarketplaceLoadingMore)

  // ── Filter state ──────────────────────────────────────────────────────────
  const [search,    setSearch]    = useState("")
  const [category,  setCategory]  = useState("all")
  const [condition, setCondition] = useState("all")
  const [sort,      setSort]      = useState<"newest" | "price_asc" | "price_desc" | "featured">("newest")
  const [minPrice,  setMinPrice]  = useState("")
  const [maxPrice,  setMaxPrice]  = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [buyingId,    setBuyingId]    = useState<string | null>(null)

  // ── Modal state ───────────────────────────────────────────────────────────
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // ── Pagination cursor ─────────────────────────────────────────────────────
  const skipRef = useRef(0)

  // ── Initial load ──────────────────────────────────────────────────────────
  useEffect(() => {
    skipRef.current = 0
    dispatch(fetchListings({ take: PAGE_SIZE }))
  }, [dispatch])

  // ── Build filter params ───────────────────────────────────────────────────
  function buildParams(skip = 0) {
    return {
      ...(search.trim()            ? { search: search.trim() }             : {}),
      ...(category !== "all"       ? { category }                          : {}),
      ...(condition !== "all"      ? { condition }                         : {}),
      ...(sort                     ? { sort }                              : {}),
      ...(minPrice                 ? { minPrice: Number(minPrice) }        : {}),
      ...(maxPrice                 ? { maxPrice: Number(maxPrice) }        : {}),
      skip,
      take: PAGE_SIZE,
    }
  }

  // ── Apply filters (reset pagination) ─────────────────────────────────────
  function applyFilters() {
    skipRef.current = 0
    dispatch(fetchListings(buildParams(0)))
  }

  // ── Clear all filters ─────────────────────────────────────────────────────
  function clearFilters() {
    setSearch("")
    setCategory("all")
    setCondition("all")
    setSort("newest")
    setMinPrice("")
    setMaxPrice("")
    skipRef.current = 0
    dispatch(fetchListings({ take: PAGE_SIZE }))
  }

  // ── Load more (append) ────────────────────────────────────────────────────
  function handleLoadMore() {
    const nextSkip = skipRef.current + PAGE_SIZE
    skipRef.current = nextSkip
    dispatch(fetchMoreListings(buildParams(nextSkip)))
  }

  // ── Card click → fetch detail + open modal ────────────────────────────────
  function handleCardClick(id: string) {
    dispatch(fetchListingDetail(id))
    setDetailModalOpen(true)
  }

  function handleModalClose() {
    setDetailModalOpen(false)
    dispatch(clearSelectedListing())
  }

  // ── Buy Now ───────────────────────────────────────────────────────────────
  async function handleBuyNow(listing: MarketplaceListing, e: React.MouseEvent) {
    e.stopPropagation()

    if (!isAuthenticated || !user) {
      window.location.href = `/login?redirectTo=/dashboard/buyer`
      return
    }

    setBuyingId(listing.id)
    try {
      const amountKobo = Math.round(Number(listing.price) * 100)
      const res = await api.post("/payments/initialize", {
        email: user.email,
        amount: amountKobo,
        metadata: { listingId: listing.id, listingTitle: listing.title },
      })
      window.open(res.data.authorization_url, '_blank', 'noopener,noreferrer')
      setBuyingId(null)
    } catch {
      setBuyingId(null)
    }
  }

  const hasActiveFilters =
    search.trim() || category !== "all" || condition !== "all" || minPrice || maxPrice

  // ── Auction placeholder (for future) ─────────────────────────────────────
  const auctions: any[] = []
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({})
  useEffect(() => {
    if (auctions.length === 0) return
    const timer = setInterval(() => {
      const next: Record<string, string> = {}
      auctions.forEach((a) => {
        const diff = new Date(a.end_time).getTime() - Date.now()
        if (diff > 0) {
          const d = Math.floor(diff / 86_400_000)
          const h = Math.floor((diff % 86_400_000) / 3_600_000)
          next[a.id] = `${d}d ${h}h`
        } else {
          next[a.id] = "Ended"
        }
      })
      setTimeRemaining(next)
    }, 1000)
    return () => clearInterval(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-6 space-y-8 min-h-screen bg-muted/10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/cargo-ship-at-sea.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative z-10 max-w-2xl space-y-6">
          <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm" variant="outline">
            Global Marketplace
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Find the Perfect <span className="text-primary">Vessel</span> or{" "}
            <span className="text-secondary">Cargo</span>
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

      {/* Search bar */}
      <div className="bg-background p-4 rounded-xl border shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for vessels, containers, or equipment..."
              className="pl-10 h-12 text-base border-0 bg-transparent focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="w-[160px] h-12 border-0 bg-muted/50">
                <Filter className="mr-2 h-4 w-4 shrink-0" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-4"
              onClick={() => setShowFilters((v) => !v)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button size="lg" className="h-12 px-8" onClick={applyFilters}>
              Search
            </Button>
          </div>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1 border-t">
            <Select value={condition} onValueChange={(v) => setCondition(v)}>
              <SelectTrigger className="h-10 bg-muted/40 border-0">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                {CONDITIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
              <SelectTrigger className="h-10 bg-muted/40 border-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Min price (USD)"
              className="h-10 bg-muted/40 border-0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max price (USD)"
              className="h-10 bg-muted/40 border-0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-8">
        <TabsList className="bg-transparent p-0 h-auto gap-6 border-b w-full justify-start rounded-none">
          {[
            { value: "all",      label: "All Listings" },
            { value: "auctions", label: "Live Auctions" },
            { value: "saved",    label: "Saved Items" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All listings tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Result meta */}
          {!loading && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {total > 0
                  ? `Showing ${listings.length} of ${total} listing${total !== 1 ? "s" : ""}`
                  : hasActiveFilters
                    ? "No listings match your filters"
                    : "No listings available"}
              </span>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 gap-1 text-xs">
                  <X className="h-3 w-3" /> Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Listing grid */}
          {!loading && listings.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onClick={() => handleCardClick(listing.id)}
                  onBuyNow={(e) => handleBuyNow(listing, e)}
                  buying={buyingId === listing.id}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && listings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <PackageSearch className="h-12 w-12 text-muted-foreground/40" />
              <div>
                <p className="font-medium text-muted-foreground">No listings found</p>
                {hasActiveFilters && (
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                )}
              </div>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          )}

          {/* Load More */}
          {!loading && hasMore && (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[160px]"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading…
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Auctions tab */}
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
                    <Badge variant="destructive" className="animate-pulse shadow-sm">Live Auction</Badge>
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
              <div className="col-span-full flex flex-col items-center justify-center py-24 gap-3 text-center">
                <Gavel className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-muted-foreground">No active auctions at the moment. Check back later!</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Saved tab */}
        <TabsContent value="saved">
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <PackageSearch className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">Saved items coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail modal */}
      <ListingDetailModal
        open={detailModalOpen}
        onClose={handleModalClose}
        listing={selectedListing}
      />
    </div>
  )
}
