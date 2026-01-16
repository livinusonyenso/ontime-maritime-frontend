import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

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
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base md:text-lg leading-none">
                  MARITIME
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground">
                  Tech Meet Cargo
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center/Right */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/">
                <Button variant="ghost" size="sm">Home</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="sm">About</Button>
              </Link>
              <Link to="/services">
                <Button variant="ghost" size="sm">Services</Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="ghost" size="sm">Marketplace</Button>
              </Link>
              <Link to="/store">
                <Button variant="ghost" size="sm">OnTime Store</Button>
              </Link>
              <Link to="/legal-hub">
                <Button variant="ghost" size="sm">MarineTech Solicitors</Button>
              </Link>
              <Link to="/security-hotline">
                <Button variant="ghost" size="sm">Security Hotline</Button>
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Desktop auth buttons */}
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button size="sm">Register</Button>
              </Link>

              {/* Mobile Menu Toggle - ALWAYS visible on mobile/tablet */}
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                onClick={toggleMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">
                  {mobileMenuOpen ? "Close menu" : "Open menu"}
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
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">MARITIME</span>
                <span className="text-[10px] text-muted-foreground">Tech Meet Cargo</span>
              </div>
            </Link>
            
            {/* Close button */}
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/marketplace", label: "Marketplace" },
                { to: "/store", label: "OnTime Store" },
                { to: "/legal-hub", label: "MarineTech Solicitors" },
                { to: "/security-hotline", label: "Security Hotline" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center w-full px-4 py-3 text-base font-medium rounded-lg hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t space-y-3">
            <Link to="/login" onClick={closeMenu} className="block">
              <Button 
                variant="outline" 
                className="w-full h-12 text-base font-semibold"
              >
                Login
              </Button>
            </Link>
            <Link to="/register" onClick={closeMenu} className="block">
              <Button 
                className="w-full h-12 text-base font-semibold"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}