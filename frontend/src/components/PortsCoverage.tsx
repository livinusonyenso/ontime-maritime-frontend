/**
 * PortsCoverage — Complete Nigerian Port Coverage section
 * Ontime Resources Limited · NIMASA Licence SA261009
 *
 * Usage: <PortsCoverage />
 */

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Mail, MessageCircle, X, Anchor, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  forest:  "#0F3D2B",
  forestL: "#1a5c40",
  mint:    "#6EE7B7",
  navy:    "#1B3A6B",
  amber:   "#F59E0B",
  blue:    "#3B82F6",
  text:    "#374151",
  card:    "#ffffff",
}

const WHATSAPP_URL = "https://wa.me/2348000000000" // ← replace with actual number
const EMAIL        = "ontimemaritime@gmail.com"

// ─── Types ─────────────────────────────────────────────────────────────────────
type PortType = "seaport" | "dry-port" | "inland"

interface Port {
  id:    string
  type:  PortType
  mapX:  number   // position in SVG viewBox 0 0 600 520
  mapY:  number
}

// ─── Port data (coords only — text comes from i18n) ────────────────────────────
const SEAPORTS: Port[] = [
  { id: "apapa",        type: "seaport", mapX: 36,  mapY: 388 },
  { id: "tin-can",      type: "seaport", mapX: 28,  mapY: 400 },
  { id: "lekki",        type: "seaport", mapX: 58,  mapY: 388 },
  { id: "onne",         type: "seaport", mapX: 220, mapY: 468 },
  { id: "port-harcourt",type: "seaport", mapX: 207, mapY: 472 },
  { id: "warri",        type: "seaport", mapX: 148, mapY: 436 },
  { id: "calabar",      type: "seaport", mapX: 271, mapY: 462 },
]

const INLAND_PORTS: Port[] = [
  { id: "onitsha", type: "inland", mapX: 198, mapY: 406 },
]

const DRY_PORTS: Port[] = [
  { id: "kano-dry-port",      type: "dry-port", mapX: 279, mapY: 122 },
  { id: "kaduna-dry-port",    type: "dry-port", mapX: 228, mapY: 194 },
  { id: "maiduguri-dry-port", type: "dry-port", mapX: 490, mapY: 130 },
  { id: "funtua-dry-port",    type: "dry-port", mapX: 222, mapY: 145 },
  { id: "heipang-dry-port",   type: "dry-port", mapX: 297, mapY: 267 },
  { id: "ibadan-dry-port",    type: "dry-port", mapX: 65,  mapY: 346 },
]

const ALL_PORTS = [...SEAPORTS, ...INLAND_PORTS, ...DRY_PORTS]

// ─── Helpers ───────────────────────────────────────────────────────────────────
function pinColor(type: PortType) {
  return type === "seaport" ? C.mint : type === "dry-port" ? C.amber : C.blue
}

function typeBadgeClass(type: PortType) {
  if (type === "seaport")  return "bg-emerald-100 text-emerald-800"
  if (type === "dry-port") return "bg-amber-100 text-amber-800"
  return "bg-blue-100 text-blue-800"
}

function enquireLink(portName: string) {
  const msg = encodeURIComponent(`Hello Ontime Resources, I need customs clearing/freight forwarding services at ${portName}. Please advise.`)
  return `${WHATSAPP_URL}?text=${msg}`
}

// ─── Nigeria SVG Map ───────────────────────────────────────────────────────────
// Simplified Nigeria outline: viewBox 0 0 600 520
// Coordinates derived from approximate lon/lat using:
//   svgX = (lon - 2.5) / 13 × 600 ,  svgY = (14.5 - lat) / 10.7 × 520
const NIGERIA_PATH =
  "M 23,24 L 115,19 L 254,34 L 392,44 L 531,58 L 577,122 L 568,219 L 554,316 " +
  "L 494,389 L 346,461 L 277,496 L 208,501 L 152,486 L 115,461 L 69,437 " +
  "L 37,394 L 14,340 L 9,267 L 23,146 Z"

