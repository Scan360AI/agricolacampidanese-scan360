import DashboardLayout from '../../components/DashboardLayout'
import financialData from '../../data/financial-data.json'
import './IRPDettaglio.css'

export default function Parte1Sintesi() {
  const { company, irp, kpis, swot, cciiIndicators } = financialData
  const irpScore = irp.score

  // Determine colors based on risk level
  const getRiskClass = () => {
    if (irpScore >= 71) return 'risk-low'
    if (irpScore >= 51) return 'risk-medium'
    return 'risk-high'
  }

  const getRiskBadgeClass = () => {
    if (irpScore >= 71) return 'bg-success'
    if (irpScore >= 51) return 'bg-warning text-dark'
    return 'bg-danger'
  }

  const formatCurrency = (value) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <DashboardLayout
      title="Parte 1: Profilo Aziendale e Sintesi"
      subtitle="Panoramica generale e indicatori chiave"
    >
      {/* Alert Box Introduttiva */}
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Sintesi Esecutiva
        </h5>
        <p>
          Questa sezione fornisce una panoramica sintetica del profilo aziendale, dei principali indicatori economico-finanziari e dell'Indice di Rischio Ponderato (IRP).
        </p>
      </div>

      {/* Profilo Aziendale */}
      <h2 className="section-title">
        <i className="fas fa-building me-2"></i>
        1.1 PROFILO AZIENDALE
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 style={{ color: 'var(--primary)', marginBottom: '20px', fontWeight: 600 }}>
            {company.name}
          </h5>

          <div className="row">
            <div className="col-md-6">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="mb-2">
                  <i className="fas fa-industry fa-fw me-2" style={{ color: 'var(--primary)' }}></i>
                  <strong>Settore:</strong> {company.sector}
                </li>
                <li className="mb-2">
                  <i className="fas fa-calendar fa-fw me-2" style={{ color: 'var(--primary)' }}></i>
                  <strong>Esercizio di riferimento:</strong> {company.fiscalYear}
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li className="mb-2">
                  <i className="fas fa-file-alt fa-fw me-2" style={{ color: 'var(--primary)' }}></i>
                  <strong>Data Report:</strong> {company.reportDate}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione IRP Visuale */}
      <h2 className="section-title">
        <i className="fas fa-shield-alt me-2"></i>
        1.2 INDICE DI RISCHIO PONDERATO (IRP)
      </h2>

      <section className={`irp-visual-section ${getRiskClass()} mb-4`}>
        <h4 className="irp-main-title text-center">Valutazione Complessiva del Rischio</h4>
        <div className="row align-items-center">
          <div className="col-lg-5 order-lg-1">
            <h6 className="text-center text-md-start">Posizionamento sulla Scala di Rischio</h6>
            <div className="irp-gradient-bar-container">
              <div className="irp-gradient-bar">
                <div className="irp-marker" style={{ left: `${irpScore}%` }} title={`IRP: ${irpScore}`}></div>
              </div>
              <div className="d-flex justify-content-between irp-scale-labels mt-1">
                <span>0 (Alto)</span>
                <span>50</span>
                <span>75</span>
                <span>100 (Basso)</span>
              </div>
            </div>
            <p className="small text-muted mt-3">
              L'IRP Kitzanos (scala 0-100) offre una valutazione olistica dell'affidabilità creditizia basata su 4 componenti principali.
            </p>
          </div>
          <div className="col-lg-7 order-lg-2 mb-4 mb-lg-0 text-center">
            <div className={`irp-score-circle ${getRiskClass()}`}>
              <span className="irp-score-value">{irpScore.toFixed(1)}</span>
              <span className="irp-score-max">/ 100</span>
            </div>
            <div className={`irp-category-text mt-2 ${irpScore >= 71 ? 'text-success' : irpScore >= 51 ? 'text-warning' : 'text-danger'}`}>
              {irp.categoryLabel}{' '}
              <span className={`status-badge ${getRiskBadgeClass()}`}>{irp.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Indicatori Chiave */}
      <h2 className="section-title">
        <i className="fas fa-chart-line me-2"></i>
        1.3 INDICATORI CHIAVE 2024
      </h2>

      <div className="row">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Ricavi</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.economic.ricavi2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.ricaviVariation > 0 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">{kpis.economic.ricaviVariation > 0 ? '▲' : '▼'}</span>
              <span className="trend-value">{formatPercent(kpis.economic.ricaviVariation)}</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-chart-line kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">EBITDA</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.economic.ebitda2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.ebitdaVariation > 0 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">{kpis.economic.ebitdaVariation > 0 ? '▲' : '▼'}</span>
              <span className="trend-value">{formatPercent(kpis.economic.ebitdaVariation)}</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-coins kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Utile Netto</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.economic.utileNetto2024)}</div>
            <div className={`kpi-trend-modern ${kpis.economic.utileNettoVariation > 0 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">{kpis.economic.utileNettoVariation > 0 ? '▲' : '▼'}</span>
              <span className="trend-value">{formatPercent(kpis.economic.utileNettoVariation)}</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-hand-holding-usd kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">Patrimonio Netto</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.patrimonial.patrimonioNetto2024)}</div>
            <div className={`kpi-trend-modern ${kpis.patrimonial.patrimonioNettoVariation > 0 ? 'trend-up' : 'trend-down'}`}>
              <span className="trend-icon">{kpis.patrimonial.patrimonioNettoVariation > 0 ? '▲' : '▼'}</span>
              <span className="trend-value">{formatPercent(kpis.patrimonial.patrimonioNettoVariation)}</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-landmark kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">EBITDA Margin</div>
            <div className="kpi-value-modern">{kpis.economic.ebitdaMargin2024.toFixed(2)}%</div>
            <div className="kpi-description-modern">Marginalità operativa</div>
            <i className="fas fa-percentage kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">ROE</div>
            <div className="kpi-value-modern">{kpis.economic.roe2024.toFixed(2)}%</div>
            <div className="kpi-description-modern">Redditività del capitale proprio</div>
            <i className="fas fa-chart-pie kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">ROI</div>
            <div className="kpi-value-modern">{kpis.economic.roi2024.toFixed(2)}%</div>
            <div className="kpi-description-modern">Redditività degli investimenti</div>
            <i className="fas fa-chart-area kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Liquidità</div>
            <div className="kpi-value-modern">{formatCurrency(kpis.financial.liquidita2024)}</div>
            <div className="kpi-description-modern">Disponibilità liquide</div>
            <i className="fas fa-wallet kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      {/* Analisi SWOT */}
      <h2 className="section-title">
        <i className="fas fa-chess me-2"></i>
        1.4 ANALISI SWOT
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="alert-box alert-success">
            <h5>
              <i className="fas fa-plus-circle me-2"></i>
              Punti di Forza (Strengths)
            </h5>
            <ul>
              {swot.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-danger">
            <h5>
              <i className="fas fa-minus-circle me-2"></i>
              Punti di Debolezza (Weaknesses)
            </h5>
            <ul>
              {swot.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-info">
            <h5>
              <i className="fas fa-lightbulb me-2"></i>
              Opportunità (Opportunities)
            </h5>
            <ul>
              {swot.opportunities.map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-warning">
            <h5>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Minacce (Threats)
            </h5>
            <ul>
              {swot.threats.map((threat, index) => (
                <li key={index}>{threat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Indicatori CCII */}
      <h2 className="section-title">
        <i className="fas fa-check-circle me-2"></i>
        1.5 INDICATORI CCII - CONFORMITÀ ALLA CRISI D'IMPRESA
      </h2>

      <div className="card mb-4">
        <div className="card-body">
          <p className="small">
            Gli indicatori previsti dal Codice della Crisi d'Impresa e dell'Insolvenza (CCII) valutano la sostenibilità economico-finanziaria aziendale.
          </p>

          <div className="table-responsive">
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th>Indicatore</th>
                  <th className="text-end">Valore</th>
                  <th>Soglia</th>
                  <th>Status</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Patrimonio Netto</strong></td>
                  <td className="text-end">{formatCurrency(cciiIndicators.patrimonioNetto.value)}</td>
                  <td>{cciiIndicators.patrimonioNetto.threshold}</td>
                  <td>
                    <span className={`status-badge ${cciiIndicators.patrimonioNetto.status === 'OK' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {cciiIndicators.patrimonioNetto.status}
                    </span>
                  </td>
                  <td className="small">{cciiIndicators.patrimonioNetto.notes}</td>
                </tr>
                <tr>
                  <td><strong>PFN/EBITDA</strong></td>
                  <td className="text-end">{cciiIndicators.pfnEbitda.value}</td>
                  <td>{cciiIndicators.pfnEbitda.threshold}</td>
                  <td>
                    <span className={`status-badge ${cciiIndicators.pfnEbitda.status === 'OK' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {cciiIndicators.pfnEbitda.status}
                    </span>
                  </td>
                  <td className="small">{cciiIndicators.pfnEbitda.notes}</td>
                </tr>
                <tr>
                  <td><strong>DSCR</strong></td>
                  <td className="text-end">{cciiIndicators.dscr.value.toFixed(2)}</td>
                  <td>{cciiIndicators.dscr.threshold}</td>
                  <td>
                    <span className={`status-badge ${cciiIndicators.dscr.status === 'OK' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {cciiIndicators.dscr.status}
                    </span>
                  </td>
                  <td className="small">{cciiIndicators.dscr.notes}</td>
                </tr>
                <tr>
                  <td><strong>Liquidità/Attività Corrente</strong></td>
                  <td className="text-end">{cciiIndicators.liquiditaAttivitaCorrente.value.toFixed(2)}</td>
                  <td>{cciiIndicators.liquiditaAttivitaCorrente.threshold}</td>
                  <td>
                    <span className={`status-badge ${cciiIndicators.liquiditaAttivitaCorrente.status === 'OK' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {cciiIndicators.liquiditaAttivitaCorrente.status}
                    </span>
                  </td>
                  <td className="small">{cciiIndicators.liquiditaAttivitaCorrente.notes}</td>
                </tr>
                <tr>
                  <td><strong>PN/Attivo</strong></td>
                  <td className="text-end">{cciiIndicators.patrimonioNettoAttivo.value.toFixed(1)}%</td>
                  <td>{cciiIndicators.patrimonioNettoAttivo.threshold}</td>
                  <td>
                    <span className={`status-badge ${cciiIndicators.patrimonioNettoAttivo.status === 'OK' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {cciiIndicators.patrimonioNettoAttivo.status}
                    </span>
                  </td>
                  <td className="small">{cciiIndicators.patrimonioNettoAttivo.notes}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="alert alert-success small p-2 mt-3">
            <i className="fas fa-check-circle me-1"></i>
            <strong>Valutazione Complessiva CCII:</strong> L'azienda presenta una situazione complessivamente adeguata rispetto agli indicatori previsti dal CCII, con 4 indicatori su 5 in stato "OK" e 1 in "ATTENZIONE" ma in via di miglioramento.
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
