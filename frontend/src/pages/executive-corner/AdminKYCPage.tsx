"use client"

import { useState, useEffect, useCallback } from "react"
import { useAdmin } from "@/contexts/admin-context"
import type { KYC } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  UserCheck,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  Mail,
  Calendar,
  Eye,
  Loader2,
  ShieldCheck,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// ─── helpers ──────────────────────────────────────────────────────────────────

function displayName(k: KYC) {
  return k.user?.first_name || k.user?.last_name
    ? `${k.user.first_name ?? ""} ${k.user.last_name ?? ""}`.trim()
    : k.user?.email ?? "—"
}

function initials(k: KYC) {
  return displayName(k)
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

// ─── KYC row ──────────────────────────────────────────────────────────────────

interface KycRowProps {
  kyc: KYC
  onView: (k: KYC) => void
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
  actionLoading: boolean
}

function KycRow({ kyc, onView, onApprove, onReject, actionLoading }: KycRowProps) {
  const statusColors: Record<string, string> = {
    pending:  "bg-amber-500/10  text-amber-500  border-amber-500/30",
    approved: "bg-green-500/10  text-green-500  border-green-500/30",
    rejected: "bg-red-500/10    text-red-500    border-red-500/30",
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-amber-500">
          {initials(kyc)}
        </div>
        <div>
          <p className="font-semibold">{displayName(kyc)}</p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {kyc.user?.email ?? "—"}
            </p>
            {kyc.id_type && (
              <>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {kyc.id_type}
                </p>
              </>
            )}
            <span className="text-muted-foreground hidden sm:inline">•</span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(kyc.created_at).toLocaleDateString()}
            </p>
          </div>
          {kyc.admin_comment && (
            <p className="text-xs text-muted-foreground mt-1 italic">"{kyc.admin_comment}"</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className={statusColors[kyc.status] ?? ""}>
          {kyc.status.charAt(0).toUpperCase() + kyc.status.slice(1)}
        </Badge>

        <Button size="sm" variant="outline" onClick={() => onView(kyc)}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>

        {onApprove && (
          <Button
            size="sm" variant="outline"
            className="border-green-500/30 text-green-500 hover:bg-green-500/10 bg-transparent"
            onClick={() => onApprove(kyc.id)}
            disabled={actionLoading}
          >
            <CheckCircle className="h-4 w-4 mr-1" /> Approve
          </Button>
        )}
        {onReject && (
          <Button
            size="sm" variant="outline"
            className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
            onClick={() => onReject(kyc.id)}
            disabled={actionLoading}
          >
            <XCircle className="h-4 w-4 mr-1" /> Reject
          </Button>
        )}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminKYCPage() {
  const { toast } = useToast()
  const { getPendingKyc, getKycStats, getKycList, approveKyc, rejectKyc, kycStats } = useAdmin()

  const [activeTab, setActiveTab]             = useState<"pending" | "approved" | "rejected">("pending")
  const [kycList, setKycList]                 = useState<KYC[]>([])
  const [loading, setLoading]                 = useState(true)
  const [searchQuery, setSearchQuery]         = useState("")
  const [viewEntry, setViewEntry]             = useState<KYC | null>(null)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectTarget, setRejectTarget]       = useState<string | null>(null)
  const [rejectComment, setRejectComment]     = useState("")
  const [actionLoading, setActionLoading]     = useState(false)

  // ── load stats once ──
  useEffect(() => {
    getKycStats().catch(() => {/* stats are non-critical */})
  }, [getKycStats])

  // ── load list whenever tab changes ──
  const loadList = useCallback(async (status: string) => {
    setLoading(true)
    try {
      const data = status === "pending"
        ? await getPendingKyc()
        : await getKycList(status)
      setKycList(data)
    } catch (err: any) {
      toast({
        title: "Failed to load KYC submissions",
        description: err?.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [getPendingKyc, getKycList, toast])

  useEffect(() => {
    loadList(activeTab)
  }, [activeTab, loadList])

  // ── approve ──
  const handleApprove = async (id: string) => {
    setActionLoading(true)
    try {
      await approveKyc(id, "")
      setKycList((prev) => prev.filter((k) => k.id !== id))
      await getKycStats()
      toast({ title: "KYC approved", description: "The submission has been approved." })
    } catch (err: any) {
      toast({ title: "Approval failed", description: err?.message, variant: "destructive" })
    } finally {
      setActionLoading(false)
    }
  }

  // ── reject ──
  const openRejectDialog = (id: string) => {
    setRejectTarget(id)
    setRejectComment("")
    setRejectDialogOpen(true)
  }

  const handleReject = async () => {
    if (!rejectTarget) return
    setActionLoading(true)
    try {
      await rejectKyc(rejectTarget, rejectComment)
      setKycList((prev) => prev.filter((k) => k.id !== rejectTarget))
      await getKycStats()
      toast({ title: "KYC rejected", description: "The submission has been rejected." })
      setRejectDialogOpen(false)
    } catch (err: any) {
      toast({ title: "Rejection failed", description: err?.message, variant: "destructive" })
    } finally {
      setActionLoading(false)
    }
  }

  const filtered = kycList.filter((k) => {
    const name  = displayName(k).toLowerCase()
    const email = (k.user?.email ?? "").toLowerCase()
    const q     = searchQuery.toLowerCase()
    return name.includes(q) || email.includes(q)
  })

  // ── tab label with badge ──
  const TabLabel = ({ label, count, color }: { label: string; count?: number; color: string }) => (
    <span className="flex items-center gap-2">
      {label}
      {count !== undefined && (
        <Badge variant="secondary" className={`text-xs px-1.5 py-0 ${color}`}>
          {count}
        </Badge>
      )}
    </span>
  )

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">KYC Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and approve Know Your Customer submissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold mt-2 text-amber-500">
                  {kycStats?.pending ?? "—"}
                </p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-xl">
                <UserCheck className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold mt-2 text-green-500">
                  {kycStats?.approved ?? "—"}
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <ShieldCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold mt-2 text-red-500">
                  {kycStats?.rejected ?? "—"}
                </p>
              </div>
              <div className="bg-red-500/10 p-3 rounded-xl">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as any); setSearchQuery("") }}>
        <TabsList>
          <TabsTrigger value="pending">
            <TabLabel
              label="Pending"
              count={kycStats?.pending}
              color="bg-amber-500/20 text-amber-600"
            />
          </TabsTrigger>
          <TabsTrigger value="approved">
            <TabLabel
              label="Approved"
              count={kycStats?.approved}
              color="bg-green-500/20 text-green-600"
            />
          </TabsTrigger>
          <TabsTrigger value="rejected">
            <TabLabel
              label="Rejected"
              count={kycStats?.rejected}
              color="bg-red-500/20 text-red-600"
            />
          </TabsTrigger>
        </TabsList>

        {(["pending", "approved", "rejected"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} KYC Submissions ({filtered.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No {tab} KYC submissions</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filtered.map((kyc) => (
                      <KycRow
                        key={kyc.id}
                        kyc={kyc}
                        onView={setViewEntry}
                        onApprove={tab === "pending" ? handleApprove : undefined}
                        onReject={tab === "pending" ? openRejectDialog : undefined}
                        actionLoading={actionLoading}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* View Document Dialog */}
      <Dialog open={!!viewEntry} onOpenChange={() => setViewEntry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>KYC Details — {viewEntry ? displayName(viewEntry) : ""}</DialogTitle>
          </DialogHeader>
          {viewEntry && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Email</span>
                <span>{viewEntry.user?.email ?? "—"}</span>
                <span className="text-muted-foreground">BVN</span>
                <span>{viewEntry.bvn ?? "—"}</span>
                <span className="text-muted-foreground">ID Type</span>
                <span>{viewEntry.id_type ?? "—"}</span>
                <span className="text-muted-foreground">ID Number</span>
                <span>{viewEntry.id_number ?? "—"}</span>
                <span className="text-muted-foreground">Status</span>
                <span className="capitalize">{viewEntry.status}</span>
                {viewEntry.admin_comment && (
                  <>
                    <span className="text-muted-foreground">Admin Note</span>
                    <span className="italic">{viewEntry.admin_comment}</span>
                  </>
                )}
              </div>

              {/* ID Document */}
              {viewEntry.id_document_url && (
                <div>
                  <p className="text-muted-foreground mb-2 font-medium">ID Document</p>
                  {viewEntry.id_document_url.match(/\.(pdf)$/i) ? (
                    <a
                      href={viewEntry.id_document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary underline"
                    >
                      <FileText className="h-4 w-4" /> View PDF Document
                    </a>
                  ) : (
                    <a href={viewEntry.id_document_url} target="_blank" rel="noopener noreferrer">
                      <img
                        src={viewEntry.id_document_url}
                        alt="ID Document"
                        className="w-full max-h-48 object-contain rounded-lg border"
                      />
                    </a>
                  )}
                </div>
              )}

              {/* Face Photo */}
              {viewEntry.face_photo_url && (
                <div>
                  <p className="text-muted-foreground mb-2 font-medium">Face Photo</p>
                  <img
                    src={viewEntry.face_photo_url}
                    alt="Face"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* Quick actions from view dialog (pending only) */}
              {viewEntry.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => { handleApprove(viewEntry.id); setViewEntry(null) }}
                    disabled={actionLoading}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm" variant="destructive" className="flex-1"
                    onClick={() => { setViewEntry(null); openRejectDialog(viewEntry.id) }}
                    disabled={actionLoading}
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject KYC Submission</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Provide a reason for rejection. The user will see this message.
            </p>
            <Textarea
              placeholder="e.g. Document is blurry or expired..."
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={actionLoading || !rejectComment.trim()}
            >
              {actionLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Rejecting…</> : "Confirm Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
