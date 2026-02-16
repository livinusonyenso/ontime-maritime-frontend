"use client"

import type React from "react"

import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Shield, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login, logout } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setError(null)

  try {
    // Login should return user object
    const user = await login(email, password) 

    if (user.role === "admin") {
      // Save to localStorage after successful admin login
      localStorage.setItem("ontime_user", JSON.stringify(user))

      toast({
        title: "Welcome back, Admin",
        description: "You've successfully signed in to the admin portal.",
      })
      navigate("/admin")
    } else {
      setError("Access denied. Admin credentials required.")
      toast({
        title: "Access denied",
        description: "This portal is restricted to administrators.",
        variant: "destructive",
      })
      logout()
    }
  } catch (error: any) {
    setError(error.message || "Invalid email or password. Please try again.")
    toast({
      title: "Login failed",
      description: "Please check your credentials and try again.",
      variant: "destructive",
    })
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">ONTIME MARITIME</span>
              <span className="text-xs text-muted-foreground">Admin Portal</span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">Admin Portal</h1>
            <p className="text-muted-foreground mt-2">Sign in to the administration panel</p>
          </div>

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
                      placeholder="admin@ontimemaritime.com"
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
                  <Link to="#" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in to Admin"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Admin: admin@ontimemaritime.com / admin123
          </p>

          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to main site
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 relative bg-slate-950">
        <div className="absolute inset-0 bg-[url(/cargo-ship-at-sea.jpg)] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-slate-950/80" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="max-w-md space-y-6 text-white">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl w-fit">
              <Shield className="h-12 w-12" />
            </div>
            <h2 className="text-4xl font-bold text-balance">Platform Administration</h2>
            <p className="text-lg leading-relaxed text-slate-200">
              Monitor operations, manage users, and oversee the entire maritime trading platform from a
              single command center.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-slate-300">Active Users</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-2xl font-bold">$2.4M</p>
                <p className="text-sm text-slate-300">Platform Volume</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-slate-300">Uptime</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-slate-300">Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
