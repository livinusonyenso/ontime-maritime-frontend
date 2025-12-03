"use client";

import {
  FileText,
  FileSpreadsheet,
  FileCheck,
  Upload,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const documents = [
  {
    name: "Bill of Lading (BOL)",
    type: "PDF",
    status: "approved",
    lastUpdated: "2 days ago",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    name: "Commercial Invoice",
    type: "PDF",
    status: "pending",
    lastUpdated: "Awaiting upload",
    icon: <FileCheck className="h-5 w-5 text-blue-600" />,
  },
  {
    name: "Packing List",
    type: "Spreadsheet",
    status: "approved",
    lastUpdated: "3 hours ago",
    icon: <FileSpreadsheet className="h-5 w-5 text-emerald-600" />,
  },
  {
    name: "Certificate of Quality (COQ)",
    type: "PDF",
    status: "rejected",
    lastUpdated: "Requires resubmission",
    icon: <AlertCircle className="h-5 w-5 text-red-600" />,
  },
  {
    name: "Inspection Report",
    type: "PDF",
    status: "approved",
    lastUpdated: "1 week ago",
    icon: <FileText className="h-5 w-5 text-emerald-600" />,
  },
];

function statusBadge(status: string) {
  switch (status) {
    case "approved":
      return (
        <span className="text-emerald-700 bg-emerald-100 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" /> Approved
        </span>
      );

    case "pending":
      return (
        <span className="text-amber-700 bg-amber-100 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> Pending
        </span>
      );

    case "rejected":
      return (
        <span className="text-red-700 bg-red-100 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" /> Rejected
        </span>
      );

    default:
      return null;
  }
}

export default function BuyerDocumentsPage() {
  return (
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">
      
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">Buyer Documents</h1>
            <p className="text-sm text-muted-foreground">
              Manage all trade-related documents: BOL, invoices, inspection reports, and certification.
            </p>
          </div>
        </div>

        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Separator className="mb-6" />

      {/* DOCUMENT CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, index) => (
          <Card key={index} className="border-0 shadow-sm bg-background/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {doc.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{doc.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {doc.type} Document
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>{statusBadge(doc.status)}</div>

              <p className="text-xs text-muted-foreground">
                Last updated: {doc.lastUpdated}
              </p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Eye className="h-4 w-4" />
                  View
                </Button>

                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FOOTER NOTE */}
      <div className="mt-8 p-4 border rounded-lg bg-background/50">
        <p className="text-xs text-muted-foreground">
          All document uploads are securely encrypted and verified by our compliance desk.  
          For inquiries or corrections, contact support.
        </p>
      </div>

    </div>
  );
}
