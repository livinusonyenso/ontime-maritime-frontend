"use client"

import { useState } from "react"
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
  XCircle,
} from "lucide-react"

export function MarketplaceView() {
  const dispatch = useAppDispatch()
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

  // New Listing Form
  const [newListing, setNewListing] = useState({
    sellerId: "seller1",
    sellerName: "",
    sellerRating: 0,
    category: "" as any,
    title: "",
    description: "",
    price: 0,
    priceType: "fixed" as any,
    currency: "USD",
    images: [] as string[],
    location: {
      country: "",
      city: "",
      port: "",
    },
    specifications: {} as Record<string, string>,
    condition: "good" as any,
    availability: "available" as any,
    bolRequired: false,
    bolNumber: "",
    bolVerified: false,
    featured: false,
  })

  // Seller Registration Form
  const [sellerForm, setSellerForm] = useState({
    businessName: "",
    email: "",
    phone: "",
    country: "",
  })

  // Purchase Form
  const [purchaseForm, setPurchaseForm] = useState({
    message: "",
    bolNumber: "",
  })

  const filteredListings = listings.filter((listing) => {
    const matchesCategory = filterCategory === "all" || listing.category === filterCategory
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        return <Wrench className="h-5 w-5" />
      case "repairs":
        return <Wrench className="h-5 w-5" />
      case "insurance":
        return <Shield className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const handleCreateListing = () => {
    dispatch(addListing(newListing))
    setShowListingDialog(false)
    setNewListing({
      sellerId: "seller1",
      sellerName: "",
      sellerRating: 0,
      category: "" as any,
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

  const handleSellerRegister = () => {
    dispatch(addSellerProfile(sellerForm))
    setShowSellerRegisterDialog(false)
    setSellerForm({ businessName: "", email: "", phone: "", country: "" })
  }

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
    setShowPurchaseDialog(false)
    setVerificationResult(null)
    setPurchaseForm({ message: "", bolNumber: "" })
    dispatch(clearSelectedListing())
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Store className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Maritime Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Equipment & Warehouse Marketplace
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Buy and sell maritime equipment, warehouse space, containers, cranes, 
              spare parts, repairs, and insurance services.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" onClick={() => setShowSellerRegisterDialog(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Become a Seller
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowListingDialog(true)}>
                Post a Listing
              </Button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search equipment, warehouses, containers..."
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
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="warehouse">Warehouses</SelectItem>
                  <SelectItem value="container">Containers</SelectItem>
                  <SelectItem value="crane">Cranes</SelectItem>
                  <SelectItem value="spare_parts">Spare Parts</SelectItem>
                  <SelectItem value="repairs">Repairs</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Popular:</span>
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

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Browse Listings</h2>
              <p className="text-muted-foreground">
                {sortedListings.length} listings available
              </p>
            </div>
            <Select
              value={sortBy}
              onValueChange={(value: any) => dispatch(setSortBy(value))}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => dispatch(selectListing(listing.id))}
              >
                {/* Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {listing.images[0] ? (
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
                    <Badge className="absolute top-2 left-2 bg-yellow-500">Featured</Badge>
                  )}
                  {listing.bolVerified && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> BOL Verified
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
                <h3 className="font-semibold mb-2">No Listings Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Listing Detail Dialog */}
      {selectedListing && !showPurchaseDialog && (
        <Dialog open={!!selectedListing} onOpenChange={() => dispatch(clearSelectedListing())}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Images */}
              <div>
                <div className="relative h-64 bg-muted rounded-lg overflow-hidden mb-4">
                  {selectedListing.images[0] ? (
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
                <div className="flex gap-2">
                  {selectedListing.images.slice(1).map((img, i) => (
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
                    {selectedListing.category.replace("_", " ")}
                  </Badge>
                  <Badge
                    variant={selectedListing.availability === "available" ? "default" : "secondary"}
                  >
                    {selectedListing.availability}
                  </Badge>
                  {selectedListing.bolVerified && (
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> BOL Verified
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-2">{selectedListing.title}</h2>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  {selectedListing.location.port && `${selectedListing.location.port}, `}
                  {selectedListing.location.city}, {selectedListing.location.country}
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-primary">
                    ${selectedListing.price.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground ml-2 capitalize">
                      {selectedListing.priceType.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{selectedListing.description}</p>

                {/* Specifications */}
                {Object.keys(selectedListing.specifications).length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(selectedListing.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between bg-muted/50 p-2 rounded">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seller Info */}
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {selectedListing.sellerName.split(" ").map((n) => n[0]).join("")}
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
                      Contact
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={() => {
                      setShowPurchaseDialog(true)
                    }}
                  >
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Verify & Pay
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {selectedListing.views} views
                  <span className="mx-2">•</span>
                  <MessageSquare className="h-4 w-4" />
                  {selectedListing.inquiries} inquiries
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

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
                  <Input
                    value={purchaseForm.bolNumber}
                    onChange={(e) =>
                      setPurchaseForm({ ...purchaseForm, bolNumber: e.target.value })
                    }
                    placeholder="Enter BOL number for verification"
                  />
                </div>

                <div>
                  <Label>Message to Seller</Label>
                  <Textarea
                    value={purchaseForm.message}
                    onChange={(e) =>
                      setPurchaseForm({ ...purchaseForm, message: e.target.value })
                    }
                    placeholder="Any questions or special requests..."
                    rows={3}
                  />
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
            ) : (
              <>
                <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-600">Verification Complete</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      {verificationResult.bolValid ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      BOL Valid
                    </div>
                    <div className="flex items-center gap-2">
                      {verificationResult.ownershipVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      Ownership Verified
                    </div>
                    <div className="flex items-center gap-2">
                      {verificationResult.originVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      Origin Verified
                    </div>
                    <div className="flex items-center gap-2">
                      {verificationResult.destinationVerified ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      Destination Verified
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-800">
                    <Badge className={`${
                      verificationResult.riskLevel === "low" ? "bg-green-500" :
                      verificationResult.riskLevel === "medium" ? "bg-yellow-500" :
                      "bg-red-500"
                    } text-white`}>
                      Risk Level: {verificationResult.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {selectedListing && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="text-2xl font-bold">
                        ${selectedListing.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button className="w-full" size="lg" onClick={handleConfirmPurchase}>
                  <DollarSign className="h-5 w-5 mr-2" />
                  Confirm Purchase
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Seller Registration Dialog */}
      <Dialog open={showSellerRegisterDialog} onOpenChange={setShowSellerRegisterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Become a Seller</DialogTitle>
            <DialogDescription>
              Simple 1-step onboarding. Start posting goods instantly after registration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Full/Business Name *</Label>
              <Input
                value={sellerForm.businessName}
                onChange={(e) =>
                  setSellerForm({ ...sellerForm, businessName: e.target.value })
                }
                placeholder="Your business name"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={sellerForm.email}
                onChange={(e) =>
                  setSellerForm({ ...sellerForm, email: e.target.value })
                }
                placeholder="email@business.com"
              />
            </div>
            <div>
              <Label>Phone Number *</Label>
              <Input
                value={sellerForm.phone}
                onChange={(e) =>
                  setSellerForm({ ...sellerForm, phone: e.target.value })
                }
                placeholder="+234..."
              />
            </div>
            <div>
              <Label>Country *</Label>
              <Input
                value={sellerForm.country}
                onChange={(e) =>
                  setSellerForm({ ...sellerForm, country: e.target.value })
                }
                placeholder="Nigeria"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSellerRegisterDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSellerRegister}
              disabled={
                !sellerForm.businessName ||
                !sellerForm.email ||
                !sellerForm.phone ||
                !sellerForm.country
              }
            >
              Register & Start Selling
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Listing Dialog */}
      <Dialog open={showListingDialog} onOpenChange={setShowListingDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Listing</DialogTitle>
            <DialogDescription>
              Post your equipment, warehouse, or services to the marketplace.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select
                  value={newListing.category}
                  onValueChange={(value: any) =>
                    setNewListing({ ...newListing, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="container">Container</SelectItem>
                    <SelectItem value="crane">Crane</SelectItem>
                    <SelectItem value="spare_parts">Spare Parts</SelectItem>
                    <SelectItem value="repairs">Repairs</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition</Label>
                <Select
                  value={newListing.condition}
                  onValueChange={(value: any) =>
                    setNewListing({ ...newListing, condition: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like_new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Title *</Label>
              <Input
                value={newListing.title}
                onChange={(e) =>
                  setNewListing({ ...newListing, title: e.target.value })
                }
                placeholder="Brief, descriptive title"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={newListing.description}
                onChange={(e) =>
                  setNewListing({ ...newListing, description: e.target.value })
                }
                placeholder="Detailed description of your listing..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price ($) *</Label>
                <Input
                  type="number"
                  value={newListing.price || ""}
                  onChange={(e) =>
                    setNewListing({ ...newListing, price: Number(e.target.value) })
                  }
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label>Price Type</Label>
                <Select
                  value={newListing.priceType}
                  onValueChange={(value: any) =>
                    setNewListing({ ...newListing, priceType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                    <SelectItem value="per_day">Per Day</SelectItem>
                    <SelectItem value="per_month">Per Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Country</Label>
                <Input
                  value={newListing.location.country}
                  onChange={(e) =>
                    setNewListing({
                      ...newListing,
                      location: { ...newListing.location, country: e.target.value },
                    })
                  }
                  placeholder="Nigeria"
                />
              </div>
              <div>
                <Label>City</Label>
                <Input
                  value={newListing.location.city}
                  onChange={(e) =>
                    setNewListing({
                      ...newListing,
                      location: { ...newListing.location, city: e.target.value },
                    })
                  }
                  placeholder="Lagos"
                />
              </div>
              <div>
                <Label>Port (optional)</Label>
                <Input
                  value={newListing.location.port || ""}
                  onChange={(e) =>
                    setNewListing({
                      ...newListing,
                      location: { ...newListing.location, port: e.target.value },
                    })
                  }
                  placeholder="Apapa Port"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowListingDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateListing}
              disabled={!newListing.category || !newListing.title || !newListing.price}
            >
              Create Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
