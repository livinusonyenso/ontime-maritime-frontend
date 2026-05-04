import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { useNotification } from "@/contexts/notification-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Bell, CheckCircle, AlertCircle, Clock, LogOut, Gavel } from "lucide-react"

export default function ExecutiveDashboardPage() {
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
                   <Badge variant="secondary" className="bg-slate-800 text-white hover:bg-slate-700">Executive Corner</Badge>
                </div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.first_name || user?.email?.split('@')[0]}!</h1>
                <p className="text-muted-foreground mt-1">Manage high-value approvals and compliance</p>
              </div>
              <div className="flex gap-2">
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <h3 className="text-2xl font-bold mt-1">8</h3>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/50 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved Today</p>
                  <h3 className="text-2xl font-bold mt-1">14</h3>
                </div>
                <div className="bg-green-500/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/50 transition-all">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Auto-Released</p>
                  <h3 className="text-2xl font-bold mt-1">32</h3>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
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
                  <Link to="/dashboard/executive/pending">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Review Pending
                    </Button>
                  </Link>
                  <Link to="/dashboard/executive/history">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="mr-2 h-4 w-4" />
                      Approval History
                    </Button>
                  </Link>
                  <Link to="/dashboard/executive/arbitration">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Gavel className="mr-2 h-4 w-4" />
                      Arbitration Cases
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No pending approvals requiring attention</p>
                    <Button variant="link" className="text-primary mt-2">
                      View All History
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
