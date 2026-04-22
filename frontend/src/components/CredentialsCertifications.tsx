/**
 * CredentialsCertifications — Verified Credentials & Professional Certifications
 * Ontime Resources Limited · NIMASA Licence SA261009 · "Where Cargo Meets Technology"
 *
 * Usage: <CredentialsCertifications />
 */

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import {
  Shield, CheckCircle2, Globe, Download, ExternalLink,
  FileText, ChevronDown, ChevronUp, Anchor, Award, Building2,
  GraduationCap, BadgeCheck, Clock
} from "lucide-react"

// ─── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  forest:   "#0F3D2B",
  forestL:  "#1a5c40",
  mint:     "#6EE7B7",
  mintDim:  "#d1fae5",
  navy:     "#1B3A6B",
  gold:     "#B45309",
  goldBg:   "#FEF3C7",
  active:   "#166534",
  activeBg: "#DCFCE7",
  amber:    "#92400E",
  amberBg:  "#FEF3C7",
  text:     "#374151",
  muted:    "#6B7280",
  border:   "#E5E7EB",
  bg:       "#F3F4F6",
  white:    "#FFFFFF",
}

// ─── Live licence data ──────────────────────────────────────────────────────────
const LICENCE = {
  number:   "SA261009",
  issued:   new Date("2026-03-25"),
  expiry:   new Date("2027-03-24"),
  verifyAt: "https://www.nimasa.gov.ng",
}

function daysRemaining(): number {
  return Math.max(0, Math.ceil((LICENCE.expiry.getTime() - Date.now()) / 86_400_000))
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

function todayStr(): string {
  return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

// ─── Pulsing dot ───────────────────────────────────────────────────────────────
function PulseDot({ color = C.active }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ background: color }}
      />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: color }} />
    </span>
  )
}

// ─── Live status widget (inline, used inside hero card) ────────────────────────
function StatusWidget({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation()
  const days = daysRemaining()

  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
        style={{ background: C.active }}
      >
        <PulseDot color="#86efac" />
        NIMASA {LICENCE.number} — {t("credentials.widget.active")}
      </span>
    )
  }

  return (
    <div
      className="rounded-xl p-4 space-y-2.5"
      style={{ background: C.activeBg, border: `1px solid ${C.mint}` }}
    >
      <div className="flex items-center gap-2">
        <PulseDot />
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.active }}>
          {t("credentials.widget.active")}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: C.text }}>
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide text-[10px]">{t("credentials.widget.licenceNo")}</p>
          <p className="font-black mt-0.5" style={{ color: C.forest }}>{LICENCE.number}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide text-[10px]">{t("credentials.widget.validUntil")}</p>
          <p className="font-bold mt-0.5">{fmtDate(LICENCE.expiry)}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide text-[10px]">{t("credentials.widget.daysRemaining")}</p>
          <p className="font-black mt-0.5" style={{ color: days < 60 ? "#dc2626" : C.active }}>{days} {t("credentials.widget.days")}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-400 uppercase tracking-wide text-[10px]">{t("credentials.widget.lastVerified")}</p>
          <p className="font-bold mt-0.5">{todayStr()}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Hero NIMASA card ──────────────────────────────────────────────────────────
