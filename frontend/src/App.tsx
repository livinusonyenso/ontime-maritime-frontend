import { Routes, Route, Navigate } from "react-router-dom"
import { Providers } from "./components/providers"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { DashboardLayout } from "./components/layout/dashboard-layout"

// Entry Pages
import HomePage from "./pages/entry/HomePage"
import AboutPage from "./pages/entry/AboutPage"
import LoginPage from "./pages/entry/LoginPage"
import RegisterPage from "./pages/entry/RegisterPage"
import ServicesPage from "./pages/entry/ServicesPage"

// Feature Pages - Maritime Platform Modules
import VesselTrackingPage from "./pages/features/VesselTrackingPage"
import EBOLPage from "./pages/features/EBOLPage"
import LegalHubPage from "./pages/features/LegalHubPage"
import SecurityHotlinePage from "./pages/features/SecurityHotlinePage"
import ArbitrationPage from "./pages/features/ArbitrationPage"
import MarketplacePage from "./pages/features/MarketplacePage"
import KnowledgePage from "./pages/features/KnowledgePage"

// Buyer Pages
import BuyerDashboardPage from "./pages/buyer/BuyerDashboardPage"
import BuyerMarketPage from "./pages/buyer/MarketPage"
import BuyerTrackingPage from "./pages/buyer/TrackingPage"
import BuyerDashboardTrackingPage from "./pages/buyer/DashboardTrackingPage"
import BuyerAuctionsPage from "./pages/buyer/AuctionsPage"
import BuyerDashboardAuctionsPage from "./pages/buyer/DashboardAuctionsPage"
import BuyerInsurancePage from "./pages/buyer/InsurancePage"
import BuyerDashboardInsurancePage from "./pages/buyer/DashboardInsurancePage"
import BuyerDocumentsPage from "./pages/buyer/DocumentsPage"
import BuyerPaymentsPage from "./pages/buyer/PaymentsPage"

// Seller Pages
import SellerDashboardPage from "./pages/seller/SellerDashboardPage"
import SellerCreateListingPage from "./pages/seller/CreateListingPage"
import SellerMarketPage from "./pages/seller/MarketPage"
import SellerListingsPage from "./pages/seller/ListingsPage"
import SellerTrackingPage from "./pages/seller/TrackingPage"
import SellerDashboardAuctionsPage from "./pages/seller/DashboardAuctionsPage"
import SellerInsurancePage from "./pages/seller/InsurancePage"
import SellerDocumentsPage from "./pages/seller/DocumentsPage"
import SellerPaymentsPage from "./pages/seller/PaymentsPage"

// Executive Corner Pages
import ExecutiveDashboardPage from "./pages/executive-corner/ExecutiveDashboardPage"
import AdminPage from "./pages/executive-corner/AdminPage"
import AdminUsersPage from "./pages/executive-corner/AdminUsersPage"
import AdminAuctionsPage from "./pages/executive-corner/AdminAuctionsPage"
import AdminDocumentsPage from "./pages/executive-corner/AdminDocumentsPage"
import AdminInsurancePage from "./pages/executive-corner/AdminInsurancePage"

function App() {
  return (
    <Providers>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        
        {/* Feature Routes - Maritime Platform Modules (Public) */}
        <Route path="/vessel-tracking" element={<VesselTrackingPage />} />
        <Route path="/e-bol" element={<EBOLPage />} />
        <Route path="/legal-hub" element={<LegalHubPage />} />
        <Route path="/security-hotline" element={<SecurityHotlinePage />} />
        <Route path="/arbitration" element={<ArbitrationPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />

        {/* Legacy public routes */}
        <Route path="/tracking" element={<BuyerTrackingPage />} />
        <Route path="/auctions" element={<BuyerAuctionsPage />} />
        <Route path="/insurance" element={<BuyerInsurancePage />} />

        {/* Buyer Dashboard Routes */}
        <Route
          path="/dashboard/buyer"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <DashboardLayout role="buyer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<BuyerMarketPage />} />
          <Route path="overview" element={<BuyerDashboardPage />} />
          <Route path="tracking" element={<BuyerDashboardTrackingPage />} />
          <Route path="auctions" element={<BuyerDashboardAuctionsPage />} />
          <Route path="insurance" element={<BuyerDashboardInsurancePage />} />
          <Route path="documents" element={<BuyerDocumentsPage />} />
          <Route path="payments" element={<BuyerPaymentsPage />} />
        </Route>

        {/* Seller Dashboard Routes */}
        <Route
          path="/dashboard/seller"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <DashboardLayout role="seller" />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerMarketPage />} />
          <Route path="overview" element={<SellerDashboardPage />} />
          <Route path="create-listing" element={<SellerCreateListingPage />} />
          <Route path="listings" element={<SellerListingsPage />} />
          <Route path="tracking" element={<SellerTrackingPage />} />
          <Route path="auctions" element={<SellerDashboardAuctionsPage />} />
          <Route path="insurance" element={<SellerInsurancePage />} />
          <Route path="documents" element={<SellerDocumentsPage />} />
          <Route path="payments" element={<SellerPaymentsPage />} />
          <Route path="sales" element={<SellerDashboardPage />} />
        </Route>

        {/* Executive Dashboard Routes */}
        <Route
          path="/dashboard/executive"
          element={
            <ProtectedRoute allowedRoles={["executive"] as any}>
              <ExecutiveDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout role="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="auctions" element={<AdminAuctionsPage />} />
          <Route path="documents" element={<AdminDocumentsPage />} />
          <Route path="insurance" element={<AdminInsurancePage />} />
        </Route>

        {/* Redirect legacy/unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Providers>
  )
}

export default App
