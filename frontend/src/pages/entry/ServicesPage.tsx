import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingChatButton } from "@/components/features/security-hotline/FloatingChatButton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()

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
                {t("services.hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                {t("services.hero.title")}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed text-pretty">
                {t("services.hero.description")}
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
                  <CardTitle className="text-2xl">{t("services.tracking.title")}</CardTitle>
                  <CardDescription className="text-base">{t("services.tracking.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {(["f1","f2","f3","f4"] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{t(`services.tracking.${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/tracking">
                    <Button className="w-full">
                      {t("services.tracking.cta")} <ArrowRight className="ml-2 h-4 w-4" />
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
                  <CardTitle className="text-2xl">{t("services.documents.title")}</CardTitle>
                  <CardDescription className="text-base">{t("services.documents.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {(["f1","f2","f3","f4"] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{t(`services.documents.${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/e-bol">
                    <Button variant="secondary" className="w-full">
                      {t("services.documents.cta")} <ArrowRight className="ml-2 h-4 w-4" />
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
                  <CardTitle className="text-2xl">{t("services.auctions.title")}</CardTitle>
                  <CardDescription className="text-base">{t("services.auctions.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {(["f1","f2","f3","f4"] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{t(`services.auctions.${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/auctions">
                    <Button variant="default" className="w-full bg-accent hover:bg-accent/90">
                      {t("services.auctions.cta")} <ArrowRight className="ml-2 h-4 w-4" />
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
                  <CardTitle className="text-2xl">{t("services.insurance.title")}</CardTitle>
                  <CardDescription className="text-base">{t("services.insurance.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {(["f1","f2","f3","f4"] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{t(`services.insurance.${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/insurance">
                    <Button variant="outline" className="w-full bg-transparent">
                      {t("services.insurance.cta")} <ArrowRight className="ml-2 h-4 w-4" />
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
                  <CardTitle className="text-2xl">{t("services.analytics.title")}</CardTitle>
                  <CardDescription className="text-base">{t("services.analytics.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {(["f1","f2","f3","f4"] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{t(`services.analytics.${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="default" className="w-full bg-accent hover:bg-accent/90" disabled>
                    {t("services.comingSoon")}
                  </Button>
                </CardContent>
              </Card>

              {/* Charterparty */}
              <Card className="glass border-2 hover:border-accent/50 transition-all">
                <CardHeader>
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    <Compass className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">{t("services.charterparty.title")}</CardTitle>
                  <CardDescription className="text-base">{t("services.charterparty.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {(["f1","f2","f3","f4"] as const).map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{t(`services.charterparty.${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="default" className="w-full bg-accent hover:bg-accent/90" disabled>
                    {t("services.comingSoon")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.why.sectionTitle")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("services.why.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <Clock className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="font-semibold">{t("services.why.support")}</h3>
                  <p className="text-sm text-muted-foreground">{t("services.why.supportDesc")}</p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <DollarSign className="h-10 w-10 text-secondary mx-auto" />
                  <h3 className="font-semibold">{t("services.why.pricing")}</h3>
                  <p className="text-sm text-muted-foreground">{t("services.why.pricingDesc")}</p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <Shield className="h-10 w-10 text-accent mx-auto" />
                  <h3 className="font-semibold">{t("services.why.security")}</h3>
                  <p className="text-sm text-muted-foreground">{t("services.why.securityDesc")}</p>
                </CardContent>
              </Card>

              <Card className="glass text-center">
                <CardContent className="p-6 space-y-3">
                  <Compass className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="font-semibold">{t("services.why.coverage")}</h3>
                  <p className="text-sm text-muted-foreground">{t("services.why.coverageDesc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  )
}