function HeroCard() {
  const { t } = useTranslation()

  const licenceFields = [
    { labelKey: "credentials.hero.licenceNumber", value: LICENCE.number,                        bold: true },
    { labelKey: "credentials.hero.category",      value: t("credentials.hero.categoryValue"),   bold: false },
    { labelKey: "credentials.hero.status",        value: t("credentials.hero.statusValue"),     bold: true, green: true },
    { labelKey: "credentials.hero.issued",        value: fmtDate(LICENCE.issued),               bold: false },
    { labelKey: "credentials.hero.validUntil",    value: fmtDate(LICENCE.expiry),               bold: false },
    { labelKey: "credentials.hero.issuingBody",   value: "NIMASA",                              bold: false },
  ]

  return (
    <div
      id="credentials-section/nimasa"
      className="relative w-full rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style={{
        borderLeft: `6px solid ${C.mint}`,
        boxShadow: `0 0 0 1px ${C.border}, 0 8px 40px rgba(15,61,43,0.12), 0 0 0 1px ${C.mint}22`,
      }}
      aria-label="NIMASA Shipping Agent Registration Licence SA261009"
    >
      {/* Verified badge */}
      <div
        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white"
        style={{ background: C.active }}
      >
        <BadgeCheck className="h-3.5 w-3.5" />
        {t("credentials.hero.verifiedBadge")}
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-[auto_1fr] gap-6 md:gap-8">
        {/* Logo placeholder */}
        <div
          className="flex-shrink-0 flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-2xl"
          style={{ background: `${C.forest}10`, border: `2px solid ${C.mint}44` }}
          aria-label="NIMASA — Nigerian Maritime Administration and Safety Agency logo"
        >
          <Anchor className="h-10 w-10 md:h-12 md:w-12" style={{ color: C.forest }} />
        </div>

        <div className="space-y-5 min-w-0">
          {/* Title block */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: C.mint, background: C.forest, display: "inline-block", padding: "2px 10px", borderRadius: 99 }}>
              {t("credentials.hero.primaryLabel")}
            </p>
            <h3 className="text-xl md:text-2xl font-black mt-2 leading-snug" style={{ color: C.forest }}>
              {t("credentials.hero.title")}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {t("credentials.hero.issuer")}
            </p>
          </div>

          {/* Licence details grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {licenceFields.map(({ labelKey, value, bold, green }) => (
              <div key={labelKey}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{t(labelKey)}</p>
                <p
                  className={`text-sm mt-0.5 ${bold ? "font-black" : "font-medium"}`}
                  style={{ color: green ? C.active : C.text }}
                >
                  {value}
                  {green && <PulseDot color={C.active} />}
                </p>
              </div>
            ))}
          </div>

          {/* Authority note */}
          <p className="text-xs text-gray-500 leading-relaxed border-l-2 pl-3" style={{ borderColor: C.mint }}>
            {t("credentials.hero.authority")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={LICENCE.verifyAt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 min-h-[44px]"
              style={{ background: C.forest }}
              aria-label="Verify NIMASA licence at nimasa.gov.ng"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              {t("credentials.hero.verifyBtn")}
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-80 min-h-[44px]"
              style={{ border: `2px solid ${C.forest}`, color: C.forest }}
              aria-label="Download NIMASA certificate copy"
            >
              <Download className="h-4 w-4 shrink-0" />
              {t("credentials.hero.downloadBtn")}
            </a>
          </div>
        </div>
      </div>

      {/* Status widget bottom strip */}
      <div className="px-6 md:px-8 pb-6 md:pb-8">
        <StatusWidget />
      </div>
    </div>
  )
}

// ─── Qualification card ────────────────────────────────────────────────────────
interface QualProps {
  id:         string
  icon:       React.ReactNode
  tagColor:   string
  tagBg:      string
  borderColor: string
  bgAccent:   string
}

