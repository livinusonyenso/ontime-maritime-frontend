import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useDocument } from "@/contexts/document-context"
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react"

export default function AdminDocumentsPage() {
  const { user, isAuthenticated } = useAuth()
  const { documents } = useDocument()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      // router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const pending = documents.filter((d) => d.status === "pending")
  const approved = documents.filter((d) => d.status === "approved")
  const rejected = documents.filter((d) => d.status === "rejected")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-muted-foreground mt-1">Review and approve shipping documents</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                    <p className="text-3xl font-bold mt-2 text-amber-500">{pending.length}</p>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Approved</p>
                    <p className="text-3xl font-bold mt-2 text-green-500">{approved.length}</p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rejected</p>
                    <p className="text-3xl font-bold mt-2 text-red-500">{rejected.length}</p>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-xl">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>All Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/10 p-3 rounded-lg">
                        <FileText className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-semibold">{doc.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-muted-foreground">{doc.type.replace("-", " ").toUpperCase()}</p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">Shipment #{doc.shipmentId}</p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "approved"
                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                            : doc.status === "pending"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                              : "bg-red-500/10 text-red-500 border-red-500/30"
                        }
                      >
                        {doc.status}
                      </Badge>
                      {doc.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500/30 text-green-500 hover:bg-green-500/10 bg-transparent"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
