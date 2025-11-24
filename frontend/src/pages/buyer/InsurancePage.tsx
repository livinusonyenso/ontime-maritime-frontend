import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Star, TrendingUp, Clock } from "lucide-react"

const insuranceProviders = [
  {
    id: "1",
    name: "Global Marine Insurance",
    rating: 4.8,
    reviews: 1250,
    coverage: "Up to $5M",
    premium: "$2,500",
    features: ["Worldwide coverage", "24/7 claims support", "Fast payouts", "No hidden fees"],
  },
  {
    id: "2",
    name: "Oceanic Shield Insurance",
    rating: 4.6,
    reviews: 980,
    coverage: "Up to $10M",
    premium: "$3,200",
    features: ["Premium coverage", "Dedicated account manager", "Weather protection", "Legal support"],
  },
  {
    id: "3",
    name: "Maritime Protection Co.",
    rating: 4.7,
    reviews: 1100,
    coverage: "Up to $3M",
    premium: "$1,800",
    features: ["Affordable rates", "Quick approval", "Online claims", "Multi-shipment discount"],
  },
  {
    id: "4",
    name: "International Cargo Guard",
    rating: 4.9,
    reviews: 1500,
    coverage: "Unlimited",
    premium: "$4,500",
    features: ["Unlimited coverage", "White-glove service", "Risk assessment", "Custom policies"],
  },
]

export default function InsurancePage() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-[url(/cargo-ship-at-sea.jpg)] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
                Insurance Marketplace
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Cargo Insurance Made Simple</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Compare quotes from top insurance providers and protect your cargo with comprehensive coverage
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">20+</p>
                <p className="text-sm text-muted-foreground">Insurance Providers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-secondary">$500M+</p>
                <p className="text-sm text-muted-foreground">Coverage Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">3,500+</p>
                <p className="text-sm text-muted-foreground">Policies Issued</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24hr</p>
                <p className="text-sm text-muted-foreground">Fast Approval</p>
              </div>
            </div>
          </div>
        </section>

        {/* Providers Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare Insurance Providers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Get instant quotes and choose the best coverage for your cargo
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {insuranceProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className={`glass border-2 transition-all ${
                    selectedProvider === provider.id ? "border-primary shadow-lg" : "hover:border-primary/50"
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{provider.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(provider.rating) ? "fill-accent text-accent" : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {provider.rating} ({provider.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <Shield className="h-10 w-10 text-primary" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Coverage Limit</p>
                        <p className="text-lg font-bold text-primary">{provider.coverage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Annual Premium</p>
                        <p className="text-lg font-bold text-secondary">{provider.premium}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Key Features:</p>
                      <ul className="space-y-2">
                        {provider.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedProvider(provider.id)}
                      >
                        View Details
                      </Button>
                      <Button className="flex-1 bg-accent hover:bg-accent/90">Get Quote</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Insurance */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why You Need Cargo Insurance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Protect your business from unforeseen risks and losses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Comprehensive Protection</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Coverage against theft, damage, natural disasters, and more during transit
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Clock className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg">Fast Claims Process</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Quick assessment and payout to minimize business disruption
                  </p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">Peace of Mind</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focus on growing your business while we protect your cargo
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Protect Your Cargo?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Get instant quotes from multiple providers in seconds
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
              Get Insurance Quotes Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
