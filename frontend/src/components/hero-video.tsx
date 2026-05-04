import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function HeroVideo() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const slides = [
    {
      title: t("hero.slide1.title"),
      subtitle: t("hero.slide1.subtitle"),
      description: t("hero.slide1.description"),
    },
    {
      title: t("hero.slide2.title"),
      subtitle: t("hero.slide2.subtitle"),
      description: t("hero.slide2.description"),
    },
    {
      title: t("hero.slide3.title"),
      subtitle: t("hero.slide3.subtitle"),
      description: t("hero.slide3.description"),
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
      video.play().catch((error) => {
        console.log("Video autoplay prevented:", error)
      })
    }

    video.addEventListener("canplay", handleCanPlay)
    return () => video.removeEventListener("canplay", handleCanPlay)
  }, [])

  const currentContent = slides[currentSlide]

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-slate-950">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-3xl space-y-6 text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Badge
            className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm animate-in fade-in slide-in-from-left-4 duration-700"
            variant="outline"
          >
            {currentContent.subtitle}
          </Badge>

          <h1
            key={currentSlide}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight animate-in fade-in slide-in-from-left-8 duration-1000"
          >
            {currentContent.title}
          </h1>

          <p
            key={`desc-${currentSlide}`}
            className="text-lg sm:text-xl md:text-2xl text-slate-100 leading-relaxed text-pretty max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000 delay-150"
          >
            {currentContent.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {t("hero.getStarted")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/tracking">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 hover:bg-white/10 text-white bg-white/5 backdrop-blur-sm hover:border-white transition-all duration-300 hover:scale-105"
              >
                {t("hero.trackShipment")}
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-slate-300 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>{t("hero.uptime")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>{t("hero.countries")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span>{t("hero.support")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "bg-white w-12 shadow-lg"
                : "bg-white/40 w-8 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="text-xs uppercase tracking-wider">{t("hero.scroll")}</span>
        <div className="w-px h-12 bg-linear-to-b from-white/60 to-transparent" />
      </div>
    </section>
  )
}
