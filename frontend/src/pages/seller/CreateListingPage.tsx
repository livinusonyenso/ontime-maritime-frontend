"use client"

import { useNavigate, Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { CreateListingForm } from "@/components/seller/create-listing-form"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function SellerCreateListingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const isVerified = user?.is_email_verified === true

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

      {!isVerified ? (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-4">
            <ShieldAlert className="h-8 w-8 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h2 className="font-semibold text-amber-600 dark:text-amber-400">Account verification required</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You must complete KYC verification before you can create a listing. Our team will review your
                documents and approve your account — this usually takes 1–2 business days.
              </p>
              <Button asChild size="sm" className="mt-2">
                <Link to="/dashboard/seller">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <CreateListingForm
              onSuccess={() => navigate("/dashboard/seller/listings")}
              onCancel={() => navigate(-1)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
