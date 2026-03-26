"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, CreditCard, AlertCircle, PackageSearch, RefreshCw } from "lucide-react"
import api from "@/lib/api"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string
  amount: string | number
  payout_status: "pending" | "completed" | "failed"
  payment_gateway: string | null
  gateway_reference: string | null
  paid_at: string | null
  created_at: string
  listing?: { title: string; currency: string } | null
  buyer?: { email: string } | null
  seller?: { email: string } | null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function statusStyle(status: string) {
  if (status === "completed") return "bg-green-500/10 text-green-600 border-green-500/30"
  if (status === "failed")    return "bg-red-500/10 text-red-500 border-red-500/30"
  return "bg-amber-500/10 text-amber-500 border-amber-500/30"
}

function amountNGN(raw: string | number) {
  // amount is stored in smallest unit (kobo) on Paystack side but as full value in DB
  return Number(raw).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BuyerPaymentsPage() {
  const [transactions,  setTransactions]  = useState<Transaction[]>([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState<string | null>(null)
  const [verifying,     setVerifying]     = useState<string | null>(null)  // reference being verified

  const load = () => {
    setLoading(true)
    setError(null)
    api
      .get("/transactions/my-purchases")
      .then((res) => {
        setTransactions(Array.isArray(res.data) ? res.data : res.data.data ?? [])
      })
      .catch((err) => setError(err?.message || "Failed to load transactions."))
      .finally(() => setLoading(false))
  }

  // Manually sync a pending transaction's status with Paystack
  const syncStatus = (reference: string) => {
    setVerifying(reference)
    api
      .get(`/payments/verify/${reference}`)
      .then(() => load())          // re-fetch to reflect updated status
      .catch(() => load())         // re-fetch even on error — status may have been set to "failed"
      .finally(() => setVerifying(null))
  }

  useEffect(() => { load() }, [])

  // ── Derived stats ────────────────────────────────────────────────────────
  const totalPaid    = transactions.filter((t) => t.payout_status === "completed").reduce((s, t) => s + Number(t.amount), 0)
  const totalPending = transactions.filter((t) => t.payout_status === "pending").reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground mt-1">All your purchase transactions via Paystack</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-3xl font-bold mt-2">${amountNGN(totalPaid)}</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold mt-2">${amountNGN(totalPending)}</p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-3xl font-bold mt-2">{transactions.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction list */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>All payments processed securely via Paystack</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Loading transactions…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <AlertCircle className="h-10 w-10 text-red-400" />
              <p className="text-red-500 font-medium">{error}</p>
              <Button variant="outline" size="sm" onClick={load}>Try Again</Button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
              <PackageSearch className="h-12 w-12 text-muted-foreground/40" />
              <p className="font-medium text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground">
                When you complete a purchase it will appear here.
              </p>
            </div>
          )}

          {/* Data */}
          {!loading && !error && transactions.length > 0 && (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold line-clamp-1">
                        {tx.listing?.title ?? "Marketplace Purchase"}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                        <span>
                          {tx.paid_at
                            ? new Date(tx.paid_at).toLocaleDateString()
                            : new Date(tx.created_at).toLocaleDateString()}
                        </span>
                        <span>·</span>
                        <span>{tx.payment_gateway ?? "Paystack"}</span>
                        {tx.gateway_reference && (
                          <>
                            <span>·</span>
                            <span className="font-mono">{tx.gateway_reference}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="font-bold text-lg">${amountNGN(tx.amount)}</p>
                      <Badge variant="outline" className={statusStyle(tx.payout_status)}>
                        {tx.payout_status}
                      </Badge>
                    </div>
                    {tx.payout_status === "pending" && tx.gateway_reference && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={verifying === tx.gateway_reference}
                        onClick={() => syncStatus(tx.gateway_reference!)}
                      >
                        <RefreshCw className={`h-3 w-3 mr-1 ${verifying === tx.gateway_reference ? "animate-spin" : ""}`} />
                        Sync
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
