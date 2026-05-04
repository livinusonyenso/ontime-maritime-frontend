import { useEffect, useRef, useCallback, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdmin } from "@/contexts/admin-context"
import type { ActivityEntry } from "@/types"
import {
  Users,
  Ship,
  FileText,
  Gavel,
  DollarSign,
  Activity,
  AlertCircle,
  BarChart3,
  UserCheck,
  Settings,
  ScrollText,
  Clock,
  RefreshCw,
} from "lucide-react"
import { Link } from "react-router-dom"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins  < 1)  return "just now"
  if (mins  < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  return `${days} day${days === 1 ? "" : "s"} ago`
}

function activityDotColor(module: string): string {
  switch (module.toLowerCase()) {
    case "user":        return "bg-primary"
    case "kyc":         return "bg-amber-500"
    case "listing":     return "bg-secondary"
    case "transaction": return "bg-green-500"
    default:            return "bg-blue-500"
  }
}

// ─── Skeleton helpers ─────────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <Card className="glass">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <Skeleton className="w-2 h-2 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { stats, getDashboardStats } = useAdmin()

  const [initialLoading, setInitialLoading] = useState(!stats)
  const [lastRefresh, setLastRefresh]       = useState<Date | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const refresh = useCallback(async () => {
    try {
      await getDashboardStats()
      setLastRefresh(new Date())
    } catch {
      // swallow — error state handled by context
    }
  }, [getDashboardStats])

  useEffect(() => {
    // Initial load
    refresh().finally(() => setInitialLoading(false))

    // Auto-refresh every 60 s — cleared on unmount, no stacking
    timerRef.current = setInterval(refresh, 60_000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [refresh])

  const statCards = [
    {
      label:  "Total Users",
      value:  stats?.total_users?.toLocaleString() ?? "—",
      change: "+12%",
      icon:   Users,
      color:  "text-primary",
    },
    {
      label:  "Active Listings",
      value:  stats?.total_listings?.toLocaleString() ?? "—",
      change: "+8%",
      icon:   Ship,
      color:  "text-secondary",
    },
    {
      label:  "Pending Listings",
      value:  stats?.pending_listings?.toLocaleString() ?? "—",
      change: "",
      icon:   Clock,
      color:  "text-orange-500",
    },
    {
      label:  "Transactions",
      value:  stats?.total_transactions?.toLocaleString() ?? "—",
      change: "+15%",
      icon:   FileText,
      color:  "text-accent",
    },
    {
      label:  "Active Auctions",
      value:  stats?.active_auctions?.toLocaleString() ?? "—",
      change: "+5%",
      icon:   Gavel,
      color:  "text-primary",
    },
    {
      label:  "Revenue",
      value:  stats?.total_revenue
                ? `$${(stats.total_revenue / 1000).toFixed(0)}K`
                : "—",
      change: "+23%",
      icon:   DollarSign,
      color:  "text-green-500",
    },
    {
      label:  "Pending KYC",
      value:  stats?.pending_kyc?.toLocaleString() ?? "—",
      change: "",
      icon:   Activity,
      color:  "text-amber-500",
    },
  ]

  const quickActions = [
    { label: "Manage Users",  href: "/admin/users",       icon: Users,        color: "bg-primary/10 text-primary"     },
    { label: "Analytics",     href: "/admin/analytics",   icon: BarChart3,    color: "bg-blue-500/10 text-blue-500"   },
    { label: "KYC Approvals", href: "/admin/kyc",         icon: UserCheck,    color: "bg-amber-500/10 text-amber-500" },
    { label: "Audit Logs",    href: "/admin/audit-logs",  icon: ScrollText,   color: "bg-secondary/10 text-secondary" },
    { label: "Settings",      href: "/admin/settings",    icon: Settings,     color: "bg-accent/10 text-accent"       },
  ]

  const recentAuctions = [
    { id: "1", title: "Container Slot - Shanghai to LA",    price: "$45,000" },
    { id: "2", title: "Bulk Cargo - Rotterdam to Lagos",    price: "$32,500" },
    { id: "3", title: "Reefer Container - Dubai to Mumbai", price: "$28,000" },
  ]

  const activity: ActivityEntry[] = stats?.recent_activity ?? []

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Platform overview and management
            {lastRefresh && (
              <span className="ml-2 text-xs text-muted-foreground/60">
                · refreshed {timeAgo(lastRefresh.toISOString())}
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refresh} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button>Export Data</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialLoading
          ? Array.from({ length: 7 }).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((stat, idx) => (
              <Card key={idx} className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-3xl font-bold">{stat.value}</p>
                        {stat.change && (
                          <span className="text-sm font-semibold text-green-500">{stat.change}</span>
                        )}
                      </div>
                    </div>
                    <div className={`bg-primary/10 p-3 rounded-xl ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} to={action.href}>
              <Card className="glass hover:border-primary/50 transition-all cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center gap-3 text-center">
                  <div className={`p-3 rounded-xl ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Link to="/admin/users">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/users">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="mr-2 h-5 w-5" />
                Manage Users
              </Button>
            </Link>
            <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg">{stats?.total_users?.toLocaleString() ?? "—"}</p>
                <p className="text-muted-foreground">Total</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg text-amber-500">{stats?.pending_kyc?.toLocaleString() ?? "—"}</p>
                <p className="text-muted-foreground">KYC Pending</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg text-green-500">{stats?.active_auctions?.toLocaleString() ?? "—"}</p>
                <p className="text-muted-foreground">Auctions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Document Management</CardTitle>
              <Link to="/admin/documents">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/documents">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-5 w-5" />
                Manage Documents
              </Button>
            </Link>
            <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg text-green-500">—</p>
                <p className="text-muted-foreground">Approved</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg text-amber-500">—</p>
                <p className="text-muted-foreground">Pending</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg text-red-500">—</p>
                <p className="text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auction Management */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Auction Management</CardTitle>
              <Link to="/admin/auctions">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/auctions">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Gavel className="mr-2 h-5 w-5" />
                Manage Auctions
              </Button>
            </Link>
            <div className="space-y-2 pt-2">
              {recentAuctions.map((auction) => (
                <div key={auction.id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span className="text-sm font-medium truncate">{auction.title}</span>
                  <span className="text-xs font-semibold text-primary">{auction.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insurance Management */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Insurance Providers</CardTitle>
              <Link to="/admin/insurance">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/admin/insurance">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Activity className="mr-2 h-5 w-5" />
                Manage Providers
              </Button>
            </Link>
            <div className="grid grid-cols-3 gap-2 text-center text-sm pt-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg">—</p>
                <p className="text-muted-foreground">Providers</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg">—</p>
                <p className="text-muted-foreground">Policies</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="font-bold text-lg">—</p>
                <p className="text-muted-foreground">Coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {initialLoading ? (
              Array.from({ length: 5 }).map((_, i) => <ActivityRowSkeleton key={i} />)
            ) : activity.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No recent activity.</p>
            ) : (
              activity.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${activityDotColor(entry.module)}`} />
                    <div>
                      <p className="font-semibold text-sm capitalize">
                        {entry.action.replace(/_/g, " ").toLowerCase()}
                      </p>
                      <p className="text-xs text-muted-foreground">{entry.actor_name}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4">
                    {timeAgo(entry.timestamp)}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="glass border-amber-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(stats?.pending_listings ?? 0) > 0 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                {stats!.pending_listings} listing{stats!.pending_listings === 1 ? "" : "s"} pending review
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <Link to="/admin/listings" className="underline underline-offset-2">Review now</Link>
                {" "}· Admin approval required before going live
              </p>
            </div>
          )}
          {(stats?.pending_kyc ?? 0) > 0 && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                {stats!.pending_kyc} KYC verification{stats!.pending_kyc === 1 ? "" : "s"} awaiting review
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <Link to="/admin/kyc" className="underline underline-offset-2">Go to KYC</Link>
                {" "}· Action required within 24 hours
              </p>
            </div>
          )}
          {(stats?.pending_listings ?? 0) === 0 && (stats?.pending_kyc ?? 0) === 0 && !initialLoading && (
            <p className="text-sm text-muted-foreground py-2">No active alerts — platform is healthy.</p>
          )}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Server maintenance scheduled</p>
            <p className="text-xs text-muted-foreground mt-1">Planned downtime: Saturday 2:00 AM – 4:00 AM</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
