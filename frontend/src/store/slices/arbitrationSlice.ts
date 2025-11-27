import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { DisputeCase } from '../../types/maritime'
import { dummyDisputeCases } from '../../data/dummyData'

interface ArbitrationState {
  disputes: DisputeCase[]
  selectedDispute: DisputeCase | null
  aiAnalysisInProgress: boolean
  loading: boolean
  error: string | null
}

const initialState: ArbitrationState = {
  disputes: dummyDisputeCases,
  selectedDispute: null,
  aiAnalysisInProgress: false,
  loading: false,
  error: null,
}

const arbitrationSlice = createSlice({
  name: 'arbitration',
  initialState,
  reducers: {
    setDisputes: (state, action: PayloadAction<DisputeCase[]>) => {
      state.disputes = action.payload
    },
    addDispute: (state, action: PayloadAction<Omit<DisputeCase, 'id' | 'caseNumber' | 'status' | 'createdAt' | 'updatedAt'>>) => {
      const newDispute: DisputeCase = {
        ...action.payload,
        id: `dc${Date.now()}`,
        caseNumber: `ARB-${new Date().getFullYear()}-${String(state.disputes.length + 1).padStart(5, '0')}`,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.disputes.unshift(newDispute)
    },
    selectDispute: (state, action: PayloadAction<string>) => {
      state.selectedDispute = state.disputes.find(d => d.id === action.payload) || null
    },
    clearSelectedDispute: (state) => {
      state.selectedDispute = null
    },
    runAiAnalysis: (state, action: PayloadAction<string>) => {
      const dispute = state.disputes.find(d => d.id === action.payload)
      if (dispute) {
        dispute.status = 'ai_analysis'
        dispute.updatedAt = new Date().toISOString()
        
        // Simulate AI analysis results
        setTimeout(() => {
          dispute.aiAnalysis = {
            breachEvaluation: `Based on comprehensive analysis of the submitted evidence, ${dispute.type === 'cargo_damage' ? 'there appears to be a clear breach of duty to deliver goods in agreed condition.' : 'the claim requires further documentation to establish liability.'}`,
            liabilityScore: Math.floor(Math.random() * 40) + 50,
            riskScore: Math.floor(Math.random() * 50) + 30,
            settlementRecommendation: `Recommend settlement at ${Math.floor(Math.random() * 30) + 60}% of claimed amount based on comparative analysis.`,
            deviationReport: 'Route analysis indicates standard transit path was followed with minor weather-related adjustments.',
            confidenceLevel: Math.floor(Math.random() * 20) + 75,
            analyzedAt: new Date().toISOString(),
          }
          dispute.status = 'under_review'
        }, 2000)
      }
    },
    updateDisputeStatus: (state, action: PayloadAction<{ id: string; status: DisputeCase['status'] }>) => {
      const dispute = state.disputes.find(d => d.id === action.payload.id)
      if (dispute) {
        dispute.status = action.payload.status
        dispute.updatedAt = new Date().toISOString()
      }
    },
    resolveDispute: (state, action: PayloadAction<{ id: string; outcome: string; settlementAmount: number; terms: string }>) => {
      const dispute = state.disputes.find(d => d.id === action.payload.id)
      if (dispute) {
        dispute.status = 'resolved'
        dispute.resolution = {
          outcome: action.payload.outcome,
          settlementAmount: action.payload.settlementAmount,
          terms: action.payload.terms,
          resolvedAt: new Date().toISOString(),
        }
        dispute.updatedAt = new Date().toISOString()
      }
    },
    setAiAnalysisInProgress: (state, action: PayloadAction<boolean>) => {
      state.aiAnalysisInProgress = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setDisputes,
  addDispute,
  selectDispute,
  clearSelectedDispute,
  runAiAnalysis,
  updateDisputeStatus,
  resolveDispute,
  setAiAnalysisInProgress,
  setLoading,
  setError,
} = arbitrationSlice.actions

export default arbitrationSlice.reducer
