import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { ExecutiveCorner } from '../types'

interface ExecutiveCornerContextType {
  pendingListings: ExecutiveCorner[]
  records: ExecutiveCorner[]
  currentRecord: ExecutiveCorner | null
  loading: boolean
  error: string | null
  getPendingListings: (skip?: number, take?: number) => Promise<ExecutiveCorner[]>
  getAllRecords: (skip?: number, take?: number) => Promise<ExecutiveCorner[]>
  getRecordDetails: (id: string) => Promise<ExecutiveCorner>
  approveListing: (id: string, comment: string) => Promise<ExecutiveCorner>
  rejectListing: (id: string, comment: string) => Promise<ExecutiveCorner>
  checkAutoRelease: () => Promise<ExecutiveCorner[]>
}

const ExecutiveCornerContext = createContext<ExecutiveCornerContextType | undefined>(undefined)

export function ExecutiveCornerProvider({ children }: { children: ReactNode }) {
  const [pendingListings, setPendingListings] = useState<ExecutiveCorner[]>([])
  const [records, setRecords] = useState<ExecutiveCorner[]>([])
  const [currentRecord, setCurrentRecord] = useState<ExecutiveCorner | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getPendingListings = async (skip = 0, take = 20): Promise<ExecutiveCorner[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/executive-corner', {
        params: { skip, take },
      })
      const data = response.data

      setPendingListings(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch pending listings'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAllRecords = async (skip = 0, take = 20): Promise<ExecutiveCorner[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/executive-corner/all', {
        params: { skip, take },
      })
      const data = response.data

      setRecords(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch records'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getRecordDetails = async (id: string): Promise<ExecutiveCorner> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/executive-corner/${id}`)
      const data = response.data

      setCurrentRecord(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch record details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const approveListing = async (id: string, comment: string): Promise<ExecutiveCorner> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/executive-corner/${id}/approve`, { comment })
      const data = response.data

      setPendingListings((prev) => prev.filter((item) => item.id !== id))
      setRecords((prev) => prev.map((item) => (item.id === id ? data : item)))
      
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to approve listing'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const rejectListing = async (id: string, comment: string): Promise<ExecutiveCorner> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/executive-corner/${id}/reject`, { comment })
      const data = response.data

      setPendingListings((prev) => prev.filter((item) => item.id !== id))
      setRecords((prev) => prev.map((item) => (item.id === id ? data : item)))
      
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reject listing'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const checkAutoRelease = async (): Promise<ExecutiveCorner[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/executive-corner/check-auto-release')
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to check auto-release'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <ExecutiveCornerContext.Provider
      value={{
        pendingListings,
        records,
        currentRecord,
        loading,
        error,
        getPendingListings,
        getAllRecords,
        getRecordDetails,
        approveListing,
        rejectListing,
        checkAutoRelease,
      }}
    >
      {children}
    </ExecutiveCornerContext.Provider>
  )
}

export function useExecutiveCorner() {
  const context = useContext(ExecutiveCornerContext)
  if (context === undefined) {
    throw new Error('useExecutiveCorner must be used within an ExecutiveCornerProvider')
  }
  return context
}
