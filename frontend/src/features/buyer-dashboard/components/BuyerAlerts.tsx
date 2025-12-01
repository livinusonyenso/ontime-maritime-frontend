"use client"

import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X, Bell } from "lucide-react"
import { useState } from "react"

interface Alert {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  timestamp: string
  read?: boolean
}

interface BuyerAlertsProps {
  alerts?: Alert[]
  maxAlerts?: number
}

const alertConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    iconBg: "bg-red-100 dark:bg-red-900/50",
    iconColor: "text-red-600 dark:text-red-400",
  },
}

const defaultAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Customs Documentation Required",
    message: "Shipment #MSKU-7654321 needs additional documents for Rotterdam customs clearance.",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Delivery Confirmed",
    message: "Container #CMAU-1234567 has been successfully delivered to Hamburg Terminal.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "ETA Updated",
    message: "New estimated arrival for OOCL-9876543: December 15, 2024 at 14:00 UTC.",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
  },
]

export function BuyerAlerts({ alerts = defaultAlerts, maxAlerts = 4 }: BuyerAlertsProps) {
  const [dismissedIds, setDismissedIds] = useState<string[]>([])

  const visibleAlerts = alerts
    .filter((alert) => !dismissedIds.includes(alert.id))
    .slice(0, maxAlerts)

  const dismissAlert = (id: string) => {
    setDismissedIds((prev) => [...prev, id])
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-cyan-100 p-2 dark:bg-cyan-900/50">
            <Bell className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Recent Alerts</h3>
        </div>
        {visibleAlerts.filter((a) => !a.read).length > 0 && (
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {visibleAlerts.filter((a) => !a.read).length} new
          </span>
        )}
      </div>

      {/* Alerts List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {visibleAlerts.map((alert) => {
          const config = alertConfig[alert.type]
          const Icon = config.icon

          return (
            <div
              key={alert.id}
              className={cn(
                "relative flex gap-4 px-6 py-4 transition-colors",
                !alert.read && "bg-slate-50/50 dark:bg-slate-800/30"
              )}
            >
              {/* Unread indicator */}
              {!alert.read && (
                <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-500" />
              )}

              {/* Icon */}
              <div className={cn("shrink-0 rounded-lg p-2", config.iconBg)}>
                <Icon className={cn("h-4 w-4", config.iconColor)} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">{alert.title}</h4>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{alert.message}</p>
                <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  {new Date(alert.timestamp).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {visibleAlerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            All caught up! No new alerts.
          </p>
        </div>
      )}
    </div>
  )
}
