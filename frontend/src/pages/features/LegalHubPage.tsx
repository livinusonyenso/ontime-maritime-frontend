"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  fetchLegalData,
  selectConsultant,
  clearSelectedConsultant,
  setSearchQuery,
  setFilterCategory,
} from "@/store/slices/legalHubSlice"
import { useAuth } from "@/contexts/auth-context"
import { PaystackPayment, usePaystackPayment } from  "@/components/payments/PaystackPayment"
import { ComingSoonModal } from "@/components/features/ComingSoonModal"
import { useTranslation } from "react-i18next"
import {
  Scale,
  Search,
  Star,
  Phone,
  Mail,
  Globe,
  Download,
  FileText,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Clock,
  Users,
  Briefcase,
  Crown,
  ArrowRight,
  Anchor,
  Ship,
  Shield,
  Award,
  Quote,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  Waves,
  Compass,
  Bell,
  Lock,
} from "lucide-react"

import { QrCode } from "@/components/QrCode"
export default function LegalHubPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const { consultants, templates, services, resources, selectedConsultant, searchQuery, filterCategory } =
    useAppSelector((state) => state.legalHub)
  const [activeTab, setActiveTab] = useState("consultants")
  const [comingSoon, setComingSoon] = useState<{ open: boolean; feature?: string }>({ open: false })

  // Only fetch live data when logged in — these endpoints require auth.
  // Static fallback data is already in the Redux initial state.
  useEffect(() => {
    if (isAuthenticated && consultants.length === 0) dispatch(fetchLegalData())
  }, [isAuthenticated, dispatch])
  
  // Paystack payment hook
  const { isPaymentOpen, setIsPaymentOpen, paymentConfig, openPayment, closePayment } = usePaystackPayment()

  // Smooth scroll to consultants section
  const scrollToConsultants = () => {
    const consultantsSection = document.getElementById("consultants-section")
    if (consultantsSection) {
      consultantsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setActiveTab("consultants")
  }

  const filteredConsultants = consultants.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const [templateSearch, setTemplateSearch] = useState("")
  const [templatePage, setTemplatePage] = useState(1)
  const TEMPLATES_PER_PAGE = 6

  const filteredTemplates = templates.filter((tmpl) => {
    const matchesCategory = filterCategory === "all" || tmpl.category === filterCategory
    const q = templateSearch.toLowerCase()
    const matchesSearch = !q || tmpl.name.toLowerCase().includes(q) || tmpl.description.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const totalTemplatePages = Math.max(1, Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE))
  const pagedTemplates = filteredTemplates.slice(
    (templatePage - 1) * TEMPLATES_PER_PAGE,
    templatePage * TEMPLATES_PER_PAGE
  )


  // Handle consultation booking with payment
  const handleBookConsultation = (consultant: typeof selectedConsultant) => {
    if (!consultant) return
    openPayment({
      amount: consultant.hourlyRate, // Amount in base currency (PaystackPayment handles conversion)
      serviceName: `Legal Consultation - 1 Hour`,
      consultantName: consultant.name,
    })
  }

  // Handle service purchase
  const handleServicePurchase = (service: { title: string; price: number }) => {
    openPayment({
      amount: service.price,
      serviceName: service.title,
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Bold Maritime Design */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1698084059560-9a53de7b816b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF3eWVyfGVufDB8fDB8fHww"
              alt="Maritime Law Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
            {/* Animated wave pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
                <path
                  fill="currentColor"
                  className="text-blue-400"
                  d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,240C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                >
                  <animate
                    attributeName="d"
                    dur="10s"
                    repeatCount="indefinite"
                    values="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,240C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z;M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,245.3C672,256,768,224,864,197.3C960,171,1056,149,1152,160C1248,171,1344,213,1392,234.7L1440,256L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z;M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,154.7C672,160,768,224,864,240C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
                  />
                </path>
              </svg>
            </div>
          </div>

          {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
  <div className="grid lg:grid-cols-2 gap-12 items-center">

    {/* HERO CONTENT */}
    <div className="text-white space-y-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm">
        <Anchor className="h-4 w-4 text-cyan-400" />
        <span className="text-cyan-400 font-semibold">{t("legalhub.hero.badge")}</span>
        <span className="text-white/60">{t("legalhub.hero.est")}</span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        {t("legalhub.hero.title")}
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          {t("legalhub.hero.titleHighlight")}
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-lg text-slate-300 max-w-xl">
        {t("legalhub.hero.description")}
      </p>

      {/* Primary CTA */}
      <Button
        size="lg"
        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-6 text-lg rounded-xl shadow-lg"
        onClick={scrollToConsultants}
      >
        <Users className="mr-2 h-5 w-5" />
        {t("legalhub.hero.cta")}
      </Button>
    </div>

    {/* QUICK LEGAL SEARCH */}
    <div className="hidden lg:block">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-3">
          {t("legalhub.hero.searchTitle")}
        </h3>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder={t("legalhub.hero.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                scrollToConsultants()
              }
            }}
            className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl"
          />
        </div>

        <Button
          className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 rounded-xl h-12"
          onClick={scrollToConsultants}
        >
          {t("legalhub.hero.searchBtn")}
        </Button>
      </div>
    </div>

  </div>
</div>

        </section>

        {/* Statistics Bar */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-6 border-y border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">4+</div>
                  {/* <div className="text-3xl font-bold text-white">{consultants.length}+</div> */}
                  <div className="text-sm text-slate-400">{t("legalhub.stats.lawyers")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{templates.length}+</div>
                  <div className="text-sm text-slate-400">{t("legalhub.stats.templates")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-slate-400">{t("legalhub.stats.jurisdictions")}</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-slate-400">{t("legalhub.stats.support")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 text-cyan-600 border-cyan-200 bg-cyan-50">
                {t("legalhub.practiceAreas.badge")}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t("legalhub.practiceAreas.title")}
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t("legalhub.practiceAreas.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Ship,
                  title: t("legalhub.practiceAreas.shipping.title"),
                  description: t("legalhub.practiceAreas.shipping.desc"),
                  color: "cyan",
                  image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=400"
                },
                {
                  icon: Briefcase,
                  title: t("legalhub.practiceAreas.cargo.title"),
                  description: t("legalhub.practiceAreas.cargo.desc"),
                  color: "blue",
                  image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=400"
                },
                {
                  icon: Shield,
                  title: t("legalhub.practiceAreas.insurance.title"),
                  description: t("legalhub.practiceAreas.insurance.desc"),
                  color: "teal",
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400"
                },
                {
                  icon: Anchor,
                  title: t("legalhub.practiceAreas.disputes.title"),
                  description: t("legalhub.practiceAreas.disputes.desc"),
                  color: "indigo",
                  image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400"
                },
              ].map((area, index) => (
                <Card 
                  key={area.title} 
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                    <div className={`absolute top-4 left-4 w-12 h-12 bg-${area.color}-500 rounded-xl flex items-center justify-center shadow-lg`}>
                      <area.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-slate-600">{area.description}</p>
                    <Button variant="link" className="p-0 mt-4 text-cyan-600 group-hover:text-cyan-700">
                      {t("legalhub.practiceAreas.learnMore")} <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section id="consultants-section" className="py-20 bg-slate-50 scroll-mt-20">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="mb-8 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {t("legalhub.tabs.sectionTitle")}
                  </h2>
                  <p className="text-slate-600">{t("legalhub.tabs.sectionDesc")}</p>
                </div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                <TabsList className="bg-white shadow-md p-1.5 rounded-xl w-full grid grid-cols-4 h-auto">
                  <TabsTrigger
                    value="consultants"
                    className="flex flex-col items-center gap-1 px-1 py-2.5 sm:flex-row sm:gap-2 sm:px-5 sm:py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <Users className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] sm:text-sm font-medium leading-tight">{t("legalhub.tabs.lawyers")}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="templates"
                    className="flex flex-col items-center gap-1 px-1 py-2.5 sm:flex-row sm:gap-2 sm:px-5 sm:py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] sm:text-sm font-medium leading-tight">{t("legalhub.tabs.templates")}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="services"
                    className="flex flex-col items-center gap-1 px-1 py-2.5 sm:flex-row sm:gap-2 sm:px-5 sm:py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <Briefcase className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] sm:text-sm font-medium leading-tight">{t("legalhub.tabs.services")}</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="flex flex-col items-center gap-1 px-1 py-2.5 sm:flex-row sm:gap-2 sm:px-5 sm:py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <span className="text-[10px] sm:text-sm font-medium leading-tight">{t("legalhub.tabs.resources")}</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Consultants/Lawyers Tab */}
              <TabsContent value="consultants">
                {/* Section Header */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <Scale className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{t("legalhub.consultants.title")}</h3>
                      <p className="text-slate-600">{t("legalhub.consultants.description")}</p>
                    </div>
                  </div>
                  
                  {/* Search for mobile */}
                  <div className="lg:hidden relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      placeholder={t("legalhub.consultants.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      className="pl-12 h-14 rounded-xl"
                    />
                  </div>
                </div>

                {/* Featured Lawyer */}
                <div className="mb-12">
                  {/* <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-4 py-1.5 text-sm">
                      <Crown className="h-3.5 w-3.5 mr-1.5" />
                      {t("legalhub.consultants.featured")}
                    </Badge>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-200 to-transparent" />
                  </div> */}

                  <div className="grid lg:grid-cols-3 gap-8 items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-3xl" />
                    </div>

                    {/* Photo Card */}
                    <div className="relative z-10">
                      <Card className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dikhomv7m/image/upload/v1773847345/ceo_img_zk1cvt.jpg"
                            alt="Barr. Enemuo Chinedu Christopher"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
                          {/* <div className="absolute top-4 left-4">
                            <Badge className="bg-emerald-500 text-white shadow-lg text-xs">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
                              {t("legalhub.consultants.available")}
                            </Badge>
                          </div> */}
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-md px-4 py-3 text-center">
                              <h3 className="text-sm font-bold leading-snug text-white">Barr. Enemuo Chinedu Christopher</h3>
                              <p className="mt-0.5 text-xs text-cyan-300">{t("about.team.ceoRole")}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 relative z-10 text-white space-y-6">
                      <div>
                        <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-2">
                          {t("legalhub.consultants.featuredLawyer")}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-1">
                          Barr. Enemuo Chinedu Christopher
                        </h2>
                        <p className="text-slate-300 text-lg">{t("about.team.ceoRole")}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-white font-semibold">5.0</span>
                        <span className="text-slate-400 text-sm">{t("legalhub.consultants.topRated")}</span>
                      </div>

                      {/* Specializations */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                          {t("legalhub.consultants.specializations")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            t("legalhub.practiceAreas.shipping.title"),
                            t("legalhub.practiceAreas.cargo.title"),
                            t("legalhub.practiceAreas.disputes.title"),
                            t("legalhub.practiceAreas.insurance.title"),
                          ].map((spec) => (
                            <Badge key={spec} className="bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Briefcase className="h-5 w-5 text-cyan-400" />
                          <span className="text-sm">15+ {t("legalhub.consultants.years")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <MapPin className="h-5 w-5 text-cyan-400" />
                          <span className="text-sm">Nigeria · International</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Shield className="h-5 w-5 text-cyan-400" />
                          <span className="text-sm">{t("legalhub.practiceAreas.badge")}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl px-8 shadow-lg shadow-cyan-500/30"
                          onClick={() => {
                            openPayment({
                              amount: 150,
                              serviceName: "Legal Consultation - 1 Hour",
                              consultantName: "Barr. Enemuo Chinedu Christopher",
                            })
                          }}
                        >
                          {t("legalhub.dialog.bookConsultation")}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white/20 text-slate-700 hover:bg-white/10 hover:text-white rounded-xl px-8 transition-colors"
                        >
                          <Mail className="mr-2 h-5 w-5" />
                          {t("legalhub.cta.call")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other Consultants */}
                {filteredConsultants.length > 0 && (
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-slate-500 text-sm font-medium">{t("legalhub.consultants.title")}</p>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>
                )}

                {filteredConsultants.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredConsultants.map((consultant, index) => (
                      <Card
                        key={consultant.id}
                        className="group bg-white border-0 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                      {/* Card Header with Gradient */}
                      <div className="relative h-24 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                        <div className="absolute inset-0 opacity-30">
                          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path fill="currentColor" className="text-cyan-400" d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" opacity="0.3" />
                          </svg>
                        </div>
                        {/* Availability Badge */}
                        <div className="absolute top-4 right-4">
                          {consultant.available ? (
                            <Badge className="bg-emerald-500 text-white shadow-lg">
                              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                              {t("legalhub.consultants.available")}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-600 text-white">{t("legalhub.consultants.busy")}</Badge>
                          )}
                        </div>
                      </div>
                      
                      <CardContent className="p-6 -mt-12 relative">
                        {/* Avatar */}
                        <div className="flex items-end gap-4 mb-4">
                          <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
                            <AvatarImage src={consultant.avatar} alt={consultant.name} />
                            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xl font-bold">
                              {consultant.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 pb-1">
                            <h3 className="font-bold text-lg text-slate-900">{consultant.name}</h3>
                            <p className="text-sm text-slate-600">{consultant.title}</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4 bg-yellow-50 px-3 py-2 rounded-lg">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i <= Math.floor(consultant.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-slate-900">{consultant.rating}</span>
                          <span className="text-sm text-slate-500">({consultant.reviewCount} {t("legalhub.consultants.reviews")})</span>
                        </div>

                        {/* Specializations */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t("legalhub.consultants.specializations")}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {consultant.specialization.slice(0, 3).map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                {spec}
                              </Badge>
                            ))}
                            {consultant.specialization.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200">
                                +{consultant.specialization.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Jurisdictions */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t("legalhub.consultants.jurisdictions")}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {consultant.jurisdiction.map((j) => (
                              <Badge key={j} className="text-xs bg-blue-50 text-blue-700 border-0">
                                <MapPin className="h-3 w-3 mr-1" />
                                {j}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between py-4 border-t border-slate-100">
                          <div>
                            <div className="text-xs text-slate-500">{t("legalhub.consultants.experience")}</div>
                            <div className="font-bold text-slate-900">{consultant.experience} {t("legalhub.consultants.years")}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500">{t("legalhub.consultants.hourlyRate")}</div>
                            <div className="font-bold text-cyan-600 text-lg">
                              ${consultant.hourlyRate}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-xl h-12 shadow-md"
                          onClick={() => dispatch(selectConsultant(consultant.id))}
                        >
                          {t("legalhub.consultants.viewProfile")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates">
                {/* Filters + Search */}
                <div className="mb-8 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder={t("legalhub.templates.searchPlaceholder")}
                        value={templateSearch}
                        onChange={(e) => { setTemplateSearch(e.target.value); setTemplatePage(1) }}
                        className="pl-11 h-11 rounded-xl border-slate-200"
                      />
                    </div>
                    {/* Count */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 self-center shrink-0">
                      <FileText className="h-4 w-4" />
                      <span>
                        {filteredTemplates.length} / {templates.length} {t("legalhub.stats.templates").toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "all",         label: t("legalhub.templates.all"),         icon: Scale },
                      { key: "charterparty",label: t("legalhub.templates.charterparty"),icon: Ship },
                      { key: "bol",         label: t("legalhub.templates.bol"),          icon: FileText },
                      { key: "nvocc",       label: t("legalhub.templates.nvocc"),        icon: Anchor },
                      { key: "compliance",  label: t("legalhub.templates.compliance"),   icon: Shield },
                      { key: "contract",    label: t("legalhub.templates.contract"),     icon: Briefcase },
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => { dispatch(setFilterCategory(key)); setTemplatePage(1) }}
                        className={[
                          "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                          filterCategory === key
                            ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20"
                            : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-600",
                        ].join(" ")}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                        <span className={[
                          "ml-1 text-xs px-1.5 py-0.5 rounded-full font-semibold",
                          filterCategory === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                        ].join(" ")}>
                          {key === "all"
                            ? templates.length
                            : templates.filter(tmpl => tmpl.category === key).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results */}
                {filteredTemplates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-700 font-semibold mb-1">{t("legalhub.templates.noResults")}</p>
                    <button
                      onClick={() => { setTemplateSearch(""); dispatch(setFilterCategory("all")); setTemplatePage(1) }}
                      className="text-sm text-cyan-600 hover:underline mt-1"
                    >
                      {t("legalhub.templates.clearSearch")}
                    </button>
                  </div>
                ) : (
                  <>
                  <div className="grid gap-4">
                    {pagedTemplates.map((template) => {
                      const categoryColors: Record<string, string> = {
                        charterparty: "from-cyan-500 to-blue-600",
                        bol:          "from-blue-500 to-indigo-600",
                        nvocc:        "from-teal-500 to-cyan-600",
                        compliance:   "from-emerald-500 to-green-600",
                        contract:     "from-slate-600 to-slate-800",
                      }
                      const gradient = categoryColors[template.category] ?? "from-slate-500 to-slate-700"

                      return (
                        <Card
                          key={template.id}
                          className="group bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          <CardContent className="p-0">
                            <div className="flex items-stretch gap-0">
                              {/* Colour accent strip */}
                              <div className={`w-1.5 rounded-l-xl bg-gradient-to-b ${gradient} shrink-0`} />

                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 flex-1">
                                <div className="flex items-start gap-5 flex-1 min-w-0">
                                  {/* Icon */}
                                  <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg shrink-0`}>
                                    <FileText className="h-7 w-7 text-white" />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <h3 className="font-bold text-base text-slate-900 leading-snug">{template.name}</h3>
                                      {template.premium && (
                                        <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-xs shrink-0">
                                          <Crown className="h-3 w-3 mr-1" /> {t("legalhub.templates.premium")}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">{template.description}</p>
                                    <div className="flex flex-wrap items-center gap-3 text-xs">
                                      <Badge variant="outline" className="capitalize rounded-full border-slate-200 text-slate-600 font-medium">
                                        {t(`legalhub.templates.${template.category}` as any) || template.category}
                                      </Badge>
                                      <span className="flex items-center gap-1 text-slate-400">
                                        <Download className="h-3.5 w-3.5" />
                                        {template.downloads.toLocaleString()} {t("legalhub.templates.downloads")}
                                      </span>
                                      {template.premium && (
                                        <span className="flex items-center gap-1 text-amber-600 font-medium">
                                          <Lock className="h-3.5 w-3.5" />
                                          Premium access required
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Action */}
                                <Button
                                  onClick={() => setComingSoon({ open: true, feature: template.name })}
                                  className={[
                                    "shrink-0 rounded-xl px-6 h-11 shadow-sm transition-all",
                                    template.premium
                                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                                      : "bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white",
                                  ].join(" ")}
                                >
                                  {template.premium ? (
                                    <>
                                      <Crown className="h-4 w-4 mr-2" />
                                      Unlock
                                    </>
                                  ) : (
                                    <>
                                      <Download className="h-4 w-4 mr-2" />
                                      {t("legalhub.templates.download")}
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Pagination */}
                  {totalTemplatePages > 1 && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                      <p className="text-sm text-slate-500">
                        Showing{" "}
                        <span className="font-semibold text-slate-700">
                          {(templatePage - 1) * TEMPLATES_PER_PAGE + 1}–{Math.min(templatePage * TEMPLATES_PER_PAGE, filteredTemplates.length)}
                        </span>{" "}
                        of <span className="font-semibold text-slate-700">{filteredTemplates.length}</span> templates
                      </p>

                      <div className="flex items-center gap-1">
                        {/* Prev */}
                        <button
                          onClick={() => setTemplatePage((p) => Math.max(1, p - 1))}
                          disabled={templatePage === 1}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:text-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalTemplatePages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setTemplatePage(page)}
                            className={[
                              "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all border",
                              page === templatePage
                                ? "bg-cyan-500 text-white border-cyan-500 shadow-sm shadow-cyan-500/30"
                                : "border-slate-200 text-slate-600 hover:border-cyan-400 hover:text-cyan-600",
                            ].join(" ")}
                          >
                            {page}
                          </button>
                        ))}

                        {/* Next */}
                        <button
                          onClick={() => setTemplatePage((p) => Math.min(totalTemplatePages, p + 1))}
                          disabled={templatePage === totalTemplatePages}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-cyan-400 hover:text-cyan-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  </>
                )}
              </TabsContent>

              {/* Services Tab — Coming Soon */}
              <TabsContent value="services">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 md:p-16 text-white">
                  {/* Background blobs */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl" />
                  </div>
                  <Compass className="absolute top-8 right-8 h-28 w-28 text-white/5" />

                  <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <Badge className="mb-6 bg-white/10 text-cyan-400 border-0 px-4 py-1.5">
                      <Briefcase className="h-3.5 w-3.5 mr-2" />
                      {t("legalhub.services.comingSoonBadge")}
                    </Badge>

                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/30">
                      <Clock className="h-10 w-10 text-white" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {t("legalhub.services.comingSoonTitle")}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-10">
                      {t("legalhub.services.comingSoonDesc")}
                    </p>

                    {/* Preview cards */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
                      {[
                        { label: t("legalhub.services.preview1"), icon: FileText },
                        { label: t("legalhub.services.preview2"), icon: Scale },
                        { label: t("legalhub.services.preview3"), icon: Shield },
                        { label: t("legalhub.services.preview4"), icon: Anchor },
                      ].map(({ label, icon: Icon }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                        >
                          <div className="w-9 h-9 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="h-4.5 w-4.5 text-cyan-400" />
                          </div>
                          <span className="text-sm font-medium text-slate-200">{label}</span>
                          <Badge className="ml-auto bg-slate-700 text-slate-400 border-0 text-xs">Soon</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl px-8 shadow-lg shadow-cyan-500/30"
                        onClick={() => setComingSoon({ open: true, feature: t("legalhub.tabs.services") })}
                      >
                        <Bell className="mr-2 h-5 w-5" />
                        {t("legalhub.services.comingSoonNotify")}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/20 text-slate-200 hover:bg-white/10 rounded-xl px-8"
                        onClick={scrollToConsultants}
                      >
                        <Users className="mr-2 h-5 w-5" />
                        {t("legalhub.services.comingSoonContact")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Resources Tab — Coming Soon */}
              <TabsContent value="resources">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-12 md:p-16">
                  {/* Background blobs */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100 rounded-full blur-3xl opacity-60" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-60" />
                  </div>
                  <Waves className="absolute top-8 right-8 h-28 w-28 text-slate-200" />

                  <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <Badge variant="outline" className="mb-6 px-4 py-1.5 text-cyan-600 border-cyan-200 bg-cyan-50">
                      <BookOpen className="h-3.5 w-3.5 mr-2" />
                      {t("legalhub.resources.comingSoonBadge")}
                    </Badge>

                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-teal-500/20">
                      <GraduationCap className="h-10 w-10 text-white" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                      {t("legalhub.resources.comingSoonTitle")}
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-10">
                      {t("legalhub.resources.comingSoonDesc")}
                    </p>

                    {/* Preview cards */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
                      {[
                        { label: t("legalhub.resources.preview1"), icon: Globe,        color: "bg-cyan-50 text-cyan-600" },
                        { label: t("legalhub.resources.preview2"), icon: Scale,        color: "bg-blue-50 text-blue-600" },
                        { label: t("legalhub.resources.preview3"), icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600" },
                        { label: t("legalhub.resources.preview4"), icon: BookOpen,     color: "bg-purple-50 text-purple-600" },
                      ].map(({ label, icon: Icon, color }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm"
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{label}</span>
                          <Badge variant="outline" className="ml-auto text-xs text-slate-400 border-slate-200">Soon</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-xl px-8 shadow-lg shadow-teal-500/20 text-white"
                        onClick={() => setComingSoon({ open: true, feature: t("legalhub.tabs.resources") })}
                      >
                        <Bell className="mr-2 h-5 w-5" />
                        {t("legalhub.resources.comingSoonNotify")}
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-xl px-8 border-slate-300 text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        {t("legalhub.resources.comingSoonContact")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/10 text-cyan-400 border-0 px-4 py-1.5">
                {t("legalhub.testimonials.badge")}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t("legalhub.testimonials.title")}
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {t("legalhub.testimonials.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: t("legalhub.testimonials.t1quote"),
                  author: t("legalhub.testimonials.t1author"),
                  role: t("legalhub.testimonials.t1role"),
                  avatar: "JM",
                  rating: 5
                },
                {
                  quote: t("legalhub.testimonials.t2quote"),
                  author: t("legalhub.testimonials.t2author"),
                  role: t("legalhub.testimonials.t2role"),
                  avatar: "SC",
                  rating: 5
                },
                {
                  quote: t("legalhub.testimonials.t3quote"),
                  author: t("legalhub.testimonials.t3author"),
                  role: t("legalhub.testimonials.t3role"),
                  avatar: "MO",
                  rating: 5
                },
              ].map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="bg-white/5 backdrop-blur-sm border-white/10 text-white"
                >
                  <CardContent className="p-8">
                    <Quote className="h-10 w-10 text-cyan-400 mb-6" />
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-cyan-400/30">
                        <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-slate-400">{testimonial.role}</div>
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* CTA Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 rounded-3xl p-12 md:p-16">
      {/* ...existing background elements... */}

      {/* Change grid to accommodate QR code */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Existing text content */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("legalhub.cta.title")}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {t("legalhub.cta.description")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-cyan-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-lg"
              onClick={() => setActiveTab("consultants")}
            >
              <Users className="mr-2 h-5 w-5" />
              {t("legalhub.cta.findLawyer")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-cyan-600 hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t("legalhub.cta.call")}
            </Button>
          </div>
        </div>

        {/* QR Code — scan to visit the site */}
        <div className="flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
            <QrCode
             value="https://ontimemaritime.com/legal-hub"
              size={160}
              logoSrc="/logo.png" // optional — remove if you don't have one
            />
          </div>
          <p className="text-white/60 text-xs text-center mt-2">
            Scan to visit on mobile
          </p>
        </div>

      </div>
    </div>
  </div>
</section>

        {/* Consultant Detail Dialog */}
        {selectedConsultant && (
          <Dialog open={!!selectedConsultant} onOpenChange={() => dispatch(clearSelectedConsultant())}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="sr-only">
                <DialogTitle>{t("legalhub.dialog.title")}</DialogTitle>
                <DialogDescription>{t("legalhub.dialog.desc")}</DialogDescription>
              </DialogHeader>

              {/* Header Banner */}
              <div className="relative h-32 -mx-6 -mt-6 mb-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" viewBox="0 0 600 128" preserveAspectRatio="none">
                    <path fill="currentColor" className="text-cyan-400" d="M0,64 Q150,32 300,64 T600,64 L600,128 L0,128 Z" opacity="0.4" />
                  </svg>
                </div>
              </div>

              <div className="px-2">
                {/* Profile Header */}
                <div className="flex items-end gap-6 -mt-16 mb-6 relative z-10">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-2xl">
                    <AvatarImage src={selectedConsultant.avatar} alt={selectedConsultant.name} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-2xl font-bold">
                      {selectedConsultant.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-slate-900">{selectedConsultant.name}</h2>
                      {selectedConsultant.available ? (
                        <Badge className="bg-emerald-500 text-white">
                          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                          {t("legalhub.dialog.availableNow")}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{t("legalhub.dialog.currentlyBusy")}</Badge>
                      )}
                    </div>
                    <p className="text-slate-600">{selectedConsultant.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i <= Math.floor(selectedConsultant.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
                          />
                        ))}
                        <span className="font-semibold ml-1">{selectedConsultant.rating}</span>
                        <span className="text-slate-500">({selectedConsultant.reviewCount} {t("legalhub.consultants.reviews")})</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{selectedConsultant.experience} {t("legalhub.dialog.yearsExp")}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">{t("legalhub.dialog.about")}</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedConsultant.bio}</p>
                </div>

                {/* Specializations & Jurisdictions */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-cyan-500" />
                      {t("legalhub.dialog.specializations")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedConsultant.specialization.map((spec) => (
                        <Badge key={spec} variant="outline" className="bg-white">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      {t("legalhub.dialog.jurisdictions")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedConsultant.jurisdiction.map((j) => (
                        <Badge key={j} className="bg-blue-100 text-blue-700 border-0">
                          <MapPin className="h-3 w-3 mr-1" />
                          {j}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Card */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">{t("legalhub.dialog.consultationRate")}</div>
                      <div className="text-3xl font-bold text-white">
                        ${selectedConsultant.hourlyRate}
                        <span className="text-lg text-slate-400 font-normal">{t("legalhub.dialog.perHour")}</span>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl px-8 shadow-lg shadow-cyan-500/30"
                      onClick={() => handleBookConsultation(selectedConsultant)}
                    >
                      {t("legalhub.dialog.bookConsultation")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl">
                    <Mail className="h-4 w-4 mr-2" />
                    {selectedConsultant.email}
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 rounded-xl">
                    <Phone className="h-4 w-4 mr-2" />
                    {selectedConsultant.phone}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Coming Soon Modal */}
        <ComingSoonModal
          open={comingSoon.open}
          featureName={comingSoon.feature}
          onClose={() => setComingSoon({ open: false })}
        />

        {/* Paystack Payment Component */}
        <PaystackPayment
          isOpen={isPaymentOpen}
          setIsOpen={(open) => {
            if (!open) {
              closePayment()
            } else {
              setIsPaymentOpen(open)
            }
          }}
          amount={paymentConfig.amount}
          serviceName={paymentConfig.serviceName}
          consultantName={paymentConfig.consultantName}
          email={paymentConfig.email}
          onSuccess={(reference) => {
            console.log("Payment successful:", reference)
            // Handle successful payment - e.g., create booking, send confirmation
          }}
          onClose={() => {
            console.log("Payment closed")
            closePayment()
          }}
        />
      </main>

      <Footer />
    </div>
  )
}