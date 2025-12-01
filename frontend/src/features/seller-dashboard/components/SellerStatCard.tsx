"use client"

import { cn } from "@/lib/utils"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface SellerStatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  accentColor?: "gold" | "emerald" | "violet" | "rose"
  className?: string
}

export function SellerStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = "gold",
  className,
}: SellerStatCardProps) {
  const colorConfig = {
    gold: {
      border: "border-l-amber-500",
      iconBg: "bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40",
      iconColor: "text-amber-600 dark:text-amber-400",
      glow: "group-hover:shadow-amber-200/50 dark:group-hover:shadow-amber-900/30",
    },
    emerald: {
      border: "border-l-emerald-500",
      iconBg: "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      glow: "group-hover:shadow-emerald-200/50 dark:group-hover:shadow-emerald-900/30",
    },
    violet: {
      border: "border-l-violet-500",
      iconBg: "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40",
      iconColor: "text-violet-600 dark:text-violet-400",
      glow: "group-hover:shadow-violet-200/50 dark:group-hover:shadow-violet-900/30",
    },
    rose: {
      border: "border-l-rose-500",
      iconBg: "bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40",
      iconColor: "text-rose-600 dark:text-rose-400",
      glow: "group-hover:shadow-rose-200/50 dark:group-hover:shadow-rose-900/30",
    },
  }

  const config = colorConfig[accentColor]

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-l-4 bg-white p-6 transition-all duration-300 hover:shadow-xl dark:bg-slate-900",
        config.border,
        config.glow,
        className
      )}
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <pattern id="sellerGrid" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M20 0L0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#sellerGrid)" />
        </svg>
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <div className="flex items-baseline gap-3">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  trend.positive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {trend.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>

        <div
          className={cn(
            "rounded-xl p-3 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            config.iconBg
          )}
        >
          <Icon className={cn("h-6 w-6", config.iconColor)} />
        </div>
      </div>
    </div>
  )
}
