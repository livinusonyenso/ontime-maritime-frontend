"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
  selectDispute,
  runAiAnalysis,
  setAiAnalysisInProgress,
} from "@/store/slices/arbitrationSlice"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Scale,
  FileWarning,
  Users,
} from "lucide-react"

import ArbitrationMainContent from "./ArbitrationMainContent"
import {DisputeStatus, DisputeType } from "@/components/features/arbitration/ArbitrationView"

/* ===================== PAGE ===================== */

export default function SellerArbitrationDashboardPage() {
  const dispatch = useAppDispatch()

  const { disputes, aiAnalysisInProgress } = useAppSelector(
    (state) => state.arbitration
  )

  const [activeTab, setActiveTab] =
    useState<"overview" | "pending" | "resolved">("overview")

  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showNewDisputeDialog, setShowNewDisputeDialog] = useState(false)

  /* ===================== HELPERS ===================== */

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

  /* ===================== STATS (SELLER-SPECIFIC) ===================== */

  const activeCases = disputes.filter(
    (d) => d.status !== "resolved"
  ).length

  const resolvedCases = disputes.filter(
    (d) => d.status === "resolved"
  ).length

  const settlementRate =
    disputes.length > 0
      ? Math.round((resolvedCases / disputes.length) * 100)
      : 0

  const escalatedCases = disputes.filter(
    (d) => d.status === "escalated"
  ).length

  /* ===================== UI ===================== */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Seller Arbitration & Case Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Respond to buyer disputes, manage evidence, and collaborate with legal teams.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-2">
            <FileWarning className="h-4 w-4 text-amber-500" />
            High-Risk Cases
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Multi-party Arbitration
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Active Cases
            </CardTitle>
            <CardDescription>Disputes involving your listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{activeCases}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Settlement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-emerald-500">
              {settlementRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Escalated to Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-rose-500">
              {escalatedCases}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Arbitration Content */}
      <div className="rounded-xl border bg-card">
        <ArbitrationMainContent
          disputes={disputes}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNewDispute={() => setShowNewDisputeDialog(true)}
          onSelectDispute={(id) => dispatch(selectDispute(id))}
          onRunAnalysis={handleRunAnalysis}
          getStatusColor={getStatusColor}
          getTypeLabel={getTypeLabel}
          isAnalyzing={isAnalyzing || aiAnalysisInProgress}
        />
      </div>
    </div>
  )
}
