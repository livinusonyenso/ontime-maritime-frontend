import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { TrackingLog } from '../types'

interface TrackingContextType {
  trackingData: TrackingLog[]
  loading: boolean
  error: string | null
  logTracking: (data: {
    container_number?: string
    vessel_imo?: string
    lat: number
    lng: number
    speed?: number
    heading?: string
    timestamp: string
  }) => Promise<TrackingLog>
  getContainerHistory: (containerNumber: string, limit?: number) => Promise<TrackingLog[]>
  getVesselHistory: (vesselImo: string, limit?: number) => Promise<TrackingLog[]>
  getLatestContainerPosition: (containerNumber: string) => Promise<TrackingLog>
  getLatestVesselPosition: (vesselImo: string) => Promise<TrackingLog>
  getMovementHistory: (identifier: string, startDate: string, endDate: string) => Promise<TrackingLog[]>
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined)

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [trackingData, setTrackingData] = useState<TrackingLog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logTracking = async (data: {
    container_number?: string
    vessel_imo?: string
    lat: number
    lng: number
    speed?: number
    heading?: string
    timestamp: string
  }): Promise<TrackingLog> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/tracking', data)
      const newLog = response.data

      setTrackingData((prev) => [newLog, ...prev])
      return newLog
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to log tracking data'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getContainerHistory = async (containerNumber: string, limit = 100): Promise<TrackingLog[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tracking/container/${containerNumber}`, {
        params: { limit },
      })
      const data = response.data

      setTrackingData(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch container history'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getVesselHistory = async (vesselImo: string, limit = 100): Promise<TrackingLog[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tracking/vessel/${vesselImo}`, {
        params: { limit },
      })
      const data = response.data

      setTrackingData(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch vessel history'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getLatestContainerPosition = async (containerNumber: string): Promise<TrackingLog> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tracking/latest/container/${containerNumber}`)
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch latest container position'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getLatestVesselPosition = async (vesselImo: string): Promise<TrackingLog> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tracking/latest/vessel/${vesselImo}`)
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch latest vessel position'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMovementHistory = async (
    identifier: string,
    startDate: string,
    endDate: string
  ): Promise<TrackingLog[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tracking/history/${identifier}`, {
        params: { startDate, endDate },
      })
      const data = response.data

      setTrackingData(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch movement history'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <TrackingContext.Provider
      value={{
        trackingData,
        loading,
        error,
        logTracking,
        getContainerHistory,
        getVesselHistory,
        getLatestContainerPosition,
        getLatestVesselPosition,
        getMovementHistory,
      }}
    >
      {children}
    </TrackingContext.Provider>
  )
}

export function useTracking() {
  const context = useContext(TrackingContext)
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider')
  }
  return context
}
