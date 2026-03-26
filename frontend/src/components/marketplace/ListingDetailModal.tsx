"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { MarketplaceListing } from "@/types/maritime"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, FileText, CheckCircle, ShieldCheck, AlertCircle, Loader2, ExternalLink, ShoppingCart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import api from "@/lib/api"

// ─── BOL document viewer ───────────────────────────────────────────────────────

function BolDocumentViewer({ bolImage }: { bolImage: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  const isPdf =
    bolImage.startsWith("data:application/pdf") ||
    bolImage.toLowerCase().includes(".pdf") ||
    bolImage.includes("/raw/upload/")

  useEffect(() => {
    if (!isPdf || !bolImage.startsWith("data:")) return
    try {
      const base64 = bolImage.split(",")[1]
      const bytes  = atob(base64)
      const arr    = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
      const blob = new Blob([arr], { type: "application/pdf" })
      const url  = URL.createObjectURL(blob)
      setBlobUrl(url)
      return () => URL.revokeObjectURL(url)
    } catch {
      // fall through — show a plain link
    }
  }, [bolImage, isPdf])

  const openUrl = isPdf && bolImage.startsWith("data:") ? blobUrl : bolImage

  if (isPdf) {
    return (
      <div className="space-y-2">
        <div className="aspect-3/4 border rounded-lg overflow-hidden bg-muted">
          {openUrl ? (
            <iframe src={openUrl} title="Bill of Lading PDF" className="w-full h-full" />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading PDF…</span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => window.open(openUrl ?? bolImage, "_blank")}
          disabled={!openUrl}
        >
          <ExternalLink className="h-4 w-4" />
          Open PDF in New Tab
        </Button>
      </div>
    )
  }

  return (
    <div
      className="aspect-3/4 bg-muted rounded border overflow-hidden relative group cursor-pointer"
      onClick={() => window.open(bolImage, "_blank")}
    >
      <img src={bolImage} alt="Bill of Lading" className="w-full h-full object-contain" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium gap-2">
        <ExternalLink className="h-4 w-4" /> View Full Size
      </div>
    </div>
  )
}

interface ListingDetailModalProps {
  open: boolean
  onClose: () => void
  listing: MarketplaceListing | null
}

export function ListingDetailModal({ open, onClose, listing }: ListingDetailModalProps) {
  const { user } = useAuth()

  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [localBolImage, setLocalBolImage]             = useState<string | null>(null)
  const [bolError, setBolError]                       = useState<string | null>(null)
  const [buyLoading, setBuyLoading]                   = useState(false)

  // Sync localBolImage when listing changes or modal opens.
  // listing?.bolImage is included in deps so previously-unlocked BOLs show
  // immediately on re-open without re-paying.
  useEffect(() => {
    setLocalBolImage(listing?.bolImage ?? null)
    setBolError(null)
  }, [listing?.id, listing?.bolImage, open])

  if (!listing) return null

  const hasBol        = !!(listing.bolHasImage ?? listing.bolVerified)
  const isBolUnlocked = !!localBolImage

  // ── Buy Now ─────────────────────────────────────────────────────────────────

  async function handleBuyNow() {
    if (!user) { window.location.href = "/login"; return }
    setBuyLoading(true)
    try {
      const amountKobo  = Math.round(Number(listing!.price) * 100)
      const callbackUrl = `${window.location.origin}/payment/callback`

      // Store listing ID so the callback page can offer a "back to listing" link
      sessionStorage.setItem("buy_return_listing_id", listing!.id)

      const res = await api.post("/payments/initialize", {
        email: user.email,
        amount: amountKobo,
        metadata: { listingId: listing!.id, listingTitle: listing!.title },
        callbackUrl,
      })

      // Same-tab redirect — mirrors the BOL flow so /payment/callback is always hit,
      // verifyPayment() runs, and the transaction is flipped to "completed".
      window.location.href = res.data.authorization_url
    } catch {
      setBuyLoading(false)
    }
    // Don't reset buyLoading on success — page is navigating away
  }

  // ── Unlock BOL ───────────────────────────────────────────────────────────────
  // Uses a full-page redirect to Paystack (same tab) — avoids all cross-tab
  // communication issues (postMessage, opener, token sharing between tabs).
  // After payment Paystack redirects back to /payment/callback which then
  // links back here. The DB record means the BOL shows on re-open automatically.

  async function handleUnlockBol() {
    if (!user) { window.location.href = "/login"; return }
    setBolError(null)
    setIsProcessingPayment(true)
    try {
      // Store return destination so callback page can link back
      sessionStorage.setItem("bol_return_listing_id", listing!.id)

      const callbackUrl = `${window.location.origin}/payment/callback`
      const res = await api.post(`/payments/bol-unlock/${listing!.id}`, { callbackUrl })

      // Redirect this tab directly to Paystack — no popup, no cross-tab issues
      window.location.href = res.data.authorization_url
    } catch (err: any) {
      const msg: string = err?.response?.data?.message ?? err?.message ?? ""
      // Already unlocked in a previous session — re-fetch to reveal the BOL
      if (msg.toLowerCase().includes("already unlocked")) {
        try {
          const res = await api.get(`/marketplace/listings/${listing!.id}`)
          const image = res.data.bol_image ?? res.data.bolImage
          if (image) { setLocalBolImage(image); return }
        } catch { /* fall through */ }
      }
      setBolError(msg || "Failed to initialize payment. Please try again.")
      setIsProcessingPayment(false)
    }
    // Note: don't reset isProcessingPayment on success — the page is navigating away
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{listing.title}</DialogTitle>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{listing.location.city}, {listing.location.country}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {listing.currency} {listing.price.toLocaleString()}
              </div>
              <Badge variant={listing.condition === "new" ? "default" : "secondary"}>
                {listing.condition.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
              <img
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {listing.images.slice(1, 5).map((img, i) => (
                <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden border">
                  <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Verification */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(listing.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm border-b pb-1">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* BOL Verification Section */}
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Ownership Verification</h3>
              </div>

              {hasBol ? (
                isBolUnlocked ? (
                  <div className="space-y-4">
                    <Alert className="bg-green-500/10 border-green-500/20 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Verified</AlertTitle>
                      <AlertDescription>
                        You have verified the Bill of Lading for this listing.
                      </AlertDescription>
                    </Alert>

                    <div className="border rounded-lg p-4 bg-background">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Bill of Lading Document
                      </h4>
                      <BolDocumentViewer bolImage={localBolImage!} />
                    </div>
                  </div>
                ) : (
                  // BOL exists but not unlocked yet
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The seller has uploaded a verified Bill of Lading (BOL) to confirm ownership.
                      Pay a one-time fee to access and verify this document securely.
                    </p>

                    <div className="flex items-center justify-between p-3 bg-background border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Bill of Lading</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified Upload
                      </Badge>
                    </div>

                    {bolError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{bolError}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleUnlockBol}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Redirecting to Payment…
                        </>
                      ) : (
                        "Unlock BOL — Pay ₦2,000"
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment via Paystack · One-time fee per listing
                    </p>
                  </div>
                )
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Available</AlertTitle>
                  <AlertDescription>
                    The seller has not uploaded a Bill of Lading for this listing yet.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <div className="flex w-full justify-between items-center gap-3">
            <div className="text-xs text-muted-foreground">
              Listing ID: {listing.id}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button
                type="button"
                disabled={buyLoading}
                onClick={handleBuyNow}
              >
                {buyLoading
                  ? <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  : <ShoppingCart className="h-4 w-4 mr-2" />
                }
                {buyLoading ? "Redirecting…" : "Buy Now"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
