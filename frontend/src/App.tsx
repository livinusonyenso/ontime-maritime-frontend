import { Routes, Route, Navigate } from "react-router-dom"
import { Providers } from "./components/providers"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { DashboardLayout } from "./components/layout/dashboard-layout"

// Entry / Public Pages
import HomePage from "./pages/entry/HomePage"
import AboutPage from "./pages/entry/AboutPage"
import ServicesPage from "./pages/entry/ServicesPage"
import LoginPage from "./pages/entry/LoginPage"
import RegisterPage from "./pages/entry/RegisterPage"

// Platform Public Pages
// import PlatformHomePage from "./pages/features/PlatformHomePage" /
import VesselTrackingPage from "./pages/features/VesselTrackingPage"
import EBOLPage from "./pages/features/EBOLPage"
import ArbitrationPage from "./pages/features/ArbitrationPage"
import SecurityHotlinePage from "./pages/features/SecurityHotlinePage"
import MarketplacePage from "./pages/features/MarketplacePage"
import KnowledgePage from "./pages/features/KnowledgePage"

// Buyer Pages (Protected)
import BuyerDashboardPage from "./pages/buyer/BuyerDashboardPage"
import BuyerMarketPage from "./pages/buyer/MarketPage"
import BuyerDashboardTrackingPage from "./pages/buyer/DashboardTrackingPage"
import BuyerDashboardAuctionsPage from "./pages/buyer/DashboardAuctionsPage"
import BuyerDashboardInsurancePage from "./pages/buyer/DashboardInsurancePage"
import BuyerDocumentsPage from "./pages/buyer/DocumentsPage"
import BuyerPaymentsPage from "./pages/buyer/PaymentsPage"

// Seller Pages (Protected)
import SellerDashboardPage from "./pages/seller/SellerDashboardPage"
import SellerMarketPage from "./pages/seller/MarketPage"
import SellerListingsPage from "./pages/seller/ListingsPage"
import SellerTrackingPage from "./pages/seller/TrackingPage"
import SellerDashboardAuctionsPage from "./pages/seller/DashboardAuctionsPage"
import SellerInsurancePage from "./pages/seller/InsurancePage"
import SellerDocumentsPage from "./pages/seller/DocumentsPage"
import SellerPaymentsPage from "./pages/seller/PaymentsPage"

// Dashboard Side-Panel Modules (Protected)
import { EBOLModule } from "./components/dashboard/EBOLModule"
import { SecurityHotlineModule } from "./components/dashboard/SecurityHotlineModule"
import { ArbitrationModule } from "./components/dashboard/ArbitrationModule"

// Executive Corner Pages (Protected)
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

        {/* PUBLIC AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* PUBLIC PLATFORM ROUTES */}
        {/* <Route path="/platform" element={<PlatformHomePage />} /> */}
        <Route path="/platform/vessel-tracking" element={<VesselTrackingPage />} />
        <Route path="/platform/e-bol" element={<EBOLPage />} />
        <Route path="/platform/arbitration" element={<ArbitrationPage />} />
        <Route path="/platform/security-hotline" element={<SecurityHotlinePage />} />
        <Route path="/platform/marketplace" element={<MarketplacePage />} />
        <Route path="/platform/knowledge" element={<KnowledgePage />} />

        {/* BUYER DASHBOARD (PROTECTED) */}
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
          <Route path="ebol" element={<EBOLModule />} />
          <Route path="arbitration" element={<ArbitrationModule />} />
          <Route path="security-hotline" element={<SecurityHotlineModule />} />
          <Route path="tracking" element={<BuyerDashboardTrackingPage />} />
          <Route path="auctions" element={<BuyerDashboardAuctionsPage />} />
          <Route path="insurance" element={<BuyerDashboardInsurancePage />} />
          <Route path="documents" element={<BuyerDocumentsPage />} />
          <Route path="payments" element={<BuyerPaymentsPage />} />
        </Route>

        {/* SELLER DASHBOARD (PROTECTED) */}
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
          <Route path="listings" element={<SellerListingsPage />} />
          <Route path="ebol" element={<EBOLModule />} />
          <Route path="arbitration" element={<ArbitrationModule />} />
          <Route path="security-hotline" element={<SecurityHotlineModule />} />
          <Route path="tracking" element={<SellerTrackingPage />} />
          <Route path="auctions" element={<SellerDashboardAuctionsPage />} />
          <Route path="insurance" element={<SellerInsurancePage />} />
          <Route path="documents" element={<SellerDocumentsPage />} />
          <Route path="payments" element={<SellerPaymentsPage />} />
          <Route path="sales" element={<SellerDashboardPage />} />
        </Route>

        {/* EXECUTIVE DASHBOARD */}
        <Route
          path="/dashboard/executive"
          element={
            <ProtectedRoute allowedRoles={["executive"]}>
              <ExecutiveDashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
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

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Providers>
  )
}

export default App
