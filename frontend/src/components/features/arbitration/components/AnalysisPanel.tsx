
"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Scale, DollarSign, TrendingUp } from "lucide-react"
import type { AiAnalysis } from "../ArbitrationView"

interface AnalysisPanelProps {
  aiAnalysis: AiAnalysis
  compact?: boolean
}

export default function AnalysisPanel({ aiAnalysis, compact }: AnalysisPanelProps) {
  if (compact) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-purple-500" />
          <span className="font-semibold text-sm">AI Analysis</span>
          <Badge variant="outline" className="ml-auto">
            {aiAnalysis.confidenceLevel}% confidence
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
          <div>
            <div className="text-muted-foreground">Liability</div>
            <div className="flex items-center gap-2">
              <Progress value={aiAnalysis.liabilityScore} className="h-2 flex-1" />
              <span className="font-medium">
                {aiAnalysis.liabilityScore}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Risk</div>
            <div className="flex items-center gap-2">
              <Progress value={aiAnalysis.riskScore} className="h-2 flex-1" />
              <span className="font-medium">
                {aiAnalysis.riskScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-6 w-6 text-purple-500" />
        <h4 className="font-semibold text-lg">AI Analysis by Grok 4.1</h4>
        <Badge className="ml-auto bg-purple-500 text-white">
          {aiAnalysis.confidenceLevel}% Confidence
        </Badge>
      </div>

      <div className="grid gap-4">
        {/* Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Liability Score</div>
            <div className="flex items-center gap-3">
              <Progress value={aiAnalysis.liabilityScore} className="h-3 flex-1" />
              <span className="font-bold text-lg">
                {aiAnalysis.liabilityScore}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Risk Score</div>
            <div className="flex items-center gap-3">
              <Progress value={aiAnalysis.riskScore} className="h-3 flex-1" />
              <span className="font-bold text-lg">
                {aiAnalysis.riskScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Breach Evaluation */}
        <div>
          <h5 className="font-semibold mb-2 flex items-center gap-2">
            <Scale className="h-4 w-4" /> Breach Evaluation
          </h5>
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
            {aiAnalysis.breachEvaluation}
          </p>
        </div>

        {/* Settlement Recommendation */}
        <div>
          <h5 className="font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Settlement Recommendation
          </h5>
          <p className="text-sm text-muted-foreground bg-green-50 dark:bg-green-950/30 p-3 rounded border border-green-200 dark:border-green-800">
            {aiAnalysis.settlementRecommendation}
          </p>
        </div>

        {/* Deviation Report */}
        <div>
          <h5 className="font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Deviation Report
          </h5>
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
            {aiAnalysis.deviationReport}
          </p>
        </div>

        <div className="text-xs text-muted-foreground">
          Analysis completed: {new Date(aiAnalysis.analyzedAt).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
