import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { MarketplaceListing, SellerProfile, PurchaseRequest } from "../../types/maritime"
import api from "../../lib/api"
import { deepCamelize } from "../../lib/utils"

// ─── Filter params ────────────────────────────────────────────────────────────

export interface MarketplaceFilters {
  search?:    string
  category?:  string
  minPrice?:  number
  maxPrice?:  number
  condition?: string
  sort?:      "newest" | "price_asc" | "price_desc" | "featured"
  skip?:      number
  take?:      number
}

// ─── Thunks ───────────────────────────────────────────────────────────────────

function cleanParams(params: MarketplaceFilters) {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
  )
}

/** Fetch (replace list) — called on mount or filter change */
export const fetchListings = createAsyncThunk(
  "marketplace/fetchListings",
  async (params: MarketplaceFilters = {}) => {
    const res  = await api.get("/marketplace/listings", { params: cleanParams(params) })
    const body = res.data as { data: any[]; total: number; skip: number; take: number; hasMore: boolean }
    return {
      listings: deepCamelize(body.data) as MarketplaceListing[],
      total:    body.total,
      skip:     body.skip,
      take:     body.take,
      hasMore:  body.hasMore,
    }
  }
)

/** Append next page — called on "Load More" */
export const fetchMoreListings = createAsyncThunk(
  "marketplace/fetchMore",
  async (params: MarketplaceFilters = {}) => {
    const res  = await api.get("/marketplace/listings", { params: cleanParams(params) })
    const body = res.data as { data: any[]; total: number; skip: number; take: number; hasMore: boolean }
    return {
      listings: deepCamelize(body.data) as MarketplaceListing[],
      total:    body.total,
      skip:     body.skip,
      take:     body.take,
      hasMore:  body.hasMore,
    }
  }
)

/** Fetch single listing detail — includes bol_image for the unlock modal */
export const fetchListingDetail = createAsyncThunk(
  "marketplace/fetchDetail",
  async (id: string) => {
    const res = await api.get(`/marketplace/listings/${id}`)
    return deepCamelize(res.data) as MarketplaceListing
  }
)

// ─── State ────────────────────────────────────────────────────────────────────

interface MarketplaceState {
  listings:               MarketplaceListing[]
  selectedListing:        MarketplaceListing | null
  sellerProfiles:         SellerProfile[]
  purchaseRequests:       PurchaseRequest[]
  filterCategory:         string
  filterLocation:         string
  searchQuery:            string
  sortBy:                 "newest" | "price_low" | "price_high" | "rating"
  total:                  number
  hasMore:                boolean
  loading:                boolean
  loadingMore:            boolean
  loadingDetail:          boolean
  error:                  string | null
  verificationInProgress: boolean
  unlockedBols:           Record<string, string[]>
}

