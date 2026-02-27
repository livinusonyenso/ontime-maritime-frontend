"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Package, DollarSign, FileText, Plus, Globe, MapPin } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { fetchListings, selectAllListings, selectMarketplaceTotal } from "@/store/slices/marketplaceSlice"
import { CreateListingModal } from "@/components/marketplace/CreateListingModal"

export default function OrganizationDashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const listings = useSelector(selectAllListings)
  const total = useSelector(selectMarketplaceTotal)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const isVerified = user?.is_email_verified === true

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  const displayName = user?.company_name || user?.email || "Organization"

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <main className="flex-1 p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">{displayName}</h1>
              {isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
            </div>
            <p className="text-muted-foreground text-sm">Organization Dashboard</p>
            {user?.website && (
              <a href={user.website} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 mt-1">
                <Globe className="h-3 w-3" /> {user.website}
              </a>
            )}
            {user?.business_address && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" /> {user.business_address}
              </p>
            )}
          </div>

          <Button
            onClick={() => setCreateModalOpen(true)}
            disabled={!isVerified}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </Button>
        </div>

        {/* Verification warning */}
        {!isVerified && (
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Your account is pending email verification. You can browse listings but cannot create new ones until verified.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" /> Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{listings.filter(l => l.availability === "available").length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-xs text-muted-foreground">Payments coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" /> Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">—</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/organization/profile" className="text-sm text-primary hover:underline">
                View profile
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/organization/listings">Manage Listings</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/organization/ebol">e-BOL</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/organization/arbitration">Arbitration</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/organization/tracking">Vessel Tracking</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/organization/security-hotline">Security Hotline</Link>
            </Button>
          </CardContent>
        </Card>
      </main>

      <CreateListingModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
    </div>
  )
}
