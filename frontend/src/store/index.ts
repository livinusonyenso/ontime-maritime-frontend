import { configureStore } from '@reduxjs/toolkit'
import vesselTrackingReducer from './slices/vesselTrackingSlice'
import billOfLadingReducer from './slices/billOfLadingSlice'
import legalHubReducer from './slices/legalHubSlice'
import securityReducer from './slices/securitySlice'
import arbitrationReducer from './slices/arbitrationSlice'
import marketplaceReducer from './slices/marketplaceSlice'
import knowledgeReducer from './slices/knowledgeSlice'
import sellerListingReducer from './slices/sellerListingSlice'

export const store = configureStore({
  reducer: {
    vesselTracking: vesselTrackingReducer,
    billOfLading: billOfLadingReducer,
    legalHub: legalHubReducer,
    security: securityReducer,
    arbitration: arbitrationReducer,
    marketplace: marketplaceReducer,
    knowledge: knowledgeReducer,
    sellerListings: sellerListingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
