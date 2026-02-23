import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Vessel } from '../../types/maritime'
import api from '../../lib/api'
import { deepCamelize } from '../../lib/utils'

export const fetchVessels = createAsyncThunk('vesselTracking/fetchAll', async () => {
  const res = await api.get('/vessels')
  return deepCamelize(res.data) as Vessel[]
})

interface VesselTrackingState {
  vessels: Vessel[]
  selectedVessel: Vessel | null
  searchQuery: string
  loading: boolean
  error: string | null
}

const initialState: VesselTrackingState = {
  vessels: [],
  selectedVessel: null,
  searchQuery: '',
  loading: false,
  error: null,
}

const vesselTrackingSlice = createSlice({
  name: 'vesselTracking',
  initialState,
  reducers: {
    setVessels: (state, action: PayloadAction<Vessel[]>) => {
      state.vessels = action.payload
    },
    selectVessel: (state, action: PayloadAction<string>) => {
      state.selectedVessel = state.vessels.find(v => v.id === action.payload) || null
    },
    clearSelectedVessel: (state) => {
      state.selectedVessel = null
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    updateVesselPosition: (state, action: PayloadAction<{ id: string; lat: number; lng: number; speed: number }>) => {
      const vessel = state.vessels.find(v => v.id === action.payload.id)
      if (vessel) {
        vessel.lat = action.payload.lat
        vessel.lng = action.payload.lng
        vessel.speed = action.payload.speed
        vessel.lastUpdate = new Date().toISOString()
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
      .addCase(fetchVessels.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchVessels.fulfilled, (state, action) => { state.loading = false; state.vessels = action.payload })
      .addCase(fetchVessels.rejected, (state, action) => { state.loading = false; state.error = action.error.message || 'Failed to load vessels' })
  },
})

export const {
  setVessels,
  selectVessel,
  clearSelectedVessel,
  setSearchQuery,
  updateVesselPosition,
  setLoading,
  setError,
} = vesselTrackingSlice.actions

export default vesselTrackingSlice.reducer
