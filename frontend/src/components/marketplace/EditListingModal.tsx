"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateListing } from "@/store/slices/marketplaceSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, Plus, Trash2, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EditListingModalProps {
  open: boolean
  onClose: () => void
  listing: MarketplaceListing
}

export function EditListingModal({ open, onClose, listing }: EditListingModalProps) {
  const dispatch = useDispatch()
  
  // Form state - initialize with existing listing data
  const [title, setTitle] = useState(listing.title)
  const [description, setDescription] = useState(listing.description)
  const [price, setPrice] = useState(listing.price.toString())
  const [currency, setCurrency] = useState(listing.currency)
  const [category, setCategory] = useState(listing.category)
  const [condition, setCondition] = useState(listing.condition)
  const [country, setCountry] = useState(listing.location.country)
  const [city, setCity] = useState(listing.location.city)
  const [port, setPort] = useState(listing.location.port || "")
  const [images, setImages] = useState<string[]>(listing.images)
  const [bolImage, setBolImage] = useState(listing.bolImage || "")
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>(
    Object.entries(listing.specifications).map(([key, value]) => ({ key, value }))
  )
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")

  // Reset form when listing changes
  useEffect(() => {
    setTitle(listing.title)
    setDescription(listing.description)
    setPrice(listing.price.toString())
    setCurrency(listing.currency)
    setCategory(listing.category)
    setCondition(listing.condition)
    setCountry(listing.location.country)
    setCity(listing.location.city)
    setPort(listing.location.port || "")
    setImages(listing.images)
    setBolImage(listing.bolImage || "")
    setSpecifications(
      Object.entries(listing.specifications).map(([key, value]) => ({ key, value }))
    )
  }, [listing])

  // Handle image upload from device
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const maxImages = 5
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    Array.from(files).forEach((file) => {
      if (images.length >= maxImages) return

      if (!file.type.startsWith("image/")) {
        alert("Please upload only image files")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleBolUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert("Please upload only image or PDF files")
      return
    }

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      setBolImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      setSpecifications((prev) => [...prev, { key: newSpecKey, value: newSpecValue }])
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const removeSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title || !description || !price || !country || !city) {
      alert("Please fill in all required fields")
      return
    }

    if (images.length === 0) {
      alert("Please upload at least one image")
      return
    }

    // Convert specifications to object
    const specsObject: Record<string, string> = {}
    specifications.forEach((spec) => {
      specsObject[spec.key] = spec.value
    })

    // Dispatch update to Redux
    dispatch(updateListing({
      id: listing.id,
      updates: {
        title,
        description,
        price: parseFloat(price),
        currency,
        category: category as any,
        condition: condition as any,
        images,
        bolImage: bolImage || undefined,
        location: {
          country,
          city,
          port: port || undefined,
        },
        specifications: specsObject,
      },
    }))

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
          <DialogDescription>
            Update your listing details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={(val) => setCategory(val as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="container">Container</SelectItem>
                    <SelectItem value="crane">Crane</SelectItem>
                    <SelectItem value="spare_parts">Spare Parts</SelectItem>
                    <SelectItem value="repairs">Repairs</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="vessel">Vessel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select value={condition} onValueChange={(val) => setCondition(val as any)}>
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
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">Port (Optional)</Label>
                <Input
                  id="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Images * (Max 5)</h3>
            
            <div className="border-2 border-dashed rounded-lg p-4">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload-edit"
                disabled={images.length >= 5}
              />
              <Label
                htmlFor="image-upload-edit"
                className={`flex flex-col items-center justify-center cursor-pointer ${
                  images.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload images ({images.length}/5)
                </span>
              </Label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bill of Lading (BOL) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Bill of Lading (Optional)</h3>
            <p className="text-xs text-muted-foreground">
              Upload a Bill of Lading to verify your ownership. Buyers can pay to view this document.
            </p>
            
            <div className="border-2 border-dashed rounded-lg p-4">
              <Input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleBolUpload}
                className="hidden"
                id="bol-upload-edit"
              />
              <Label
                htmlFor="bol-upload-edit"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {bolImage ? (
                  <div className="relative group w-full">
                    <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-lg">
                      <FileText className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">BOL Uploaded</span>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault()
                        setBolImage("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload BOL (Image or PDF)
                    </span>
                  </>
                )}
              </Label>
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Specifications (Optional)</h3>
            
            <div className="flex gap-2">
              <Input
                placeholder="Key (e.g., Engine Type)"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
              />
              <Input
                placeholder="Value (e.g., Diesel)"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
              />
              <Button type="button" onClick={addSpecification} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {specifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {specifications.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="gap-2">
                    <span className="font-semibold">{spec.key}:</span> {spec.value}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSpecification(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
