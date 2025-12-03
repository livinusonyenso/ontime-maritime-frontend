
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
    </div>
  )
}
