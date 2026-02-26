"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAdmin } from "@/contexts/admin-context"
import type { AuditLog } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  ScrollText,
  Search,
  User,
  Shield,
  FileText,
  Settings,
  Gavel,
  RefreshCw,
  ChevronDown,
  Monitor,
  Globe,
  Clock,
  Hash,
} from "lucide-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff  = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins  < 1)  return "just now"
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  })
}

function fmtAction(action: string): string {
  return action.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
}

// ─── Module config ────────────────────────────────────────────────────────────

const MODULES = [
  { value: "",          label: "All Modules" },
  { value: "user",      label: "Users"       },
  { value: "listing",   label: "Listings"    },
  { value: "kyc",       label: "KYC"         },
  { value: "auction",   label: "Auctions"    },
  { value: "system",    label: "System"      },
]

const MODULE_STYLE: Record<string, { icon: React.ElementType; color: string }> = {
  user:      { icon: User,       color: "text-primary    bg-primary/10"    },
  listing:   { icon: FileText,   color: "text-secondary  bg-secondary/10"  },
  kyc:       { icon: Shield,     color: "text-amber-500  bg-amber-500/10"  },
  auction:   { icon: Gavel,      color: "text-purple-500 bg-purple-500/10" },
  system:    { icon: Settings,   color: "text-slate-500  bg-slate-500/10"  },
}

function moduleStyle(module: string) {
  return MODULE_STYLE[module.toLowerCase()] ?? { icon: Globe, color: "text-blue-500 bg-blue-500/10" }
}

// ─── Row skeleton ─────────────────────────────────────────────────────────────

function RowSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-64" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-4 w-16 shrink-0" />
    </div>
  )
}

// ─── Details modal ────────────────────────────────────────────────────────────

