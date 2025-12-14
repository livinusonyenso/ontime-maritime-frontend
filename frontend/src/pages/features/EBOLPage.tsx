import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  addBillOfLading,
  validateBol,
  selectBol,
  clearSelectedBol,
  addQuoteRequest,
} from "@/store/slices/billOfLadingSlice"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingChatButton } from "@/components/features/security-hotline/FloatingChatButton"
import { useNavigate } from "react-router-dom"

import {
  FileText,
  Plus,
  DollarSign,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Download,
  Loader2,
  Hash,
  Ship,
} from "lucide-react"

import {
  Button,
  Input,
  Textarea,
  Badge,
  Card,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Label,
} from "@/components/ui"


export default function EBOLPage() {
  const dispatch = useAppDispatch()
  const { billsOfLading, selectedBol, quoteRequests } = useAppSelector(
    (state) => state.billOfLading
  )

  const [activeTab, setActiveTab] = useState<"overview" | "quotes">("overview")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const navigate = useNavigate()

  const filteredBols = (billsOfLading || []).filter((bol) =>
    [
      bol.bolNumber,
      bol.shipper?.name,
      bol.consignee?.name,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      draft: "bg-gray-500",
      issued: "bg-blue-500",
      verified: "bg-green-500",
      transferred: "bg-purple-500",
      surrendered: "bg-orange-500",
      revoked: "bg-red-500",
    }
    return map[status] ?? "bg-gray-500"
  }

  const validationIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "invalid":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const handleValidate = (id: string) => {
    setIsValidating(true)
    setTimeout(() => {
      dispatch(validateBol(id))
      setIsValidating(false)
    }, 1500)
  }

  const handleNavigate = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* HERO */}
      <section className="border-b py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge className="mb-4">
            <FileText className="h-4 w-4 mr-1" />
            Digital Bill of Lading
          </Badge>

          <h1 className="text-4xl font-bold mb-3">
            Secure e-BOL Management
          </h1>

          <p className="text-muted-foreground mb-6">
            Create, validate, and manage Bills of Lading digitally.
            Flat fee of <strong>$50 per BOL</strong>.
          </p>

          <div className="flex justify-center gap-4">
            <Button onClick={() => handleNavigate()}>
              <Plus className="h-4 w-4 mr-1" />
              Create BOL
            </Button>

            <Button variant="outline" onClick={() => handleNavigate()}>
              <DollarSign className="h-4 w-4 mr-1" />
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      {/* LIST */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="overview">Bills of Lading</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
              </TabsList>

              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search BOL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* BOLS */}
            <TabsContent value="overview">
              <div className="grid gap-4">
                {filteredBols.map((bol) => (
                  <Card key={bol.id}>
                    <CardContent className="p-5 flex justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Hash className="h-4 w-4 text-primary" />
                          <span className="font-mono font-medium">
                            {bol.bolNumber}
                          </span>
                          <Badge className={`${statusColor(bol.status)} text-white`}>
                            {bol.status}
                          </Badge>
                          {validationIcon(bol.validationStatus)}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {bol.portOfLoading} → {bol.portOfDischarge}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
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
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                            )}
                            Validate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* QUOTES */}
            <TabsContent value="quotes">
              {quoteRequests.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <DollarSign className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No quote requests yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* VIEW BOL */}
      {selectedBol && (
        <Dialog open onOpenChange={() => dispatch(clearSelectedBol())}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedBol.bolNumber}</DialogTitle>
              <DialogDescription>
                Bill of Lading details
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 text-sm">
              <div>
                <strong>Vessel:</strong> {selectedBol.vesselName}
              </div>
              <div>
                <strong>Cargo:</strong> {selectedBol.cargoDescription}
              </div>
              <div>
                <strong>Weight:</strong>{" "}
                {selectedBol.grossWeight} {selectedBol.weightUnit}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" /> PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
      <FloatingChatButton />
    </div>
  )
}
