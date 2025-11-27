"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  setFilterCategory,
  setFilterType,
  setSearchQuery,
} from "@/store/slices/knowledgeSlice"
import {
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Search,
  GraduationCap,
  Shield,
  Anchor,
  Globe,
  FileCheck,
  Truck,
  ScrollText,
  ClipboardCheck,
  Library,
  ArrowRight,
  Calendar,
  HardDrive,
  Link2,
} from "lucide-react"

export default function KnowledgePage() {
  const dispatch = useAppDispatch()
  const { resources, filterCategory, filterType, searchQuery } = useAppSelector(
    (state) => state.knowledge
  )
  const [activeTab, setActiveTab] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      filterCategory === "all" || resource.category === filterCategory
    const matchesType = filterType === "all" || resource.type === filterType
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "imo":
        return <Anchor className="h-5 w-5" />
      case "customs":
        return <FileCheck className="h-5 w-5" />
      case "ais":
        return <Globe className="h-5 w-5" />
      case "safety":
        return <Shield className="h-5 w-5" />
      case "compliance":
        return <ClipboardCheck className="h-5 w-5" />
      case "operations":
        return <Truck className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "guide":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "policy":
        return <ScrollText className="h-5 w-5 text-purple-500" />
      case "training":
        return <GraduationCap className="h-5 w-5 text-green-500" />
      case "external_link":
        return <Link2 className="h-5 w-5 text-orange-500" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const externalLinks = [
    {
      name: "International Maritime Organization (IMO)",
      url: "https://www.imo.org",
      description: "Official IMO website with conventions, regulations, and maritime safety standards.",
      icon: <Anchor className="h-6 w-6" />,
    },
    {
      name: "Nigeria Customs Service",
      url: "https://www.customs.gov.ng",
      description: "Official NCS portal for tariffs, regulations, and clearance procedures.",
      icon: <FileCheck className="h-6 w-6" />,
    },
    {
      name: "MarineTraffic AIS",
      url: "https://www.marinetraffic.com",
      description: "Global ship tracking and maritime information.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      name: "NIMASA",
      url: "https://nimasa.gov.ng",
      description: "Nigerian Maritime Administration and Safety Agency.",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  const categories = [
    { id: "all", label: "All", icon: <Library className="h-4 w-4" /> },
    { id: "imo", label: "IMO", icon: <Anchor className="h-4 w-4" /> },
    { id: "customs", label: "Customs", icon: <FileCheck className="h-4 w-4" /> },
    { id: "ais", label: "AIS Standards", icon: <Globe className="h-4 w-4" /> },
    { id: "safety", label: "Safety", icon: <Shield className="h-4 w-4" /> },
    { id: "compliance", label: "Compliance", icon: <ClipboardCheck className="h-4 w-4" /> },
    { id: "operations", label: "Operations", icon: <Truck className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Knowledge & Guidance</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Maritime Learning Center
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access PDF manuals, guides, policies, training documents, and external links 
                to IMO, customs, and AIS standards.
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
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
                <div className="text-3xl font-bold text-primary">
                  {resources.filter((r) => r.type === "pdf").length}
                </div>
                <div className="text-sm text-muted-foreground">PDF Documents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {resources.filter((r) => r.type === "guide").length}
                </div>
                <div className="text-sm text-muted-foreground">Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {resources.filter((r) => r.type === "training").length}
                </div>
                <div className="text-sm text-muted-foreground">Training Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {resources.filter((r) => r.type === "external_link").length}
                </div>
                <div className="text-sm text-muted-foreground">External Resources</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={filterCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => dispatch(setFilterCategory(cat.id))}
                  className="whitespace-nowrap"
                >
                  {cat.icon}
                  <span className="ml-2">{cat.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="all" className="gap-2">
                  <Library className="h-4 w-4" /> All Resources
                </TabsTrigger>
                <TabsTrigger value="documents" className="gap-2">
                  <FileText className="h-4 w-4" /> Documents
                </TabsTrigger>
                <TabsTrigger value="training" className="gap-2">
                  <GraduationCap className="h-4 w-4" /> Training
                </TabsTrigger>
                <TabsTrigger value="external" className="gap-2">
                  <ExternalLink className="h-4 w-4" /> External Links
                </TabsTrigger>
              </TabsList>

              {/* All Resources */}
              <TabsContent value="all">
                <div className="grid gap-4">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="bg-muted p-3 rounded-lg">
                              {getTypeIcon(resource.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{resource.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {resource.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                <Badge variant="outline" className="capitalize">
                                  {resource.category}
                                </Badge>
                                <Badge variant="secondary" className="capitalize">
                                  {resource.type.replace("_", " ")}
                                </Badge>
                                {resource.fileSize && (
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <HardDrive className="h-3 w-3" />
                                    {resource.fileSize}
                                  </span>
                                )}
                                {resource.pages && (
                                  <span className="text-muted-foreground">
                                    {resource.pages} pages
                                  </span>
                                )}
                                {resource.externalSource && (
                                  <span className="text-muted-foreground">
                                    Source: {resource.externalSource}
                                  </span>
                                )}
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(resource.updatedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant={resource.type === "external_link" ? "outline" : "default"}
                            onClick={() => {
                              if (resource.type === "external_link") {
                                window.open(resource.url, "_blank")
                              }
                            }}
                          >
                            {resource.type === "external_link" ? (
                              <>
                                Visit <ExternalLink className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <Download className="mr-2 h-4 w-4" /> Download
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Documents */}
              <TabsContent value="documents">
                <div className="grid gap-4">
                  {filteredResources
                    .filter((r) => r.type === "pdf" || r.type === "guide" || r.type === "policy")
                    .map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="bg-red-100 dark:bg-red-950/30 p-3 rounded-lg">
                                <FileText className="h-6 w-6 text-red-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold mb-1">{resource.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {resource.description}
                                </p>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <Badge variant="outline">{resource.category}</Badge>
                                  {resource.fileSize && <span>{resource.fileSize}</span>}
                                  {resource.pages && <span>{resource.pages} pages</span>}
                                </div>
                              </div>
                            </div>
                            <Button>
                              <Download className="mr-2 h-4 w-4" /> Download PDF
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Training */}
              <TabsContent value="training">
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredResources
                    .filter((r) => r.type === "training")
                    .map((resource) => (
                      <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 dark:bg-green-950/30 p-3 rounded-lg">
                              <GraduationCap className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <CardDescription>{resource.category}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {resource.pages && `${resource.pages} pages`}
                              {resource.fileSize && ` • ${resource.fileSize}`}
                            </div>
                            <Button>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {filteredResources.filter((r) => r.type === "training").length === 0 && (
                    <Card className="col-span-2">
                      <CardContent className="py-12 text-center">
                        <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No Training Materials Found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or category filter.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* External Links */}
              <TabsContent value="external">
                <div className="grid gap-6 md:grid-cols-2">
                  {externalLinks.map((link, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{link.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {link.description}
                            </p>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.open(link.url, "_blank")}
                            >
                              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Additional External Resources from DB */}
                  {filteredResources
                    .filter((r) => r.type === "external_link")
                    .map((resource) => (
                      <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-950/30 p-3 rounded-lg">
                              <Link2 className="h-6 w-6 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mb-1">
                                {resource.description}
                              </p>
                              {resource.externalSource && (
                                <p className="text-xs text-muted-foreground mb-3">
                                  Source: {resource.externalSource}
                                </p>
                              )}
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => window.open(resource.url, "_blank")}
                              >
                                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Anchor className="h-10 w-10 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-1">IMO Guidelines</h3>
                <p className="text-sm text-muted-foreground">Maritime safety standards</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <FileCheck className="h-10 w-10 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-1">Customs Procedures</h3>
                <p className="text-sm text-muted-foreground">Clearance documentation</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Shield className="h-10 w-10 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-1">ISPS Code</h3>
                <p className="text-sm text-muted-foreground">Security compliance</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Globe className="h-10 w-10 mx-auto text-primary mb-3" />
                <h3 className="font-semibold mb-1">AIS Standards</h3>
                <p className="text-sm text-muted-foreground">Tracking protocols</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
