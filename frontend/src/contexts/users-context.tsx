import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { User, KYC } from '../types'
import { useEffect } from 'react'

interface UsersContextType {
  profile: User | null
  kyc: KYC | null
  loading: boolean
  error: string | null
  getProfile: () => Promise<User>
  updateProfile: (data: Partial<User>) => Promise<User>
  submitKyc: (kycData: Omit<KYC, 'id' | 'user_id' | 'status' | 'admin_comment' | 'created_at' | 'updated_at'>) => Promise<KYC>
  getMyKyc: () => Promise<KYC>
  updateKyc: (id: string, data: Partial<KYC>) => Promise<KYC>
}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export function UsersProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<User | null>(null)
  const [kyc, setKyc] = useState<KYC | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProfile = async (): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/users/profile')
      const userData = response.data

      setProfile(userData)
      return userData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch profile'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>): Promise<User> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch('/users/profile', data)
      const updatedUser = response.data

      setProfile(updatedUser)
      return updatedUser
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Only sync profile to localStorage when it's explicitly updated (not on initial null)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (hasInitialized && profile) {
      localStorage.setItem("ontime_user", JSON.stringify(profile))
    }
  }, [profile, hasInitialized])

  // Mark as initialized after first render
  useEffect(() => {
    setHasInitialized(true)
  }, [])

  const submitKyc = async (
    kycData: Omit<KYC, 'id' | 'user_id' | 'status' | 'admin_comment' | 'created_at' | 'updated_at'>
  ): Promise<KYC> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/kyc', kycData)
      const newKyc = response.data

      setKyc(newKyc)
      return newKyc
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to submit KYC'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMyKyc = async (): Promise<KYC> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/kyc/my-kyc')
      const kycData = response.data

      setKyc(kycData)
      return kycData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch KYC'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateKyc = async (id: string, data: Partial<KYC>): Promise<KYC> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch(`/kyc/${id}`, data)
      const updatedKyc = response.data

      setKyc(updatedKyc)
      return updatedKyc
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update KYC'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <UsersContext.Provider
      value={{
        profile,
        kyc,
        loading,
        error,
        getProfile,
        updateProfile,
        submitKyc,
        getMyKyc,
        updateKyc,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext)
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider')
  }
  return context
}
