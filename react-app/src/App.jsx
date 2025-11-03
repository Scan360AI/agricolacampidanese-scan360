import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'

// Pages
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import BilancioPlusPage from './pages/BilancioPlusPage'
import CentraleRischiPage from './pages/CentraleRischiPage'
import MonitorCDAPage from './pages/MonitorCDAPage'

// Report Pages
import Parte1Sintesi from './pages/reports/Parte1Sintesi'
import Parte2Economico from './pages/reports/Parte2Economico'
import Parte3Patrimoniale from './pages/reports/Parte3Patrimoniale'
import Parte4Bancabilita from './pages/reports/Parte4Bancabilita'
import Parte5CircolanteFlussi from './pages/reports/Parte5CircolanteFlussi'
import Parte6RischiRaccomandazioni from './pages/reports/Parte6RischiRaccomandazioni'
import IRPDettaglio from './pages/reports/IRPDettaglio'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/bilancio-plus" element={
        <ProtectedRoute>
          <BilancioPlusPage />
        </ProtectedRoute>
      } />

      <Route path="/centrale-rischi" element={
        <ProtectedRoute>
          <CentraleRischiPage />
        </ProtectedRoute>
      } />

      <Route path="/monitor-cda" element={
        <ProtectedRoute>
          <MonitorCDAPage />
        </ProtectedRoute>
      } />

      {/* Report Routes */}
      <Route path="/report/parte1-sintesi" element={
        <ProtectedRoute>
          <Parte1Sintesi />
        </ProtectedRoute>
      } />

      <Route path="/report/parte2-economico" element={
        <ProtectedRoute>
          <Parte2Economico />
        </ProtectedRoute>
      } />

      <Route path="/report/parte3-patrimoniale" element={
        <ProtectedRoute>
          <Parte3Patrimoniale />
        </ProtectedRoute>
      } />

      <Route path="/report/parte4-bancabilita" element={
        <ProtectedRoute>
          <Parte4Bancabilita />
        </ProtectedRoute>
      } />

      <Route path="/report/parte5-circolante-flussi" element={
        <ProtectedRoute>
          <Parte5CircolanteFlussi />
        </ProtectedRoute>
      } />

      <Route path="/report/parte6-rischi-raccomandazioni" element={
        <ProtectedRoute>
          <Parte6RischiRaccomandazioni />
        </ProtectedRoute>
      } />

      <Route path="/report/irp-dettaglio" element={
        <ProtectedRoute>
          <IRPDettaglio />
        </ProtectedRoute>
      } />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App
