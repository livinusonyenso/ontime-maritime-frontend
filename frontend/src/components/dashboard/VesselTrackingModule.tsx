"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Ship, MapPin, Clock } from "lucide-react"

export function VesselTrackingModule() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const handleSearch = () => {
    if (!query.trim()) return
    // For now just simulate a result; backend/AIS integration can come later.
    setResult(`Simulated tracking result for "${query}" using MarineTraffic / VesselFinder redirect.`)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vessel &amp; Container Tracking</h1>
        <p className="text-muted-foreground">
          Search by container number or vessel IMO. This module stays inside the dashboard layout.
        </p>
      </div>

      <div className="flex gap-3 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter container number or vessel IMO"
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch}>Track</Button>
      </div>

      {result && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tracking Overview</CardTitle>
              <CardDescription>Sample data – wire to real AIS APIs later.</CardDescription>
            </div>
            <Badge variant="outline">In Transit</Badge>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Ship className="h-4 w-4 text-primary" />
              <span>{result}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Last known location: Lagos Anchorage (simulated)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Updated: just now</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
