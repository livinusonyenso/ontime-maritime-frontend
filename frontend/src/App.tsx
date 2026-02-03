import { Routes, Route, Navigate } from "react-router-dom"
import { Providers } from "./components/providers"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { DashboardLayout } from "./components/layout/dashboard-layout"

// Entry Pages
import HomePage from "./pages/entry/HomePage"
import AboutPage from "./pages/entry/AboutPage"
import LoginPage from "./pages/entry/LoginPage"
import AdminLoginPage from "./pages/entry/AdminLoginPage"
import RegisterPage from "./pages/entry/RegisterPage"
import ServicesPage from "./pages/entry/ServicesPage"
import OntimeStorePage from "./pages/entry/OntimeStorePage"
import ProductDetailPage from "./pages/entry/ProductDetailPage"

// Feature Pages - Maritime Platform Modules
import VesselTrackingPage from "./pages/features/VesselTrackingPage"
import EBOLPage from "./pages/features/EBOLPage"
import LegalHubPage from "./pages/features/LegalHubPage"
import SecurityHotlinePage from "./pages/features/SecurityHotlinePage"
import ArbitrationPage from "./pages/features/ArbitrationPage"
import MarketplacePage from "./pages/features/MarketplacePage"
import KnowledgePage from "./pages/features/KnowledgePage"

// Feature Views

// Buyer Pages - Dashboard Placeholders
import BuyerEBOLPage from "./dashboard/buyer/EBOL/EBOLPage"
import BuyerArbitrationPage from "./dashboard/buyer/Arbitration/ArbitrationPage"
import BuyerSecurityHotlinePage from "./dashboard/buyer/SecurityHotline/SecurityHotlinePage"
import BuyerAuctionsPage from "./dashboard/buyer/Auctions/AuctionsPage"
import BuyerTrackingPage from "./dashboard/buyer/Tracking/TrackingPage"
import BuyerDocumentsPage from "./dashboard/buyer/Documents/DocumentsPage"
import BuyersInsurance from "./dashboard/buyer/insurance/Insurance"
// Buyer Pages - Keep from pages folder
import BuyerDashboardPage from "./pages/buyer/BuyerDashboardPage"
import BuyerMarketPage from "./pages/buyer/MarketPage"
import BuyerInsurancePage from "./pages/buyer/InsurancePage"
import BuyerPaymentsPage from "./pages/buyer/PaymentsPage"

// Seller Pages - Dashboard Placeholders
import SellerEBOLPage from "./dashboard/seller/EBOL/EBOLPage"
import SellerArbitrationPage from "./dashboard/seller/Arbitration/ArbitrationPage"
import SellerSecurityHotlinePage from "./dashboard/seller/SecurityHotline/SecurityHotlinePage"
import SellerAuctionsPage from "./dashboard/seller/Auctions/AuctionsPage"
import SellerTrackingPage from "./dashboard/seller/Tracking/TrackingPage"
import SellerDocumentsPage from "./dashboard/seller/Documents/DocumentsPage"
// Seller Pages - Keep from pages folder
import SellerDashboardPage from "./pages/seller/SellerDashboardPage"
import SellerMarketPage from "./pages/seller/MarketPage"
import SellerListingsPage from "./pages/seller/ListingsPage"

// Executive Corner Pages
import ExecutiveDashboardPage from "./pages/executive-corner/ExecutiveDashboardPage"
import AdminPage from "./pages/executive-corner/AdminPage"
import AdminUsersPage from "./pages/executive-corner/AdminUsersPage"
import AdminAuctionsPage from "./pages/executive-corner/AdminAuctionsPage"
import AdminDocumentsPage from "./pages/executive-corner/AdminDocumentsPage"
import AdminInsurancePage from "./pages/executive-corner/AdminInsurancePage"
import AdminAnalyticsPage from "./pages/executive-corner/AdminAnalyticsPage"
import AdminKYCPage from "./pages/executive-corner/AdminKYCPage"
import AdminAuditLogsPage from "./pages/executive-corner/AdminAuditLogsPage"
import AdminSettingsPage from "./pages/executive-corner/AdminSettingsPage"
import MaritimeSalesAdmin from "./pages/seller/MaritimeSalesAdmin"
import InsuranceAdmin from "./pages/seller/UserInsuranceDashboard"
import UserInsuranceDashboard from "./pages/seller/UserInsuranceDashboard"
import UserSecurityHotlineDashboard from "./dashboard/seller/SecurityHotline/SecurityHotlinePage"
import TrackingUserDashboard from "./dashboard/seller/Tracking/TrackingPage"
import UserAuctionsDashboard from "./dashboard/seller/Auctions/AuctionsPage"
import UserDocumentsDashboard from "./dashboard/seller/Documents/DocumentsPage"

function App() {
  return (
    <Providers>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/store" element={<OntimeStorePage />} />
        <Route path="/store/product/:productId" element={<ProductDetailPage />} />

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
          <Route path="tracking" element={<BuyerTrackingPage />} />
          <Route path="auctions" element={<BuyerAuctionsPage />} />
          <Route path="insurance" element={<BuyersInsurance />} />
          <Route path="documents" element={<BuyerDocumentsPage />} />
          <Route path="payments" element={<BuyerPaymentsPage />} />
          <Route path="ebol" element={<BuyerEBOLPage />} />
          <Route path="arbitration" element={<BuyerArbitrationPage />} />
          <Route path="security-hotline" element={<BuyerSecurityHotlinePage />} />
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
          <Route path="listings" element={<SellerListingsPage />} />
          <Route path="insurance" element={<UserInsuranceDashboard/>} />
          <Route path="tracking" element={<TrackingUserDashboard/>} />
          <Route path="auctions" element={<UserAuctionsDashboard/>} />
          <Route path="documents" element={<UserDocumentsDashboard/>} />
          <Route path="sales" element={<MaritimeSalesAdmin/>} />
          <Route path="ebol" element={<SellerEBOLPage />} />
          <Route path="arbitration" element={<SellerArbitrationPage />} />
          <Route path="security-hotline" element={<UserSecurityHotlineDashboard/>} />
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
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="auctions" element={<AdminAuctionsPage />} />
          <Route path="documents" element={<AdminDocumentsPage />} />
          <Route path="insurance" element={<AdminInsurancePage />} />
          <Route path="kyc" element={<AdminKYCPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        {/* Redirect legacy/unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Providers>
  )
}

export default App
