"use client";

import { FormEvent } from "react";
import {
  ShieldAlert,
  PhoneCall,
  MessageCircle,
  AlertTriangle,
  ShieldCheck,
  Siren,
  RadioTower,
  MapPin,
  Mail,
  Info,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const emergencyChannels = [
  {
    id: "police",
    label: "Maritime Police / Local Police",
    description: "Use for physical security threats, robbery, hijack, crew safety issues at port or anchorage.",
    phone: "+234 800 123 4567",
    altPhone: "+234 800 987 6543",
    email: "maritime-police@security.gov",
    type: "High priority · 24/7",
    icon: Siren,
    tone: "bg-red-50 border-red-200 text-red-800",
  },
  {
    id: "efcc",
    label: "EFCC / Financial Crimes",
    description: "Report fraud, payment diversion, fake escrow, or suspicious financial activity.",
    phone: "+234 700 333 4444",
    altPhone: "",
    email: "maritime-frauddesk@efcc.gov",
    type: "Financial crime · Official channel",
    icon: ShieldAlert,
    tone: "bg-amber-50 border-amber-200 text-amber-800",
  },
  {
    id: "maritime-forces",
    label: "Maritime Forces / Navy",
    description: "For piracy risk, suspicious vessels, or violence at sea. Use only for real threats.",
    phone: "+234 800 NAVY 999",
    altPhone: "",
    email: "ops-room@naval-ops.mil",
    type: "Critical · Operations room",
    icon: RadioTower,
    tone: "bg-blue-50 border-blue-200 text-blue-800",
  },
  {
    id: "platform-security",
    label: "OnTime Maritime Security Desk",
    description: "Platform support for locked accounts, scam listings, impersonation, or dispute escalation.",
    phone: "+234 901 000 0000",
    altPhone: "",
    email: "security@ontimemaritime.com",
    type: "Platform · Non-emergency",
    icon: ShieldCheck,
    tone: "bg-emerald-50 border-emerald-200 text-emerald-800",
  },
];

export default function BuyerSecurityHotlinePage() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you can plug into your API or ticketing system later
    console.log("Security incident submitted");
  };

  return (
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ShieldAlert className="h-6 w-6 text-primary" />
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Buyer Security Hotline
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Contact official maritime security channels, report incidents, and notify the OnTime
              security team directly from your buyer dashboard.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            View incident history
          </Button>
          <Button size="sm" className="gap-2">
            <PhoneCall className="h-4 w-4" />
            Quick emergency guide
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Critical Channels</CardTitle>
            <ShieldAlert className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">3</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Maritime Police, EFCC, and Maritime Forces available for emergencies.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Platform Security</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1</div>
            <p className="mt-1 text-xs text-muted-foreground">
              OnTime Maritime security team for account & transaction safety.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Response Reminder</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              For life-threatening emergencies, always contact your{" "}
              <span className="font-semibold text-foreground">local emergency number</span>{" "}
              first, then inform relevant maritime/security channels.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main layout */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.5fr)]">
        {/* Left: Hotline directory */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-primary" />
                Security & Enforcement Channels
              </CardTitle>
              <CardDescription>
                Choose the right channel based on the type of risk: physical, financial, or platform-related.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3">
              {emergencyChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.id}
                    className={`rounded-lg border px-3 py-3 text-xs md:text-sm flex flex-col gap-2 md:flex-row md:items-center md:justify-between ${channel.tone}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-8 w-8 rounded-lg bg-white/70 flex items-center justify-center">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-[13px] md:text-sm">
                            {channel.label}
                          </p>
                          <Badge
                            variant="outline"
                            className="border-white/60 bg-white/60 text-[10px]"
                          >
                            {channel.type}
                          </Badge>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-700">
                          {channel.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-3 text-[11px]">
                          {channel.phone && (
                            <span className="flex items-center gap-1">
                              <PhoneCall className="h-3 w-3" />
                              {channel.phone}
                            </span>
                          )}
                          {channel.altPhone && (
                            <span className="flex items-center gap-1">
                              <PhoneCall className="h-3 w-3" />
                              {channel.altPhone}
                            </span>
                          )}
                          {channel.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {channel.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2 md:mt-0 md:flex-col">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 text-[11px] bg-white/80"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 text-[11px] bg-white/80"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Message
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-background/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                When should I use the hotline?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs md:text-[13px] text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Use these channels when:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>There is an immediate threat to crew or cargo safety.</li>
                <li>You detect fraud related to payments, escrow, or fake accounts.</li>
                <li>A vessel appears to be at risk of piracy or armed robbery.</li>
                <li>You need to officially log a security incident related to a shipment booked via the platform.</li>
              </ul>
              <p className="text-[11px]">
                For general support (password reset, profile update, shipment ETA questions), please
                use the normal support channels instead of emergency lines.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Incident report form */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                Report a Security Incident
              </CardTitle>
              <CardDescription>
                This creates a record with the OnTime security team and can be shared with official agencies if needed.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Incident Type
                  </label>
                  <Select defaultValue="physical">
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical / Crew Safety</SelectItem>
                      <SelectItem value="fraud">Fraud / Financial Crime</SelectItem>
                      <SelectItem value="cyber">Cyber / Account Security</SelectItem>
                      <SelectItem value="vessel">Vessel / Cargo Risk</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Related Shipment / BOL Reference{" "}
                    <span className="text-[10px] text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    className="h-9 text-xs"
                    placeholder="e.g. BOL-ONTM-9021, Contract #REF-2025-004"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Location</label>
                  <Input
                    className="h-9 text-xs"
                    placeholder="Port, anchorage, corridor (e.g. Lagos Anchorage, Gulf of Guinea)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Brief Description
                  </label>
                  <Textarea
                    className="min-h-[100px] text-xs"
                    placeholder="Describe what happened, who is involved, and any immediate risks. Focus on facts, timestamps, and evidence you may have (photos, documents, etc.)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Best Contact for Follow-up
                  </label>
                  <Input
                    className="h-9 text-xs"
                    placeholder="Phone number or email to reach you quickly"
                  />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-1">
                  <p className="text-[11px] text-muted-foreground flex items-start gap-1">
                    <MapPin className="h-3.5 w-3.5 mt-0.5" />
                    Only share information you’re comfortable logging. Urgent life-threatening cases
                    should go to local emergency numbers first.
                  </p>
                  <Button type="submit" size="sm" className="gap-1.5">
                    Submit incident
                    <ShieldAlert className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-background/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                How OnTime handles your report
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs md:text-[13px] text-muted-foreground space-y-2">
              <ul className="list-disc list-inside space-y-1">
                <li>Your incident is logged and given a reference ID.</li>
                <li>The security team reviews severity and may contact you for clarification.</li>
                <li>Where appropriate, we may coordinate with Police, EFCC, or Maritime Forces.</li>
                <li>Outcomes (warnings, account actions, evidence sharing) are tracked in a secure audit trail.</li>
              </ul>
              <p className="text-[11px]">
                Our goal is to protect both buyers and sellers while keeping a compliant, documented
                security process for every serious incident.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
