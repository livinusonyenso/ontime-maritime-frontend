import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('buyer' | 'seller' | 'admin' | 'executive' | 'organization')[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Check localStorage as synchronous fallback for when React state hasn't caught up yet
  const storedToken = localStorage.getItem("ontime_token")
  const storedUserRaw = localStorage.getItem("ontime_user")
  const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null
  const hasAuth = isAuthenticated || Boolean(storedToken && storedUser)
  const effectiveUser = user || storedUser

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!hasAuth) {
    // Redirect admin routes to admin login, others to regular login
    const isAdminRoute = location.pathname.startsWith('/admin')
    const loginPath = isAdminRoute ? '/admin/login' : '/login'
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  if (allowedRoles && effectiveUser && !allowedRoles.includes(effectiveUser.role as any)) {
    // Redirect to appropriate dashboard based on role
    if (effectiveUser.role === 'buyer') return <Navigate to="/dashboard/buyer" replace />
    if (effectiveUser.role === 'seller') return <Navigate to="/dashboard/seller" replace />
    if (effectiveUser.role === 'admin') return <Navigate to="/admin" replace />
    if (effectiveUser.role === 'organization') return <Navigate to="/dashboard/organization" replace />
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
