import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'

export default function CentraleRischiPage() {
  const { company, irp, kpis, swot } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  // Calculate risk score based on IRP (simulated CR score)
  const crScore = irp.score
  const crCategory = crScore >= 80 ? 'Ottimo' : crScore >= 60 ? 'Buono' : crScore >= 40 ? 'Monitoraggio' : 'Critico'
  const crClass = crScore >= 80 ? 'risk-low' : crScore >= 60 ? 'risk-medium' : 'risk-high'

  // Simulated credit exposure based on financial data
  const totalExposure = kpis.financial.pfn2024 > 0 ? kpis.financial.pfn2024 : 0
  const utilizationRate = totalExposure > 0 ? 75 : 0

  const riskIndicators = [
    {
      label: 'Probabilità di Default (MCC)',
      value: `${irp.components.ratingMCC.pd.toFixed(2)}%`,
      status: irp.components.ratingMCC.pd < 2 ? 'success' : irp.components.ratingMCC.pd < 4 ? 'warning' : 'danger',
      description: `Fascia "${irp.components.ratingMCC.fascia}"`
    },
    {
      label: 'Z-Score Altman',
      value: irp.components.zScoreAltman.score.toFixed(2),
      status: irp.components.zScoreAltman.score > 3 ? 'success' : irp.components.zScoreAltman.score > 1.8 ? 'warning' : 'danger',
      description: irp.components.zScoreAltman.zona
    },
    {
      label: 'Leanus Score',
      value: irp.components.leanusScore.scoreOriginale.toFixed(2),
      status: 'success',
      description: irp.components.leanusScore.scoreLabel
    },
    {
      label: 'D/E Ratio',
      value: kpis.financial.deRatio2024.toFixed(2),
      status: kpis.financial.deRatio2024 < 1 ? 'success' : kpis.financial.deRatio2024 < 3 ? 'warning' : 'danger',
      description: kpis.financial.deRatio2024 < 1 ? 'Eccellente' : kpis.financial.deRatio2024 < 3 ? 'Sotto controllo' : 'Elevato'
    }
  ]

  return (
    <DashboardLayout
      title="Analisi Centrale Rischi"
      subtitle={`Monitoraggio esposizioni e rating creditizio ${company.name}`}
    >
      {/* Executive Summary with CR Score */}
      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, var(--white) 0%, #f0f4f8 100%)' }}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <i className="fas fa-info-circle me-2"></i>
                Sintesi Esecutiva Centrale Rischi
              </h4>
              <p className="mb-2">
                L'analisi del profilo di rischio creditizio di <strong>{company.name}</strong> evidenzia
                un punteggio IRP di <strong>{irp.score.toFixed(1)}/100</strong> (Categoria {irp.category}),
                indicando un rischio <strong>{irp.categoryLabel.toLowerCase()}</strong>.
              </p>
              <p className="mb-0">
                {kpis.financial.pfn2024 < 0
                  ? 'La società presenta una posizione finanziaria netta cash positive, con zero debiti finanziari verso il sistema bancario.'
                  : `L'esposizione finanziaria complessiva è pari a ${formatCurrency(kpis.financial.pfn2024)}.`
                }
              </p>
            </div>
            <div className="col-lg-4 text-center mt-3 mt-lg-0">
              <h6 className="card-title-small mb-2">Punteggio Rischio Creditizio</h6>
              <div className={`irp-score-circle ${crClass}`}>
                <span className="irp-score-value">{crScore.toFixed(0)}</span>
                <span className="irp-score-max">/ 100</span>
              </div>
              <div className="irp-category-text">
                Categoria: <span className={`status-badge bg-${crClass === 'risk-low' ? 'success' : crClass === 'risk-medium' ? 'warning' : 'danger'}`}>
                  {irp.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Indicators */}
      <h2 className="section-title">
        <i className="fas fa-shield-alt"></i>
        Indicatori di Rischio
      </h2>

      <div className="row">
        {riskIndicators.map((indicator, idx) => (
          <div key={idx} className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  <i className={`fas fa-${indicator.status === 'success' ? 'check-circle text-success' : indicator.status === 'warning' ? 'exclamation-triangle text-warning' : 'times-circle text-danger'} me-2`}></i>
                  <h6 className="mb-0">{indicator.label}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                      {indicator.value}
                    </div>
                    <small className="text-muted">{indicator.description}</small>
                  </div>
                  <span className={`status-badge bg-${indicator.status}`}>
                    {indicator.status === 'success' ? 'OK' : indicator.status === 'warning' ? 'Attenzione' : 'Critico'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Position */}
      <h2 className="section-title">
        <i className="fas fa-money-bill-wave"></i>
        Posizione Finanziaria
      </h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className={`kpi-card-v2 ${kpis.financial.pfn2024 < 0 ? 'border-left-success' : 'border-left-warning'}`}>
            <div className="card-title-modern">PFN 2024</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.financial.pfn2024)}</div>
            <div className="kpi-description-modern">
              {kpis.financial.pfn2024 < 0 ? 'Cash Positive - Zero debiti finanziari' : 'Indebitamento finanziario netto'}
            </div>
            <i className="fas fa-balance-scale kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Liquidità</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.financial.liquidita2024)}</div>
            <div className="kpi-description-modern">
              Disponibilità liquide immediate
            </div>
            <i className="fas fa-wallet kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">DSCR 2024</div>
            <div className="kpi-value-modern">{kpis.financial.dscr2024 ? kpis.financial.dscr2024.toFixed(2) : 'N/A'}</div>
            <div className="kpi-description-modern">
              {kpis.financial.dscr2024 && kpis.financial.dscr2024 > 1.25 ? 'Eccellente capacità di servizio del debito' : 'Debt Service Coverage Ratio'}
            </div>
            <i className="fas fa-chart-pie kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      {/* Working Capital Metrics */}
      <h2 className="section-title">
        <i className="fas fa-sync-alt"></i>
        Ciclo del Circolante
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row text-center">
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-clock fa-2x text-danger mb-2"></i>
                <h6 className="text-muted mb-1">DSO (Giorni Incasso)</h6>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--danger)' }}>
                  {kpis.workingCapital.dso2024}
                </div>
                <small className="text-muted">giorni</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-box fa-2x text-info mb-2"></i>
                <h6 className="text-muted mb-1">DIO (Giorni Magazzino)</h6>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--info)' }}>
                  {kpis.workingCapital.dio2024}
                </div>
                <small className="text-muted">giorni</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-handshake fa-2x text-success mb-2"></i>
                <h6 className="text-muted mb-1">DPO (Giorni Pagamento)</h6>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success)' }}>
                  {kpis.workingCapital.dpo2024}
                </div>
                <small className="text-muted">giorni</small>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <i className="fas fa-redo fa-2x text-warning mb-2"></i>
                <h6 className="text-muted mb-1">Ciclo Circolante</h6>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--warning)' }}>
                  {kpis.workingCapital.cicloCircolante2024}
                </div>
                <small className="text-muted">giorni</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Analysis from SWOT */}
      <h2 className="section-title">
        <i className="fas fa-exclamation-triangle"></i>
        Aree di Attenzione (SWOT Threats)
      </h2>

      <div className="alert-box alert-warning">
        <h5>
          <i className="fas fa-exclamation-triangle me-2"></i>
          Principali Minacce Identificate
        </h5>
        <ul>
          {swot.threats.map((threat, idx) => (
            <li key={idx}>{threat}</li>
          ))}
        </ul>
      </div>

      {/* Strengths */}
      <div className="alert-box alert-success mt-4">
        <h5>
          <i className="fas fa-check-circle me-2"></i>
          Punti di Forza (SWOT Strengths)
        </h5>
        <ul>
          {swot.strengths.slice(0, 4).map((strength, idx) => (
            <li key={idx}>{strength}</li>
          ))}
        </ul>
      </div>

      {/* Info Note */}
      <div className="alert-box alert-info mt-4">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Note sulla Centrale Rischi
        </h5>
        <p style={{ marginBottom: 0 }}>
          <strong>Data Source:</strong> L'analisi si basa sui dati finanziari consolidati al {company.reportDate}.
          {kpis.financial.pfn2024 < 0
            ? ' La società non presenta esposizioni verso il sistema bancario, mantenendo una posizione finanziaria netta cash positive.'
            : ' Il profilo di rischio è valutato sulla base degli indicatori finanziari e patrimoniali.'
          }
        </p>
      </div>
    </DashboardLayout>
  )
}
