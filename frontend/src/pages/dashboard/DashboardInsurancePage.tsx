import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useInsurance } from "@/contexts/insurance-context"
import { Shield, ArrowLeft, FileText, Calendar, DollarSign } from "lucide-react"

export default function DashboardInsurancePage() {
  const { isAuthenticated, loading } = useAuth()
  const { policies } = useInsurance()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-slate-950 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950" />

          <div className="relative container mx-auto px-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="mb-4 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30" variant="outline">
                Cargo Insurance
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Your Insurance Policies</h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Protect your cargo with comprehensive insurance coverage
              </p>
            </div>
          </div>
        </section>

        {/* Policies Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Your Policies</h2>
              {policies.length === 0 ? (
                <Card className="glass">
                  <CardContent className="p-12 text-center">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No insurance policies yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Protect your cargo with our comprehensive insurance coverage
                    </p>
                    <Button>
                      <Shield className="mr-2 h-4 w-4" />
                      Get Insurance Quote
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {policies.map((policy) => (
                    <Card key={policy.id} className="glass hover:border-primary/50 transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Policy #{policy.id.slice(0, 8)}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              Transaction: {policy.transaction_id.slice(0, 8)}
                            </p>
                          </div>
                          <Badge variant="outline" className={policy.is_active ? "bg-green-500/10 text-green-500 border-green-500/30" : "bg-red-500/10 text-red-500 border-red-500/30"}>
                            {policy.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Coverage Amount</span>
                            <span className="font-semibold">${policy.coverage_amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Premium</span>
                            <span className="font-semibold">${policy.premium_amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date</span>
                            <span className="font-semibold">{new Date(policy.start_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">End Date</span>
                            <span className="font-semibold">{new Date(policy.end_date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <FileText className="mr-2 h-4 w-4" />
                            View Policy
                          </Button>
                          {policy.claim_id && (
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              View Claim
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
