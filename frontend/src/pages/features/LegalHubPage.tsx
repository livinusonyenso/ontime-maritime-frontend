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
  DollarSign,
  Users,
  Briefcase,
  Crown,
  ArrowRight,
  ExternalLink,
} from "lucide-react"

export default function LegalHubPage() {
  const dispatch = useAppDispatch()
  const { consultants, templates, services, resources, selectedConsultant, searchQuery, filterCategory } =
    useAppSelector((state) => state.legalHub)
  const [activeTab, setActiveTab] = useState("consultants")

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Scale className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Legal Chamber Maritime</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Maritime Legal & Compliance Hub
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                For MarineTech Associates
              </p>
              <p className="text-muted-foreground mb-8">
                Access verified maritime lawyers, legal templates, compliance consulting, 
                and educational resources for all your maritime legal needs.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search consultants, templates, or resources..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{consultants.length}+</div>
                <div className="text-sm text-muted-foreground">Verified Lawyers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{templates.length}+</div>
                <div className="text-sm text-muted-foreground">Legal Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Jurisdictions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="consultants" className="gap-2">
                  <Users className="h-4 w-4" /> Consultants
                </TabsTrigger>
                <TabsTrigger value="templates" className="gap-2">
                  <FileText className="h-4 w-4" /> Templates
                </TabsTrigger>
                <TabsTrigger value="services" className="gap-2">
                  <Briefcase className="h-4 w-4" /> Services
                </TabsTrigger>
                <TabsTrigger value="resources" className="gap-2">
                  <BookOpen className="h-4 w-4" /> Resources
                </TabsTrigger>
              </TabsList>

              {/* Consultants Tab */}
              <TabsContent value="consultants">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredConsultants.map((consultant) => (
                    <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={consultant.avatar} alt={consultant.name} />
                            <AvatarFallback>
                              {consultant.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{consultant.name}</h3>
                              {consultant.available ? (
                                <Badge className="bg-green-500 text-white">Available</Badge>
                              ) : (
                                <Badge variant="secondary">Busy</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{consultant.title}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{consultant.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({consultant.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Specializations</div>
                            <div className="flex flex-wrap gap-1">
                              {consultant.specialization.map((spec) => (
                                <Badge key={spec} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Jurisdictions</div>
                            <div className="flex flex-wrap gap-1">
                              {consultant.jurisdiction.map((j) => (
                                <Badge key={j} variant="secondary" className="text-xs">
                                  <Globe className="h-3 w-3 mr-1" />
                                  {j}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <div className="text-xs text-muted-foreground">Experience</div>
                              <div className="font-medium">{consultant.experience} years</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-muted-foreground">Hourly Rate</div>
                              <div className="font-medium text-primary">
                                ${consultant.hourlyRate}/hr
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          className="w-full"
                          onClick={() => dispatch(selectConsultant(consultant.id))}
                        >
                          View Profile
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates">
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filterCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => dispatch(setFilterCategory("all"))}
                    >
                      All
                    </Button>
                    <Button
                      variant={filterCategory === "charterparty" ? "default" : "outline"}
                      size="sm"
                      onClick={() => dispatch(setFilterCategory("charterparty"))}
                    >
                      Charterparty
                    </Button>
                    <Button
                      variant={filterCategory === "bol" ? "default" : "outline"}
                      size="sm"
                      onClick={() => dispatch(setFilterCategory("bol"))}
                    >
                      Bill of Lading
                    </Button>
                    <Button
                      variant={filterCategory === "nvocc" ? "default" : "outline"}
                      size="sm"
                      onClick={() => dispatch(setFilterCategory("nvocc"))}
                    >
                      NVOCC
                    </Button>
                    <Button
                      variant={filterCategory === "compliance" ? "default" : "outline"}
                      size="sm"
                      onClick={() => dispatch(setFilterCategory("compliance"))}
                    >
                      Compliance
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{template.name}</h3>
                                {template.premium && (
                                  <Badge className="bg-yellow-500 text-white">
                                    <Crown className="h-3 w-3 mr-1" /> Premium
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {template.description}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="capitalize">
                                  {template.category}
                                </Badge>
                                <span className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {template.downloads.toLocaleString()} downloads
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => dispatch(incrementTemplateDownloads(template.id))}
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
                  {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">
                            {service.type.replace("_", " ")}
                          </Badge>
                          <div className="text-2xl font-bold text-primary">
                            ${service.price.toLocaleString()}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          Duration: {service.duration}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Request Service</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources">
                <div className="grid gap-4">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${
                              resource.type === "article" ? "bg-blue-100" :
                              resource.type === "checklist" ? "bg-green-100" :
                              resource.type === "guide" ? "bg-purple-100" :
                              "bg-yellow-100"
                            }`}>
                              {resource.type === "article" && <BookOpen className="h-6 w-6 text-blue-600" />}
                              {resource.type === "checklist" && <CheckCircle2 className="h-6 w-6 text-green-600" />}
                              {resource.type === "guide" && <GraduationCap className="h-6 w-6 text-purple-600" />}
                              {resource.type === "framework" && <Scale className="h-6 w-6 text-yellow-600" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{resource.title}</h3>
                                {resource.premium && (
                                  <Badge className="bg-yellow-500 text-white">
                                    <Crown className="h-3 w-3 mr-1" /> Premium
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {resource.summary}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <Badge variant="outline">{resource.category}</Badge>
                                <span>Published: {new Date(resource.publishDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Access
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Consultant Detail Dialog */}
        {selectedConsultant && (
          <Dialog open={!!selectedConsultant} onOpenChange={() => dispatch(clearSelectedConsultant())}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Consultant Profile</DialogTitle>
                <DialogDescription>
                  Maritime Legal Expert
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="flex items-start gap-6 mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedConsultant.avatar} alt={selectedConsultant.name} />
                    <AvatarFallback>
                      {selectedConsultant.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedConsultant.name}</h2>
                        <p className="text-muted-foreground">{selectedConsultant.title}</p>
                      </div>
                      {selectedConsultant.available ? (
                        <Badge className="bg-green-500 text-white">Available Now</Badge>
                      ) : (
                        <Badge variant="secondary">Currently Busy</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{selectedConsultant.rating}</span>
                        <span className="text-muted-foreground">
                          ({selectedConsultant.reviewCount} reviews)
                        </span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span>{selectedConsultant.experience} years experience</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-muted-foreground">{selectedConsultant.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedConsultant.specialization.map((spec) => (
                        <Badge key={spec} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Jurisdictions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedConsultant.jurisdiction.map((j) => (
                        <Badge key={j} variant="secondary">
                          <Globe className="h-3 w-3 mr-1" />
                          {j}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Consultation Rate</div>
                      <div className="text-2xl font-bold text-primary">
                        ${selectedConsultant.hourlyRate}/hour
                      </div>
                    </div>
                    <Button size="lg">
                      Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {selectedConsultant.email}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    {selectedConsultant.phone}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <Footer />
    </div>
  )
}
