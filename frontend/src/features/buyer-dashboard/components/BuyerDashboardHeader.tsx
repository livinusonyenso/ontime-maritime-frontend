"use client"

import { Button } from "@/components/ui/button"
import { Bell, LogOut, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface BuyerDashboardHeaderProps {
  userName: string
  unreadNotifications?: number
  onLogout: () => void
}

export function BuyerDashboardHeader({
  userName,
  unreadNotifications = 0,
  onLogout,
}: BuyerDashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Greeting based on time of day
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 p-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        {/* Wave pattern */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-white">
          <p className="text-sm font-medium text-white/80">{currentDate}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            {greeting}, {userName}!
          </h1>
          <p className="mt-2 text-white/80">
            Here's what's happening with your shipments today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/dashboard/buyer/notifications">
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "relative bg-white/20 text-white backdrop-blur-sm hover:bg-white/30",
                "border border-white/20"
              )}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/settings">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="secondary"
            onClick={onLogout}
            className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 border border-white/20 gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
