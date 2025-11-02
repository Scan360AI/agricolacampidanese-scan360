import DashboardLayout from '../components/DashboardLayout'
import { Link } from 'react-router-dom'
import financialData from '../data/financial-data.json'

export default function Home() {
  const kpis = financialData.kpis.dashboard

  return (
    <DashboardLayout
      title="Dashboard Esecutiva"
      subtitle="Panoramica indicatori chiave Agricola Campidanese"
    >
      {/* KPI Cards */}
      <div className="row">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="col-md-4">
            <div className="dashboard-card">
              <div className="card-title-small">
                <i className={`fas ${kpi.icon} me-2`}></i>
                {kpi.title}
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className={`kpi-trend ${kpi.trend === 'up' ? 'trend-up' : kpi.trend === 'down' ? 'trend-down' : 'trend-neutral'}`}>
                <i className={`fas ${kpi.trend === 'up' ? 'fa-arrow-up' : kpi.trend === 'down' ? 'fa-arrow-down' : 'fa-minus'}`}></i>
                {kpi.trendValue}
              </div>
              <div className="kpi-description">{kpi.description}</div>
              <Link to={kpi.link} className="kpi-link">
                Dettagli <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links Section */}
      <h2 className="section-title mt-4">
        <i className="fas fa-link"></i>
        Accesso Rapido
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '15px' }}>
              <i className="fas fa-file-alt me-2"></i>
              Report Analitici
            </h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
              Accedi ai report dettagliati di analisi aziendale
            </p>
            <div className="d-flex flex-column" style={{ gap: '10px' }}>
              <Link to="/report/parte1-sintesi" className="btn btn-outline-primary">
                <i className="fas fa-chart-bar me-2"></i>
                Parte 1: Profilo e Sintesi
              </Link>
              <Link to="/report/parte2-economico" className="btn btn-outline-primary">
                <i className="fas fa-chart-line me-2"></i>
                Parte 2: Analisi Economica
              </Link>
              <Link to="/report/parte3-patrimoniale" className="btn btn-outline-primary">
                <i className="fas fa-building me-2"></i>
                Parte 3: Analisi Patrimoniale
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '15px' }}>
              <i className="fas fa-tools me-2"></i>
              Strumenti di Analisi
            </h5>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
              Utilizza gli strumenti avanzati di valutazione
            </p>
            <div className="d-flex flex-column" style={{ gap: '10px' }}>
              <Link to="/dashboard" className="btn btn-outline-primary">
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard Completa
              </Link>
              <Link to="/bilancio-plus" className="btn btn-outline-primary">
                <i className="fas fa-file-invoice-dollar me-2"></i>
                Bilancio Plus
              </Link>
              <Link to="/centrale-rischi" className="btn btn-outline-primary">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Centrale Rischi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="alert-box alert-info mt-4">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Informazioni
        </h5>
        <p style={{ marginBottom: 0 }}>
          <strong>SCAN360</strong> è il sistema di analisi strategica aziendale per{' '}
          <strong>{financialData.company.name}</strong>. Utilizza il menu laterale per
          navigare tra le diverse sezioni di analisi.
        </p>
      </div>
    </DashboardLayout>
  )
}
