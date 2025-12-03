
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import {
  addDispute,
  selectDispute,
  clearSelectedDispute,
  runAiAnalysis,
  setAiAnalysisInProgress,
} from "@/store/slices/arbitrationSlice"
import {
  Bot,
  Gavel,
  Scale,
  FileText,
  Clock,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Loader2,
  Target,
  Brain,
} from "lucide-react"

import DisputeCard from "./components/DisputeCard"
import DisputeForm, { NewDispute } from "./components/DisputeForm"
import AnalysisPanel from "./components/AnalysisPanel"
import ResolutionPanel from "./components/ResolutionPanel"
import EvidenceList from "./components/EvidenceList"

export type DisputeStatus =
  | "submitted"
  | "ai_analysis"
  | "under_review"
  | "mediation"
  | "resolved"
  | "escalated"

export type DisputeType =
  | "shipment_delay"
  | "cargo_damage"
  | "cargo_loss"
  | "payment_dispute"
  | "contract_breach"
  | "documentation"

export interface EvidenceItem {
  id: string
  name: string
  type: string
  url: string
}

export interface AiAnalysis {
  confidenceLevel: number
  liabilityScore: number
  riskScore: number
  breachEvaluation: string
  settlementRecommendation: string
  deviationReport: string
  analyzedAt: string | Date
}

export interface Resolution {
  outcome: string
  settlementAmount: number
  terms: string
}

export interface Dispute {
  id: string
  caseNumber: string
  type: DisputeType
  complainantId: string
  complainantName: string
  respondentId: string
  respondentName: string
  transactionId?: string
  bolNumber?: string
  description: string
  claimAmount: number
  status: DisputeStatus
  createdAt: string | Date
  evidence: EvidenceItem[]
  aiAnalysis?: AiAnalysis
  resolution?: Resolution
}

