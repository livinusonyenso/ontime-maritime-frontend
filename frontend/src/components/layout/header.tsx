import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Ship,
} from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Ship className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none">
              ONTIME MARITIME
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t glass max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">

            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
            </Link>

            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                About
              </Button>
            </Link>

            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Services
              </Button>
            </Link>

            <Link to="/marketplace" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Marketplace
              </Button>
            </Link>

            <Link to="/legal-hub" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                MarineTech Associate
              </Button>
            </Link>

            <Link to="/security-hotline" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Security Hotline
              </Button>
            </Link>

            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Login
              </Button>
            </Link>

            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-start">
                Register
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
