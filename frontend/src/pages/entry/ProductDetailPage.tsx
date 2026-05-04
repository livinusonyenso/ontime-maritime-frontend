import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams, Navigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "@/data/products";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Package,
  Settings,
  Lightbulb,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!productId) return <Navigate to="/store" replace />;

  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId);

  if (!product) return <Navigate to="/store" replace />;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link to="/store" className="hover:text-blue-600">
                OnTime Store
              </Link>
              <span>/</span>
              <span className="text-slate-900">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/store">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Store
              </Link>
            </Button>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative">
                <div className="sticky top-24">
                  {/* Main Image */}
                  <div className="relative rounded-3xl border border-slate-200 bg-white shadow-lg">
                    <img
                      src={product.images[selectedImageIndex]}
                      alt={product.name}
                      className="h-[420px] w-full object-contain p-6 transition-transform duration-300 hover:scale-[1.02]"
                    />

                    {product.category === "recent" && (
                      <Badge className="absolute right-4 top-4 bg-emerald-600 text-white shadow">
                        New Arrival
                      </Badge>
                    )}

                    {/* Navigation Arrows (only show if multiple images) */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === 0 ? product.images.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white transition"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5 text-slate-700" />
                        </button>
                        <button
                          onClick={() =>
                            setSelectedImageIndex((prev) =>
                              prev === product.images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md hover:bg-white transition"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5 text-slate-700" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery (only show if multiple images) */}
                  {product.images.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={cn(
                            "flex-shrink-0 rounded-xl border-2 bg-white p-1 transition",
                            selectedImageIndex === index
                              ? "border-blue-600 shadow-md"
                              : "border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <img
                            src={image}
                            alt={`${product.name} - View ${index + 1}`}
                            className="h-16 w-16 object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="mb-4 text-4xl font-bold text-slate-900">
                  {product.name}
                </h1>
                <p className="mb-6 text-xl text-slate-600">
                  {product.shortDescription}
                </p>

                {product.price && (
                  <div className="mb-6 text-3xl font-bold text-blue-600">
                    {product.price}
                  </div>
                )}

                <div className="mb-8 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={() => {
                      window.location.href = `mailto:ontimemaritime@gmail.com?subject=Request%20for%20Quote%20-%20${encodeURIComponent(product.name)}&body=Hello%20OnTime%20Maritime%2C%0A%0AI%20would%20like%20to%20request%20a%20quote%20for%3A%0A%0AProduct%3A%20${encodeURIComponent(product.name)}%0A%0AThank%20you.`;
                    }}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Request Quote
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      window.location.href = "tel:+2348089844699";
                    }}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Sales
                  </Button>
                </div>

                {/* Description */}
                <h2 className="mb-3 text-2xl font-bold">Product Description</h2>
                <p className="mb-8 text-slate-700 leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Features */}
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                  <CheckCircle2 className="text-green-600" />
                  Key Features
                </h2>

                <div className="grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-3 rounded-xl bg-slate-50 p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specs */}
        <section className="bg-slate-50 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <Settings className="text-blue-600" />
              Technical Specifications
            </h2>

            <Card>
              <CardContent className="divide-y p-0">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="grid p-4 sm:grid-cols-3 gap-4">
                    <div className="font-semibold">{k}</div>
                    <div className="sm:col-span-2 text-slate-700">{v}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Applications */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <Lightbulb className="text-yellow-600" />
              Applications & Use Cases
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {product.applications.map((app, i) => (
                <Card key={i} className="hover:shadow-md transition">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <Package className="text-blue-600" />
                    </div>
                    <span className="font-medium">{app}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="bg-slate-50 border-t py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-3xl font-bold">
                Related Products
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map((p) => (
                  <RelatedProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

interface RelatedProductCardProps {
  product: {
    id: string;
    name: string;
    shortDescription: string;
    images: string[];
    price?: string;
  };
}

function RelatedProductCard({ product }: RelatedProductCardProps) {
  return (
    <Link to={`/store/product/${product.id}`}>
      <Card className="group rounded-2xl border bg-white hover:-translate-y-1 hover:shadow-xl transition">
        <div className="h-[200px] bg-slate-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain p-4 group-hover:scale-105 transition"
          />
        </div>

        <CardContent className="flex h-[190px] flex-col p-4">
          <h3 className="mb-2 font-bold group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="mb-4 text-sm text-slate-600 line-clamp-2">
            {product.shortDescription}
          </p>

          <Button size="sm" variant="outline" className="mt-auto w-full">
            View Details
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
