"use client"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  fetchListings,
  fetchMoreListings,
  selectAllListings,
  selectMarketplaceHasMore,
  selectMarketplaceLoading,
  selectMarketplaceLoadingMore,
  selectMarketplaceTotal,
} from "@/store/slices/marketplaceSlice"
import { useAuth } from "@/contexts/auth-context"
import api from "@/lib/api"

import type { MarketplaceListing } from "@/types/maritime"

import {
  Search,
  Store,
  MapPin,
  Star,
  Package,
  Warehouse,
  Container,
  Wrench,
  Shield,
  Anchor,
  Settings,
  Loader2,
  ShoppingCart,
} from "lucide-react"
import { useTranslation } from "react-i18next"

const PAGE_SIZE = 20

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCategoryIcon(category: string) {
  switch (category) {
    case "container":  return <Container className="h-4 w-4" />
    case "warehouse":  return <Warehouse className="h-4 w-4" />
    case "crane":      return <Anchor    className="h-4 w-4" />
    case "equipment":  return <Settings  className="h-4 w-4" />
    case "spare_parts":
    case "repairs":    return <Wrench    className="h-4 w-4" />
    case "insurance":  return <Shield    className="h-4 w-4" />
    default:           return <Package   className="h-4 w-4" />
  }
}

// ─── Components ───────────────────────────────────────────────────────────────

