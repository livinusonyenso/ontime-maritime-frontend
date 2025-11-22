
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("ontime_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Dummy login logic
    const dummyUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      role: email.includes("admin") ? "admin" : "user",
    }
    setUser(dummyUser)
    localStorage.setItem("ontime_user", JSON.stringify(dummyUser))
  }

  const register = async (email: string, password: string, name: string) => {
    // Dummy register logic
    const dummyUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: "user",
    }
    setUser(dummyUser)
    localStorage.setItem("ontime_user", JSON.stringify(dummyUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ontime_user")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
