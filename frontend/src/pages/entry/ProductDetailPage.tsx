import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link, useParams, Navigate } from "react-router-dom"
import { getProductById, getRelatedProducts } from "@/data/products"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Package,
  Settings,
  Lightbulb,
  Mail,
  Phone,
} from "lucide-react"

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()

  if (!productId) {
    return <Navigate to="/store" replace />
  }

  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)

  if (!product) {
    return <Navigate to="/store" replace />
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link to="/store" className="hover:text-blue-600">OnTime Store</Link>
              <span>/</span>
              <span className="text-slate-900">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link to="/store">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Store
                </Link>
              </Button>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product Image */}
              <div className="relative">
                <div className="sticky top-24">
                  <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {product.category === 'recent' && (
                    <Badge className="absolute left-4 top-4 bg-green-500 text-white">
                      New Arrival
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
                    {product.name}
                  </h1>
                  <p className="text-xl text-slate-600">
                    {product.shortDescription}
                  </p>
                </div>

                {product.price && (
                  <div className="mb-6 flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-blue-600">{product.price}</span>
                  </div>
                )}

                <div className="mb-8 flex flex-wrap gap-3">
                  <Button size="lg" className="flex-1 sm:flex-none" asChild>
                    <Link to="/contact">
                      <Mail className="mr-2 h-5 w-5" />
                      Request Quote
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 sm:flex-none" asChild>
                    <Link to="/contact">
                      <Phone className="mr-2 h-5 w-5" />
                      Contact Sales
                    </Link>
                  </Button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="mb-4 text-2xl font-bold text-slate-900">Product Description</h2>
                  <p className="leading-relaxed text-slate-700">
                    {product.fullDescription}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-2">
                <Settings className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Technical Specifications</h2>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3"
                      >
                        <div className="font-semibold text-slate-900">{key}</div>
                        <div className="text-slate-700 sm:col-span-2">{value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-slate-900">Applications & Use Cases</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {product.applications.map((application, index) => (
                  <Card key={index} className="border-2 transition-all hover:border-blue-300 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-900">{application}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="border-t bg-slate-50 py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-slate-900">Related Products</h2>
                <p className="text-lg text-slate-600">
                  You might also be interested in these products
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <RelatedProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Purchase?</h2>
            <p className="mb-8 text-xl text-blue-100">
              Contact our sales team for pricing, availability, and delivery information
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Request a Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/services">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Sales Team
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Related Product Card Component
interface RelatedProductCardProps {
  product: {
    id: string
    name: string
    shortDescription: string
    image: string
    price?: string
  }
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  return (
    <Link to={`/store/product/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-xl hover:border-blue-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.price && (
            <div className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-2 py-1 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-sm">
              {product.price}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-slate-600">
            {product.shortDescription}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="w-full group-hover:border-blue-600 group-hover:text-blue-600"
          >
            View Details
            <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
