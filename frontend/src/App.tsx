import { Routes, Route } from 'react-router-dom'
import { Providers } from './components/providers'
import { ProtectedRoute } from './components/ProtectedRoute'

// Entry Pages
import HomePage from './pages/entry/HomePage'
import AboutPage from './pages/entry/AboutPage'
import LoginPage from './pages/entry/LoginPage'
import RegisterPage from './pages/entry/RegisterPage'
import ServicesPage from './pages/entry/ServicesPage'

// Buyer Pages
import BuyerDashboardPage from './pages/buyer/BuyerDashboardPage'
import BuyerTrackingPage from './pages/buyer/TrackingPage'
import BuyerAuctionsPage from './pages/buyer/AuctionsPage'
import BuyerInsurancePage from './pages/buyer/InsurancePage'
import BuyerDocumentsPage from './pages/buyer/DocumentsPage'
import BuyerPaymentsPage from './pages/buyer/PaymentsPage'

// Seller Pages
import SellerDashboardPage from './pages/seller/SellerDashboardPage'
import SellerTrackingPage from './pages/seller/TrackingPage'
import SellerAuctionsPage from './pages/seller/AuctionsPage'
import SellerInsurancePage from './pages/seller/InsurancePage'
import SellerDocumentsPage from './pages/seller/DocumentsPage'
import SellerPaymentsPage from './pages/seller/PaymentsPage'

// Executive Corner Pages
import ExecutiveDashboardPage from './pages/executive-corner/ExecutiveDashboardPage'
import AdminPage from './pages/executive-corner/AdminPage'
import AdminUsersPage from './pages/executive-corner/AdminUsersPage'
import AdminAuctionsPage from './pages/executive-corner/AdminAuctionsPage'
import AdminDocumentsPage from './pages/executive-corner/AdminDocumentsPage'
import AdminInsurancePage from './pages/executive-corner/AdminInsurancePage'

function App() {
  return (
    <Providers>
      <Routes>
        {/* Public routes (with header/footer) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/tracking" element={<BuyerTrackingPage />} />
        <Route path="/auctions" element={<BuyerAuctionsPage />} />
        <Route path="/insurance" element={<BuyerInsurancePage />} />
        
        {/* Buyer Dashboard Routes */}
        <Route 
          path="/dashboard/buyer" 
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/dashboard/buyer/tracking" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerTrackingPage /></ProtectedRoute>} />
        <Route path="/dashboard/buyer/auctions" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerAuctionsPage /></ProtectedRoute>} />
        <Route path="/dashboard/buyer/insurance" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerInsurancePage /></ProtectedRoute>} />
        <Route path="/dashboard/buyer/documents" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDocumentsPage /></ProtectedRoute>} />
        <Route path="/dashboard/buyer/payments" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerPaymentsPage /></ProtectedRoute>} />

        {/* Seller Dashboard Routes */}
        <Route 
          path="/dashboard/seller" 
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/dashboard/seller/tracking" element={<ProtectedRoute allowedRoles={['seller']}><SellerTrackingPage /></ProtectedRoute>} />
        <Route path="/dashboard/seller/auctions" element={<ProtectedRoute allowedRoles={['seller']}><SellerAuctionsPage /></ProtectedRoute>} />
        <Route path="/dashboard/seller/insurance" element={<ProtectedRoute allowedRoles={['seller']}><SellerInsurancePage /></ProtectedRoute>} />
        <Route path="/dashboard/seller/documents" element={<ProtectedRoute allowedRoles={['seller']}><SellerDocumentsPage /></ProtectedRoute>} />
        <Route path="/dashboard/seller/payments" element={<ProtectedRoute allowedRoles={['seller']}><SellerPaymentsPage /></ProtectedRoute>} />

        {/* Executive Dashboard Routes */}
        <Route 
          path="/dashboard/executive" 
          element={
            <ProtectedRoute allowedRoles={['executive'] as any}>
              <ExecutiveDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/auctions" element={<ProtectedRoute allowedRoles={['admin']}><AdminAuctionsPage /></ProtectedRoute>} />
        <Route path="/admin/documents" element={<ProtectedRoute allowedRoles={['admin']}><AdminDocumentsPage /></ProtectedRoute>} />
        <Route path="/admin/insurance" element={<ProtectedRoute allowedRoles={['admin']}><AdminInsurancePage /></ProtectedRoute>} />
      </Routes>
    </Providers>
  )
}

export default App
