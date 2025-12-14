"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { useNotification } from "@/contexts/notification-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, DollarSign, Package, Plus, LogOut, BarChartIcon, TrendingUp, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useSelector, useDispatch } from "react-redux"
import { selectSellerListings } from "@/store/slices/sellerListingSlice"
import { CreateListingModal } from "@/components/marketplace/CreateListingModal"
import { SellerListingsView } from "@/components/marketplace/SellerListingsView"
import type { MarketplaceListing } from "@/types/maritime"

// Mock data for seller revenue
const revenueData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 19000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 25000 },
  { name: "May", revenue: 32000 },
  { name: "Jun", revenue: 28000 },
]

export default function SellerDashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const { unreadCount } = useNotification()
  const navigate = useNavigate()
  
  // Redux hooks for marketplace listings
  const dispatch = useDispatch()
  const myListings = useSelector(selectSellerListings)
  
  // Modal state
  const [createModalOpen, setCreateModalOpen] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

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
                <h3 className="text-2xl font-bold">$131,200</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  <TrendingUp className="h-3 w-3 mr-1" /> +15%
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
                <h3 className="text-2xl font-bold">12</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  +3 New
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
                <h3 className="text-2xl font-bold">48</h3>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  +2 This Week
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
                <h3 className="text-2xl font-bold">5</h3>
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
                      {[
                        {
                          id: "#ORD-7782",
                          item: "Marine Engine Parts",
                          date: "Today, 10:23 AM",
                          amount: "$4,200",
                          status: "Processing",
                        },
                        {
                          id: "#ORD-7781",
                          item: "Navigation System",
                          date: "Yesterday, 4:15 PM",
                          amount: "$12,500",
                          status: "Shipped",
                        },
                        {
                          id: "#ORD-7780",
                          item: "Safety Equipment",
                          date: "Oct 24, 2023",
                          amount: "$1,800",
                          status: "Delivered",
                        },
                        {
                          id: "#ORD-7779",
                          item: "Cargo Containers (x2)",
                          date: "Oct 22, 2023",
                          amount: "$8,400",
                          status: "Delivered",
                        },
                      ].map((order) => (
                        <tr key={order.id} className="group hover:bg-muted/50 transition-colors">
                          <td className="py-4 font-medium">{order.id}</td>
                          <td className="py-4">{order.item}</td>
                          <td className="py-4 text-muted-foreground">{order.date}</td>
                          <td className="py-4 font-bold">{order.amount}</td>
                          <td className="py-4">
                            <Badge
                              variant={order.status === "Delivered" ? "outline" : "secondary"}
                              className={
                                order.status === "Processing"
                                  ? "bg-orange-100 text-orange-700"
                                  : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-green-100 text-green-700 border-green-200"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
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
                <CardDescription>Target: $50,000</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-bold">90%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[90%]" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Just $4,800 more to hit your monthly target!</p>
                </div>
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
