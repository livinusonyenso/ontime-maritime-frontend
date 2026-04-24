import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, X, Anchor, Waves } from "lucide-react"

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
  featureName?: string
}

export function ComingSoonModal({ open, onClose, featureName }: ComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Coming Soon</DialogTitle>
          <DialogDescription>This feature is not yet available.</DialogDescription>
        </DialogHeader>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 pt-10 pb-10 text-white overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <Waves className="absolute bottom-3 right-4 h-24 w-24 text-white/5" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Icon */}
          <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/30 mb-6">
            <Clock className="h-8 w-8 text-white" />
          </div>

          {/* Content */}
          <div className="relative z-10 space-y-3">
            <Badge className="bg-white/10 text-cyan-400 border-0 text-xs px-3 py-1">
              <Anchor className="h-3 w-3 mr-1.5" />
              Under Development
            </Badge>
            <h2 className="text-2xl font-bold leading-tight">
              {featureName ? `"${featureName}"` : "This Feature"} is Coming Soon
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              We're actively working on this. Check back soon — it won't be long.
            </p>
          </div>

          {/* CTA */}
          <div className="relative z-10 mt-8">
            <Button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
