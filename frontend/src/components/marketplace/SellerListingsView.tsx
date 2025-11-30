"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSellerListings, deleteSellerListing } from "@/store/slices/sellerListingSlice"
import { deleteListing } from "@/store/slices/marketplaceSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { useAuth } from "@/contexts/auth-context"
import { Package } from "lucide-react"
import { EditListingModal } from "./EditListingModal"
import { SellerListingCard } from "./SellerListingCard"
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
  const myListings = useSelector(selectSellerListings)
  
  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null)
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deletingListingId) {
      dispatch(deleteSellerListing(deletingListingId))
      dispatch(deleteListing(deletingListingId)) // Sync with marketplace
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
      <div className="flex flex-col gap-4">
        {myListings.map((listing: MarketplaceListing) => (
          <SellerListingCard
            key={listing.id}
            listing={listing}
            onEdit={setEditingListing}
            onDelete={setDeletingListingId}
          />
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
