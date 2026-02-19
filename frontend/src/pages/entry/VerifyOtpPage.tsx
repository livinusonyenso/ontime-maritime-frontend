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

const EXPIRY_SECONDS = 10 * 60 // 10 minutes

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, "0")}`
}

export default function VerifyOtpPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { verifyOtp, user } = useAuth()
  const { toast } = useToast()

  const { userId, email } = (location.state as { userId: string; email: string }) ?? {}

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Guard: if landed here without a userId, send back to register
  if (!userId) {
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
      setError("The code has expired. Please register again to get a new code.")
      return
    }

    setError(null)
    setLoading(true)

    try {
      await verifyOtp(userId, otp)

      clearInterval(timerRef.current!)

      toast({
        title: "Email verified!",
        description: "Welcome to OnTime Maritime.",
      })

      // verifyOtp sets user in context; redirect based on role
      setTimeout(() => {
        const role = user?.role
        if (role === "seller") navigate("/dashboard/seller", { replace: true })
        else if (role === "admin") navigate("/admin", { replace: true })
        else navigate("/dashboard/buyer", { replace: true })
      }, 100)
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err.message || "Invalid or expired OTP."
      setError(msg)
      toast({
        title: "Verification failed",
        description: msg,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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

          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Verify your email</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              We sent a 6-digit code to{" "}
              <span className="font-medium text-foreground">{email ?? "your email"}</span>.
              Enter it below to complete your registration.
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
                    Your code has expired. Please go back and register again.
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
                  {expired ? "Code expired" : `Code expires in ${formatTime(secondsLeft)}`}
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleVerify}
                disabled={loading || otp.length !== 6 || expired}
              >
                {loading ? "Verifying…" : "Verify & Continue"}
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-primary font-semibold hover:underline"
              onClick={() => navigate("/register")}
            >
              Go back and try again
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
