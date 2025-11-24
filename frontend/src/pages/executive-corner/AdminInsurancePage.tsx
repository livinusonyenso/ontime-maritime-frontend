
import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Shield, Plus, Edit, Star, TrendingUp } from "lucide-react"

const insuranceProviders = [
  { id: "1", name: "Global Marine Insurance", rating: 4.8, policies: 458, revenue: "$125K", status: "active" },
  { id: "2", name: "Oceanic Shield Insurance", rating: 4.6, policies: 342, revenue: "$98K", status: "active" },
  { id: "3", name: "Maritime Protection Co.", rating: 4.7, policies: 289, revenue: "$87K", status: "active" },
  { id: "4", name: "International Cargo Guard", rating: 4.9, policies: 567, revenue: "$156K", status: "active" },
]

export default function AdminInsurancePage() {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      // router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Insurance Provider Management</h1>
                <p className="text-muted-foreground mt-1">Manage insurance providers and policies</p>
              </div>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add Provider
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Providers</p>
                    <p className="text-3xl font-bold mt-2">{insuranceProviders.length}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Policies</p>
                    <p className="text-3xl font-bold mt-2">1,656</p>
                  </div>
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold mt-2">$466K</p>
                  </div>
                  <div className="bg-accent/10 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-3xl font-bold mt-2">4.7</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Insurance Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insuranceProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{provider.name}</p>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                            {provider.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="text-sm font-semibold">{provider.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{provider.policies} policies</p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{provider.revenue} revenue</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
