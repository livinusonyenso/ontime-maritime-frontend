"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function EBOLModule() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Digital Bill of Lading (e-BOL)</h1>
        <p className="text-muted-foreground">
          Create, upload, and validate Bills of Lading. This module runs inside the dashboard without reloading the header or sidebar.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create / Register BOL</CardTitle>
          <CardDescription>Use dummy data for now – this is wired for future API integration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="bolNumber">BOL Number</Label>
              <Input id="bolNumber" placeholder="e.g. OTM-2025-0001" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="shipper">Shipper</Label>
              <Input id="shipper" placeholder="Shipper name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="consignee">Consignee</Label>
              <Input id="consignee" placeholder="Consignee name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="vessel">Vessel / Voyage</Label>
              <Input id="vessel" placeholder="Vessel or voyage details" />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="cargo">Cargo Description</Label>
            <Textarea id="cargo" rows={3} placeholder="Short description of the cargo" />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline">$50 / BOL</Badge>
            <span className="text-muted-foreground">Flat validation fee (dummy for now).</span>
          </div>
          <Button>Save &amp; Validate</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
