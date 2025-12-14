import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingChatButton } from "@/components/features/security-hotline/FloatingChatButton";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Award, Users, Globe, TrendingUp } from "lucide-react";

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
              <Badge
                className="bg-primary/20 text-primary border-primary/30"
                variant="outline"
              >
                About Us
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Revolutionizing Global Maritime Trade
              </h1>
              <p className="text-lg text-slate-200 leading-relaxed text-pretty">
                ONTIME RESOURCES LIMITED is at the forefront of maritime
                technology, connecting the world through innovative cargo
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Who We Are
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The story behind Ontime Maritime and our mission to modernize
                global shipping
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* LEFT — Story */}
              <div className="space-y-6">
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                  Our Story
                </span>

                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Building the Digital Backbone of Modern Maritime Logistics
                </h3>

                <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                  <p>
                    Founded in 2020, Ontime Maritime emerged from a simple
                    observation: the maritime industry was decades behind in
                    digital transformation. While other sectors embraced
                    technology, cargo shipping remained trapped in paperwork and
                    inefficiency.
                  </p>

                  <p>
                    Our founders — veterans of both global shipping and Silicon
                    Valley — saw an opportunity to bridge this gap. They brought
                    together maritime experts, software engineers, and logistics
                    professionals with one mission: modernize how cargo moves
                    across the world.
                  </p>

                  <p>
                    Today, Ontime Maritime supports over 5,000 companies in 150+
                    countries, processing millions of containers annually and
                    powering critical supply chains worldwide.
                  </p>
                </div>
              </div>

              {/* RIGHT — Visual */}
              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661932036915-4fd90bec6e8a?w=900&q=80"
                    alt="Maritime operations"
                    className="h-[380px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Impact */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ontime Maritime by the Numbers
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Measurable impact across global maritime operations
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 transition-all hover:border-primary/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">150+</div>
                  <h3 className="font-semibold">Countries Covered</h3>
                  <p className="text-sm text-muted-foreground">
                    Active presence across major global ports
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-secondary/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-secondary">5K+</div>
                  <h3 className="font-semibold">Active Companies</h3>
                  <p className="text-sm text-muted-foreground">
                    Logistics firms, shippers, and operators
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-accent/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-accent">2M+</div>
                  <h3 className="font-semibold">Shipments Tracked</h3>
                  <p className="text-sm text-muted-foreground">
                    Digitized and monitored end-to-end
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-primary/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">99.9%</div>
                  <h3 className="font-semibold">Platform Uptime</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade reliability and availability
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
      <section className="py-24 bg-muted/30">
  <div className="container mx-auto px-4">

    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Our Purpose
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        The mission and vision guiding Ontime Maritime’s impact on global trade
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Mission */}
      <Card className="glass border-2">
        <CardContent className="p-8 space-y-6">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
            <Target className="h-8 w-8 text-primary" />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize access to global maritime trade by providing
              cutting-edge technology that makes shipping faster, more
              transparent, and more efficient for businesses of all sizes.
              We believe every company deserves enterprise-level logistics
              capabilities.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1 rounded">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">
                Simplify complex maritime operations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1 rounded">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">
                Connect global trade partners seamlessly
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1 rounded">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">
                Enable sustainable shipping practices
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Vision */}
      <Card className="glass border-2">
        <CardContent className="p-8 space-y-6">
          <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
            <Eye className="h-8 w-8 text-secondary" />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the world’s most trusted maritime technology platform,
              where every shipment is tracked, every document is digital, and
              every transaction is seamless. We envision a future where global
              trade is accessible to all.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="bg-secondary/10 p-1 rounded">
                <Target className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm">
                Zero-paper maritime industry by 2030
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-secondary/10 p-1 rounded">
                <Globe className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm">
                Platform in every major port worldwide
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-secondary/10 p-1 rounded">
                <Award className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-sm">
                Industry standard for maritime technology
              </span>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
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
                    We strive for excellence in every feature, every
                    interaction, and every customer experience.
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
                    We believe in the power of partnership and building
                    connections across the maritime ecosystem.
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
                    We continuously push boundaries to deliver cutting-edge
                    solutions for modern maritime challenges.
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
                    We operate with transparency, honesty, and accountability in
                    all our business dealings.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="relative py-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
              alt="Team background"
              className="h-full w-full object-cover"
            />
            {/* Keep overlay, but avoid over-darkening */}
            <div className="absolute inset-0 bg-slate-950/85" />
          </div>

          <div className="relative container mx-auto px-4 text-white">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Leadership Team
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Meet the experts driving maritime innovation
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Dr. James Anderson",
                  role: "CEO & Co-Founder",
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=700&q=80",
                },
                {
                  name: "Sarah Chen",
                  role: "CTO & Co-Founder",
                  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80",
                },
                {
                  name: "Mohammed Osman",
                  role: "Head of Operations",
                  img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80",
                },
                {
                  name: "Lisa Martinez",
                  role: "Head of Customer Success",
                  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=700&q=80",
                },
              ].map((m) => (
                <Card
                  key={m.name}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient only at bottom for text separation */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />

                    {/* Bottom text panel (no negative margin) */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="rounded-xl border border-white/10 bg-slate-950/35 backdrop-blur-md px-4 py-3 text-center">
                        <h3 className="text-base font-semibold leading-snug text-white">
                          {m.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-slate-300">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
}
