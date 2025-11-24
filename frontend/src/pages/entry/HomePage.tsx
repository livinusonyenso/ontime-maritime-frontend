import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import {
  Ship,
  FileText,
  Gavel,
  Shield,
  BarChart3,
  Globe,
  Lock,
  Zap,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Features Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Maritime Solutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Everything you need to manage your cargo operations efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass border-2 hover:border-primary/50 transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80"
                    alt="Real-time tracking"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-primary/10 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center">
                    <Ship className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg">Real-Time Tracking</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Monitor your shipments in real-time with GPS tracking and automated status updates
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-primary/50 transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554224311-beee415c201f?w=600&q=80"
                    alt="Digital documents"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-secondary/10 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg">Digital Documents</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Manage bills of lading, invoices, and charterparty agreements digitally
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-primary/50 transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80"
                    alt="Cargo auctions"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-accent/10 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center">
                    <Gavel className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg">Cargo Auctions</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bid on container slots and charter vessels through our digital marketplace
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-primary/50 transition-all overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
                    alt="Analytics"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-primary/10 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold text-lg">Analytics & Insights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Make data-driven decisions with comprehensive shipping analytics
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Every Maritime Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Tailored solutions for freight forwarders, shipping companies, and import/export businesses
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="glass overflow-hidden group hover:shadow-2xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                    alt="Freight forwarders"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-20 relative z-10">
                  <div className="bg-primary/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Ship className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Freight Forwarders</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Streamline operations with automated documentation, real-time tracking, and integrated payment
                    processing.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Multi-shipment management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Client portal access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated invoicing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden group hover:shadow-2xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                    alt="Shipping companies"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-20 relative z-10">
                  <div className="bg-secondary/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">Shipping Companies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Optimize vessel utilization with our auction marketplace and manage charterparty agreements
                    digitally.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Fleet management dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Digital charterparty contracts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Capacity optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden group hover:shadow-2xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661963559074-9655a9404f1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW1wb3J0JTIwYW5kJTIwZXhwb3J0fGVufDB8fDB8fHww"
                    alt="Import/Export"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-20 relative z-10">
                  <div className="bg-accent/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Import/Export</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Simplify international trade with end-to-end visibility, automated customs, and integrated
                    insurance.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Customs clearance tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Cargo insurance quotes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compliance management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Integrations */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Industry-Leading Integrations</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Seamlessly connected to the world's top maritime and logistics platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">MarineTraffic</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Real-time vessel tracking with global AIS data coverage
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-xl">Alibaba Trade</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Direct integration with global B2B marketplace
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl">Paystack</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Secure payment processing for all transactions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
              alt="Maritime operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/85" />
          </div>
          <div className="relative container mx-auto px-4 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Ontime Maritime</h2>
              <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                The most comprehensive and secure maritime platform in the industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="glass border-slate-700 p-6 rounded-xl space-y-3 backdrop-blur-lg">
                <Lock className="h-10 w-10 text-primary" />
                <h3 className="font-semibold text-xl">Bank-Level Security</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  256-bit encryption and blockchain verification for all transactions and documents
                </p>
              </div>

              <div className="glass border-slate-700 p-6 rounded-xl space-y-3 backdrop-blur-lg">
                <Clock className="h-10 w-10 text-secondary" />
                <h3 className="font-semibold text-xl">24/7 Reliability</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  99.9% uptime guarantee with round-the-clock technical support
                </p>
              </div>

              <div className="glass border-slate-700 p-6 rounded-xl space-y-3 backdrop-blur-lg">
                <Globe className="h-10 w-10 text-accent" />
                <h3 className="font-semibold text-xl">Global Reach</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Operating in 150+ countries with multilingual support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                See what our clients say about our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                    alt="John Smith"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-12 relative z-10">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "Ontime Maritime has revolutionized how we manage our global shipments. The real-time tracking saves
                    us countless hours."
                  </p>
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-sm text-muted-foreground">CEO, Global Freight Ltd</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                    alt="Maria Chen"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-12 relative z-10">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "The auction marketplace helped us optimize our vessel capacity by 40%. Outstanding platform with
                    excellent support."
                  </p>
                  <div>
                    <p className="font-semibold">Maria Chen</p>
                    <p className="text-sm text-muted-foreground">Director, Pacific Shipping Co</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
                    alt="Ahmed Okonkwo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-12 relative z-10">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    "Best maritime platform we've used. The analytics dashboard gives us insights we never had before.
                    Highly recommended!"
                  </p>
                  <div>
                    <p className="font-semibold">Ahmed Okonkwo</p>
                    <p className="text-sm text-muted-foreground">Manager, Lagos Trade Hub</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to Transform Your Maritime Operations?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Join thousands of companies already using Ontime Maritime
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
