import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  Mail,
  Calendar,
  Eye,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api"

interface KycEntry {
  id: string
  user_id: string
  bvn: string | null
  id_type: string | null
  id_number: string | null
  id_document_url: string | null
  face_photo_url: string | null
  status: "pending" | "approved" | "rejected"
  admin_comment: string | null
  created_at: string
  user?: { email: string; first_name?: string; last_name?: string }
}

export default function AdminKYCPage() {
  const { toast } = useToast()
  const [kycList, setKycList] = useState<KycEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectTarget, setRejectTarget] = useState<string | null>(null)
  const [rejectComment, setRejectComment] = useState("")
  const [actionLoading, setActionLoading] = useState(false)
  const [viewEntry, setViewEntry] = useState<KycEntry | null>(null)

  useEffect(() => {
    fetchPending()
  }, [])

  const fetchPending = async () => {
    try {
      setLoading(true)
      const response = await api.get("/kyc/pending")
      setKycList(response.data)
    } catch (err: any) {
      toast({
        title: "Failed to load KYC submissions",
        description: err?.data?.message || err.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    setActionLoading(true)
    try {
      await api.patch(`/kyc/${id}/approve`)
      setKycList((prev) => prev.filter((k) => k.id !== id))
      toast({ title: "KYC approved", description: "The submission has been approved." })
    } catch (err: any) {
      toast({
        title: "Approval failed",
        description: err?.data?.message || err.message,
        variant: "destructive",
      })
    } finally {
      setActionLoading(false)
    }
  }

  const openRejectDialog = (id: string) => {
    setRejectTarget(id)
    setRejectComment("")
    setRejectDialogOpen(true)
  }

  const handleReject = async () => {
    if (!rejectTarget) return
    setActionLoading(true)
    try {
      await api.patch(`/kyc/${rejectTarget}/reject`, { comment: rejectComment })
      setKycList((prev) => prev.filter((k) => k.id !== rejectTarget))
      toast({ title: "KYC rejected", description: "The submission has been rejected." })
      setRejectDialogOpen(false)
    } catch (err: any) {
      toast({
        title: "Rejection failed",
        description: err?.data?.message || err.message,
        variant: "destructive",
      })
    } finally {
      setActionLoading(false)
    }
  }

  const filtered = kycList.filter((k) => {
    const name = `${k.user?.first_name ?? ""} ${k.user?.last_name ?? ""}`.toLowerCase()
    const email = (k.user?.email ?? "").toLowerCase()
    const q = searchQuery.toLowerCase()
    return name.includes(q) || email.includes(q)
  })

  const displayName = (k: KycEntry) =>
    k.user?.first_name || k.user?.last_name
      ? `${k.user.first_name ?? ""} ${k.user.last_name ?? ""}`.trim()
      : k.user?.email ?? "—"

  const initials = (k: KycEntry) =>
    displayName(k)
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">KYC Management</h1>
        <p className="text-muted-foreground mt-1">Review and approve Know Your Customer submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold mt-2 text-amber-500">{kycList.length}</p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Showing</p>
                <p className="text-3xl font-bold mt-2 text-green-500">{filtered.length}</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">With Documents</p>
                <p className="text-3xl font-bold mt-2 text-blue-500">
                  {kycList.filter((k) => k.id_document_url).length}
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <FileText className="h-6 w-6 text-blue-500" />
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

      {/* KYC List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Pending KYC Submissions ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No pending KYC submissions</p>
              <p className="text-sm">All submissions have been reviewed</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((kyc) => (
                <div
                  key={kyc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
                >
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
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                      Pending
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewEntry(kyc)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500/30 text-green-500 hover:bg-green-500/10 bg-transparent"
                      onClick={() => handleApprove(kyc.id)}
                      disabled={actionLoading}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => openRejectDialog(kyc.id)}
                      disabled={actionLoading}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Document Dialog */}
      <Dialog open={!!viewEntry} onOpenChange={() => setViewEntry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>KYC Details — {viewEntry ? displayName(viewEntry) : ""}</DialogTitle>
          </DialogHeader>
          {viewEntry && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Email</span>
                <span>{viewEntry.user?.email ?? "—"}</span>
                <span className="text-muted-foreground">BVN</span>
                <span>{viewEntry.bvn ?? "—"}</span>
                <span className="text-muted-foreground">ID Type</span>
                <span>{viewEntry.id_type ?? "—"}</span>
                <span className="text-muted-foreground">ID Number</span>
                <span>{viewEntry.id_number ?? "—"}</span>
              </div>
              {viewEntry.id_document_url && (
                <div>
                  <p className="text-muted-foreground mb-1">ID Document</p>
                  <a
                    href={viewEntry.id_document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline break-all"
                  >
                    View Document
                  </a>
                </div>
              )}
              {viewEntry.face_photo_url && (
                <div>
                  <p className="text-muted-foreground mb-1">Face Photo</p>
                  <img
                    src={viewEntry.face_photo_url}
                    alt="Face"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
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
              {actionLoading ? "Rejecting…" : "Confirm Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
