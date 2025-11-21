"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Auction {
  id: string
  title: string
  description: string
  vessel: string
  route: string
  cargo: string
  capacity: string
  currentBid: number
  minimumBid: number
  endTime: string
  bidders: number
  image: string
}

interface AuctionContextType {
  auctions: Auction[]
  placeBid: (auctionId: string, amount: number) => void
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined)

// Dummy auction data
const dummyAuctions: Auction[] = [
  {
    id: "1",
    title: "Container Slot - Shanghai to LA",
    description: "20ft container slot on premium vessel",
    vessel: "MSC Gulsun",
    route: "Shanghai → Los Angeles",
    cargo: "General Cargo",
    capacity: "20ft Container",
    currentBid: 2500,
    minimumBid: 2000,
    endTime: "2024-02-15T23:59:59",
    bidders: 8,
    image: "/cargo-ship-at-sea.jpg",
  },
  {
    id: "2",
    title: "Bulk Cargo Charter - Rotterdam to Lagos",
    description: "Full vessel charter for bulk cargo",
    vessel: "Ever Given",
    route: "Rotterdam → Lagos",
    cargo: "Bulk Cargo",
    capacity: "50,000 MT",
    currentBid: 125000,
    minimumBid: 100000,
    endTime: "2024-02-20T23:59:59",
    bidders: 5,
    image: "/bulk-cargo-ship.jpg",
  },
]

export function AuctionProvider({ children }: { children: ReactNode }) {
  const [auctions, setAuctions] = useState<Auction[]>(dummyAuctions)

  const placeBid = (auctionId: string, amount: number) => {
    setAuctions((prev) =>
      prev.map((auction) =>
        auction.id === auctionId ? { ...auction, currentBid: amount, bidders: auction.bidders + 1 } : auction,
      ),
    )
  }

  return <AuctionContext.Provider value={{ auctions, placeBid }}>{children}</AuctionContext.Provider>
}

export function useAuction() {
  const context = useContext(AuctionContext)
  if (context === undefined) {
    throw new Error("useAuction must be used within an AuctionProvider")
  }
  return context
}
