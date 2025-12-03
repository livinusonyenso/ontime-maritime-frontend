import { SearchBar } from "./SearchBar"
import { NotificationBell } from "./NotificationBell"
import { UserMenu } from "./UserMenu"

export function DashboardHeader() {
  return (
    <>
      <SearchBar />
      <div className="flex items-center gap-4">
        <NotificationBell />
        <UserMenu />
      </div>
    </>
  )
}
