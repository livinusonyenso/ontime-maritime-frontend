
import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/store"
import {
  fetchListings,
  fetchMoreListings,
  fetchListingDetail,
  clearSelectedListing,
  selectAllListings,
  selectSelectedListing,
  selectMarketplaceTotal,
  selectMarketplaceHasMore,
  selectMarketplaceLoading,
  selectMarketplaceLoadingMore,
} from "@/store/slices/marketplaceSlice"
import type { MarketplaceListing } from "@/types/maritime"
import { ListingDetailModal } from "@/components/marketplace/ListingDetailModal"
import { useAuth } from "@/contexts/auth-context"
import api from "@/lib/api"

// ─── Font injection (import once at app root in production) ───────────────────
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
    rel="stylesheet"
  />
)

// ─── Design tokens (CSS-in-JS bridge) ────────────────────────────────────────
const T = {
  navy:    "#0D1B2A",
  navyMid: "#152234",
  navyLt:  "#1E3048",
  gold:    "#C9A84C",
  goldLt:  "#E8C96A",
  slate:   "#4A5568",
  slateL:  "#718096",
  fog:     "#F7F8FA",
  fog2:    "#EDF0F4",
  white:   "#FFFFFF",
  red:     "#E53E3E",
  green:   "#38A169",
  border:  "rgba(13,27,42,0.10)",
  borderG: "rgba(201,168,76,0.30)",
  shadow:  "0 2px 8px rgba(13,27,42,0.08), 0 0 0 1px rgba(13,27,42,0.06)",
  shadowH: "0 12px 40px rgba(13,27,42,0.14), 0 0 0 1px rgba(13,27,42,0.08)",
  radius:  "14px",
  radiusS: "8px",
  serif:   "'DM Serif Display', Georgia, serif",
  sans:    "'DM Sans', system-ui, sans-serif",
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 12

const CATEGORIES = [
  { value: "all",        label: "All Categories",  icon: "⊞" },
  { value: "vessel",     label: "Vessels",          icon: "⛴" },
  { value: "container",  label: "Containers",       icon: "📦" },
  { value: "equipment",  label: "Equipment",        icon: "⚙" },
  { value: "warehouse",  label: "Warehouse",        icon: "🏭" },
  { value: "crane",      label: "Cranes",           icon: "🏗" },
  { value: "spare_parts",label: "Spare Parts",      icon: "🔧" },
  { value: "repairs",    label: "Repairs",          icon: "🛠" },
  { value: "insurance",  label: "Insurance",        icon: "🛡" },
]

const CONDITIONS = [
  { value: "all",      label: "Any Condition" },
  { value: "new",      label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good",     label: "Good" },
  { value: "fair",     label: "Fair" },
  { value: "used",     label: "Used" },
]

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "featured",   label: "Featured" },
]

const CONDITION_COLORS: Record<string, string> = {
  new:      T.green,
  like_new: "#2B7CB3",
  good:     T.slateL,
  fair:     "#B7791F",
  used:     T.slateL,
}

// ─── Shared styled primitives ─────────────────────────────────────────────────

