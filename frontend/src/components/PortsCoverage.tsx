/**
 * PortsCoverage — Complete Nigerian Port Coverage section
 * Ontime Resources Limited · NIMASA Licence SA261009
 *
 * Usage: <PortsCoverage />
 */

import { useState } from "react"
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
  id:              string
  name:            string
  shortName:       string
  state:           string
  type:            PortType
  cargoSpeciality: string
  capability:      string
  mapX:            number   // position in SVG viewBox 0 0 600 520
  mapY:            number
}

// ─── Port data ─────────────────────────────────────────────────────────────────
const SEAPORTS: Port[] = [
  {
    id: "apapa",
    name: "Lagos Port Complex, Apapa",
    shortName: "Lagos Port",
    state: "Lagos State",
    type: "seaport",
    cargoSpeciality: "Container & General Cargo",
    capability: "Primary operational hub. Full customs clearing, FCL and LCL container handling, demurrage dispute management, Form M processing, destination inspection coordination, PAAR, SON and NAFDAC waivers. Fastest turnaround at Nigeria's busiest port.",
    mapX: 36, mapY: 388,
  },
  {
    id: "tin-can",
    name: "Tin Can Island Port",
    shortName: "Tin Can",
    state: "Lagos State",
    type: "seaport",
    cargoSpeciality: "Container Terminal",
    capability: "Dedicated container terminal. Import clearing for consumer goods, vehicles, machinery, and bulk cargo. Vehicle importation specialist. Consolidated LCL shipment management with direct road access to Lagos industrial corridor.",
    mapX: 28, mapY: 400,
  },
  {
    id: "lekki",
    name: "Lekki Deep Sea Port",
    shortName: "Lekki Deep Sea",
    state: "Lagos State",
    type: "seaport",
    cargoSpeciality: "Deep Sea Terminal",
    capability: "Nigeria's largest and newest deep-sea port. Ultra-large vessel capability. Project cargo, high-volume FCL operations, heavy industrial equipment importation. Positioned for the next decade of Nigerian trade growth.",
    mapX: 58, mapY: 388,
  },
  {
    id: "onne",
    name: "Onne Port Complex",
    shortName: "Onne Port",
    state: "Rivers State",
    type: "seaport",
    cargoSpeciality: "Oil & Gas Specialist",
    capability: "Specialist oil and gas cargo clearing. Hazardous materials documentation, OPAL/OGSL processing, industrial equipment importation, project logistics coordination. Primary gateway for the Niger Delta energy sector.",
    mapX: 220, mapY: 468,
  },
  {
    id: "port-harcourt",
    name: "Port Harcourt Port",
    shortName: "Port Harcourt",
    state: "Rivers State",
    type: "seaport",
    cargoSpeciality: "General Cargo",
    capability: "General cargo, agro-commodity exports, petroleum product documentation, multipurpose cargo handling. Serves Rivers State, Bayelsa, and the broader Niger Delta trade corridor.",
    mapX: 207, mapY: 472,
  },
  {
    id: "warri",
    name: "Warri Port",
    shortName: "Warri Port",
    state: "Delta State",
    type: "seaport",
    cargoSpeciality: "Bulk & Petroleum",
    capability: "Bulk cargo, petroleum products, agro-exports. Gateway for Delta and Edo State consignees. Timber, cocoa, and palm produce export documentation and coordination.",
    mapX: 148, mapY: 436,
  },
  {
    id: "calabar",
    name: "Calabar Port",
    shortName: "Calabar Port",
    state: "Cross River State",
    type: "seaport",
    cargoSpeciality: "Agro-Export Gateway",
    capability: "Nigeria's premier agro-export port. Cocoa, sesame, timber, and commodity export documentation. Phytosanitary certificates, NEPC registration, certificate of origin. Gateway to Southeast and South-South Nigeria.",
    mapX: 271, mapY: 462,
  },
]

const INLAND_PORTS: Port[] = [
  {
    id: "onitsha",
    name: "Onitsha Inland Port",
    shortName: "Onitsha Inland",
    state: "Anambra State",
    type: "inland",
    cargoSpeciality: "River Niger — Inland Waterway",
    capability: "River Niger cargo route connecting Lagos to Southeast Nigeria. Cost-effective bulk movement alternative to road haulage. Serves Anambra, Enugu, Imo, and Abia States. Unique capability not offered by most Lagos-based clearing agents.",
    mapX: 198, mapY: 406,
  },
]

