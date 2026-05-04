"use client"

import {
  ShieldCheck,
  AlertTriangle,
  Radio,
  MapPin,
  LifeBuoy,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SecurityHotlineView } from "@/components/features/security-hotline/SecurityHotlineView"

export default function UserSecurityHotlineDashboard() {
  return (
    <div className="space-y-8">
      {/* ===================== HERO / CONTEXT ===================== */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-500/10 via-background to-blue-500/10 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Live Maritime Security Hotline
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Security & Incident Monitoring
            </h1>

            <p className="text-muted-foreground mt-2">
              Report threats, track incidents, and collaborate with maritime
              authorities to protect your vessels, crew, and cargo in real time.
            </p>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Hotline Active
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Route Coverage Enabled
            </Badge>
          </div>
        </div>
      </div>

      {/* ===================== STATUS STRIP ===================== */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatusCard
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          title="Active Monitoring"
          description="Your voyages are currently under active security watch."
        />

        <StatusCard
          icon={<LifeBuoy className="h-5 w-5 text-blue-500" />}
          title="Agency Collaboration"
          description="Connected to port authorities & maritime security units."
        />

        <StatusCard
          icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
          title="Compliance Ready"
          description="Incident logs meet insurance & regulatory standards."
        />
      </div>

      {/* ===================== PRIMARY WORKSPACE ===================== */}
      <Card className="rounded-2xl">
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-base">
                Incident Reporting & Response Center
              </CardTitle>
              <CardDescription>
                File new security alerts, track responses, and communicate with
                authorities handling your case.
              </CardDescription>
            </div>

            <Button size="sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report New Incident
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <SecurityHotlineView />
        </CardContent>
      </Card>
    </div>
  )
}

/* ===================== SUB COMPONENT ===================== */

function StatusCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="rounded-lg bg-muted p-2">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
