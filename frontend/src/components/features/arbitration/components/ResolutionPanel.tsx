
"use client"

import { CheckCircle2 } from "lucide-react"
import type { Resolution } from "../ArbitrationView"

interface ResolutionPanelProps {
  resolution: Resolution
}

export default function ResolutionPanel({ resolution }: ResolutionPanelProps) {
  return (
    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
        <h4 className="font-semibold text-lg">Resolution</h4>
      </div>
      <div className="grid gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Outcome</div>
          <div className="font-medium">{resolution.outcome}</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Settlement Amount</div>
          <div className="text-xl font-bold text-green-600">
            ${resolution.settlementAmount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Terms</div>
          <div>{resolution.terms}</div>
        </div>
      </div>
    </div>
  )
}
