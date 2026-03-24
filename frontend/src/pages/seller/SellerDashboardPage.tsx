"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, DollarSign, Package, Plus, BarChartIcon, TrendingUp, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useSelector } from "react-redux"
import { selectSellerListings } from "@/store/slices/sellerListingSlice"
import { CreateListingModal } from "@/components/marketplace/CreateListingModal"
import { SellerListingsView } from "@/components/marketplace/SellerListingsView"
import api from "@/lib/api"

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

interface Sale {
  id: string
  buyer_id: string
  amount: string
  payout_status: "pending" | "completed" | "failed"
  created_at: string
  listing?: { title?: string }
  buyer?: { first_name?: string; last_name?: string }
}

const PAYOUT_LABEL: Record<string, string> = {
  pending:   "Processing",
  completed: "Delivered",
  failed:    "Failed",
}

export default function SellerDashboardPage() {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  const myListings = useSelector(selectSellerListings)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [sales, setSales]       = useState<Sale[]>([])
  const [salesLoading, setSalesLoading] = useState(true)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

  useEffect(() => {
    if (!isAuthenticated) return
    api
      .get<Sale[]>("/transactions/my-sales?take=100")
      .then((res) => setSales(Array.isArray(res.data) ? res.data : []))
      .catch(() => setSales([]))
      .finally(() => setSalesLoading(false))
  }, [isAuthenticated])

  // Derived stats
  const totalRevenue   = sales.reduce((sum, tx) => sum + Number(tx.amount ?? 0), 0)
  const totalCustomers = new Set(sales.map((tx) => tx.buyer_id)).size
  const pendingOrders  = sales.filter((tx) => tx.payout_status === "pending").length

  const revenueByMonth = sales.reduce<Record<string, number>>((acc, tx) => {
    const month = MONTHS[new Date(tx.created_at).getMonth()]
    acc[month] = (acc[month] ?? 0) + Number(tx.amount ?? 0)
    return acc
  }, {})
  const revenueData = MONTHS.map((name) => ({ name, revenue: revenueByMonth[name] ?? 0 }))

  const recentOrders = sales.slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <main className="flex-1 p-4 md:p-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your listings, track sales, and monitor performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="lg" className="shadow-sm" onClick={() => setCreateModalOpen(true)}>
              <Plus className="mr-2 h-5 w-5" /> Create New Listing
            </Button>
           
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">
                  {salesLoading ? "—" : `$${totalRevenue.toLocaleString()}`}
                </h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  <TrendingUp className="h-3 w-3 mr-1" /> Live
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">{myListings.length}</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  Total
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">
                  {salesLoading ? "—" : totalCustomers}
                </h3>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Unique
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <FileText className="h-4 w-4 text-orange-600" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">
                  {salesLoading ? "—" : pendingOrders}
                </h3>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  Needs Action
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart Section */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue performance for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                        formatter={(value) => [`$${value}`, "Revenue"]}
                        cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? "#22c55e" : "#3b82f6"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sales Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest transactions from your listings</CardDescription>
                </div>
                <Link to="/dashboard/seller/sales">
                  <Button variant="ghost" size="sm">
                    View All Sales
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Item</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {salesLoading ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-muted-foreground">
                            Loading…
                          </td>
                        </tr>
                      ) : recentOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-muted-foreground">
                            No orders yet.
                          </td>
                        </tr>
                      ) : (
                        recentOrders.map((tx) => {
                          const label = PAYOUT_LABEL[tx.payout_status] ?? tx.payout_status
                          return (
                            <tr key={tx.id} className="group hover:bg-muted/50 transition-colors">
                              <td className="py-4 font-medium">#{tx.id.slice(0, 8).toUpperCase()}</td>
                              <td className="py-4">{tx.listing?.title ?? "—"}</td>
                              <td className="py-4 text-muted-foreground">
                                {new Date(tx.created_at).toLocaleDateString(undefined, {
                                  month: "short", day: "numeric", year: "numeric",
                                })}
                              </td>
                              <td className="py-4 font-bold">${Number(tx.amount).toLocaleString()}</td>
                              <td className="py-4">
                                <Badge
                                  variant={tx.payout_status === "completed" ? "outline" : "secondary"}
                                  className={
                                    tx.payout_status === "pending"
                                      ? "bg-orange-100 text-orange-700"
                                      : tx.payout_status === "failed"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700 border-green-200"
                                  }
                                >
                                  {label}
                                </Badge>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions List - More condensed for Seller */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" className="w-full justify-start h-12 bg-transparent" asChild>
                  <Link to="/dashboard/seller/listings">
                    <Package className="mr-2 h-4 w-4 text-blue-500" />
                    Manage Listings
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 bg-transparent" asChild>
                  <Link to="/dashboard/seller/sales">
                    <BarChartIcon className="mr-2 h-4 w-4 text-green-500" />
                    Sales Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 bg-transparent" asChild>
                  <Link to="/dashboard/seller/documents">
                    <FileText className="mr-2 h-4 w-4 text-orange-500" />
                    Upload Documents
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start h-12 bg-transparent" asChild>
                  <Link to="/dashboard/seller/insurance">
                    <FileText className="mr-2 h-4 w-4 text-purple-500" />
                    Insurance Claims
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Goal</CardTitle>
                <CardDescription>
                  {salesLoading
                    ? "Calculating…"
                    : (() => {
                        const bestMonth = Math.max(0, ...revenueData.map((d) => d.revenue))
                        const target = bestMonth > 0 ? Math.ceil((bestMonth * 1.2) / 1000) * 1000 : null
                        return target ? `Target: $${target.toLocaleString()}` : "No sales data yet"
                      })()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {salesLoading ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">—</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden" />
                    <p className="text-xs text-muted-foreground mt-2">Loading…</p>
                  </div>
                ) : (() => {
                  const bestMonth = Math.max(0, ...revenueData.map((d) => d.revenue))
                  const target = bestMonth > 0 ? Math.ceil((bestMonth * 1.2) / 1000) * 1000 : null
                  if (!target) {
                    return (
                      <p className="text-sm text-muted-foreground">
                        Complete your first sale to start tracking monthly goals.
                      </p>
                    )
                  }
                  const thisMonth = new Date().getMonth()
                  const monthRevenue = sales
                    .filter((tx) => new Date(tx.created_at).getMonth() === thisMonth)
                    .reduce((sum, tx) => sum + Number(tx.amount ?? 0), 0)
                  const pct = Math.min(100, Math.round((monthRevenue / target) * 100))
                  const remaining = Math.max(0, target - monthRevenue)
                  return (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-bold">{pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {remaining > 0
                          ? `$${remaining.toLocaleString()} more to hit your monthly target!`
                          : "Monthly target reached!"}
                      </p>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">My Listings</h2>
              <p className="text-muted-foreground">Manage your marketplace listings</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {myListings.length} {myListings.length === 1 ? "Listing" : "Listings"}
            </Badge>
          </div>
          
          <SellerListingsView />
        </div>
      </main>

      {/* Create Listing Modal */}
      <CreateListingModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
      />
    </div>
  )
}
