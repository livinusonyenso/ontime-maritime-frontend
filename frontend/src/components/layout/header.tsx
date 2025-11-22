
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, Ship, ChevronDown } from "lucide-react"
import { type Language, translate } from "@/lib/i18n"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const languageLabels = {
    en: "EN",
    fr: "FR",
    cn: "中文",
  }

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Ship className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none">ONTIME</span>
            <span className="text-xs text-muted-foreground">Tech Meet Cargo</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost">{translate("nav.home", language)}</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">{translate("nav.about", language)}</Button>
          </Link>
          <Link to="/services">
            <Button variant="ghost">{translate("nav.services", language)}</Button>
          </Link>
          <Link to="/tracking">
            <Button variant="ghost">{translate("nav.tracking", language)}</Button>
          </Link>
          <Link to="/auctions">
            <Button variant="ghost">{translate("nav.auctions", language)}</Button>
          </Link>
          <Link to="/insurance">
            <Button variant="ghost">{translate("nav.insurance", language)}</Button>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                {languageLabels[language]} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("fr")}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("cn")}>中文</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/login" className="hidden md:block">
            <Button variant="ghost" size="sm">
              {translate("nav.login", language)}
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="hidden md:flex">
              {translate("nav.register", language)}
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t glass">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.home", language)}
              </Button>
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.about", language)}
              </Button>
            </Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.services", language)}
              </Button>
            </Link>
            <Link to="/tracking" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.tracking", language)}
              </Button>
            </Link>
            <Link to="/auctions" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.auctions", language)}
              </Button>
            </Link>
            <Link to="/insurance" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.insurance", language)}
              </Button>
            </Link>
            <div className="border-t pt-2 mt-2 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  {translate("nav.login", language)}
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">{translate("nav.register", language)}</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
