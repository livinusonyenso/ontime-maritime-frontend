"use client"

import { useEffect, useRef, useState } from "react"
import {
  Ship,
  Package,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Anchor,
} from "lucide-react"
import api from "@/lib/api"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TickerItem {
  id:      string
  label:   string
  value:   string
  icon:    React.ReactNode
  trend?:  "up" | "down" | "neutral"
  accent?: string // tailwind text colour class
}

interface ShippingActivityTickerProps {
  /** Pass items directly to skip the auto-fetch (e.g. for seller dashboard) */
  items?:    TickerItem[]
  /** Seconds to complete one full scroll cycle. Default 30. */
  speed?:    number
  className?: string
}

// ── Static separator between items ────────────────────────────────────────────

function Dot() {
  return (
    <span className="mx-4 text-white/20 select-none" aria-hidden>
      ◆
    </span>
  )
}

// ── Single ticker pill ─────────────────────────────────────────────────────────

function TickerPill({ item }: { item: TickerItem }) {
  const TrendIcon =
    item.trend === "up"
      ? TrendingUp
      : item.trend === "down"
        ? TrendingDown
        : null

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className={`${item.accent ?? "text-sky-400"}`}>{item.icon}</span>
      <span className="text-white/50 text-xs font-medium tracking-wide uppercase">
        {item.label}
      </span>
      <span className="text-white font-semibold text-sm">{item.value}</span>
      {TrendIcon && (
        <TrendIcon
          className={`h-3 w-3 ${item.trend === "up" ? "text-emerald-400" : "text-red-400"}`}
        />
      )}
    </span>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function ShippingActivityTicker({
  items: externalItems,
  speed = 35,
  className = "",
}: ShippingActivityTickerProps) {
  const [items,   setItems]   = useState<TickerItem[]>(externalItems ?? [])
  const [loading, setLoading] = useState(!externalItems)
  const trackRef  = useRef<HTMLDivElement>(null)
  const animRef   = useRef<Animation | null>(null)

  // ── Fetch buyer metrics when no items are provided ─────────────────────────
  useEffect(() => {
    if (externalItems) { setItems(externalItems); return }

    api
      .get("/transactions/my-purchases?take=200")
      .then((res) => {
        const txs: any[] = Array.isArray(res.data) ? res.data : res.data?.data ?? []

        const completed = txs.filter((t) => t.payout_status === "completed")
        const pending   = txs.filter((t) => t.payout_status === "pending")
        const failed    = txs.filter((t) => t.payout_status === "failed")
        const totalSpent = completed.reduce((s: number, t: any) => s + Number(t.amount ?? 0), 0)

        // Unique routes from listing origin/destination ports
        const routes = Array.from(
          new Set(
            completed
              .filter((t: any) => t.listing?.origin_port && t.listing?.destination_port)
              .map((t: any) => `${t.listing.origin_port} → ${t.listing.destination_port}`)
          ),
        ).slice(0, 3)

        const derived: TickerItem[] = [
          {
            id:     "total-orders",
            label:  "Total Orders",
            value:  String(txs.length),
            icon:   <Package className="h-3.5 w-3.5" />,
            accent: "text-sky-400",
          },
          {
            id:     "completed",
            label:  "Completed",
            value:  String(completed.length),
            icon:   <CheckCircle2 className="h-3.5 w-3.5" />,
            accent: "text-emerald-400",
            trend:  completed.length > 0 ? "up" : "neutral",
          },
          {
            id:     "pending",
            label:  "Pending",
            value:  String(pending.length),
            icon:   <Clock className="h-3.5 w-3.5" />,
            accent: "text-amber-400",
            trend:  pending.length > 0 ? "neutral" : undefined,
          },
          {
            id:     "failed",
            label:  "Failed",
            value:  String(failed.length),
            icon:   <AlertTriangle className="h-3.5 w-3.5" />,
            accent: "text-red-400",
            trend:  failed.length > 0 ? "down" : undefined,
          },
          {
            id:     "spent",
            label:  "Total Spent",
            value:  `$${totalSpent.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
            icon:   <DollarSign className="h-3.5 w-3.5" />,
            accent: "text-violet-400",
          },
          {
            id:     "active-shipments",
            label:  "Active Shipments",
            value:  String(pending.length),
            icon:   <Ship className="h-3.5 w-3.5" />,
            accent: "text-sky-400",
          },
          ...routes.map((r, i) => ({
            id:     `route-${i}`,
            label:  "Route",
            value:  r,
            icon:   <MapPin className="h-3.5 w-3.5" />,
            accent: "text-teal-400",
          })),
          {
            id:     "platform",
            label:  "Ontime Maritime",
            value:  "Live",
            icon:   <Anchor className="h-3.5 w-3.5" />,
            accent: "text-gold-400",
          },
        ]

        setItems(derived)
      })
      .catch(() => {
        // Fallback static items so the ticker is never empty
        setItems(FALLBACK_ITEMS)
      })
      .finally(() => setLoading(false))
  }, [externalItems])

  // ── Web Animations API scroll ──────────────────────────────────────────────
  useEffect(() => {
    const el = trackRef.current
    if (!el || items.length === 0) return

    // Each set is duplicated so the scroll wraps seamlessly at 50%
    const duration = speed * 1000

    animRef.current?.cancel()
    animRef.current = el.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
      { duration, iterations: Infinity, easing: "linear" },
    )

    return () => { animRef.current?.cancel() }
  }, [items, speed])

  // Pause on hover for readability
  const pause  = () => animRef.current?.pause()
  const resume = () => animRef.current?.play()

  if (loading) {
    return (
      <div className={`h-9 bg-[#0D1B2A] animate-pulse rounded-none ${className}`} />
    )
  }

  const display = items.length > 0 ? items : FALLBACK_ITEMS

  return (
    <div
      className={`relative overflow-hidden bg-[#0D1B2A] border-b border-white/[0.06] h-9 flex items-center ${className}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      aria-label="Shipping activity ticker"
      role="marquee"
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0D1B2A] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0D1B2A] to-transparent z-10 pointer-events-none" />

      {/* Scrolling track — items duplicated for seamless loop */}
      <div ref={trackRef} className="flex items-center will-change-transform">
        {[...display, ...display].map((item, i) => (
          <span key={`${item.id}-${i}`} className="inline-flex items-center">
            <TickerPill item={item} />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Fallback items (shown if API fails or user has no data) ───────────────────

const FALLBACK_ITEMS: TickerItem[] = [
  { id: "f1", label: "Platform",        value: "Ontime Maritime Live",  icon: <Anchor      className="h-3.5 w-3.5" />, accent: "text-sky-400"     },
  { id: "f2", label: "Active Routes",   value: "Lagos → Rotterdam",      icon: <MapPin      className="h-3.5 w-3.5" />, accent: "text-teal-400"    },
  { id: "f3", label: "Active Routes",   value: "Onne → Antwerp",         icon: <MapPin      className="h-3.5 w-3.5" />, accent: "text-teal-400"    },
  { id: "f4", label: "Active Routes",   value: "Apapa → Hamburg",        icon: <MapPin      className="h-3.5 w-3.5" />, accent: "text-teal-400"    },
  { id: "f5", label: "Shipping",        value: "24/7 Support",           icon: <Ship        className="h-3.5 w-3.5" />, accent: "text-sky-400"     },
  { id: "f6", label: "Marketplace",     value: "Buy · Sell · Ship",      icon: <Package     className="h-3.5 w-3.5" />, accent: "text-violet-400"  },
  { id: "f7", label: "Secure Payments", value: "Powered by Paystack",    icon: <DollarSign  className="h-3.5 w-3.5" />, accent: "text-emerald-400" },
]
