
"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
  Store, Search, MapPin, Star, Eye, Heart, MessageSquare,
  CheckCircle2, Package, Plus, Loader2, Bot, DollarSign, ShieldCheck
} from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectListing,
  clearSelectedListing,
  setFilterCategory,
  setSearchQuery,
  setSortBy,
  addListing,
  addPurchaseRequest,
  addSellerProfile
} from "@/store/slices/marketplaceSlice"

import XCircle from "@/components/icons/x-circle"
import { useTranslation } from "react-i18next"

export default function MarketplaceMain() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const {
    listings,
    selectedListing,
    filterCategory,
    searchQuery,
    sortBy
  } = useAppSelector((state) => state.marketplace)

  const [showListingDialog, setShowListingDialog] = useState(false)
  const [showSellerRegisterDialog, setShowSellerRegisterDialog] = useState(false)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const [newListing, setNewListing] = useState({
    sellerId: "seller1",
    sellerName: "",
    sellerRating: 0,
    category: "",
    title: "",
    description: "",
    price: 0,
    priceType: "fixed",
    currency: "USD",
    images: [] as string[],
    location: { country: "", city: "", port: "" },
    specifications: {} as Record<string, string>,
    condition: "good",
    availability: "available",
    bolRequired: false,
    bolNumber: "",
    bolVerified: false,
    featured: false,
  })

  const [sellerForm, setSellerForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    country: "",
  })

  const [purchaseForm, setPurchaseForm] = useState({
    message: "",
    bolNumber: "",
  })

  // FILTERING
  const filteredListings = listings.filter((listing) => {
    const matchesCategory = filterCategory === "all" || listing.category === filterCategory
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // SORTING
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "container":
        return <Package className="h-5 w-5" />
      case "warehouse":
        return <Package className="h-5 w-5" />
      case "crane":
        return <Package className="h-5 w-5" />
      case "equipment":
        return <Package className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  // CREATE LISTING
  const handleCreateListing = () => {
    dispatch(addListing(newListing))
    setShowListingDialog(false)
    setNewListing({
      sellerId: "seller1",
      sellerName: "",
      sellerRating: 0,
      category: "",
      title: "",
      description: "",
      price: 0,
      priceType: "fixed",
      currency: "USD",
      images: [],
      location: { country: "", city: "", port: "" },
      specifications: {},
      condition: "good",
      availability: "available",
      bolRequired: false,
      bolNumber: "",
      bolVerified: false,
      featured: false,
    })
  }

  // REGISTER SELLER
  const handleSellerRegister = () => {
    dispatch(addSellerProfile(sellerForm))
    setShowSellerRegisterDialog(false)
    setSellerForm({ businessName: "", email: "", phone: "", country: "" })
  }

  // AI VERIFY
  const handleVerifyAndPay = () => {
    setIsVerifying(true)
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
    }, 2000)
  }

  // CONFIRM PAYMENT
  const handleConfirmPurchase = () => {
    const transactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase()

    if (selectedListing) {
      dispatch(
        addPurchaseRequest({
          listingId: selectedListing.id,
          buyerId: "buyer1",
          buyerName: "Current User",
          sellerId: selectedListing.sellerId,
          sellerName: selectedListing.sellerName,
          message: purchaseForm.message,
          bolNumber: purchaseForm.bolNumber,
        })
      )
    }

    setVerificationResult((prev: any) => ({
      ...prev,
      paymentComplete: true,
      transactionId,
    }))
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Store className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{t("marketplace.hero.badge")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("marketplace.hero.title")}
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              {t("marketplace.hero.description")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" onClick={() => setShowSellerRegisterDialog(true)}>
                <Plus className="h-5 w-5 mr-2" />
                {t("marketplace.hero.becomeSeller")}
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowListingDialog(true)}>
                {t("marketplace.hero.postListing")}
              </Button>
            </div>

            {/* Search */}
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t("marketplace.hero.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="pl-10 h-12"
                />
              </div>

              <Select
                value={filterCategory}
                onValueChange={(value) => dispatch(setFilterCategory(value))}
              >
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder={t("marketplace.hero.categoryPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("marketplace.categories.all")}</SelectItem>
                  <SelectItem value="equipment">{t("marketplace.categories.equipment")}</SelectItem>
                  <SelectItem value="warehouse">{t("marketplace.categories.warehouse")}</SelectItem>
                  <SelectItem value="container">{t("marketplace.categories.container")}</SelectItem>
                  <SelectItem value="crane">{t("marketplace.categories.crane")}</SelectItem>
                  <SelectItem value="spare_parts">{t("marketplace.categories.spare_parts")}</SelectItem>
                  <SelectItem value="repairs">{t("marketplace.categories.repairs")}</SelectItem>
                  <SelectItem value="insurance">{t("marketplace.categories.insurance")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <section className="border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">{t("marketplace.categories.popular")}</span>

            {["container", "warehouse", "crane", "spare_parts", "insurance"].map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setFilterCategory(cat))}
                className="whitespace-nowrap"
              >
                {getCategoryIcon(cat)}
                <span className="ml-2 capitalize">{cat.replace("_", " ")}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{t("marketplace.listings.title")}</h2>
              <p className="text-muted-foreground">
                {t("marketplace.listings.available", { count: sortedListings.length })}
              </p>
            </div>

            <Select
              value={sortBy}
              onValueChange={(value: any) => dispatch(setSortBy(value))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("marketplace.listings.sortPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("marketplace.listings.newest")}</SelectItem>
                <SelectItem value="price_low">{t("marketplace.listings.priceLow")}</SelectItem>
                <SelectItem value="price_high">{t("marketplace.listings.priceHigh")}</SelectItem>
                <SelectItem value="rating">{t("marketplace.listings.highestRated")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => dispatch(selectListing(listing.id))}
              >
                {/* IMAGE */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {listing.images?.[0] ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getCategoryIcon(listing.category)}
                    </div>
                  )}

                  {listing.featured && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500">{t("marketplace.listings.featured")}</Badge>
                  )}
                  {listing.bolVerified && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> {t("marketplace.listings.bolVerified")}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="capitalize">
                      {listing.category.replace("_", " ")}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {listing.views}
                    </div>
                  </div>

                  <h3 className="font-semibold line-clamp-2 mb-2">{listing.title}</h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    {listing.location.city}, {listing.location.country}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ${listing.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {listing.priceType.replace("_", " ")}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{listing.sellerRating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedListings.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">{t("marketplace.listings.noResults")}</h3>
                <p className="text-muted-foreground">{t("marketplace.listings.noResultsDesc")}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* ===== LISTING DETAIL DIALOG ===== */}
      {selectedListing && !showPurchaseDialog && (
        <Dialog open={!!selectedListing} onOpenChange={() => dispatch(clearSelectedListing())}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Images */}
              <div>
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden mb-4">
                  {selectedListing.images?.[0] ? (
                    <img
                      src={selectedListing.images[0]}
                      alt={selectedListing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getCategoryIcon(selectedListing.category)}
                    </div>
                  )}
                </div>
              </div>

              {/* DETAILS */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedListing.category.replace("_", " ")}
                  </Badge>
                  <Badge>
                    {selectedListing.availability}
                  </Badge>
                  {selectedListing.bolVerified && (
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> {t("marketplace.listings.bolVerified")}
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-2">{selectedListing.title}</h2>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  {selectedListing.location.city}, {selectedListing.location.country}
                </div>

                <div className="text-3xl font-bold text-primary mb-4">
                  ${selectedListing.price.toLocaleString()}
                </div>

                <p className="text-muted-foreground mb-4">
                  {selectedListing.description}
                </p>

                {/* Seller */}
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {selectedListing.sellerName.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedListing.sellerName}</div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {selectedListing.sellerRating}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {t("marketplace.listings.contact")}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="lg" onClick={() => setShowPurchaseDialog(true)}>
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    {t("marketplace.purchase.verifyPay")}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ===== VERIFY & PAY DIALOG ===== */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {t("marketplace.purchase.title")}
            </DialogTitle>
            <DialogDescription>
              {t("marketplace.purchase.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {!verificationResult ? (
              <>
                <Label>{t("marketplace.purchase.bolLabel")}</Label>
                <Input
                  value={purchaseForm.bolNumber}
                  onChange={(e) =>
                    setPurchaseForm({ ...purchaseForm, bolNumber: e.target.value })
                  }
                  placeholder={t("marketplace.purchase.bolPlaceholder")}
                />

                <Label>{t("marketplace.purchase.messageLabel")}</Label>
                <Textarea
                  value={purchaseForm.message}
                  onChange={(e) =>
                    setPurchaseForm({ ...purchaseForm, message: e.target.value })
                  }
                  placeholder={t("marketplace.purchase.messagePlaceholder")}
                />

                <Button className="w-full" onClick={handleVerifyAndPay} disabled={isVerifying}>
                  {isVerifying ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t("marketplace.purchase.verifying")}
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      {t("marketplace.purchase.runVerification")}
                    </>
                  )}
                </Button>
              </>
            ) : verificationResult.paymentComplete ? (
              <div className="text-center space-y-4 py-6">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-green-700">{t("marketplace.purchase.paymentSuccess")}</h3>

                <div className="bg-muted p-4 rounded-lg text-left">
                  <p className="text-sm text-muted-foreground">{t("marketplace.purchase.transactionId")}</p>
                  <p className="font-mono font-medium">
                    {verificationResult.transactionId}
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setShowPurchaseDialog(false)
                    setVerificationResult(null)
                    dispatch(clearSelectedListing())
                  }}
                >
                  {t("marketplace.purchase.done")}
                </Button>
              </div>
            ) : (
              <>
                {/* AI results */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {t("marketplace.purchase.verificationComplete")}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      {verificationResult.bolValid ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      {t("marketplace.purchase.bolValid")}
                    </div>

                    <div className="flex items-center gap-2">
                      {verificationResult.ownershipVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      {t("marketplace.purchase.ownershipVerified")}
                    </div>

                    <div className="flex items-center gap-2">
                      {verificationResult.originVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      {t("marketplace.purchase.originVerified")}
                    </div>

                    <div className="flex items-center gap-2">
                      {verificationResult.destinationVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      {t("marketplace.purchase.destinationVerified")}
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleConfirmPurchase}>
                  <DollarSign className="h-5 w-5 mr-2" />
                  {t("marketplace.purchase.proceedPayment")}
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== SELLER REGISTER ===== */}
      <Dialog open={showSellerRegisterDialog} onOpenChange={setShowSellerRegisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("marketplace.seller.title")}</DialogTitle>
            <DialogDescription>
              {t("marketplace.seller.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Label>{t("marketplace.seller.businessName")}</Label>
            <Input
              value={sellerForm.businessName}
              onChange={(e) => setSellerForm({ ...sellerForm, businessName: e.target.value })}
            />

            <Label>{t("marketplace.seller.email")}</Label>
            <Input
              value={sellerForm.email}
              onChange={(e) => setSellerForm({ ...sellerForm, email: e.target.value })}
            />

            <Label>{t("marketplace.seller.phone")}</Label>
            <Input
              value={sellerForm.phone}
              onChange={(e) => setSellerForm({ ...sellerForm, phone: e.target.value })}
            />

            <Label>{t("marketplace.seller.country")}</Label>
            <Input
              value={sellerForm.country}
              onChange={(e) => setSellerForm({ ...sellerForm, country: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSellerRegisterDialog(false)}>
              {t("marketplace.seller.cancel")}
            </Button>
            <Button
              onClick={handleSellerRegister}
              disabled={!sellerForm.businessName || !sellerForm.email || !sellerForm.phone}
            >
              {t("marketplace.seller.register")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===== CREATE LISTING ===== */}
      <Dialog open={showListingDialog} onOpenChange={setShowListingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("marketplace.createListing.title")}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* CATEGORY */}
            <Label>{t("marketplace.createListing.categoryLabel")}</Label>
            <Select
              value={newListing.category}
              onValueChange={(value: any) => setNewListing({ ...newListing, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("marketplace.createListing.categoryPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipment">{t("marketplace.categories.equipment")}</SelectItem>
                <SelectItem value="warehouse">{t("marketplace.categories.warehouse")}</SelectItem>
                <SelectItem value="container">{t("marketplace.categories.container")}</SelectItem>
                <SelectItem value="crane">{t("marketplace.categories.crane")}</SelectItem>
                <SelectItem value="spare_parts">{t("marketplace.categories.spare_parts")}</SelectItem>
                <SelectItem value="repairs">{t("marketplace.categories.repairs")}</SelectItem>
                <SelectItem value="insurance">{t("marketplace.categories.insurance")}</SelectItem>
              </SelectContent>
            </Select>

            <Label>{t("marketplace.createListing.titleLabel")}</Label>
            <Input
              value={newListing.title}
              onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
            />

            <Label>{t("marketplace.createListing.descriptionLabel")}</Label>
            <Textarea
              value={newListing.description}
              onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
            />

            <Label>{t("marketplace.createListing.priceLabel")}</Label>
            <Input
              type="number"
              value={newListing.price}
              onChange={(e) => setNewListing({ ...newListing, price: Number(e.target.value) })}
            />

            <Label>{t("marketplace.createListing.locationLabel")}</Label>
            <Input
              value={newListing.location.country}
              onChange={(e) =>
                setNewListing({
                  ...newListing,
                  location: { ...newListing.location, country: e.target.value },
                })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowListingDialog(false)}>
              {t("marketplace.createListing.cancel")}
            </Button>
            <Button
              onClick={handleCreateListing}
              disabled={!newListing.category || !newListing.title || !newListing.price}
            >
              {t("marketplace.createListing.create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
