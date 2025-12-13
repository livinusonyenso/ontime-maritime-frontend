"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAuth } from "@/contexts/auth-context"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  selectListing,
  clearSelectedListing,
  setFilterCategory,
  setSearchQuery,
  setSortBy,
  addListing,
  addPurchaseRequest,
  addSellerProfile,
} from "@/store/slices/marketplaceSlice"

import {
  Store,
  Search,
  MapPin,
  Star,
  Eye,
  Heart,
  MessageSquare,
  Shield,
  CheckCircle2,
  Package,
  Warehouse,
  Container,
  Wrench,
  Plus,
  DollarSign,
  Anchor,
  Settings,
  ShieldCheck,
  Loader2,
  Bot,
} from "lucide-react"

export default function MarketplacePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isAuthenticated } = useAuth()
  const {
    listings,
    selectedListing,
    filterCategory,
    searchQuery,
    sortBy,
  } = useAppSelector((state) => state.marketplace)

  const [showListingDialog, setShowListingDialog] = useState(false)
  const [showSellerRegisterDialog, setShowSellerRegisterDialog] = useState(false)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  /* ------------------ OPTION A HANDLER ------------------ */
const handleProtectedAction = (action: "seller" | "listing") => {

  if (!isAuthenticated) {
    navigate("/login", {
      state: { redirectTo: "/marketplace" },
    })
    return
  }



  if (action === "seller") {
    setShowSellerRegisterDialog(true)
  } else {
    setShowListingDialog(true)
  }
}



  /* ------------------ HELPERS ------------------ */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "container":
        return <Container className="h-5 w-5" />
      case "warehouse":
        return <Warehouse className="h-5 w-5" />
      case "crane":
        return <Anchor className="h-5 w-5" />
      case "equipment":
        return <Settings className="h-5 w-5" />
      case "spare_parts":
      case "repairs":
        return <Wrench className="h-5 w-5" />
      case "insurance":
        return <Shield className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const filteredListings = listings.filter((l) => {
    const matchesCategory =
      filterCategory === "all" || l.category === filterCategory
    const matchesSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price
      case "price_high":
        return b.price - a.price
      case "rating":
        return b.sellerRating - a.sellerRating
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  /* ------------------ PAGE ------------------ */
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Store className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                Maritime Marketplace
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Equipment & Warehouse Marketplace
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Buy and sell maritime equipment, warehouses, containers, cranes,
              spare parts, repairs, and insurance services.
            </p>

            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => handleProtectedAction("seller")}>
                <Plus className="h-5 w-5 mr-2" />
                Become a Seller
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleProtectedAction("listing")}
              >
                Post a Listing
              </Button>
            </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedListings.map((listing) => (
                <Card
                  key={listing.id}
                  className="cursor-pointer hover:shadow-lg"
                  onClick={() => dispatch(selectListing(listing.id))}
                >
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {listing.images[0]
                      ? <img src={listing.images[0]} className="h-full w-full object-cover" />
                      : getCategoryIcon(listing.category)}
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{listing.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {listing.location.city}, {listing.location.country}
                    </p>
                    <div className="text-2xl font-bold text-primary">
                      ${listing.price.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
