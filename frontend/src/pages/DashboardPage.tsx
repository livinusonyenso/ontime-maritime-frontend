
import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { useTracking } from "@/contexts/tracking-context"
import { useDocument } from "@/contexts/document-context"
import { useNotification } from "@/contexts/notification-context"
import {
  Ship,
  FileText,
  Bell,
  TrendingUp,
  Package,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const { shipments } = useTracking()
  const { documents } = useDocument()
  const { notifications, unreadCount, markAsRead } = useNotification()

  useEffect(() => {
    if (!isAuthenticated) {
      // router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const stats = [
    { label: "Active Shipments", value: shipments.length, icon: Ship, color: "text-primary" },
    { label: "Documents", value: documents.length, icon: FileText, color: "text-secondary" },
    { label: "Notifications", value: unreadCount, icon: Bell, color: "text-accent" },
    { label: "Total Value", value: "$1.2M", icon: DollarSign, color: "text-primary" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Welcome Section */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                <p className="text-muted-foreground mt-1">Here's what's happening with your shipments</p>
              </div>
              <Link to="/tracking">
                <Button size="lg">
                  Track New Shipment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <Card key={idx} className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
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

        {/* Main Content */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Shipments */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Active Shipments</CardTitle>
                    <Link to="/tracking">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {shipments.slice(0, 3).map((shipment) => (
                    <div
                      key={shipment.id}
                      className="p-4 border rounded-lg space-y-3 hover:border-primary/50 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{shipment.trackingNumber}</p>
                          <p className="text-sm text-muted-foreground">{shipment.vessel}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            shipment.status === "in-transit"
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/30"
                              : shipment.status === "delivered"
                                ? "bg-green-500/10 text-green-500 border-green-500/30"
                                : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          }
                        >
                          {shipment.status}
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {shipment.origin} → {shipment.destination}
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span className="font-semibold">{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} className="h-1.5" />
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>ETA: {new Date(shipment.estimatedArrival).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Documents */}
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Documents</CardTitle>
                    <Link to="/dashboard/documents">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documents.slice(0, 4).map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary/10 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.type.replace("-", " ").toUpperCase()}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "approved"
                            ? "bg-green-500/10 text-green-500 border-green-500/30"
                            : doc.status === "pending"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                              : "bg-red-500/10 text-red-500 border-red-500/30"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                    {unreadCount > 0 && <Badge className="bg-accent">{unreadCount}</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.slice(0, 4).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        notification.read ? "bg-background" : "bg-primary/5 border-primary/20"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-2">
                        {notification.type === "success" && (
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        )}
                        {notification.type === "warning" && (
                          <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        )}
                        {notification.type === "info" && (
                          <Bell className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/tracking">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Ship className="mr-2 h-4 w-4" />
                      Track Shipment
                    </Button>
                  </Link>
                  <Link to="/auctions">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Browse Auctions
                    </Button>
                  </Link>
                  <Link to="/dashboard/documents">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </Link>
                  <Link to="/insurance">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Package className="mr-2 h-4 w-4" />
                      Get Insurance
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
