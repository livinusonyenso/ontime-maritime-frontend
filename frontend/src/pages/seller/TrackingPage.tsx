"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useTracking } from "@/contexts/tracking-context"
import { Search, Ship, MapPin, Clock } from "lucide-react"

export default function DashboardTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const { isAuthenticated, loading } = useAuth()
  const { trackingData, getContainerHistory, getVesselHistory } = useTracking()
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      // Try searching by container number first
      const containerResults = await getContainerHistory(searchQuery, 1)
      if (containerResults.length > 0) {
        setSearchResult(containerResults[0])
        return
      }

      // Try searching by vessel IMO
      const vesselResults = await getVesselHistory(searchQuery, 1)
      if (vesselResults.length > 0) {
        setSearchResult(vesselResults[0])
        return
      }

      setSearchResult(null)
    } catch (error) {
      setSearchResult(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    navigate("/login")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        {/* <section className="relative bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="mb-4 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Track Your Shipment</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Real-time visibility of your cargo anywhere in the world
              </p>
            </div>
          </div>
        </section> */}

        {/* Search Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search container or IMO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>Track</Button>
            </div>
          </div>
        </section>

        {/* Search Result */}
        {searchResult && (
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {searchResult.container_number || searchResult.vessel_imo}
                    </CardTitle>
                    <Badge>Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          {searchResult.lat}, {searchResult.lng}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Speed</p>
                      <div className="flex items-center gap-2">
                        <Ship className="h-4 w-4 text-primary" />
                        <span className="font-medium">{searchResult.speed || 0} knots</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Last Update</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{new Date(searchResult.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Recent Tracking Data */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Tracked Items</h2>
              <div className="grid gap-4">
                {trackingData.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      No tracking data available.
                    </CardContent>
                  </Card>
                ) : (
                  trackingData.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Ship className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.container_number || item.vessel_imo}</p>
                            <p className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <Badge variant="outline">In Transit</Badge>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
