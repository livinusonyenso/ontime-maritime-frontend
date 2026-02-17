import { useState, useEffect, useMemo } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Search,
  UserPlus,
  MoreVertical,
  Mail,
  Shield,
  AlertCircle,
  RefreshCw,
  Users,
  ShoppingCart,
  Store,
  Crown,
  Briefcase,
} from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import type { User } from "@/types"

const ROLE_TABS = [
  { value: "all", label: "All", icon: Users },
  { value: "buyer", label: "Buyers", icon: ShoppingCart },
  { value: "seller", label: "Sellers", icon: Store },
  { value: "admin", label: "Admins", icon: Shield },
  { value: "executive", label: "Executive", icon: Crown },
  { value: "expert", label: "Experts", icon: Briefcase },
] as const

function UserSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <Skeleton className="h-8 w-8 rounded" />
    </div>
  )
}

function formatDate(dateString?: string): string {
  if (!dateString) return "N/A"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getUserDisplayName(user?: User): string {
  if (!user) return "Unknown"
  if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`
  if (user.first_name) return user.first_name
  return user.email?.split("@")[0] ?? "Unknown"
}

function getUserInitials(user?: User): string {
  const displayName = getUserDisplayName(user)
  return displayName
    .split(" ")
    .map((n) => n?.[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function UserList({ users, loading, error, searchQuery, onClearSearch, onRefresh }: {
  users: User[]
  loading: boolean
  error: string | null
  searchQuery: string
  onClearSearch: () => void
  onRefresh: () => void
}) {
  if (loading && users.length === 0) {
    return (
      <div className="space-y-3">
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
      </div>
    )
  }

  if (!loading && users.length === 0 && !error && !searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Users className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No users found</h3>
        <p className="text-muted-foreground mt-1">
          There are no users in this category yet.
        </p>
      </div>
    )
  }

  if (!loading && users.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No results found</h3>
        <p className="text-muted-foreground mt-1">
          No users match your search for &quot;{searchQuery}&quot;
        </p>
        <Button variant="link" onClick={onClearSearch} className="mt-2">
          Clear search
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {users.map((usr) => (
        <div
          key={usr?.id ?? Math.random()}
          className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
              {getUserInitials(usr)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold">{getUserDisplayName(usr)}</p>
                {usr?.role === "admin" && (
                  <Badge
                    variant="outline"
                    className="bg-accent/10 text-accent border-accent/30"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={
                    usr?.is_email_verified
                      ? "bg-green-500/10 text-green-500 border-green-500/30"
                      : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                  }
                >
                  {usr?.is_email_verified ? "verified" : "unverified"}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    usr?.subscription_status === "premium"
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                      : usr?.subscription_status === "enterprise"
                      ? "bg-purple-500/10 text-purple-500 border-purple-500/30"
                      : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                  }
                >
                  {usr?.subscription_status ?? "N/A"}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {usr?.email ?? "N/A"}
                </p>
                <span className="text-muted-foreground hidden sm:inline">&bull;</span>
                <p className="text-sm text-muted-foreground capitalize">{usr?.role ?? "N/A"}</p>
                <span className="text-muted-foreground hidden sm:inline">&bull;</span>
                <p className="text-sm text-muted-foreground">
                  Joined {formatDate(usr?.created_at)}
                </p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { users, loading, error, getAllUsers } = useAdmin()

  useEffect(() => {
    getAllUsers?.().catch(() => {})
  }, [getAllUsers])

  // Count users per role
  const roleCounts = useMemo(() => {
    const safeUsers = users ?? []
    const counts: Record<string, number> = { all: safeUsers.length }
    for (const user of safeUsers) {
      const role = user?.role ?? "unknown"
      counts[role] = (counts[role] ?? 0) + 1
    }
    return counts
  }, [users])

  // Filter by active tab + search query
  const filteredUsers = useMemo(() => {
    const safeUsers = users ?? []

    // Filter by role tab
    const roleFiltered = activeTab === "all"
      ? safeUsers
      : safeUsers.filter((u) => u?.role === activeTab)

    // Filter by search query
    if (!searchQuery.trim()) return roleFiltered
    const query = searchQuery.toLowerCase()
    return roleFiltered.filter(
      (u) =>
        getUserDisplayName(u)?.toLowerCase()?.includes(query) ||
        u?.email?.toLowerCase()?.includes(query)
    )
  }, [users, activeTab, searchQuery])

  const handleRefresh = () => {
    getAllUsers?.().catch(() => {})
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage platform users and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="lg">
            <UserPlus className="mr-2 h-5 w-5" />
            Add User
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <Button variant="link" className="p-0 h-auto ml-2" onClick={handleRefresh}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs + Users List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1">
          {ROLE_TABS.map((tab) => {
            const Icon = tab.icon
            const count = roleCounts[tab.value] ?? 0
            return (
              <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
                <Icon className="h-4 w-4" />
                {tab.label}
                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                  {count}
                </Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {ROLE_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card className="glass">
              <CardHeader>
                <CardTitle>
                  {loading
                    ? "Loading users..."
                    : `${tab.label} (${filteredUsers.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserList
                  users={filteredUsers}
                  loading={loading}
                  error={error}
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery("")}
                  onRefresh={handleRefresh}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
