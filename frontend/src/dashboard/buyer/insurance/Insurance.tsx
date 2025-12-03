"use client";

import { ShieldCheck, FileText, AlertTriangle, Wallet, CheckCircle2, PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BuyersInsurance() {
  return (
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">

      {/* PAGE HEADER */}
      <div className="flex items-start gap-3 mb-8">
        <span className="inline-flex h-10 w-10 items-center justify-center bg-primary/10 rounded-xl">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </span>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Buyer Cargo Insurance</h1>
          <p className="text-sm text-muted-foreground">
            Protect your shipment with trusted insurance partners. View, request, or manage your cargo insurance policies.
          </p>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid gap-4 md:grid-cols-3 mb-10">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <ShieldCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Your shipments currently under insurance coverage.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Claims Submitted</CardTitle>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1</div>
            <p className="text-xs text-muted-foreground mt-1">Pending review by insurer.</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Premiums Paid</CardTitle>
            <Wallet className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">$1,850</div>
            <p className="text-xs text-muted-foreground mt-1">Total across all policies.</p>
          </CardContent>
        </Card>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1.3fr]">

        {/* LEFT SECTION – Insurance List */}
        <div className="space-y-6">

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Your Insurance Policies
              </CardTitle>
              <CardDescription>
                View active and expired insurance coverage for your shipments.
              </CardDescription>
            </CardHeader>

            <Separator />
            <CardContent className="pt-4 space-y-4">

              {/* POLICY 1 */}
              <div className="border rounded-lg p-4 bg-background/70 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="font-semibold">Policy #INS-2025-004</p>
                  <p className="text-xs text-muted-foreground">
                    Covers: BOL-ONTM-9021 — Vessel: MT Ocean Spirit
                  </p>

                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-700 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="h-3 w-3" />
                      Active · Valid until Mar 12, 2025
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" /> View Policy
                  </Button>
                  <Button size="sm" className="gap-1">
                    <AlertTriangle className="h-4 w-4" /> File Claim
                  </Button>
                </div>
              </div>

              {/* POLICY 2 */}
              <div className="border rounded-lg p-4 bg-background/70 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="font-semibold">Policy #INS-2024-018</p>
                  <p className="text-xs text-muted-foreground">
                    Covers: BOL-ONTM-8874 — Vessel: MV Pacific Trader
                  </p>

                  <div className="mt-2">
                    <span className="text-xs px-2 py-1 rounded bg-zinc-200 text-zinc-700 w-fit">
                      Expired · Dec 02, 2024
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" /> View Policy
                  </Button>
                  <Button size="sm" disabled className="gap-1 opacity-60">
                    <AlertTriangle className="h-4 w-4" /> File Claim
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>

        {/* RIGHT SECTION – Request Insurance */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-primary" />
                Request New Insurance
              </CardTitle>
              <CardDescription>
                Submit a quick request to get insurance pricing and coverage options.
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="pt-4">
              <form className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Shipment / BOL Reference</label>
                  <Input className="text-xs" placeholder="BOL-ONTM-9021" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Cargo Description</label>
                  <Input className="text-xs" placeholder="e.g. 500MT diesel fuel" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Declared Value (USD)</label>
                  <Input className="text-xs" placeholder="e.g. 120000" type="number" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Additional Notes</label>
                  <Textarea
                    className="text-xs"
                    placeholder="Any special conditions or requirements?"
                  />
                </div>

                <Button className="w-full mt-3">Submit Request</Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
