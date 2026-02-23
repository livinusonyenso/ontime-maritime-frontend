import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { LegalConsultant, LegalTemplate, LegalService, LegalResource } from '../../types/maritime'
import api from '../../lib/api'
import { deepCamelize } from '../../lib/utils'

export const fetchLegalData = createAsyncThunk('legalHub/fetchAll', async () => {
  const [consultantsRes, templatesRes, servicesRes, resourcesRes] = await Promise.all([
    api.get('/legal/consultants'),
    api.get('/legal/templates'),
    api.get('/legal/services'),
    api.get('/legal/resources'),
  ])
  return {
    consultants: deepCamelize(consultantsRes.data) as LegalConsultant[],
    templates: deepCamelize(templatesRes.data) as LegalTemplate[],
    services: deepCamelize(servicesRes.data) as LegalService[],
    resources: deepCamelize(resourcesRes.data) as LegalResource[],
  }
})

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
  consultants: [],
  templates: [],
  services: [],
  resources: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchLegalData.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchLegalData.fulfilled, (state, action) => {
        state.loading = false
        state.consultants = action.payload.consultants
        state.templates = action.payload.templates
        state.services = action.payload.services
        state.resources = action.payload.resources
      })
      .addCase(fetchLegalData.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to load legal data' })
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
