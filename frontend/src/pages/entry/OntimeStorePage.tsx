import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { getProductsByCategory } from "@/data/products";
import { Zap } from "lucide-react";
import {
  ProductCarousel,
  ProductCard,
  StoreHero,
  StoreCTA,
} from "@/components/Ontime-store";

export default function OntimeStorePage() {
  const recentProducts = getProductsByCategory("recent");
  const popularProducts = getProductsByCategory("popular");
  const equipmentProducts = getProductsByCategory("equipment");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <StoreHero />

        {/* Recent Imported Products - Carousel */}
        <section id="recent-products" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <Badge
                className="mb-3 bg-green-500/10 text-green-500 border-green-500/30"
                variant="outline"
              >
                <Zap className="h-4 w-4 mr-2" />
                Recently Imported
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Arrivals
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Newly imported premium marine equipment now available for
                purchase
              </p>
            </div>

            <ProductCarousel products={recentProducts} />
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                High-quality products trusted across marine, industrial, energy,
                and consumer sectors
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
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Marine Equipment & Parts
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Complete range of equipment, parts, and accessories for maritime
                operations
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
        <StoreCTA />
      </main>

      <Footer />
    </div>
  );
}
