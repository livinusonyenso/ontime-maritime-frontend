import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  MarketplaceListing,
  SellerProfile,
  PurchaseRequest,
} from "../../types/maritime";
import {
  dummyMarketplaceListings,
  dummySellerProfiles,
  dummyPurchaseRequests,
} from "../../data/dummyData";

interface MarketplaceState {
  listings: MarketplaceListing[];
  sellerProfiles: SellerProfile[];
  purchaseRequests: PurchaseRequest[];
  selectedListing: MarketplaceListing | null;
  selectedSeller: SellerProfile | null;
  filterCategory: string;
  filterLocation: string;
  searchQuery: string;
  sortBy: "newest" | "price_low" | "price_high" | "rating";
  loading: boolean;
  error: string | null;
  verificationInProgress: boolean;
}

const initialState: MarketplaceState = {
  listings: dummyMarketplaceListings,
  sellerProfiles: dummySellerProfiles,
  purchaseRequests: dummyPurchaseRequests,
  selectedListing: null,
  selectedSeller: null,
  filterCategory: "all",
  filterLocation: "all",
  searchQuery: "",
  sortBy: "newest",
  loading: false,
  error: null,
  verificationInProgress: false,
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    /* ------------------------- LISTINGS CRUD ------------------------- */
    setListings: (state, action: PayloadAction<MarketplaceListing[]>) => {
      state.listings = action.payload;
    },

    addListing: (
      state,
      action: PayloadAction<
        Omit<
          MarketplaceListing,
          "id" | "views" | "inquiries" | "createdAt" | "updatedAt"
        >
      >
    ) => {
      const newListing: MarketplaceListing = {
        ...action.payload,
        id: `ml${Date.now()}`,
        views: 0,
        inquiries: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.listings.unshift(newListing);
    },

    updateListing: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<MarketplaceListing> }>
    ) => {
      const index = state.listings.findIndex(
        (l) => l.id === action.payload.id
      );
      if (index !== -1) {
        state.listings[index] = {
          ...state.listings[index],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    deleteListing: (state, action: PayloadAction<string>) => {
      state.listings = state.listings.filter((l) => l.id !== action.payload);
    },

    selectListing: (state, action: PayloadAction<string>) => {
      state.selectedListing =
        state.listings.find((l) => l.id === action.payload) || null;

      const listing = state.listings.find((l) => l.id === action.payload);
      if (listing) listing.views += 1;
    },

    clearSelectedListing: (state) => {
      state.selectedListing = null;
    },

    /* ------------------------- SELLER CRUD --------------------------- */
    selectSeller: (state, action: PayloadAction<string>) => {
      state.selectedSeller =
        state.sellerProfiles.find((s) => s.id === action.payload) || null;
    },

    clearSelectedSeller: (state) => {
      state.selectedSeller = null;
    },

    addSellerProfile: (
      state,
      action: PayloadAction<
        Omit<
          SellerProfile,
          | "id"
          | "verified"
          | "rating"
          | "totalSales"
          | "memberSince"
          | "listings"
          | "responseRate"
          | "responseTime"
        >
      >
    ) => {
      const newSeller: SellerProfile = {
        ...action.payload,
        id: `seller${Date.now()}`,
        verified: false,
        rating: 0,
        totalSales: 0,
        memberSince: new Date().toISOString().split("T")[0],
        listings: 0,
        responseRate: 0,
        responseTime: "New seller",
      };

      state.sellerProfiles.push(newSeller); // <-- PUSH (CREATE)
    },

    updateSeller: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<SellerProfile> }>
    ) => {
      const index = state.sellerProfiles.findIndex(
        (s) => s.id === action.payload.id
      );

      if (index !== -1) {
        state.sellerProfiles[index] = {
          ...state.sellerProfiles[index],
          ...action.payload.updates,
        };
      }
    },

    deleteSeller: (state, action: PayloadAction<string>) => {
      state.sellerProfiles = state.sellerProfiles.filter(
        (s) => s.id !== action.payload
      ); // <-- FILTER (DELETE)
    },

    /* -------------------- PURCHASE REQUEST HANDLING ------------------ */
    addPurchaseRequest: (
      state,
      action: PayloadAction<
        Omit<
          PurchaseRequest,
          | "id"
          | "verificationStatus"
          | "status"
          | "paymentStatus"
          | "createdAt"
          | "updatedAt"
        >
      >
    ) => {
      const newRequest: PurchaseRequest = {
        ...action.payload,
        id: `pr${Date.now()}`,
        verificationStatus: "pending",
        status: "pending",
        paymentStatus: "unpaid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.purchaseRequests.unshift(newRequest);

      const listing = state.listings.find(
        (l) => l.id === action.payload.listingId
      );
      if (listing) listing.inquiries += 1;
    },

    verifyPurchaseRequest: (state, action: PayloadAction<string>) => {
      const request = state.purchaseRequests.find(
        (r) => r.id === action.payload
      );
      if (request) {
        request.verificationStatus = "verified";
        request.aiValidation = {
          bolValid: true,
          ownershipVerified: true,
          originVerified: true,
          destinationVerified: true,
          inconsistencies: [],
          riskLevel: "low",
          validatedAt: new Date().toISOString(),
        };
        request.updatedAt = new Date().toISOString();
      }
    },

    updatePurchaseRequestStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: PurchaseRequest["status"];
      }>
    ) => {
      const request = state.purchaseRequests.find(
        (r) => r.id === action.payload.id
      );
      if (request) {
        request.status = action.payload.status;
        request.updatedAt = new Date().toISOString();
      }
    },

    /* ------------------------- UI FILTERS ----------------------------- */
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filterCategory = action.payload;
    },

    setFilterLocation: (state, action: PayloadAction<string>) => {
      state.filterLocation = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setSortBy: (
      state,
      action: PayloadAction<MarketplaceState["sortBy"]>
    ) => {
      state.sortBy = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setVerificationInProgress: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.verificationInProgress = action.payload;
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                              EXPORT ACTIONS                                 */
/* -------------------------------------------------------------------------- */

export const {
  setListings,
  addListing,
  updateListing,
  deleteListing,
  selectListing,
  clearSelectedListing,
  selectSeller,
  clearSelectedSeller,
  addSellerProfile,
  updateSeller,
  deleteSeller,
  addPurchaseRequest,
  verifyPurchaseRequest,
  updatePurchaseRequestStatus,
  setFilterCategory,
  setFilterLocation,
  setSearchQuery,
  setSortBy,
  setLoading,
  setError,
  setVerificationInProgress,
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;

/* --------------------------- SELECTORS ----------------------------------- */

export const selectSellerProfiles = (state: any) =>
  state.marketplace.sellerProfiles;

export const selectSellerById = (state: any, sellerId: string) =>
  state.marketplace.sellerProfiles.find((s: SellerProfile) => s.id === sellerId);

export const selectAllListings = (state: any) =>
  state.marketplace.listings;

export const selectSellerListings = (state: any, sellerId: string) =>
  state.marketplace.listings.filter((l: MarketplaceListing) => l.sellerId === sellerId);
