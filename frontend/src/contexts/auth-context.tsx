import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { useNavigate } from "react-router-dom"
import api from "../lib/api"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  signup: (
    email: string,
    phone: string,
    password: string,
    role: "buyer" | "seller" | "organization",
    orgFields?: { company_name?: string; business_address?: string; website?: string }
  ) => Promise<string>
  verifyOtp: (pendingId: string, otp: string) => Promise<void>
  resendOtp: (email: string) => Promise<{ pendingId?: string; message: string }>
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  /* ------------------ INIT FROM STORAGE ------------------ */
  useEffect(() => {
    const storedToken = localStorage.getItem("ontime_token")
    const storedUser = localStorage.getItem("ontime_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  /* ------------------ SESSION EXPIRY (from 401 interceptor) ------------------ */
  // Listen for the custom event fired by the axios interceptor instead of doing
  // a hard window.location.href redirect (which would wipe in-flight state).
  const handleSessionExpired = useCallback((e: Event) => {
    const isAdmin = (e as CustomEvent).detail?.isAdmin ?? false
    setUser(null)
    setToken(null)
    navigate(isAdmin ? "/admin/login" : "/login", { replace: true })
  }, [navigate])

  useEffect(() => {
    window.addEventListener("auth:session-expired", handleSessionExpired)
    return () => window.removeEventListener("auth:session-expired", handleSessionExpired)
  }, [handleSessionExpired])

  /* ------------------ SIGNUP ------------------ */
  const signup = async (
    email: string,
    phone: string,
    password: string,
    role: "buyer" | "seller" | "organization",
    orgFields?: { company_name?: string; business_address?: string; website?: string }
  ): Promise<string> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post("/auth/signup", {
        email,
        phone,
        password,
        role,
        ...orgFields,
      })

      /**
       * BACKEND RESPONSE: { pendingId: string, message: string }
       * No account exists yet — only a PendingRegistration record.
       * Token/user are set only after OTP verification.
       */
      return response.data.pendingId as string
    } catch (err: any) {
      setError(err.message || "Signup failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ------------------ VERIFY OTP ------------------ */
  const verifyOtp = async (pendingId: string, otp: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post("/auth/verify-otp", {
        pendingId,
        otp,
      })

      /**
       * BACKEND RESPONSE: { access_token: string, user: User }
       * Account is created here for the first time.
       */
      const { access_token, user: verifiedUser } = response.data

      setToken(access_token)
      setUser(verifiedUser)

      localStorage.setItem("ontime_token", access_token)
      localStorage.setItem("ontime_user", JSON.stringify(verifiedUser))
    } catch (err: any) {
      setError(err.message || "OTP verification failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ------------------ RESEND OTP ------------------ */
  const resendOtp = async (email: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post("/auth/resend-otp", { email })
      return response.data as { pendingId?: string; message: string }
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ------------------ LOGIN ------------------ */
  const login = async (email: string, password: string): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post("/auth/login", {
        email,
        password,
      })

      const { access_token, user: loggedInUser } = response.data

      setToken(access_token)
      setUser(loggedInUser)

      localStorage.setItem("ontime_token", access_token)
      localStorage.setItem("ontime_user", JSON.stringify(loggedInUser))

      return loggedInUser
    } catch (err: any) {
      const errorMessage = err.message || "Login failed. Please check your credentials."
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ------------------ LOGOUT ------------------ */
  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem("ontime_token")
    localStorage.removeItem("ontime_user")
  }

  /* ------------------ REFRESH PROFILE ------------------ */
  const refreshProfile = async () => {
    if (!token) return

    try {
      setLoading(true)

      const response = await api.get("/users/profile")
      const updatedUser = response.data

      setUser(updatedUser)
      localStorage.setItem("ontime_user", JSON.stringify(updatedUser))
    } catch (err: any) {
      setError(err.message || "Failed to refresh profile")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        loading,
        error,
        signup,
        verifyOtp,
        resendOtp,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/* ------------------ HOOK ------------------ */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
