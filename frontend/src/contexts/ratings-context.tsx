import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Rating } from '../types'

interface RatingsContextType {
  ratings: Rating[]
  averageRating: number
  ratingCount: number
  loading: boolean
  error: string | null
  createRating: (data: {
    user_id: string
    rater_id: string
    score: number
    comment?: string
  }) => Promise<Rating>
  getRatingsForUser: (userId: string, skip?: number, take?: number) => Promise<Rating[]>
  getAverageRating: (userId: string) => Promise<number>
  getRatingCount: (userId: string) => Promise<number>
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined)

export function RatingsProvider({ children }: { children: ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createRating = async (data: {
    user_id: string
    rater_id: string
    score: number
    comment?: string
  }): Promise<Rating> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/ratings', data)
      const newRating = response.data

      setRatings((prev) => [newRating, ...prev])
      return newRating
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create rating'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getRatingsForUser = async (userId: string, skip = 0, take = 20): Promise<Rating[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/ratings/user/${userId}`, {
        params: { skip, take },
      })
      const data = response.data

      setRatings(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch ratings'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAverageRating = async (userId: string): Promise<number> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/ratings/user/${userId}/average`)
      const average = response.data

      setAverageRating(average)
      return average
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch average rating'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getRatingCount = async (userId: string): Promise<number> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/ratings/user/${userId}/count`)
      const count = response.data

      setRatingCount(count)
      return count
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch rating count'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <RatingsContext.Provider
      value={{
        ratings,
        averageRating,
        ratingCount,
        loading,
        error,
        createRating,
        getRatingsForUser,
        getAverageRating,
        getRatingCount,
      }}
    >
      {children}
    </RatingsContext.Provider>
  )
}

export function useRatings() {
  const context = useContext(RatingsContext)
  if (context === undefined) {
    throw new Error('useRatings must be used within a RatingsProvider')
  }
  return context
}
