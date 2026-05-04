"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTracking } from "@/contexts/tracking-context"
import { Search, Ship, MapPin, Clock } from "lucide-react"

export default function DashboardTrackingPage() {
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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Track Shipments</h1>
        <p className="text-muted-foreground">Monitor your cargo in real-time.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Enter container number or vessel IMO"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Track</Button>
      </div>

      {searchResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                Tracking: {searchResult.container_number || searchResult.vessel_imo}
              </CardTitle>
              <Badge>In Transit</Badge>
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
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Active Shipments</h2>
        <div className="grid gap-4">
          {trackingData.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No active shipments found. Start tracking by entering a number above.
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
  )
}
