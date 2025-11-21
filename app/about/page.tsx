import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Award, Users, Globe, TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1wb3J0JTIwYW5kJTIwZXhwb3J0fGVufDB8fDB8fHww"
              alt="About Ontime Maritime"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950/80" />
          </div>

          <div className="relative container mx-auto px-4 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30" variant="outline">
                About Us
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Revolutionizing Global Maritime Trade</h1>
              <p className="text-lg text-slate-200 leading-relaxed text-pretty">
                ONTIME RESOURCES LIMITED is at the forefront of maritime technology, connecting the world through
                innovative cargo solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2020, Ontime Maritime emerged from a simple observation: the maritime industry was
                    decades behind in digital transformation. While other sectors embraced technology, cargo shipping
                    remained trapped in paperwork and inefficiency.
                  </p>
                  <p>
                    Our founders, veterans of both the shipping industry and Silicon Valley, saw an opportunity to
                    bridge this gap. They assembled a team of maritime experts, software engineers, and logistics
                    professionals with one mission: revolutionize how cargo moves around the world.
                  </p>
                  <p>
                    Today, Ontime Maritime serves over 5,000 companies across 150 countries, processing millions of
                    containers annually. We've transformed from a startup to the industry's most trusted maritime
                    technology platform.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1wb3J0JTIwYW5kJTIwZXhwb3J0fGVufDB8fDB8fHww"
                    alt="Maritime operations"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card className="glass">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-primary mb-2">150+</div>
                      <div className="text-sm text-muted-foreground">Countries</div>
                    </CardContent>
                  </Card>
                  <Card className="glass">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-secondary mb-2">5K+</div>
                      <div className="text-sm text-muted-foreground">Active Users</div>
                    </CardContent>
                  </Card>
                  <Card className="glass">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-accent mb-2">2M+</div>
                      <div className="text-sm text-muted-foreground">Shipments Tracked</div>
                    </CardContent>
                  </Card>
                  <Card className="glass">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass border-2">
                <CardContent className="p-8 space-y-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To democratize access to global maritime trade by providing cutting-edge technology that makes
                      shipping faster, more transparent, and more efficient for businesses of all sizes. We believe
                      every company deserves enterprise-level logistics capabilities.
                    </p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Simplify complex maritime operations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Connect global trade partners seamlessly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Enable sustainable shipping practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass border-2">
                <CardContent className="p-8 space-y-6">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Eye className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To become the world's most trusted maritime technology platform, where every shipment is tracked,
                      every document is digital, and every transaction is seamless. We envision a future where global
                      trade is accessible to all.
                    </p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-1 rounded">
                        <Target className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">Zero-paper maritime industry by 2030</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-1 rounded">
                        <Globe className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">Platform in every major port worldwide</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-1 rounded">
                        <Award className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">Industry standard for maritime tech</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Excellence</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We strive for excellence in every feature, every interaction, and every customer experience.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-secondary/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg">Collaboration</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We believe in the power of partnership and building connections across the maritime ecosystem.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-accent/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">Innovation</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We continuously push boundaries to deliver cutting-edge solutions for modern maritime challenges.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">Integrity</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We operate with transparency, honesty, and accountability in all our business dealings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
              alt="Team background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/90" />
          </div>
          <div className="relative container mx-auto px-4 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
              <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Meet the experts driving maritime innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="glass border-slate-700 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                    alt="Dr. James Anderson"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>
                <CardContent className="p-6 text-center -mt-16 relative z-10">
                  <h3 className="font-semibold text-lg mb-1">Dr. James Anderson</h3>
                  <p className="text-sm text-slate-400">CEO & Co-Founder</p>
                </CardContent>
              </Card>

              <Card className="glass border-slate-700 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                    alt="Sarah Chen"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>
                <CardContent className="p-6 text-center -mt-16 relative z-10">
                  <h3 className="font-semibold text-lg mb-1">Sarah Chen</h3>
                  <p className="text-sm text-slate-400">CTO & Co-Founder</p>
                </CardContent>
              </Card>

              <Card className="glass border-slate-700 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
                    alt="Mohammed Osman"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>
                <CardContent className="p-6 text-center -mt-16 relative z-10">
                  <h3 className="font-semibold text-lg mb-1">Mohammed Osman</h3>
                  <p className="text-sm text-slate-400">Head of Operations</p>
                </CardContent>
              </Card>

              <Card className="glass border-slate-700 overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
                    alt="Lisa Martinez"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                </div>
                <CardContent className="p-6 text-center -mt-16 relative z-10">
                  <h3 className="font-semibold text-lg mb-1">Lisa Martinez</h3>
                  <p className="text-sm text-slate-400">Head of Customer Success</p>
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
