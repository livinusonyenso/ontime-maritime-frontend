import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { KnowledgeResource } from '../../types/maritime'
import { dummyKnowledgeResources } from '../../data/dummyData'

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
  resources: dummyKnowledgeResources,
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
