"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addListing } from "@/store/slices/marketplaceSlice"
import { useAuth } from "@/contexts/auth-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, Plus, Trash2, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CreateListingModalProps {
  open: boolean
  onClose: () => void
}

export function CreateListingModal({ open, onClose }: CreateListingModalProps) {
  const dispatch = useDispatch()
  const { user } = useAuth()
  
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [category, setCategory] = useState<string>("equipment")
  const [condition, setCondition] = useState<string>("new")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [port, setPort] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [bolImage, setBolImage] = useState("")
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([])
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")

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

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload only image files")
        return
      }

      // Convert to base64
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

    // Dispatch to Redux
    dispatch(addListing({
      sellerId: user?.id || "unknown",
      sellerName: user?.email || "Unknown Seller",
      sellerRating: 4.5,
      category: category as any,
      title,
      description,
      price: parseFloat(price),
      priceType: "fixed",
      currency,
      images,
      bolImage: bolImage || undefined,
      location: {
        country,
        city,
        port: port || undefined,
      },
      specifications: specsObject,
      condition: condition as any,
      availability: "available",
      bolRequired: !!bolImage,
      bolVerified: false,
      featured: false,
    }))

    // Reset form and close
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPrice("")
    setCurrency("USD")
    setCategory("equipment")
    setCondition("new")
    setCountry("")
    setCity("")
    setPort("")
    setImages([])
    setSpecifications([])
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
          <DialogDescription>
            Add a new item to the marketplace. Fill in all required fields.
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
                  placeholder="Marine Engine Parts"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
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
                placeholder="Detailed description of your listing..."
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
                  placeholder="4200"
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
                <Select value={condition} onValueChange={setCondition}>
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
                  placeholder="United States"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Miami"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">Port (Optional)</Label>
                <Input
                  id="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="Port of Miami"
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
                id="image-upload"
                disabled={images.length >= 5}
              />
              <Label
                htmlFor="image-upload"
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
                id="bol-upload"
              />
              <Label
                htmlFor="bol-upload"
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
            <Button type="submit">Create Listing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
