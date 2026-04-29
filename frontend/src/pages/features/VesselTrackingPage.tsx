"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { fetchVessels, setSearchQuery, selectVessel, clearSelectedVessel } from "@/store/slices/vesselTrackingSlice"
import { useAuth } from "@/contexts/auth-context"
import {
  Ship,
  Search,
  ExternalLink,
  Navigation,
  Anchor,
  Clock,
  MapPin,
  Compass,
  Gauge,
  Radio,
  Globe,
  ArrowRight,
} from "lucide-react"

export default function VesselTrackingPage() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const { vessels, selectedVessel, searchQuery } = useAppSelector((state) => state.vesselTracking)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    if (isAuthenticated && vessels.length === 0) dispatch(fetchVessels())
  }, [isAuthenticated, dispatch])

  const filteredVessels = vessels.filter(
    (vessel) =>
      vessel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vessel.imo.includes(searchQuery) ||
      vessel.mmsi.includes(searchQuery)
  )

  const handleSearch = () => {
    dispatch(setSearchQuery(searchInput))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "underway":
        return "bg-green-500"
      case "anchored":
        return "bg-yellow-500"
      case "moored":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVesselTypeIcon = (type: string) => {
    switch (type) {
      case "container":
        return "🚢"
      case "tanker":
        return "🛢️"
      case "bulk_carrier":
        return "📦"
      default:
        return "⛵"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Ship className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Real-Time Vessel Tracking</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Track Vessels Worldwide
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Monitor vessel positions in real-time using global AIS data. Search for vessels by name, 
                IMO, or MMSI and track their journey through integrated tracking providers.
              </p>

              {/* Search Bar */}
              <div className="flex gap-2 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by vessel name, IMO, or MMSI..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="h-12">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* External Tracking Providers */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Track via AIS Providers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500/10 p-3 rounded-xl">
                        <Globe className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">MarineTraffic</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          World's leading ship tracking platform
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 mb-4">
                    Access real-time vessel positions, port calls, and historical data from 
                    the most comprehensive AIS network.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("https://www.marinetraffic.com", "_blank")}
                  >
                    Open MarineTraffic <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500/10 p-3 rounded-xl">
                        <Radio className="h-8 w-8 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">VesselFinder</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Free AIS vessel tracking platform
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 mb-4">
                    Track ships and explore ports with detailed vessel information 
                    and live maps worldwide.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("https://www.vesselfinder.com", "_blank")}
                  >
                    Open VesselFinder <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vessel List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="list" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Vessel Activity</h2>
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list">
                <div className="grid gap-4">
                  {filteredVessels.map((vessel) => (
                    <Card
                      key={vessel.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedVessel?.id === vessel.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => dispatch(selectVessel(vessel.id))}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{getVesselTypeIcon(vessel.type)}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">{vessel.name}</h3>
                                <Badge variant="outline" className="capitalize">
                                  {vessel.type.replace("_", " ")}
                                </Badge>
                                <Badge className={`${getStatusColor(vessel.status)} text-white`}>
                                  {vessel.status.replace("_", " ")}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Ship className="h-4 w-4" /> IMO: {vessel.imo}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Radio className="h-4 w-4" /> MMSI: {vessel.mmsi}
                                </span>
                                <span className="flex items-center gap-1">
                                  🇵🇦 {vessel.flag}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <div>
                                <div className="text-muted-foreground">Destination</div>
                                <div className="font-medium">{vessel.destination}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge className="h-4 w-4 text-primary" />
                              <div>
                                <div className="text-muted-foreground">Speed</div>
                                <div className="font-medium">{vessel.speed} knots</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Compass className="h-4 w-4 text-primary" />
                              <div>
                                <div className="text-muted-foreground">Heading</div>
                                <div className="font-medium">{vessel.heading}°</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(
                                  `https://www.marinetraffic.com/en/ais/details/ships/imo:${vessel.imo}`,
                                  "_blank"
                                )
                              }}
                            >
                              MarineTraffic <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(
                                  `https://www.vesselfinder.com/vessels?name=${vessel.name}`,
                                  "_blank"
                                )
                              }}
                            >
                              VesselFinder <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details">
                {selectedVessel ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{getVesselTypeIcon(selectedVessel.type)}</div>
                          <div>
                            <CardTitle className="text-2xl">{selectedVessel.name}</CardTitle>
                            <CardDescription>
                              IMO: {selectedVessel.imo} | MMSI: {selectedVessel.mmsi}
                            </CardDescription>
                          </div>
                        </div>
                        <Button variant="ghost" onClick={() => dispatch(clearSelectedVessel())}>
                          ✕
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Navigation className="h-4 w-4" />
                            Status
                          </div>
                          <Badge className={`${getStatusColor(selectedVessel.status)} text-white capitalize`}>
                            {selectedVessel.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin className="h-4 w-4" />
                            Position
                          </div>
                          <div className="font-medium">
                            {selectedVessel.lat.toFixed(4)}°, {selectedVessel.lng.toFixed(4)}°
                          </div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Gauge className="h-4 w-4" />
                            Speed / Course
                          </div>
                          <div className="font-medium">
                            {selectedVessel.speed} kn / {selectedVessel.course}°
                          </div>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            Last Update
                          </div>
                          <div className="font-medium">
                            {new Date(selectedVessel.lastUpdate).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3">Voyage Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Destination</span>
                              <span className="font-medium">{selectedVessel.destination}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">ETA</span>
                              <span className="font-medium">
                                {new Date(selectedVessel.eta).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vessel Type</span>
                              <span className="font-medium capitalize">
                                {selectedVessel.type.replace("_", " ")}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Flag</span>
                              <span className="font-medium">{selectedVessel.flag}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3">Track on External Platforms</h4>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                              onClick={() =>
                                window.open(
                                  `https://www.marinetraffic.com/en/ais/details/ships/imo:${selectedVessel.imo}`,
                                  "_blank"
                                )
                              }
                            >
                              <span className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                View on MarineTraffic
                              </span>
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                              onClick={() =>
                                window.open(
                                  `https://www.vesselfinder.com/vessels?name=${selectedVessel.name}`,
                                  "_blank"
                                )
                              }
                            >
                              <span className="flex items-center gap-2">
                                <Radio className="h-4 w-4" />
                                View on VesselFinder
                              </span>
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Anchor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Vessel Selected</h3>
                      <p className="text-muted-foreground">
                        Click on a vessel from the list to view detailed information
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
