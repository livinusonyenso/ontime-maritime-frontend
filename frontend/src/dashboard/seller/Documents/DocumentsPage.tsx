"use client"

import {
  FileText,
  FileCheck,
  ShieldCheck,
  Receipt,
  FileSignature,
  Download,
  Eye,
} from "lucide-react"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* ===================== TYPES ===================== */

type DocumentType =
  | "ebol"
  | "insurance"
  | "invoice"
  | "contract"
  | "compliance"

interface UserDocument {
  id: string
  title: string
  type: DocumentType
  reference?: string
  uploadedAt: string
  status: "available" | "pending"
}

/* ===================== COMPONENT ===================== */

export default function UserDocumentsDashboard() {
  const documents: UserDocument[] = [
    {
      id: "1",
      title: "Electronic Bill of Lading",
      type: "ebol",
      reference: "EBOL-2025-001",
      uploadedAt: "12 Sep 2025",
      status: "available",
    },
    {
      id: "2",
      title: "Cargo Insurance Certificate",
      type: "insurance",
      reference: "INS-889201",
      uploadedAt: "14 Sep 2025",
      status: "available",
    },
    {
      id: "3",
      title: "Commercial Invoice",
      type: "invoice",
      reference: "INV-30211",
      uploadedAt: "15 Sep 2025",
      status: "available",
    },
    {
      id: "4",
      title: "Sales & Carriage Contract",
      type: "contract",
      uploadedAt: "16 Sep 2025",
      status: "pending",
    },
    {
      id: "5",
      title: "Port Compliance Report",
      type: "compliance",
      uploadedAt: "17 Sep 2025",
      status: "available",
    },
  ]

  const getIcon = (type: DocumentType) => {
    switch (type) {
      case "ebol":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "insurance":
        return <ShieldCheck className="h-5 w-5 text-emerald-600" />
      case "invoice":
        return <Receipt className="h-5 w-5 text-amber-600" />
      case "contract":
        return <FileSignature className="h-5 w-5 text-purple-600" />
      case "compliance":
        return <FileCheck className="h-5 w-5 text-slate-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* ===================== HEADER ===================== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Documents
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Access and manage documents related to your shipments, contracts,
          insurance, and compliance.
        </p>
      </div>

      {/* ===================== DOCUMENT LIST ===================== */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-base">
            Document Library
          </CardTitle>
          <CardDescription>
            All documents linked to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-muted p-2">
                  {getIcon(doc.type)}
                </div>

                <div>
                  <p className="font-medium">{doc.title}</p>

                  {doc.reference && (
                    <p className="text-xs text-muted-foreground">
                      Ref: {doc.reference}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Uploaded: {doc.uploadedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={doc.status === "available" ? "secondary" : "outline"}
                >
                  {doc.status}
                </Badge>

                {doc.status === "available" ? (
                  <>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button size="sm" disabled>
                    Pending
                  </Button>
                )}
              </div>
            </div>
          ))}

          {documents.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p>No documents available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
