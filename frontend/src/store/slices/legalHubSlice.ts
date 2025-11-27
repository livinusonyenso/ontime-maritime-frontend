import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LegalConsultant, LegalTemplate, LegalService, LegalResource } from '../../types/maritime'
import { dummyLegalConsultants, dummyLegalTemplates, dummyLegalServices, dummyLegalResources } from '../../data/dummyData'

interface LegalHubState {
  consultants: LegalConsultant[]
  templates: LegalTemplate[]
  services: LegalService[]
  resources: LegalResource[]
  selectedConsultant: LegalConsultant | null
  searchQuery: string
  filterCategory: string
  loading: boolean
  error: string | null
}

const initialState: LegalHubState = {
  consultants: dummyLegalConsultants,
  templates: dummyLegalTemplates,
  services: dummyLegalServices,
  resources: dummyLegalResources,
  selectedConsultant: null,
  searchQuery: '',
  filterCategory: 'all',
  loading: false,
  error: null,
}

const legalHubSlice = createSlice({
  name: 'legalHub',
  initialState,
  reducers: {
    setConsultants: (state, action: PayloadAction<LegalConsultant[]>) => {
      state.consultants = action.payload
    },
    selectConsultant: (state, action: PayloadAction<string>) => {
      state.selectedConsultant = state.consultants.find(c => c.id === action.payload) || null
    },
    clearSelectedConsultant: (state) => {
      state.selectedConsultant = null
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload
    },
    incrementTemplateDownloads: (state, action: PayloadAction<string>) => {
      const template = state.templates.find(t => t.id === action.payload)
      if (template) {
        template.downloads += 1
      }
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
  setConsultants,
  selectConsultant,
  clearSelectedConsultant,
  setSearchQuery,
  setFilterCategory,
  incrementTemplateDownloads,
  setLoading,
  setError,
} = legalHubSlice.actions

export default legalHubSlice.reducer
