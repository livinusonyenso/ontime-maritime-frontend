import { Link, useLocation } from "react-router-dom"

export function SidebarHeader() {
  const location = useLocation()

  // Determine dashboard home based on current route
  const dashboardPath = location.pathname.startsWith("/admin")
    ? "/admin"
    : location.pathname.startsWith("/dashboard/seller")
      ? "/dashboard/seller"
      : location.pathname.startsWith("/dashboard/organization")
        ? "/dashboard/organization"
        : "/dashboard/buyer"

  return (
    <div className="flex h-16 items-center px-6 border-b overflow-hidden">
      <Link to={dashboardPath} className="flex items-center gap-2">
        <img src="/logo.png" alt="Ontime Maritime" className="h-8 w-auto" />
      </Link>
    </div>
  )
}
