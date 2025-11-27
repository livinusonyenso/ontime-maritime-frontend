"use client"

import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { CreateListingForm } from "@/components/seller/create-listing-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SellerCreateListingPage() {
  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Listing</h1>
          <p className="text-muted-foreground">Post your equipment, warehouse, or services to the marketplace.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <CreateListingForm 
            onSuccess={() => navigate("/dashboard/seller/listings")} 
            onCancel={() => navigate(-1)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
