"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

export function FloatingChatButton() {
  const { t } = useTranslation()
  // WhatsApp contact number
  const whatsappNumber = "2349034018849" // 0808984499 with Nigeria country code

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I need assistance with a maritime issue.")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        onClick={handleWhatsAppClick}
        className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 group relative"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white animate-pulse" />
      </Button>

      {/* Tooltip */}
      <div className="absolute bottom-0 right-20 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg animate-bounce pointer-events-none">
        {t("securityhotline.chatbuttontooltip")}
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-900" />
      </div>
    </div>
  )
}
