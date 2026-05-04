import { MarketplaceListing } from "@/types/maritime"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Edit,
  Trash2,
  Eye,
  MessageSquare,
  MoreHorizontal,
  BarChart2,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SellerListingCardProps {
  listing: MarketplaceListing & { status?: string; rejection_reason?: string | null }
  onEdit: (listing: MarketplaceListing) => void
  onDelete: (id: string) => void
}

function StatusBadge({ status }: { status?: string }) {
  switch (status) {
    case "pending":
      return <Badge className="bg-amber-100 text-amber-800 border-amber-300 gap-1"><AlertCircle className="h-3 w-3" />Pending Review</Badge>
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-300 gap-1"><CheckCircle className="h-3 w-3" />Live</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800 border-red-300 gap-1"><XCircle className="h-3 w-3" />Rejected</Badge>
    case "archived":
      return <Badge variant="secondary">Archived</Badge>
    default:
      return null
  }
}

function borderColor(status?: string) {
  switch (status) {
    case "pending":  return "border-l-amber-400"
    case "active":   return "border-l-green-500"
    case "rejected": return "border-l-red-500"
    default:         return "border-l-primary/50"
  }
}

export function SellerListingCard({ listing, onEdit, onDelete }: SellerListingCardProps) {
  const isPending  = listing.status === "pending"
  const isRejected = listing.status === "rejected"
  const isDimmed   = isPending || isRejected

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-all duration-200 border-l-4 ${borderColor(listing.status)}`}>
      <div className={`flex flex-col sm:flex-row ${isDimmed ? "opacity-75" : ""}`}>
        {/* Image */}
        <div className="sm:w-48 h-48 sm:h-auto relative bg-muted shrink-0">
          <img
            src={listing.images?.[0] || "/placeholder.svg"}
            alt={listing.title}
            className={`w-full h-full object-cover ${isDimmed ? "grayscale" : ""}`}
          />
          <div className="absolute top-2 left-2">
            <StatusBadge status={listing.status} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>
                    {[listing.location?.city, listing.location?.country].filter(Boolean).join(", ") || "Location not set"}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-lg text-primary">
                  {listing.currency} {listing.price?.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {listing.priceType?.replace("_", " ")}
                </div>
              </div>
            </div>

            {/* Pending notice */}
            {isPending && (
              <Alert className="mt-3 border-amber-300 bg-amber-50 py-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-700 text-xs">
                  Awaiting admin review — not yet visible on the marketplace.
                </AlertDescription>
              </Alert>
            )}

            {/* Rejection reason */}
            {isRejected && listing.rejection_reason && (
              <Alert className="mt-3 border-red-300 bg-red-50 py-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700 text-xs">
                  <span className="font-medium">Rejected: </span>{listing.rejection_reason}
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
                  <Eye className="h-3 w-3" /> Views
                </div>
                <div className="font-semibold">{listing.views || 0}</div>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
                  <MessageSquare className="h-3 w-3" /> Inquiries
                </div>
                <div className="font-semibold">{listing.inquiries || 0}</div>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-3 w-3" /> Posted
                </div>
                <div className="font-semibold text-xs truncate">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center">
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1 mb-1">
                  <BarChart2 className="h-3 w-3" /> Status
                </div>
                <div className="font-semibold text-xs capitalize">{listing.status ?? listing.availability}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(listing)} disabled={isPending}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(listing.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" onSelect={() => onEdit(listing)} disabled={isPending}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Listing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <BarChart2 className="h-4 w-4 mr-2" /> View Analytics
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onSelect={() => onDelete(listing.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Listing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  )
}
