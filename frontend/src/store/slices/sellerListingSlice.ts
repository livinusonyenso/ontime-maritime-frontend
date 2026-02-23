import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { MarketplaceListing } from "@/types/maritime"
import api from "../../lib/api"
import { deepCamelize } from "../../lib/utils"

export const fetchSellerListings = createAsyncThunk("sellerListings/fetchMy", async () => {
  const res = await api.get("/listings/my")
  return deepCamelize(res.data) as MarketplaceListing[]
})

interface SellerListingState {
  listings: MarketplaceListing[]
  loading: boolean
  error: string | null
}

const initialState: SellerListingState = {
  listings: [],
  loading: false,
  error: null,
}

const sellerListingSlice = createSlice({
  name: "sellerListings",
  initialState,
  reducers: {
    addSellerListing: (state, action: PayloadAction<MarketplaceListing>) => {
      state.listings.unshift(action.payload)
    },
    updateSellerListing: (state, action: PayloadAction<{ id: string; updates: Partial<MarketplaceListing> }>) => {
      const { id, updates } = action.payload
      const index = state.listings.findIndex((l) => l.id === id)
      if (index !== -1) {
        state.listings[index] = { ...state.listings[index], ...updates }
      }
    },
    deleteSellerListing: (state, action: PayloadAction<string>) => {
      state.listings = state.listings.filter((l) => l.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerListings.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchSellerListings.fulfilled, (state, action) => { state.loading = false; state.listings = action.payload })
      .addCase(fetchSellerListings.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Failed to load seller listings" })
  },
})

export const {
  addSellerListing,
  updateSellerListing,
  deleteSellerListing,
} = sellerListingSlice.actions

// Selectors
export const selectSellerListings = (state: { sellerListings: SellerListingState }) => state.sellerListings.listings
export const selectSellerListingsLoading = (state: { sellerListings: SellerListingState }) => state.sellerListings.loading
export const selectSellerListingsError = (state: { sellerListings: SellerListingState }) => state.sellerListings.error
export const selectSellerListingById = (state: { sellerListings: SellerListingState }, id: string) =>
  state.sellerListings.listings.find((l) => l.id === id)

export default sellerListingSlice.reducer
