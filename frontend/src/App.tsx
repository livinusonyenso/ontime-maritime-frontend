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

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/auctions" element={<AuctionsPage />} />
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/documents" element={<DashboardDocumentsPage />} />
        <Route path="/dashboard/payments" element={<DashboardPaymentsPage />} />
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
