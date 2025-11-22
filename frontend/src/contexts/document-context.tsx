
import { createContext, useContext, useState, type ReactNode } from "react"

export interface Document {
  id: string
  title: string
  type: "bill-of-lading" | "invoice" | "certificate" | "charterparty" | "insurance"
  shipmentId: string
  uploadDate: string
  status: "pending" | "approved" | "rejected"
  fileUrl: string
}

interface DocumentContextType {
  documents: Document[]
  uploadDocument: (doc: Omit<Document, "id">) => void
  getDocumentsByShipment: (shipmentId: string) => Document[]
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

// Dummy documents
const dummyDocuments: Document[] = [
  {
    id: "1",
    title: "Bill of Lading - OM-2024-001",
    type: "bill-of-lading",
    shipmentId: "1",
    uploadDate: "2024-01-15",
    status: "approved",
    fileUrl: "#",
  },
  {
    id: "2",
    title: "Commercial Invoice - OM-2024-001",
    type: "invoice",
    shipmentId: "1",
    uploadDate: "2024-01-15",
    status: "approved",
    fileUrl: "#",
  },
]

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(dummyDocuments)

  const uploadDocument = (doc: Omit<Document, "id">) => {
    const newDoc = { ...doc, id: Math.random().toString(36).substr(2, 9) }
    setDocuments((prev) => [...prev, newDoc])
  }

  const getDocumentsByShipment = (shipmentId: string) => {
    return documents.filter((doc) => doc.shipmentId === shipmentId)
  }

  return (
    <DocumentContext.Provider value={{ documents, uploadDocument, getDocumentsByShipment }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocument() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider")
  }
  return context
}
