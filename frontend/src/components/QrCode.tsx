/**
 * QrCode — reusable QR code component
 *
 * Usage:
 *   import { QrCode } from "@/components/QrCode"
 *   <QrCode />                          // defaults
 *   <QrCode size={256} />               // custom size
 *   <QrCode logoSrc="/logo.png" />      // centre logo
 *
 * The QR encodes VITE_WEBSITE_URL (env var) with a fallback to
 * https://ontimemaritime.com so it is always production-safe.
 */

import { useRef, useState } from "react"
import QRCode from "react-qr-code"
import { toPng } from "html-to-image"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

const WEBSITE_URL =
  (import.meta as any).env?.VITE_WEBSITE_URL ?? "https://ontimemaritime.com"

interface QrCodeProps {
  /** QR code pixel size (default 200) */
  size?: number
  /** Optional centre-logo image URL */
  logoSrc?: string
  /** Logo size as fraction of QR size (default 0.22) */
  logoRatio?: number
}

export function QrCode({ size = 200, logoSrc, logoRatio = 0.22 }: QrCodeProps) {
  const qrRef  = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)
  const { t } = useTranslation()

  const logoSize = Math.round(size * logoRatio)

  async function handleDownload() {
    if (!qrRef.current) return
    setBusy(true)
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true, pixelRatio: 3 })
      const link    = document.createElement("a")
      link.download = "ontimemaritime-qr.png"
      link.href     = dataUrl
      link.click()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full max-w-xs mx-auto">
      {/* Title */}
      <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase text-center">
        {t("qrcode.title")}
      </p>

      {/* QR + optional logo overlay */}
      <div
        ref={qrRef}
        className="relative rounded-2xl bg-white p-4 shadow-md ring-1 ring-border"
        style={{ width: size + 32, height: size + 32 }}
      >
        <QRCode
          value={WEBSITE_URL}
          size={size}
          level="H"
          bgColor="#ffffff"
          fgColor="#0D1B2A"
          style={{ display: "block" }}
        />

        {logoSrc && (
          <img
            src={logoSrc}
            alt="Logo"
            width={logoSize}
            height={logoSize}
            className="absolute inset-0 m-auto rounded-md bg-white p-1 shadow-sm"
            style={{ width: logoSize, height: logoSize }}
          />
        )}
      </div>

      {/* URL hint */}
      <p className="text-xs text-muted-foreground truncate max-w-full px-2 text-center">
        {WEBSITE_URL}
      </p>

      {/* Download button */}
      <Button
        variant="outline"
        size="sm"
        className="gap-2 w-full"
        onClick={handleDownload}
        disabled={busy}
      >
        {busy
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : <Download className="h-4 w-4" />}
        {busy ? t("qrcode.Preparing") : t("qrcode.Downloadpng")}
      </Button>
    </div>
  )
}

export default QrCode
