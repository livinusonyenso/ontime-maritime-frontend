import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { products, getProductsByCategory } from "@/data/products"
import { ArrowRight, Package, Zap } from "lucide-react"

export default function OntimeStorePage() {
  const recentProducts = getProductsByCategory('recent')
  const popularProducts = getProductsByCategory('popular')
  const equipmentProducts = getProductsByCategory('equipment')

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-20 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1600&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                <Package className="h-4 w-4" />
                <span>Premium Marine Equipment</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                OnTime Store
              </h1>
              <p className="mb-8 text-xl text-blue-100">
                Imported Marine Equipment & Parts - Quality Products for Maritime Operations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <a href="#recent-products">
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Imported Products */}
        <section id="recent-products" className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                <Zap className="h-4 w-4" />
                <span>Recently Imported</span>
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Latest Arrivals
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Newly imported premium marine equipment now available for purchase
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {recentProducts.map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          </div>
        </section>

        {/* Other Products */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Popular Products
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                High-quality marine equipment trusted by professionals worldwide
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Equipment & Parts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Marine Equipment & Parts
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Complete range of equipment, parts, and accessories for maritime operations
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {equipmentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Need a Custom Solution?</h2>
            <p className="mb-8 text-xl text-blue-100">
              Contact our team for custom orders, bulk purchases, or technical consultations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Contact Sales Team</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Product Card Component
interface ProductCardProps {
  product: {
    id: string
    name: string
    shortDescription: string
    price?: string
    image: string
    features: string[]
  }
  featured?: boolean
}

function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <Link to={`/store/product/${product.id}`}>
      <Card className={`group overflow-hidden transition-all hover:shadow-xl ${
        featured ? 'border-2 border-blue-200 shadow-lg' : 'hover:border-blue-300'
      }`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {featured && (
            <div className="absolute left-4 top-4 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
              New Arrival
            </div>
          )}
          {product.price && (
            <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-1 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur-sm">
              {product.price}
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className={`mb-3 font-bold text-slate-900 transition-colors group-hover:text-blue-600 ${
            featured ? 'text-xl' : 'text-lg'
          }`}>
            {product.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-slate-600">
            {product.shortDescription}
          </p>

          {/* Key Features */}
          {featured && (
            <ul className="mb-4 space-y-1 text-sm text-slate-600">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <Button
            className="w-full group-hover:bg-blue-600"
            variant={featured ? "default" : "outline"}
          >
            View Product Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
