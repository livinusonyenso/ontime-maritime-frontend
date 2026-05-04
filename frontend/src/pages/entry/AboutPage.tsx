import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingChatButton } from "@/components/features/security-hotline/FloatingChatButton";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Award, Users, Globe, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  const team = [
    {
      name: "Barr. Enemuo Chinedu Christopher",
      role: t("about.team.ceoRole"),
      img: "https://res.cloudinary.com/dikhomv7m/image/upload/v1773847345/ceo_img_zk1cvt.jpg",
    },
    {
      name: "Chioma Adeyemi",
      role: t("about.team.ctoRole"),
      img: "https://images.unsplash.com/photo-1611432579402-7037e3e2c1e4?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Oluwaseun Okafor",
      role: t("about.team.opsRole"),
      img: "https://plus.unsplash.com/premium_photo-1748215161407-b4d48ab8b090?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Amaka Nwankwo",
      role: t("about.team.csRole"),
      img: "https://plus.unsplash.com/premium_photo-1661544595808-849629f20b38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

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
                {t("about.hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                {t("about.hero.title")}
              </h1>
              <p className="text-lg text-slate-200 leading-relaxed text-pretty">
                {t("about.hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("about.story.sectionTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("about.story.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                  {t("about.story.label")}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  {t("about.story.title")}
                </h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                  <p>{t("about.story.p1")}</p>
                  <p>{t("about.story.p2")}</p>
                  <p>{t("about.story.p3")}</p>
                </div>
              </div>

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
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("about.impact.sectionTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("about.impact.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="border-2 transition-all hover:border-primary/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">65+</div>
                  <h3 className="font-semibold">{t("about.impact.stat1Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("about.impact.stat1Desc")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-secondary/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-secondary">90+</div>
                  <h3 className="font-semibold">{t("about.impact.stat2Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("about.impact.stat2Desc")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-accent/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-accent">30k+</div>
                  <h3 className="font-semibold">{t("about.impact.stat3Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("about.impact.stat3Desc")}</p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-primary/40">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">99.9%</div>
                  <h3 className="font-semibold">{t("about.impact.stat4Title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("about.impact.stat4Desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("about.purpose.sectionTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("about.purpose.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass border-2">
                <CardContent className="p-8 space-y-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{t("about.purpose.missionTitle")}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("about.purpose.missionDesc")}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{t("about.purpose.mission1")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{t("about.purpose.mission2")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{t("about.purpose.mission3")}</span>
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
                    <h3 className="text-2xl font-bold mb-4">{t("about.purpose.visionTitle")}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t("about.purpose.visionDesc")}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-1 rounded">
                        <Target className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">{t("about.purpose.vision1")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-1 rounded">
                        <Globe className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">{t("about.purpose.vision2")}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-secondary/10 p-1 rounded">
                        <Award className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">{t("about.purpose.vision3")}</span>
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
                {t("about.values.sectionTitle")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("about.values.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t("about.values.excellence")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("about.values.excellenceDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-secondary/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t("about.values.collaboration")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("about.values.collaborationDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-accent/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg">{t("about.values.innovation")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("about.values.innovationDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t("about.values.integrity")}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("about.values.integrityDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
              alt="Team background"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/85" />
          </div>

          <div className="relative container mx-auto px-4 text-white">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                {t("about.team.sectionTitle")}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                {t("about.team.sectionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.map((m) => (
                <Card
                  key={m.name}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="rounded-xl border border-white/10 bg-slate-950/35 backdrop-blur-md px-4 py-3 text-center">
                        <h3 className="text-base font-semibold leading-snug text-white">{m.name}</h3>
                        <p className="mt-0.5 text-sm text-slate-300">{m.role}</p>
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
