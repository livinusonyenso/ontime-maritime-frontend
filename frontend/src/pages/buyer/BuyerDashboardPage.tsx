"use client"

import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { useTracking } from "@/contexts/tracking-context"
import { useDocument } from "@/contexts/document-context"
import { useNotification } from "@/contexts/notification-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Ship,
  FileText,
  Bell,
  ShoppingCart,
  TrendingUp,
  Package,
  LogOut,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for the chart
const shipmentData = [
  { name: "Jan", shipments: 4 },
  { name: "Feb", shipments: 3 },
  { name: "Mar", shipments: 2 },
  { name: "Apr", shipments: 6 },
  { name: "May", shipments: 8 },
  { name: "Jun", shipments: 5 },
]

export default function BuyerDashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const { trackingData } = useTracking()
  const { documents } = useDocument()
  const { unreadCount } = useNotification()
  const navigate = useNavigate()

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
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.first_name || "Buyer"}!</h1>
            <p className="text-muted-foreground">Here's what's happening with your shipments today.</p>
          </div>
      
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <Ship className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">{trackingData.length > 0 ? trackingData.length : 3}</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Pending Documents</p>
                <FileText className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">{documents.length > 0 ? documents.length : 5}</h3>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  Action Req
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Active Bids</p>
                <ShoppingCart className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">4</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">Insurance Active</p>
                <Package className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <h3 className="text-2xl font-bold">2</h3>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Policies
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
                <CardTitle>Shipment Activity</CardTitle>
                <CardDescription>Monthly shipment volume over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={shipmentData}>
                      <defs>
                        <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="shipments"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorShipments)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Shipments List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Shipments</CardTitle>
                  <CardDescription>Latest status updates on your cargos</CardDescription>
                </div>
                <Link to="/dashboard/buyer/tracking">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {(trackingData.length > 0
                    ? trackingData.slice(0, 5)
                    : [
                        // Mock data fallback if no tracking data
                        {
                          id: "1",
                          container_number: "CONT-123456",
                          status: "In Transit",
                          location: "North Atlantic",
                          timestamp: new Date().toISOString(),
                        },
                        {
                          id: "2",
                          container_number: "CONT-789012",
                          status: "Customs",
                          location: "Port of Rotterdam",
                          timestamp: new Date(Date.now() - 86400000).toISOString(),
                        },
                        {
                          id: "3",
                          container_number: "CONT-345678",
                          status: "Delivered",
                          location: "Hamburg",
                          timestamp: new Date(Date.now() - 172800000).toISOString(),
                        },
                      ]
                  ).map((item: any) => (
                    <div key={item.id} className="flex items-start justify-between group">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full mt-1 group-hover:bg-primary/20 transition-colors">
                          <Ship className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {item.container_number || item.vessel_imo || "Unknown Container"}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location || "Location tracking..."}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={item.status === "Delivered" ? "outline" : "default"}
                        className={item.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      >
                        {item.status || "In Transit"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/dashboard/buyer/tracking" className="col-span-2">
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <Ship className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold">Track Shipment</h3>
                    <p className="text-xs text-muted-foreground mt-1">Real-time updates</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/dashboard/buyer/auctions">
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold">Auctions</h3>
                    <p className="text-xs text-muted-foreground mt-1">Browse market</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/dashboard/buyer/documents">
                <Card className="hover:bg-accent/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <FileText className="h-8 w-8 text-orange-600 mb-3" />
                    <h3 className="font-semibold">Documents</h3>
                    <p className="text-xs text-muted-foreground mt-1">Manage files</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Notifications / Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Customs Clearance Required</p>
                    <p className="text-xs text-muted-foreground mt-1">Shipment #4928 needs additional documentation.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Delivery Successful</p>
                    <p className="text-xs text-muted-foreground mt-1">Container #1029 arrived at Hamburg.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Box */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Our maritime logistics experts are available 24/7 to assist you.
                </p>
                <Button variant="secondary" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
