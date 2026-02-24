"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectSellerListings, selectSellerListingsLoading, selectSellerSubmitting, deleteListing, fetchSellerListings } from "@/store/slices/sellerListingSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { useAuth } from "@/contexts/auth-context"
import { Package, Loader2, AlertCircle } from "lucide-react"
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
  const myListings  = useSelector(selectSellerListings)
  const loading     = useSelector(selectSellerListingsLoading)
  const submitting  = useSelector(selectSellerSubmitting)

  const [editingListing, setEditingListing]     = useState<MarketplaceListing | null>(null)
  const [deletingListingId, setDeletingListingId] = useState<string | null>(null)
  const [deleteError, setDeleteError]             = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchSellerListings() as any)
  }, [dispatch])

  const handleDelete = async () => {
    if (!deletingListingId) return
    setDeleteError(null)
    const result = await (dispatch as any)(deleteListing(deletingListingId))
    if (deleteListing.fulfilled.match(result)) {
      setDeletingListingId(null)
    } else {
      setDeleteError((result.payload as string) ?? "Failed to delete listing")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
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
      <AlertDialog open={!!deletingListingId} onOpenChange={() => { setDeletingListingId(null); setDeleteError(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this listing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {deleteError}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={submitting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Deleting...</> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
