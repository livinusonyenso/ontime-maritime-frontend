"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Ship, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Clock, CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type Step = "email" | "reset"

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [step, setStep] = useState<Step>("email")

  // Step 1
  const [email, setEmail] = useState("")
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  // Step 2
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetError, setResetError] = useState<string | null>(null)

  // Countdown
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
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

  useEffect(() => () => clearInterval(timerRef.current!), [])

  /* ── Step 1: submit email ─────────────────────────────────────────── */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailError(null)
    setEmailLoading(true)

    try {
      await api.post("/auth/forgot-password", { email })
      // Always advance — backend never reveals whether email exists
      startTimer()
      setStep("reset")
    } catch (err: any) {
      setEmailError(
        err?.data?.message || err.message || "Something went wrong. Please try again.",
      )
    } finally {
      setEmailLoading(false)
    }
  }

  /* ── Step 2: submit OTP + new password ───────────────────────────── */
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetError(null)

    if (otp.length !== 6) {
      setResetError("Please enter all 6 digits of the OTP.")
      return
    }
    if (expired) {
      setResetError("The OTP has expired. Please request a new one.")
      return
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match.")
      return
    }

    setResetLoading(true)

    try {
      await api.post("/auth/reset-password", { email, otp, newPassword })

      clearInterval(timerRef.current!)
      toast({
        title: "Password reset successful!",
        description: "You can now sign in with your new password.",
      })
      navigate("/login", { state: { passwordReset: true } })
    } catch (err: any) {
      setResetError(
        err?.data?.message || err.message || "Invalid or expired OTP.",
      )
    } finally {
      setResetLoading(false)
    }
  }

  const handleResend = async () => {
    setResetError(null)
    try {
      await api.post("/auth/forgot-password", { email })
      startTimer()
      setOtp("")
      toast({ title: "New code sent!", description: "Check your inbox." })
    } catch {
      toast({
        title: "Failed to resend",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  /* ── Render ──────────────────────────────────────────────────────── */
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

          {/* ── STEP 1: Email ── */}
          {step === "email" && (
            <>
              <div>
                <h1 className="text-3xl font-bold">Forgot password?</h1>
                <p className="text-muted-foreground mt-2">
                  Enter your registered email and we'll send you a 6-digit reset code.
                </p>
              </div>

              <Card className="glass border-2">
                <CardContent className="p-6">
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    {emailError && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{emailError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={emailLoading}>
                      {emailLoading ? "Sending code…" : "Send Reset Code"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <p className="text-center text-sm text-muted-foreground">
                Remembered your password?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* ── STEP 2: OTP + New Password ── */}
          {step === "reset" && (
            <>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Code sent</span>
                </div>
                <h1 className="text-3xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground mt-2">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-medium text-foreground">{email}</span>{" "}
                  and choose a new password.
                </p>
              </div>

              <Card className="glass border-2">
                <CardContent className="p-6">
                  <form onSubmit={handleReset} className="space-y-5">
                    {resetError && (
                      <Alert variant="destructive" className="py-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{resetError}</AlertDescription>
                      </Alert>
                    )}

                    {/* OTP input + countdown */}
                    <div className="space-y-3">
                      <Label>6-digit code</Label>
                      <div className="flex flex-col items-center gap-3">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={setOtp}
                          disabled={resetLoading || expired}
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
                          {expired
                            ? "Code expired"
                            : `Expires in ${formatTime(secondsLeft)}`}
                        </div>
                      </div>
                    </div>

                    {/* New password */}
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Min 8 chars · 1 uppercase · 1 number · 1 special character
                      </p>
                    </div>

                    {/* Confirm password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm new password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={showConfirm ? "Hide password" : "Show password"}
                        >
                          {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-destructive">Passwords do not match.</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={
                        resetLoading ||
                        otp.length !== 6 ||
                        expired ||
                        newPassword !== confirmPassword ||
                        newPassword.length < 8 ||
                        !/[A-Z]/.test(newPassword) ||
                        !/[0-9]/.test(newPassword) ||
                        !/[!@#$%^&*]/.test(newPassword)
                      }
                    >
                      {resetLoading ? "Resetting…" : "Reset Password"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <p className="text-center text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary font-semibold hover:underline"
                >
                  Resend code
                </button>
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
