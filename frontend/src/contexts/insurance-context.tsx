import { createContext, useContext, useState, type ReactNode } from 'react'
import api from '../lib/api'
import type { InsurancePolicy } from '../types'

interface InsuranceContextType {
  policies: InsurancePolicy[]
  currentPolicy: InsurancePolicy | null
  loading: boolean
  error: string | null
  createInsurancePolicy: (data: {
    listing_id: string
    coverage_amount: number
    premium_amount: number
    start_date: string
    end_date: string
  }) => Promise<InsurancePolicy>
  getMyPolicies: (skip?: number, take?: number) => Promise<InsurancePolicy[]>
  getPolicyDetails: (id: string) => Promise<InsurancePolicy>
  updatePolicy: (id: string, data: Partial<InsurancePolicy>) => Promise<InsurancePolicy>
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined)

export function InsuranceProvider({ children }: { children: ReactNode }) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([])
  const [currentPolicy, setCurrentPolicy] = useState<InsurancePolicy | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createInsurancePolicy = async (data: {
    listing_id: string
    coverage_amount: number
    premium_amount: number
    start_date: string
    end_date: string
  }): Promise<InsurancePolicy> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/insurance', data)
      const newPolicy = response.data

      setPolicies((prev) => [newPolicy, ...prev])
      return newPolicy
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create insurance policy'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getMyPolicies = async (skip = 0, take = 20): Promise<InsurancePolicy[]> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/insurance/my-policies', {
        params: { skip, take },
      })
      const data = response.data

      setPolicies(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch policies'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getPolicyDetails = async (id: string): Promise<InsurancePolicy> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/insurance/${id}`)
      const data = response.data

      setCurrentPolicy(data)
      return data
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch policy details'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePolicy = async (id: string, data: Partial<InsurancePolicy>): Promise<InsurancePolicy> => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.patch(`/insurance/${id}`, data)
      const updatedPolicy = response.data

      setPolicies((prev) => prev.map((policy) => (policy.id === id ? updatedPolicy : policy)))
      if (currentPolicy?.id === id) {
        setCurrentPolicy(updatedPolicy)
      }

      return updatedPolicy
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update policy'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <InsuranceContext.Provider
      value={{
        policies,
        currentPolicy,
        loading,
        error,
        createInsurancePolicy,
        getMyPolicies,
        getPolicyDetails,
        updatePolicy,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  )
}

export function useInsurance() {
  const context = useContext(InsuranceContext)
  if (context === undefined) {
    throw new Error('useInsurance must be used within an InsuranceProvider')
  }
  return context
}
