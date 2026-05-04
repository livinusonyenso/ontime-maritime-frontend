import { useState, useEffect, useCallback } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/auth-context"

import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const isAuthenticated = Boolean(user)
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dashboardPath =
    user?.role === "seller" ? "/dashboard/seller"
    : user?.role === "organization" ? "/dashboard/organization"
    : user?.role === "executive" ? "/dashboard/executive"
    : user?.role === "admin" ? "/admin"
    : "/dashboard/buyer"

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/login")
    closeMenu()
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [mobileMenuOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen, closeMenu])

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">

            {/* Logo - Left side */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/logo.png"
                alt="Ontime Maritime Logo"
                className="h-16 sm:h-20 w-auto object-contain brightness-105 contrast-105 drop-shadow-md antialiased"
               
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base md:text-lg leading-none">
                  {t("nav.brand")}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground">
                  {t("nav.tagline")}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center/Right */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { to: "/", label: t("nav.home"), end: true },
                { to: "/about", label: t("nav.about") },
                { to: "/services", label: t("nav.services") },
                { to: "/marketplace", label: t("nav.marketplace") },
                { to: "/legal-hub", label: t("nav.legalHub") },
                { to: "/security-hotline", label: t("nav.securityHotline") },
              ].map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end}>
                  {({ isActive }) => (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={isActive ? "underline underline-offset-4 decoration-2" : ""}
                    >
                      {item.label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Language Switcher */}
              {/* <LanguageSwitcher /> */}

              {/* Desktop auth buttons */}
              {isAuthenticated ? (
                <>
                  <Link to={dashboardPath} className="hidden md:block">
                    <Button variant="ghost" size="sm">{t("nav.dashboard") || "Dashboard"}</Button>
                  </Link>
                  <button type="button" onClick={handleLogout} className="hidden md:block">
                    <Button variant="outline" size="sm">{t("nav.logout") || "Logout"}</Button>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hidden md:block">
                    <Button variant="ghost" size="sm">{t("nav.login")}</Button>
                  </Link>
                  <Link to="/register" className="hidden md:block">
                    <Button size="sm">{t("nav.register")}</Button>
                  </Link>
                </>
              )}

              {/* Mobile Menu Toggle - ALWAYS visible on mobile/tablet */}
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                onClick={toggleMenu}
                aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">
                  {mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
                </span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-xs bg-background shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">

          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={closeMenu}
            >
              <img
                src="/logo.png"
                alt="Ontime Maritime"
                className="h-14 w-auto object-contain brightness-110 drop-shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">{t("nav.brand")}</span>
                <span className="text-[10px] text-muted-foreground">{t("nav.tagline")}</span>
              </div>
            </Link>

            {/* Close button */}
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              onClick={closeMenu}
              aria-label={t("nav.closeMenu")}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/about", label: t("nav.about") },
                { to: "/services", label: t("nav.services") },
                { to: "/marketplace", label: t("nav.marketplace") },
                { to: "/legal-hub", label: t("nav.legalHub") },
                { to: "/security-hotline", label: t("nav.securityHotline") },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center w-full px-4 py-3 text-base font-medium rounded-lg hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all${isActive ? " underline underline-offset-4 decoration-2" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Language switcher in mobile sidebar */}
            {/* <div className="mt-4 px-2">
              <p className="text-xs text-muted-foreground px-2 mb-2 uppercase tracking-wider">Language</p>
              <LanguageSwitcher />
            </div> */}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t space-y-3">
            {isAuthenticated ? (
              <>
                <Link to={dashboardPath} onClick={closeMenu} className="block">
                  <Button className="w-full h-12 text-base font-semibold">
                    {t("nav.dashboard") || "Dashboard"}
                  </Button>
                </Link>
                <button type="button" onClick={handleLogout} className="block w-full">
                  <Button variant="outline" className="w-full h-12 text-base font-semibold">
                    {t("nav.logout") || "Logout"}
                  </Button>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block">
                  <Button variant="outline" className="w-full h-12 text-base font-semibold">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu} className="block">
                  <Button className="w-full h-12 text-base font-semibold">
                    {t("nav.register")}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
