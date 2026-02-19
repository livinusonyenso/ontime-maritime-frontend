"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { Ship, PartyPopper, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function WelcomePage() {
  const location = useLocation()
  const navigate = useNavigate()

  const { email } = (location.state as { email?: string }) ?? {}

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Ship className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg leading-none">ONTIME MARITIME</span>
              <span className="text-xs text-muted-foreground">Tech Meet Cargo</span>
            </div>
          </div>

          {/* Celebration icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-6">
                <PartyPopper className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold">
              Congratulations!
            </h1>
            <p className="text-xl text-muted-foreground">
              You've successfully joined OnTime Maritime.
            </p>
            {email && (
              <p className="text-sm text-muted-foreground">
                A welcome email has been sent to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
            )}
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            {[
              { label: "Cargo Tracking", desc: "Real-time vessel & shipment tracking" },
              { label: "Digital e-BOL", desc: "Paperless Bill of Lading" },
              { label: "Marketplace", desc: "Buy & sell maritime cargo" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-lg border bg-card p-4 space-y-1"
              >
                <p className="font-semibold text-foreground">{f.label}</p>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="w-full sm:w-auto px-12"
            onClick={() => navigate("/login")}
          >
            Sign In to Your Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-xs text-muted-foreground">
            Having trouble?{" "}
            <a
              href="mailto:support@ontimemaritime.com"
              className="text-primary hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
