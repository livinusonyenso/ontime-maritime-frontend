"use client";

import { useState } from "react";
import {
  Gavel,
  Timer,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  AlertTriangle,
  Search,
  Tag,
  Ship,
  DollarSign,
  Info,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

type AuctionStatus = "live" | "upcoming" | "closed";

type AuctionLot = {
  id: string;
  lotRef: string;
  title: string;
  category: string;
  port: string;
  vessel: string;
  closingIn: string;
  status: AuctionStatus;
  currentBid: string;
  yourBid?: string;
  reserveMet: boolean;
  bidsCount: number;
  participation: "not_joined" | "watching" | "bidding";
};

const mockAuctions: AuctionLot[] = [
  {
    id: "1",
    lotRef: "AUC-ONTM-2041",
    title: "30,000 MT Premium Diesel – CIF Lagos",
    category: "Refined Products",
    port: "Lagos, Nigeria",
    vessel: "MT Ocean Spirit",
    closingIn: "01h 32m",
    status: "live",
    currentBid: "$28,900,000",
    yourBid: "$28,600,000",
    reserveMet: true,
    bidsCount: 14,
    participation: "bidding",
  },
  {
    id: "2",
    lotRef: "AUC-ONTM-2032",
    title: "5,000 MT Urea – FOB Jebel Ali",
    category: "Fertilizer",
    port: "Jebel Ali, UAE",
    vessel: "MV Gulf Trader",
    closingIn: "Tomorrow, 11:00 GMT",
    status: "upcoming",
    currentBid: "$3,450,000",
    reserveMet: false,
    bidsCount: 6,
    participation: "watching",
  },
  {
    id: "3",
    lotRef: "AUC-ONTM-2019",
    title: "12,500 MT Crude – Spot Cargo",
    category: "Crude Oil",
    port: "Bonny, Nigeria",
    vessel: "MT West Atlantic",
    closingIn: "Closed",
    status: "closed",
    currentBid: "$11,200,000",
    yourBid: "$11,050,000",
    reserveMet: true,
    bidsCount: 21,
    participation: "bidding",
  },
];

function statusConfig(status: AuctionStatus) {
  switch (status) {
    case "live":
      return {
        label: "Live",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
      };
    case "upcoming":
      return {
        label: "Upcoming",
        color: "text-blue-700 bg-blue-50 border-blue-200",
      };
    case "closed":
      return {
        label: "Closed",
        color: "text-slate-700 bg-slate-50 border-slate-200",
      };
    default:
      return {
        label: "Unknown",
        color: "text-slate-700 bg-slate-50 border-slate-200",
      };
  }
}

export default function BuyerAuctionsPage() {
  const [selectedLotId, setSelectedLotId] = useState<string | null>(
    mockAuctions.length ? mockAuctions[0].id : null
  );

  const selectedLot =
    mockAuctions.find((lot) => lot.id === selectedLotId) ?? mockAuctions[0];

  const live = mockAuctions.filter((a) => a.status === "live").length;
  const upcoming = mockAuctions.filter((a) => a.status === "upcoming").length;
  const closed = mockAuctions.filter((a) => a.status === "closed").length;

  return (
   <>
   <Header/>
    <div className="flex-1 px-4 py-6 md:px-6 lg:px-10 bg-muted/40">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Gavel className="h-6 w-6 text-primary" />
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Buyer Auctions
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover live maritime cargo auctions, track bids in real time, and place secured
              offers directly from your buyer dashboard.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button variant="outline" size="sm" className="gap-2">
            <Search className="h-4 w-4" />
            Explore all auctions
          </Button>
          <Button size="sm" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            My bidding activity
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Live Auctions</CardTitle>
            <Timer className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{live}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Auctions you can bid on right now.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{upcoming}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Auctions you are watching or pre-registered for.
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{closed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed auctions with final pricing and outcomes.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.5fr)]">
        {/* Left: list + details */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Active & Upcoming Auctions
                </CardTitle>
                <CardDescription>
                  Compare lots, watch auctions, and jump into bidding when you’re ready.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    className="h-8 w-40 md:w-52 pl-7 text-xs"
                    placeholder="Search by lot, port, or vessel..."
                  />
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
                {/* Auction list */}
                <div className="space-y-3 border rounded-lg p-3 bg-background/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      YOUR AUCTIONS
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {mockAuctions.length} lots
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {mockAuctions.map((lot) => {
                      const cfg = statusConfig(lot.status);
                      const isActive = selectedLotId === lot.id;
                      return (
                        <button
                          key={lot.id}
                          type="button"
                          onClick={() => setSelectedLotId(lot.id)}
                          className={`w-full text-left rounded-lg border px-3 py-2.5 text-xs md:text-sm transition hover:border-primary/50 hover:bg-primary/5 ${
                            isActive ? "border-primary bg-primary/5" : "border-border bg-background"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-medium text-[13px] md:text-sm">
                                  {lot.lotRef}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`border ${cfg.color} text-[10px] px-1.5 py-0`}
                                >
                                  {cfg.label}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="border border-slate-200 bg-slate-50 text-[10px] px-1.5 py-0"
                                >
                                  {lot.category}
                                </Badge>
                              </div>
                              <p className="text-[11px] md:text-xs text-foreground">
                                {lot.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                                <Ship className="h-3 w-3" />
                                {lot.port} · {lot.vessel}
                              </p>
                            </div>
                            <div className="text-right text-[10px] text-muted-foreground space-y-1">
                              <p className="font-semibold text-foreground">
                                {lot.currentBid}
                              </p>
                              {lot.yourBid && (
                                <p className="text-[10px]">
                                  Your bid:{" "}
                                  <span className="font-medium">{lot.yourBid}</span>
                                </p>
                              )}
                              <p>{lot.closingIn}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected lot details */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">LOT REFERENCE</p>
                      <p className="text-sm md:text-base font-semibold">
                        {selectedLot.lotRef}
                      </p>
                      <p className="text-sm text-foreground">{selectedLot.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {selectedLot.category} · {selectedLot.port}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="outline"
                        className={`border ${statusConfig(selectedLot.status).color}`}
                      >
                        {statusConfig(selectedLot.status).label}
                      </Badge>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {selectedLot.closingIn}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Card className="border-dashed border-muted bg-background/40">
                      <CardContent className="py-3 px-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <DollarSign className="h-4 w-4 text-primary" />
                          Current Highest Bid
                        </div>
                        <p className="text-lg font-semibold mt-1">
                          {selectedLot.currentBid}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Reserve {selectedLot.reserveMet ? "met ✅" : "not met yet"}.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-dashed border-muted bg-background/40">
                      <CardContent className="py-3 px-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          Your Position
                        </div>
                        {selectedLot.yourBid ? (
                          <>
                            <p className="text-sm font-semibold mt-1">
                              Your last bid: {selectedLot.yourBid}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              You’re actively bidding on this lot.
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold mt-1">
                              No bid placed yet.
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              Join the auction before it closes to compete for this lot.
                            </p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border border-dashed bg-background/60">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        Auction Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-1 space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {selectedLot.bidsCount} bids placed so far on this lot.
                      </p>
                      <Progress
                        value={Math.min(selectedLot.bidsCount * 4, 100)}
                        className="h-1.5"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Higher bidding activity often signals strong demand. Monitor closing time
                        and adjust your bid strategy accordingly.
                      </p>
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="bidding" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="bidding" className="text-xs">
                        Place Bid
                      </TabsTrigger>
                      <TabsTrigger value="history" className="text-xs">
                        Bid History
                      </TabsTrigger>
                      <TabsTrigger value="terms" className="text-xs">
                        Lot Terms
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="bidding"
                      className="mt-3 border rounded-lg p-3 bg-background/60 space-y-3"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-medium">
                          Your Bid Amount (USD)
                        </label>
                        <Input
                          className="h-8 text-xs"
                          placeholder="Enter your bid, e.g. 28,950,000"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium">
                          Notes to Seller / Auction Desk{" "}
                          <span className="text-[10px] text-muted-foreground">(optional)</span>
                        </label>
                        <Input
                          className="h-8 text-xs"
                          placeholder="Add clarifications on delivery, laycan, payment terms..."
                        />
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-[11px] text-muted-foreground flex items-start gap-1">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                          Once submitted, bids may be binding according to auction terms and
                          platform rules.
                        </p>
                        <Button size="sm" className="gap-1.5">
                          Confirm & place bid
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="history"
                      className="mt-3 border rounded-lg p-3 bg-background/60"
                    >
                      <div className="space-y-2 text-xs">
                        <p className="font-medium">Recent bidding activity</p>
                        <p className="text-muted-foreground">
                          For privacy reasons, you may only see anonymized bidding history, not
                          full counterparty identities.
                        </p>
                        <ul className="space-y-2 mt-2">
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                            <div>
                              <p className="font-medium">New highest bid placed</p>
                              <p className="text-muted-foreground">
                                Highest bid updated to {selectedLot.currentBid}. Closing in{" "}
                                {selectedLot.closingIn}.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-slate-400" />
                            <div>
                              <p className="font-medium">Bid increments applied</p>
                              <p className="text-muted-foreground">
                                Bids must respect minimum increment rules and cannot be reduced
                                once submitted.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="terms"
                      className="mt-3 border rounded-lg p-3 bg-background/60"
                    >
                      <div className="space-y-2 text-xs">
                        <p className="font-medium">Key commercial terms (example)</p>
                        <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                          <li>Delivery: CIF {selectedLot.port}</li>
                          <li>Payment terms: LC / Escrow via platform</li>
                          <li>Laycan window and demurrage negotiated post-award</li>
                          <li>Final contract subject to KYC, compliance & documentation</li>
                        </ul>
                        <p className="text-[11px] text-muted-foreground mt-2">
                          Always review the full auction documentation before placing binding
                          bids. Contact support if any details are unclear.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: filters + guidance */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <FilterIcon />
                Auction Filters
              </CardTitle>
              <CardDescription>
                Narrow down auctions by status, category, and port to match your buying strategy.
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Status</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Live
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Upcoming
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Closed
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-foreground">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Crude
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Refined Products
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Fertilizer
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer text-[11px]">
                    Others
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-medium text-foreground">Region / Port</p>
                <Input
                  className="h-8 text-xs"
                  placeholder="e.g. Lagos, Jebel Ali..."
                />
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between items-center">
                <p className="text-[11px] text-muted-foreground">
                  Adjust filters to refresh auction recommendations.
                </p>
                <Button variant="outline" size="sm" className="h-7 text-[11px] px-2">
                  Reset filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-background/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Smart Bidding Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs md:text-[13px] text-muted-foreground">
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <span className="font-medium text-foreground">Define your limits.</span>{" "}
                  Decide your maximum acceptable bid <em>before</em> the auction intensifies.
                </li>
                <li>
                  <span className="font-medium text-foreground">Watch closing windows.</span>{" "}
                  Last-minute bids can change the outcome—monitor time zones & laycan.
                </li>
                <li>
                  <span className="font-medium text-foreground">Check documentation.</span>{" "}
                  Always verify BOL, specs, inspection reports, and loading port details.
                </li>
                <li>
                  <span className="font-medium text-foreground">Leverage arbitration.</span>{" "}
                  For serious disputes post-award, use the arbitration module rather than
                  informal channels.
                </li>
              </ul>

              <Separator />

              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                <p className="text-[11px]">
                  <span className="font-medium text-foreground">Platform protection:</span> All
                  awarded auctions are logged, time-stamped, and supported by auditable
                  documentation for compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
}

/**
 * Small helper icon composition to avoid importing another library.
 */
function FilterIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-dashed border-primary/40 bg-primary/5">
      <Timer className="h-3 w-3 text-primary" />
    </span>
  );
}
