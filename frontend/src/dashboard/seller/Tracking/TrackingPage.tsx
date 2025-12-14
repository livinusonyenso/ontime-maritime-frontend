"use client"

import {
  Ship,
  Package,
  Radar,
  Truck,
  Globe,
  ArrowUpRight,
} from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

/* ===================== TYPES ===================== */

interface TrackingPlatform {
  id: string
  name: string
  description: string
  url: string
  icon: React.ReactNode
}

/* ===================== COMPONENT ===================== */

export default function TrackingUserDashboard() {
  const platforms: TrackingPlatform[] = [
    {
      id: "marinetraffic",
      name: "MarineTraffic",
      description: "Live vessel tracking and AIS data worldwide.",
      url: "https://www.marinetraffic.com",
      icon: <Ship className="h-6 w-6 text-blue-600" />,
    },
    {
      id: "vesselfinder",
      name: "VesselFinder",
      description: "Track ships, ports, and maritime routes.",
      url: "https://www.vesselfinder.com",
      icon: <Radar className="h-6 w-6 text-emerald-600" />,
    },
    {
      id: "cargo_tracking",
      name: "Cargo Tracking",
      description: "Track containers and cargo movements.",
      url: "https://www.cargotracking.com",
      icon: <Package className="h-6 w-6 text-amber-600" />,
    },
    {
      id: "fleet_tracking",
      name: "Fleet Tracking",
      description: "Monitor trucks and inland cargo logistics.",
      url: "https://www.fleettracking.com",
      icon: <Truck className="h-6 w-6 text-purple-600" />,
    },
    {
      id: "global_tracking",
      name: "Global Tracking",
      description: "Unified global shipment and route tracking.",
      url: "https://www.track-trace.com",
      icon: <Globe className="h-6 w-6 text-slate-600" />,
    },
  ]

  return (
    <div className="space-y-6">
      {/* ===================== HEADER ===================== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tracking Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Choose a tracking platform to monitor your vessel, cargo, or shipment
          in real time.
        </p>
      </div>

      {/* ===================== PLATFORM GRID ===================== */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-lg bg-muted p-2">
                {platform.icon}
              </div>
              <div>
                <CardTitle className="text-base">
                  {platform.name}
                </CardTitle>
                <CardDescription>
                  {platform.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => window.open(platform.url, "_blank")}
              >
                Open Platform
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
