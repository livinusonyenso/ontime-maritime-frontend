import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export type PaymentVerifyStatus = "idle" | "verifying" | "success" | "error"

interface Props {
  status: PaymentVerifyStatus
  onViewBol: () => void
  onClose: () => void
}

export function PaymentSuccessModal({ status, onViewBol, onClose }: Props) {
  return (
    <Dialog
      open={status !== "idle"}
      onOpenChange={(open) => { if (!open) onClose() }}
    >
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => {
        // Prevent dismissal while verifying
        if (status === "verifying") e.preventDefault()
      }}>
        {/* ── Verifying ── */}
        {status === "verifying" && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-3">
                <Loader2 className="h-14 w-14 text-primary animate-spin" />
              </div>
              <DialogTitle className="text-center text-xl">Verifying Payment…</DialogTitle>
              <DialogDescription className="text-center">
                Please wait while we confirm your payment with Paystack.
              </DialogDescription>
            </DialogHeader>
          </>
        )}

        {/* ── Success ── */}
        {status === "success" && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-3">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <DialogTitle className="text-center text-2xl text-green-600 dark:text-green-400">
                Payment Successful!
              </DialogTitle>
              <DialogDescription className="text-center">
                Your eBOL has been confirmed. You can now view the Bill of Lading document for this listing.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
              <Button className="flex-1" onClick={onViewBol}>
                View BOL
              </Button>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Continue Browsing
              </Button>
            </DialogFooter>
          </>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-3">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <DialogTitle className="text-center text-2xl text-red-600 dark:text-red-400">
                Verification Failed
              </DialogTitle>
              <DialogDescription className="text-center">
                Your payment may have gone through but we could not confirm it automatically.
                Please contact support with your payment reference.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
