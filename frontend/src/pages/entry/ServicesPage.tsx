import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  Ship,
  FileText,
  Gavel,
  Shield,
  BarChart3,
  Compass,
  Clock,
  DollarSign,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white py-20">
          <div className="absolute inset-0 bg-[url(/bulk-cargo-ship.jpg)] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
                Our Services
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Complete Maritime Solutions</h1>
              <p className="text-lg text-slate-300 leading-relaxed text-pretty">
                Everything you need to manage cargo operations from port to port
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Real-Time Tracking */}
              <Card className="glass border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <Ship className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Real-Time Cargo Tracking</CardTitle>
                  <CardDescription className="text-base">
                    Monitor your shipments anywhere in the world with live GPS tracking and automated status updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Live vessel position tracking with MarineTraffic integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated milestone notifications (departure, transit, arrival)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">ETA predictions with weather and port congestion analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Multi-shipment dashboard with customizable views</span>
                    </li>
                  </ul>
                  <Link to="/tracking">
                    <Button className="w-full">
                      Track Your Shipment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Document Management */}
              <Card className="glass border-2 hover:border-secondary/50 transition-all">
                <CardHeader>
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Digital Document Management</CardTitle>
                  <CardDescription className="text-base">
                    Eliminate paperwork with secure digital bills of lading, invoices, and charterparty agreements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Blockchain-verified bills of lading and certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated customs documentation generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Digital signature and approval workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Secure cloud storage with version control</span>
                    </li>
                  </ul>
                  <Link to="/e-bol">
                    <Button variant="secondary" className="w-full">
                      Manage Documents <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Auction Marketplace */}
              <Card className="glass border-2 hover:border-accent/50 transition-all">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <Gavel className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Cargo Auction Marketplace</CardTitle>
                  <CardDescription className="text-base">
                    Bid on container slots and charter vessels in our transparent digital marketplace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Real-time bidding on available cargo space</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Full vessel charter auctions for bulk cargo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated contract generation for winning bids</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Secure payment escrow through Paystack</span>
                    </li>
                  </ul>
                  <Link to="/auctions">
                    <Button variant="default" className="w-full bg-accent hover:bg-accent/90">
                      Browse Auctions <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Insurance */}
              <Card className="glass border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Cargo Insurance Marketplace</CardTitle>
                  <CardDescription className="text-base">
                    Compare and purchase cargo insurance from top providers with instant quotes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Instant quotes from 20+ insurance providers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Coverage for all cargo types and routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Simplified claims process with digital documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automatic policy binding and certificate generation</span>
                    </li>
                  </ul>
                  <Link to="/insurance">
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Insurance Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Analytics */}
              <Card className="glass border-2 hover:border-secondary/50 transition-all">
                <CardHeader>
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Analytics & Business Intelligence</CardTitle>
                  <CardDescription className="text-base">
                    Make data-driven decisions with comprehensive shipping analytics and insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Real-time dashboards with KPI tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Route optimization and cost analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Carrier performance benchmarking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Custom reports and data exports</span>
                    </li>
                  </ul>
                  <Button variant="default" className="w-full bg-accent hover:bg-accent/90" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              {/* Charterparty */}
              <Card className="glass border-2 hover:border-accent/50 transition-all">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <Compass className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Charterparty Management</CardTitle>
                  <CardDescription className="text-base">
                    Streamline vessel chartering with digital contracts and automated workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Standard charterparty templates (Gencon, NYPE, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Digital negotiations and amendments tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automated laytime calculations and demurrage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Multi-party signing with legal validity</span>
                    </li>
                  </ul>
                  <Button variant="default" className="w-full bg-accent hover:bg-accent/90" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Industry-leading features that set us apart
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <Clock className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Round-the-clock technical assistance</p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <DollarSign className="h-10 w-10 text-secondary mx-auto" />
                  <h3 className="font-semibold">Transparent Pricing</h3>
                  <p className="text-sm text-muted-foreground">No hidden fees or surprises</p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <Shield className="h-10 w-10 text-accent mx-auto" />
                  <h3 className="font-semibold">Bank-Level Security</h3>
                  <p className="text-sm text-muted-foreground">256-bit encryption for all data</p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <Compass className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="font-semibold">Global Coverage</h3>
                  <p className="text-sm text-muted-foreground">Available in 150+ countries</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
