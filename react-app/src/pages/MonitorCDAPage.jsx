import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'

export default function MonitorCDAPage() {
  const { company, irp, kpis, swot, cciiIndicators } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const formatPercent = (value) => {
    return `${value.toFixed(2)}%`
  }

  // Executive KPIs for CDA
  const executiveKPIs = [
    {
      title: 'IRP Score',
      value: `${irp.score.toFixed(1)}/100`,
      trend: 'neutral',
      description: `Categoria ${irp.category} - ${irp.categoryLabel}`,
      icon: 'fa-shield-alt',
      color: irp.score >= 70 ? 'success' : irp.score >= 50 ? 'warning' : 'danger'
    },
    {
      title: 'Ricavi 2024',
      value: formatCurrency(kpis.economic.ricavi2024),
      trend: kpis.economic.ricaviVariation > 0 ? 'up' : 'down',
      description: `${kpis.economic.ricaviVariation > 0 ? '+' : ''}${formatPercent(kpis.economic.ricaviVariation)} vs 2023`,
      icon: 'fa-chart-line',
      color: kpis.economic.ricaviVariation > 0 ? 'success' : 'warning'
    },
    {
      title: 'EBITDA Margin',
      value: formatPercent(kpis.economic.ebitdaMargin2024),
      trend: kpis.economic.ebitdaMargin2024 > kpis.economic.ebitdaMargin2023 ? 'up' : 'down',
      description: `EBITDA ${formatCurrency(kpis.economic.ebitda2024)}`,
      icon: 'fa-coins',
      color: kpis.economic.ebitdaMargin2024 > 8 ? 'success' : kpis.economic.ebitdaMargin2024 > 5 ? 'warning' : 'danger'
    },
    {
      title: 'ROE 2024',
      value: formatPercent(kpis.economic.roe2024),
      trend: kpis.economic.roe2024 > kpis.economic.roe2023 ? 'up' : 'down',
      description: `Redditività del capitale proprio`,
      icon: 'fa-percentage',
      color: kpis.economic.roe2024 > 15 ? 'success' : kpis.economic.roe2024 > 8 ? 'warning' : 'danger'
    },
    {
      title: 'PFN 2024',
      value: formatCurrency(kpis.financial.pfn2024),
      trend: kpis.financial.pfn2024 < 0 ? 'up' : 'down',
      description: kpis.financial.pfn2024 < 0 ? 'Cash Positive' : 'Indebitamento netto',
      icon: 'fa-balance-scale',
      color: kpis.financial.pfn2024 < 0 ? 'success' : 'warning'
    },
    {
      title: 'Patrimonio Netto',
      value: formatCurrency(kpis.patrimonial.patrimonioNetto2024),
      trend: 'up',
      description: `+${formatPercent(kpis.patrimonial.patrimonioNettoVariation)} vs 2023`,
      icon: 'fa-building',
      color: 'success'
    }
  ]

  // CCII Compliance Indicators
  const cciiStatus = Object.entries(cciiIndicators).map(([key, data]) => ({
    indicator: key.replace(/([A-Z])/g, ' $1').trim(),
    value: typeof data.value === 'number' ? formatCurrency(data.value) : data.value,
    status: data.status,
    threshold: data.threshold,
    notes: data.notes
  }))

  return (
    <DashboardLayout
      title="Dashboard Esecutiva CDA"
      subtitle={`Monitoraggio strategico ${company.name}`}
    >
      {/* Executive Summary */}
      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, var(--white) 0%, #f0f4f8 100%)' }}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <i className="fas fa-info-circle me-2"></i>
                Executive Summary CDA
              </h4>
              <p className="mb-2">
                Sintesi dell'analisi strategica per <strong>{company.name}</strong> ({company.sector})
                aggiornata al <strong>{company.reportDate}</strong>.
              </p>
              <p className="mb-0">
                L'azienda presenta un <strong>profilo di rischio {irp.categoryLabel.toLowerCase()}</strong> (IRP {irp.score.toFixed(1)}/100)
                con {kpis.financial.pfn2024 < 0 ? 'eccellente solidità finanziaria (cash positive)' : 'posizione finanziaria sotto controllo'}
                e redditività {kpis.economic.roe2024 > 15 ? 'eccellente' : kpis.economic.roe2024 > 8 ? 'buona' : 'da migliorare'} (ROE {formatPercent(kpis.economic.roe2024)}).
              </p>
            </div>
            <div className="col-lg-4 text-center mt-3 mt-lg-0">
              <h6 className="card-title-small mb-2">IRP Score</h6>
              <div className={`irp-score-circle risk-${irp.score >= 70 ? 'low' : irp.score >= 50 ? 'medium' : 'high'}`}>
                <span className="irp-score-value">{irp.score.toFixed(0)}</span>
                <span className="irp-score-max">/ 100</span>
              </div>
              <div className="irp-category-text">
                <span className={`status-badge bg-${irp.score >= 70 ? 'success' : irp.score >= 50 ? 'warning' : 'danger'}`}>
                  {irp.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive KPIs Grid */}
      <h2 className="section-title">
        <i className="fas fa-tachometer-alt"></i>
        KPI Strategici
      </h2>

      <div className="row">
        {executiveKPIs.map((kpi, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className={`kpi-card-v2 border-left-${kpi.color}`}>
              <div className="card-title-modern">{kpi.title}</div>
              <div className="kpi-value-modern">{kpi.value}</div>
              <div className={`kpi-trend-modern trend-${kpi.trend}`}>
                {kpi.trend === 'up' && <span className="trend-icon">▲</span>}
                {kpi.trend === 'down' && <span className="trend-icon">▼</span>}
                <span className="trend-value">{kpi.description}</span>
              </div>
              <i className={`fas ${kpi.icon} kpi-icon-modern-bg`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* SWOT Analysis for CDA */}
      <h2 className="section-title">
        <i className="fas fa-chess"></i>
        Analisi SWOT Strategica
      </h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
              <h5 className="mb-0">
                <i className="fas fa-check-circle me-2"></i>
                Strengths (Punti di Forza)
              </h5>
            </div>
            <div className="card-body">
              <ul className="small">
                {swot.strengths.map((strength, idx) => (
                  <li key={idx} className="mb-2">{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header" style={{ backgroundColor: 'var(--warning)', color: 'var(--dark)' }}>
              <h5 className="mb-0">
                <i className="fas fa-exclamation-circle me-2"></i>
                Weaknesses (Punti di Debolezza)
              </h5>
            </div>
            <div className="card-body">
              <ul className="small">
                {swot.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="mb-2">{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header" style={{ backgroundColor: 'var(--info)', color: 'var(--dark)' }}>
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2"></i>
                Opportunities (Opportunità)
              </h5>
            </div>
            <div className="card-body">
              <ul className="small">
                {swot.opportunities.map((opportunity, idx) => (
                  <li key={idx} className="mb-2">{opportunity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header" style={{ backgroundColor: 'var(--danger)', color: 'white' }}>
              <h5 className="mb-0">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Threats (Minacce)
              </h5>
            </div>
            <div className="card-body">
              <ul className="small">
                {swot.threats.map((threat, idx) => (
                  <li key={idx} className="mb-2">{threat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CCII Compliance */}
      <h2 className="section-title">
        <i className="fas fa-gavel"></i>
        Compliance CCII (Codice Crisi d'Impresa)
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Indicatore</th>
                  <th className="text-end">Valore 2024</th>
                  <th>Soglia CCII</th>
                  <th className="text-center">Status</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {cciiStatus.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.indicator}</strong></td>
                    <td className="text-end">{item.value}</td>
                    <td>{item.threshold}</td>
                    <td className="text-center">
                      <span className={`status-badge bg-${item.status === 'OK' ? 'success' : item.status === 'Attenzione' ? 'warning' : 'danger'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="small">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Key Actions for CDA */}
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-tasks me-2"></i>
          Azioni Prioritarie per il CDA
        </h5>
        <ol className="mb-0">
          <li className="mb-2">
            <strong>Ottimizzazione ciclo del circolante:</strong> Ridurre DSO da {kpis.workingCapital.dso2024} a &lt;150 giorni
            per liberare circa €320K di capitale circolante
          </li>
          <li className="mb-2">
            <strong>Riequilibrio rapporti fornitori:</strong> Normalizzare DPO da {kpis.workingCapital.dpo2024} a 90-120 giorni
            per migliorare le relazioni commerciali
          </li>
          <li className="mb-2">
            <strong>Consolidamento posizione patrimoniale:</strong> Mantenere il trend di crescita del patrimonio netto
            (+{formatPercent(kpis.patrimonial.patrimonioNettoVariation)})
          </li>
          <li className="mb-2">
            <strong>Preservazione solidità finanziaria:</strong> Mantenere la posizione cash positive (PFN {formatCurrency(kpis.financial.pfn2024)})
          </li>
          <li className="mb-0">
            <strong>Strategia di crescita:</strong> Sviluppare iniziative per incrementare i ricavi oltre il +{formatPercent(kpis.economic.ricaviVariation)} attuale
          </li>
        </ol>
      </div>

      {/* Footer Note */}
      <div className="card mt-4" style={{ borderLeft: '5px solid var(--primary)' }}>
        <div className="card-body">
          <p className="mb-0 small">
            <strong>Note:</strong> Questa dashboard fornisce una sintesi esecutiva per il Consiglio di Amministrazione basata sui dati finanziari
            consolidati al {company.reportDate}. Per approfondimenti dettagliati consultare le sezioni specifiche del report SCAN360.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
