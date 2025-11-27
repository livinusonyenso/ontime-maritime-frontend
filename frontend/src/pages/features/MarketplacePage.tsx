
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import MarketplaceMain from "@/components/MarketplaceMain"

export default function MarketplacePage() {



  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header/>

   <MarketplaceMain/>

      <Footer/>
    </div>
  )
}

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
)
