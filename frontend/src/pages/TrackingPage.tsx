
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTracking } from "@/contexts/tracking-context"
import { Search, Ship, MapPin, Calendar, TrendingUp, Package, Clock, CheckCircle2 } from "lucide-react"

export default function TrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const { searchShipment, shipments } = useTracking()

  const handleSearch = () => {
    const result = searchShipment(searchQuery)
    setSearchResult(result || null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "in-transit":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      case "customs":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30"
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/30"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
                        <CardTitle className="text-2xl mb-2">Tracking: {searchResult.trackingNumber}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ship className="h-4 w-4" />
                          <span>{searchResult.vessel}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(searchResult.status)}>
                        {searchResult.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{searchResult.progress}%</span>
                      </div>
                      <Progress value={searchResult.progress} className="h-2" />
                    </div>

                    {/* Route */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Origin</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <p className="font-semibold">{searchResult.origin}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Current Location</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-secondary" />
                          <p className="font-semibold">{searchResult.currentLocation}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Destination</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <p className="font-semibold">{searchResult.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Departure Date</p>
                          <p className="font-semibold">{new Date(searchResult.departureDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-accent/10 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                          <p className="font-semibold">
                            {new Date(searchResult.estimatedArrival).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Shipment Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-green-500 rounded-full p-2">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>
                          <div className="w-0.5 h-full bg-border my-2" />
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-semibold">Departed from {searchResult.origin}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(searchResult.departureDate).toLocaleString()}
                          </p>
                          <p className="text-sm mt-1">Cargo loaded and vessel departed port</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-blue-500 rounded-full p-2 animate-pulse">
                            <Ship className="h-4 w-4 text-white" />
                          </div>
                          <div className="w-0.5 h-full bg-border my-2" />
                        </div>
                        <div className="flex-1 pb-6">
                          <p className="font-semibold">In Transit - {searchResult.currentLocation}</p>
                          <p className="text-sm text-muted-foreground">Current</p>
                          <p className="text-sm mt-1">Vessel en route to destination</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-slate-300 rounded-full p-2">
                            <Package className="h-4 w-4 text-slate-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-muted-foreground">Expected at {searchResult.destination}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(searchResult.estimatedArrival).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Recent Shipments */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Recent Shipments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shipments.map((shipment) => (
                  <Card key={shipment.id} className="glass hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg">{shipment.trackingNumber}</p>
                          <p className="text-sm text-muted-foreground">{shipment.vessel}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {shipment.origin} → {shipment.destination}
                          </span>
                        </div>
                        <Progress value={shipment.progress} className="h-1.5" />
                        <p className="text-xs text-muted-foreground text-right">{shipment.progress}% complete</p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-transparent"
                        onClick={() => {
                          setSearchQuery(shipment.trackingNumber)
                          setSearchResult(shipment)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
