import { useEffect } from "react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { DollarSign, TrendingUp, CreditCard, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const payments = [
  {
    id: "1",
    amount: 2500,
    description: "Container Slot - Shanghai to LA",
    date: "2024-01-15",
    status: "completed",
    method: "Credit Card",
  },
  {
    id: "2",
    amount: 1800,
    description: "Cargo Insurance Premium",
    date: "2024-01-20",
    status: "completed",
    method: "Paystack",
  },
  {
    id: "3",
    amount: 3200,
    description: "Charter Agreement Payment",
    date: "2024-01-25",
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "4",
    amount: 950,
    description: "Document Processing Fee",
    date: "2024-01-28",
    status: "completed",
    method: "Credit Card",
  },
]

export default function PaymentsPage() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      // router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const totalPaid = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="bg-background border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Payment History</h1>
            <p className="text-muted-foreground mt-1">Track all your transactions and invoices</p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                    <p className="text-3xl font-bold mt-2">${totalPaid.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-xl">
                    <DollarSign className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold mt-2">${pendingAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-amber-500/10 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-3xl font-bold mt-2">{payments.length}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Payment List */}
        <section className="container mx-auto px-4 pb-12">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{payment.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                          <span className="text-muted-foreground">•</span>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">${payment.amount.toLocaleString()}</p>
                        <Badge
                          variant="outline"
                          className={
                            payment.status === "completed"
                              ? "bg-green-500/10 text-green-500 border-green-500/30"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
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
