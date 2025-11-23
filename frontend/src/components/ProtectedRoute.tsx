import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('buyer' | 'seller' | 'admin' | 'executive')[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role as any)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'buyer') return <Navigate to="/dashboard/buyer" replace />
    if (user.role === 'seller') return <Navigate to="/dashboard/seller" replace />
    if (user.role === 'admin') return <Navigate to="/admin" replace />
    // 'executive' might be a specific role or permission, handling it if it exists in user.role
    // If the user role doesn't match any specific dashboard, fallback to main dashboard or home
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
