"use client"

import { useState } from "react"
import { usePaystackPayment as usePaystackHook } from "react-paystack"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, CheckCircle2, XCircle, Loader2 } from "lucide-react"

// Payment configuration interface
interface PaymentConfig {
  amount: number
  serviceName: string
  consultantName?: string
  email?: string
}

// Hook for managing payment state
export function usePaystackPayment() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>({
    amount: 0,
    serviceName: "",
    consultantName: "",
    email: "",
  })

  const openPayment = (config: PaymentConfig) => {
    setPaymentConfig(config)
    setIsPaymentOpen(true)
  }

  const closePayment = () => {
    setIsPaymentOpen(false)
    setPaymentConfig({
      amount: 0,
      serviceName: "",
      consultantName: "",
      email: "",
    })
  }

  return {
    isPaymentOpen,
    setIsPaymentOpen,
    paymentConfig,
    openPayment,
    closePayment,
  }
}

// Payment component props
interface PaystackPaymentProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  amount: number
  serviceName: string
  consultantName?: string
  email?: string
  onSuccess?: (reference: string) => void
  onClose?: () => void
}

export function PaystackPayment({
  isOpen,
  setIsOpen,
  amount,
  serviceName,
  consultantName,
  email: initialEmail,
  onSuccess,
  onClose,
}: PaystackPaymentProps) {
  const [email, setEmail] = useState(initialEmail || "")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Paystack public key from environment variables
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ""

  // Convert amount to kobo (Paystack uses kobo for NGN)
  const amountInKobo = Math.round(amount * 100)

  const config = {
    reference: `ref_${new Date().getTime()}_${Math.random().toString(36).substring(7)}`,
    email: email,
    amount: amountInKobo,
    publicKey: publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Service",
          variable_name: "service",
          value: serviceName,
        },
        {
          display_name: "Consultant",
          variable_name: "consultant",
          value: consultantName || "N/A",
        },
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: phone,
        },
      ],
    },
  }

  const initializePayment = usePaystackHook(config)

  const handleSuccess = (reference: any) => {
    setPaymentStatus("success")
    console.log("Payment successful:", reference)
    if (onSuccess) {
      onSuccess(reference.reference)
    }
    setTimeout(() => {
      handleClose()
    }, 2000)
  }

  const handlePaystackClose = () => {
    setPaymentStatus("error")
    setErrorMessage("Payment was cancelled")
     setIsOpen(false);
    if (onClose) {
      onClose()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setPaymentStatus("idle")
    setErrorMessage("")
    setEmail("")
    setName("")
    setPhone("")
     setIsOpen(false);
    if (onClose) {
      onClose()
    }
  }

  const handleInitiatePayment = () => {
    if (!email || !name) {
      setErrorMessage("Please fill in all required fields")
      return
    }

    if (!publicKey) {
      setErrorMessage("Payment configuration error. Please contact support.")
      return
    }

    setPaymentStatus("processing")
    setErrorMessage("")

    initializePayment({
      onSuccess: handleSuccess,
      onClose: handlePaystackClose,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-cyan-600" />
            Payment Details
          </DialogTitle>
          <DialogDescription>
            Complete your payment for {serviceName}
            {consultantName && ` with ${consultantName}`}
          </DialogDescription>
        </DialogHeader>

        {paymentStatus === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-slate-600">
                Your payment has been processed successfully.
              </p>
            </div>
          </div>
        ) : paymentStatus === "error" ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Payment Failed
              </h3>
              <p className="text-slate-600">{errorMessage}</p>
            </div>
            <Button
              onClick={() => {
                setPaymentStatus("idle")
                setErrorMessage("")
              }}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Amount Display */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
              <div className="text-sm text-slate-600 mb-1">Total Amount</div>
              <div className="text-3xl font-bold text-slate-900">
                ${amount.toLocaleString()}
              </div>
              <div className="text-sm text-slate-500 mt-1">{serviceName}</div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                  disabled={paymentStatus === "processing"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={paymentStatus === "processing"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                  disabled={paymentStatus === "processing"}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-12"
                disabled={paymentStatus === "processing"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleInitiatePayment}
                className="flex-1 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                disabled={paymentStatus === "processing"}
              >
                {paymentStatus === "processing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay ${amount.toLocaleString()}
                  </>
                )}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="text-xs text-center text-slate-500 pt-2">
              🔒 Secured by Paystack. Your payment information is encrypted and
              secure.
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}