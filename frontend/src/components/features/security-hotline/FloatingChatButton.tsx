"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  Phone,
  Mail,
  X,
  Send,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Contact information
  const whatsappNumber = "+2348000000000" // Replace with actual WhatsApp number
  const phoneNumber = "+2348000000000" // Replace with actual phone number
  const emailAddress = "support@ontimemaritime.com" // Replace with actual email

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I need assistance with a maritime issue.")
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
    setIsOpen(false)
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`
    setIsOpen(false)
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}?subject=Maritime Support Request`
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 group"
            aria-label="Open chat support"
          >
            {isOpen ? (
              <X className="h-7 w-7 text-white transition-transform group-hover:rotate-90" />
            ) : (
              <MessageCircle className="h-7 w-7 text-white animate-pulse" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0 mb-2 mr-2 shadow-2xl border-0 overflow-hidden"
          align="end"
          side="top"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Need Help?</h3>
                <p className="text-sm text-green-100">We're here to assist you</p>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="p-4 space-y-2 bg-white">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200 group border border-green-200"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-slate-900">Chat on WhatsApp</div>
                <div className="text-sm text-slate-600">Instant messaging support</div>
              </div>
            </button>

            {/* Phone */}
            <button
              onClick={handlePhoneClick}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group border border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-slate-900">Call Us</div>
                <div className="text-sm text-slate-600">{phoneNumber}</div>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group border border-purple-200"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-slate-900">Email Support</div>
                <div className="text-sm text-slate-600 truncate">{emailAddress}</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-4 py-3 border-t">
            <p className="text-xs text-center text-slate-600">
              Available 24/7 for urgent maritime issues
            </p>
          </div>
        </PopoverContent>
      </Popover>

      {/* Tooltip when closed */}
      {!isOpen && (
        <div className="absolute bottom-0 right-20 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg animate-bounce pointer-events-none">
          Need help? Chat with us!
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-900" />
        </div>
      )}
    </div>
  )
}
