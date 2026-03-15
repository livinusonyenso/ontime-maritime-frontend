"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Ship, ShieldCheck, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const EXPIRY_SECONDS = 10 * 60

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function VerifyOtpPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { verifyOtp, resendOtp } = useAuth()
  const { toast } = useToast()

  const { pendingId, email } = (location.state as { pendingId: string; email: string }) ?? {}

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Guard: if landed here without a pendingId, send back to register
  if (!pendingId) {
    navigate("/register", { replace: true })
    return null
  }

  const expired = secondsLeft === 0

  // Countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return s - 1
      })
    }, 1000)
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
      await verifyOtp(pendingId, otp)
      clearInterval(timerRef.current!)
      // Account is now created — navigate to congratulations page
      navigate("/welcome", { replace: true, state: { email } })
    } catch (err: any) {
      const msg = err?.data?.message || err.message || "Invalid or expired OTP."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) return
    setResending(true)
    setError(null)

    try {
      const result = await resendOtp(email)

      // Reset countdown
      clearInterval(timerRef.current!)
      setSecondsLeft(EXPIRY_SECONDS)
      setOtp("")
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) { clearInterval(timerRef.current!); return 0 }
          return s - 1
        })
      }, 1000)

      toast({ title: "New code sent!", description: result.message })

      // Update pendingId in state if backend rotated it
      if (result.pendingId && result.pendingId !== pendingId) {
        navigate("/verify-otp", {
          replace: true,
          state: { pendingId: result.pendingId, email },
        })
      }
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
              <span className="text-xs text-muted-foreground">Cargo Meet Tech</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Verify your email</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{email ?? "your email"}</span>.
              Enter it below — your account will only be created once verified.
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
                {loading ? "Verifying…" : "Verify & Create Account"}
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
