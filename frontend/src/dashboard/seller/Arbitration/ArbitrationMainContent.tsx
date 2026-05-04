"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Gavel,
  Scale,
  Clock,
  CheckCircle2,
} from "lucide-react"

import DisputeCard from "@/components/features/arbitration/components/DisputeCard"
import { Dispute,DisputeStatus, DisputeType } from "@/components/features/arbitration/ArbitrationView"
/* ===================== PROPS ===================== */

interface ArbitrationMainContentProps {
  disputes: Dispute[]
  activeTab: "overview" | "pending" | "resolved"
  setActiveTab: (tab: "overview" | "pending" | "resolved") => void

  onNewDispute: () => void
  onSelectDispute: (id: string) => void
  onRunAnalysis: (id: string) => void

  getStatusColor: (status: DisputeStatus) => string
  getTypeLabel: (type: DisputeType | string) => string

  isAnalyzing: boolean
}

/* ===================== COMPONENT ===================== */

export default function ArbitrationMainContent({
  disputes,
  activeTab,
  setActiveTab,
  onNewDispute,
  onSelectDispute,
  onRunAnalysis,
  getStatusColor,
  getTypeLabel,
  isAnalyzing,
}: ArbitrationMainContentProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          {/* Tabs Header */}
          <div className="flex items-center justify-between mb-8">
            <TabsList>
              <TabsTrigger value="overview">All Disputes</TabsTrigger>
              <TabsTrigger value="pending">Pending Analysis</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <Button onClick={onNewDispute}>
              <Gavel className="h-4 w-4 mr-2" />
              New Dispute
            </Button>
          </div>

          {/* ===================== OVERVIEW ===================== */}
          <TabsContent value="overview">
            <div className="grid gap-6">
              {disputes.map((dispute) => (
                <DisputeCard
                  key={dispute.id}
                  dispute={dispute}
                  getStatusColor={getStatusColor}
                  getTypeLabel={getTypeLabel}
                  onViewDetails={() => onSelectDispute(dispute.id)}
                  onRunAnalysis={() => onRunAnalysis(dispute.id)}
                  isAnalyzing={isAnalyzing}
                />
              ))}

              {disputes.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No Disputes Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven&apos;t filed any disputes yet.
                    </p>
                    <Button onClick={onNewDispute}>
                      <Gavel className="h-4 w-4 mr-2" />
                      File a Dispute
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* ===================== PENDING ===================== */}
          <TabsContent value="pending">
            <div className="grid gap-4">
              {disputes
                .filter(
                  (d) =>
                    d.status === "submitted" ||
                    d.status === "ai_analysis"
                )
                .map((dispute) => (
                  <Card key={dispute.id}>
                    <CardContent className="p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-100 dark:bg-purple-950/30 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">
                            {dispute.caseNumber}
                          </div>
                          <div className="font-medium">
                            {getTypeLabel(dispute.type)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <div className="text-lg font-bold text-primary">
                          ${dispute.claimAmount.toLocaleString()}
                        </div>
                        <Badge className={`${getStatusColor(dispute.status)} text-white`}>
                          {dispute.status.replace("_", " ")}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSelectDispute(dispute.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {disputes.filter(
                (d) =>
                  d.status === "submitted" ||
                  d.status === "ai_analysis"
              ).length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">
                      No Pending Disputes
                    </h3>
                    <p className="text-muted-foreground">
                      Disputes awaiting AI review will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* ===================== RESOLVED ===================== */}
          <TabsContent value="resolved">
            <div className="grid gap-4">
              {disputes
                .filter((d) => d.status === "resolved")
                .map((dispute) => (
                  <Card key={dispute.id}>
                    <CardContent className="p-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 dark:bg-green-950/30 p-2 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-mono text-sm text-muted-foreground">
                            {dispute.caseNumber}
                          </div>
                          <div className="font-medium">
                            {getTypeLabel(dispute.type)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        {dispute.resolution && (
                          <div className="text-lg font-bold text-green-600">
                            ${dispute.resolution.settlementAmount.toLocaleString()} settled
                          </div>
                        )}
                        <Badge className="bg-green-500 text-white">
                          Resolved
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSelectDispute(dispute.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

              {disputes.filter((d) => d.status === "resolved").length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">
                      No Resolved Disputes
                    </h3>
                    <p className="text-muted-foreground">
                      Resolved disputes will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
