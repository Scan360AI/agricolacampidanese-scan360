import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo_scan.png" alt="SCAN360 Logo" />
        <h5>SCAN360</h5>
      </div>

      <ul className="sidebar-nav">
        <li className="nav-item">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <i className="fas fa-home"></i>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-title">ANALISI</li>

        <li className="nav-item">
          <Link
            to="/bilancio-plus"
            className={`nav-link ${isActive('/bilancio-plus') ? 'active' : ''}`}
          >
            <i className="fas fa-file-invoice-dollar"></i>
            Bilancio Plus
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/centrale-rischi"
            className={`nav-link ${isActive('/centrale-rischi') ? 'active' : ''}`}
          >
            <i className="fas fa-exclamation-triangle"></i>
            Centrale Rischi
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/monitor-cda"
            className={`nav-link ${isActive('/monitor-cda') ? 'active' : ''}`}
          >
            <i className="fas fa-users"></i>
            Monitor CDA
          </Link>
        </li>

        <li className="nav-title">REPORT</li>

        <li className="nav-item">
          <Link
            to="/report/parte1-sintesi"
            className={`nav-link ${isActive('/report/parte1-sintesi') ? 'active' : ''}`}
          >
            <i className="fas fa-chart-bar"></i>
            Parte 1: Sintesi
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/report/parte2-economico"
            className={`nav-link ${isActive('/report/parte2-economico') ? 'active' : ''}`}
          >
            <i className="fas fa-chart-line"></i>
            Parte 2: Economico
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/report/parte3-patrimoniale"
            className={`nav-link ${isActive('/report/parte3-patrimoniale') ? 'active' : ''}`}
          >
            <i className="fas fa-building"></i>
            Parte 3: Patrimoniale
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/report/parte4-bancabilita"
            className={`nav-link ${isActive('/report/parte4-bancabilita') ? 'active' : ''}`}
          >
            <i className="fas fa-university"></i>
            Parte 4: Bancabilità
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/report/parte5-circolante-flussi"
            className={`nav-link ${isActive('/report/parte5-circolante-flussi') ? 'active' : ''}`}
          >
            <i className="fas fa-exchange-alt"></i>
            Parte 5: Circolante
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/report/parte6-rischi-raccomandazioni"
            className={`nav-link ${isActive('/report/parte6-rischi-raccomandazioni') ? 'active' : ''}`}
          >
            <i className="fas fa-shield-alt"></i>
            Parte 6: Rischi
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/report/irp-dettaglio"
            className={`nav-link ${isActive('/report/irp-dettaglio') ? 'active' : ''}`}
          >
            <i className="fas fa-star"></i>
            IRP Dettaglio
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <small>© 2024 Kitzanos Lab</small>
      </div>
    </div>
  )
}
