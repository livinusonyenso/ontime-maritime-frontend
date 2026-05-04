"use client";

import {
  Ship,
  Compass,
  ArrowUpRight,
  MapPin,
  ExternalLink,
  Satellite,
  Radar,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const trackingPlatforms = [
  {
    name: "MarineTraffic",
    description: "Global vessel tracking with live AIS, port calls, and ship details.",
    url: "https://www.marinetraffic.com/",
    icon: <Ship className="h-5 w-5 text-primary" />,
  },
  {
    name: "VesselFinder",
    description: "Real-time ship tracking, IMO search, and maritime analytics.",
    url: "https://www.vesselfinder.com/",
    icon: <Compass className="h-5 w-5 text-blue-600" />,
  },
  {
    name: "FleetMon",
    description: "AIS tracking, voyage tracking, and maritime intelligence tools.",
    url: "https://www.fleetmon.com/",
    icon: <Satellite className="h-5 w-5 text-emerald-600" />,
  },
  {
    name: "MyShipTracking",
    description: "AIS map, vessel positions, and tracking alerts.",
    url: "https://www.myshiptracking.com/",
    icon: <Radar className="h-5 w-5 text-orange-600" />,
  },
  {
    name: "ShipFinder",
    description: "Simple AIS ship tracker for quick vessel lookups.",
    url: "https://shipfinder.co/",
    icon: <MapPin className="h-5 w-5 text-red-500" />,
  },
];

export default function BuyerListingsPage() {
  return (
    
  <>
     
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Ship className="h-6 w-6 text-primary" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">Tracking Platforms</h1>
            <p className="text-sm text-muted-foreground">
              Track vessels, shipments, routes, and maritime activities directly using trusted external partners.
            </p>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* TRACKING PLATFORM CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trackingPlatforms.map((platform, idx) => (
          <Card
            key={idx}
            className="border-0 shadow-sm hover:shadow-md transition cursor-pointer bg-background/50"
            onClick={() => window.open(platform.url, "_blank")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {platform.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{platform.name}</CardTitle>
                  <CardDescription className="text-xs">
                    External Tracking Service
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{platform.description}</p>

              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between"
              >
                Visit Platform
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    
  </>
  );
}
