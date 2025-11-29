"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { unlockBol, selectUnlockedBols } from "@/store/slices/marketplaceSlice"
import { useAuth } from "@/contexts/auth-context"
import type { MarketplaceListing } from "@/types/maritime"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Package, FileText, CheckCircle, ShieldCheck, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ListingDetailModalProps {
  open: boolean
  onClose: () => void
  listing: MarketplaceListing | null
}

export function ListingDetailModal({ open, onClose, listing }: ListingDetailModalProps) {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const unlockedBols = useSelector((state: any) => selectUnlockedBols(state, user?.id || ""))
  
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  if (!listing) return null

  const isBolUnlocked = unlockedBols.includes(listing.id)
  const hasBol = !!listing.bolImage

  const handleVerifyBol = () => {
    if (!user) {
      alert("Please login to verify BOL")
      return
    }

    setIsProcessingPayment(true)
    
    // Simulate payment processing
    setTimeout(() => {
      dispatch(unlockBol({ userId: user.id, listingId: listing.id }))
      setIsProcessingPayment(false)
      setPaymentSuccess(true)
      
      // Reset success message after 3 seconds
      setTimeout(() => setPaymentSuccess(false), 3000)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{listing.title}</DialogTitle>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{listing.location.city}, {listing.location.country}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {listing.currency} {listing.price.toLocaleString()}
              </div>
              <Badge variant={listing.condition === "new" ? "default" : "secondary"}>
                {listing.condition.replace("_", " ").toUpperCase()}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Left Column: Images */}
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden border">
              <img 
                src={listing.images[0] || "/placeholder.svg"} 
                alt={listing.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {listing.images.slice(1, 5).map((img, i) => (
                <div key={i} className="aspect-square bg-muted rounded-md overflow-hidden border">
                  <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Verification */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{listing.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(listing.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm border-b pb-1">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* BOL Verification Section */}
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Ownership Verification</h3>
              </div>

              {hasBol ? (
                isBolUnlocked ? (
                  <div className="space-y-4">
                    <Alert className="bg-green-500/10 border-green-500/20 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Verified</AlertTitle>
                      <AlertDescription>
                        You have verified the Bill of Lading for this listing.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="border rounded-lg p-4 bg-background">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Bill of Lading Document
                      </h4>
                      <div className="aspect-[3/4] bg-muted rounded border overflow-hidden relative group cursor-pointer" onClick={() => window.open(listing.bolImage, '_blank')}>
                         {listing.bolImage?.startsWith('data:image') ? (
                            <img src={listing.bolImage} alt="Bill of Lading" className="w-full h-full object-contain" />
                         ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <FileText className="h-12 w-12" />
                                <span className="ml-2">PDF Document</span>
                            </div>
                         )}
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                            Click to View Full Size
                         </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The seller has uploaded a Bill of Lading (BOL) to verify ownership of this item. 
                      Pay a small fee to access and verify this document securely.
                    </p>
                    
                    <div className="flex items-center justify-between p-3 bg-background border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Bill of Lading</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified Upload
                      </Badge>
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg" 
                      onClick={handleVerifyBol}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Verify BOL - Pay $20.00
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment processing via Stripe
                    </p>
                  </div>
                )
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Available</AlertTitle>
                  <AlertDescription>
                    The seller has not uploaded a Bill of Lading for this listing yet.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
           <div className="flex w-full justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Listing ID: {listing.id}
              </div>
              <Button type="button" variant="secondary" onClick={onClose}>
                Close
              </Button>
           </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
