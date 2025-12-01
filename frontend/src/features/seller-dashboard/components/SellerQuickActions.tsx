"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Package,
  BarChart3,
  FileText,
  Shield,
  Settings,
  HelpCircle,
  Plus,
  LucideIcon,
} from "lucide-react"

interface QuickAction {
  href: string
  label: string
  icon: LucideIcon
  iconColor: string
}

const defaultActions: QuickAction[] = [
  {
    href: "/dashboard/seller/listings",
    label: "Manage Listings",
    icon: Package,
    iconColor: "text-blue-500",
  },
  {
    href: "/dashboard/seller/sales",
    label: "Sales Analytics",
    icon: BarChart3,
    iconColor: "text-emerald-500",
  },
  {
    href: "/dashboard/seller/documents",
    label: "Upload Documents",
    icon: FileText,
    iconColor: "text-amber-500",
  },
  {
    href: "/dashboard/seller/insurance",
    label: "Insurance Claims",
    icon: Shield,
    iconColor: "text-violet-500",
  },
]

interface SellerQuickActionsProps {
  actions?: QuickAction[]
  onCreateListing?: () => void
}

export function SellerQuickActions({
  actions = defaultActions,
  onCreateListing,
}: SellerQuickActionsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h3>

      {/* Primary Action - Create Listing */}
      {onCreateListing && (
        <Button
          onClick={onCreateListing}
          className="mb-4 w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200/50 hover:from-amber-600 hover:to-orange-600 dark:shadow-amber-900/30"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          Create New Listing
        </Button>
      )}

      {/* Secondary Actions */}
      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.href}
              variant="outline"
              asChild
              className="w-full justify-start border-slate-200 bg-transparent transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800"
            >
              <Link to={action.href}>
                <Icon className={cn("mr-3 h-4 w-4", action.iconColor)} />
                {action.label}
              </Link>
            </Button>
          )
        })}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

      {/* Help Links */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          asChild
        >
          <Link to="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          asChild
        >
          <Link to="/help">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Link>
        </Button>
      </div>
    </div>
  )
}
