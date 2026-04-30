import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Anchor, Waves } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
  featureName?: string
}

export function ComingSoonModal({ open, onClose, featureName }: ComingSoonModalProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{t("comingSoonModal.srTitle")}</DialogTitle>
          <DialogDescription>{t("comingSoonModal.srDescription")}</DialogDescription>
        </DialogHeader>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 sm:px-8 pt-10 pb-8 text-white overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <Waves className="absolute bottom-3 right-4 h-24 w-24 text-white/5" />

          {/* Icon — centered */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/30">
              <Clock className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Content — centered */}
          <div className="relative z-10 space-y-3 text-center">
            <div className="flex justify-center">
              <Badge className="bg-white/10 text-cyan-400 border-0 text-xs px-3 py-1">
                <Anchor className="h-3 w-3 mr-1.5" />
                {t("comingSoonModal.badge")}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold leading-tight">
              {featureName
                ? t("comingSoonModal.titleWithFeature", { name: featureName })
                : t("comingSoonModal.titleGeneric")}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t("comingSoonModal.description")}
            </p>
          </div>

          {/* CTA */}
          <div className="relative z-10 mt-8">
            <Button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            >
              {t("comingSoonModal.cta")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
