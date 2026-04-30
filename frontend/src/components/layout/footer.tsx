import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Mail, Phone, MapPin } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

export function Footer() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const handleLinkClick = (path: string) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* About Company */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Ontime Maritime Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
              <div className="hidden md:flex flex-col">
                <span className="font-bold text-lg leading-none text-white">{t("footer.brand")}</span>
                <span className="text-xs text-slate-400">{t("footer.tagline")}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t("footer.about")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-white mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleLinkClick('/about')} className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full">
                  {t("footer.links.aboutUs")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services')} className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full">
                  {t("footer.links.services")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/tracking')} className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full">
                  {t("footer.links.tracking")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/auctions')} className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full">
                  {t("footer.links.auctions")}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/insurance')} className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full">
                  {t("footer.links.insurance")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-white mb-4">{t("footer.contactUs")}</h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">

              {/* Lagos */}
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-white font-medium text-xs mb-0.5">Lagos</p>
                  <p>Adebola House, Suite 100</p>
                  <p>38 Opebi Road, Lagos</p>
                </div>
              </div>

              {/* London */}
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-white font-medium text-xs mb-0.5">London</p>
                  <p>2 South Molton Street, W1K</p>
                  <p>Mayfair, London</p>
                </div>
              </div>

              {/* Port Harcourt */}
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-white font-medium text-xs mb-0.5">Port Harcourt</p>
                  <p>Port Harcourt, Rivers State</p>
                </div>
              </div>

              {/* Enugu */}
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-white font-medium text-xs mb-0.5">Enugu</p>
                  <p>39 Umuoji Street</p>
                  <p>Independence Layout, Enugu</p>
                </div>
              </div>

            </div>

            {/* Email & Phone */}
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@ontimemaritime.com" className="hover:text-primary transition-colors">
                  info@ontimemaritime.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+2349034018849" className="hover:text-primary transition-colors">
                  +234 903 401 8849
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-white mb-4">{t("footer.followUs")}</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.instagram.com/ontime_maritime?utm_source=qr&igsh=MTQ2bHhsOHYxNmJrbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-primary p-2 rounded-lg transition-colors"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@ontime.maritime?_r=1&_t=ZS-95wgIG5J5BI"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-primary p-2 rounded-lg transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-slate-400">
              {t("footer.socialTagline")}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-semibold text-primary">{t("footer.tagline")}</p>
          <p className="text-sm text-slate-400">{t("footer.copyright", { year })}</p>
        </div>
      </div>
    </footer>
  )
}
