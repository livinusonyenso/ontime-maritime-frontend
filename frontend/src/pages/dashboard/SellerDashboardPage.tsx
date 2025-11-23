import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { useNotification } from "@/contexts/notification-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ship, FileText, Bell, DollarSign, Package, Plus, ArrowRight, LogOut, BarChart } from "lucide-react"

export default function SellerDashboardPage() {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const { unreadCount } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        {/* Welcome Section */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Seller Account</Badge>
                </div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.first_name || user?.email?.split('@')[0]}!</h1>
                <p className="text-muted-foreground mt-1">Manage your listings and sales</p>
              </div>
              <div className="flex gap-2">
                <Button size="lg">
                  <Plus className="mr-2 h-5 w-5" /> Create Listing
                </Button>
                <Button size="lg" variant="outline" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass hover:border-primary/50 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/50 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <h3 className="text-2xl font-bold mt-1">$45,200</h3>
                </div>
                <div className="bg-green-500/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/50 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                  <h3 className="text-2xl font-bold mt-1">{unreadCount}</h3>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/50 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/dashboard/seller/listings">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Package className="mr-2 h-4 w-4" />
                      My Listings
                    </Button>
                  </Link>
                  <Link to="/dashboard/seller/sales">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart className="mr-2 h-4 w-4" />
                      Sales Analytics
                    </Button>
                  </Link>
                  <Link to="/dashboard/documents">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="mr-2 h-4 w-4" />
                      Manage Documents
                    </Button>
                  </Link>
                  <Link to="/dashboard/auctions">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Ship className="mr-2 h-4 w-4" />
                      View Auctions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No recent sales found</p>
                    <Button variant="link" className="text-primary mt-2">
                      View All Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
