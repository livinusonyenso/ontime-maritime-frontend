import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Ship,
  ChevronDown,
  FileText,
  Scale,
  Shield,
  Bot,
  Store,
  BookOpen,
  Anchor,
} from "lucide-react"
import { type Language, translate } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>("en")

  const languageLabels = {
    en: "EN",
    fr: "FR",
    cn: "中文",
  }

  const features = [
    {
      title: "Vessel Tracking",
      href: "/vessel-tracking",
      description: "Real-time vessel tracking via MarineTraffic & VesselFinder",
      icon: Ship,
    },
    {
      title: "e-BOL (Digital Bill of Lading)",
      href: "/e-bol",
      description: "Blockchain-verified e-BOL system. $50 per BOL",
      icon: FileText,
    },
    {
      title: "Legal & Compliance",
      href: "/legal-hub",
      description: "Maritime lawyers, templates & compliance consulting",
      icon: Scale,
    },
    {
      title: "Security Hotline",
      href: "/security-hotline",
      description: "Report fraud, piracy & maritime crimes",
      icon: Shield,
    },
    {
      title: "AI Arbitration",
      href: "/arbitration",
      description: "Grok 4.1 powered dispute resolution",
      icon: Bot,
    },
    {
      title: "Marketplace",
      href: "/marketplace",
      description: "Equipment, warehouses & maritime services",
      icon: Store,
    },
    {
      title: "Knowledge Center",
      href: "/knowledge",
      description: "Guides, training & IMO resources",
      icon: BookOpen,
    },
  ]

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Ship className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none">ONTIME MARITIME</span>
            <span className="text-xs text-muted-foreground">Tech Meet Cargo</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost">{translate("nav.home", language)}</Button>
          </Link>

          {/* Features Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Platform
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white text-black dark:bg-slate-950 dark:text-white">
                  <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    {features.map((feature) => (
                      <li key={feature.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                          >
                            <div className="flex items-center gap-2">
                              <feature.icon className="h-4 w-4 text-primary" />
                              <div className="text-sm font-medium leading-none text-foreground">
                                {feature.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/about">
            <Button variant="ghost">{translate("nav.about", language)}</Button>
          </Link>
          <Link to="/services">
            <Button variant="ghost">{translate("nav.services", language)}</Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="ghost">Marketplace</Button>
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
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t glass max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                {translate("nav.home", language)}
              </Button>
            </Link>

            {/* Platform Features */}
            <div className="border-t pt-2 mt-2">
              <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
                PLATFORM FEATURES
              </div>
              {features.map((feature) => (
                <Link
                  key={feature.href}
                  to={feature.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <feature.icon className="h-4 w-4" />
                    {feature.title}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="border-t pt-2 mt-2">
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
            </div>

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
