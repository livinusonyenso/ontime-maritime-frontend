
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTracking } from "@/contexts/tracking-context"
import { Search, Ship, MapPin, Calendar, Clock } from "lucide-react"

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const { trackingData, getContainerHistory, getVesselHistory } = useTracking()

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

  return (
    <div className="min-h-screen flex flex-col">
     

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-[url(/cargo-ship-at-sea.jpg)] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Track Your Shipment</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Real-time visibility of your cargo anywhere in the world
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Card className="glass max-w-2xl mx-auto border-2">
              <CardContent className="p-6">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter tracking number (e.g., OM-2024-001)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={handleSearch} size="lg">
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Search Result */}
        {searchResult && (
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Shipment Header */}
                <Card className="glass border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          Tracking: {searchResult.container_number || searchResult.vessel_imo || 'N/A'}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ship className="h-4 w-4" />
                          <span>Lat: {searchResult.lat}, Lng: {searchResult.lng}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                        IN TRANSIT
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Location Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Container Number</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <p className="font-semibold">{searchResult.container_number || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Vessel IMO</p>
                        <div className="flex items-center gap-2">
                          <Ship className="h-4 w-4 text-secondary" />
                          <p className="font-semibold">{searchResult.vessel_imo || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Coordinates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Latitude</p>
                          <p className="font-semibold">{searchResult.lat}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary/10 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Longitude</p>
                          <p className="font-semibold">{searchResult.lng}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-accent/10 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Updated</p>
                          <p className="font-semibold">
                            {new Date(searchResult.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Speed & Heading */}
                    {(searchResult.speed || searchResult.heading) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        {searchResult.speed && (
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              <Ship className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Speed</p>
                              <p className="font-semibold">{searchResult.speed} knots</p>
                            </div>
                          </div>
                        )}
                        {searchResult.heading && (
                          <div className="flex items-center gap-3">
                            <div className="bg-secondary/10 p-2 rounded-lg">
                              <Calendar className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Heading</p>
                              <p className="font-semibold">{searchResult.heading}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Recent Tracking Data */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Recent Tracking Data</h2>
              {trackingData.length === 0 ? (
                <Card className="glass">
                  <CardContent className="p-12 text-center">
                    <Ship className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No tracking data yet</h3>
                    <p className="text-muted-foreground">
                      Start tracking your shipments by entering a container number or vessel IMO above
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trackingData.slice(0, 6).map((tracking) => (
                    <Card key={tracking.id} className="glass hover:border-primary/50 transition-all cursor-pointer">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-lg">
                              {tracking.container_number || tracking.vessel_imo || 'N/A'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Lat: {tracking.lat}, Lng: {tracking.lng}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                            In Transit
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(tracking.timestamp).toLocaleString()}</span>
                          </div>
                          {tracking.speed && (
                            <div className="flex items-center gap-2 text-sm">
                              <Ship className="h-4 w-4 text-muted-foreground" />
                              <span>Speed: {tracking.speed} knots</span>
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={() => {
                            setSearchQuery(tracking.container_number || tracking.vessel_imo || '')
                            setSearchResult(tracking)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
