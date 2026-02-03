import type React from "react"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ScrollText,
  Search,
  User,
  Shield,
  FileText,
  Settings,
  LogIn,
  Trash2,
  Edit,
} from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  user: string
  action: string
  details: string
  ip: string
  category: string
}

const dummyLogs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "2024-01-30 14:32:15",
    user: "admin@ontimemaritime.com",
    action: "user_role_updated",
    details: "Changed user john@globalfreight.com role from 'buyer' to 'seller'",
    ip: "192.168.1.45",
    category: "user",
  },
  {
    id: "log-2",
    timestamp: "2024-01-30 14:15:08",
    user: "admin@ontimemaritime.com",
    action: "document_approved",
    details: "Approved Bill of Lading #BOL-2024-1234",
    ip: "192.168.1.45",
    category: "document",
  },
  {
    id: "log-3",
    timestamp: "2024-01-30 13:50:22",
    user: "system",
    action: "kyc_auto_rejected",
    details: "Auto-rejected KYC for user carlos@mexicofreight.mx - document expired",
    ip: "10.0.0.1",
    category: "security",
  },
  {
    id: "log-4",
    timestamp: "2024-01-30 12:45:00",
    user: "admin@ontimemaritime.com",
    action: "admin_login",
    details: "Admin login from new device",
    ip: "203.45.67.89",
    category: "auth",
  },
  {
    id: "log-5",
    timestamp: "2024-01-30 11:30:45",
    user: "admin@ontimemaritime.com",
    action: "auction_deleted",
    details: "Deleted auction 'Container Slot - Lagos to Rotterdam' (ID: AUC-2024-0045)",
    ip: "192.168.1.45",
    category: "auction",
  },
  {
    id: "log-6",
    timestamp: "2024-01-30 10:15:33",
    user: "admin@ontimemaritime.com",
    action: "settings_updated",
    details: "Updated platform maintenance window to Saturday 2:00 AM - 4:00 AM",
    ip: "192.168.1.45",
    category: "settings",
  },
  {
    id: "log-7",
    timestamp: "2024-01-29 18:20:10",
    user: "admin@ontimemaritime.com",
    action: "user_suspended",
    details: "Suspended user maria@euroship.com - suspicious activity detected",
    ip: "192.168.1.45",
    category: "security",
  },
  {
    id: "log-8",
    timestamp: "2024-01-29 16:05:55",
    user: "system",
    action: "backup_completed",
    details: "Daily database backup completed successfully (2.3 GB)",
    ip: "10.0.0.1",
    category: "system",
  },
  {
    id: "log-9",
    timestamp: "2024-01-29 14:40:22",
    user: "admin@ontimemaritime.com",
    action: "insurance_provider_added",
    details: "Added new provider: Pacific Maritime Insurance Co.",
    ip: "192.168.1.45",
    category: "settings",
  },
  {
    id: "log-10",
    timestamp: "2024-01-29 12:00:00",
    user: "admin@ontimemaritime.com",
    action: "admin_login",
    details: "Admin login successful",
    ip: "192.168.1.45",
    category: "auth",
  },
]

const categoryConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  user: { icon: User, color: "text-primary bg-primary/10", label: "User" },
  document: { icon: FileText, color: "text-secondary bg-secondary/10", label: "Document" },
  security: { icon: Shield, color: "text-red-500 bg-red-500/10", label: "Security" },
  auth: { icon: LogIn, color: "text-green-500 bg-green-500/10", label: "Auth" },
  auction: { icon: Trash2, color: "text-amber-500 bg-amber-500/10", label: "Auction" },
  settings: { icon: Settings, color: "text-blue-500 bg-blue-500/10", label: "Settings" },
  system: { icon: Edit, color: "text-slate-500 bg-slate-500/10", label: "System" },
}

export default function AdminAuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)

  const filteredLogs = dummyLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !filterCategory || log.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(dummyLogs.map((l) => l.category))]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">Track all administrative actions and system events</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search logs by user, action, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => {
            const config = categoryConfig[cat]
            return (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(cat)}
              >
                {config?.label ?? cat}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Logs */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5" />
            Activity Log ({filteredLogs.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ScrollText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No logs found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                const config = categoryConfig[log.category] || categoryConfig.system
                const Icon = config.icon
                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${config.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm">
                          {log.action.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{log.timestamp}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{log.user}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>IP: {log.ip}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
