
import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useTracking } from "@/contexts/tracking-context"
import { useDocument } from "@/contexts/document-context"
import { useAuction } from "@/contexts/auction-context"
import { Users, Ship, FileText, Gavel, DollarSign, Activity, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const { shipments } = useTracking()
  const { documents } = useDocument()
  const { auctions } = useAuction()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      // router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: Users, color: "text-primary" },
    {
      label: "Active Shipments",
      value: shipments.length.toString(),
      change: "+8%",
      icon: Ship,
      color: "text-secondary",
    },
    { label: "Documents", value: documents.length.toString(), change: "+15%", icon: FileText, color: "text-accent" },
    { label: "Active Auctions", value: auctions.length.toString(), change: "+5%", icon: Gavel, color: "text-primary" },
    { label: "Revenue", value: "$125K", change: "+23%", icon: DollarSign, color: "text-green-500" },
    { label: "Platform Usage", value: "94%", change: "+3%", icon: Activity, color: "text-blue-500" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">Platform overview and management</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Download Report</Button>
                <Button>Export Data</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <span className="text-sm font-semibold text-green-500">{stat.change}</span>
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
        </section>

        {/* Management Sections */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Management */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <Link to="/admin/users">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
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
                    <p className="font-bold text-lg">856</p>
                    <p className="text-muted-foreground">Active</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg">378</p>
                    <p className="text-muted-foreground">New</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg">12</p>
                    <p className="text-muted-foreground">Pending</p>
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
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
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
                    <p className="font-bold text-lg text-green-500">145</p>
                    <p className="text-muted-foreground">Approved</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg text-amber-500">23</p>
                    <p className="text-muted-foreground">Pending</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg text-red-500">5</p>
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
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
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
                  {auctions.slice(0, 3).map((auction) => (
                    <div key={auction.id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm font-medium truncate">{auction.title}</span>
                      <span className="text-xs font-semibold text-primary">${auction.currentBid.toLocaleString()}</span>
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
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
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
                    <p className="font-bold text-lg">20</p>
                    <p className="text-muted-foreground">Providers</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg">1,245</p>
                    <p className="text-muted-foreground">Policies</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-bold text-lg">$2.4M</p>
                    <p className="text-muted-foreground">Coverage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="container mx-auto px-4 pb-12">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "New user registration", user: "john@example.com", time: "2 mins ago", type: "user" },
                  { action: "Document approved", user: "Bill of Lading #1234", time: "15 mins ago", type: "document" },
                  {
                    action: "Auction won",
                    user: "Container Slot - Shanghai to LA",
                    time: "1 hour ago",
                    type: "auction",
                  },
                  {
                    action: "Insurance policy issued",
                    user: "Policy #INS-5678",
                    time: "2 hours ago",
                    type: "insurance",
                  },
                  { action: "New shipment created", user: "OM-2024-003", time: "3 hours ago", type: "shipment" },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "user"
                            ? "bg-primary"
                            : activity.type === "document"
                              ? "bg-secondary"
                              : activity.type === "auction"
                                ? "bg-accent"
                                : activity.type === "insurance"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-semibold text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* System Alerts */}
        <section className="container mx-auto px-4 pb-12">
          <Card className="glass border-amber-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">23 documents pending review</p>
                <p className="text-xs text-muted-foreground mt-1">Action required within 24 hours</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Server maintenance scheduled</p>
                <p className="text-xs text-muted-foreground mt-1">Planned downtime: Saturday 2:00 AM - 4:00 AM</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