function QualCard({ id, icon, tagColor, tagBg, borderColor, bgAccent }: QualProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const subjects = t(`credentials.qualifications.${id}.subjects`, { returnObjects: true }) as string[]

  return (
    <article
      id={`credentials-section/${id}`}
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px #E5E7EB", borderTop: `4px solid ${borderColor}` }}
      aria-label={t(`credentials.qualifications.${id}.title`)}
    >
      <div className="p-6 space-y-4">
        {/* Tag */}
        <span
          className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ color: tagColor, background: tagBg }}
        >
          {t(`credentials.qualifications.${id}.tag`)}
        </span>

        {/* Icon + title */}
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 flex items-center justify-center h-14 w-14 rounded-xl"
            style={{ background: bgAccent }}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-black leading-snug" style={{ color: C.navy }}>{t(`credentials.qualifications.${id}.title`)}</h4>
            <p className="text-sm font-semibold mt-0.5" style={{ color: C.forest }}>{t(`credentials.qualifications.${id}.institution`)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t(`credentials.qualifications.${id}.meta`)}</p>
          </div>
        </div>

        {/* Subject areas */}
        {Array.isArray(subjects) && subjects.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((s) => (
              <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{s}</span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Why this matters toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between text-sm font-bold py-1 transition-colors hover:opacity-70"
          style={{ color: C.forest }}
          aria-expanded={open}
          aria-controls={`qual-relevance-${id}`}
        >
          <span>{t("credentials.qualifications.whyMatters")}</span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {open && (
          <div
            id={`qual-relevance-${id}`}
            className="text-sm leading-relaxed rounded-xl p-4"
            style={{ background: C.mintDim, color: C.forest }}
          >
            {t(`credentials.qualifications.${id}.relevance`)}
          </div>
        )}
      </div>
    </article>
  )
}

// ─── Badge card ────────────────────────────────────────────────────────────────
type BadgeStatus = "active" | "in-progress" | "pending"

interface BadgeProps {
  icon:      React.ReactNode
  nameKey:   string
  authorityKey: string
  status:    BadgeStatus
}

function BadgeCard({ icon, nameKey, authorityKey, status }: BadgeProps) {
  const { t } = useTranslation()
  const statusMeta: Record<BadgeStatus, { labelKey: string; color: string; bg: string }> = {
    "active":      { labelKey: "credentials.badges.statusActive",     color: C.active, bg: C.activeBg },
    "in-progress": { labelKey: "credentials.badges.statusInProgress", color: C.amber,  bg: C.amberBg },
    "pending":     { labelKey: "credentials.badges.statusPending",    color: "#6B7280", bg: "#F3F4F6" },
  }
  const meta = statusMeta[status]

  return (
    <div
      className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06), 0 0 0 1px #E5E7EB" }}
    >
      <div
        className="flex items-center justify-center h-14 w-14 rounded-xl"
        style={{ background: status === "active" ? `${C.forest}12` : `${C.amber}12` }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold leading-snug" style={{ color: C.navy }}>{t(nameKey)}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{t(authorityKey)}</p>
      </div>
      <span
        className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full"
        style={{ color: meta.color, background: meta.bg }}
      >
        {t(meta.labelKey)}
      </span>
    </div>
  )
}

// ─── Benefit card ──────────────────────────────────────────────────────────────
function BenefitCard({ icon, titleKey, textKey }: { icon: React.ReactNode; titleKey: string; textKey: string }) {
  const { t } = useTranslation()
  return (
    <div
      className="bg-white rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px #E5E7EB" }}
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-xl" style={{ background: `${C.forest}12` }} aria-hidden="true">
        {icon}
      </div>
      <h4 className="text-base font-black" style={{ color: C.forest }}>{t(titleKey)}</h4>
      <p className="text-sm leading-relaxed text-gray-600">{t(textKey)}</p>
    </div>
  )
}

// ─── Download item ─────────────────────────────────────────────────────────────
function DownloadItem({ icon, nameKey, filenameKey, type }: { icon: React.ReactNode; nameKey: string; filenameKey: string; type: string }) {
  const { t } = useTranslation()
  return (
    <div
      className="flex items-center gap-4 bg-white rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px #E5E7EB" }}
    >
      <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-xl" style={{ background: `${C.forest}10` }} aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: C.navy }}>{t(nameKey)}</p>
        <p className="text-[11px] text-gray-400 truncate mt-0.5">{t(filenameKey)}</p>
        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">{type}</span>
      </div>
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 min-h-[44px]"
        style={{ background: C.forest }}
        aria-label={`Download ${t(nameKey)}`}
      >
        <Download className="h-4 w-4" />
        {t("credentials.downloads.downloadBtn")}
      </a>
    </div>
  )
}

