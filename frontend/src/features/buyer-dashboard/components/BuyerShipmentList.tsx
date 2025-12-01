"use client"

import { cn } from "@/lib/utils"
import { Ship, MapPin, Clock, ChevronRight, Anchor, Navigation } from "lucide-react"
import { Link } from "react-router-dom"

interface ShipmentItem {
  id: string
  container_number?: string
  vessel_imo?: string
  status: string
  location: string
  timestamp: string
  eta?: string
}

interface BuyerShipmentListProps {
  shipments: ShipmentItem[]
  maxItems?: number
  showViewAll?: boolean
}

const statusConfig: Record<string, { color: string; bg: string; icon: typeof Anchor }> = {
  "In Transit": {
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    icon: Navigation,
  },
  Customs: {
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    icon: Clock,
  },
  Delivered: {
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    icon: Anchor,
  },
  Processing: {
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    icon: Ship,
  },
}

const defaultShipments: ShipmentItem[] = [
  {
    id: "1",
    container_number: "MSKU-7654321",
    status: "In Transit",
    location: "North Atlantic Ocean",
    timestamp: new Date().toISOString(),
    eta: "Dec 15, 2024",
  },
  {
    id: "2",
    container_number: "OOCL-9876543",
    status: "Customs",
    location: "Port of Rotterdam",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    eta: "Dec 12, 2024",
  },
  {
    id: "3",
    container_number: "CMAU-1234567",
    status: "Delivered",
    location: "Hamburg Terminal",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "4",
    container_number: "HLCU-5678901",
    status: "Processing",
    location: "Shanghai Port",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    eta: "Dec 20, 2024",
  },
]

export function BuyerShipmentList({
  shipments = defaultShipments,
  maxItems = 5,
  showViewAll = true,
}: BuyerShipmentListProps) {
  const displayedShipments = shipments.slice(0, maxItems)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Active Shipments
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your cargo in real-time
          </p>
        </div>
        {showViewAll && (
          <Link
            to="/dashboard/buyer/tracking"
            className="group flex items-center gap-1 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
          >
            View All
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Shipment Items */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {displayedShipments.map((shipment) => {
          const config = statusConfig[shipment.status] || statusConfig["In Transit"]
          const StatusIcon = config.icon

          return (
            <div
              key={shipment.id}
              className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                  config.bg
                )}
              >
                <StatusIcon className={cn("h-5 w-5", config.color)} />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900 dark:text-white truncate">
                    {shipment.container_number || shipment.vessel_imo || "Unknown"}
                  </p>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {shipment.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(shipment.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Status & ETA */}
              <div className="text-right shrink-0">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                    config.bg,
                    config.color
                  )}
                >
                  {shipment.status}
                </span>
                {shipment.eta && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    ETA: {shipment.eta}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {displayedShipments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Ship className="h-12 w-12 text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            No active shipments at the moment
          </p>
        </div>
      )}
    </div>
  )
}
