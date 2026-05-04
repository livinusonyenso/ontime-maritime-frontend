import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Auction, Bid } from '../types'

interface AuctionContextType {
  auctions: Auction[]
  currentAuction: Auction | null
  bids: Bid[]
  loading: boolean
  error: string | null
  createAuction: (data: {
    listing_id: string
    starting_price: number
    reserve_price: number
    start_time: string
    end_time: string
  }) => Promise<Auction>
  getActiveAuctions: (skip?: number, take?: number) => Promise<Auction[]>
  getAuctionDetails: (id: string) => Promise<Auction>
  getBidHistory: (id: string) => Promise<Bid[]>
  placeBid: (id: string, amount: number) => Promise<Bid>
  endAuction: (id: string) => Promise<Auction>
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined)

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [currentAuction, setCurrentAuction] = useState<Auction | null>(null)
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createAuction = async (data: {
    listing_id: string
    starting_price: number
    reserve_price: number
    start_time: string
    end_time: string
  }): Promise<Auction> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/auctions', data)
      const newAuction = response.data

      setAuctions((prev) => [newAuction, ...prev])
      return newAuction
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create auction'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getActiveAuctions = async (skip = 0, take = 20): Promise<Auction[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/auctions', {
        params: { skip, take },
      })
      const auctionsData = response.data

      setAuctions(auctionsData)
      return auctionsData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch auctions'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAuctionDetails = async (id: string): Promise<Auction> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/auctions/${id}`)
      const auctionData = response.data

      setCurrentAuction(auctionData)
      return auctionData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch auction details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getBidHistory = async (id: string): Promise<Bid[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/auctions/${id}/bids`)
      const bidsData = response.data

      setBids(bidsData)
      return bidsData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch bid history'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const placeBid = async (id: string, amount: number): Promise<Bid> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/auctions/${id}/bid`, { amount })
      const newBid = response.data

      setBids((prev) => [newBid, ...prev])
      
      // Update current auction's current_price
      if (currentAuction?.id === id) {
        setCurrentAuction({ ...currentAuction, current_price: amount })
      }
      
      return newBid
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to place bid'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const endAuction = async (id: string): Promise<Auction> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/auctions/${id}/end`)
      const endedAuction = response.data

      setAuctions((prev) => prev.map((auction) => (auction.id === id ? endedAuction : auction)))
      if (currentAuction?.id === id) {
        setCurrentAuction(endedAuction)
      }
      
      return endedAuction
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to end auction'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        currentAuction,
        bids,
        loading,
        error,
        createAuction,
        getActiveAuctions,
        getAuctionDetails,
        getBidHistory,
        placeBid,
        endAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  )
}

export function useAuction() {
  const context = useContext(AuctionContext)
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider')
  }
  return context
}
