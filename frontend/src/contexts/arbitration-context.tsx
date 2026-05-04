import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Arbitration } from '../types'

interface ArbitrationContextType {
  arbitrations: Arbitration[]
  currentArbitration: Arbitration | null
  loading: boolean
  error: string | null
  createArbitration: (data: {
    transaction_id: string
    complainant_id: string
    respondent_id: string
    description: string
  }) => Promise<Arbitration>
  getMyArbitrations: (skip?: number, take?: number) => Promise<Arbitration[]>
  getArbitrationDetails: (id: string) => Promise<Arbitration>
  updateArbitrationStatus: (id: string, status: string, resolution?: string) => Promise<Arbitration>
}

const ArbitrationContext = createContext<ArbitrationContextType | undefined>(undefined)

export function ArbitrationProvider({ children }: { children: ReactNode }) {
  const [arbitrations, setArbitrations] = useState<Arbitration[]>([])
  const [currentArbitration, setCurrentArbitration] = useState<Arbitration | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createArbitration = async (data: {
    transaction_id: string
    complainant_id: string
    respondent_id: string
    description: string
  }): Promise<Arbitration> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/arbitration', data)
      const newArbitration = response.data

      setArbitrations((prev) => [newArbitration, ...prev])
      return newArbitration
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create arbitration'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMyArbitrations = async (skip = 0, take = 20): Promise<Arbitration[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/arbitration/my-arbitrations', {
        params: { skip, take },
      })
      const data = response.data

      setArbitrations(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch arbitrations'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getArbitrationDetails = async (id: string): Promise<Arbitration> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/arbitration/${id}`)
      const data = response.data

      setCurrentArbitration(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch arbitration details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateArbitrationStatus = async (
    id: string,
    status: string,
    resolution?: string
  ): Promise<Arbitration> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch(`/arbitration/${id}`, { status, resolution })
      const updatedArbitration = response.data

      setArbitrations((prev) =>
        prev.map((arb) => (arb.id === id ? updatedArbitration : arb))
      )
      if (currentArbitration?.id === id) {
        setCurrentArbitration(updatedArbitration)
      }

      return updatedArbitration
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update arbitration'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <ArbitrationContext.Provider
      value={{
        arbitrations,
        currentArbitration,
        loading,
        error,
        createArbitration,
        getMyArbitrations,
        getArbitrationDetails,
        updateArbitrationStatus,
      }}
    >
      {children}
    </ArbitrationContext.Provider>
  )
}

export function useArbitration() {
  const context = useContext(ArbitrationContext)
  if (context === undefined) {
    throw new Error('useArbitration must be used within an ArbitrationProvider')
  }
  return context
}
