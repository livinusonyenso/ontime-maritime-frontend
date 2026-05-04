
"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import type { EvidenceItem } from "../ArbitrationView"

interface EvidenceListProps {
  evidence: EvidenceItem[]
}

export default function EvidenceList({ evidence }: EvidenceListProps) {
  return (
    <div>
      <h4 className="font-semibold mb-2">
        Evidence ({evidence.length} {evidence.length === 1 ? "file" : "files"})
      </h4>
      {evidence.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No evidence has been attached to this dispute yet.
        </p>
      ) : (
        <div className="grid gap-2">
          {evidence.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{e.name}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <a href={e.url} target="_blank" rel="noreferrer">
                  View
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
