"use client"

import { Button } from "@/components/ui/button"
import { Headphones, MessageCircle, Phone } from "lucide-react"

interface BuyerSupportCardProps {
  onContactSupport?: () => void
}

export function BuyerSupportCard({ onContactSupport }: BuyerSupportCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6">
      {/* Decorative elements */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-teal-500/20 blur-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-xl bg-cyan-500/20 p-3">
          <Headphones className="h-6 w-6 text-cyan-400" />
        </div>
        
        <h3 className="text-lg font-bold text-white">Need Assistance?</h3>
        <p className="mt-2 text-sm text-slate-400">
          Our maritime logistics experts are available 24/7 to help with your shipments.
        </p>
        
        <div className="mt-6 space-y-3">
          <Button
            onClick={onContactSupport}
            className="w-full bg-cyan-500 text-white hover:bg-cyan-600"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Live Chat
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <Phone className="h-4 w-4" />
            <span>or call +1 (800) ONTIME-1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
