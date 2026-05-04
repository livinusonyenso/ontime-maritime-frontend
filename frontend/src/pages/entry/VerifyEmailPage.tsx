"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { Ship, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import api from "@/lib/api"

type Status = "verifying" | "success" | "error"

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get("token") ?? ""
  const email = searchParams.get("email") ?? ""

  const [status, setStatus]   = useState<Status>("verifying")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token || !email) {
      setStatus("error")
      setMessage("Invalid verification link. Please request a new one.")
      return
    }

    api
      .post("/auth/verify-email-token", { email, token })
      .then((res) => {
        setStatus("success")
        setMessage(res.data?.message || "Email verified successfully.")
      })
      .catch((err) => {
        setStatus("error")
        setMessage(
          err?.data?.message ||
          err?.message ||
          "Verification link is invalid or has expired. Please request a new one.",
        )
      })
  // Run once on mount — token + email come from URL and won't change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

          <Card className="glass border-2">
            <CardContent className="p-8 flex flex-col items-center gap-5 text-center">

              {status === "verifying" && (
                <>
                  <Loader2 className="h-16 w-16 text-primary animate-spin" />
                  <h1 className="text-2xl font-bold">Verifying your email…</h1>
                  <p className="text-muted-foreground">Please wait a moment.</p>
                </>
              )}

              {status === "success" && (
                <>
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Email Verified!
                  </h1>
                  <p className="text-muted-foreground">{message}</p>
                  <Button className="w-full mt-2" onClick={() => navigate("/login")}>
                    Continue to Login
                  </Button>
                </>
              )}

              {status === "error" && (
                <>
                  <XCircle className="h-16 w-16 text-destructive" />
                  <h1 className="text-2xl font-bold text-destructive">Verification Failed</h1>
                  <p className="text-muted-foreground">{message}</p>
                  <Button variant="outline" className="w-full mt-2" asChild>
                    <Link to="/login">Back to Login</Link>
                  </Button>
                </>
              )}

            </CardContent>
          </Card>

        </div>
      </div>

      <Footer />
    </div>
  )
}
