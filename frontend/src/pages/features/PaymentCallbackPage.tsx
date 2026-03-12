"use client"

import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import api from "@/lib/api"
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react"

type Status = "loading" | "success" | "failed"

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get("reference") || searchParams.get("trxref")

  const [status,    setStatus]    = useState<Status>("loading")
  const [message,   setMessage]   = useState("")
  const [txData,    setTxData]    = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const verify = () => {
    if (!reference) {
      setStatus("failed")
      setMessage("No payment reference found in the URL.")
      setModalOpen(true)
      return
    }

    setStatus("loading")
    setModalOpen(false)

    api
      .get(`/payments/verify/${reference}`)
      .then((res) => {
        const data = res.data.data
        setTxData(data)
        setStatus("success")
        setMessage("Your payment was confirmed successfully.")
        setModalOpen(true)

        // BOL unlock: notify the opener tab so it can auto-show the document
        if (data?.metadata?.type === "bol_unlock" && data?.metadata?.listingId) {
          window.opener?.postMessage(
            { type: "BOL_UNLOCKED", listingId: data.metadata.listingId },
            window.location.origin,
          )
        }
      })
      .catch((err) => {
        setStatus("failed")
        setMessage(err?.message || "Payment verification failed. Please contact support.")
        setModalOpen(true)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { verify() }, [reference])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Background while modal loads */}
      <main className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
        {status === "loading" && (
          <>
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <h1 className="text-xl font-semibold">Verifying your payment…</h1>
            <p className="text-muted-foreground text-sm">Please keep this tab open.</p>
          </>
        )}
      </main>

      {/* ── SUCCESS MODAL ─────────────────────────────────────────────────────── */}
      <Dialog open={modalOpen && status === "success"} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl text-green-600 dark:text-green-400">
              Payment Successful!
            </DialogTitle>
            <DialogDescription className="text-center">
              {message}
            </DialogDescription>
          </DialogHeader>

          {txData && (
            <>
              <Separator />
              <div className="space-y-3 text-sm py-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono font-medium text-right break-all">{txData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold">
                    {txData.currency} {(txData.amount / 100).toLocaleString()}
                  </span>
                </div>
                {txData.customer?.email && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span>{txData.customer.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span>
                    {new Date(txData.paid_at ?? txData.transaction_date ?? Date.now()).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-600 font-medium capitalize">{txData.status}</span>
                </div>
                {txData.channel && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gateway</span>
                    <span className="capitalize">{txData.channel} · Paystack</span>
                  </div>
                )}
              </div>
              <Separator />
            </>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {txData?.metadata?.type === "bol_unlock" ? (
              <>
                <Button
                  className="flex-1"
                  onClick={() => window.close()}
                >
                  Close Tab &amp; View BOL
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/dashboard/buyer/payments">My Payments</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/marketplace">Back to Marketplace</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/dashboard/buyer/payments">My Payments</Link>
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── FAILURE MODAL ─────────────────────────────────────────────────────── */}
      <Dialog open={modalOpen && status === "failed"} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <DialogTitle className="text-center text-2xl text-red-600 dark:text-red-400">
              Payment Failed
            </DialogTitle>
            <DialogDescription className="text-center">
              {message}
            </DialogDescription>
          </DialogHeader>

          {reference && (
            <p className="text-xs text-center text-muted-foreground font-mono break-all px-2">
              Reference: {reference}
            </p>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={verify}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Verification
            </Button>
            <Button asChild className="flex-1">
              <Link to="/marketplace">Back to Marketplace</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