// ─── Sticky floating widget ────────────────────────────────────────────────────
function StickyWidget({ visible }: { visible: boolean }) {
  const { t } = useTranslation()
  const days = daysRemaining()
  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24 pointer-events-none"
      }`}
      role="status"
      aria-label="NIMASA Licence live status"
      aria-live="polite"
    >
      {/* Desktop widget */}
      <div
        className="hidden md:flex flex-col gap-2 p-4 rounded-2xl shadow-2xl max-w-[180px]"
        style={{ background: C.white, border: `2px solid ${C.mint}`, boxShadow: `0 8px 32px rgba(15,61,43,0.15)` }}
      >
        <div className="flex items-center gap-1.5">
          <PulseDot />
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.active }}>{t("credentials.widget.active")}</span>
        </div>
        <p className="text-xs font-black" style={{ color: C.forest }}>NIMASA {LICENCE.number}</p>
        <div className="h-px bg-gray-100" />
        <div className="text-[10px] text-gray-500 space-y-1">
          <p>{t("credentials.widget.expires")} <strong className="text-gray-700">{fmtDate(LICENCE.expiry)}</strong></p>
          <p><strong style={{ color: days < 60 ? "#dc2626" : C.active }}>{days} {t("credentials.widget.days")}</strong> {t("credentials.widget.remaining")}</p>
          <p>{t("credentials.widget.verified")} {todayStr()}</p>
        </div>
        <a
          href={LICENCE.verifyAt}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-lg text-white"
          style={{ background: C.forest }}
        >
          <ExternalLink className="h-3 w-3" /> {t("credentials.widget.verify")}
        </a>
      </div>

      {/* Mobile compact pill */}
      <div className="md:hidden">
        <a
          href={LICENCE.verifyAt}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-full shadow-xl text-xs font-bold text-white"
          style={{ background: C.active }}
        >
          <PulseDot color="#86efac" />
          NIMASA {LICENCE.number} {t("credentials.widget.active")}
        </a>
      </div>
    </div>
  )
}

// ─── Main exported component ───────────────────────────────────────────────────
export function CredentialsCertifications() {
  const { t } = useTranslation()
  const [stickyVisible, setStickyVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Show sticky widget when the credentials section is in view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const qualifications: QualProps[] = [
    {
      id:          "llm-maritime-law",
      icon:        <GraduationCap className="h-7 w-7" style={{ color: C.navy }} />,
      tagColor:    C.navy,
      tagBg:       "#EEF2FF",
      borderColor: C.navy,
      bgAccent:    "#EEF2FF",
    },
    {
      id:          "cma-conference",
      icon:        <Award className="h-7 w-7" style={{ color: C.gold }} />,
      tagColor:    C.gold,
      tagBg:       C.goldBg,
      borderColor: "#B45309",
      bgAccent:    C.goldBg,
    },
  ]

  const badges: BadgeProps[] = [
    { icon: <Anchor      className="h-6 w-6" style={{ color: C.forest }} />, nameKey: "credentials.badges.nimasa.name",          authorityKey: "credentials.badges.nimasa.authority",          status: "active" },
    { icon: <Shield      className="h-6 w-6" style={{ color: C.forest }} />, nameKey: "credentials.badges.nimasaAct.name",       authorityKey: "credentials.badges.nimasaAct.authority",       status: "active" },
    { icon: <CheckCircle2 className="h-6 w-6" style={{ color: C.forest }} />, nameKey: "credentials.badges.merchantShipping.name", authorityKey: "credentials.badges.merchantShipping.authority", status: "active" },
    { icon: <BadgeCheck  className="h-6 w-6" style={{ color: C.navy }} />,   nameKey: "credentials.badges.ncs.name",             authorityKey: "credentials.badges.ncs.authority",             status: "active" },
    { icon: <Globe       className="h-6 w-6" style={{ color: C.amber }} />,  nameKey: "credentials.badges.nepc.name",            authorityKey: "credentials.badges.nepc.authority",            status: "in-progress" },
    { icon: <GraduationCap className="h-6 w-6" style={{ color: C.navy }} />, nameKey: "credentials.badges.llm.name",             authorityKey: "credentials.badges.llm.authority",             status: "active" },
    { icon: <Award       className="h-6 w-6" style={{ color: C.gold }} />,   nameKey: "credentials.badges.cma.name",             authorityKey: "credentials.badges.cma.authority",             status: "active" },
    { icon: <Globe       className="h-6 w-6" style={{ color: C.forest }} />, nameKey: "credentials.badges.canton.name",          authorityKey: "credentials.badges.canton.authority",          status: "active" },
  ]

  const registrations = [
    {
      id:    "cac",
      icon:  <Building2 className="h-7 w-7" style={{ color: C.forest }} />,
      tagKey: "credentials.registration.cac.tag",
      titleKey: "credentials.registration.cac.title",
      issuerKey: "credentials.registration.cac.issuer",
      lines: [
        { labelKey: "credentials.registration.cac.companyName",      value: "Ontime Resources Limited" },
        { labelKey: "credentials.registration.cac.regNumber",        value: "RC 7543149",               bold: true },
        { labelKey: "credentials.registration.cac.registeredUnder",  value: t("credentials.registration.cac.registeredUnderValue") },
        { labelKey: "credentials.registration.cac.status",           value: t("credentials.registration.cac.statusValue"), green: true },
        { labelKey: "credentials.registration.cac.jurisdiction",     value: t("credentials.registration.cac.jurisdictionValue") },
      ],
    },
    {
      id:    "ncs",
      icon:  <Shield className="h-7 w-7" style={{ color: C.navy }} />,
      tagKey: "credentials.registration.ncs.tag",
      titleKey: "credentials.registration.ncs.title",
      issuerKey: "credentials.registration.ncs.issuer",
      lines: [
        { labelKey: "credentials.registration.ncs.status", value: t("credentials.registration.ncs.statusValue"), green: true },
      ],
      statementKey: "credentials.registration.ncs.statement",
    },
  ]

  return (
    <>
      <StickyWidget visible={stickyVisible} />

      <section
        id="credentials-section"
        ref={sectionRef}
        aria-labelledby="credentials-heading"
        style={{ fontFamily: "Inter, Montserrat, system-ui, sans-serif" }}
      >

        {/* ── Section header ──────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden py-16 px-4" style={{ background: C.forest }}>
          {/* Subtle dot watermark */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Mint accent line at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${C.mint}, transparent)` }} />

          <div className="relative max-w-4xl mx-auto text-center space-y-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(110,231,183,0.15)", color: C.mint, border: `1px solid ${C.mint}33` }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t("credentials.badge")}
            </div>

            <h2
              id="credentials-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
            >
              {t("credentials.title").split("&")[0].trim()} &<br />
              <span style={{ color: C.mint }}>{t("credentials.title").split("&")[1]?.trim()}</span>
            </h2>

            <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              {t("credentials.subtitle")}
            </p>

            {/* Trust statement */}
            <div
              className="inline-block text-sm font-semibold px-5 py-3 rounded-xl text-center"
              style={{ background: "rgba(110,231,183,0.12)", border: `1px solid ${C.mint}44`, color: C.mint }}
            >
              {t("credentials.trustStatement")}{" "}
              <a
                href={LICENCE.verifyAt}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-bold hover:opacity-80"
                style={{ color: C.mint }}
              >
                {t("credentials.trustLink")}
              </a>
            </div>
          </div>
        </div>

        {/* ── Hero NIMASA card ────────────────────────────────────────────────── */}
        <div className="py-14 px-4" style={{ background: C.bg }}>
          <div className="max-w-4xl mx-auto">
            <HeroCard />
          </div>
        </div>

        {/* ── Academic qualifications ─────────────────────────────────────────── */}
        <div className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="text-2xl md:text-3xl font-black" style={{ color: C.forest }}>
                {t("credentials.qualifications.sectionTitle")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t("credentials.qualifications.sectionSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qualifications.map((q) => <QualCard key={q.id} {...q} />)}
            </div>
          </div>
        </div>

        {/* ── Company registration ────────────────────────────────────────────── */}
        <div className="py-14 px-4" style={{ background: C.bg }}>
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-black" style={{ color: C.forest }}>
                {t("credentials.registration.sectionTitle")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registrations.map((reg) => (
                <article
                  key={reg.id}
                  id={`credentials-section/${reg.id}`}
                  className="bg-white rounded-2xl p-6 space-y-4 transition-all duration-300 hover:-translate-y-1"
                  style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px #E5E7EB" }}
                  aria-label={t(reg.titleKey)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl shrink-0"
                      style={{ background: `${C.forest}10` }} aria-hidden="true">
                      {reg.icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: C.activeBg, color: C.active }}>{t(reg.tagKey)}</span>
                      <h4 className="text-base font-black mt-1" style={{ color: C.navy }}>{t(reg.titleKey)}</h4>
                      <p className="text-xs text-gray-400">{t(reg.issuerKey)}</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="space-y-2">
                    {reg.lines.map(({ labelKey, value, bold, green }: any) => (
                      <div key={labelKey} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-gray-400 text-xs shrink-0">{t(labelKey)}</span>
                        <span
                          className={bold ? "font-black text-right" : "font-medium text-right"}
                          style={{ color: green ? C.active : C.text }}
                        >
                          {green && <PulseDot color={C.active} />}{" "}{value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {(reg as any).statementKey && (
                    <p className="text-xs leading-relaxed text-gray-600 pt-2 border-t border-gray-100">
                      {t((reg as any).statementKey)}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* ── Badges grid ─────────────────────────────────────────────────────── */}
        <div className="py-14 px-4 bg-white">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-black" style={{ color: C.forest }}>
                {t("credentials.badges.sectionTitle")}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((b, i) => <BadgeCard key={i} {...b} />)}
            </div>
          </div>
        </div>

        {/* ── What our credentials mean for you ──────────────────────────────── */}
        <div className="py-14 px-4" style={{ background: C.bg }}>
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-black" style={{ color: C.forest }}>
                {t("credentials.benefits.sectionTitle")}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BenefitCard
                icon={<Shield className="h-6 w-6" style={{ color: C.forest }} />}
                titleKey="credentials.benefits.legalProtection.title"
                textKey="credentials.benefits.legalProtection.text"
              />
              <BenefitCard
                icon={<BadgeCheck className="h-6 w-6" style={{ color: C.active }} />}
                titleKey="credentials.benefits.verifiedAgent.title"
                textKey="credentials.benefits.verifiedAgent.text"
              />
              <BenefitCard
                icon={<Globe className="h-6 w-6" style={{ color: C.navy }} />}
                titleKey="credentials.benefits.international.title"
                textKey="credentials.benefits.international.text"
              />
            </div>
          </div>
        </div>

        {/* ── Transparency statement ──────────────────────────────────────────── */}
        <div className="py-12 px-4" style={{ background: C.mintDim }}>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <CheckCircle2 className="h-8 w-8 mx-auto" style={{ color: C.forest }} aria-hidden="true" />
            <h3 className="text-xl md:text-2xl font-black" style={{ color: C.forest }}>
              {t("credentials.transparency.title")}
            </h3>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: C.forest }}>
              {t("credentials.transparency.text")}{" "}
              <strong>{t("credentials.transparency.facts")}</strong>
            </p>
            <a
              href={LICENCE.verifyAt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 min-h-[44px]"
              style={{ background: C.forest }}
            >
              <ExternalLink className="h-4 w-4" />
              {t("credentials.transparency.verifyBtn")}
            </a>
          </div>
        </div>

        {/* ── Download centre ─────────────────────────────────────────────────── */}
        <div className="py-14 px-4 bg-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-black" style={{ color: C.forest }}>
                {t("credentials.downloads.sectionTitle")}
              </h3>
              <p className="text-sm text-gray-500">
                {t("credentials.downloads.sectionSubtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DownloadItem
                icon={<FileText className="h-6 w-6" style={{ color: C.forest }} />}
                nameKey="credentials.downloads.profile.name"
                filenameKey="credentials.downloads.profile.filename"
                type="PDF"
              />
              <DownloadItem
                icon={<Anchor className="h-6 w-6" style={{ color: C.forest }} />}
                nameKey="credentials.downloads.nimasa.name"
                filenameKey="credentials.downloads.nimasa.filename"
                type="PDF"
              />
              <DownloadItem
                icon={<FileText className="h-6 w-6" style={{ color: C.navy }} />}
                nameKey="credentials.downloads.capability.name"
                filenameKey="credentials.downloads.capability.filename"
                type="PDF"
              />
              <DownloadItem
                icon={<Clock className="h-6 w-6" style={{ color: C.navy }} />}
                nameKey="credentials.downloads.rateCard.name"
                filenameKey="credentials.downloads.rateCard.filename"
                type="PDF"
              />
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default CredentialsCertifications
