import { QrCode } from "@/components/QrCode"
import { Header } from "@/components/layout/header"
import { ShippingActivityTicker } from "@/components/dashboard/ShippingActivityTicker"
import { Footer } from "@/components/layout/footer"
import { HeroVideo } from "@/components/hero-video"
import { FloatingChatButton } from "@/components/features/security-hotline/FloatingChatButton"
import { SectionHeader } from "@/components/section-header"
import { FeatureCard } from "@/components/feature-card"
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
  Scale,
  Bot,
  Store,
  BookOpen,
  Siren,
} from "lucide-react"

const platformModules = [
  {
    title: "Vessel Tracking",
    description: "Real-time vessel tracking via MarineTraffic & VesselFinder AIS data",
    href: "/vessel-tracking",
    icon: Ship,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Digital Bill of Lading",
    description: "Blockchain-verified e-BOL system with automatic validation. $50 per BOL",
    href: "/e-bol",
    icon: FileText,
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Legal & Compliance Hub",
    description: "Access verified maritime lawyers, templates, and compliance consulting",
    href: "/legal-hub",
    icon: Scale,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Security Hotline",
    description: "Report fraud, piracy, missing shipments, and maritime crimes",
    href: "/security-hotline",
    icon: Siren,
    color: "bg-red-500/10 text-red-600",
  },
 {
  title: "Marine Arbitration",
  description: "Dispute resolution for shipping contracts, charterparty agreements, and cargo claims",
  href: "/arbitration",
  icon: Bot,
  color: "bg-indigo-500/10 text-indigo-600",
},
  {
    title: "Equipment Marketplace",
    description: "Buy/sell containers, cranes, warehouses, spare parts & insurance",
    href: "/marketplace",
    icon: Store,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "OnTime Store",
    description: "Imported marine equipment, generators, radar systems & hydraulic parts",
    href: "/store",
    icon: Store,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Knowledge Center",
    description: "PDF guides, training materials, IMO standards & customs resources",
    href: "/knowledge",
    icon: BookOpen,
    color: "bg-teal-500/10 text-teal-600",
  },
]

const features = [
  {
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
    icon: Ship,
    title: "Real-Time Tracking",
    description: "Monitor your shipments in real-time with GPS tracking and automated status updates",
    iconColor: "bg-primary/10 text-primary",
  },
  {
    image: "https://images.unsplash.com/photo-1621009063622-4467e453c3c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhYmxldCUyRmxhcHRvcCUyMHNob3dpbmclMjBkb2N1bWVudHN8ZW58MHx8MHx8fDA%3D?w=600&q=80",
    icon: FileText,
    title: "Digital Documents",
    description: "Manage bills of lading, invoices, and charterparty agreements digitally",
    iconColor: "bg-secondary/10 text-secondary",
  },
  {
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
    icon: Gavel,
    title: "Cargo Auctions",
    description: "Bid on container slots and charter vessels through our digital marketplace",
    iconColor: "bg-accent/10 text-accent",
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Make data-driven decisions with comprehensive shipping analytics",
    iconColor: "bg-primary/10 text-primary",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ShippingActivityTicker />
      <Header />

      <main className="flex-1">
        {/* Hero Section with Video Background */}
        <HeroVideo />

        {/* Features Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Comprehensive Maritime Solutions"
              description="Everything you need to manage your cargo operations efficiently"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Platform Modules */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Complete Maritime Platform"
              description="Seven integrated modules covering every aspect of maritime operations"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {platformModules.map((module) => (
                <Link key={module.href} to={module.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer group border-2 hover:border-primary/30">
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${module.color} transition-transform group-hover:scale-110 duration-300`}>
                        <module.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Built for Every Maritime Need"
              description="Tailored solutions for freight forwarders, shipping companies, and import/export businesses"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="glass overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                    alt="Freight forwarders"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-20 relative z-10">
                  <div className="bg-primary/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Ship className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Freight Forwarders</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Streamline operations with automated documentation, real-time tracking, and integrated payment
                    processing.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">Multi-shipment management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">Client portal access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">Automated invoicing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-secondary/30">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                    alt="Shipping companies"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-20 relative z-10">
                  <div className="bg-secondary/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">Shipping Companies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Optimize vessel utilization with our auction marketplace and manage charterparty agreements
                    digitally.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <span className="text-sm">Fleet management dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <span className="text-sm">Digital charterparty contracts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                      <span className="text-sm">Capacity optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-accent/30">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661963559074-9655a9404f1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW1wb3J0JTIwYW5kJTIwZXhwb3J0fGVufDB8fDB8fHww"
                    alt="Import/Export"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                </div>
                <CardContent className="p-6 space-y-4 -mt-20 relative z-10">
                  <div className="bg-accent/10 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Import/Export</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Simplify international trade with end-to-end visibility, automated customs, and integrated
                    insurance.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm">Customs clearance tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm">Cargo insurance quotes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm">Compliance management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Integrations */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Powered by Industry-Leading Integrations"
              description="Seamlessly connected to the world's top maritime and logistics platforms"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/30">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">MarineTraffic</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Real-time vessel tracking with global AIS data coverage
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover:shadow-lg transition-all duration-300 group border-2 hover:border-secondary/30">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-xl">Alibaba Trade</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Direct integration with global B2B marketplace
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/30">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
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
        <section className="relative py-24 overflow-hidden bg-slate-950">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
              alt="Maritime operations"
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-950/95 via-slate-950/90 to-slate-950/95" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 text-white">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Why Choose Ontime Maritime
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                The most comprehensive and secure maritime platform in the industry
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50">
                <div className="mb-5 flex items-center justify-center h-12 w-12 rounded-xl bg-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Bank-Level Security</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  256-bit encryption and blockchain verification for all transactions and mission-critical documents.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-secondary/50">
                <div className="mb-5 flex items-center justify-center h-12 w-12 rounded-xl bg-secondary/20 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Reliability</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  99.9% uptime SLA backed by round-the-clock monitoring and technical support.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/50">
                <div className="mb-5 flex items-center justify-center h-12 w-12 rounded-xl bg-accent/20 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Active in 150+ countries with multilingual support and region-aware compliance.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Trusted by Industry Leaders"
              description="See what our clients say about our platform"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass overflow-hidden hover:shadow-xl transition-all duration-500 group border-2 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/31538020/pexels-photo-31538020.jpeg"
                    alt="Chukwuemeka Okafor"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
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
                    <p className="font-semibold">Chukwuemeka Okafor</p>
                    <p className="text-sm text-muted-foreground">CEO, Global Freight Ltd</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden hover:shadow-xl transition-all duration-500 group border-2 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Amina Bello"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
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
                    <p className="font-semibold">Amina Bello</p>
                    <p className="text-sm text-muted-foreground">Director, Pacific Shipping Co</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass overflow-hidden hover:shadow-xl transition-all duration-500 group border-2 hover:border-primary/30">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1533108165347-036ec233d7ec?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Oluwaseun Adeyemi"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
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
                    <p className="font-semibold">Oluwaseun Adeyemi</p>
                    <p className="text-sm text-muted-foreground">Manager, Lagos Trade Hub</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-secondary opacity-90" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Ready to Transform Your Maritime Operations?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
              Join thousands of companies already using Ontime Maritime
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm transition-all hover:scale-105"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* QR Code section */}
      <section className="py-14 bg-muted/40 border-t">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold text-center">Quick Access</h2>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Scan the QR code with your phone to visit the OnTime Maritime platform instantly.
          </p>
          <QrCode size={200} logoSrc="/logo.png" />
        </div>
      </section>

      <Footer />
      <FloatingChatButton />
    </div>
  )
}
