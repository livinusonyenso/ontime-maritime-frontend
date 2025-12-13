"use client"

import { useState } from "react"
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
  selectConsultant,
  clearSelectedConsultant,
  setSearchQuery,
  setFilterCategory,
  incrementTemplateDownloads,
} from "@/store/slices/legalHubSlice"
import { PaystackPayment, usePaystackPayment } from  "@/components/payments/PaystackPayment"
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
  Play,
  ChevronRight,
  MapPin,
  Calendar,
  Waves,
  Compass,
} from "lucide-react"

export default function LegalHubPage() {
  const dispatch = useAppDispatch()
  const { consultants, templates, services, resources, selectedConsultant, searchQuery, filterCategory } =
    useAppSelector((state) => state.legalHub)
  const [activeTab, setActiveTab] = useState("consultants")
  
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

  const filteredTemplates = templates.filter(
    (t) =>
      filterCategory === "all" || t.category === filterCategory
  )

  const filteredResources = resources.filter(
    (r) =>
      filterCategory === "all" ||
      r.category.toLowerCase().includes(filterCategory.toLowerCase())
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
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070"
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
        <span className="text-cyan-400 font-semibold">Legal Chamber Maritime</span>
        <span className="text-white/60">• Est. 2015</span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-bold leading-tight">
        Maritime Legal Expertise
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          You Can Trust
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-lg text-slate-300 max-w-xl">
        Specialist legal counsel for shipping, offshore operations, cargo claims,
        and international maritime disputes.
      </p>

      {/* Primary CTA */}
      <Button
        size="lg"
        className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-6 text-lg rounded-xl shadow-lg"
        onClick={scrollToConsultants}
      >
        <Users className="mr-2 h-5 w-5" />
        Speak to a Maritime Lawyer
      </Button>
    </div>

    {/* QUICK LEGAL SEARCH */}
    <div className="hidden lg:block">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-3">
          Find Legal Help Instantly
        </h3>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search shipping law, cargo claims, P&I insurance…"
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
          Search Lawyers
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
                  <div className="text-3xl font-bold text-white">{consultants.length}+</div>
                  <div className="text-sm text-slate-400">Verified Maritime Lawyers</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{templates.length}+</div>
                  <div className="text-sm text-slate-400">Legal Templates</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-slate-400">Global Jurisdictions</div>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-slate-700" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-slate-400">Emergency Support</div>
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
                Our Expertise
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Maritime Legal Practice Areas
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive legal coverage across all aspects of maritime and shipping law
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Ship,
                  title: "Shipping & Charterparty",
                  description: "Voyage charters, time charters, and bareboat agreements",
                  color: "cyan",
                  image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=400"
                },
                {
                  icon: Briefcase,
                  title: "Cargo & Trade",
                  description: "Bills of lading, cargo claims, and trade finance",
                  color: "blue",
                  image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=400"
                },
                {
                  icon: Shield,
                  title: "Marine Insurance",
                  description: "P&I coverage, hull insurance, and claims handling",
                  color: "teal",
                  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400"
                },
                {
                  icon: Anchor,
                  title: "Maritime Disputes",
                  description: "Arbitration, litigation, and dispute resolution",
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
                      Learn More <ChevronRight className="ml-1 h-4 w-4" />
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
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    Legal Resources & Services
                  </h2>
                  <p className="text-slate-600">Everything you need for maritime legal compliance</p>
                </div>
                <TabsList className="bg-white shadow-md p-1.5 rounded-xl">
                  <TabsTrigger 
                    value="consultants" 
                    className="gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <Users className="h-4 w-4" /> Lawyers
                  </TabsTrigger>
                  <TabsTrigger 
                    value="templates" 
                    className="gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <FileText className="h-4 w-4" /> Templates
                  </TabsTrigger>
                  <TabsTrigger 
                    value="services" 
                    className="gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <Briefcase className="h-4 w-4" /> Services
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resources" 
                    className="gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                  >
                    <BookOpen className="h-4 w-4" /> Resources
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
                      <h3 className="text-2xl font-bold text-slate-900">Expert Maritime Lawyers</h3>
                      <p className="text-slate-600">Verified legal professionals specializing in maritime law</p>
                    </div>
                  </div>
                  
                  {/* Search for mobile */}
                  <div className="lg:hidden relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      placeholder="Search lawyers by name or specialization..."
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      className="pl-12 h-14 rounded-xl"
                    />
                  </div>
                </div>

                {filteredConsultants.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                      <Search className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      No Lawyers Found
                    </h3>
                    <p className="text-slate-600 text-center max-w-md mb-6">
                      We couldn't find any maritime lawyers matching "{searchQuery}". 
                      Please try a different search term or contact our representative for personalized assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <Button
                        variant="outline"
                        onClick={() => dispatch(setSearchQuery(""))}
                        className="rounded-xl px-6"
                      >
                        Clear Search
                      </Button>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="h-5 w-5 text-cyan-600" />
                        <span className="font-semibold">Call us:</span>
                        <a 
                          href="tel:+2348000000000" 
                          className="text-cyan-600 hover:text-cyan-700 font-bold"
                        >
                          +234 800 000 0000
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
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
                              Available
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-600 text-white">Busy</Badge>
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
                          <span className="text-sm text-slate-500">({consultant.reviewCount} reviews)</span>
                        </div>

                        {/* Specializations */}
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Specializations</div>
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
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Jurisdictions</div>
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
                            <div className="text-xs text-slate-500">Experience</div>
                            <div className="font-bold text-slate-900">{consultant.experience} years</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500">Hourly Rate</div>
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
                          View Full Profile
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
                <div className="mb-8">
                  <div className="flex flex-wrap gap-3">
                    {[
                      { key: "all", label: "All Templates" },
                      { key: "charterparty", label: "Charterparty" },
                      { key: "bol", label: "Bill of Lading" },
                      { key: "nvocc", label: "NVOCC" },
                      { key: "compliance", label: "Compliance" },
                    ].map((filter) => (
                      <Button
                        key={filter.key}
                        variant={filterCategory === filter.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => dispatch(setFilterCategory(filter.key))}
                        className={filterCategory === filter.key 
                          ? "bg-cyan-500 hover:bg-cyan-600 rounded-full px-6" 
                          : "rounded-full px-6"
                        }
                      >
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  {filteredTemplates.map((template, index) => (
                    <Card key={template.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-start gap-5">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                              <FileText className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg text-slate-900">{template.name}</h3>
                                {template.premium && (
                                  <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                                    <Crown className="h-3 w-3 mr-1" /> Premium
                                  </Badge>
                                )}
                              </div>
                              <p className="text-slate-600 mb-3">{template.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <Badge variant="outline" className="capitalize rounded-full">
                                  {template.category}
                                </Badge>
                                <span className="flex items-center gap-1 text-slate-500">
                                  <Download className="h-4 w-4" />
                                  {template.downloads.toLocaleString()} downloads
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => dispatch(incrementTemplateDownloads(template.id))}
                            className="bg-slate-900 hover:bg-slate-800 rounded-xl px-6"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services">
                <div className="grid gap-6 md:grid-cols-2">
                  {services.map((service, index) => (
                    <Card 
                      key={service.id} 
                      className="bg-white border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                    >
                      <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500" />
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="capitalize rounded-full">
                            {service.type.replace("_", " ")}
                          </Badge>
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                              ${service.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="flex items-center gap-3 text-slate-600 bg-slate-50 px-4 py-3 rounded-xl">
                          <Clock className="h-5 w-5 text-cyan-500" />
                          <span>Duration: <strong>{service.duration}</strong></span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl h-12 shadow-md"
                          onClick={() => handleServicePurchase(service)}
                        >
                          Request Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources">
                <div className="grid gap-4">
                  {filteredResources.map((resource) => {
                    const iconConfig = {
                      article: { icon: BookOpen, bg: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/30" },
                      checklist: { icon: CheckCircle2, bg: "from-emerald-500 to-green-600", shadow: "shadow-emerald-500/30" },
                      guide: { icon: GraduationCap, bg: "from-purple-500 to-violet-600", shadow: "shadow-purple-500/30" },
                      framework: { icon: Scale, bg: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
                    }
                    const config = iconConfig[resource.type as keyof typeof iconConfig] || iconConfig.article
                    const IconComponent = config.icon

                    return (
                      <Card key={resource.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                              <div className={`w-14 h-14 bg-gradient-to-br ${config.bg} rounded-2xl flex items-center justify-center shadow-lg ${config.shadow} flex-shrink-0`}>
                                <IconComponent className="h-7 w-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-bold text-lg text-slate-900">{resource.title}</h3>
                                  {resource.premium && (
                                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
                                      <Crown className="h-3 w-3 mr-1" /> Premium
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-slate-600 mb-3">{resource.summary}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <Badge variant="outline" className="rounded-full">{resource.category}</Badge>
                                  <span className="flex items-center gap-1 text-slate-500">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(resource.publishDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" className="rounded-xl px-6">
                              <Download className="h-4 w-4 mr-2" />
                              Access
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
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
                Client Testimonials
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                See what our clients say about their experience with Legal Chamber Maritime
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Their expertise in charterparty disputes saved our company millions. Exceptional legal counsel.",
                  author: "James Morrison",
                  role: "CEO, Atlantic Shipping Ltd",
                  avatar: "JM",
                  rating: 5
                },
                {
                  quote: "The team handled our complex P&I claim with professionalism and achieved an outstanding settlement.",
                  author: "Sarah Chen",
                  role: "Director, Pacific Maritime",
                  avatar: "SC",
                  rating: 5
                },
                {
                  quote: "Best maritime law firm we've worked with. Their knowledge of international regulations is unmatched.",
                  author: "Michael Okonkwo",
                  role: "Fleet Manager, Global Carriers",
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 rounded-3xl p-12 md:p-16">
              {/* Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              <Compass className="absolute top-10 right-10 h-32 w-32 text-white/10" />

              <div className="relative z-10 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Ready to Navigate Your Legal Challenges?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Schedule a consultation with our expert maritime lawyers today. 
                  Get the legal guidance you need to protect your interests.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-cyan-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-lg"
                    onClick={() => setActiveTab("consultants")}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Find a Lawyer
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 text-cyan-600 hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call: +234 808984499
                  </Button>
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
                <DialogTitle>Consultant Profile</DialogTitle>
                <DialogDescription>Maritime Legal Expert Profile</DialogDescription>
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
                          Available Now
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Currently Busy</Badge>
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
                        <span className="text-slate-500">({selectedConsultant.reviewCount} reviews)</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{selectedConsultant.experience} years experience</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">About</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedConsultant.bio}</p>
                </div>

                {/* Specializations & Jurisdictions */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 p-5 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-cyan-500" />
                      Specializations
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
                      Jurisdictions
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
                      <div className="text-slate-400 text-sm mb-1">Consultation Rate</div>
                      <div className="text-3xl font-bold text-white">
                        ${selectedConsultant.hourlyRate}
                        <span className="text-lg text-slate-400 font-normal">/hour</span>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl px-8 shadow-lg shadow-cyan-500/30"
                      onClick={() => handleBookConsultation(selectedConsultant)}
                    >
                      Book Consultation
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