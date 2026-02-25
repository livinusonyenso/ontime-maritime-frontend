"use client"

import { useState, useEffect, useCallback } from "react"
import { useAdmin } from "@/contexts/admin-context"
import type { AdminListing } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Loader2,
  Eye,
  DollarSign,
  User,
  Calendar,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  MapPin,
} from "lucide-react"

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Pending Review</Badge>
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>
    case "archived":
      return <Badge variant="secondary">Archived</Badge>
    default:
      return <Badge variant="outline" className="capitalize">{status}</Badge>
  }
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  })
}

function sellerName(listing: AdminListing) {
  if (!listing.seller) return "Unknown seller"
  const { first_name, last_name, email } = listing.seller
  const name = [first_name, last_name].filter(Boolean).join(" ")
  return name || email
}

// ─── BOL document viewer ──────────────────────────────────────────────────────

function BolViewer({ src }: { src: string }) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)

  const isPdf =
    src.startsWith("data:application/pdf") ||
    src.toLowerCase().includes(".pdf") ||
    src.includes("/raw/upload/")

  useEffect(() => {
    if (!isPdf || !src.startsWith("data:")) { setBlobUrl(null); return }
    const base64 = src.split(",")[1]
    const bytes  = atob(base64)
    const arr    = new Uint8Array(bytes.length)
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
    const blob = new Blob([arr], { type: "application/pdf" })
    const url  = URL.createObjectURL(blob)
    setBlobUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [src, isPdf])

  const embedSrc = blobUrl ?? src

  const openInNewTab = () => window.open(embedSrc, "_blank", "noopener,noreferrer")

  if (isPdf) {
    return (
      <div className="space-y-2">
        <iframe
          src={embedSrc}
          title="BOL Document"
          className="w-full h-64 rounded border bg-muted"
        />
        <Button variant="outline" size="sm" className="gap-2" onClick={openInNewTab}>
          <ExternalLink className="h-4 w-4" /> Open PDF in New Tab
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <img
        src={src}
        alt="BOL Document"
        className="w-full max-h-64 rounded border object-contain bg-muted"
      />
      <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open(src, "_blank", "noopener,noreferrer")}>
        <ExternalLink className="h-4 w-4" /> Open Image in New Tab
      </Button>
    </div>
  )
}

// ─── Listing row ──────────────────────────────────────────────────────────────

interface ListingRowProps {
  listing: AdminListing
  tab: "pending" | "active" | "rejected"
  onView: (l: AdminListing) => void
  onApprove?: (l: AdminListing) => void
  onReject?: (l: AdminListing) => void
  actionLoading: string | null
}

