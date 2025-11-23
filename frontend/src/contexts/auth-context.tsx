import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import api from '../lib/api'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  signup: (email: string, phone: string, password: string, role: 'buyer' | 'seller') => Promise<void>
  verifyOtp: (userId: string, otp: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('ontime_token')
    const storedUser = localStorage.getItem('ontime_user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signup = async (email: string, phone: string, password: string, role: 'buyer' | 'seller') => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/auth/signup', {
        email,
        phone,
        password,
        role,
      })

      const { user: newUser } = response.data
      setUser(newUser)
      localStorage.setItem('ontime_user', JSON.stringify(newUser))
    } catch (err: any) {
      setError(err.message || 'Signup failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (userId: string, otp: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/auth/verify-otp', {
        userId,
        otp,
      })

      const { user: verifiedUser } = response.data
      setUser(verifiedUser)
      localStorage.setItem('ontime_user', JSON.stringify(verifiedUser))
    } catch (err: any) {
      setError(err.message || 'OTP verification failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const { access_token, user: loggedInUser } = response.data

      setToken(access_token)
      setUser(loggedInUser)
      localStorage.setItem('ontime_token', access_token)
      localStorage.setItem('ontime_user', JSON.stringify(loggedInUser))
    } catch (err: any) {
      setError(err.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('ontime_token')
    localStorage.removeItem('ontime_user')
  }

  const refreshProfile = async () => {
    if (!token) return

    try {
      setLoading(true)
      const response = await api.get('/users/profile')
      const updatedUser = response.data

      setUser(updatedUser)
      localStorage.setItem('ontime_user', JSON.stringify(updatedUser))
    } catch (err: any) {
      setError(err.message || 'Failed to refresh profile')
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
        isAuthenticated: !!user && !!token,
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

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
