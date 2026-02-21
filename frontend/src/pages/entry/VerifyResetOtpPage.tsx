"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Ship, ShieldCheck, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import api from "@/lib/api"

const EXPIRY_SECONDS = 10 * 60

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function VerifyResetOtpPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { email } = (location.state as { email: string }) ?? {}

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Guard — must arrive here from the email step
  if (!email) {
    navigate("/forgot-password", { replace: true })
    return null
  }

  const expired = secondsLeft === 0

  const startTimer = () => {
    clearInterval(timerRef.current!)
    setSecondsLeft(EXPIRY_SECONDS)
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(timerRef.current!); return 0 }
        return s - 1
      })
    }, 1000)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current!)
  }, [])

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter all 6 digits.")
      return
    }
    if (expired) {
      setError("The code has expired. Please request a new one.")
      return
    }

    setError(null)
    setLoading(true)

    try {
      const response = await api.post("/auth/verify-reset-otp", { email, otp })
      clearInterval(timerRef.current!)
      // Navigate to the change-password screen with the short-lived reset token
      navigate("/forgot-password/reset", {
        state: { resetToken: response.data.resetToken },
      })
    } catch (err: any) {
      setError(err?.data?.message || err.message || "Invalid or expired OTP.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError(null)

    try {
      await api.post("/auth/forgot-password", { email })
      startTimer()
      setOtp("")
      toast({ title: "New code sent!", description: "Check your inbox." })
    } catch (err: any) {
      toast({
        title: "Failed to resend",
        description: err?.data?.message || err.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Ship className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">ONTIME MARITIME</span>
              <span className="text-xs text-muted-foreground">Tech Meet Cargo</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Step 2 of 3</span>
            </div>
            <h1 className="text-3xl font-bold">Enter your code</h1>
            <p className="text-muted-foreground mt-2">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{email}</span>.
              Enter it below to continue.
            </p>
          </div>

          <Card className="glass border-2">
            <CardContent className="p-6 space-y-6">
              {error && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {expired && !error && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your code has expired. Request a new one below.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={loading || expired}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {/* Countdown */}
                <div
                  className={`flex items-center gap-1.5 text-sm font-medium ${
                    expired
                      ? "text-destructive"
                      : secondsLeft <= 60
                        ? "text-orange-500"
                        : "text-muted-foreground"
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  {expired ? "Code expired" : `Expires in ${formatTime(secondsLeft)}`}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleVerify}
                disabled={loading || otp.length !== 6 || expired}
              >
                {loading ? "Verifying…" : "Verify Code"}
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-primary font-semibold hover:underline disabled:opacity-50"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? "Sending…" : "Resend code"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