function NigeriaMap({ activeId, onSelect }: { activeId: string | null; onSelect: (id: string | null) => void }) {
  const { t } = useTranslation()
  const active = activeId ? ALL_PORTS.find((p) => p.id === activeId) ?? null : null

  return (
    <div className="relative w-full select-none" aria-label="Interactive map of Nigeria showing port locations">
      <svg
        viewBox="0 0 600 520"
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.25))" }}
      >
        {/* Ocean background */}
        <rect width="600" height="520" fill="#1a4a6b" rx="12" />

        {/* Wave pattern */}
        <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
        <rect width="600" height="520" fill="url(#waves)" rx="12" />

        {/* Nigeria landmass */}
        <path d={NIGERIA_PATH} fill="#1a5c40" stroke="#6EE7B7" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* State texture lines */}
        <path d={NIGERIA_PATH} fill="none" stroke="rgba(110,231,183,0.08)" strokeWidth="0.5"
          strokeDasharray="3 6" />

        {/* Port pins */}
        {ALL_PORTS.map((port) => {
          const isActive = port.id === activeId
          const color    = pinColor(port.type)
          return (
            <g
              key={port.id}
              transform={`translate(${port.mapX}, ${port.mapY})`}
              onClick={() => onSelect(isActive ? null : port.id)}
              style={{ cursor: "pointer" }}
              role="button"
              aria-label={`${t(`ports.data.${port.id}.name`)}, ${t(`ports.data.${port.id}.state`)}`}
            >
              {/* Pulse ring */}
              {isActive && (
                <circle r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4">
                  <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Outer glow */}
              <circle r="9" fill={color} opacity={isActive ? 0.35 : 0.18} />
              {/* Pin body */}
              <circle r="5.5" fill={color} stroke="white" strokeWidth="1.5" />
              {/* Center dot */}
              <circle r="2" fill="white" opacity="0.9" />
            </g>
          )
        })}

        {/* Map legend */}
        <g transform="translate(14, 460)">
          <rect width="155" height="54" rx="6" fill="rgba(0,0,0,0.55)" />
          {[
            { color: C.mint,  label: t("ports.map.seaport"),  y: 14 },
            { color: C.amber, label: t("ports.map.dryPort"),   y: 30 },
            { color: C.blue,  label: t("ports.map.inland"),    y: 46 },
          ].map(({ color, label, y }) => (
            <g key={label} transform={`translate(10, ${y})`}>
              <circle cx="0" cy="0" r="4" fill={color} />
              <text x="10" y="4" fill="white" fontSize="9" fontFamily="system-ui">{label}</text>
            </g>
          ))}
        </g>
      </svg>

      {/* Popup card */}
      {active && (
        <div
          className="absolute top-3 right-3 z-10 w-64 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ border: `1px solid ${pinColor(active.type)}44` }}
        >
          <div className="flex items-center justify-between px-3 py-2 text-white text-xs font-bold"
            style={{ background: C.forest }}>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" style={{ color: pinColor(active.type) }} />
              {t(`ports.data.${active.id}.shortName`)}
            </span>
            <button onClick={() => onSelect(null)} className="opacity-60 hover:opacity-100" aria-label={t("ports.map.close")}>
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="bg-white p-3 space-y-2">
            <p className="text-xs text-gray-500">{t(`ports.data.${active.id}.state`)}</p>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeBadgeClass(active.type)}`}>
              {t(`ports.typeLabel.${active.type}`)}
            </span>
            <p className="text-[11px] font-semibold" style={{ color: C.forest }}>{t(`ports.data.${active.id}.cargoSpeciality`)}</p>
            <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-3">{t(`ports.data.${active.id}.capability`)}</p>
            <a
              href={enquireLink(t(`ports.data.${active.id}.name`))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 w-full text-[10px] font-semibold text-white rounded-lg py-1.5 mt-1 transition-opacity hover:opacity-90"
              style={{ background: C.forest }}
            >
              <MessageCircle className="h-3 w-3" /> {t("ports.map.enquire")}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Port Card ─────────────────────────────────────────────────────────────────
function PortCard({ port }: { port: Port }) {
  const { t } = useTranslation()
  const name = t(`ports.data.${port.id}.name`)

  return (
    <article
      id={`ports-section/${port.id}`}
      className="flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
      style={{ border: "0.5px solid #e5e7eb" }}
      aria-label={`${name} — ${t(`ports.data.${port.id}.state`)}`}
    >
      {/* Coloured top bar */}
      <div className="h-1.5" style={{ background: pinColor(port.type) }} />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Badge */}
        <span className={`self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full ${typeBadgeClass(port.type)}`}>
          {t(`ports.typeLabel.${port.type}`)}
        </span>

        {/* Name & state */}
        <div>
          <h3 className="text-base font-bold leading-tight" style={{ color: C.forest }}>{name}</h3>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {t(`ports.data.${port.id}.state`)}
          </p>
        </div>

        {/* Cargo speciality */}
        <p className="text-xs font-semibold" style={{ color: C.navy }}>{t(`ports.data.${port.id}.cargoSpeciality`)}</p>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Capability */}
        <p className="text-xs leading-relaxed flex-1" style={{ color: C.text }}>{t(`ports.data.${port.id}.capability`)}</p>

        {/* CTA */}
        <a
          href={enquireLink(name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full min-h-[44px] text-sm font-semibold rounded-lg text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: C.forest }}
          aria-label={`Enquire about ${name} services via WhatsApp`}
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          {t("ports.card.enquireNow")}
        </a>
      </div>
    </article>
  )
}

// ─── Stat strip item ──────────────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-5 py-3 min-w-[120px]">
      <span className="text-2xl font-black tracking-tight" style={{ color: C.mint }}>{value}</span>
      <span className="text-[11px] font-medium uppercase tracking-widest text-white/70">{label}</span>
    </div>
  )
}

// ─── Main section ──────────────────────────────────────────────────────────────
export function PortsCoverage() {
  const [activePin, setActivePin] = useState<string | null>(null)
  const { t } = useTranslation()

  return (
    <section aria-labelledby="ports-heading" style={{ fontFamily: "Inter, Montserrat, system-ui, sans-serif" }}>

      {/* ── Section header ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-16 px-4"
        style={{ background: C.forest }}
      >
        {/* Anchor watermark pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='white'%3E%3Ccircle cx='12' cy='5' r='3'/%3E%3Cline x1='12' y1='22' x2='12' y2='8' stroke='white' stroke-width='2'/%3E%3Cpath d='M5 12H2a10 10 0 0 0 20 0h-3' stroke='white' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(110,231,183,0.15)", color: C.mint, border: `1px solid ${C.mint}33` }}>
            <Anchor className="h-3.5 w-3.5" />
            {t("ports.nimasa")}
          </div>

          <h2
            id="ports-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            {t("ports.title").split(" ").slice(0, -2).join(" ")}<br />
            <span style={{ color: C.mint }}>{t("ports.title").split(" ").slice(-2).join(" ")}</span>
          </h2>

          <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            {t("ports.subtitle")}
          </p>
        </div>

        {/* Stat strip */}
        <div className="relative mt-10 max-w-3xl mx-auto">
          <div
            className="flex flex-wrap justify-center divide-y md:divide-y-0 md:divide-x rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(110,231,183,0.2)" }}
          >
            <StatItem value="7"  label={t("ports.stats.seaports")} />
            <StatItem value="6"  label={t("ports.stats.dryPorts")} />
            <StatItem value="1"  label={t("ports.stats.inland")} />
            <StatItem value="36" label={t("ports.stats.states")} />
          </div>
        </div>
      </div>

      {/* ── Interactive map ────────────────────────────────────────────────────── */}
      <div className="bg-gray-950 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">{t("ports.map.title")}</h3>
              <p className="text-sm text-gray-400 mt-0.5">{t("ports.map.subtitle")}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { color: C.mint,  label: t("ports.map.seaport") },
                { color: C.amber, label: t("ports.map.dryPort") },
                { color: C.blue,  label: t("ports.map.inland") },
              ].map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-white font-medium">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Map — hidden on mobile to keep UX clean */}
          <div className="hidden md:block">
            <NigeriaMap activeId={activePin} onSelect={setActivePin} />
          </div>

          {/* Mobile fallback: quick-select grid */}
          <div className="md:hidden grid grid-cols-2 gap-2">
            {ALL_PORTS.map((port) => (
              <button
                key={port.id}
                onClick={() => setActivePin(activePin === port.id ? null : port.id)}
                className="flex items-center gap-2 p-3 rounded-lg text-left text-white transition-colors"
                style={{
                  background: activePin === port.id ? "rgba(110,231,183,0.15)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${activePin === port.id ? C.mint + "66" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: pinColor(port.type) }} />
                <span className="text-xs font-medium leading-tight">{t(`ports.data.${port.id}.shortName`)}</span>
              </button>
            ))}
          </div>

          {/* Mobile popup */}
          {activePin && (
            <div className="md:hidden mt-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${pinColor(ALL_PORTS.find(p => p.id === activePin)!.type)}44` }}>
              {(() => {
                const p = ALL_PORTS.find((x) => x.id === activePin)!
                return (
                  <>
                    <div className="px-4 py-3 text-white flex items-center justify-between" style={{ background: C.forest }}>
                      <span className="font-bold text-sm">{t(`ports.data.${p.id}.name`)}</span>
                      <button onClick={() => setActivePin(null)} aria-label={t("ports.map.close")}><X className="h-4 w-4 opacity-60" /></button>
                    </div>
                    <div className="bg-white p-4 space-y-2">
                      <p className="text-xs text-gray-500">{t(`ports.data.${p.id}.state`)}</p>
                      <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeBadgeClass(p.type)}`}>{t(`ports.typeLabel.${p.type}`)}</span>
                      <p className="text-xs font-semibold" style={{ color: C.forest }}>{t(`ports.data.${p.id}.cargoSpeciality`)}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{t(`ports.data.${p.id}.capability`)}</p>
                      <a href={enquireLink(t(`ports.data.${p.id}.name`))} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full min-h-[44px] text-sm font-semibold text-white rounded-lg mt-2 hover:opacity-90"
                        style={{ background: C.forest }}>
                        <MessageCircle className="h-4 w-4" /> {t("ports.card.enquireNow")}
                      </a>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </div>
      </div>

      {/* ── Seaports grid ──────────────────────────────────────────────────────── */}
      <div id="ports-section/seaports" className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full shrink-0" style={{ background: C.mint }} />
            <div>
              <h3 className="text-2xl font-black" style={{ color: C.forest }}>{t("ports.seaportsSection.title")}</h3>
              <p className="text-sm text-gray-500 mt-1">{t("ports.seaportsSection.subtitle")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEAPORTS.map((port) => <PortCard key={port.id} port={port} />)}
          </div>
        </div>
      </div>

      {/* ── Inland Waterway ────────────────────────────────────────────────────── */}
      <div id="ports-section/onitsha" className="py-14 px-4" style={{ background: "#EFF6FF" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full shrink-0" style={{ background: C.blue }} />
            <div>
              <h3 className="text-2xl font-black" style={{ color: C.navy }}>{t("ports.inlandSection.title")}</h3>
              <p className="text-sm text-gray-500 mt-1">{t("ports.inlandSection.subtitle")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {INLAND_PORTS.map((port) => <PortCard key={port.id} port={port} />)}
            <div
              className="rounded-xl p-6 text-white hidden lg:flex flex-col justify-center gap-4"
              style={{ background: `linear-gradient(135deg, ${C.navy}, #0f2a5a)`, minHeight: 200 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest opacity-60">{t("ports.inlandSection.whyTitle")}</p>
              <p className="text-lg font-bold leading-snug">{t("ports.inlandSection.whyText")}</p>
              <p className="text-sm opacity-75">{t("ports.inlandSection.whyDetail")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dry Ports ──────────────────────────────────────────────────────────── */}
      <div id="ports-section/dry-ports" className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full shrink-0" style={{ background: C.amber }} />
            <div>
              <h3 className="text-2xl font-black" style={{ color: C.forest }}>{t("ports.dryPortsSection.title")}</h3>
            </div>
          </div>
          <div
            className="mb-8 rounded-xl p-4 text-sm leading-relaxed"
            style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E" }}
          >
            <strong>{t("ports.dryPortsSection.whatIs")}</strong> {t("ports.dryPortsSection.explanation")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DRY_PORTS.map((port) => <PortCard key={port.id} port={port} />)}
          </div>
        </div>
      </div>

      {/* ── Capacity summary bar ───────────────────────────────────────────────── */}
      <div className="py-10 px-4" style={{ background: C.forest }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest font-bold mb-6" style={{ color: C.mint }}>
            {t("ports.capacity.heading")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-xl"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(110,231,183,0.2)" }}>
            {[
              { value: "13",        label: t("ports.capacity.locations") },
              { value: "7",         label: t("ports.capacity.seaports") },
              { value: "6",         label: t("ports.capacity.dryPorts") },
              { value: "1",         label: t("ports.capacity.inland") },
              { value: "36",        label: t("ports.capacity.states") },
              { value: "SA261009",  label: t("ports.capacity.licence") },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 py-5 px-3 text-center"
                style={{ background: C.forest }}>
                <span className="text-xl font-black" style={{ color: C.mint }}>{value}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Call to action ─────────────────────────────────────────────────────── */}
      <div className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl mx-auto mb-2"
            style={{ background: `${C.forest}14` }}>
            <Anchor className="h-6 w-6" style={{ color: C.forest }} />
          </div>

          <h3 className="text-xl md:text-2xl font-black" style={{ color: C.forest }}>
            {t("ports.cta.title")}
          </h3>

          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t("ports.cta.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hello Ontime Resources, I need clearing services at a port not listed on your website. Can you help?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 text-sm font-bold text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              {t("ports.cta.whatsapp")}
            </a>

            <a
              href={`mailto:${EMAIL}?subject=Port%20Coverage%20Enquiry&body=Hello%20Ontime%20Resources%2C%20I%20need%20clearing%20services%20at%20a%20specific%20Nigerian%20port.%20Please%20advise.`}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 text-sm font-bold rounded-xl transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
              style={{
                border: `2px solid ${C.forest}`,
                color: C.forest,
                background: "transparent",
              }}
            >
              <Mail className="h-4 w-4 shrink-0" />
              {EMAIL}
            </a>
          </div>

          <p className="text-xs text-gray-400 pt-2">
            {t("ports.cta.slogan")}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PortsCoverage