function ListingCard({
  listing,
  onClick,
  onBuyNow,
  buying,
  t,
}: {
  listing: MarketplaceListing
  onClick: () => void
  onBuyNow: (e: React.MouseEvent) => void
  buying: boolean
  t: (key: string) => string
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden group border hover:border-primary/30"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="h-44 bg-muted relative overflow-hidden">
        {listing.images?.[0] ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground/40">
            {getCategoryIcon(listing.category)}
          </div>
        )}

        {listing.featured && (
          <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-500 text-white text-[10px]">
            {t("marketplacepage.card.featured")}
          </Badge>
        )}
        {listing.bolVerified && (
          <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-500 text-white text-[10px]">
            {t("marketplacepage.card.bolVerified")}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-1.5">
        {/* Category */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {getCategoryIcon(listing.category)}
          <span className="capitalize">{(listing.category ?? "").replace(/_/g, " ")}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">{listing.title}</h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {listing.location?.city}, {listing.location?.country}
          </span>
        </div>

        {/* Price + rating */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-lg font-bold text-primary leading-none">
              {listing.currency ?? "USD"} {listing.price?.toLocaleString()}
            </div>
            {listing.priceType && listing.priceType !== "fixed" && (
              <span className="text-[11px] text-muted-foreground">
                / {listing.priceType.replace(/_/g, " ")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{(listing.sellerRating ?? 0).toFixed(1)}</span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground truncate">{t("marketplacepage.card.by")} {listing.sellerName}</p>

        {/* Buy Now button */}
        <Button
          size="sm"
          className="w-full mt-1"
          disabled={buying}
          onClick={onBuyNow}
        >
          {buying
            ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            : <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
          }
          {buying ? t("marketplacepage.card.redirecting") : t("marketplacepage.card.buyNow")}
        </Button>
      </CardContent>
    </Card>
  )
}

function ListingCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-28 mt-1" />
      </CardContent>
    </Card>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const navigate   = useNavigate()
  const dispatch   = useAppDispatch()
  const { isAuthenticated, user } = useAuth()
  const { t } = useTranslation()

  const CATEGORIES = [
    { value: "all",         label: t("marketplacepage.categories.all") },
    { value: "equipment",   label: t("marketplacepage.categories.equipment") },
    { value: "vessel",      label: t("marketplacepage.categories.vessel") },
    { value: "container",   label: t("marketplacepage.categories.container") },
    { value: "crane",       label: t("marketplacepage.categories.crane") },
    { value: "spare_parts", label: t("marketplacepage.categories.spare_parts") },
    { value: "repairs",     label: t("marketplacepage.categories.repairs") },
    { value: "insurance",   label: t("marketplacepage.categories.insurance") },
    { value: "warehouse",   label: t("marketplacepage.categories.warehouse") },
  ]

  const SORT_OPTIONS = [
    { value: "newest",     label: t("marketplacepage.sort.newest") },
    { value: "price_asc",  label: t("marketplacepage.sort.price_asc") },
    { value: "price_desc", label: t("marketplacepage.sort.price_desc") },
    { value: "featured",   label: t("marketplacepage.sort.featured") },
  ]

  const listings   = useAppSelector(selectAllListings)
  const hasMore    = useAppSelector(selectMarketplaceHasMore)
  const loading    = useAppSelector(selectMarketplaceLoading)
  const loadingMore= useAppSelector(selectMarketplaceLoadingMore)
  const total      = useAppSelector(selectMarketplaceTotal)

  const [search,   setSearch]   = useState("")
  const [category, setCategory] = useState("all")
  const [sort,     setSort]     = useState<"newest" | "price_asc" | "price_desc" | "featured">("newest")
  const [buyingId, setBuyingId] = useState<string | null>(null)

  const skipRef    = useRef(0)
  const debounceRef= useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── helpers ────────────────────────────────────────────────────────────────

  function buildParams(overrides: { search?: string; category?: string; sort?: string; skip?: number } = {}) {
    const s  = overrides.search   !== undefined ? overrides.search   : search
    const c  = overrides.category !== undefined ? overrides.category : category
    const so = overrides.sort     !== undefined ? overrides.sort     : sort
    const sk = overrides.skip     !== undefined ? overrides.skip     : 0
    return {
      search:   s  || undefined,
      category: c === "all" ? undefined : c,
      sort:     so as any,
      skip:     sk,
      take:     PAGE_SIZE,
    }
  }

  function refetch(overrides: { search?: string; category?: string; sort?: string } = {}) {
    skipRef.current = 0
    dispatch(fetchListings(buildParams(overrides)))
  }

  // ── initial load ───────────────────────────────────────────────────────────
  useEffect(() => {
    refetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── handlers ───────────────────────────────────────────────────────────────

  const handleSearchChange = (value: string) => {
    setSearch(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => refetch({ search: value }), 400)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    refetch({ category: value })
  }

  const handleSortChange = (value: string) => {
    setSort(value as any)
    refetch({ sort: value })
  }

  const handleLoadMore = () => {
    const nextSkip = skipRef.current + PAGE_SIZE
    skipRef.current = nextSkip
    dispatch(fetchMoreListings(buildParams({ skip: nextSkip })))
  }

  // ── Buy Now ────────────────────────────────────────────────────────────────

  const handleBuyNow = async (listing: MarketplaceListing, e: React.MouseEvent) => {
    e.stopPropagation() // prevent card click navigating to detail

    if (!isAuthenticated || !user) {
      navigate("/login", { state: { redirectTo: `/marketplace/${listing.id}` } })
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
    } catch {
      setBuyingId(null)
    }
  }

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-14">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Store className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{t("marketplacepage.hero.badge")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("marketplacepage.hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("marketplacepage.hero.description")}
            </p>
          </div>
        </section>

        {/* ── Filter bar ── */}
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                className="pl-9"
                placeholder={t("marketplacepage.filters.searchPlaceholder")}
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            {/* Category */}
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Results ── */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Result count */}
            {!loading && (
              <p className="text-sm text-muted-foreground mb-6">
                {t(total !== 1 ? "marketplacepage.results.found_other" : "marketplacepage.results.found_one", { count: total.toLocaleString() })}
              </p>
            )}

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                <Package className="h-14 w-14 mx-auto mb-4 opacity-25" />
                <p className="text-lg font-medium">{t("marketplacepage.results.noResults")}</p>
                <p className="text-sm mt-1">{t("marketplacepage.results.noResultsDesc")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onClick={() => navigate(`/marketplace/${listing.id}`)}
                    onBuyNow={(e) => handleBuyNow(listing, e)}
                    buying={buyingId === listing.id}
                    t={t}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && !loading && (
              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("marketplacepage.loading")}
                    </>
                  ) : (
                    t("marketplacepage.loadMore", { count: (total - listings.length).toLocaleString() })
                  )}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
