"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  addBillOfLading,
  selectBol,
  clearSelectedBol,
  validateBol,
  addQuoteRequest,
} from "@/store/slices/billOfLadingSlice"
import {
  FileText,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Ship,
  Package,
  MapPin,
  Hash,
  Calendar,
  Plus,
  Search,
  Eye,
  Download,
  Link2,
  ArrowRight,
  Loader2,
} from "lucide-react"

export default function EBOLPage() {
  const dispatch = useAppDispatch()
  const { billsOfLading, selectedBol, quoteRequests, validationInProgress } = useAppSelector(
    (state) => state.billOfLading
  )
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isValidating, setIsValidating] = useState(false)

  // Form state for new BOL
  const [newBol, setNewBol] = useState({
    shipper: { name: "", address: "", email: "", phone: "" },
    consignee: { name: "", address: "", email: "", phone: "" },
    notifyParty: { name: "", address: "", email: "", phone: "" },
    vesselName: "",
    voyageNumber: "",
    portOfLoading: "",
    portOfDischarge: "",
    placeOfDelivery: "",
    dateOfShipment: "",
    cargoDescription: "",
    grossWeight: 0,
    weightUnit: "kg" as const,
    numberOfPackages: 0,
    packageType: "",
    containerNumber: "",
    sealNumber: "",
    freightCharges: 0,
    freightPayableAt: "origin" as const,
    declaredValue: 0,
  })

  const [newQuote, setNewQuote] = useState({
    originPort: "",
    destinationPort: "",
    cargoType: "",
    weight: 0,
    volume: 0,
    dangerous: false,
    perishable: false,
    requestDate: new Date().toISOString().split("T")[0],
  })

  const filteredBols = billsOfLading.filter(
    (bol) =>
      bol.bolNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bol.shipper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bol.consignee.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500"
      case "issued":
        return "bg-blue-500"
      case "verified":
        return "bg-green-500"
      case "transferred":
        return "bg-purple-500"
      case "surrendered":
        return "bg-orange-500"
      case "revoked":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getValidationStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "invalid":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const handleCreateBol = () => {
    dispatch(
      addBillOfLading({
        ...newBol,
        status: "draft",
        validationStatus: "pending",
        validationNotes: [],
      })
    )
    setShowCreateDialog(false)
    // Reset form
    setNewBol({
      shipper: { name: "", address: "", email: "", phone: "" },
      consignee: { name: "", address: "", email: "", phone: "" },
      notifyParty: { name: "", address: "", email: "", phone: "" },
      vesselName: "",
      voyageNumber: "",
      portOfLoading: "",
      portOfDischarge: "",
      placeOfDelivery: "",
      dateOfShipment: "",
      cargoDescription: "",
      grossWeight: 0,
      weightUnit: "kg",
      numberOfPackages: 0,
      packageType: "",
      containerNumber: "",
      sealNumber: "",
      freightCharges: 0,
      freightPayableAt: "origin",
      declaredValue: 0,
    })
  }

  const handleValidate = (bolId: string) => {
    setIsValidating(true)
    setTimeout(() => {
      dispatch(validateBol(bolId))
      setIsValidating(false)
    }, 2000)
  }

  const handleRequestQuote = () => {
    dispatch(addQuoteRequest(newQuote))
    setShowQuoteDialog(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Digital Bill of Lading</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Secure e-BOL System
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Create, verify, and validate Bills of Lading digitally with blockchain-based 
                authentication. Flat fee of $50 per BOL generated.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Create New BOL
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Bill of Lading</DialogTitle>
                      <DialogDescription>
                        Fill in the shipment details to generate a blockchain-verified BOL.
                        Fee: $50 per BOL.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                      {/* Shipper Details */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" /> Shipper Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={newBol.shipper.name}
                              onChange={(e) =>
                                setNewBol({
                                  ...newBol,
                                  shipper: { ...newBol.shipper, name: e.target.value },
                                })
                              }
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={newBol.shipper.email}
                              onChange={(e) =>
                                setNewBol({
                                  ...newBol,
                                  shipper: { ...newBol.shipper, email: e.target.value },
                                })
                              }
                              placeholder="email@company.com"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Address</Label>
                            <Input
                              value={newBol.shipper.address}
                              onChange={(e) =>
                                setNewBol({
                                  ...newBol,
                                  shipper: { ...newBol.shipper, address: e.target.value },
                                })
                              }
                              placeholder="Full address"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Consignee Details */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> Consignee Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={newBol.consignee.name}
                              onChange={(e) =>
                                setNewBol({
                                  ...newBol,
                                  consignee: { ...newBol.consignee, name: e.target.value },
                                })
                              }
                              placeholder="Company name"
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={newBol.consignee.email}
                              onChange={(e) =>
                                setNewBol({
                                  ...newBol,
                                  consignee: { ...newBol.consignee, email: e.target.value },
                                })
                              }
                              placeholder="email@company.com"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label>Address</Label>
                            <Input
                              value={newBol.consignee.address}
                              onChange={(e) =>
                                setNewBol({
                                  ...newBol,
                                  consignee: { ...newBol.consignee, address: e.target.value },
                                })
                              }
                              placeholder="Full address"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Voyage Details */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Ship className="h-4 w-4" /> Voyage Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Vessel Name</Label>
                            <Input
                              value={newBol.vesselName}
                              onChange={(e) =>
                                setNewBol({ ...newBol, vesselName: e.target.value })
                              }
                              placeholder="Vessel name"
                            />
                          </div>
                          <div>
                            <Label>Voyage Number</Label>
                            <Input
                              value={newBol.voyageNumber}
                              onChange={(e) =>
                                setNewBol({ ...newBol, voyageNumber: e.target.value })
                              }
                              placeholder="VOY-XXXX"
                            />
                          </div>
                          <div>
                            <Label>Port of Loading</Label>
                            <Input
                              value={newBol.portOfLoading}
                              onChange={(e) =>
                                setNewBol({ ...newBol, portOfLoading: e.target.value })
                              }
                              placeholder="Loading port"
                            />
                          </div>
                          <div>
                            <Label>Port of Discharge</Label>
                            <Input
                              value={newBol.portOfDischarge}
                              onChange={(e) =>
                                setNewBol({ ...newBol, portOfDischarge: e.target.value })
                              }
                              placeholder="Discharge port"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Cargo Details */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" /> Cargo Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label>Cargo Description</Label>
                            <Textarea
                              value={newBol.cargoDescription}
                              onChange={(e) =>
                                setNewBol({ ...newBol, cargoDescription: e.target.value })
                              }
                              placeholder="Detailed description of cargo"
                            />
                          </div>
                          <div>
                            <Label>Gross Weight (kg)</Label>
                            <Input
                              type="number"
                              value={newBol.grossWeight}
                              onChange={(e) =>
                                setNewBol({ ...newBol, grossWeight: Number(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label>Number of Packages</Label>
                            <Input
                              type="number"
                              value={newBol.numberOfPackages}
                              onChange={(e) =>
                                setNewBol({ ...newBol, numberOfPackages: Number(e.target.value) })
                              }
                            />
                          </div>
                          <div>
                            <Label>Container Number</Label>
                            <Input
                              value={newBol.containerNumber}
                              onChange={(e) =>
                                setNewBol({ ...newBol, containerNumber: e.target.value })
                              }
                              placeholder="XXXX0000000"
                            />
                          </div>
                          <div>
                            <Label>Seal Number</Label>
                            <Input
                              value={newBol.sealNumber}
                              onChange={(e) =>
                                setNewBol({ ...newBol, sealNumber: e.target.value })
                              }
                              placeholder="Seal number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4 inline" /> Fee: $50
                        </div>
                        <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateBol}>Generate BOL</Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline" className="gap-2">
                      <DollarSign className="h-5 w-5" />
                      Request Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Shipping Quote</DialogTitle>
                      <DialogDescription>
                        Get competitive quotes from multiple carriers for your shipment.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Origin Port</Label>
                          <Input
                            value={newQuote.originPort}
                            onChange={(e) =>
                              setNewQuote({ ...newQuote, originPort: e.target.value })
                            }
                            placeholder="e.g., HONG KONG"
                          />
                        </div>
                        <div>
                          <Label>Destination Port</Label>
                          <Input
                            value={newQuote.destinationPort}
                            onChange={(e) =>
                              setNewQuote({ ...newQuote, destinationPort: e.target.value })
                            }
                            placeholder="e.g., LOS ANGELES"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Cargo Type</Label>
                        <Input
                          value={newQuote.cargoType}
                          onChange={(e) =>
                            setNewQuote({ ...newQuote, cargoType: e.target.value })
                          }
                          placeholder="e.g., Electronics, Machinery"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Weight (kg)</Label>
                          <Input
                            type="number"
                            value={newQuote.weight}
                            onChange={(e) =>
                              setNewQuote({ ...newQuote, weight: Number(e.target.value) })
                            }
                          />
                        </div>
                        <div>
                          <Label>Volume (m³)</Label>
                          <Input
                            type="number"
                            value={newQuote.volume}
                            onChange={(e) =>
                              setNewQuote({ ...newQuote, volume: Number(e.target.value) })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowQuoteDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleRequestQuote}>Request Quote</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Blockchain Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Every BOL is secured with blockchain hash ensuring tamper-proof documentation.
                </p>
              </Card>
              <Card className="text-center p-6">
                <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Auto Validation</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic checks for manipulation, duplicates, and shipment inconsistencies.
                </p>
              </Card>
              <Card className="text-center p-6">
                <DollarSign className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Flat Fee: $50</h3>
                <p className="text-sm text-muted-foreground">
                  Simple, transparent pricing per BOL generated with no hidden charges.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* BOL List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Bills of Lading</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search BOL..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <TabsList>
                    <TabsTrigger value="overview">All BOLs</TabsTrigger>
                    <TabsTrigger value="quotes">Quotes</TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="overview">
                <div className="grid gap-4">
                  {filteredBols.map((bol) => (
                    <Card key={bol.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Hash className="h-5 w-5 text-primary" />
                              <span className="font-mono font-semibold">{bol.bolNumber}</span>
                              <Badge className={`${getStatusColor(bol.status)} text-white capitalize`}>
                                {bol.status}
                              </Badge>
                              <div className="flex items-center gap-1">
                                {getValidationStatusIcon(bol.validationStatus)}
                                <span className="text-sm capitalize">{bol.validationStatus}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Shipper</div>
                                <div className="font-medium">{bol.shipper.name}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Consignee</div>
                                <div className="font-medium">{bol.consignee.name}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Route</div>
                                <div className="font-medium">
                                  {bol.portOfLoading} → {bol.portOfDischarge}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Vessel</div>
                                <div className="font-medium">{bol.vesselName}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => dispatch(selectBol(bol.id))}
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                            {bol.validationStatus === "pending" && (
                              <Button
                                size="sm"
                                onClick={() => handleValidate(bol.id)}
                                disabled={isValidating}
                              >
                                {isValidating ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                )}
                                Validate
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" /> PDF
                            </Button>
                          </div>
                        </div>

                        {/* Blockchain Hash */}
                        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 text-xs">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Blockchain Hash:</span>
                            <code className="font-mono text-xs truncate">{bol.blockchainHash}</code>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="quotes">
                <div className="grid gap-4">
                  {quoteRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">
                              {request.originPort} → {request.destinationPort}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {request.cargoType} • {request.weight}kg • {request.volume}m³
                            </p>
                          </div>
                          <Badge variant={request.status === "quoted" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </div>

                        {request.quotes.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Received Quotes:</h4>
                            {request.quotes.map((quote) => (
                              <div
                                key={quote.id}
                                className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                              >
                                <div>
                                  <div className="font-medium">{quote.carrier}</div>
                                  <div className="text-sm text-muted-foreground">
                                    Transit: {quote.transitTime} days • Valid until:{" "}
                                    {new Date(quote.validUntil).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary">
                                    ${quote.price.toLocaleString()}
                                  </div>
                                  <Button size="sm" className="mt-1">
                                    Accept
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {quoteRequests.length === 0 && (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold mb-2">No Quote Requests</h3>
                        <p className="text-muted-foreground mb-4">
                          Request a shipping quote to get competitive rates from carriers.
                        </p>
                        <Button onClick={() => setShowQuoteDialog(true)}>
                          Request Quote
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Selected BOL Detail Dialog */}
        {selectedBol && (
          <Dialog open={!!selectedBol} onOpenChange={() => dispatch(clearSelectedBol())}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {selectedBol.bolNumber}
                </DialogTitle>
                <DialogDescription>
                  Bill of Lading Details
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="flex items-center gap-4">
                  <Badge className={`${getStatusColor(selectedBol.status)} text-white`}>
                    {selectedBol.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getValidationStatusIcon(selectedBol.validationStatus)}
                    <span className="text-sm">{selectedBol.validationStatus}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Shipper</h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{selectedBol.shipper.name}</div>
                      <div className="text-muted-foreground">{selectedBol.shipper.address}</div>
                      <div className="text-muted-foreground">{selectedBol.shipper.email}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Consignee</h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{selectedBol.consignee.name}</div>
                      <div className="text-muted-foreground">{selectedBol.consignee.address}</div>
                      <div className="text-muted-foreground">{selectedBol.consignee.email}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Vessel</div>
                    <div className="font-medium">{selectedBol.vesselName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Voyage</div>
                    <div className="font-medium">{selectedBol.voyageNumber}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Container</div>
                    <div className="font-medium">{selectedBol.containerNumber || "N/A"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Cargo</h4>
                  <p className="text-sm text-muted-foreground">{selectedBol.cargoDescription}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Weight: {selectedBol.grossWeight.toLocaleString()} {selectedBol.weightUnit}</span>
                    <span>Packages: {selectedBol.numberOfPackages}</span>
                    <span>Value: ${selectedBol.declaredValue.toLocaleString()}</span>
                  </div>
                </div>

                {selectedBol.validationNotes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Validation Notes</h4>
                    <ul className="text-sm space-y-1">
                      {selectedBol.validationNotes.map((note, i) => (
                        <li key={i} className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Blockchain Hash</div>
                  <code className="text-xs font-mono break-all">{selectedBol.blockchainHash}</code>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <Footer />
    </div>
  )
}
