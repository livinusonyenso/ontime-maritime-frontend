"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllListings, deleteListing } from "@/store/slices/marketplaceSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, MapPin, DollarSign, Package } from "lucide-react"
import { EditListingModal } from "./EditListingModal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function SellerListingsView() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const allListings = useSelector(selectAllListings)
  
  // Filter listings by current seller
  const myListings = allListings.filter(
    (listing: MarketplaceListing) => listing.sellerId === user?.id
  )

  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null)
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deletingListingId) {
      dispatch(deleteListing(deletingListingId))
      setDeletingListingId(null)
    }
  }

  if (myListings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Listings Yet</h3>
        <p className="text-muted-foreground">
          Create your first listing to start selling on the marketplace
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myListings.map((listing: MarketplaceListing) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[4/3] bg-muted relative">
              <img
                src={listing.images[0] || "/generic-placeholder-300px.png"}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <Badge
                variant={listing.availability === "available" ? "default" : "secondary"}
                className="absolute top-3 left-3"
              >
                {listing.availability}
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {listing.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {listing.location.city}, {listing.location.country}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-lg font-bold">{listing.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">{listing.currency}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {listing.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {listing.condition}
                  </Badge>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => setEditingListing(listing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => setDeletingListingId(listing.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editingListing && (
        <EditListingModal
          open={!!editingListing}
          onClose={() => setEditingListing(null)}
          listing={editingListing}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingListingId} onOpenChange={() => setDeletingListingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
