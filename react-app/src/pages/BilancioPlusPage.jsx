import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'

export default function BilancioPlusPage() {
  const { company, kpis } = financialData

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

  // Main metrics evolution
  const evolutionData = [
    {
      metric: 'Ricavi',
      y2022: formatCurrency(kpis.economic.ricavi2022),
      y2023: formatCurrency(kpis.economic.ricavi2023),
      y2024: formatCurrency(kpis.economic.ricavi2024),
      variation: kpis.economic.ricaviVariation,
      class: kpis.economic.ricaviVariation > 0 ? 'text-success' : 'text-danger'
    },
    {
      metric: 'EBITDA',
      y2022: formatCurrency(kpis.economic.ebitda2022),
      y2023: formatCurrency(kpis.economic.ebitda2023),
      y2024: formatCurrency(kpis.economic.ebitda2024),
      variation: kpis.economic.ebitdaVariation,
      class: kpis.economic.ebitdaVariation > 0 ? 'text-success' : 'text-danger'
    },
    {
      metric: 'EBITDA Margin',
      y2022: formatPercent(kpis.economic.ebitdaMargin2022),
      y2023: formatPercent(kpis.economic.ebitdaMargin2023),
      y2024: formatPercent(kpis.economic.ebitdaMargin2024),
      variation: ((kpis.economic.ebitdaMargin2024 - kpis.economic.ebitdaMargin2023) / kpis.economic.ebitdaMargin2023 * 100),
      class: kpis.economic.ebitdaMargin2024 > kpis.economic.ebitdaMargin2023 ? 'text-success' : 'text-danger'
    },
    {
      metric: 'Patrimonio Netto',
      y2022: formatCurrency(kpis.patrimonial.patrimonioNetto2022),
      y2023: formatCurrency(kpis.patrimonial.patrimonioNetto2023),
      y2024: formatCurrency(kpis.patrimonial.patrimonioNetto2024),
      variation: kpis.patrimonial.patrimonioNettoVariation,
      class: 'text-success'
    },
    {
      metric: 'PFN',
      y2022: formatCurrency(kpis.financial.pfn2022),
      y2023: formatCurrency(kpis.financial.pfn2023),
      y2024: formatCurrency(kpis.financial.pfn2024),
      variation: null,
      class: kpis.financial.pfn2024 < 0 ? 'text-success' : 'text-warning'
    },
    {
      metric: 'Liquidità',
      y2022: formatCurrency(kpis.financial.liquidita2022),
      y2023: formatCurrency(kpis.financial.liquidita2023),
      y2024: formatCurrency(kpis.financial.liquidita2024),
      variation: ((kpis.financial.liquidita2024 - kpis.financial.liquidita2023) / kpis.financial.liquidita2023 * 100),
      class: kpis.financial.liquidita2024 > kpis.financial.liquidita2023 ? 'text-success' : 'text-danger'
    }
  ]

  return (
    <DashboardLayout
      title="Bilancio Plus"
      subtitle={`Analisi dettagliata bilancio ${company.name}`}
    >
      {/* Info Alert */}
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Bilancio Plus - Analisi Dettagliata
        </h5>
        <p style={{ marginBottom: 0 }}>
          Questa sezione offre un'analisi approfondita dell'evoluzione degli indicatori chiave di bilancio
          di <strong>{company.name}</strong> ({company.sector}) per il periodo 2022-2024.
          Report aggiornato al {company.reportDate}.
        </p>
      </div>

      {/* Evolution Table */}
      <h2 className="section-title">
        <i className="fas fa-chart-line"></i>
        Evoluzione Indicatori Chiave
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-light">
                <tr>
                  <th>Indicatore</th>
                  <th className="text-end">2022</th>
                  <th className="text-end">2023</th>
                  <th className="text-end">2024</th>
                  <th className="text-end">Variazione %</th>
                </tr>
              </thead>
              <tbody>
                {evolutionData.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.metric}</strong></td>
                    <td className="text-end">{row.y2022}</td>
                    <td className="text-end">{row.y2023}</td>
                    <td className="text-end value-highlight">{row.y2024}</td>
                    <td className={`text-end ${row.class}`}>
                      {row.variation !== null ? `${row.variation > 0 ? '+' : ''}${row.variation.toFixed(2)}%` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <h2 className="section-title">
        <i className="fas fa-th"></i>
        Sintesi KPI 2024
      </h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Ricavi 2024</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.economic.ricavi2024)}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">{kpis.economic.ricaviVariation > 0 ? '+' : ''}{formatPercent(kpis.economic.ricaviVariation)}</span>
              <span>vs 2023</span>
            </div>
            <div className="kpi-description-modern">
              Crescita del fatturato rispetto all'anno precedente
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className={`kpi-card-v2 ${kpis.economic.ebitdaVariation > 0 ? 'border-left-success' : 'border-left-warning'}`}>
            <div className="card-title-modern">EBITDA 2024</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.economic.ebitda2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.ebitdaVariation > 0 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">{kpis.economic.ebitdaVariation > 0 ? '▲' : '▼'}</span>
              <span className="trend-value">{kpis.economic.ebitdaVariation > 0 ? '+' : ''}{formatPercent(kpis.economic.ebitdaVariation)}</span>
              <span>Margin {formatPercent(kpis.economic.ebitdaMargin2024)}</span>
            </div>
            <div className="kpi-description-modern">
              Marginalità operativa lorda
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Patrimonio Netto</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.patrimonial.patrimonioNetto2024)}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+{formatPercent(kpis.patrimonial.patrimonioNettoVariation)}</span>
              <span>vs 2023</span>
            </div>
            <div className="kpi-description-modern">
              Forte rafforzamento della solidità patrimoniale
            </div>
          </div>
        </div>
      </div>

      {/* Financial Position */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">PFN 2024</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.financial.pfn2024)}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">✓</span>
              <span className="trend-value">Cash Positive</span>
            </div>
            <div className="kpi-description-modern">
              {kpis.financial.pfn2024 < 0 ? 'Posizione finanziaria netta positiva' : 'Indebitamento netto'}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Liquidità 2024</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.financial.liquidita2024)}</div>
            <div className={`kpi-trend-modern ${kpis.financial.liquidita2024 > kpis.financial.liquidita2023 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">{kpis.financial.liquidita2024 > kpis.financial.liquidita2023 ? '▲' : '▼'}</span>
              <span className="trend-value">
                {formatPercent(((kpis.financial.liquidita2024 - kpis.financial.liquidita2023) / kpis.financial.liquidita2023 * 100))}
              </span>
            </div>
            <div className="kpi-description-modern">
              Disponibilità liquide immediate
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Autonomia Finanziaria</div>
            <div className="kpi-value-modern">{formatPercent(kpis.patrimonial.indiceAutonomia2024)}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">
                +{(kpis.patrimonial.indiceAutonomia2024 - kpis.patrimonial.indiceAutonomia2023).toFixed(1)}pp
              </span>
            </div>
            <div className="kpi-description-modern">
              Indipendenza dai finanziamenti esterni
            </div>
          </div>
        </div>
      </div>

      {/* Profitability Indicators */}
      <h2 className="section-title">
        <i className="fas fa-percent"></i>
        Indicatori di Redditività 2024
      </h2>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">ROE</div>
            <div className="kpi-value-modern">{formatPercent(kpis.economic.roe2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.roe2024 > kpis.economic.roe2023 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-value">
                {kpis.economic.roe2024 > kpis.economic.roe2023 ? '▲' : '▼'} vs {formatPercent(kpis.economic.roe2023)} (2023)
              </span>
            </div>
            <div className="kpi-description-modern">
              Return on Equity - Redditività del capitale proprio
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">ROI</div>
            <div className="kpi-value-modern">{formatPercent(kpis.economic.roi2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.roi2024 > kpis.economic.roi2023 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-value">
                {kpis.economic.roi2024 > kpis.economic.roi2023 ? '▲' : '▼'} vs {formatPercent(kpis.economic.roi2023)} (2023)
              </span>
            </div>
            <div className="kpi-description-modern">
              Return on Investment - Redditività degli investimenti
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">ROS</div>
            <div className="kpi-value-modern">{formatPercent(kpis.economic.ros2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.ros2024 > kpis.economic.ros2023 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-value">
                {kpis.economic.ros2024 > kpis.economic.ros2023 ? '▲' : '▼'} vs {formatPercent(kpis.economic.ros2023)} (2023)
              </span>
            </div>
            <div className="kpi-description-modern">
              Return on Sales - Redditività delle vendite
            </div>
          </div>
        </div>
      </div>

      {/* Summary Alert */}
      <div className="alert-box alert-success mt-4">
        <h5>
          <i className="fas fa-check-circle me-2"></i>
          Punti di Forza Bilancio
        </h5>
        <ul>
          <li>Patrimonio netto in forte crescita (+{formatPercent(kpis.patrimonial.patrimonioNettoVariation)})</li>
          <li>Eccellente redditività del capitale proprio (ROE {formatPercent(kpis.economic.roe2024)})</li>
          <li>Posizione finanziaria netta {kpis.financial.pfn2024 < 0 ? 'cash positive' : 'sotto controllo'}</li>
          <li>Miglioramento costante dell'autonomia finanziaria ({formatPercent(kpis.patrimonial.indiceAutonomia2024)})</li>
        </ul>
      </div>
    </DashboardLayout>
  )
}
