"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import { DashboardSidebar, MobileSidebar, DashboardHeader } from "@/dashboard/components"
import { navigationConfig } from "@/dashboard/navigation.config"
import { ShippingActivityTicker } from "@/components/dashboard/ShippingActivityTicker"

interface DashboardLayoutProps {
  role: "buyer" | "seller" | "admin" | "executive" | "organization"
}

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navItems = navigationConfig[role] || []

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Desktop Sidebar */}
      <DashboardSidebar items={navItems} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header with Mobile Menu */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <MobileSidebar
            items={navItems}
            isOpen={isMobileOpen}
            onOpenChange={setIsMobileOpen}
          />
          {role === "buyer" && (
            <div className="flex-1 w-0 min-w-0 overflow-hidden mx-2">

              <ShippingActivityTicker className="rounded-md" />
            </div>
          )}
          <DashboardHeader />
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
