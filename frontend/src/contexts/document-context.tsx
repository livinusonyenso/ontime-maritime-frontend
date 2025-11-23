import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Document, DocumentType } from '../types'

interface DocumentContextType {
  documents: Document[]
  loading: boolean
  error: string | null
  createDocument: (data: {
    type: DocumentType
    file_url: string
    transaction_id?: string
    listing_id?: string
  }) => Promise<Document>
  getDocument: (id: string) => Promise<Document>
  getListingDocuments: (listingId: string) => Promise<Document[]>
  getTransactionDocuments: (transactionId: string) => Promise<Document[]>
  verifyDocument: (id: string) => Promise<{ valid: boolean; document: Document }>
  revokeDocument: (id: string) => Promise<Document>
  generateBillOfLading: (transactionId: string) => Promise<Document>
  generateInvoice: (transactionId: string) => Promise<Document>
  generatePackingList: (transactionId: string) => Promise<Document>
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createDocument = async (data: {
    type: DocumentType
    file_url: string
    transaction_id?: string
    listing_id?: string
  }): Promise<Document> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/documents', data)
      const newDocument = response.data

      setDocuments((prev) => [newDocument, ...prev])
      return newDocument
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create document'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getDocument = async (id: string): Promise<Document> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/documents/${id}`)
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch document'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getListingDocuments = async (listingId: string): Promise<Document[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/documents/listing/${listingId}`)
      const data = response.data

      setDocuments(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch listing documents'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getTransactionDocuments = async (transactionId: string): Promise<Document[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/documents/transaction/${transactionId}`)
      const data = response.data

      setDocuments(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch transaction documents'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const verifyDocument = async (id: string): Promise<{ valid: boolean; document: Document }> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/documents/${id}/verify`)
      const data = response.data

      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to verify document'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const revokeDocument = async (id: string): Promise<Document> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post(`/documents/${id}/revoke`)
      const revokedDocument = response.data

      setDocuments((prev) => prev.map((doc) => (doc.id === id ? revokedDocument : doc)))
      return revokedDocument
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to revoke document'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const generateBillOfLading = async (transactionId: string): Promise<Document> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/documents/generate/bill-of-lading', { transactionId })
      const newDocument = response.data

      setDocuments((prev) => [newDocument, ...prev])
      return newDocument
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate bill of lading'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const generateInvoice = async (transactionId: string): Promise<Document> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/documents/generate/invoice', { transactionId })
      const newDocument = response.data

      setDocuments((prev) => [newDocument, ...prev])
      return newDocument
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate invoice'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const generatePackingList = async (transactionId: string): Promise<Document> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/documents/generate/packing-list', { transactionId })
      const newDocument = response.data

      setDocuments((prev) => [newDocument, ...prev])
      return newDocument
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate packing list'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <DocumentContext.Provider
      value={{
        documents,
        loading,
        error,
        createDocument,
        getDocument,
        getListingDocuments,
        getTransactionDocuments,
        verifyDocument,
        revokeDocument,
        generateBillOfLading,
        generateInvoice,
        generatePackingList,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocument() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider')
  }
  return context
}
