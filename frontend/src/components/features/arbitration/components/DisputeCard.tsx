
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gavel, Brain, Eye, Bot, Loader2 } from "lucide-react"
import type { Dispute, DisputeStatus } from "../ArbitrationView"
import AnalysisPanel from "./AnalysisPanel"

interface DisputeCardProps {
  dispute: Dispute
  getStatusColor: (status: DisputeStatus) => string
  getTypeLabel: (type: string) => string
  onViewDetails: () => void
  onRunAnalysis: () => void
  isAnalyzing?: boolean
}

export default function DisputeCard({
  dispute,
  getStatusColor,
  getTypeLabel,
  onViewDetails,
  onRunAnalysis,
  isAnalyzing,
}: DisputeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left: Case Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="bg-purple-100 dark:bg-purple-950/30 p-2 rounded-lg">
                <Gavel className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-mono text-xs md:text-sm text-muted-foreground">
                  {dispute.caseNumber}
                </div>
                <h3 className="font-semibold text-sm md:text-base">
                  {getTypeLabel(dispute.type)}
                </h3>
              </div>
              <Badge
                className={`${getStatusColor(dispute.status)} text-white capitalize ml-auto`}
              >
                {dispute.status.replace("_", " ")}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {dispute.description}
            </p>

            <div className="flex flex-wrap gap-6 text-xs md:text-sm">
              <div>
                <div className="text-muted-foreground">Complainant</div>
                <div className="font-medium break-words">
                  {dispute.complainantName || "—"}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Respondent</div>
                <div className="font-medium break-words">
                  {dispute.respondentName || "—"}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Claim Amount</div>
                <div className="font-medium text-primary">
                  ${dispute.claimAmount.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">BOL Reference</div>
                <div className="font-medium break-all">
                  {dispute.bolNumber || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Compact AI Summary (if exists) */}
          {dispute.aiAnalysis && (
            <div className="lg:w-80 bg-muted/50 p-4 rounded-lg">
              <AnalysisPanel aiAnalysis={dispute.aiAnalysis} compact />
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex flex-col gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="justify-center"
              onClick={onViewDetails}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {dispute.status === "submitted" && (
              <Button
                size="sm"
                className="justify-center"
                onClick={onRunAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Bot className="h-4 w-4 mr-1" />
                    Run AI Analysis
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