function Badge({
  children,
  color = T.navy,
  bg = T.fog2,
  style = {},
}: {
  children: React.ReactNode
  color?: string
  bg?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
        color,
        background: bg,
        border: `1px solid ${color}22`,
        borderRadius: 6,
        padding: "3px 8px",
        whiteSpace: "nowrap" as const,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
  variant = "solid",
  style = {},
}: {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  loading?: boolean
  variant?: "solid" | "outline" | "ghost"
  style?: React.CSSProperties
}) {
  const [hov, setHov] = useState(false)
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: T.sans,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.01em",
    borderRadius: T.radiusS,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.18s ease",
    border: "none",
    outline: "none",
    padding: "0 18px",
    height: 40,
    opacity: disabled ? 0.55 : 1,
    ...style,
  }
  if (variant === "solid") {
    return (
      <button
        style={{
          ...base,
          background: hov && !disabled ? T.goldLt : T.gold,
          color: T.navy,
          transform: hov && !disabled ? "translateY(-1px)" : "none",
          boxShadow: hov && !disabled ? `0 4px 16px ${T.gold}44` : "none",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <Spinner size={14} color={T.navy} /> : children}
      </button>
    )
  }
  if (variant === "outline") {
    return (
      <button
        style={{
          ...base,
          background: hov ? T.navy : "transparent",
          color: hov ? T.white : T.navy,
          border: `1.5px solid ${T.navy}`,
          transform: hov ? "translateY(-1px)" : "none",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <Spinner size={14} color={hov ? T.white : T.navy} /> : children}
      </button>
    )
  }
  return (
    <button
      style={{
        ...base,
        background: hov ? T.fog2 : "transparent",
        color: T.slate,
        padding: "0 12px",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Spinner({ size = 16, color = T.white }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "spin 0.7s linear infinite" }}
    >
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="10" stroke={color} strokeOpacity="0.25" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Heart: ({ filled }: { filled?: boolean }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? T.red : "none"} stroke={filled ? T.red : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  MapPin: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Star: ({ filled }: { filled?: boolean }) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? T.gold : "none"} stroke={T.gold} strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Cart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  Eye: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Shield: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Filter: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Gavel: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/>
      <path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"/>
    </svg>
  ),
  Anchor: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/>
      <path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M5 12a7 7 0 0 0 14 0"/>
    </svg>
  ),
  Package: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.25 }}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function ListingCardSkeleton() {
  return (
    <div
      style={{
        background: T.white,
        borderRadius: T.radius,
        boxShadow: T.shadow,
        overflow: "hidden",
        animation: "pulse 1.6s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1 }
          50% { opacity:.55 }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0 }
          100% { background-position: 400px 0 }
        }
      `}</style>
      <div style={{ aspectRatio: "4/3", background: T.fog2 }} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ height: 18, background: T.fog2, borderRadius: 6, width: "75%", marginBottom: 8 }} />
        <div style={{ height: 13, background: T.fog2, borderRadius: 6, width: "50%", marginBottom: 16 }} />
        <div style={{ height: 22, background: T.fog2, borderRadius: 6, width: "40%", marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ height: 36, background: T.fog2, borderRadius: T.radiusS, flex: 1 }} />
          <div style={{ height: 36, background: T.fog2, borderRadius: T.radiusS, flex: 1 }} />
        </div>
      </div>
    </div>
  )
}

// ─── Seller rating stars ──────────────────────────────────────────────────────
function StarRating({ rating = 4.5, count }: { rating?: number; count?: number }) {
  const full  = Math.floor(rating)
  const stars = [1, 2, 3, 4, 5]
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      {stars.map((s) => (
        <Icon.Star key={s} filled={s <= full} />
      ))}
      {count !== undefined && (
        <span style={{ fontSize: 11, color: T.slateL, marginLeft: 3 }}>({count})</span>
      )}
    </span>
  )
}

// ─── Listing card ─────────────────────────────────────────────────────────────
interface ListingCardProps {
  listing: MarketplaceListing
  onClick: () => void
  onBuyNow: (e: React.MouseEvent) => void
  buying: boolean
}

function ListingCard({ listing, onClick, onBuyNow, buying }: ListingCardProps) {
  const [hovered,   setHovered]   = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [favAnim,   setFavAnim]   = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const city    = listing.location?.city    ?? ""
  const country = listing.location?.country ?? ""
  const loc     = [city, country].filter(Boolean).join(", ") || "Global"
  const img     = listing.images?.[0] ?? "/placeholder.svg"

  const condColor = CONDITION_COLORS[listing.condition ?? ""] ?? T.slateL

  function toggleFav(e: React.MouseEvent) {
    e.stopPropagation()
    setFavorited((v) => !v)
    setFavAnim(true)
    setTimeout(() => setFavAnim(false), 400)
  }

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: T.white,
        borderRadius: T.radius,
        boxShadow: hovered ? T.shadowH : T.shadow,
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: T.fog2 }}>
        <img
          src={img}
          alt={listing.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            opacity: imgLoaded ? 1 : 0,
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(13,27,42,0.55) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Quick preview pill (appears on hover) */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: hovered ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(8px)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.25s ease",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            borderRadius: 20,
            padding: "6px 14px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            fontWeight: 600,
            color: T.navy,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          <Icon.Eye />
          Quick Preview
        </div>

        {/* Category badge */}
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Badge
            style={{
              background: "rgba(13,27,42,0.80)",
              color: T.white,
              border: "none",
              backdropFilter: "blur(6px)",
            }}
          >
            {listing.category?.replace(/_/g, " ")}
          </Badge>
        </div>

        {/* Featured ribbon */}
        {listing.featured && (
          <div style={{ position: "absolute", top: 10, right: 44 }}>
            <Badge bg={T.gold} color={T.navy} style={{ border: "none" }}>
              ★ Featured
            </Badge>
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={toggleFav}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
            transform: favAnim ? "scale(1.35)" : "scale(1)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
          }}
          aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
        >
          <Icon.Heart filled={favorited} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: T.slateL,
            fontWeight: 500,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          <Icon.MapPin />{loc}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: T.serif,
            fontSize: 17,
            fontWeight: 400,
            color: T.navy,
            margin: "0 0 10px",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {listing.title}
        </h3>

        {/* Seller row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <StarRating rating={4.7} count={23} />
          {listing.bolVerified && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                fontWeight: 700,
                color: T.green,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <Icon.Shield />
              BOL Verified
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: T.border, margin: "0 0 12px" }} />

        {/* Price + condition */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: T.slateL, fontWeight: 500, marginBottom: 2 }}>Price</div>
            <div style={{ fontFamily: T.serif, fontSize: 21, color: T.navy, lineHeight: 1 }}>
              {listing.currency ?? "USD"}{" "}
              <span style={{ fontWeight: 400 }}>{listing.price?.toLocaleString()}</span>
              {listing.priceType && listing.priceType !== "fixed" && (
                <span style={{ fontFamily: T.sans, fontSize: 11, color: T.slateL, fontWeight: 400 }}>
                  {" "}/ {listing.priceType.replace(/_/g, " ")}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: condColor,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              paddingBottom: 2,
            }}
          >
            {listing.condition?.replace(/_/g, " ") ?? "—"}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
          <PrimaryButton
            variant="outline"
            style={{ flex: 1, height: 38, fontSize: 12 }}
          >
            View Details
          </PrimaryButton>
          <PrimaryButton
            variant="solid"
            disabled
            style={{ flex: 1, height: 38, fontSize: 12 }}
          >
            <Icon.Cart />
            Coming Soon
          </PrimaryButton>
        </div>
      </div>
    </article>
  )
}

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  )
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return width
}

// ─── Category pill (tablet+desktop) ──────────────────────────────────────────
function CategoryPill({
  cat,
  active,
  onClick,
}: {
  cat: typeof CATEGORIES[0]
  active: boolean
  onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 16px",
        borderRadius: 40,
        border: active ? `1.5px solid ${T.gold}` : `1.5px solid ${T.border}`,
        background: active ? T.navy : hov ? T.fog : T.white,
        color: active ? T.white : T.slate,
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.16s ease",
        whiteSpace: "nowrap",
        fontFamily: T.sans,
        flexShrink: 0,
      }}
    >
      {cat.icon} {cat.label}
    </button>
  )
}

// ─── Category filter (responsive) ────────────────────────────────────────────
function CategoryFilter({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const width = useWindowWidth()
  const isMobile = width < 640

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: T.slateL,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: T.sans,
          }}
        >
          Category
        </label>
        <Select
          value={value}
          onChange={onChange}
          options={CATEGORIES.map((c) => ({ value: c.value, label: `${c.icon}  ${c.label}` }))}
          style={{ width: "100%" }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 4,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`.cat-scroll::-webkit-scrollbar{display:none}`}</style>
      <div
        className="cat-scroll"
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          width: "100%",
        }}
      >
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat.value}
            cat={cat}
            active={value === cat.value}
            onClick={() => onChange(cat.value)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Custom dropdown ──────────────────────────────────────────────────────────
function Select({
  value,
  onChange,
  options,
  placeholder,
  style = {},
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
  style?: React.CSSProperties
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onOutside)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("mousedown", onOutside)
      document.removeEventListener("keydown", onEscape)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: "relative", minWidth: 0, ...style }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          width: "100%",
          height: 40,
          padding: "0 10px 0 12px",
          fontFamily: T.sans,
          fontSize: 13,
          fontWeight: 500,
          color: T.navy,
          background: T.white,
          border: `1.5px solid ${open ? T.gold : T.border}`,
          borderRadius: T.radiusS,
          cursor: "pointer",
          outline: "none",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          boxShadow: open ? `0 0 0 3px ${T.gold}22` : "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            flex: 1,
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selected?.label ?? placeholder ?? "Select…"}
        </span>
        <span
          style={{
            flexShrink: 0,
            color: T.slateL,
            display: "flex",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Icon.ChevronDown />
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            minWidth: "100%",
            background: T.white,
            border: `1.5px solid ${T.border}`,
            borderRadius: T.radiusS,
            boxShadow: T.shadowH,
            zIndex: 300,
            overflow: "hidden",
            animation: "fadeIn 0.15s ease",
          }}
        >
          {options.map((o, i) => {
            const isActive = o.value === value
            return (
              <button
                key={o.value}
                role="option"
                aria-selected={isActive}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false) }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  width: "100%",
                  padding: "10px 14px",
                  background: isActive ? T.fog2 : T.white,
                  color: isActive ? T.navy : T.slate,
                  fontFamily: T.sans,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  border: "none",
                  borderBottom: i < options.length - 1 ? `1px solid ${T.border}` : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = T.fog
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = isActive ? T.fog2 : T.white
                }}
              >
                <span>{o.label}</span>
                {isActive && (
                  <span style={{ flexShrink: 0, color: T.gold }}>
                    <Icon.Check />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Search input ─────────────────────────────────────────────────────────────
function SearchInput({
  value,
  onChange,
  onSearch,
}: {
  value: string
  onChange: (v: string) => void
  onSearch: () => void
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: T.white,
        border: `1.5px solid ${focused ? T.gold : T.border}`,
        borderRadius: T.radiusS,
        padding: "0 6px 0 14px",
        height: 44,
        gap: 8,
        flex: 1,
        transition: "border-color 0.15s ease",
        boxShadow: focused ? `0 0 0 3px ${T.gold}22` : "none",
      }}
    >
      <span style={{ color: T.slateL, display: "flex", flexShrink: 0 }}>
        <Icon.Search />
      </span>
      <input
        type="search"
        placeholder="Search vessels, containers, equipment…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontFamily: T.sans,
          fontSize: 14,
          color: T.navy,
          background: "transparent",
          minWidth: 0,
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: T.slateL,
            padding: 4,
            display: "flex",
            borderRadius: 4,
          }}
        >
          <Icon.X />
        </button>
      )}
      <PrimaryButton variant="solid" onClick={onSearch} style={{ height: 32, fontSize: 13 }}>
        Search
      </PrimaryButton>
    </div>
  )
}

// ─── Tab navigation ───────────────────────────────────────────────────────────
function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: { value: string; label: string; count?: number }[]
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        borderBottom: `2px solid ${T.fog2}`,
        marginBottom: 0,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: T.sans,
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? T.navy : T.slateL,
              borderBottom: isActive ? `2px solid ${T.gold}` : "2px solid transparent",
              marginBottom: -2,
              transition: "all 0.15s ease",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                style={{
                  background: isActive ? T.navy : T.fog2,
                  color: isActive ? T.white : T.slateL,
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "1px 7px",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        gap: 16,
        textAlign: "center",
      }}
    >
      <div style={{ color: T.slateL }}>
        <Icon.Package />
      </div>
      <div>
        <p style={{ fontFamily: T.serif, fontSize: 20, color: T.navy, margin: "0 0 6px" }}>
          No listings found
        </p>
        <p style={{ fontFamily: T.sans, fontSize: 14, color: T.slateL, margin: 0 }}>
          {hasFilters
            ? "Try adjusting your search filters to see more results."
            : "Check back soon — new listings are added daily."}
        </p>
      </div>
      {hasFilters && (
        <PrimaryButton variant="outline" onClick={onClear}>
          Clear all filters
        </PrimaryButton>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function MarketView() {
  const dispatch        = useDispatch<AppDispatch>()
  const { isAuthenticated, user } = useAuth()
  const listings        = useSelector(selectAllListings)
  const selectedListing = useSelector(selectSelectedListing)
  const total           = useSelector(selectMarketplaceTotal)
  const hasMore         = useSelector(selectMarketplaceHasMore)
  const loading         = useSelector(selectMarketplaceLoading)
  const loadingMore     = useSelector(selectMarketplaceLoadingMore)

  // ── Filter state ──────────────────────────────────────────────────────────
  const [search,    setSearch]    = useState("")
  const [category,  setCategory]  = useState("all")
  const [condition, setCondition] = useState("all")
  const [sort,      setSort]      = useState<"newest"|"price_asc"|"price_desc"|"featured">("newest")
  const [minPrice,  setMinPrice]  = useState("")
  const [maxPrice,  setMaxPrice]  = useState("")
  const [showAdv,   setShowAdv]   = useState(false)
  const [buyingId,  setBuyingId]  = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [detailOpen, setDetailOpen] = useState(false)

  const skipRef = useRef(0)

  useEffect(() => {
    skipRef.current = 0
    dispatch(fetchListings({ take: PAGE_SIZE }))
  }, [dispatch])

  function buildParams(skip = 0, overrides: Record<string, any> = {}) {
    const cat  = overrides.category  ?? category
    const cond = overrides.condition ?? condition
    const q    = overrides.search    ?? search.trim()
    const s    = overrides.sort      ?? sort
    const min  = overrides.minPrice  ?? minPrice
    const max  = overrides.maxPrice  ?? maxPrice
    return {
      ...(q              ? { search: q }              : {}),
      ...(cat  !== "all" ? { category: cat }          : {}),
      ...(cond !== "all" ? { condition: cond }        : {}),
      ...(s              ? { sort: s }                : {}),
      ...(min            ? { minPrice: Number(min) }  : {}),
      ...(max            ? { maxPrice: Number(max) }  : {}),
      skip,
      take: PAGE_SIZE,
    }
  }

  function applyFilters(overrides: Record<string, any> = {}) {
    skipRef.current = 0
    dispatch(fetchListings(buildParams(0, overrides)))
  }

  function clearFilters() {
    setSearch(""); setCategory("all"); setCondition("all")
    setSort("newest"); setMinPrice(""); setMaxPrice("")
    skipRef.current = 0
    dispatch(fetchListings({ take: PAGE_SIZE }))
  }

  function handleLoadMore() {
    const next = skipRef.current + PAGE_SIZE
    skipRef.current = next
    dispatch(fetchMoreListings(buildParams(next)))
  }

  function handleCardClick(id: string) {
    dispatch(fetchListingDetail(id))
    setDetailOpen(true)
  }

  function handleModalClose() {
    setDetailOpen(false)
    dispatch(clearSelectedListing())
  }

  async function handleBuyNow(listing: MarketplaceListing, e: React.MouseEvent) {
    e.stopPropagation()
    if (!isAuthenticated || !user) {
      window.location.href = `/login?redirectTo=/dashboard/buyer`
      return
    }
    setBuyingId(listing.id)
    try {
      const amountKobo = Math.round(Number(listing.price) * 100)
      const res = await api.post("/payments/initialize", {
        email: user.email,
        amount: amountKobo,
        metadata: { listingId: listing.id, listingTitle: listing.title },
      })
      window.open(res.data.authorization_url, "_blank", "noopener,noreferrer")
    } finally {
      setBuyingId(null)
    }
  }

  const hasActiveFilters = !!(search.trim() || category !== "all" || condition !== "all" || minPrice || maxPrice)

  const tabs = [
    { value: "all",      label: "All Listings",  count: total || undefined },
    { value: "auctions", label: "Live Auctions",  count: 0 },
    { value: "saved",    label: "Saved Items" },
  ]

  // ─── Styles object (hoisted for readability) ──────────────────────────────
  const S = {
    page: {
      fontFamily: T.sans,
      background: T.fog,
      minHeight: "100vh",
      color: T.navy,
    } as React.CSSProperties,

    section: {
      maxWidth: 1400,
      margin: "0 auto",
      padding: "0 24px",
    } as React.CSSProperties,

    filterBar: {
      background: T.white,
      borderRadius: T.radius,
      boxShadow: T.shadow,
      padding: "16px 20px",
      display: "flex",
      flexDirection: "column" as const,
      gap: 14,
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 24,
    } as React.CSSProperties,

    input: {
      fontFamily: T.sans,
      fontSize: 13,
      color: T.navy,
      background: T.white,
      border: `1.5px solid ${T.border}`,
      borderRadius: T.radiusS,
      padding: "0 12px",
      height: 40,
      outline: "none",
      width: "100%",
    } as React.CSSProperties,
  }

  return (
    <div style={S.page}>
      <FontLink />

  
     

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div style={{ ...S.section, paddingTop: 32, paddingBottom: 64 }}>

        {/* Search & Filter bar */}
        <div style={S.filterBar}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <SearchInput value={search} onChange={setSearch} onSearch={applyFilters} />
            <Select
              value={sort}
              onChange={(v) => { setSort(v as typeof sort); applyFilters({ sort: v }) }}
              options={SORT_OPTIONS}
              style={{ minWidth: 160, flex: 1 }}
            />
            <button
              onClick={() => setShowAdv((v) => !v)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 40,
                padding: "0 14px",
                background: showAdv ? T.navy : T.white,
                color: showAdv ? T.white : T.slate,
                border: `1.5px solid ${showAdv ? T.navy : T.border}`,
                borderRadius: T.radiusS,
                cursor: "pointer",
                fontFamily: T.sans,
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              <Icon.Filter />
              Filters
              {hasActiveFilters && (
                <span
                  style={{
                    background: T.gold,
                    color: T.navy,
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "0 5px",
                    minWidth: 16,
                    textAlign: "center",
                  }}
                >
                  {[search.trim(), category !== "all", condition !== "all", minPrice, maxPrice].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Category filter — select on mobile, scrollable pills on tablet/desktop */}
          <CategoryFilter
            value={category}
            onChange={(v) => { setCategory(v); applyFilters({ category: v }) }}
          />

          {/* Advanced filters (collapsible) */}
          {showAdv && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 10,
                paddingTop: 12,
                borderTop: `1px solid ${T.border}`,
                animation: "fadeIn 0.2s ease",
              }}
            >
              <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>
              <Select value={condition} onChange={(v) => { setCondition(v); applyFilters({ condition: v }) }} options={CONDITIONS} />
              <input
                type="number"
                placeholder="Min price (USD)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={S.input}
              />
              <input
                type="number"
                placeholder="Max price (USD)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={S.input}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <PrimaryButton variant="solid" onClick={applyFilters} style={{ flex: 1 }}>
                  Apply
                </PrimaryButton>
                {hasActiveFilters && (
                  <PrimaryButton variant="ghost" onClick={clearFilters} style={{ flex: 1 }}>
                    Clear
                  </PrimaryButton>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 28 }}>
          <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
        </div>

        {/* ── All Listings ─────────────────────────────────────────────────── */}
        {activeTab === "all" && (
          <div style={{ marginTop: 28 }}>
            {/* Result meta */}
            {!loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 13, color: T.slateL }}>
                  {total > 0
                    ? `Showing ${listings.length.toLocaleString()} of ${total.toLocaleString()} listing${total !== 1 ? "s" : ""}`
                    : hasActiveFilters
                      ? "No listings match your filters"
                      : "No listings available yet"}
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      color: T.red,
                      fontWeight: 600,
                      fontFamily: T.sans,
                      padding: 0,
                    }}
                  >
                    <Icon.X /> Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Skeleton grid */}
            {loading && (
              <div style={S.grid}>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <ListingCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Listing grid */}
            {!loading && listings.length > 0 && (
              <div style={S.grid}>
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onClick={() => handleCardClick(listing.id)}
                    onBuyNow={(e) => handleBuyNow(listing, e)}
                    buying={buyingId === listing.id}
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && listings.length === 0 && (
              <EmptyState hasFilters={hasActiveFilters} onClear={clearFilters} />
            )}

            {/* Load more */}
            {!loading && hasMore && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                <PrimaryButton
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  loading={loadingMore}
                  style={{ minWidth: 200, height: 46, fontSize: 14 }}
                >
                  {loadingMore ? "Loading…" : "Load More Listings"}
                </PrimaryButton>
              </div>
            )}
          </div>
        )}

        {/* ── Auctions ─────────────────────────────────────────────────────── */}
        {activeTab === "auctions" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "80px 24px",
              gap: 16,
              textAlign: "center",
            }}
          >
            <span style={{ color: T.slateL }}>
              <Icon.Gavel />
            </span>
            <div>
              <p style={{ fontFamily: T.serif, fontSize: 22, color: T.navy, margin: "0 0 8px" }}>
                No Active Auctions
              </p>
              <p style={{ fontSize: 14, color: T.slateL, margin: 0 }}>
                Live auctions will appear here. Check back soon — or list your own.
              </p>
            </div>
            <PrimaryButton variant="solid" style={{ marginTop: 8 }}>
              List for Auction
            </PrimaryButton>
          </div>
        )}

        {/* ── Saved ────────────────────────────────────────────────────────── */}
        {activeTab === "saved" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "80px 24px",
              gap: 16,
              textAlign: "center",
            }}
          >
            <span style={{ color: T.slateL, fontSize: 40 }}>♡</span>
            <div>
              <p style={{ fontFamily: T.serif, fontSize: 22, color: T.navy, margin: "0 0 8px" }}>
                No Saved Items Yet
              </p>
              <p style={{ fontSize: 14, color: T.slateL, margin: 0 }}>
                Tap the heart on any listing to save it here for later.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Detail modal */}
      <ListingDetailModal
        open={detailOpen}
        onClose={handleModalClose}
        listing={selectedListing}
      />
    </div>
  )
}