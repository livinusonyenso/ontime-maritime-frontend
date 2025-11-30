import { MarketplaceListing } from "@/types/maritime"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  MoreHorizontal, 
  BarChart2,
  MapPin,
  Clock
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
  listing: MarketplaceListing
  onEdit: (listing: MarketplaceListing) => void
  onDelete: (id: string) => void
}

export function SellerListingCard({ listing, onEdit, onDelete }: SellerListingCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/50">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="sm:w-48 h-48 sm:h-auto relative bg-muted shrink-0">
          <img
            src={listing.images[0] || "/placeholder.svg"}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge 
              variant={listing.availability === 'available' ? 'default' : 'secondary'}
              className="shadow-sm"
            >
              {listing.availability}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1">{listing.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{listing.location.city}, {listing.location.country}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-lg text-primary">
                  {listing.currency} {listing.price.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {listing.priceType.replace('_', ' ')}
                </div>
              </div>
            </div>

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
                <div className="font-semibold text-xs capitalize">{listing.availability}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(listing)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(listing.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onSelect={() => onEdit(listing)}
                >
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
