
import { createContext, useContext, useState, type ReactNode } from "react"

export interface Shipment {
  id: string
  trackingNumber: string
  origin: string
  destination: string
  status: "in-transit" | "delivered" | "pending" | "customs"
  vessel: string
  departureDate: string
  estimatedArrival: string
  currentLocation: string
  progress: number
}

interface TrackingContextType {
  shipments: Shipment[]
  searchShipment: (trackingNumber: string) => Shipment | undefined
  addShipment: (shipment: Shipment) => void
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined)

// Dummy shipment data
const dummyShipments: Shipment[] = [
  {
    id: "1",
    trackingNumber: "OM-2024-001",
    origin: "Shanghai, China",
    destination: "Los Angeles, USA",
    status: "in-transit",
    vessel: "MSC Gulsun",
    departureDate: "2024-01-15",
    estimatedArrival: "2024-02-05",
    currentLocation: "Pacific Ocean",
    progress: 65,
  },
  {
    id: "2",
    trackingNumber: "OM-2024-002",
    origin: "Rotterdam, Netherlands",
    destination: "Lagos, Nigeria",
    status: "customs",
    vessel: "Ever Given",
    departureDate: "2024-01-20",
    estimatedArrival: "2024-02-10",
    currentLocation: "Lagos Port",
    progress: 95,
  },
]

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>(dummyShipments)

  const searchShipment = (trackingNumber: string) => {
    return shipments.find((s) => s.trackingNumber.toLowerCase().includes(trackingNumber.toLowerCase()))
  }

  const addShipment = (shipment: Shipment) => {
    setShipments((prev) => [...prev, shipment])
  }

  return (
    <TrackingContext.Provider value={{ shipments, searchShipment, addShipment }}>{children}</TrackingContext.Provider>
  )
}

export function useTracking() {
  const context = useContext(TrackingContext)
  if (context === undefined) {
    throw new Error("useTracking must be used within a TrackingProvider")
  }
  return context
}
