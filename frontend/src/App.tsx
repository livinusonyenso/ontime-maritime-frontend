import { Routes, Route } from 'react-router-dom'
import { Providers } from './components/providers'
import { ProtectedRoute } from './components/ProtectedRoute'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ServicesPage from './pages/ServicesPage'
import TrackingPage from './pages/TrackingPage'
import AuctionsPage from './pages/AuctionsPage'
import InsurancePage from './pages/InsurancePage'
import DashboardPage from './pages/DashboardPage'
import DashboardDocumentsPage from './pages/DashboardDocumentsPage'
import DashboardPaymentsPage from './pages/DashboardPaymentsPage'
import AdminPage from './pages/AdminPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminAuctionsPage from './pages/AdminAuctionsPage'
import AdminDocumentsPage from './pages/AdminDocumentsPage'
import AdminInsurancePage from './pages/AdminInsurancePage'

// Dashboard-specific pages
import DashboardTrackingPage from './pages/dashboard/DashboardTrackingPage'
import DashboardAuctionsPage from './pages/dashboard/DashboardAuctionsPage'
import DashboardInsurancePage from './pages/dashboard/DashboardInsurancePage'
import BuyerDashboardPage from './pages/dashboard/BuyerDashboardPage'
import SellerDashboardPage from './pages/dashboard/SellerDashboardPage'
import ExecutiveDashboardPage from './pages/dashboard/ExecutiveDashboardPage'

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
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/auctions" element={<AuctionsPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        
        {/* Role-based Dashboard Routes */}
        <Route 
          path="/dashboard/buyer" 
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/seller" 
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/executive" 
          element={
            <ProtectedRoute allowedRoles={['executive'] as any}>
              <ExecutiveDashboardPage />
            </ProtectedRoute>
          } 
        />

        {/* General Dashboard routes (no header/footer) */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/tracking" element={<ProtectedRoute><DashboardTrackingPage /></ProtectedRoute>} />
        <Route path="/dashboard/auctions" element={<ProtectedRoute><DashboardAuctionsPage /></ProtectedRoute>} />
        <Route path="/dashboard/insurance" element={<ProtectedRoute><DashboardInsurancePage /></ProtectedRoute>} />
        <Route path="/dashboard/documents" element={<ProtectedRoute><DashboardDocumentsPage /></ProtectedRoute>} />
        <Route path="/dashboard/payments" element={<ProtectedRoute><DashboardPaymentsPage /></ProtectedRoute>} />
        
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
