"use client"

import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { LucideIcon, Ship, FileText, Gavel, Shield, TrendingUp, Package } from "lucide-react"

interface QuickAction {
  href: string
  label: string
  description: string
  icon: LucideIcon
  gradient: string
  iconColor: string
}

const defaultActions: QuickAction[] = [
  {
    href: "/dashboard/buyer/tracking",
    label: "Track Shipment",
    description: "Real-time vessel tracking",
    icon: Ship,
    gradient: "from-cyan-500 to-teal-500",
    iconColor: "text-white",
  },
  {
    href: "/dashboard/buyer/auctions",
    label: "Browse Auctions",
    description: "Find cargo deals",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-green-500",
    iconColor: "text-white",
  },
  {
    href: "/dashboard/buyer/documents",
    label: "Documents",
    description: "Manage your files",
    icon: FileText,
    gradient: "from-amber-500 to-orange-500",
    iconColor: "text-white",
  },
  {
    href: "/dashboard/buyer/ebol",
    label: "e-BOL",
    description: "Bill of Lading",
    icon: Package,
    gradient: "from-violet-500 to-purple-500",
    iconColor: "text-white",
  },
  {
    href: "/dashboard/buyer/arbitration",
    label: "Arbitration",
    description: "Dispute resolution",
    icon: Gavel,
    gradient: "from-rose-500 to-pink-500",
    iconColor: "text-white",
  },
  {
    href: "/dashboard/buyer/security-hotline",
    label: "Security Hotline",
    description: "Report issues",
    icon: Shield,
    gradient: "from-slate-600 to-slate-700",
    iconColor: "text-white",
  },
]

interface BuyerQuickActionsProps {
  actions?: QuickAction[]
  columns?: 2 | 3 | 4
}

export function BuyerQuickActions({
  actions = defaultActions,
  columns = 3,
}: BuyerQuickActionsProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h3>
      <div className={cn("grid gap-4", gridCols[columns])}>
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.href}
              to={action.href}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-transparent hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              {/* Gradient overlay on hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  action.gradient
                )}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className={cn(
                    "mb-3 inline-flex rounded-lg bg-gradient-to-br p-2.5 transition-transform duration-300 group-hover:scale-110",
                    action.gradient
                  )}
                >
                  <Icon className={cn("h-5 w-5", action.iconColor)} />
                </div>
                <h4 className="font-semibold text-slate-900 transition-colors group-hover:text-white dark:text-white">
                  {action.label}
                </h4>
                <p className="mt-1 text-xs text-slate-500 transition-colors group-hover:text-white/80 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
