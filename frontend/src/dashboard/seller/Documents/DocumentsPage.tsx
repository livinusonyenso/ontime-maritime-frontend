"use client"

import { useEffect, useState } from "react"
import {
  FileText, FileCheck, ShieldCheck, Receipt,
  FileSignature, Download, Eye, Package,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import api from "@/lib/api"

/* ===================== TYPES ===================== */

interface UserDocument {
  id: string
  label: string
  type: string
  reference: string
  uploadedAt: string
  fileUrl: string
  isRevoked: boolean
}

/* ===================== HELPERS ===================== */

const TYPE_LABEL: Record<string, string> = {
  bill_of_lading:        "Bill of Lading",
  insurance_certificate: "Insurance Certificate",
  invoice:               "Invoice",
  charterparty:          "Charterparty",
  survey_report:         "Survey Report",
  packing_list:          "Packing List",
  delivery_order:        "Delivery Order",
}

function getIcon(type: string) {
  switch (type) {
    case "bill_of_lading":        return <FileText      className="h-5 w-5 text-blue-600" />
    case "insurance_certificate": return <ShieldCheck   className="h-5 w-5 text-emerald-600" />
    case "invoice":               return <Receipt       className="h-5 w-5 text-amber-600" />
    case "charterparty":          return <FileSignature className="h-5 w-5 text-purple-600" />
    case "survey_report":         return <FileCheck     className="h-5 w-5 text-slate-600" />
    case "packing_list":          return <Package       className="h-5 w-5 text-orange-500" />
    default:                      return <FileText      className="h-5 w-5 text-muted-foreground" />
  }
}

function toDocument(raw: any): UserDocument {
  const ref =
    raw.listing?.title ??
    raw.transaction?.id?.slice(0, 8).toUpperCase() ??
    raw.id.slice(0, 8).toUpperCase()

  return {
    id:        raw.id ?? "",
    label:     TYPE_LABEL[raw.type] ?? raw.type ?? "Document",
    type:      raw.type ?? "",
    reference: ref,
    uploadedAt: raw.created_at
      ? new Date(raw.created_at).toLocaleDateString(undefined, {
          day: "numeric", month: "short", year: "numeric",
        })
      : "—",
    fileUrl:   raw.file_url ?? "",
    isRevoked: raw.is_revoked ?? false,
  }
}

/* ===================== COMPONENT ===================== */

export default function UserDocumentsDashboard() {
  const [documents, setDocuments] = useState<UserDocument[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    api
      .get("/documents/my")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : []
        setDocuments(data.map(toDocument))
      })
      .catch(() => setError("Could not load documents."))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Access and manage documents related to your shipments, contracts,
          insurance, and compliance.
        </p>
      </div>

      {/* Document list */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">Document Library</CardTitle>
          <CardDescription>All documents linked to your account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <p className="py-8 text-center text-muted-foreground">Loading…</p>
          ) : error ? (
            <p className="py-8 text-center text-destructive">{error}</p>
          ) : documents.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p>No documents available yet.</p>
            </div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-muted p-2">
                    {getIcon(doc.type)}
                  </div>
                  <div>
                    <p className="font-medium">{doc.label}</p>
                    <p className="text-xs text-muted-foreground">Ref: {doc.reference}</p>
                    <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadedAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={doc.isRevoked ? "destructive" : "secondary"}>
                    {doc.isRevoked ? "Revoked" : "Available"}
                  </Badge>

                  {!doc.isRevoked && doc.fileUrl && (
                    <>
                      <Button size="sm" variant="outline" asChild>
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={doc.fileUrl} download>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
