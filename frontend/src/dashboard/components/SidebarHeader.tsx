import { Link } from "react-router-dom"
import { Ship } from "lucide-react"

export function SidebarHeader() {
  return (
    <div className="flex h-16 items-center px-6 border-b">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <div className="bg-primary p-1.5 rounded-md">
          <Ship className="h-5 w-5 text-primary-foreground" />
        </div>
        ONTIME MARITIME
      </Link>
    </div>
  )
}
