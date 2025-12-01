"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface BuyerStatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  variant?: "default" | "primary" | "warning" | "success"
  className?: string
}

export function BuyerStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: BuyerStatCardProps) {
  const variantStyles = {
    default: {
      card: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",
      iconBg: "bg-slate-100 dark:bg-slate-800",
      iconColor: "text-slate-600 dark:text-slate-400",
    },
    primary: {
      card: "bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 border-cyan-200 dark:border-cyan-800",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/50",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    warning: {
      card: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-200 dark:border-amber-800",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    success: {
      card: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border-emerald-200 dark:border-emerald-800",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-100/50 dark:hover:shadow-cyan-900/20",
        styles.card,
        className
      )}
    >
      {/* Decorative wave pattern for buyer theme */}
      <div className="absolute -right-4 -top-4 h-24 w-24 opacity-10">
        <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-cyan-600">
          <path d="M0 50 Q25 30 50 50 T100 50 V100 H0 Z" />
          <path d="M0 60 Q25 40 50 60 T100 60 V100 H0 Z" opacity="0.5" />
        </svg>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                  trend.positive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>

        <div className={cn("rounded-xl p-3", styles.iconBg)}>
          <Icon className={cn("h-6 w-6", styles.iconColor)} />
        </div>
      </div>
    </div>
  )
}
