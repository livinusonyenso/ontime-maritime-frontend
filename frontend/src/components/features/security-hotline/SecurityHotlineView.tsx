"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { addReport, selectReport, clearSelectedReport, resetSubmissionSuccess } from "@/store/slices/securitySlice"
import {
  Shield,
  Phone,
  AlertTriangle,
  FileWarning,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Siren,
  Eye,
  Send,
  PhoneCall,
  Mail,
  Building2,
  Globe,
  Anchor,
  FileSearch,
} from "lucide-react"

export function SecurityHotlineView() {
  const dispatch = useAppDispatch()
  const { reports, contacts, selectedReport, submissionSuccess } = useAppSelector((state) => state.security)
  const [activeTab, setActiveTab] = useState("report")

  // Form state
  const [reportForm, setReportForm] = useState({
    type: "" as "fraud" | "piracy" | "missing_shipment" | "fake_documents" | "scam" | "other",
    urgency: "medium" as "low" | "medium" | "high" | "critical",
    agency: "maritime_police" as "maritime_police" | "efcc" | "coast_guard",
    title: "",
    description: "",
    location: "",
    evidence: [] as string[],
    reporterContact: {
      name: "",
      email: "",
      phone: "",
      anonymous: false,
    },
  })

  const handleSubmitReport = () => {
    if (!reportForm.type || !reportForm.title || !reportForm.description) {
      return
    }

    dispatch(addReport(reportForm))

    // Reset form
    setReportForm({
      type: "" as any,
      urgency: "medium",
      agency: "maritime_police",
      title: "",
      description: "",
      location: "",
      evidence: [],
      reporterContact: {
        name: "",
        email: "",
        phone: "",
        anonymous: false,
      },
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500"
      case "acknowledged":
        return "bg-yellow-500"
      case "investigating":
        return "bg-purple-500"
      case "resolved":
        return "bg-green-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fraud":
        return <FileWarning className="h-5 w-5" />
      case "piracy":
        return <Anchor className="h-5 w-5" />
      case "missing_shipment":
        return <FileSearch className="h-5 w-5" />
      case "fake_documents":
        return <AlertCircle className="h-5 w-5" />
      case "scam":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500/10 via-background to-orange-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full mb-6">
              <Siren className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-600">Security & Enforcement Hotline</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Report Maritime Crimes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Quick-response hotline for reporting maritime-related crimes including fraud, piracy, 
              missing shipments, fake documents, and maritime scams.
            </p>

            {/* Emergency Contacts Banner */}
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center justify-center gap-2">
                <PhoneCall className="h-5 w-5" />
                Emergency Contacts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold">Maritime Police</div>
                  <a href="tel:+2341790123" className="text-red-600 hover:underline">
                    +234-1-790-1234
                  </a>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">EFCC</div>
                  <a href="tel:+2341844555" className="text-red-600 hover:underline">
                    +234-1-844-5555
                  </a>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">Coast Guard</div>
                  <a href="tel:+2341263000" className="text-red-600 hover:underline">
                    +234-1-263-0001
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="report" className="gap-2">
                <AlertTriangle className="h-4 w-4" /> Report Incident
              </TabsTrigger>
              <TabsTrigger value="my-reports" className="gap-2">
                <Eye className="h-4 w-4" /> My Reports
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-2">
                <Phone className="h-4 w-4" /> Agency Contacts
              </TabsTrigger>
            </TabsList>

            {/* Report Incident Tab */}
            <TabsContent value="report">
              <div className="max-w-3xl mx-auto">
                {submissionSuccess && (
                  <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-green-600">Report Submitted Successfully</div>
                      <div className="text-sm text-green-600/80">
                        Your report has been submitted. You will receive a case number via email.
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dispatch(resetSubmissionSuccess())}
                      className="ml-auto"
                    >
                      Dismiss
                    </Button>
                  </div>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>File a Report</CardTitle>
                    <CardDescription>
                      Provide details about the maritime incident you want to report.
                      All reports are handled confidentially.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Incident Type & Urgency */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Incident Type *</Label>
                        <Select
                          value={reportForm.type}
                          onValueChange={(value: any) =>
                            setReportForm({ ...reportForm, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fraud">
                              <div className="flex items-center gap-2">
                                <FileWarning className="h-4 w-4" /> Fraud
                              </div>
                            </SelectItem>
                            <SelectItem value="piracy">
                              <div className="flex items-center gap-2">
                                <Anchor className="h-4 w-4" /> Piracy
                              </div>
                            </SelectItem>
                            <SelectItem value="missing_shipment">
                              <div className="flex items-center gap-2">
                                <FileSearch className="h-4 w-4" /> Missing Shipment
                              </div>
                            </SelectItem>
                            <SelectItem value="fake_documents">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" /> Fake Documents
                              </div>
                            </SelectItem>
                            <SelectItem value="scam">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" /> Maritime Scam
                              </div>
                            </SelectItem>
                            <SelectItem value="other">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" /> Other
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Urgency Level</Label>
                        <Select
                          value={reportForm.urgency}
                          onValueChange={(value: any) =>
                            setReportForm({ ...reportForm, urgency: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical - Immediate Action Required</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Reporting Agency */}
                    <div>
                      <Label>Report To *</Label>
                      <Select
                        value={reportForm.agency}
                        onValueChange={(value: any) =>
                          setReportForm({ ...reportForm, agency: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maritime_police">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" /> Nigerian Maritime Police
                            </div>
                          </SelectItem>
                          <SelectItem value="efcc">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4" /> EFCC Maritime Fraud Unit
                            </div>
                          </SelectItem>
                          <SelectItem value="coast_guard">
                            <div className="flex items-center gap-2">
                              <Anchor className="h-4 w-4" /> Nigerian Navy Coast Guard
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <Label>Incident Title *</Label>
                      <Input
                        value={reportForm.title}
                        onChange={(e) =>
                          setReportForm({ ...reportForm, title: e.target.value })
                        }
                        placeholder="Brief title describing the incident"
                      />
                    </div>

                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        value={reportForm.description}
                        onChange={(e) =>
                          setReportForm({ ...reportForm, description: e.target.value })
                        }
                        placeholder="Provide detailed information about the incident..."
                        rows={5}
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={reportForm.location}
                        onChange={(e) =>
                          setReportForm({ ...reportForm, location: e.target.value })
                        }
                        placeholder="Where did this incident occur?"
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">Your Contact Information</h4>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="anonymous"
                            checked={reportForm.reporterContact.anonymous}
                            onCheckedChange={(checked) =>
                              setReportForm({
                                ...reportForm,
                                reporterContact: {
                                  ...reportForm.reporterContact,
                                  anonymous: checked as boolean,
                                },
                              })
                            }
                          />
                          <Label htmlFor="anonymous" className="text-sm">
                            Submit anonymously
                          </Label>
                        </div>
                      </div>

                      {!reportForm.reporterContact.anonymous && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={reportForm.reporterContact.name}
                              onChange={(e) =>
                                setReportForm({
                                  ...reportForm,
                                  reporterContact: {
                                    ...reportForm.reporterContact,
                                    name: e.target.value,
                                  },
                                })
                              }
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={reportForm.reporterContact.email}
                              onChange={(e) =>
                                setReportForm({
                                  ...reportForm,
                                  reporterContact: {
                                    ...reportForm.reporterContact,
                                    email: e.target.value,
                                  },
                                })
                              }
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={reportForm.reporterContact.phone}
                              onChange={(e) =>
                                setReportForm({
                                  ...reportForm,
                                  reporterContact: {
                                    ...reportForm.reporterContact,
                                    phone: e.target.value,
                                  },
                                })
                              }
                              placeholder="+234..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleSubmitReport}
                      disabled={!reportForm.type || !reportForm.title || !reportForm.description}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* My Reports Tab */}
            <TabsContent value="my-reports">
              <div className="grid gap-4">
                {reports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="bg-red-100 dark:bg-red-950/30 p-3 rounded-lg text-red-600">
                            {getTypeIcon(report.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{report.title}</h3>
                              <Badge className={`${getStatusColor(report.status)} text-white capitalize`}>
                                {report.status}
                              </Badge>
                              <Badge className={`${getUrgencyColor(report.urgency)} text-white capitalize`}>
                                {report.urgency}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Case #: {report.caseNumber}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {report.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {report.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(report.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => dispatch(selectReport(report.id))}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {reports.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No Reports Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't submitted any reports yet.
                      </p>
                      <Button onClick={() => setActiveTab("report")}>
                        File a Report
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Agency Contacts Tab */}
            <TabsContent value="contacts">
              <div className="grid gap-6 md:grid-cols-2">
                {contacts.map((contact, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{contact.agency}</CardTitle>
                        {contact.available24x7 && (
                          <Badge className="bg-green-500 text-white">24/7</Badge>
                        )}
                      </div>
                      <CardDescription>{contact.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{contact.region}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`tel:${contact.phone}`}>
                          <PhoneCall className="h-4 w-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Report Detail Dialog */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => dispatch(clearSelectedReport())}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getTypeIcon(selectedReport.type)}
                {selectedReport.title}
              </DialogTitle>
              <DialogDescription>
                Case #: {selectedReport.caseNumber}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(selectedReport.status)} text-white capitalize`}>
                  {selectedReport.status}
                </Badge>
                <Badge className={`${getUrgencyColor(selectedReport.urgency)} text-white capitalize`}>
                  {selectedReport.urgency} Urgency
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {selectedReport.type.replace("_", " ")}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground">{selectedReport.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Reported To</h4>
                  <p className="text-muted-foreground capitalize">
                    {selectedReport.agency.replace("_", " ")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Submitted:</span>{" "}
                  {new Date(selectedReport.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>{" "}
                  {new Date(selectedReport.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
