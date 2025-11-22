"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
    title: "Tech Meet Cargo",
    subtitle: "Revolutionary Maritime Platform",
    description: "Real-time tracking, automated documentation, and digital marketplaces for global shipping",
  },
  {
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80",
    title: "Track Every Shipment",
    subtitle: "Real-Time Visibility",
    description: "Monitor your cargo across oceans with GPS tracking and automated status updates",
  },
  {
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&q=80",
    title: "Digital Marketplace",
    subtitle: "Auctions & Insurance",
    description: "Bid on container slots and secure cargo insurance through our integrated platform",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl space-y-6 text-white">
              <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
                {slide.subtitle}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">{slide.title}</h1>
              <p className="text-xl text-slate-200 leading-relaxed text-pretty">{slide.description}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/tracking">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white hover:bg-white/10 text-white bg-transparent"
                  >
                    Track Shipment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
