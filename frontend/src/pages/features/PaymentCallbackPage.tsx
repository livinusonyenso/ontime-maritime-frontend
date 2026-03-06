"use client"

import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

type Status = "loading" | "success" | "failed"

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get("reference") || searchParams.get("trxref")

  const [status,  setStatus]  = useState<Status>("loading")
  const [message, setMessage] = useState("")
  const [txData,  setTxData]  = useState<any>(null)

  useEffect(() => {
    if (!reference) {
      setStatus("failed")
      setMessage("No payment reference found in URL.")
      return
    }

    api
      .get(`/payments/verify/${reference}`)
      .then((res) => {
        setTxData(res.data.data)
        setStatus("success")
        setMessage("Your payment was successful!")
      })
      .catch((err) => {
        setStatus("failed")
        setMessage(err?.message || "Payment verification failed. Please contact support.")
      })
  }, [reference])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-14 w-14 text-primary animate-spin" />
            <h1 className="text-2xl font-bold">Verifying your payment…</h1>
            <p className="text-muted-foreground">Please wait while we confirm your transaction.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground max-w-md">{message}</p>

            {txData && (
              <div className="mt-2 rounded-xl border bg-muted/40 p-5 text-left text-sm w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono font-medium">{txData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">
                    {txData.currency} {(txData.amount / 100).toLocaleString()}
                  </span>
                </div>
                {txData.paid_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paid at</span>
                    <span>{new Date(txData.paid_at).toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-2">
              <Button asChild>
                <Link to="/marketplace">Back to Marketplace</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/buyer/payments">My Payments</Link>
              </Button>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="h-14 w-14 text-red-500" />
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Payment Failed
            </h1>
            <p className="text-muted-foreground max-w-md">{message}</p>

            <div className="flex gap-3 mt-2">
              <Button asChild>
                <Link to="/marketplace">Back to Marketplace</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard/buyer/payments">My Payments</Link>
              </Button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