function DetailsModal({ log, onClose }: { log: AuditLog | null; onClose: () => void }) {
  if (!log) return null
  const { icon: Icon, color } = moduleStyle(log.module)

  return (
    <Dialog open={!!log} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
            {fmtAction(log.action)}
          </DialogTitle>
          <DialogDescription>{log.module.toUpperCase()} — {fmtDate(log.timestamp)}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          {/* Meta */}
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground flex items-center gap-1"><User className="h-3.5 w-3.5" /> Actor</span>
            <span className="font-medium break-all">
              {log.actor_email ?? log.actor_id ?? "System"}
            </span>

            <span className="text-muted-foreground flex items-center gap-1"><Hash className="h-3.5 w-3.5" /> Target ID</span>
            <span className="font-mono text-xs break-all">{log.target_id ?? "—"}</span>

            <span className="text-muted-foreground flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> IP Address</span>
            <span className="font-mono text-xs">{log.ip_address}</span>

            <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Timestamp</span>
            <span>{fmtDate(log.timestamp)}</span>

            {log.user_agent && (
              <>
                <span className="text-muted-foreground flex items-center gap-1"><Monitor className="h-3.5 w-3.5" /> User Agent</span>
                <span className="text-xs break-all">{log.user_agent}</span>
              </>
            )}
          </div>

          {/* Details JSON */}
          {log.details && Object.keys(log.details).length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Action Details</p>
              <pre className="text-xs bg-muted rounded-md p-3 overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50

export default function AdminAuditLogsPage() {
  const { getAuditLogs } = useAdmin()

  const [logs, setLogs]           = useState<AuditLog[]>([])
  const [total, setTotal]         = useState(0)
  const [skip, setSkip]           = useState(0)
  const [loading, setLoading]     = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [selected, setSelected]   = useState<AuditLog | null>(null)

  // Filters
  const [module,    setModule]    = useState("")
  const [action,    setAction]    = useState("")
  const [dateFrom,  setDateFrom]  = useState("")
  const [dateTo,    setDateTo]    = useState("")

  // Debounce action search
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [debouncedAction, setDebouncedAction] = useState("")

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedAction(action), 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [action])

  // Fetch (reset on filter change)
  const fetch = useCallback(async (resetSkip = true) => {
    const nextSkip = resetSkip ? 0 : skip
    resetSkip ? setLoading(true) : setLoadingMore(true)
    setError(null)
    try {
      const res = await getAuditLogs({
        module:   module   || undefined,
        action:   debouncedAction || undefined,
        dateFrom: dateFrom || undefined,
        dateTo:   dateTo   || undefined,
        skip:     nextSkip,
        take:     PAGE_SIZE,
      })
      if (resetSkip) {
        setLogs(res.data)
        setSkip(PAGE_SIZE)
      } else {
        setLogs(prev => [...prev, ...res.data])
        setSkip(nextSkip + PAGE_SIZE)
      }
      setTotal(res.total)
    } catch {
      setError("Failed to load audit logs. Check your connection and try again.")
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [getAuditLogs, module, debouncedAction, dateFrom, dateTo, skip])

  // Re-fetch when filters change (always reset)
  useEffect(() => {
    fetch(true)
  }, [module, debouncedAction, dateFrom, dateTo]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLoadMore = () => fetch(false)

  const clearFilters = () => {
    setModule("")
    setAction("")
    setDateFrom("")
    setDateTo("")
  }

  const hasFilters = module || action || dateFrom || dateTo
  const hasMore    = logs.length < total

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Immutable trail of all admin actions — {total.toLocaleString()} total entries
          </p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0" onClick={() => fetch(true)} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Action search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by action…"
                value={action}
                onChange={e => setAction(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Module filter */}
            <div className="flex gap-2 flex-wrap">
              {MODULES.map(m => (
                <Button
                  key={m.value}
                  size="sm"
                  variant={module === m.value ? "default" : "outline"}
                  onClick={() => setModule(m.value)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
          </div>
          {/* Date range */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex items-center gap-2 flex-1">
              <label className="text-xs text-muted-foreground shrink-0">From</label>
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="text-sm" />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <label className="text-xs text-muted-foreground shrink-0">To</label>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="text-sm" />
            </div>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="shrink-0">
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Log list */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5" />
            Activity Log
            {!loading && (
              <Badge variant="secondary" className="ml-1">
                {logs.length.toLocaleString()} / {total.toLocaleString()}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <RowSkeleton key={i} />)
            ) : error ? (
              <div className="text-center py-12 text-muted-foreground space-y-2">
                <ScrollText className="h-10 w-10 mx-auto opacity-30" />
                <p className="font-medium text-destructive">{error}</p>
                <Button variant="outline" size="sm" onClick={() => fetch(true)}>Try again</Button>
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ScrollText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No logs found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                {logs.map(log => {
                  const { icon: Icon, color } = moduleStyle(log.module)
                  return (
                    <button
                      key={log.id}
                      onClick={() => setSelected(log)}
                      className="w-full text-left flex items-start gap-4 p-4 border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all"
                    >
                      {/* Module icon */}
                      <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                        <Icon className="h-4 w-4" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{fmtAction(log.action)}</span>
                          <Badge variant="outline" className="text-xs capitalize">{log.module}</Badge>
                        </div>
                        {log.details && Object.keys(log.details).length > 0 && (
                          <p className="text-sm text-muted-foreground mt-0.5 truncate">
                            {Object.entries(log.details)
                              .filter(([k]) => k !== "entityId")
                              .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`)
                              .join(" · ")}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.actor_email ?? log.actor_id ?? "System"}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {log.ip_address}
                          </span>
                          <span>·</span>
                          <span title={fmtDate(log.timestamp)}>{timeAgo(log.timestamp)}</span>
                        </div>
                      </div>

                      {/* Timestamp (desktop) */}
                      <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                        {fmtDate(log.timestamp)}
                      </span>
                    </button>
                  )
                })}

                {/* Load more */}
                {hasMore && (
                  <div className="pt-2 text-center">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="gap-2"
                    >
                      {loadingMore
                        ? <RefreshCw className="h-4 w-4 animate-spin" />
                        : <ChevronDown className="h-4 w-4" />}
                      Load more ({(total - logs.length).toLocaleString()} remaining)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details modal */}
      <DetailsModal log={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