export default function ArbitrationView() {
  const dispatch = useAppDispatch()
  const { disputes, selectedDispute, aiAnalysisInProgress } = useAppSelector((state) => state.arbitration)
  const [activeTab, setActiveTab] = useState<"overview" | "pending" | "resolved">("overview")
  const [showNewDisputeDialog, setShowNewDisputeDialog] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [newDispute, setNewDispute] = useState<NewDispute>({
    type: "" as any,
    complainantId: "user1",
    complainantName: "",
    respondentId: "user2",
    respondentName: "",
    transactionId: "",
    bolNumber: "",
    description: "",
    claimAmount: 0,
    evidence: [],
  })

  const handleSubmitDispute = () => {
    if (!newDispute.type || !newDispute.description || !newDispute.claimAmount) {
      return
    }

    dispatch(
      addDispute({
        ...newDispute,
        evidence: [
          { id: "e1", name: "supporting-docs.pdf", type: "document", url: "/evidence/docs.pdf" },
        ],
      })
    )

    setShowNewDisputeDialog(false)
    setNewDispute({
      type: "" as any,
      complainantId: "user1",
      complainantName: "",
      respondentId: "user2",
      respondentName: "",
      transactionId: "",
      bolNumber: "",
      description: "",
      claimAmount: 0,
      evidence: [],
    })
  }

  const handleRunAnalysis = (disputeId: string) => {
    setIsAnalyzing(true)
    dispatch(setAiAnalysisInProgress(true))

    setTimeout(() => {
      dispatch(runAiAnalysis(disputeId))
      setIsAnalyzing(false)
      dispatch(setAiAnalysisInProgress(false))
    }, 3000)
  }

  const getStatusColor = (status: DisputeStatus) => {
    switch (status) {
      case "submitted":
        return "bg-blue-500"
      case "ai_analysis":
        return "bg-purple-500"
      case "under_review":
        return "bg-yellow-500"
      case "mediation":
        return "bg-orange-500"
      case "resolved":
        return "bg-green-500"
      case "escalated":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeLabel = (type: DisputeType | string) => {
    switch (type) {
      case "shipment_delay":
        return "Shipment Delay"
      case "cargo_damage":
        return "Cargo Damage"
      case "cargo_loss":
        return "Cargo Loss"
      case "payment_dispute":
        return "Payment Dispute"
      case "contract_breach":
        return "Contract Breach"
      case "documentation":
        return "Documentation Issue"
      default:
        return type
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500/10 via-background to-blue-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Powered by Grok 4.1</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Arbitration &amp; Dispute Resolution
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Intelligent dispute resolution for maritime issues including shipment delays,
              cargo damage, and loss claims. Get AI-powered analysis, settlement recommendations,
              and risk assessments.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => setShowNewDisputeDialog(true)}>
                <Gavel className="h-5 w-5 mr-2" />
                File a Dispute
              </Button>
              <Button size="lg" variant="outline">
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Bot className="h-12 w-12 mx-auto text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Grok 4.1 analyzes evidence and provides intelligent assessments.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Scale className="h-12 w-12 mx-auto text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">Breach Evaluation</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive evaluation of contract and duty breaches.
              </p>
            </Card>
            <Card className="text-center p-6">
              <Target className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">Risk Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Liability and risk scores to guide settlement decisions.
              </p>
            </Card>
            <Card className="text-center p-6">
              <DollarSign className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="font-semibold mb-2">Settlement Advice</h3>
              <p className="text-sm text-muted-foreground">
                Data-driven settlement recommendations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <div className="flex items-center justify-between mb-8">
              <TabsList>
                <TabsTrigger value="overview">All Disputes</TabsTrigger>
                <TabsTrigger value="pending">Pending Analysis</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <Button onClick={() => setShowNewDisputeDialog(true)}>
                <Gavel className="h-4 w-4 mr-2" />
                New Dispute
              </Button>
            </div>

            <TabsContent value="overview">
              <div className="grid gap-6">
                {disputes.map((dispute: Dispute) => (
                  <DisputeCard
                    key={dispute.id}
                    dispute={dispute}
                    getStatusColor={getStatusColor}
                    getTypeLabel={getTypeLabel}
                    onViewDetails={() => dispatch(selectDispute(dispute.id))}
                    onRunAnalysis={() => handleRunAnalysis(dispute.id)}
                    isAnalyzing={isAnalyzing || aiAnalysisInProgress}
                  />
                ))}

                {disputes.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No Disputes Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven&apos;t filed any disputes. Start by submitting your first case.
                      </p>
                      <Button onClick={() => setShowNewDisputeDialog(true)}>
                        <Gavel className="h-4 w-4 mr-2" />
                        File a Dispute
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="grid gap-4">
                {disputes
                  .filter(
                    (d: Dispute) =>
                      d.status === "submitted" || d.status === "ai_analysis"
                  )
                  .map((dispute: Dispute) => (
                    <Card key={dispute.id}>
                      <CardContent className="p-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-purple-100 dark:bg-purple-950/30 p-2 rounded-lg">
                            <Clock className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-mono text-sm text-muted-foreground">
                              {dispute.caseNumber}
                            </div>
                            <div className="font-medium">
                              {getTypeLabel(dispute.type)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-lg font-bold text-primary">
                            ${dispute.claimAmount.toLocaleString()}
                          </div>
                          <Badge className={`${getStatusColor(dispute.status)} text-white`}>
                            {dispute.status.replace("_", " ")}
                          </Badge>
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => dispatch(selectDispute(dispute.id))}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {disputes.filter((d: Dispute) => d.status === "submitted" || d.status === "ai_analysis").length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No Pending Disputes</h3>
                      <p className="text-muted-foreground">
                        Disputes awaiting AI review will appear here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resolved">
              <div className="grid gap-4">
                {disputes
                  .filter((d: Dispute) => d.status === "resolved")
                  .map((dispute: Dispute) => (
                    <Card key={dispute.id}>
                      <CardContent className="p-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-green-100 dark:bg-green-950/30 p-2 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-mono text-sm text-muted-foreground">
                              {dispute.caseNumber}
                            </div>
                            <div className="font-medium">
                              {getTypeLabel(dispute.type)}
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          {dispute.resolution && (
                            <div className="text-lg font-bold text-green-600">
                              ${dispute.resolution.settlementAmount.toLocaleString()} settled
                            </div>
                          )}
                          <Badge className="bg-green-500 text-white">Resolved</Badge>
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => dispatch(selectDispute(dispute.id))}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {disputes.filter((d: Dispute) => d.status === "resolved").length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No Resolved Disputes</h3>
                      <p className="text-muted-foreground">
                        Resolved disputes will appear here once settlements are reached.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* New Dispute Dialog */}
      <Dialog open={showNewDisputeDialog} onOpenChange={setShowNewDisputeDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              File a New Dispute
            </DialogTitle>
            <DialogDescription>
              Submit your dispute for AI-powered analysis and resolution recommendation.
            </DialogDescription>
          </DialogHeader>

          <DisputeForm newDispute={newDispute} onChange={setNewDispute} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDisputeDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitDispute}
              disabled={!newDispute.type || !newDispute.description || !newDispute.claimAmount}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Submit Dispute
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispute Detail Dialog */}
      {selectedDispute && (
        <Dialog open={!!selectedDispute} onOpenChange={() => dispatch(clearSelectedDispute())}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                {selectedDispute.caseNumber}
              </DialogTitle>
              <DialogDescription>
                {getTypeLabel(selectedDispute.type)} • Claim: ${selectedDispute.claimAmount.toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
              {/* Status */}
              <div className="flex items-center gap-3">
                <Badge className={`${getStatusColor(selectedDispute.status)} text-white capitalize`}>
                  {selectedDispute.status.replace("_", " ")}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Filed: {new Date(selectedDispute.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Complainant</h4>
                  <div className="font-medium">{selectedDispute.complainantName}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Respondent</h4>
                  <div className="font-medium">{selectedDispute.respondentName}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Dispute Description</h4>
                <p className="text-muted-foreground whitespace-pre-line">
                  {selectedDispute.description}
                </p>
              </div>

              {/* AI Analysis */}
              {selectedDispute.aiAnalysis && (
                <AnalysisPanel aiAnalysis={selectedDispute.aiAnalysis} />
              )}

              {/* Resolution */}
              {selectedDispute.resolution && (
                <ResolutionPanel resolution={selectedDispute.resolution} />
              )}

              {/* Evidence */}
              <EvidenceList evidence={selectedDispute.evidence} />
            </div>

            <DialogFooter>
              {selectedDispute.status === "submitted" && (
                <Button
                  onClick={() => handleRunAnalysis(selectedDispute.id)}
                  disabled={isAnalyzing || aiAnalysisInProgress}
                >
                  {isAnalyzing || aiAnalysisInProgress ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Running Analysis...
                    </>
                  ) : (
                    <>
                      <Bot className="h-4 w-4 mr-2" />
                      Run AI Analysis
                    </>
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
