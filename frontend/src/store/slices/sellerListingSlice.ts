import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MarketplaceListing } from "@/types/maritime"

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
    getSellerListingsStart: (state) => {
      state.loading = true
      state.error = null
    },
    getSellerListingsSuccess: (state, action: PayloadAction<MarketplaceListing[]>) => {
      state.listings = action.payload
      state.loading = false
    },
    getSellerListingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
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
})

export const {
  getSellerListingsStart,
  getSellerListingsSuccess,
  getSellerListingsFailure,
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
