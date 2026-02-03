import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  FileText,
  Mail,
  Calendar,
} from "lucide-react"

interface KycEntry {
  id: string
  userName: string
  email: string
  documentType: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
}

const initialKyc: KycEntry[] = [
  {
    id: "kyc-1",
    userName: "James Wilson",
    email: "james@wilsonshipping.com",
    documentType: "Business Registration",
    submittedAt: "2024-01-28",
    status: "pending",
  },
  {
    id: "kyc-2",
    userName: "Aisha Mohammed",
    email: "aisha@lagoscargo.ng",
    documentType: "Government ID",
    submittedAt: "2024-01-27",
    status: "pending",
  },
  {
    id: "kyc-3",
    userName: "Li Wei",
    email: "liwei@shanghaitrade.cn",
    documentType: "Proof of Address",
    submittedAt: "2024-01-26",
    status: "pending",
  },
  {
    id: "kyc-4",
    userName: "Carlos Rivera",
    email: "carlos@mexicofreight.mx",
    documentType: "Business Registration",
    submittedAt: "2024-01-25",
    status: "pending",
  },
  {
    id: "kyc-5",
    userName: "Emma Thompson",
    email: "emma@ukmaritimeservices.co.uk",
    documentType: "Tax Certificate",
    submittedAt: "2024-01-24",
    status: "pending",
  },
]

export default function AdminKYCPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [kycList, setKycList] = useState<KycEntry[]>(initialKyc)

  const filteredKyc = kycList.filter(
    (k) =>
      k.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingCount = filteredKyc.filter((k) => k.status === "pending").length

  const handleApprove = (id: string) => {
    setKycList((prev) => prev.filter((k) => k.id !== id))
  }

  const handleReject = (id: string) => {
    setKycList((prev) => prev.filter((k) => k.id !== id))
  }

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
                <p className="text-3xl font-bold mt-2 text-amber-500">{pendingCount}</p>
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
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold mt-2 text-green-500">156</p>
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
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-3xl font-bold mt-2 text-red-500">23</p>
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

      {/* KYC List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Pending KYC Submissions ({filteredKyc.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredKyc.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No pending KYC submissions</p>
                <p className="text-sm">All submissions have been reviewed</p>
              </div>
            ) : (
              filteredKyc.map((kyc) => (
                <div
                  key={kyc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-amber-500">
                      {kyc.userName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold">{kyc.userName}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {kyc.email}
                        </p>
                        <span className="text-muted-foreground hidden sm:inline">•</span>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {kyc.documentType}
                        </p>
                        <span className="text-muted-foreground hidden sm:inline">•</span>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {kyc.submittedAt}
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
                      className="border-green-500/30 text-green-500 hover:bg-green-500/10 bg-transparent"
                      onClick={() => handleApprove(kyc.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                      onClick={() => handleReject(kyc.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
