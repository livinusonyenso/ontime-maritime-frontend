"use client";

import { useState } from "react";
import {
  Scale,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  Ship,
  FileText,
  History,
  HelpCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type ArbitrationStatus = "open" | "in_review" | "resolved" | "escalated";

type ArbitrationCase = {
  id: string;
  ref: string;
  shipmentRef: string;
  sellerName: string;
  createdAt: string;
  status: ArbitrationStatus;
  issueType: string;
  summary: string;
  lastUpdate: string;
  amountInDispute: string;
};

const mockCases: ArbitrationCase[] = [
  {
    id: "1",
    ref: "ARB-2025-0041",
    shipmentRef: "BOL-ONTM-92831",
    sellerName: "OceanBridge Logistics Ltd.",
    createdAt: "Nov 14, 2025",
    status: "in_review",
    issueType: "Damaged cargo on arrival",
    summary:
      "Container arrived with visible damage to three pallets of goods. Buyer claims partial loss and quality degradation.",
    lastUpdate: "Mediator requested additional photos (Nov 29, 2025)",
    amountInDispute: "$18,450.00",
  },
  {
    id: "2",
    ref: "ARB-2025-0035",
    shipmentRef: "BOL-ONTM-91702",
    sellerName: "BlueWave Maritime",
    createdAt: "Nov 3, 2025",
    status: "open",
    issueType: "Delayed vessel & missed laycan",
    summary:
      "Vessel departure delayed by 10 days causing missed delivery window for buyer’s off-taker.",
    lastUpdate: "Case created (Nov 3, 2025)",
    amountInDispute: "$32,000.00",
  },
  {
    id: "3",
    ref: "ARB-2025-0021",
    shipmentRef: "BOL-ONTM-90311",
    sellerName: "Harborline Trading",
    createdAt: "Oct 12, 2025",
    status: "resolved",
    issueType: "Quantity shortfall vs. bill of lading",
    summary:
      "Short delivery vs. BOL quantity. Settlement agreed with partial refund and credit note.",
    lastUpdate: "Resolved with settlement (Oct 27, 2025)",
    amountInDispute: "$9,750.00",
  },
];

function getStatusConfig(status: ArbitrationStatus) {
  switch (status) {
    case "open":
      return { label: "Open", variant: "outline" as const, color: "text-amber-600 border-amber-200 bg-amber-50" };
    case "in_review":
      return { label: "In Review", variant: "outline" as const, color: "text-blue-700 border-blue-200 bg-blue-50" };
    case "resolved":
      return { label: "Resolved", variant: "outline" as const, color: "text-emerald-700 border-emerald-200 bg-emerald-50" };
    case "escalated":
      return { label: "Escalated", variant: "outline" as const, color: "text-red-700 border-red-200 bg-red-50" };
    default:
      return { label: "Unknown", variant: "outline" as const, color: "text-slate-700 border-slate-200 bg-slate-50" };
  }
}

export default function BuyerArbitrationPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(
    mockCases.length ? mockCases[0].id : null
  );

  const selectedCase = mockCases.find((c) => c.id === selectedCaseId) ?? mockCases[0];

  return (
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">
      {/* Page Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Scale className="h-6 w-6 text-primary" />
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Buyer Arbitration & Disputes
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage disputes securely, track decisions, and communicate with sellers and arbitrators
              directly from your buyer dashboard.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            View history
          </Button>
          <Button size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Download summary
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {mockCases.filter((c) => c.status === "open").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting review, evidence or seller response.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {mockCases.filter((c) => c.status === "in_review").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Our arbitration team is actively working on these.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {mockCases.filter((c) => c.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Closed with refund, credit note, or settlement agreement.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main layout: left = cases & details, right = new case + help */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1.5fr)]">
        {/* Left side */}
        <div className="space-y-6">
          {/* Case list & details */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Your Arbitration Cases
                </CardTitle>
                <CardDescription>
                  Select a case to view its details, timeline, and communication.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Input
                  className="h-8 w-40 md:w-52 text-xs"
                  placeholder="Search by reference or seller..."
                />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
                {/* Cases list */}
                <div className="space-y-3 border rounded-lg p-3 bg-background/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      ACTIVE & RECENT CASES
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {mockCases.length} total
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {mockCases.map((item) => {
                      const statusCfg = getStatusConfig(item.status);
                      const isActive = selectedCaseId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`w-full text-left rounded-lg border px-3 py-2.5 text-xs md:text-sm transition hover:border-primary/50 hover:bg-primary/5 ${
                            isActive ? "border-primary bg-primary/5" : "border-border bg-background"
                          }`}
                          onClick={() => setSelectedCaseId(item.id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium text-[13px] md:text-sm">
                                  {item.ref}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`border ${statusCfg.color} text-[10px] px-1.5 py-0`}
                                >
                                  {statusCfg.label}
                                </Badge>
                              </div>
                              <p className="text-[11px] md:text-xs text-muted-foreground">
                                {item.issueType}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                Seller: <span className="font-medium">{item.sellerName}</span>
                              </p>
                            </div>
                            <div className="text-right text-[10px] text-muted-foreground">
                              <p>{item.createdAt}</p>
                              <p className="mt-1 font-semibold text-foreground">
                                {item.amountInDispute}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected case details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        CASE REFERENCE
                      </p>
                      <p className="text-sm md:text-base font-semibold">
                        {selectedCase?.ref}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="outline"
                        className={`border ${getStatusConfig(selectedCase.status).color}`}
                      >
                        {getStatusConfig(selectedCase.status).label}
                      </Badge>
                      <p className="text-[11px] text-muted-foreground">
                        Created: {selectedCase.createdAt}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Card className="border-dashed border-muted bg-background/40">
                      <CardContent className="py-3 px-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <Ship className="h-4 w-4 text-primary" />
                          Shipment & Seller
                        </div>
                        <p className="text-sm font-semibold mt-1">
                          {selectedCase.shipmentRef}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Seller: {selectedCase.sellerName}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed border-muted bg-background/40">
                      <CardContent className="py-3 px-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <ShieldCheck className="h-4 w-4 text-emerald-500" />
                          Amount in Dispute
                        </div>
                        <p className="text-lg font-semibold mt-1">
                          {selectedCase.amountInDispute}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Subject to final arbitration outcome.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border border-dashed bg-background/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        Issue Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-1">
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {selectedCase.summary}
                      </p>
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="timeline" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="timeline" className="text-xs">
                        Timeline
                      </TabsTrigger>
                      <TabsTrigger value="messages" className="text-xs">
                        Messages
                      </TabsTrigger>
                      <TabsTrigger value="evidence" className="text-xs">
                        Evidence
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="timeline" className="mt-3 border rounded-lg p-3 bg-background/60">
                      <p className="text-xs text-muted-foreground mb-2">
                        Last update:
                        <span className="font-medium ml-1">
                          {selectedCase.lastUpdate}
                        </span>
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li className="flex gap-2">
                          <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                          <div>
                            <p className="font-medium">Case opened by buyer</p>
                            <p className="text-muted-foreground">
                              Buyer submitted initial complaint with description and requested outcome.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                          <div>
                            <p className="font-medium">Seller response pending / in progress</p>
                            <p className="text-muted-foreground">
                              Seller is requested to respond within 3–5 business days with their position and supporting evidence.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-2">
                          <span className="mt-0.5 h-2 w-2 rounded-full bg-slate-400" />
                          <div>
                            <p className="font-medium">Next step</p>
                            <p className="text-muted-foreground">
                              Arbitration panel will review all documents and propose a resolution which you can accept or appeal.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </TabsContent>

                    <TabsContent value="messages" className="mt-3 border rounded-lg p-3 bg-background/60">
                      <div className="space-y-3">
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">You &amp; Seller</p>
                            <Badge variant="outline" className="text-[10px]">
                              Private Channel
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            Use this space to share clarifications. Be specific, factual, and avoid
                            informal language—your messages may be reviewed by arbitrators.
                          </p>
                        </div>
                        <Textarea
                          className="min-h-[80px] text-xs"
                          placeholder="Write a message to the seller or arbitration team..."
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-[11px] text-muted-foreground">
                            Messages are logged and cannot be deleted once sent.
                          </p>
                          <Button size="sm" className="gap-1.5">
                            <MessageCircle className="h-4 w-4" />
                            Send message
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="evidence" className="mt-3 border rounded-lg p-3 bg-background/60">
                      <div className="space-y-3 text-xs">
                        <p className="font-medium">Uploaded evidence</p>
                        <p className="text-muted-foreground">
                          Attach documents that support your case: signed BOL, survey reports,
                          photos, email correspondence, inspection reports, etc.
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button variant="outline" size="sm" className="gap-2 flex-1 justify-center">
                            <FileText className="h-4 w-4" />
                            Upload documents
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 flex-1 justify-center">
                            <Ship className="h-4 w-4" />
                            Attach vessel / tracking data
                          </Button>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Max 20MB per file. Supported formats: PDF, JPG, PNG, DOCX.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          {/* New case form */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                File a New Arbitration
              </CardTitle>
              <CardDescription>
                Start a new dispute when there’s a serious issue with a shipment that you
                cannot resolve directly with the seller.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3">
              <div className="grid gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Shipment / Bill of Lading Reference
                  </label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="e.g. BOL-ONTM-92831"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Issue Type</label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="e.g. Damaged cargo, delayed vessel, short delivery..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Desired Outcome <span className="text-[10px] text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    className="h-8 text-xs"
                    placeholder="e.g. Partial refund, full refund, replacement shipment..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Describe the Issue</label>
                  <Textarea
                    className="min-h-[100px] text-xs"
                    placeholder="Provide a clear, factual description of what happened, including key dates, quantities, and any documentation you already have..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Attach Evidence <span className="text-[10px] text-muted-foreground">(optional)</span>
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center gap-2 text-xs h-8"
                  >
                    <FileText className="h-4 w-4" />
                    Upload supporting documents
                  </Button>
                  <p className="text-[10px] text-muted-foreground">
                    You can always upload more evidence later from the case page.
                  </p>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] text-muted-foreground">
                  By submitting, you confirm the information is accurate and acknowledge that
                  final decisions may be binding according to platform terms.
                </p>
                <Button size="sm" className="gap-1.5">
                  Submit case
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help & guidance */}
          <Card className="border-0 shadow-sm bg-background/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                How Buyer Arbitration Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-[13px] text-muted-foreground">
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  <span className="font-medium text-foreground">Open a case.</span> Provide a
                  clear description of the dispute, shipment details, and what you’re asking for.
                </li>
                <li>
                  <span className="font-medium text-foreground">Upload evidence.</span> Attach
                  BOL, survey reports, inspection images, and any relevant documents.
                </li>
                <li>
                  <span className="font-medium text-foreground">Seller responds.</span> The seller
                  is notified and given a fixed window to respond and propose a solution.
                </li>
                <li>
                  <span className="font-medium text-foreground">Arbitration review.</span> Our
                  panel (and/or integrated AI assistant) reviews both sides and suggests a fair
                  resolution.
                </li>
                <li>
                  <span className="font-medium text-foreground">Resolution & settlement.</span>{" "}
                  If accepted, the settlement is logged and any platform-level actions (refunds,
                  credits, flags) are triggered.
                </li>
              </ol>

              <Separator />

              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5" />
                <p className="text-[11px]">
                  <span className="font-medium text-foreground">Neutral & secure:</span> Our
                  arbitration system protects both buyers and sellers by enforcing platform rules,
                  shipping terms, and documentary evidence.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
