import { User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function SidebarFooter() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
        <User className="h-4 w-4" />
        <div className="flex flex-col text-xs">
          <span className="font-semibold text-foreground">
            {user.first_name} {user.last_name}
          </span>
          <span className="truncate w-32">{user.email}</span>
        </div>
      </div>
    </div>
  )
}
