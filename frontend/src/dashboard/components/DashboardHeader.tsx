import { NotificationBell } from "./NotificationBell"
import { UserMenu } from "./UserMenu"

export function DashboardHeader() {
  return (
    <div className="flex items-center gap-4 ml-auto">
      <NotificationBell />
      <UserMenu />
    </div>
  )
}
