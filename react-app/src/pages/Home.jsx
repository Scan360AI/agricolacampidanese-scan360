import DashboardLayout from '../components/DashboardLayout'
import { Link } from 'react-router-dom'
import financialData from '../data/financial-data.json'

export default function Home() {
  const { company, irp, kpis } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const dashboardKpis = [
    {
      id: 'irp',
      title: 'Indice Rischio Ponderato',
      value: irp.score.toFixed(1) + '/100',
      trend: 'up',
      trendValue: `Categoria ${irp.category} - ${irp.categoryLabel}`,
      description: 'Profilo di rischio creditizio complessivo',
      icon: 'fa-shield-alt',
      link: '/irp-dettaglio'
    },
    {
      id: 'ricavi',
      title: 'Ricavi 2024',
      value: formatCurrency(kpis.economic.ricavi2024),
      trend: kpis.economic.ricaviVariation > 0 ? 'up' : 'down',
      trendValue: `${kpis.economic.ricaviVariation > 0 ? '+' : ''}${kpis.economic.ricaviVariation.toFixed(2)}% vs 2023`,
      description: 'Fatturato annuale consolidato',
      icon: 'fa-chart-line',
      link: '/report/parte2-economico'
    },
    {
      id: 'ebitda',
      title: 'EBITDA 2024',
      value: formatCurrency(kpis.economic.ebitda2024),
      trend: kpis.economic.ebitdaVariation > 0 ? 'up' : 'down',
      trendValue: `${kpis.economic.ebitdaVariation > 0 ? '+' : ''}${kpis.economic.ebitdaVariation.toFixed(2)}% - Margin ${kpis.economic.ebitdaMargin2024.toFixed(1)}%`,
      description: 'Margine operativo lordo',
      icon: 'fa-coins',
      link: '/report/parte2-economico'
    },
    {
      id: 'patrimonio',
      title: 'Patrimonio Netto',
      value: formatCurrency(kpis.patrimonial.patrimonioNetto2024),
      trend: 'up',
      trendValue: `+${kpis.patrimonial.patrimonioNettoVariation.toFixed(2)}% vs 2023`,
      description: 'Solidità patrimoniale',
      icon: 'fa-building',
      link: '/report/parte3-patrimoniale'
    },
    {
      id: 'pfn',
      title: 'Posizione Finanziaria Netta',
      value: formatCurrency(kpis.financial.pfn2024),
      trend: 'up',
      trendValue: 'Cash Positive - Zero debiti finanziari',
      description: 'Liquidità netta disponibile',
      icon: 'fa-money-bill-wave',
      link: '/report/parte4-bancabilita'
    },
    {
      id: 'roe',
      title: 'ROE 2024',
      value: `${kpis.economic.roe2024.toFixed(2)}%`,
      trend: kpis.economic.roe2024 > kpis.economic.roe2023 ? 'up' : 'down',
      trendValue: `ROI ${kpis.economic.roi2024.toFixed(2)}% - ROS ${kpis.economic.ros2024.toFixed(2)}%`,
      description: 'Redditività del capitale proprio',
      icon: 'fa-percentage',
      link: '/report/parte2-economico'
    }
  ]

  return (
    <DashboardLayout
      title="Dashboard Esecutiva"
      subtitle={`Panoramica indicatori chiave ${company.name}`}
    >
      {/* KPI Cards - Netflix Style */}
      <div className="row">
        {dashboardKpis.map((kpi) => (
          <div key={kpi.id} className="col-md-4 mb-4">
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
          <strong>{company.name}</strong> ({company.sector}). Utilizza il menu laterale per
          navigare tra le diverse sezioni di analisi. Report aggiornato al {company.reportDate}.
        </p>
      </div>
    </DashboardLayout>
  )
}