const DRY_PORTS: Port[] = [
  {
    id: "kano-dry-port",
    name: "Kano Dry Port (Inland Container Depot)",
    shortName: "Kano Dry Port",
    state: "Kano State",
    type: "dry-port",
    cargoSpeciality: "Inland Container Depot — Northwest Corridor",
    capability: "Customs clearing for cargo transferred by rail or road from Lagos and Apapa. Container examination, duty assessment, and final release coordination. Covers manufactured goods, machinery, raw materials, and agro-inputs for Northern Nigeria.",
    mapX: 279, mapY: 122,
  },
  {
    id: "kaduna-dry-port",
    name: "Kaduna Dry Port",
    shortName: "Kaduna Dry Port",
    state: "Kaduna State",
    type: "dry-port",
    cargoSpeciality: "Rail-Connected Terminal — North-Central",
    capability: "Clearing of rail-transferred containers from Lagos Port. Industrial equipment, machinery, and manufactured goods destined for North-Central Nigeria. Full coordination with NRC (Nigerian Railway Corporation) logistics.",
    mapX: 228, mapY: 194,
  },
  {
    id: "maiduguri-dry-port",
    name: "Maiduguri Dry Port",
    shortName: "Maiduguri Dry Port",
    state: "Borno State",
    type: "dry-port",
    cargoSpeciality: "Northeast Trade Gateway",
    capability: "Clearing and forwarding for humanitarian cargo, agricultural inputs, manufactured goods, and trade with Cameroon, Chad, and Niger Republic. Northeast Nigeria's primary inland clearance facility.",
    mapX: 490, mapY: 130,
  },
  {
    id: "funtua-dry-port",
    name: "Funtua Dry Port",
    shortName: "Funtua Dry Port",
    state: "Katsina State",
    type: "dry-port",
    cargoSpeciality: "Cotton & Agricultural Hub — Northwest",
    capability: "Agro-export documentation, cotton and commodity clearing, agro-input imports. Specialist in North-West agricultural trade corridor documentation. Serves Katsina, Kebbi, Sokoto, and Zamfara States.",
    mapX: 222, mapY: 145,
  },
  {
    id: "heipang-dry-port",
    name: "Heipang Dry Port",
    shortName: "Heipang Dry Port",
    state: "Plateau State",
    type: "dry-port",
    cargoSpeciality: "North-Central Gateway — Solid Minerals",
    capability: "Solid mineral exports, agricultural commodities, general cargo. Documentation for tin, columbite, and Jos Plateau mineral trade exports. Serves Plateau, Nasarawa, Benue, and Taraba States.",
    mapX: 297, mapY: 267,
  },
  {
    id: "ibadan-dry-port",
    name: "Ibadan Dry Port (Inland Container Terminal)",
    shortName: "Ibadan Dry Port",
    state: "Oyo State",
    type: "dry-port",
    cargoSpeciality: "Southwest Inland Terminal",
    capability: "Cargo overflow from Lagos ports. Textile and manufacturing imports, agro-exports, consumer goods. Direct connection to Lagos Port Complex via expressway and planned rail corridor. Serves Oyo, Osun, Ekiti, and Kwara States.",
    mapX: 65, mapY: 346,
  },
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

function typeLabel(type: PortType) {
  if (type === "seaport")  return "Seaport"
  if (type === "dry-port") return "Dry Port"
  return "Inland Waterway"
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
              aria-label={`${port.name}, ${port.state}`}
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
            { color: C.mint,  label: "Seaport",         y: 14 },
            { color: C.amber, label: "Dry Port",         y: 30 },
            { color: C.blue,  label: "Inland Waterway",  y: 46 },
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
              {active.shortName}
            </span>
            <button onClick={() => onSelect(null)} className="opacity-60 hover:opacity-100" aria-label="Close">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="bg-white p-3 space-y-2">
            <p className="text-xs text-gray-500">{active.state}</p>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeBadgeClass(active.type)}`}>
              {typeLabel(active.type)}
            </span>
            <p className="text-[11px] font-semibold" style={{ color: C.forest }}>{active.cargoSpeciality}</p>
            <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-3">{active.capability}</p>
            <a
              href={enquireLink(active.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 w-full text-[10px] font-semibold text-white rounded-lg py-1.5 mt-1 transition-opacity hover:opacity-90"
              style={{ background: C.forest }}
            >
              <MessageCircle className="h-3 w-3" /> Enquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Port Card ─────────────────────────────────────────────────────────────────
function PortCard({ port }: { port: Port }) {
  return (
    <article
      id={`ports-section/${port.id}`}
      className="flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
      style={{ border: "0.5px solid #e5e7eb" }}
      aria-label={`${port.name} — ${port.state}`}
    >
      {/* Coloured top bar */}
      <div className="h-1.5" style={{ background: pinColor(port.type) }} />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Badge */}
        <span className={`self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full ${typeBadgeClass(port.type)}`}>
          {typeLabel(port.type)}
        </span>

        {/* Name & state */}
        <div>
          <h3 className="text-base font-bold leading-tight" style={{ color: C.forest }}>{port.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {port.state}
          </p>
        </div>

        {/* Cargo speciality */}
        <p className="text-xs font-semibold" style={{ color: C.navy }}>{port.cargoSpeciality}</p>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Capability */}
        <p className="text-xs leading-relaxed flex-1" style={{ color: C.text }}>{port.capability}</p>

        {/* CTA */}
        <a
          href={enquireLink(port.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full min-h-[44px] text-sm font-semibold rounded-lg text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: C.forest }}
          aria-label={`Enquire about ${port.name} services via WhatsApp`}
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          Enquire Now
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
            NIMASA Licensed · SA261009
          </div>

          <h2
            id="ports-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            Complete Nigerian<br />
            <span style={{ color: C.mint }}>Port Coverage</span>
          </h2>

          <p className="mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            From deep-sea terminals to inland waterways and dry ports — Ontime Resources Limited
            operates across every major cargo gateway in Nigeria.
          </p>
        </div>

        {/* Stat strip */}
        <div className="relative mt-10 max-w-3xl mx-auto">
          <div
            className="flex flex-wrap justify-center divide-y md:divide-y-0 md:divide-x rounded-2xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(110,231,183,0.2)" }}
          >
            <StatItem value="7"  label="Seaports" />
            <StatItem value="6"  label="Dry Ports" />
            <StatItem value="1"  label="Inland Waterway" />
            <StatItem value="36" label="States Served" />
          </div>
        </div>
      </div>

      {/* ── Interactive map ────────────────────────────────────────────────────── */}
      <div className="bg-gray-950 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold text-white">Port Network Map</h3>
              <p className="text-sm text-gray-400 mt-0.5">Click any pin to view port details</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { color: C.mint,  label: "Seaport" },
                { color: C.amber, label: "Dry Port" },
                { color: C.blue,  label: "Inland Waterway" },
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
                <span className="text-xs font-medium leading-tight">{port.shortName}</span>
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
                      <span className="font-bold text-sm">{p.name}</span>
                      <button onClick={() => setActivePin(null)} aria-label="Close"><X className="h-4 w-4 opacity-60" /></button>
                    </div>
                    <div className="bg-white p-4 space-y-2">
                      <p className="text-xs text-gray-500">{p.state}</p>
                      <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeBadgeClass(p.type)}`}>{typeLabel(p.type)}</span>
                      <p className="text-xs font-semibold" style={{ color: C.forest }}>{p.cargoSpeciality}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{p.capability}</p>
                      <a href={enquireLink(p.name)} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full min-h-[44px] text-sm font-semibold text-white rounded-lg mt-2 hover:opacity-90"
                        style={{ background: C.forest }}>
                        <MessageCircle className="h-4 w-4" /> Enquire Now
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
              <h3 className="text-2xl font-black" style={{ color: C.forest }}>7 Major Seaports</h3>
              <p className="text-sm text-gray-500 mt-1">
                Ontime Resources Limited maintains active clearing operations at every licensed seaport in Nigeria.
              </p>
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
              <h3 className="text-2xl font-black" style={{ color: C.navy }}>Inland Waterway</h3>
              <p className="text-sm text-gray-500 mt-1">
                River-based cargo movement connecting coastal ports to Nigeria's southeast hinterland.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {INLAND_PORTS.map((port) => <PortCard key={port.id} port={port} />)}
            <div
              className="rounded-xl p-6 text-white hidden lg:flex flex-col justify-center gap-4"
              style={{ background: `linear-gradient(135deg, ${C.navy}, #0f2a5a)`, minHeight: 200 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest opacity-60">Why it matters</p>
              <p className="text-lg font-bold leading-snug">
                The River Niger route cuts haulage costs by up to 40% for Southeast-bound cargo compared to road-only transport.
              </p>
              <p className="text-sm opacity-75">
                Ontime Resources Limited is one of the few Lagos-based freight agents offering active inland waterway coordination — a critical advantage for clients in Anambra, Enugu, Imo, and Abia States.
              </p>
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
              <h3 className="text-2xl font-black" style={{ color: C.forest }}>Our Inland Port Network</h3>
            </div>
          </div>
          <div
            className="mb-8 rounded-xl p-4 text-sm leading-relaxed"
            style={{ background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E" }}
          >
            <strong>What is a Dry Port?</strong> Dry ports extend Nigeria's port capacity deep into the country's interior.
            Ontime Resources Limited provides clearing and forwarding services at all major Nigerian dry ports, enabling
            importers and exporters in landlocked states to clear cargo without travelling to the seaport.
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
            Total Network Capacity
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-xl"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(110,231,183,0.2)" }}>
            {[
              { value: "13",        label: "Port Locations" },
              { value: "7",         label: "Seaports" },
              { value: "6",         label: "Dry Ports" },
              { value: "1",         label: "Inland Waterway" },
              { value: "36",        label: "States Covered" },
              { value: "SA261009",  label: "NIMASA Licence" },
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
            Operating at a port not listed here?
          </h3>

          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Our network is expanding and our team can coordinate customs clearing at any Nigerian facility
            upon client request. Contact us and we will make it work.
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
              Chat on WhatsApp
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
            "Where Cargo Meets Technology" · NIMASA Licence SA261009 · Active & Compliant
          </p>
        </div>
      </div>
    </section>
  )
}

export default PortsCoverage
