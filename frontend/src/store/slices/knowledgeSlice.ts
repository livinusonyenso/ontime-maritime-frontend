import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { KnowledgeResource } from '../../types/maritime'
import api from '../../lib/api'
import { deepCamelize } from '../../lib/utils'

export const fetchKnowledgeResources = createAsyncThunk('knowledge/fetchAll', async () => {
  const res = await api.get('/knowledge')
  return deepCamelize(res.data) as KnowledgeResource[]
})

interface KnowledgeState {
  resources: KnowledgeResource[]
  selectedResource: KnowledgeResource | null
  filterCategory: string
  filterType: string
  searchQuery: string
  loading: boolean
  error: string | null
}

const initialState: KnowledgeState = {
  resources: [],
  selectedResource: null,
  filterCategory: 'all',
  filterType: 'all',
  searchQuery: '',
  loading: false,
  error: null,
}

const knowledgeSlice = createSlice({
  name: 'knowledge',
  initialState,
  reducers: {
    setResources: (state, action: PayloadAction<KnowledgeResource[]>) => {
      state.resources = action.payload
    },
    selectResource: (state, action: PayloadAction<string>) => {
      state.selectedResource = state.resources.find(r => r.id === action.payload) || null
    },
    clearSelectedResource: (state) => {
      state.selectedResource = null
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload
    },
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
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
      .addCase(fetchKnowledgeResources.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchKnowledgeResources.fulfilled, (state, action) => { state.loading = false; state.resources = action.payload })
      .addCase(fetchKnowledgeResources.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to load resources' })
  },
})

export const {
  setResources,
  selectResource,
  clearSelectedResource,
  setFilterCategory,
  setFilterType,
  setSearchQuery,
  setLoading,
  setError,
} = knowledgeSlice.actions

export default knowledgeSlice.reducer
