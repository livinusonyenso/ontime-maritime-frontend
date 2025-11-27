import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BillOfLading, ShippingQuoteRequest, ShippingQuote } from '../../types/maritime'
import { dummyBillsOfLading, dummyShippingQuotes } from '../../data/dummyData'

interface BillOfLadingState {
  billsOfLading: BillOfLading[]
  selectedBol: BillOfLading | null
  quoteRequests: ShippingQuoteRequest[]
  loading: boolean
  error: string | null
  validationInProgress: boolean
}

const initialState: BillOfLadingState = {
  billsOfLading: dummyBillsOfLading,
  selectedBol: null,
  quoteRequests: dummyShippingQuotes,
  loading: false,
  error: null,
  validationInProgress: false,
}

const billOfLadingSlice = createSlice({
  name: 'billOfLading',
  initialState,
  reducers: {
    setBillsOfLading: (state, action: PayloadAction<BillOfLading[]>) => {
      state.billsOfLading = action.payload
    },
    addBillOfLading: (state, action: PayloadAction<Omit<BillOfLading, 'id' | 'bolNumber' | 'blockchainHash' | 'createdAt' | 'updatedAt' | 'fee'>>) => {
      const newBol: BillOfLading = {
        ...action.payload,
        id: `bol${Date.now()}`,
        bolNumber: `OTM-BOL-${new Date().getFullYear()}-${String(state.billsOfLading.length + 1).padStart(6, '0')}`,
        blockchainHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fee: 50,
      }
      state.billsOfLading.unshift(newBol)
    },
    updateBillOfLading: (state, action: PayloadAction<{ id: string; updates: Partial<BillOfLading> }>) => {
      const index = state.billsOfLading.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.billsOfLading[index] = {
          ...state.billsOfLading[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        }
      }
    },
    selectBol: (state, action: PayloadAction<string>) => {
      state.selectedBol = state.billsOfLading.find(b => b.id === action.payload) || null
    },
    clearSelectedBol: (state) => {
      state.selectedBol = null
    },
    validateBol: (state, action: PayloadAction<string>) => {
      const bol = state.billsOfLading.find(b => b.id === action.payload)
      if (bol) {
        // Simulate validation
        bol.validationStatus = 'valid'
        bol.validationNotes = [
          'Blockchain hash verified',
          'Shipper details confirmed',
          'Container seal number matches',
          'No duplicate detected',
        ]
        bol.status = 'verified'
        bol.updatedAt = new Date().toISOString()
      }
    },
    addQuoteRequest: (state, action: PayloadAction<Omit<ShippingQuoteRequest, 'id' | 'status' | 'quotes'>>) => {
      const newRequest: ShippingQuoteRequest = {
        ...action.payload,
        id: `sq${Date.now()}`,
        status: 'pending',
        quotes: [],
      }
      state.quoteRequests.unshift(newRequest)
    },
    addQuoteToRequest: (state, action: PayloadAction<{ requestId: string; quote: Omit<ShippingQuote, 'id' | 'requestId'> }>) => {
      const request = state.quoteRequests.find(r => r.id === action.payload.requestId)
      if (request) {
        const newQuote: ShippingQuote = {
          ...action.payload.quote,
          id: `q${Date.now()}`,
          requestId: request.id,
        }
        request.quotes.push(newQuote)
        request.status = 'quoted'
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setValidationInProgress: (state, action: PayloadAction<boolean>) => {
      state.validationInProgress = action.payload
    },
  },
})

export const {
  setBillsOfLading,
  addBillOfLading,
  updateBillOfLading,
  selectBol,
  clearSelectedBol,
  validateBol,
  addQuoteRequest,
  addQuoteToRequest,
  setLoading,
  setError,
  setValidationInProgress,
} = billOfLadingSlice.actions

export default billOfLadingSlice.reducer
