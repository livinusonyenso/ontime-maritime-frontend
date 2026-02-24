import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { MarketplaceListing } from "@/types/maritime"
import api from "../../lib/api"
import { deepCamelize } from "../../lib/utils"

// ─── Mapping helpers ──────────────────────────────────────────────────────────

/** Maps marketplace display category → DB ListingCategory enum */
const toDbCategory = (cat: string): string => {
  const map: Record<string, string> = {
    vessel:      'ship',
    spare_parts: 'spare_part',
    equipment:   'cargo',
    warehouse:   'cargo',
    container:   'cargo',
    crane:       'cargo',
    repairs:     'service',
    insurance:   'service',
  }
  return map[cat] ?? 'cargo'
}

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchSellerListings = createAsyncThunk(
  "sellerListings/fetchMy",
  async () => {
    const res = await api.get("/listings/my")
    return deepCamelize(res.data) as MarketplaceListing[]
  }
)

export const createListing = createAsyncThunk(
  "sellerListings/create",
  async (payload: {
    title: string
    description: string
    price: number
    currency: string
    category: string          // marketplace display category
    condition: string
    images: string[]
    bolImage?: string
    location: { country: string; city: string; port?: string }
    specifications: Record<string, string>
    sellerName: string
  }, { rejectWithValue }) => {
    try {
      const body = {
        title:                payload.title,
        description:          payload.description,
        price_usd:            payload.price,
        currency:             payload.currency,
        category:             toDbCategory(payload.category),
        marketplace_category: payload.category,
        condition:            payload.condition,
        images:               payload.images,
        bol_image:            payload.bolImage || undefined,
        location:             payload.location,
        specifications:       payload.specifications,
        bol_required:         !!payload.bolImage,
        seller_name:          payload.sellerName,
        seller_rating:        0,
        availability:         'available',
        price_type:           'fixed',
      }
      const res = await api.post("/listings", body)
      return deepCamelize(res.data) as MarketplaceListing
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to create listing")
    }
  }
)

export const updateListing = createAsyncThunk(
  "sellerListings/update",
  async (payload: {
    id: string
    title: string
    description: string
    price: number
    currency: string
    category: string
    condition: string
    images: string[]
    bolImage?: string
    location: { country: string; city: string; port?: string }
    specifications: Record<string, string>
  }, { rejectWithValue }) => {
    try {
      const body = {
        title:                payload.title,
        description:          payload.description,
        price_usd:            payload.price,
        currency:             payload.currency,
        category:             toDbCategory(payload.category),
        marketplace_category: payload.category,
        condition:            payload.condition,
        images:               payload.images,
        bol_image:            payload.bolImage || undefined,
        location:             payload.location,
        specifications:       payload.specifications,
        bol_required:         !!payload.bolImage,
      }
      const res = await api.patch(`/listings/${payload.id}`, body)
      return deepCamelize(res.data) as MarketplaceListing
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to update listing")
    }
  }
)

export const deleteListing = createAsyncThunk(
  "sellerListings/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/listings/${id}`)
      return id
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Failed to delete listing")
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────────────────

interface SellerListingState {
  listings: MarketplaceListing[]
  loading: boolean
  submitting: boolean   // for create / update / delete actions
  error: string | null
}

const initialState: SellerListingState = {
  listings:   [],
  loading:    false,
  submitting: false,
  error:      null,
}

const sellerListingSlice = createSlice({
  name: "sellerListings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ── fetch ──
    builder
      .addCase(fetchSellerListings.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(fetchSellerListings.fulfilled, (state, action) => {
        state.loading  = false
        state.listings = action.payload
      })
      .addCase(fetchSellerListings.rejected, (state, action) => {
        state.loading = false
        state.error   = action.error.message ?? "Failed to load listings"
      })

    // ── create ──
    builder
      .addCase(createListing.pending, (state) => {
        state.submitting = true
        state.error      = null
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.submitting = false
        state.listings.unshift(action.payload)
      })
      .addCase(createListing.rejected, (state, action) => {
        state.submitting = false
        state.error      = action.payload as string
      })

    // ── update ──
    builder
      .addCase(updateListing.pending, (state) => {
        state.submitting = true
        state.error      = null
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.submitting = false
        const idx = state.listings.findIndex(l => l.id === action.payload.id)
        if (idx !== -1) state.listings[idx] = action.payload
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.submitting = false
        state.error      = action.payload as string
      })

    // ── delete ──
    builder
      .addCase(deleteListing.pending, (state) => {
        state.submitting = true
        state.error      = null
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.submitting = false
        state.listings   = state.listings.filter(l => l.id !== action.payload)
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.submitting = false
        state.error      = action.payload as string
      })
  },
})

export default sellerListingSlice.reducer

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectSellerListings        = (state: { sellerListings: SellerListingState }) => state.sellerListings.listings
export const selectSellerListingsLoading = (state: { sellerListings: SellerListingState }) => state.sellerListings.loading
export const selectSellerSubmitting      = (state: { sellerListings: SellerListingState }) => state.sellerListings.submitting
export const selectSellerListingsError   = (state: { sellerListings: SellerListingState }) => state.sellerListings.error
export const selectSellerListingById     = (state: { sellerListings: SellerListingState }, id: string) =>
  state.sellerListings.listings.find(l => l.id === id)
