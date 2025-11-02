import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function DashboardHeader({ title, subtitle }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="dashboard-header">
      <div className="header-title">
        <h5>{title}</h5>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="header-controls d-flex align-items-center">
        <span className="me-3" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <i className="fas fa-user me-2"></i>
          {user?.username}
        </span>
        <button onClick={handlePrint} className="btn btn-outline-primary btn-sm me-2 no-print">
          <i className="fas fa-print me-1"></i>
          Stampa
        </button>
        <button onClick={handleLogout} className="btn btn-primary btn-sm no-print">
          <i className="fas fa-sign-out-alt me-1"></i>
          Esci
        </button>
      </div>
    </div>
  )
}
