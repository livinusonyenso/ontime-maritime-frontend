import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

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
import { FileText, Upload, Download, Eye, Search, Filter, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DocumentType } from "@/types"

export default function DashboardDocumentsPage() {
  const { isAuthenticated, loading } = useAuth()
  const { documents, createDocument } = useDocument()
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<DocumentType>("bill_of_lading")
  const [transactionId, setTransactionId] = useState("")
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Missing File",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    try {
      await createDocument({
        type: documentType,
        file: selectedFile,
        transaction_id: transactionId || undefined,
      })
      
      toast({
        title: "Document Uploaded",
        description: "Your document has been successfully uploaded",
      })
      setUploadDialogOpen(false)
      setSelectedFile(null)
      setTransactionId("")
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload document. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredDocs = documents.filter(
    (doc) =>
      doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bill_of_lading":
        return "bg-primary/10 text-primary"
      case "invoice":
        return "bg-secondary/10 text-secondary"
      case "certificate":
        return "bg-accent/10 text-accent"
      default:
        return "bg-slate-500/10 text-slate-500"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </Link>
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
          {filteredDocs.length === 0 ? (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your first document to get started
                </p>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc) => (
                <Card key={doc.id} className="glass hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-1">
                          {doc.type.replace(/_/g, ' ').toUpperCase()}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={getTypeColor(doc.type)}>
                            {doc.type.replace(/_/g, " ")}
                          </Badge>
                          <Badge variant="outline" className={doc.is_revoked ? "bg-red-500/10 text-red-500 border-red-500/30" : "bg-green-500/10 text-green-500 border-green-500/30"}>
                            {doc.is_revoked ? "Revoked" : "Active"}
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
                        <span className="text-muted-foreground">Document ID</span>
                        <span className="font-semibold">{doc.id.slice(0, 8)}...</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created</span>
                        <span className="font-semibold">{new Date(doc.created_at).toLocaleDateString()}</span>
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
          )}
        </section>
      </main>

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
              <select 
                className="w-full p-2 border rounded-lg bg-background"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as DocumentType)}
              >
                <option value="bill_of_lading">Bill of Lading</option>
                <option value="invoice">Commercial Invoice</option>
                <option value="certificate">Certificate</option>
                <option value="packing_list">Packing List</option>
                <option value="insurance">Insurance</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Transaction ID (Optional)</Label>
              <Input 
                placeholder="Enter transaction ID" 
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Select File</Label>
              <Input 
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0])
                  }
                }}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
