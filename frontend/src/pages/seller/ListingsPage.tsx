"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useListings } from "@/contexts/listings-context"
import { useAppSelector } from "@/store/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ListingDialog } from "@/components/seller/listing-dialog"
import { Plus, Search, Edit, Trash2, Package, MapPin, DollarSign, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import type { Listing } from "@/types"
import type { MarketplaceListing } from "@/types/maritime"
import type { RootState } from "@/store"

export default function SellerListingsPage() {
  const { listings: contextListings, deleteListing, getAllListings, searchListings } = useListings()
  const marketplaceListings = useAppSelector((state: RootState) => state.marketplace.listings)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingListing, setEditingListing] = useState<Listing | null>(null)
  const { toast } = useToast()

  // Merge context listings with Redux listings (mapped to Listing type)
  const reduxListings: Listing[] = marketplaceListings
    .filter((l: MarketplaceListing) => l.sellerId === "current-user" || l.sellerId === "seller1")
    .map((l: MarketplaceListing) => ({
      id: l.id,
      seller_id: l.sellerId,
      category: l.category as any,
      title: l.title,
      description: l.description,
      price_usd: l.price,
      origin_port: l.location.port || l.location.city,
      destination_port: "N/A", // Dummy default
      container_number: l.bolNumber || null,
      eta: null,
      photos: l.images,
      certificates: [],
      is_perishable: false,
      is_dangerous: false,
      is_high_value: false,
      status: "active",
      created_at: l.createdAt,
      updated_at: l.updatedAt,
    }))

  const listings = [...reduxListings, ...contextListings]

  // Load initial listings
  useEffect(() => {
    getAllListings()
  }, []) // Empty dependency array to load once on mount

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchListings(searchQuery)
    } else {
      getAllListings()
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteListing(id)
        toast({ title: "Listing deleted", description: "The listing has been removed." })
      } catch (error) {
        toast({ title: "Error", description: "Failed to delete listing.", variant: "destructive" })
      }
    }
  }

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingListing(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <p className="text-muted-foreground">Manage your cargo and vessel listings.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Create Listing
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="bg-background/50">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="font-semibold text-lg">No listings found</h3>
          <p className="text-muted-foreground mb-6">Create your first listing to start selling.</p>
          <Button onClick={handleCreate}>Create Listing</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden flex flex-col hover:shadow-md transition-all">
              <div className="aspect-video bg-muted relative">
                <img
                  src={listing.photos[0] || `/generic-placeholder-300px.png?height=300&width=600`}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className="absolute top-2 right-2 uppercase"
                  variant={listing.status === "active" ? "default" : "secondary"}
                >
                  {listing.status}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1 text-lg" title={listing.title}>
                      {listing.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-1">{listing.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">Open menu</span>
                        <div className="flex flex-col gap-0.5">
                          <span className="h-1 w-1 bg-current rounded-full" />
                          <span className="h-1 w-1 bg-current rounded-full" />
                          <span className="h-1 w-1 bg-current rounded-full" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(listing)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(listing.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{listing.origin_port}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>${listing.price_usd.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {listing.is_perishable && (
                    <Badge variant="outline" className="text-xs">
                      Perishable
                    </Badge>
                  )}
                  {listing.is_dangerous && (
                    <Badge variant="outline" className="text-xs">
                      Dangerous
                    </Badge>
                  )}
                  {listing.is_high_value && (
                    <Badge variant="outline" className="text-xs">
                      High Value
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ListingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} listing={editingListing} />
    </div>
  )
}
