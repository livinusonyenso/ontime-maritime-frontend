import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: string
  name: string
  shortDescription: string
  price?: string
  image: string
  features: string[]
}

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const slides = [
    products[products.length - 1],
    ...products,
    products[0],
  ]

  const [index, setIndex] = useState(1)
  const [transition, setTransition] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const slideWidth = 100

  const startAutoPlay = () => {
    stopAutoPlay()
    intervalRef.current = setInterval(() => {
      next()
    }, 5000)
  }

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startAutoPlay()
    return stopAutoPlay
  }, [])

  const next = () => {
    setIndex((prev) => prev + 1)
  }

  const prev = () => {
    setIndex((prev) => prev - 1)
  }

  const handleTransitionEnd = () => {
    if (index === slides.length - 1) {
      setTransition(false)
      setIndex(1)
    }
    if (index === 0) {
      setTransition(false)
      setIndex(slides.length - 2)
    }
  }

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true))
    }
  }, [transition])

  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Arrows OUTSIDE */}
      <button
        onClick={prev}
        className="
          absolute -left-16 top-1/2 z-10 -translate-y-1/2
          rounded-full bg-white p-3 shadow-md
          transition hover:scale-110 hover:shadow-lg
        "
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={next}
        className="
          absolute -right-16 top-1/2 z-10 -translate-y-1/2
          rounded-full bg-white p-3 shadow-md
          transition hover:scale-110 hover:shadow-lg
        "
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Carousel */}
      <div
        className="overflow-hidden rounded-3xl"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(-${index * slideWidth}%)`,
            transition: transition ? "transform 500ms ease-out" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((product, i) => (
            <div key={`${product.id}-${i}`} className="min-w-full px-3">
              <Link to={`/store/product/${product.id}`}>
                <Card
                  className="
                    h-[560px] md:h-[420px]
                    overflow-hidden rounded-3xl
                    border border-slate-200/60
                    bg-white
                    shadow-sm
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  <div className="grid h-full md:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-full bg-slate-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="
                          absolute inset-0 h-full w-full
                          object-cover transition-transform
                          duration-500 hover:scale-105
                        "
                      />

                      <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white">
                        New
                      </span>

                      {product.price && (
                        <span className="absolute bottom-4 right-4 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold backdrop-blur">
                          {product.price}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="flex h-full flex-col p-8">
                      <h3 className="mb-3 line-clamp-2 text-2xl font-bold md:text-3xl">
                        {product.name}
                      </h3>

                      <p className="mb-5 line-clamp-3 text-slate-600">
                        {product.shortDescription}
                      </p>

                      <ul className="mb-6 space-y-2">
                        {product.features.slice(0, 4).map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm text-slate-700">
                            <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                            <span className="line-clamp-1">{f}</span>
                          </li>
                        ))}
                      </ul>

                      <Button className="mt-auto w-full md:w-auto rounded-xl">
                        View Product
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
