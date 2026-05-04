import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function StoreHero() {
  return (
    <section className="relative bg-slate-950 text-white py-20">
      <div className="absolute inset-0 bg-[url('/bulk-cargo-ship.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
            Premium Marine Equipment
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-balance">
            OnTime Store
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed text-pretty">
            Imported Marine Equipment & Parts - Quality Products for Maritime Operations
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#recent-products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
              <Link to="/contact">Request Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
