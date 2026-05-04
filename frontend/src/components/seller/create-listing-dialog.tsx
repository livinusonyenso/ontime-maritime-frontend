"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"
import { useAppDispatch } from "@/store/hooks"
import { addListing } from "@/store/slices/marketplaceSlice"

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  port: z.string().optional(),
  bolNumber: z.string().optional(),
})

type ListingFormValues = z.infer<typeof listingSchema>

interface CreateListingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateListingDialog({ open, onOpenChange }: CreateListingDialogProps) {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      country: "",
      city: "",
      port: "",
      bolNumber: "",
    },
  })

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true)
      setTimeout(() => {
        const newPhotos = Array.from(e.target.files!).map(() => `/generic-placeholder-300px.png?height=300&width=600`)
        setPhotos((prev) => [...prev, ...newPhotos])
        setUploading(false)
        toast({ title: "Photo uploaded", description: "Image added successfully" })
      }, 1000)
    }
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ListingFormValues) => {
    try {
      setLoading(true)
      
      // Dispatch to Redux store (dummy data)
      dispatch(addListing({
        sellerId: "current-user", // Mock ID
        sellerName: "Current User", // Mock Name
        sellerRating: 5,
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        priceType: "fixed",
        currency: "USD",
        images: photos,
        location: {
          country: data.country,
          city: data.city,
          port: data.port || "",
        },
        specifications: {},
        condition: "good",
        availability: "available",
        bolRequired: !!data.bolNumber,
        bolNumber: data.bolNumber || "",
        bolVerified: false,
        featured: false,
      }))

      toast({ title: "Listing created", description: "Your new listing is now active on the marketplace." })
      form.reset()
      setPhotos([])
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new listing on the marketplace.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Listing Title</Label>
              <Input id="title" {...form.register("title")} placeholder="e.g. 20ft Container Slot from Shanghai" />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Detailed description of the cargo, equipment, or service..."
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2 border rounded-lg p-4 bg-muted/20">
              <Label>Upload Images</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden border bg-background group"
                  >
                    <img src={photo || "/placeholder.svg"} alt="Listing" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer bg-background transition-colors">
                  <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    {uploading ? (
                      <span className="loading loading-spinner loading-xs">...</span>
                    ) : (
                      <>
                        <Upload className="h-6 w-6" />
                        <span className="text-xs">Upload</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => form.setValue("category", value)}
                defaultValue={form.getValues("category")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="container">Container</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="repairs">Repairs</SelectItem>
                  <SelectItem value="spare_parts">Spare Parts</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" {...form.register("price")} />
              {form.formState.errors.price && (
                <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Location (Country)</Label>
              <Input id="country" {...form.register("country")} placeholder="e.g. Nigeria" />
              {form.formState.errors.country && (
                <p className="text-sm text-red-500">{form.formState.errors.country.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Location (City)</Label>
              <Input id="city" {...form.register("city")} placeholder="e.g. Lagos" />
              {form.formState.errors.city && (
                <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="port">Port (Optional)</Label>
              <Input id="port" {...form.register("port")} placeholder="e.g. Apapa Port" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bolNumber">Bill of Lading Information (Optional)</Label>
              <Input id="bolNumber" {...form.register("bolNumber")} placeholder="Enter BOL Number if available" />
              <p className="text-xs text-muted-foreground">Providing a BOL number helps verify your listing and increases buyer trust.</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
