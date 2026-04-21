import { useTranslation } from "react-i18next"
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

export default function HomePage() {
  const { t } = useTranslation()

  const platformModules = [
    {
      title: t("modules.vesselTracking.title"),
      description: t("modules.vesselTracking.description"),
      href: "/vessel-tracking",
      icon: Ship,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: t("modules.digitalBOL.title"),
      description: t("modules.digitalBOL.description"),
      href: "/e-bol",
      icon: FileText,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: t("modules.legalHub.title"),
      description: t("modules.legalHub.description"),
      href: "/legal-hub",
      icon: Scale,
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: t("modules.securityHotline.title"),
      description: t("modules.securityHotline.description"),
      href: "/security-hotline",
      icon: Siren,
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: t("modules.arbitration.title"),
      description: t("modules.arbitration.description"),
      href: "/arbitration",
      icon: Bot,
      color: "bg-indigo-500/10 text-indigo-600",
    },
    {
      title: t("modules.marketplace.title"),
      description: t("modules.marketplace.description"),
      href: "/marketplace",
      icon: Store,
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: t("modules.store.title"),
      description: t("modules.store.description"),
      href: "/store",
      icon: Store,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      title: t("modules.knowledge.title"),
      description: t("modules.knowledge.description"),
      href: "/knowledge",
      icon: BookOpen,
      color: "bg-teal-500/10 text-teal-600",
    },
  ]

  const features = [
    {
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80",
      icon: Ship,
      title: t("features.realTimeTracking.title"),
      description: t("features.realTimeTracking.description"),
      iconColor: "bg-primary/10 text-primary",
    },
    {
      image: "https://images.unsplash.com/photo-1621009063622-4467e453c3c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRhYmxldCUyRmxhcHRvcCUyMHNob3dpbmclMjBkb2N1bWVudHN8ZW58MHx8MHx8fDA%3D?w=600&q=80",
      icon: FileText,
      title: t("features.digitalDocuments.title"),
      description: t("features.digitalDocuments.description"),
      iconColor: "bg-secondary/10 text-secondary",
    },
    {
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
      icon: Gavel,
      title: t("features.cargoAuctions.title"),
      description: t("features.cargoAuctions.description"),
      iconColor: "bg-accent/10 text-accent",
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      icon: BarChart3,
      title: t("features.analyticsInsights.title"),
      description: t("features.analyticsInsights.description"),
      iconColor: "bg-primary/10 text-primary",
    },
  ]

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
              title={t("features.sectionTitle")}
              description={t("features.sectionDescription")}
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
              title={t("modules.sectionTitle")}
              description={t("modules.sectionDescription")}
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
                        {t("modules.explore")} <ArrowRight className="h-4 w-4 ml-1" />
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
              title={t("industrySolutions.sectionTitle")}
              description={t("industrySolutions.sectionDescription")}
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
                  <h3 className="text-2xl font-bold">{t("industrySolutions.freightForwarders.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("industrySolutions.freightForwarders.description")}
                  </p>
                  <ul className="space-y-2">
                    {(["feature1", "feature2", "feature3"] as const).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{t(`industrySolutions.freightForwarders.${f}`)}</span>
                      </li>
                    ))}
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
                  <h3 className="text-2xl font-bold">{t("industrySolutions.shippingCompanies.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("industrySolutions.shippingCompanies.description")}
                  </p>
                  <ul className="space-y-2">
                    {(["feature1", "feature2", "feature3"] as const).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                        <span className="text-sm">{t(`industrySolutions.shippingCompanies.${f}`)}</span>
                      </li>
                    ))}
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
                  <h3 className="text-2xl font-bold">{t("industrySolutions.importExport.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("industrySolutions.importExport.description")}
                  </p>
                  <ul className="space-y-2">
                    {(["feature1", "feature2", "feature3"] as const).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                        <span className="text-sm">{t(`industrySolutions.importExport.${f}`)}</span>
                      </li>
                    ))}
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
              title={t("integrations.sectionTitle")}
              description={t("integrations.sectionDescription")}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/30">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl">{t("integrations.marineTraffic.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("integrations.marineTraffic.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover:shadow-lg transition-all duration-300 group border-2 hover:border-secondary/30">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-xl">{t("integrations.alibabaTrade.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("integrations.alibabaTrade.description")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass hover:shadow-lg transition-all duration-300 group border-2 hover:border-accent/30">
                <CardContent className="p-8 text-center space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl">{t("integrations.paystack.title")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("integrations.paystack.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative py-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
              alt="Maritime operations"
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-950/95 via-slate-950/90 to-slate-950/95" />
          </div>

          <div className="relative container mx-auto px-4 text-white">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t("whyChooseUs.sectionTitle")}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                {t("whyChooseUs.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50">
                <div className="mb-5 flex items-center justify-center h-12 w-12 rounded-xl bg-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("whyChooseUs.security.title")}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t("whyChooseUs.security.description")}
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-secondary/50">
                <div className="mb-5 flex items-center justify-center h-12 w-12 rounded-xl bg-secondary/20 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("whyChooseUs.reliability.title")}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t("whyChooseUs.reliability.description")}
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/50">
                <div className="mb-5 flex items-center justify-center h-12 w-12 rounded-xl bg-accent/20 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t("whyChooseUs.globalReach.title")}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t("whyChooseUs.globalReach.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              title={t("testimonials.sectionTitle")}
              description={t("testimonials.sectionDescription")}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(["testimonial1", "testimonial2", "testimonial3"] as const).map((key, idx) => {
                const images = [
                  "https://images.pexels.com/photos/31538020/pexels-photo-31538020.jpeg",
                  "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1533108165347-036ec233d7ec?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                ]
                return (
                  <Card key={key} className="glass overflow-hidden hover:shadow-xl transition-all duration-500 group border-2 hover:border-primary/30">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={images[idx]}
                        alt={t(`testimonials.${key}.name`)}
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
                        "{t(`testimonials.${key}.quote`)}"
                      </p>
                      <div>
                        <p className="font-semibold">{t(`testimonials.${key}.name`)}</p>
                        <p className="text-sm text-muted-foreground">{t(`testimonials.${key}.role`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-secondary opacity-90" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {t("cta.title")}
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  {t("cta.startFreeTrial")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm transition-all hover:scale-105"
                >
                  {t("cta.learnMore")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  )
}
