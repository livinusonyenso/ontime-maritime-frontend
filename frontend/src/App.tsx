import { Routes, Route } from 'react-router-dom'
import { Providers } from './components/providers'

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
        
        {/* Dashboard routes (no header/footer) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/tracking" element={<DashboardTrackingPage />} />
        <Route path="/dashboard/auctions" element={<DashboardAuctionsPage />} />
        <Route path="/dashboard/insurance" element={<DashboardInsurancePage />} />
        <Route path="/dashboard/documents" element={<DashboardDocumentsPage />} />
        <Route path="/dashboard/payments" element={<DashboardPaymentsPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/auctions" element={<AdminAuctionsPage />} />
        <Route path="/admin/documents" element={<AdminDocumentsPage />} />
        <Route path="/admin/insurance" element={<AdminInsurancePage />} />
      </Routes>
    </Providers>
  )
}

export default App
