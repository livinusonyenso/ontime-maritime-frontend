
import { useEffect, useState } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { useDocument } from "@/contexts/document-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Upload, Download, Eye, Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DocumentsPage() {
  const { isAuthenticated } = useAuth()
  const { documents, uploadDocument } = useDocument()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (!isAuthenticated) {
      // router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const filteredDocs = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-500 border-green-500/30"
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/30"
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bill-of-lading":
        return "bg-primary/10 text-primary"
      case "invoice":
        return "bg-secondary/10 text-secondary"
      case "charterparty":
        return "bg-accent/10 text-accent"
      default:
        return "bg-slate-500/10 text-slate-500"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Documents</h1>
                <p className="text-muted-foreground mt-1">Manage all your shipping documents</p>
              </div>
              <Button size="lg" onClick={() => setUploadDialogOpen(true)}>
                <Upload className="mr-2 h-5 w-5" />
                Upload Document
              </Button>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-5 w-5" />
              Filter
            </Button>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="glass hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{doc.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={getTypeColor(doc.type)}>
                          {doc.type.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipment ID</span>
                      <span className="font-semibold">{doc.shipmentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upload Date</span>
                      <span className="font-semibold">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Upload shipping documents for your cargo</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <select className="w-full p-2 border rounded-lg bg-background">
                <option value="bill-of-lading">Bill of Lading</option>
                <option value="invoice">Commercial Invoice</option>
                <option value="certificate">Certificate</option>
                <option value="charterparty">Charterparty</option>
                <option value="insurance">Insurance</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Shipment ID</Label>
              <Input placeholder="Enter shipment ID" />
            </div>

            <div className="space-y-2">
              <Label>File</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-all cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Document uploaded",
                  description: "Your document has been uploaded successfully.",
                })
                setUploadDialogOpen(false)
              }}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
