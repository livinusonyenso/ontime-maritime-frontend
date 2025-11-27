"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function ArbitrationModule() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Arbitration &amp; Dispute Resolution</h1>
        <p className="text-muted-foreground">
          Capture dispute details and simulate Grok-style recommendations. The logic runs entirely inside this dashboard panel.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Dispute</CardTitle>
          <CardDescription>Provide shipment and contract details for AI evaluation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="bolNumber">Related BOL Number</Label>
              <Input id="bolNumber" placeholder="Link to an existing BOL" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="disputeType">Dispute Type</Label>
              <Input id="disputeType" placeholder="Delay, Cargo damage, Demurrage, etc." />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="summary">Dispute Summary</Label>
            <Textarea id="summary" rows={4} placeholder="Short narrative of the dispute." />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span>Output (future state): settlement range, breach evaluation, risk score.</span>
            <Badge variant="outline">AI Simulation</Badge>
          </div>
          <Button>Run AI Evaluation</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
