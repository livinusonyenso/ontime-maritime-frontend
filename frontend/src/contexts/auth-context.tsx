import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
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
    role: "buyer" | "seller"
  ) => Promise<string>
  verifyOtp: (userId: string, otp: string) => Promise<void>
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

  /* ------------------ SIGNUP ------------------ */
  const signup = async (
    email: string,
    phone: string,
    password: string,
    role: "buyer" | "seller"
  ): Promise<string> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post("/auth/signup", {
        email,
        phone,
        password,
        role,
      })

      /**
       * BACKEND RESPONSE: { userId: string, message: string }
       * Token/user are NOT set here — they are set after OTP verification.
       */
      return response.data.userId as string
    } catch (err: any) {
      setError(err.message || "Signup failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  /* ------------------ VERIFY OTP ------------------ */
  const verifyOtp = async (userId: string, otp: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post("/auth/verify-otp", {
        userId,
        otp,
      })

      /**
       * EXPECTED BACKEND RESPONSE:
       * {
       *   access_token: string,
       *   user: User
       * }
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
