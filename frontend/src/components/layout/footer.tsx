import { Link, useNavigate } from "react-router-dom"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const navigate = useNavigate()

  const handleLinkClick = (path: string) => {
    navigate(path)
    // Smooth scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Company */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Ontime Maritime Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
              <div className="hidden md:flex flex-col">
                <span className="font-bold text-lg leading-none text-white">MARITIME</span>
                <span className="text-xs text-slate-400">Cargo Meet Tech</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Revolutionary maritime cargo platform connecting shippers, carriers, and logistics providers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/services')}
                  className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/tracking')}
                  className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full"
                >
                  Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/auctions')}
                  className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full"
                >
                  Auctions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/insurance')}
                  className="text-sm text-slate-400 hover:text-primary transition-colors text-left w-full"
                >
                  Insurance
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>123 Maritime Plaza, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@ontimemaritime.com" className="hover:text-primary transition-colors">
                  info@ontimemaritime.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+2341234567890" className="hover:text-primary transition-colors">
                  +2348102931387
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
        <div>
  <h3 className="font-semibold text-white mb-4">Follow Us</h3>
  <div className="flex gap-3 mb-6">
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-800 hover:bg-primary p-2 rounded-lg transition-colors"
    >
      <Facebook className="h-5 w-5" />
    </a>

    <a
      href="https://x.com/ontimemaritime"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-800 hover:bg-primary p-2 rounded-lg transition-colors"
    >
      <Twitter className="h-5 w-5" />
    </a>

    <a
      href="https://www.linkedin.com/in/ontime-maritime-b921a73a5/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-800 hover:bg-primary p-2 rounded-lg transition-colors"
    >
      <Linkedin className="h-5 w-5" />
    </a>

    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-800 hover:bg-primary p-2 rounded-lg transition-colors"
    >
      <Instagram className="h-5 w-5" />
    </a>
  </div>

  <p className="text-sm text-slate-400">
    Stay updated with the latest maritime technology innovations and cargo solutions.
  </p>
</div>

      
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2025 ONTIME RESOURCES LIMITED. All rights reserved.</p>
          <p className="text-sm font-semibold text-primary">Cargo Meet Tech</p>
        </div>
      </div>
    </footer>
  )
}
