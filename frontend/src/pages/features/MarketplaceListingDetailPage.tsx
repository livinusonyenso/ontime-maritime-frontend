"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  fetchListingDetail,
  selectSelectedListing,
  clearSelectedListing,
} from "@/store/slices/marketplaceSlice"
import { useAuth } from "@/contexts/auth-context"
import api from "@/lib/api"

import type { MarketplaceListing } from "@/types/maritime"

import {
  ArrowLeft,
  MapPin,
  Star,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShoppingCart,
  Tag,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  Loader2,
} from "lucide-react"

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0)

  if (!images?.length) {
    return (
      <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground/30">
        <Package className="h-20 w-20" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
        <img
          src={images[idx]}
          alt="Listing"
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-2 right-3 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                i === idx
                  ? "border-primary shadow-sm"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-3">
        <Skeleton className="aspect-video w-full rounded-xl" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-9 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-4 space-y-3">
          <Skeleton className="h-11 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplaceListingDetailPage() {
  const { id }        = useParams<{ id: string }>()
  const navigate      = useNavigate()
  const dispatch      = useAppDispatch()
  const { isAuthenticated, user } = useAuth()

  const listing = useAppSelector(selectSelectedListing) as MarketplaceListing | null

  const [loading,    setLoading]    = useState(true)
  const [notFound,   setNotFound]   = useState(false)
  const [feedback,   setFeedback]   = useState<string | null>(null)
  const [buyLoading, setBuyLoading] = useState(false)
  const [buyError,   setBuyError]   = useState<string | null>(null)

  // Fetch on mount / id change
  useEffect(() => {
    if (!id) return
    setLoading(true)
    setNotFound(false)
    dispatch(fetchListingDetail(id))
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => { setLoading(false); setNotFound(true) })

    return () => { dispatch(clearSelectedListing()) }
  }, [id, dispatch])

  // ── interaction gate ───────────────────────────────────────────────────────

  const handleInteraction = (label: string) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { redirectTo: `/marketplace/${id}` } })
      return
    }
    setFeedback(`Your ${label.toLowerCase()} request has been noted. A team member will follow up shortly.`)
    setTimeout(() => setFeedback(null), 5000)
  }

  // ── Buy Now ────────────────────────────────────────────────────────────────

  const handleBuyNow = async () => {
    if (!isAuthenticated || !user) {
      navigate("/login", { state: { redirectTo: `/marketplace/${id}` } })
      return
    }
    if (!listing) return

    setBuyLoading(true)
    setBuyError(null)

    try {
      // amount in kobo: price_usd * 100 (treating USD value as NGN for test mode)
      const amountKobo = Math.round(Number(listing.price) * 100)

      const res = await api.post("/payments/initialize", {
        email: user.email,
        amount: amountKobo,
        metadata: { listingId: listing.id, listingTitle: listing.title },
      })

      const { authorization_url } = res.data
      window.location.href = authorization_url
    } catch (err: any) {
      setBuyError(err?.message || "Failed to initialize payment. Please try again.")
      setBuyLoading(false)
    }
  }

  // ── not found ──────────────────────────────────────────────────────────────

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-5 text-center p-8">
          <Package className="h-16 w-16 text-muted-foreground opacity-25" />
          <h1 className="text-2xl font-bold">Listing not found</h1>
          <p className="text-muted-foreground max-w-md">
            This listing may have been removed, sold, or is no longer active.
          </p>
          <Button asChild>
            <Link to="/marketplace">Back to Marketplace</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  // ── main render ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/marketplace")}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        {loading ? (
          <DetailSkeleton />
        ) : listing ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* ── Left: Gallery ── */}
            <div>
              <ImageGallery images={listing.images ?? []} />
            </div>

            {/* ── Right: Details ── */}
            <div className="space-y-5">

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="capitalize">
                  {(listing.category ?? "").replace(/_/g, " ")}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {listing.condition}
                </Badge>
                {listing.featured && (
                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white">
                    Featured
                  </Badge>
                )}
                {listing.bolVerified && (
                  <Badge className="bg-green-500 hover:bg-green-500 text-white flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    BOL Verified
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold leading-tight">{listing.title}</h1>

              {/* Price */}
              <div>
                <div className="text-3xl font-bold text-primary">
                  {listing.currency ?? "USD"} {listing.price?.toLocaleString()}
                </div>
                {listing.priceType && listing.priceType !== "fixed" && (
                  <span className="text-sm text-muted-foreground">
                    / {listing.priceType.replace(/_/g, " ")}
                  </span>
                )}
              </div>

              {/* Meta row */}
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary/70" />
                  <span>
                    {listing.location?.city}, {listing.location?.country}
                    {listing.location?.port ? ` · Port: ${listing.location.port}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                  <span>
                    {listing.sellerName} &middot; {(listing.sellerRating ?? 0).toFixed(1)} rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 shrink-0" />
                  <span>{(listing.views ?? 0).toLocaleString()} views</span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Specifications */}
              {listing.specifications &&
                Object.keys(listing.specifications).length > 0 && (
                  <div>
                    <h2 className="font-semibold mb-2">Specifications</h2>
                    <div className="border rounded-lg overflow-hidden text-sm">
                      {Object.entries(listing.specifications).map(([key, value], i) => (
                        <div
                          key={key}
                          className={`flex px-4 py-2.5 ${
                            i % 2 === 0 ? "bg-muted/40" : "bg-background"
                          }`}
                        >
                          <span className="w-1/2 font-medium capitalize text-foreground">
                            {key.replace(/_/g, " ")}
                          </span>
                          <span className="w-1/2 text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <Separator />

              {/* Login prompt for unauthenticated visitors */}
              {!isAuthenticated && (
                <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5 text-sm text-muted-foreground">
                  <LogIn className="h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <Link to="/login" className="text-primary font-medium underline underline-offset-2">
                      Sign in
                    </Link>{" "}
                    to contact the seller, make an offer, or save this listing.
                  </span>
                </div>
              )}

              {/* Feedback acknowledgment */}
              {feedback && (
                <div className="flex items-start gap-3 p-3 rounded-lg border border-green-500/20 bg-green-500/5 text-sm text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Buy Now error */}
              {buyError && (
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-sm text-red-700 dark:text-red-400">
                  {buyError}
                </div>
              )}

              {/* Interaction buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => handleInteraction("Contact Seller")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Seller
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    disabled={buyLoading}
                    onClick={handleBuyNow}
                  >
                    {buyLoading
                      ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      : <ShoppingCart className="h-4 w-4 mr-2" />
                    }
                    {buyLoading ? "Redirecting…" : "Buy Now"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleInteraction("Make Offer")}
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    Make Offer
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => handleInteraction("Save Listing")}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Listing
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}