const initialState: MarketplaceState = {
  listings:               [],
  selectedListing:        null,
  sellerProfiles:         [],
  purchaseRequests:       [],
  filterCategory:         "all",
  filterLocation:         "all",
  searchQuery:            "",
  sortBy:                 "newest",
  total:                  0,
  hasMore:                false,
  loading:                false,
  loadingMore:            false,
  loadingDetail:          false,
  error:                  null,
  verificationInProgress: false,
  unlockedBols:           {},
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setFilterCategory:  (state, action: PayloadAction<string>) => { state.filterCategory = action.payload },
    setFilterLocation:  (state, action: PayloadAction<string>) => { state.filterLocation  = action.payload },
    setSearchQuery:     (state, action: PayloadAction<string>) => { state.searchQuery     = action.payload },
    setSortBy: (state, action: PayloadAction<MarketplaceState["sortBy"]>) => { state.sortBy = action.payload },
    clearSelectedListing: (state) => { state.selectedListing = null },

    unlockBol: (state, action: PayloadAction<{ userId: string; listingId: string }>) => {
      const { userId, listingId } = action.payload
      if (!state.unlockedBols[userId]) state.unlockedBols[userId] = []
      if (!state.unlockedBols[userId].includes(listingId)) state.unlockedBols[userId].push(listingId)
    },

    // Legacy local mutations kept for backward-compat
    addListing: (state, action: PayloadAction<MarketplaceListing>) => { state.listings.unshift(action.payload) },
    deleteListing: (state, action: PayloadAction<string>) => {
      state.listings = state.listings.filter(l => l.id !== action.payload)
    },
    updateListing: (state, action: PayloadAction<{ id: string; updates: Partial<MarketplaceListing> }>) => {
      const idx = state.listings.findIndex(l => l.id === action.payload.id)
      if (idx !== -1) state.listings[idx] = { ...state.listings[idx], ...action.payload.updates }
    },
    addPurchaseRequest: (state, action: PayloadAction<PurchaseRequest>) => {
      state.purchaseRequests.unshift(action.payload)
    },
    setLoading:                (state, action: PayloadAction<boolean>) => { state.loading = action.payload },
    setError:                  (state, action: PayloadAction<string | null>) => { state.error = action.payload },
    setVerificationInProgress: (state, action: PayloadAction<boolean>) => { state.verificationInProgress = action.payload },
    selectSeller: (_state, _action: PayloadAction<string>) => { /* noop – for compat */ },
    clearSelectedSeller: (_state) => { /* noop */ },
    addSellerProfile: (state, action: PayloadAction<SellerProfile>) => { state.sellerProfiles.push(action.payload) },
    updateSeller: (state, action: PayloadAction<{ id: string; updates: Partial<SellerProfile> }>) => {
      const idx = state.sellerProfiles.findIndex(s => s.id === action.payload.id)
      if (idx !== -1) state.sellerProfiles[idx] = { ...state.sellerProfiles[idx], ...action.payload.updates }
    },
    deleteSeller: (state, action: PayloadAction<string>) => {
      state.sellerProfiles = state.sellerProfiles.filter(s => s.id !== action.payload)
    },
    selectListing: (state, action: PayloadAction<string>) => {
      state.selectedListing = state.listings.find(l => l.id === action.payload) ?? null
    },
    verifyPurchaseRequest: (_state, _action: PayloadAction<string>) => { /* noop */ },
    updatePurchaseRequestStatus: (state, action: PayloadAction<{ id: string; status: PurchaseRequest["status"] }>) => {
      const req = state.purchaseRequests.find(r => r.id === action.payload.id)
      if (req) req.status = action.payload.status
    },
  },
  extraReducers: (builder) => {
    // fetchListings — replace list
    builder
      .addCase(fetchListings.pending,   (state) => { state.loading = true; state.error = null })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading  = false
        state.listings = action.payload.listings
        state.total    = action.payload.total
        state.hasMore  = action.payload.hasMore
      })
      .addCase(fetchListings.rejected,  (state, action) => {
        state.loading = false
        state.error   = action.error.message ?? "Failed to load listings"
      })

    // fetchMoreListings — append
    builder
      .addCase(fetchMoreListings.pending,   (state) => { state.loadingMore = true })
      .addCase(fetchMoreListings.fulfilled, (state, action) => {
        state.loadingMore = false
        state.listings    = [...state.listings, ...action.payload.listings]
        state.total       = action.payload.total
        state.hasMore     = action.payload.hasMore
      })
      .addCase(fetchMoreListings.rejected,  (state) => { state.loadingMore = false })

    // fetchListingDetail
    builder
      .addCase(fetchListingDetail.pending,   (state) => { state.loadingDetail = true })
      .addCase(fetchListingDetail.fulfilled, (state, action) => {
        state.loadingDetail   = false
        state.selectedListing = action.payload
      })
      .addCase(fetchListingDetail.rejected,  (state) => { state.loadingDetail = false })
  },
})

export const {
  setFilterCategory, setFilterLocation, setSearchQuery, setSortBy,
  clearSelectedListing, unlockBol,
  addListing, deleteListing, updateListing, addPurchaseRequest,
  setLoading, setError, setVerificationInProgress,
  selectSeller, clearSelectedSeller, addSellerProfile, updateSeller, deleteSeller,
  selectListing, verifyPurchaseRequest, updatePurchaseRequestStatus,
} = marketplaceSlice.actions

export default marketplaceSlice.reducer

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectAllListings           = (state: any) => state.marketplace.listings           as MarketplaceListing[]
export const selectSelectedListing       = (state: any) => state.marketplace.selectedListing    as MarketplaceListing | null
export const selectMarketplaceTotal      = (state: any) => state.marketplace.total              as number
export const selectMarketplaceHasMore    = (state: any) => state.marketplace.hasMore            as boolean
export const selectMarketplaceLoading    = (state: any) => state.marketplace.loading            as boolean
export const selectMarketplaceLoadingMore= (state: any) => state.marketplace.loadingMore        as boolean
export const selectSellerProfiles        = (state: any) => state.marketplace.sellerProfiles     as SellerProfile[]
export const selectSellerById            = (state: any, id: string) =>
  (state.marketplace.sellerProfiles as SellerProfile[]).find(s => s.id === id)
export const selectSellerListings        = (state: any, sellerId: string) =>
  (state.marketplace.listings as MarketplaceListing[]).filter(l => l.sellerId === sellerId)
export const selectUnlockedBols          = (state: any, userId: string) =>
  (state.marketplace.unlockedBols[userId] ?? []) as string[]
