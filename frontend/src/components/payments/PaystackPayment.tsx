"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Shield, CheckCircle2, Loader2 } from "lucide-react";

/* ===================== TYPES ===================== */

interface PaystackPaymentProps {
  amount: number;
  email?: string;
  serviceName: string;
  consultantName?: string;
  currency?: "NGN" | "USD";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata: {
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

/* ===================== COMPONENT ===================== */

export function PaystackPayment({
  amount,
  email: initialEmail = "",
  serviceName,
  consultantName,
  currency = "NGN",
  isOpen,
  setIsOpen,
  onSuccess,
  onClose,
}: PaystackPaymentProps) {
  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reference, setReference] = useState("");

  const PAYSTACK_PUBLIC_KEY =
    import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

  /* ===================== HELPERS ===================== */

  const generateReference = () =>
    `ONTIME-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
      style: "currency",
      currency,
    }).format(value);

  /* ===================== PAYSTACK ===================== */

  const loadPaystack = () =>
    new Promise<void>((resolve) => {
      if (window.PaystackPop) return resolve();

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!email || !fullName || !PAYSTACK_PUBLIC_KEY) return;

    setIsLoading(true);
    await loadPaystack();

    const ref = generateReference();

    const handler = window.PaystackPop!.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: amount * 100,
      currency,
      ref,
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: fullName },
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Service", variable_name: "service", value: serviceName },
          ...(consultantName
            ? [{ display_name: "Consultant", variable_name: "consultant", value: consultantName }]
            : []),
        ],
      },
      callback: (res) => {
        setReference(res.reference);
        setSuccess(true);
        setIsLoading(false);
        onSuccess?.(res.reference);
      },
      onClose: () => {
        setIsLoading(false);
        onClose?.();
      },
    });

    handler.openIframe();
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setReference("");
    setEmail(initialEmail);
    setFullName("");
    setPhone("");
  };

  /* ===================== UI ===================== */

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Complete Payment
              </DialogTitle>
              <DialogDescription>
                Secure payment via Paystack
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-slate-900 text-white p-4 rounded-xl">
                <div className="text-sm text-slate-400">Service</div>
                <div className="font-semibold">{serviceName}</div>
                {consultantName && (
                  <div className="text-sm mt-2">Consultant: {consultantName}</div>
                )}
                <div className="mt-4 flex justify-between border-t border-slate-700 pt-3">
                  <span>Total</span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Full Name</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />

                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />

                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                SSL-secured payment
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={resetAndClose}>Cancel</Button>
              <Button
                onClick={handlePayment}
                disabled={isLoading || !email || !fullName}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>Pay {formatCurrency(amount)}</>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
                Payment Successful
              </DialogTitle>
            </DialogHeader>

            <div className="py-6 text-center space-y-3">
              <div className="font-mono bg-muted p-3 rounded">{reference}</div>
              <p className="text-sm text-muted-foreground">
                Confirmation sent to {email}
              </p>
            </div>

            <DialogFooter>
              <Button onClick={resetAndClose} className="w-full">Done</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ===================== HOOK ===================== */

interface PaymentConfig {
  amount: number;
  serviceName: string;
  consultantName?: string;
  email?: string;
}

export function usePaystackPayment() {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);

  const openPayment = (config: PaymentConfig) => {
    setPaymentConfig(config);
    setIsPaymentOpen(true);
  };

  const closePayment = () => {
    setIsPaymentOpen(false);
    setPaymentConfig(null);
  };

  return {
    isPaymentOpen,
    setIsPaymentOpen,
    paymentConfig,
    openPayment,
    closePayment,
  };
}
