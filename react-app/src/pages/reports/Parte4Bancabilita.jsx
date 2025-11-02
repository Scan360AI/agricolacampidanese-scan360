import DashboardLayout from '../../components/DashboardLayout'
import financialData from '../../data/financial-data.json'

export default function Parte4Bancabilita() {
  const { irp, kpis, parte3, company } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const getRiskBadgeClass = () => {
    if (irp.score >= 71) return 'bg-success'
    if (irp.score >= 51) return 'bg-warning'
    return 'bg-danger'
  }

  return (
    <DashboardLayout
      title="Parte 4: Bancabilità e Sostenibilità del Debito"
      subtitle="Valutazione creditizia e capacità di rimborso"
    >
      {/* IRP Summary Section */}
      <div className="card mb-4" style={{
        background: 'linear-gradient(135deg, var(--white) 0%, #f0f4f8 100%)',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            <h6 className="card-title-small mb-3">
              <i className="fas fa-shield-alt me-1"></i> Indice Rischio Ponderato
            </h6>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #6bc571, #4CAF50)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              border: '6px solid rgba(255, 255, 255, 0.5)'
            }}>
              <span style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1', textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
                {irp.score.toFixed(1)}
              </span>
              <span style={{ fontSize: '0.9rem', opacity: '0.8', lineHeight: '1' }}>/ 100</span>
            </div>
            <div className="mt-2">
              <div style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--success)' }}>
                {irp.categoryLabel} <span className={`status-badge ${getRiskBadgeClass()}`}>{irp.category}</span>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h4 className="mb-3 fw-bold" style={{ color: 'var(--primary)' }}>Valutazione Generale</h4>
            <p className="mb-3">
              Profilo di rischio <strong>{irp.categoryLabel}</strong>. L'azienda presenta un'eccellente solidità
              patrimoniale, buona marginalità operativa e basso indebitamento finanziario.
            </p>

            <div className="border-top pt-3 mt-3">
              <h6 className="card-title-small mb-2">Altri Indicatori di Supporto:</h6>
              <div className="row">
                <div className="col-sm-6 mb-2">
                  <i className="fas fa-chart-bar text-success me-2"></i>
                  <strong>Leanus Score:</strong> {irp.components.leanusScore.scoreOriginale.toFixed(2)}
                  <span className="badge bg-success ms-1">Buono</span>
                </div>
                <div className="col-sm-6 mb-2">
                  <i className="fas fa-university text-success me-2"></i>
                  <strong>Rating MCC:</strong> Fascia {irp.components.ratingMCC.fascia}
                  <span className="badge bg-success ms-1">Buono</span>
                </div>
                <div className="col-sm-6 mb-2">
                  <i className="fas fa-calculator text-success me-2"></i>
                  <strong>Z-Score:</strong> {irp.components.zScoreAltman.score.toFixed(2)}
                  <span className="badge bg-success ms-1">{irp.components.zScoreAltman.zona}</span>
                </div>
                <div className="col-sm-6 mb-2">
                  <i className="fas fa-building text-success me-2"></i>
                  <strong>Business Cat.:</strong> <span className="badge bg-warning text-dark ms-1">STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creditworthiness Assessment */}
      <h2 className="section-title">4.1 Valutazione Sintetica della Bancabilità</h2>
      <div className="card mb-4">
        <div className="card-body">
          <p>
            {company.shortName} presenta un <strong>eccellente profilo di bancabilità</strong>,
            caratterizzato da una gestione particolarmente virtuosa dell'indebitamento. I dati al 12/2024
            evidenziano una <strong>Posizione Finanziaria Netta negativa</strong> di {formatCurrency(parte3.pfn.pfn[2])},
            con liquidità disponibile senza debiti finanziari.
          </p>

          <h6 className="mt-4">Evoluzione Indebitamento 2022-2024</h6>
          <div className="table-responsive">
            <table className="table table-sm table-striped">
              <thead className="table-light">
                <tr>
                  <th>Periodo</th>
                  <th className="text-end">Debiti Finanziari</th>
                  <th className="text-end">Liquidità</th>
                  <th className="text-end">PFN</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12/2022</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.debitiFinanziari[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.liquidita[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.pfn[0])}</td>
                  <td><span className="status-badge bg-success">Positivo</span></td>
                </tr>
                <tr>
                  <td>12/2023</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.debitiFinanziari[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.liquidita[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.pfn[1])}</td>
                  <td><span className="status-badge bg-warning">Temporaneo deterioramento</span></td>
                </tr>
                <tr>
                  <td>12/2024</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.debitiFinanziari[2])}</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.liquidita[2])}</td>
                  <td className="text-end">{formatCurrency(parte3.pfn.pfn[2])}</td>
                  <td><span className="status-badge bg-success">Netto miglioramento</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Debt Sustainability KPIs */}
      <h2 className="section-title">4.2 Indicatori di Sostenibilità del Debito</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">PFN/EBITDA 2024</div>
            <div className="kpi-value-modern">Cash Positive</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">Eccellente</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">DSCR 2024</div>
            <div className="kpi-value-modern">{kpis.financial.dscr2024.toFixed(2)}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">Ottimo (&gt;1.25)</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Debiti Finanziari</div>
            <div className="kpi-value-modern">€0</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">Azzerati</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">D/E Ratio</div>
            <div className="kpi-value-modern">0,00</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">Eccellente</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creditworthiness Factors */}
      <h2 className="section-title">4.3 Fattori di Bancabilità</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100" style={{ borderLeft: '4px solid var(--success)' }}>
            <div className="card-body">
              <h6 className="text-success mb-3">
                <i className="fas fa-check-circle me-2"></i>Punti di Forza
              </h6>
              <ul className="small mb-0">
                <li className="mb-2"><strong>PFN negativa (cash positive):</strong> €56.948 di liquidità netta</li>
                <li className="mb-2"><strong>EBITDA positivo:</strong> €102.108 nel 2024 (9,9% ricavi)</li>
                <li className="mb-2"><strong>DSCR eccellente:</strong> 8,60x capacità copertura debito</li>
                <li className="mb-2"><strong>ROE e ROI elevati:</strong> 40,91% e 53,26%</li>
                <li className="mb-2"><strong>Patrimonio netto:</strong> €234.134 (+69,2% vs 2023)</li>
                <li className="mb-2"><strong>Zero debiti finanziari:</strong> D/E 0,00</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100" style={{ borderLeft: '4px solid var(--warning)' }}>
            <div className="card-body">
              <h6 className="text-warning mb-3">
                <i className="fas fa-exclamation-triangle me-2"></i>Aree di Attenzione
              </h6>
              <ul className="small mb-0">
                <li className="mb-2"><strong>DSO elevato:</strong> 262 giorni incasso crediti</li>
                <li className="mb-2"><strong>Ciclo circolante lungo:</strong> 119 giorni totali</li>
                <li className="mb-2"><strong>Crescita ricavi moderata:</strong> +1,64% nel 2024</li>
                <li className="mb-2"><strong>Aumento costi fissi:</strong> +22,4% vs ricavi +1,64%</li>
                <li className="mb-2"><strong>DPO molto elevato:</strong> 222 giorni pagamento fornitori</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
        <div className="card-body">
          <h5 className="card-title">
            <i className="fas fa-check-circle text-success me-2"></i>
            Sintesi Valutazione Bancabilità
          </h5>
          <p className="mb-3">
            L'azienda presenta un <strong>profilo di bancabilità eccellente</strong>, caratterizzato da:
          </p>
          <div className="row">
            <div className="col-md-6">
              <ul className="mb-0 small">
                <li>Assenza totale di indebitamento finanziario</li>
                <li>Liquidità netta positiva per €56.948</li>
                <li>Capacità servizio debito ottima (DSCR 8,60x)</li>
                <li>Patrimonio netto in forte crescita (+141,7% triennio)</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="mb-0 small">
                <li>Redditività eccellente (ROE 40,91%, ROI 53,26%)</li>
                <li>EBITDA margin solido (9,9%)</li>
                <li>Rating IRP 78,50 (Categoria B - Basso Rischio)</li>
                <li>Posizionamento competitivo superiore settore</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 mb-0 small">
            <strong>Raccomandazione:</strong> L'azienda è pienamente bancabile con capacità di accesso al credito
            a condizioni favorevoli. L'unica area di miglioramento riguarda l'ottimizzazione del capitale circolante.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
