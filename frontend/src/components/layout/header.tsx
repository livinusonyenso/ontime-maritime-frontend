import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
} from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Ontime Maritime Logo"
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden md:flex flex-col">
            <span className="font-bold text-lg leading-none">
              MARITIME
            </span>
            <span className="text-xs text-muted-foreground">
              Tech Meet Cargo
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>

          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>

          <Link to="/services">
            <Button variant="ghost">Services</Button>
          </Link>

          <Link to="/marketplace">
            <Button variant="ghost">Marketplace</Button>
          </Link>

          <Link to="/legal-hub">
            <Button variant="ghost">MarineTech Associate</Button>
          </Link>

          <Link to="/security-hotline">
            <Button variant="ghost">Security Hotline</Button>
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden md:block">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>

          <Link to="/register">
            <Button size="sm" className="hidden md:flex">Register</Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu - Slides from Right */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 sm:w-96 bg-background border-l shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b shrink-0">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/logo.png"
                alt="Ontime Maritime Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base leading-none">MARITIME</span>
                <span className="text-xs text-muted-foreground">Tech Meet Cargo</span>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Sidebar Navigation - Scrollable */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base h-12">
                  Home
                </Button>
              </Link>

              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base h-12">
                  About
                </Button>
              </Link>

              <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base h-12">
                  Services
                </Button>
              </Link>

              <Link to="/marketplace" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base h-12">
                  Marketplace
                </Button>
              </Link>

              <Link to="/legal-hub" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base h-12">
                  MarineTech Associate
                </Button>
              </Link>

              <Link to="/security-hotline" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-base h-12">
                  Security Hotline
                </Button>
              </Link>
            </div>
          </nav>

          {/* Sidebar Footer Actions */}
          <div className="p-4 border-t space-y-3 shrink-0 bg-background">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start text-base h-12">
                Login
              </Button>
            </Link>

            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-start text-base h-12">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
