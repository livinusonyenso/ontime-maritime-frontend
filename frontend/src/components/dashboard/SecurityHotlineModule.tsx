"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SecurityHotlineModule() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Security & Enforcement Hotline</h1>
        <p className="text-muted-foreground">
          Report maritime-related fraud, piracy, document forgery, and shipment issues. This panel connects to Police, EFCC, and maritime forces (simulated).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit an Incident Report</CardTitle>
          <CardDescription>Use this form to log an incident. Backend wiring can be added later.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="incidentType">Incident Type</Label>
              <Input id="incidentType" placeholder="e.g. Fraud, Piracy, Fake BOL" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="contact">Contact Phone / Email</Label>
              <Input id="contact" placeholder="+234..., email@domain.com" />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="details">Incident Details</Label>
            <Textarea id="details" rows={4} placeholder="Describe what happened, when, and who is involved." />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Submit Report</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
