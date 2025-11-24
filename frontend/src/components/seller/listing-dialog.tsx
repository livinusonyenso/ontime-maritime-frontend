"use client"

import { useState, useEffect } from "react"
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
import { useListings } from "@/contexts/listings-context"
import { useToast } from "@/hooks/use-toast"
import type { Listing } from "@/types"

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.enum(["cargo", "vessel", "container", "equipment"]),
  price_usd: z.coerce.number().min(1, "Price must be greater than 0"),
  origin_port: z.string().min(2, "Origin port is required"),
  destination_port: z.string().min(2, "Destination port is required"),
  container_number: z.string().optional(),
  eta: z.string().optional(),
  is_perishable: z.boolean().default(false),
  is_dangerous: z.boolean().default(false),
  is_high_value: z.boolean().default(false),
})

type ListingFormValues = z.infer<typeof listingSchema>

interface ListingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listing?: Listing | null
}

export function ListingDialog({ open, onOpenChange, listing }: ListingDialogProps) {
  const { createListing, updateListing } = useListings()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "cargo",
      price_usd: 0,
      origin_port: "",
      destination_port: "",
      container_number: "",
      eta: "",
      is_perishable: false,
      is_dangerous: false,
      is_high_value: false,
    },
  })

  useEffect(() => {
    if (listing) {
      form.reset({
        title: listing.title,
        description: listing.description,
        category: listing.category,
        price_usd: listing.price_usd,
        origin_port: listing.origin_port,
        destination_port: listing.destination_port,
        container_number: listing.container_number || "",
        eta: listing.eta || "",
        is_perishable: listing.is_perishable,
        is_dangerous: listing.is_dangerous,
        is_high_value: listing.is_high_value,
      })
    } else {
      form.reset({
        title: "",
        description: "",
        category: "cargo",
        price_usd: 0,
        origin_port: "",
        destination_port: "",
        container_number: "",
        eta: "",
        is_perishable: false,
        is_dangerous: false,
        is_high_value: false,
      })
    }
  }, [listing, form, open])

  const onSubmit = async (data: ListingFormValues) => {
    try {
      setLoading(true)
      if (listing) {
        await updateListing(listing.id, data)
        toast({ title: "Listing updated", description: "Your listing has been successfully updated." })
      } else {
        await createListing({
          ...data,
          photos: [], // Mock photos for now
          certificates: [], // Mock certificates for now
        })
        toast({ title: "Listing created", description: "Your new listing is now active." })
      }
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
          <DialogTitle>{listing ? "Edit Listing" : "Create New Listing"}</DialogTitle>
          <DialogDescription>
            {listing ? "Update your listing details below." : "Fill in the details to create a new listing."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Title</Label>
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
                placeholder="Detailed description of the cargo or vessel..."
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => form.setValue("category", value as any)}
                defaultValue={form.getValues("category")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cargo">Cargo</SelectItem>
                  <SelectItem value="vessel">Vessel Charter</SelectItem>
                  <SelectItem value="container">Container Slot</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" {...form.register("price_usd")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin Port</Label>
              <Input id="origin" {...form.register("origin_port")} placeholder="e.g. Shanghai" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination Port</Label>
              <Input id="destination" {...form.register("destination_port")} placeholder="e.g. Rotterdam" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eta">ETA (Optional)</Label>
              <Input id="eta" type="date" {...form.register("eta")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="container">Container No. (Optional)</Label>
              <Input id="container" {...form.register("container_number")} placeholder="e.g. CONT-123456" />
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <Label>Additional Options</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="perishable"
                  checked={form.watch("is_perishable")}
                  onCheckedChange={(c) => form.setValue("is_perishable", c as boolean)}
                />
                <label
                  htmlFor="perishable"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Perishable
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dangerous"
                  checked={form.watch("is_dangerous")}
                  onCheckedChange={(c) => form.setValue("is_dangerous", c as boolean)}
                />
                <label
                  htmlFor="dangerous"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Dangerous Goods
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high_value"
                  checked={form.watch("is_high_value")}
                  onCheckedChange={(c) => form.setValue("is_high_value", c as boolean)}
                />
                <label
                  htmlFor="high_value"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  High Value
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : listing ? "Update Listing" : "Create Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
