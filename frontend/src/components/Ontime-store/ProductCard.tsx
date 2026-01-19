import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string
  name: string
  shortDescription: string
  price?: string
  images: string[]
  features: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/store/product/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-xl hover:border-primary/50 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.price && (
            <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-1 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur-sm">
              {product.price}
            </div>
          )}
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-3 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
            {product.shortDescription}
          </p>

          <Button
            className="w-full"
            variant="outline"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
