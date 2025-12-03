
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, FileText, X } from "lucide-react"
import type { EvidenceItem, DisputeType } from "../ArbitrationView"

export interface NewDispute {
  type: DisputeType | "" 
  complainantId: string
  complainantName: string
  respondentId: string
  respondentName: string
  transactionId?: string
  bolNumber?: string
  description: string
  claimAmount: number
  evidence: EvidenceItem[]
}

interface DisputeFormProps {
  newDispute: NewDispute
  onChange: (updated: NewDispute) => void
}

export default function DisputeForm({ newDispute, onChange }: DisputeFormProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newEvidence: EvidenceItem[] = Array.from(files).map((file, index) => ({
      id: `evidence-${Date.now()}-${index}`,
      name: file.name,
      type: file.type || "document",
      url: URL.createObjectURL(file), // Create temporary URL for preview
    }))

    onChange({
      ...newDispute,
      evidence: [...newDispute.evidence, ...newEvidence],
    })

    // Reset the input
    e.target.value = ""
  }

  const handleRemoveEvidence = (evidenceId: string) => {
    onChange({
      ...newDispute,
      evidence: newDispute.evidence.filter((item) => item.id !== evidenceId),
    })
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "🖼️"
    if (type.startsWith("video/")) return "🎥"
    if (type.includes("pdf")) return "📄"
    return "📎"
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Dispute Type *</Label>
          <Select
            value={newDispute.type}
            onValueChange={(value: DisputeType) =>
              onChange({ ...newDispute, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shipment_delay">Shipment Delay</SelectItem>
              <SelectItem value="cargo_damage">Cargo Damage</SelectItem>
              <SelectItem value="cargo_loss">Cargo Loss</SelectItem>
              <SelectItem value="payment_dispute">Payment Dispute</SelectItem>
              <SelectItem value="contract_breach">Contract Breach</SelectItem>
              <SelectItem value="documentation">Documentation Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Claim Amount ($) *</Label>
          <Input
            type="number"
            value={newDispute.claimAmount || ""}
            onChange={(e) =>
              onChange({ ...newDispute, claimAmount: Number(e.target.value) })
            }
            placeholder="Enter amount"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Your Company Name</Label>
          <Input
            value={newDispute.complainantName}
            onChange={(e) =>
              onChange({ ...newDispute, complainantName: e.target.value })
            }
            placeholder="Complainant name"
          />
        </div>
        <div>
          <Label>Respondent Company</Label>
          <Input
            value={newDispute.respondentName}
            onChange={(e) =>
              onChange({ ...newDispute, respondentName: e.target.value })
            }
            placeholder="Respondent name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Transaction ID</Label>
          <Input
            value={newDispute.transactionId}
            onChange={(e) =>
              onChange({ ...newDispute, transactionId: e.target.value })
            }
            placeholder="Transaction reference"
          />
        </div>
        <div>
          <Label>BOL Number</Label>
          <Input
            value={newDispute.bolNumber}
            onChange={(e) =>
              onChange({ ...newDispute, bolNumber: e.target.value })
            }
            placeholder="Bill of Lading number"
          />
        </div>
      </div>

      <div>
        <Label>Dispute Description *</Label>
        <Textarea
          value={newDispute.description}
          onChange={(e) =>
            onChange({ ...newDispute, description: e.target.value })
          }
          placeholder="Provide detailed description of the dispute, including timeline, damages, and desired outcome..."
          rows={5}
        />
      </div>

      {/* Evidence Upload Section */}
      <div className="space-y-3">
        <Label>Supporting Evidence</Label>
        <div className="flex items-center gap-2">
          <Input
            id="evidence-upload"
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("evidence-upload")?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Evidence Files
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Upload documents, images, or videos that support your claim (PDF, DOC, JPG, PNG, MP4)
        </p>

        {/* Evidence List */}
        {newDispute.evidence.length > 0 && (
          <div className="space-y-2 mt-4">
            <Label className="text-sm text-muted-foreground">
              Uploaded Files ({newDispute.evidence.length})
            </Label>
            <div className="space-y-2">
              {newDispute.evidence.map((item) => (
                <Card key={item.id} className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">
                        {getFileIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type || "document"}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveEvidence(item.id)}
                      className="flex-shrink-0 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
