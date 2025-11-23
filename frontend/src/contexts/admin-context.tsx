import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { DashboardStats, User, KYC, AuditLog } from '../types'

interface AdminContextType {
  stats: DashboardStats | null
  users: User[]
  pendingKyc: KYC[]
  auditLogs: AuditLog[]
  loading: boolean
  error: string | null
  getDashboardStats: () => Promise<DashboardStats>
  getAllUsers: (skip?: number, take?: number) => Promise<User[]>
  getUserDetails: (id: string) => Promise<User>
  updateUserRole: (id: string, role: string) => Promise<User>
  updateSubscription: (id: string, status: string, expiry: string | null) => Promise<User>
  getPendingKyc: (skip?: number, take?: number) => Promise<KYC[]>
  approveKyc: (id: string, comment: string) => Promise<KYC>
  rejectKyc: (id: string, comment: string) => Promise<KYC>
  getAuditLogs: (skip?: number, take?: number) => Promise<AuditLog[]>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [pendingKyc, setPendingKyc] = useState<KYC[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/admin/stats')
      const data = response.data

      setStats(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch dashboard stats'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAllUsers = async (skip = 0, take = 20): Promise<User[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/admin/users', {
        params: { skip, take },
      })
      const data = response.data

      setUsers(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch users'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getUserDetails = async (id: string): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/admin/users/${id}`)
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch user details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (id: string, role: string): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch(`/admin/users/${id}/role`, { role })
      const updatedUser = response.data

      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
      return updatedUser
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update user role'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateSubscription = async (
    id: string,
    status: string,
    expiry: string | null
  ): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch(`/admin/users/${id}/subscription`, {
        subscription_status: status,
        subscription_expiry: expiry,
      })
      const updatedUser = response.data

      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
      return updatedUser
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update subscription'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getPendingKyc = async (skip = 0, take = 20): Promise<KYC[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/admin/kyc/pending', {
        params: { skip, take },
      })
      const data = response.data

      setPendingKyc(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch pending KYC'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const approveKyc = async (id: string, comment: string): Promise<KYC> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/admin/kyc/${id}/approve`, { comment })
      const approvedKyc = response.data

      setPendingKyc((prev) => prev.filter((kyc) => kyc.id !== id))
      return approvedKyc
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to approve KYC'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const rejectKyc = async (id: string, comment: string): Promise<KYC> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/admin/kyc/${id}/reject`, { comment })
      const rejectedKyc = response.data

      setPendingKyc((prev) => prev.filter((kyc) => kyc.id !== id))
      return rejectedKyc
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reject KYC'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAuditLogs = async (skip = 0, take = 20): Promise<AuditLog[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/admin/audit-logs', {
        params: { skip, take },
      })
      const data = response.data

      setAuditLogs(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch audit logs'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminContext.Provider
      value={{
        stats,
        users,
        pendingKyc,
        auditLogs,
        loading,
        error,
        getDashboardStats,
        getAllUsers,
        getUserDetails,
        updateUserRole,
        updateSubscription,
        getPendingKyc,
        approveKyc,
        rejectKyc,
        getAuditLogs,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
