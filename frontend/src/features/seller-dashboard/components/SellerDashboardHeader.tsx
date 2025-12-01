"use client"

import { Button } from "@/components/ui/button"
import { Bell, LogOut, Plus, Settings } from "lucide-react"
import { Link } from "react-router-dom"

interface SellerDashboardHeaderProps {
  userName: string
  businessName?: string
  onLogout: () => void
  onCreateListing?: () => void
}

export function SellerDashboardHeader({
  userName,
  businessName,
  onLogout,
  onCreateListing,
}: SellerDashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gold accent glow */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="sellerHeaderGrid" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M10 0L0 0 0 10" fill="none" stroke="white" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sellerHeaderGrid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="text-white">
          <p className="text-sm font-medium text-amber-300/80">{currentDate}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Seller Dashboard
          </h1>
          <p className="mt-2 text-slate-400">
            Welcome back, <span className="text-white">{userName}</span>
            {businessName && (
              <span className="text-slate-500"> • {businessName}</span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Create Listing Button */}
          {onCreateListing && (
            <Button
              onClick={onCreateListing}
              className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/40"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Create Listing
            </Button>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <Link to="/settings">
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="secondary"
              onClick={onLogout}
              className="gap-2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 border border-white/10"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
    </div>
  )
}
