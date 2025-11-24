"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, CreditCard, Download, Plus, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const payments = [
  {
    id: "1",
    amount: 2500,
    description: "Container Slot - Shanghai to LA",
    date: "2024-01-15",
    status: "completed",
    method: "Paystack",
    reference: "PSK_1234567890",
  },
  {
    id: "2",
    amount: 1800,
    description: "Cargo Insurance Premium",
    date: "2024-01-20",
    status: "completed",
    method: "Paystack",
    reference: "PSK_0987654321",
  },
  {
    id: "3",
    amount: 3200,
    description: "Charter Agreement Payment",
    date: "2024-01-25",
    status: "pending",
    method: "Paystack",
    reference: "PSK_5555555555",
  },
  {
    id: "4",
    amount: 950,
    description: "Document Processing Fee",
    date: "2024-01-28",
    status: "completed",
    method: "Paystack",
    reference: "PSK_9999999999",
  },
]

export default function DashboardPaymentsPage() {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const totalPaid = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const handlePaystackPayment = () => {
    if (!amount || !description) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and description",
        variant: "destructive",
      })
      return
    }

    // In production, integrate with Paystack
    toast({
      title: "Redirecting to Paystack",
      description: "You will be redirected to complete your payment securely.",
    })

    // Simulate Paystack integration
    setTimeout(() => {
      setShowPaymentDialog(false)
      setAmount("")
      setDescription("")
      toast({
        title: "Payment Initiated",
        description: "Your payment has been initiated via Paystack.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground mt-2">Track all your transactions via Paystack</p>
        </div>
        <Button onClick={() => setShowPaymentDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Make Payment
        </Button>
      </div>

      {/* Stats */}
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

      {/* Payment List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>All payments are processed securely via Paystack</CardDescription>
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
                      <span className="text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground font-mono">{payment.reference}</p>
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

      {/* Paystack Info Card */}
      <Card className="glass border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Secure Payments with Paystack</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All transactions are processed securely through Paystack, Nigeria's leading payment gateway. We accept
                cards, bank transfers, and mobile money.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Learn More About Paystack
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Payment</DialogTitle>
            <DialogDescription>Enter payment details. You'll be redirected to Paystack to complete.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this payment for?"
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="font-semibold mb-2">Payment will be processed via:</p>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">Paystack</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaystackPayment} className="gap-2">
              <CreditCard className="h-4 w-4" />
              Continue to Paystack
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
