import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function StoreCTA() {
  const whatsappNumber = "2348008984499"

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I'm interested in your maritime products and services. I'd like to discuss custom orders or bulk purchases.")
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <section className="relative bg-slate-950 text-white py-20">
      <div className="absolute inset-0 bg-[url('/bulk-cargo-ship.jpg')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
          Contact our team for custom orders, bulk purchases, or technical consultations
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={handleWhatsAppClick} className="gap-2">
            <MessageCircle className="h-5 w-5" />
            Contact Sales Team
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