function ListingRow({ listing, tab, onView, onApprove, onReject, actionLoading }: ListingRowProps) {
  const isLoading = actionLoading === listing.id

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-base truncate">{listing.title}</span>
              {statusBadge(listing.status)}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {sellerName(listing)}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {listing.currency ?? "USD"} {Number(listing.price_usd).toLocaleString()}
              </span>
              <span className="flex items-center gap-1 capitalize">
                <Package className="h-3 w-3" />
                {listing.marketplace_category ?? listing.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {fmtDate(listing.created_at)}
              </span>
            </div>
            {listing.rejection_reason && (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{listing.rejection_reason}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => onView(listing)}>
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            {tab === "pending" && onApprove && onReject && (
              <>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onApprove(listing)}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onReject(listing)}
                  disabled={isLoading}
                >
                  <XCircle className="h-4 w-4 mr-1" /> Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminListingsApprovalPage() {
  const { listingStats, getListingStats, getListingsByStatus, approveListing, rejectListing } = useAdmin()
  const { toast } = useToast()

  const [activeTab, setActiveTab]     = useState<"pending" | "active" | "rejected">("pending")
  const [listings, setListings]       = useState<AdminListing[]>([])
  const [tabLoading, setTabLoading]   = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // View dialog
  const [viewListing, setViewListing] = useState<AdminListing | null>(null)
  const [imgIndex, setImgIndex]       = useState(0)

  // Reset image index when a new listing is opened
  useEffect(() => { setImgIndex(0) }, [viewListing?.id])

  // Reject dialog
  const [rejectTarget, setRejectTarget]   = useState<AdminListing | null>(null)
  const [rejectReason, setRejectReason]   = useState("")
  const [rejectSubmitting, setRejectSubmitting] = useState(false)

  const loadListings = useCallback(async (status: string) => {
    setTabLoading(true)
    try {
      const data = await getListingsByStatus(status)
      setListings(data)
    } catch {
      toast({ title: "Error", description: "Failed to load listings.", variant: "destructive" })
    } finally {
      setTabLoading(false)
    }
  }, [getListingsByStatus, toast])

  useEffect(() => {
    getListingStats().catch(() => {})
    loadListings("pending")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (tab: string) => {
    const t = tab as "pending" | "active" | "rejected"
    setActiveTab(t)
    loadListings(t)
  }

  // ── Approve ───────────────────────────────────────────────────────────────
  const handleApprove = async (listing: AdminListing) => {
    setActionLoading(listing.id)
    try {
      await approveListing(listing.id)
      await Promise.all([getListingStats(), loadListings(activeTab)])
      toast({ title: "Approved", description: `"${listing.title}" is now live on the marketplace.` })
    } catch {
      toast({ title: "Error", description: "Failed to approve listing.", variant: "destructive" })
    } finally {
      setActionLoading(null)
    }
  }

  // ── Reject ────────────────────────────────────────────────────────────────
  const openRejectDialog = (listing: AdminListing) => {
    setRejectTarget(listing)
    setRejectReason("")
  }

  const handleRejectSubmit = async () => {
    if (!rejectTarget || !rejectReason.trim()) return
    setRejectSubmitting(true)
    try {
      await rejectListing(rejectTarget.id, rejectReason.trim())
      await Promise.all([getListingStats(), loadListings(activeTab)])
      toast({ title: "Rejected", description: `"${rejectTarget.title}" has been rejected.` })
      setRejectTarget(null)
    } catch {
      toast({ title: "Error", description: "Failed to reject listing.", variant: "destructive" })
    } finally {
      setRejectSubmitting(false)
    }
  }

  // ── Stats cards ───────────────────────────────────────────────────────────
  const stats = [
    { label: "Pending", value: listingStats?.pending ?? 0, icon: Clock,        color: "text-amber-600",  bg: "bg-amber-50  border-amber-200" },
    { label: "Active",  value: listingStats?.active  ?? 0, icon: CheckCircle,  color: "text-green-600",  bg: "bg-green-50  border-green-200" },
    { label: "Rejected",value: listingStats?.rejected?? 0, icon: XCircle,      color: "text-red-600",    bg: "bg-red-50    border-red-200"   },
    { label: "Archived",value: listingStats?.archived?? 0, icon: Package,      color: "text-slate-600",  bg: "bg-slate-50  border-slate-200" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Listings Approval</h1>
        <p className="text-muted-foreground">Review seller listings before they go live on the marketplace.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className={`border ${bg}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="bg-transparent p-0 h-auto gap-6 border-b w-full justify-start rounded-none">
          {([
            { value: "pending",  label: "Pending Review", count: listingStats?.pending  },
            { value: "active",   label: "Approved",       count: listingStats?.active   },
            { value: "rejected", label: "Rejected",       count: listingStats?.rejected },
          ] as const).map(({ value, label, count }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 font-medium text-muted-foreground data-[state=active]:text-foreground transition-all"
            >
              {label}
              {count != null && count > 0 && (
                <Badge className="ml-2 h-5 px-1.5 text-xs" variant={value === "pending" ? "destructive" : "secondary"}>
                  {count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {(["pending", "active", "rejected"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-3 pt-4">
            {tabLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : listings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-center border-2 border-dashed rounded-lg">
                <Package className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-muted-foreground">No {tab} listings at the moment.</p>
              </div>
            ) : (
              listings.map((l) => (
                <ListingRow
                  key={l.id}
                  listing={l}
                  tab={tab}
                  onView={setViewListing}
                  onApprove={tab === "pending" ? handleApprove : undefined}
                  onReject={tab === "pending" ? openRejectDialog : undefined}
                  actionLoading={actionLoading}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* View detail dialog */}
      <Dialog open={!!viewListing} onOpenChange={() => setViewListing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewListing?.title}</DialogTitle>
            <DialogDescription>Listing details</DialogDescription>
          </DialogHeader>
          {viewListing && (() => {
            const images = viewListing.images ?? []
            const location = [viewListing.location?.city, viewListing.location?.country].filter(Boolean).join(", ")
            return (
              <div className="space-y-4 text-sm">

                {/* Image gallery */}
                {images.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Photos ({images.length})</p>
                    <div className="relative bg-muted rounded-lg overflow-hidden h-56">
                      <img
                        src={images[imgIndex]}
                        alt={`Image ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setImgIndex(i => (i + 1) % images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                            {imgIndex + 1} / {images.length}
                          </div>
                        </>
                      )}
                    </div>
                    {images.length > 1 && (
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`shrink-0 w-14 h-14 rounded border-2 overflow-hidden transition-all ${
                              i === imgIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* BOL document */}
                {viewListing.bol_image && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" /> Bill of Lading Document
                    </p>
                    <BolViewer src={viewListing.bol_image} />
                  </div>
                )}

                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-t pt-3">
                  <div className="flex justify-between col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground">Status</span>
                    {statusBadge(viewListing.status)}
                  </div>
                  <div className="flex justify-between col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground">Seller</span>
                    <span className="font-medium">{sellerName(viewListing)}</span>
                  </div>
                  <div className="flex justify-between col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">
                      {viewListing.currency ?? "USD"} {Number(viewListing.price_usd).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">
                      {viewListing.marketplace_category ?? viewListing.category}
                    </span>
                  </div>
                  <div className="flex justify-between col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground">Condition</span>
                    <span className="font-medium capitalize">{viewListing.condition?.replace(/_/g, " ")}</span>
                  </div>
                  {location && (
                    <div className="flex justify-between col-span-2 sm:col-span-1">
                      <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />Location</span>
                      <span className="font-medium">{location}</span>
                    </div>
                  )}
                  <div className="flex justify-between col-span-2 sm:col-span-1">
                    <span className="text-muted-foreground">Submitted</span>
                    <span className="font-medium">{fmtDate(viewListing.created_at)}</span>
                  </div>
                </div>

                {/* Rejection reason */}
                {viewListing.rejection_reason && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="text-xs font-medium text-red-700 mb-1">Rejection reason</p>
                    <p className="text-xs text-red-600">{viewListing.rejection_reason}</p>
                  </div>
                )}

                {/* Description */}
                <div className="border-t pt-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                  <p className="text-foreground whitespace-pre-line leading-relaxed">{viewListing.description}</p>
                </div>
              </div>
            )
          })()}
          <DialogFooter className="gap-2">
            {viewListing?.status === "pending" && (
              <>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => { setViewListing(null); handleApprove(viewListing!) }}
                  disabled={!!actionLoading}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => { setViewListing(null); openRejectDialog(viewListing!) }}
                >
                  <XCircle className="h-4 w-4 mr-2" /> Reject
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setViewListing(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={!!rejectTarget} onOpenChange={() => { setRejectTarget(null); setRejectReason("") }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Listing</DialogTitle>
            <DialogDescription>
              Provide a reason. The seller will see this on their dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm font-medium">{rejectTarget?.title}</p>
            <Textarea
              placeholder="Enter rejection reason (required)…"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {rejectReason.trim() === "" && rejectSubmitting && (
              <p className="text-xs text-destructive">A reason is required before rejecting.</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => { setRejectTarget(null); setRejectReason("") }}
              disabled={rejectSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectSubmit}
              disabled={!rejectReason.trim() || rejectSubmitting}
            >
              {rejectSubmitting ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Rejecting…</>
              ) : (
                <><XCircle className="h-4 w-4 mr-2" />Reject Listing</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
