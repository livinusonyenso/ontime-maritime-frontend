import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { Transaction, TransactionType } from '../types'

interface TransactionsContextType {
  purchases: Transaction[]
  sales: Transaction[]
  transactions: Transaction[]
  currentTransaction: Transaction | null
  loading: boolean
  error: string | null
  createTransaction: (data: {
    buyer_id: string
    seller_id: string
    listing_id: string
    amount: number
    transaction_type: TransactionType
    payment_reference: string
  }) => Promise<Transaction>
  getMyPurchases: (skip?: number, take?: number) => Promise<Transaction[]>
  getMySales: (skip?: number, take?: number) => Promise<Transaction[]>
  getAllTransactions: (skip?: number, take?: number) => Promise<Transaction[]>
  getTransactionDetails: (id: string) => Promise<Transaction>
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [purchases, setPurchases] = useState<Transaction[]>([])
  const [sales, setSales] = useState<Transaction[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTransaction = async (data: {
    buyer_id: string
    seller_id: string
    listing_id: string
    amount: number
    transaction_type: TransactionType
    payment_reference: string
  }): Promise<Transaction> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/transactions', data)
      const newTransaction = response.data

      setTransactions((prev) => [newTransaction, ...prev])
      return newTransaction
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create transaction'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMyPurchases = async (skip = 0, take = 20): Promise<Transaction[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/transactions/my-purchases', {
        params: { skip, take },
      })
      const purchasesData = response.data

      setPurchases(purchasesData)
      return purchasesData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch purchases'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMySales = async (skip = 0, take = 20): Promise<Transaction[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/transactions/my-sales', {
        params: { skip, take },
      })
      const salesData = response.data

      setSales(salesData)
      return salesData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch sales'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAllTransactions = async (skip = 0, take = 20): Promise<Transaction[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/transactions', {
        params: { skip, take },
      })
      const transactionsData = response.data

      setTransactions(transactionsData)
      return transactionsData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch transactions'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getTransactionDetails = async (id: string): Promise<Transaction> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/transactions/${id}`)
      const transactionData = response.data

      setCurrentTransaction(transactionData)
      return transactionData
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch transaction details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        purchases,
        sales,
        transactions,
        currentTransaction,
        loading,
        error,
        createTransaction,
        getMyPurchases,
        getMySales,
        getAllTransactions,
        getTransactionDetails,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider')
  }
  return context
}
