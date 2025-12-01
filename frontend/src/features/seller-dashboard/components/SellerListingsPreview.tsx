"use client"

import { cn } from "@/lib/utils"
import { MarketplaceListing } from "@/types/maritime"
import {
  Eye,
  MessageSquare,
  Edit,
  Trash2,
  MoreHorizontal,
  MapPin,
  Package,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

interface SellerListingsPreviewProps {
  listings: MarketplaceListing[]
  maxListings?: number
  onEdit?: (listing: MarketplaceListing) => void
  onDelete?: (id: string) => void
  showViewAll?: boolean
}

export function SellerListingsPreview({
  listings,
  maxListings = 3,
  onEdit,
  onDelete,
  showViewAll = true,
}: SellerListingsPreviewProps) {
  const displayedListings = listings.slice(0, maxListings)

  const statusColors = {
    available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    sold: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    rented: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/50">
            <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">My Listings</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {listings.length} {listings.length === 1 ? "listing" : "listings"} total
            </p>
          </div>
        </div>
        {showViewAll && listings.length > 0 && (
          <Link
            to="/dashboard/seller/listings"
            className="group flex items-center gap-1 text-sm font-medium text-amber-600 transition-colors hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Manage All
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Listings */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {displayedListings.map((listing) => (
          <div
            key={listing.id}
            className="group flex gap-4 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            {/* Image */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
              <img
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-1 left-1">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    statusColors[listing.availability]
                  )}
                >
                  {listing.availability}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white truncate">
                  {listing.title}
                </h4>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3 w-3" />
                  {listing.location.city}, {listing.location.country}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Eye className="h-3.5 w-3.5" />
                  {listing.views || 0}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {listing.inquiries || 0}
                </span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-end justify-between">
              <div className="text-right">
                <p className="font-bold text-slate-900 dark:text-white">
                  {listing.currency} {listing.price.toLocaleString()}
                </p>
                <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                  {listing.priceType.replace("_", " ")}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(listing)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => onDelete?.(listing.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {listings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
            <Package className="h-8 w-8 text-slate-400" />
          </div>
          <h4 className="mt-4 font-medium text-slate-900 dark:text-white">No Listings Yet</h4>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Create your first listing to start selling
          </p>
        </div>
      )}
    </div>
  )
}
