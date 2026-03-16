"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Ship, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, MailWarning, ShieldAlert } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)
  const [lockUntil, setLockUntil] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState("")
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { login, resendOtp } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!lockUntil) { setCountdown(""); return }

    const tick = () => {
      const diff = lockUntil.getTime() - Date.now()
      if (diff <= 0) {
        setLockUntil(null)
        setCountdown("")
        if (countdownRef.current) clearInterval(countdownRef.current)
        return
      }
      const m = Math.floor(diff / 60_000)
      const s = Math.floor((diff % 60_000) / 1000)
      setCountdown(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`)
    }

    tick()
    countdownRef.current = setInterval(tick, 1000)
    return () => { if (countdownRef.current) clearInterval(countdownRef.current) }
  }, [lockUntil])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setUnverifiedEmail(null)

    try {
      const user = await login(email, password)
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      })

      if (user.role === "buyer") navigate("/dashboard/buyer")
      else if (user.role === "seller") navigate("/dashboard/seller")
      else if (user.role === "organization") navigate("/dashboard/organization")
      else if (user.role === "executive") navigate("/dashboard/executive")
      else if (user.role === "admin") navigate("/admin")
      else navigate("/dashboard/buyer")
    } catch (err: any) {
      // err.data comes from the api.ts interceptor rejection shape
      const code = err?.data?.code
      if (code === "EMAIL_NOT_VERIFIED") {
        setUnverifiedEmail(err?.data?.email || email)
      } else if (code === "ACCOUNT_LOCKED") {
        const until = err?.data?.lock_until ? new Date(err.data.lock_until) : new Date(Date.now() + 15 * 60_000)
        setLockUntil(until)
      } else {
        setError(err.message || "Invalid email or password. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return
    setResending(true)

    try {
      const result = await resendOtp(unverifiedEmail)
      toast({
        title: "Verification email sent!",
        description: result.message,
      })

      // Navigate to OTP page with the pendingId if returned
      if (result.pendingId) {
        navigate("/verify-otp", {
          state: { pendingId: result.pendingId, email: unverifiedEmail },
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
      <div className="flex-1 flex">
        {/* Left Side - Form */}
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

            <div>
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
            </div>

            {/* Account locked banner with countdown */}
            {lockUntil && (
              <Alert className="border-red-300 bg-red-50 dark:bg-red-950/20">
                <ShieldAlert className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800 dark:text-red-400">Account Locked</AlertTitle>
                <AlertDescription className="text-red-700 dark:text-red-300">
                  Too many failed attempts. You can try again in{" "}
                  <span className="font-mono font-bold text-red-800 dark:text-red-300">{countdown}</span>
                </AlertDescription>
              </Alert>
            )}

            {/* Unverified email persistent banner */}
            {unverifiedEmail && (
              <Alert className="border-orange-300 bg-orange-50 dark:bg-orange-950/20">
                <MailWarning className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-800 dark:text-orange-400">
                  Email not verified
                </AlertTitle>
                <AlertDescription className="text-orange-700 dark:text-orange-300 space-y-3">
                  <p>
                    Your email address{" "}
                    <span className="font-medium">{unverifiedEmail}</span> is not
                    verified. You must verify your email to access the platform.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-orange-400 text-orange-700 hover:bg-orange-100 dark:text-orange-300"
                    onClick={handleResendVerification}
                    disabled={resending}
                  >
                    {resending ? "Sending…" : "Resend Verification Email"}
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Card className="glass border-2">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive" className="py-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
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
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
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
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading || !!lockUntil}>
                    {loading ? "Signing in..." : lockUntil ? `Locked (${countdown})` : "Sign in"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block flex-1 relative bg-slate-950">
          <div className="absolute inset-0 bg-[url(/cargo-ship-at-sea.jpg)] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="max-w-md space-y-6 text-white">
              <h2 className="text-4xl font-bold text-balance">Manage Your Maritime Operations</h2>
              <p className="text-lg leading-relaxed text-slate-200">
                Access real-time tracking, digital documents, auction marketplace, and comprehensive analytics from a
                single platform.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
