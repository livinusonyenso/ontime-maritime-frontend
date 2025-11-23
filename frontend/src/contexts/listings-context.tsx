import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Listing, ListingCategory } from '../types'

interface ListingsContextType {
  listings: Listing[]
  currentListing: Listing | null
  loading: boolean
  error: string | null
  createListing: (data: Omit<Listing, 'id' | 'seller_id' | 'status' | 'created_at' | 'updated_at'>) => Promise<Listing>
  getAllListings: (skip?: number, take?: number) => Promise<Listing[]>
  searchListings: (query: string, skip?: number, take?: number) => Promise<Listing[]>
  getListingsByCategory: (category: ListingCategory, skip?: number, take?: number) => Promise<Listing[]>
  getListingDetails: (id: string) => Promise<Listing>
  updateListing: (id: string, data: Partial<Listing>) => Promise<Listing>
  deleteListing: (id: string) => Promise<void>
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined)

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([])
  const [currentListing, setCurrentListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createListing = async (
    data: Omit<Listing, 'id' | 'seller_id' | 'status' | 'created_at' | 'updated_at'>
  ): Promise<Listing> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/listings', data)
      const newListing = response.data

      setListings((prev) => [newListing, ...prev])
      return newListing
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create listing'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAllListings = async (skip = 0, take = 20): Promise<Listing[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/listings', {
        params: { skip, take },
      })
      const listingsData = response.data

      setListings(listingsData)
      return listingsData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch listings'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const searchListings = async (query: string, skip = 0, take = 20): Promise<Listing[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/listings/search', {
        params: { q: query, skip, take },
      })
      const listingsData = response.data

      setListings(listingsData)
      return listingsData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to search listings'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getListingsByCategory = async (
    category: ListingCategory,
    skip = 0,
    take = 20
  ): Promise<Listing[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/listings/category/${category}`, {
        params: { skip, take },
      })
      const listingsData = response.data

      setListings(listingsData)
      return listingsData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch listings by category'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getListingDetails = async (id: string): Promise<Listing> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/listings/${id}`)
      const listingData = response.data

      setCurrentListing(listingData)
      return listingData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch listing details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateListing = async (id: string, data: Partial<Listing>): Promise<Listing> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch(`/listings/${id}`, data)
      const updatedListing = response.data

      setListings((prev) => prev.map((listing) => (listing.id === id ? updatedListing : listing)))
      if (currentListing?.id === id) {
        setCurrentListing(updatedListing)
      }
      return updatedListing
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update listing'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteListing = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      await api.delete(`/listings/${id}`)

      setListings((prev) => prev.filter((listing) => listing.id !== id))
      if (currentListing?.id === id) {
        setCurrentListing(null)
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete listing'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <ListingsContext.Provider
      value={{
        listings,
        currentListing,
        loading,
        error,
        createListing,
        getAllListings,
        searchListings,
        getListingsByCategory,
        getListingDetails,
        updateListing,
        deleteListing,
      }}
    >
      {children}
    </ListingsContext.Provider>
  )
}

export function useListings() {
  const context = useContext(ListingsContext)
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider')
  }
  return context
}
