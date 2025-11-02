import DashboardLayout from '../../components/DashboardLayout'
import financialData from '../../data/financial-data.json'
import './IRPDettaglio.css'

export default function IRPDettaglio() {
  const { irp } = financialData
  const irpScore = irp.score
  const category = irp.category
  const categoryLabel = irp.categoryLabel
  const riskLevel = irp.riskLevel

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

  const getRiskTextClass = () => {
    if (irpScore >= 71) return 'text-success'
    if (irpScore >= 51) return 'text-warning'
    return 'text-danger'
  }

  return (
    <DashboardLayout
      title="IRP - Indice di Rischio Ponderato"
      subtitle="Dettaglio del sistema di valutazione creditizia"
    >
      <h2 className="section-title" id="irp-detail">
        <i className="fas fa-shield-alt me-2"></i>
        Indice di Rischio Ponderato (IRP) - Dettaglio
      </h2>

      {/* Sezione Visuale IRP */}
      <section className={`irp-visual-section ${getRiskClass()}`} id="irp-summary-section">
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
              L'IRP Kitzanos (scala 0-100) offre una valutazione olistica dell'affidabilità.
            </p>
          </div>
          <div className="col-lg-7 order-lg-2 mb-4 mb-lg-0 text-center">
            <div className={`irp-score-circle ${getRiskClass()}`}>
              <span className="irp-score-value">{irpScore.toFixed(1)}</span>
              <span className="irp-score-max">/ 100</span>
            </div>
            <div className={`irp-category-text ${getRiskTextClass()} mt-2`}>
              {categoryLabel}{' '}
              <span className={`status-badge ${getRiskBadgeClass()}`}>{category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sintesi Calcolo */}
      <div className="card mb-4 report-section">
        <div className="card-header">
          <h5 className="mb-0">Sintesi Calcolo IRP</h5>
        </div>
        <div className="card-body">
          <p className="small">L'IRP integra quattro distinti modelli di valutazione del rischio.</p>
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Componente</th>
                  <th className="text-end">Valore Originale</th>
                  <th className="text-end">Punteggio Normalizzato</th>
                  <th>Peso</th>
                  <th className="text-end">Punteggio Ponderato</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <i className="fas fa-cogs text-primary me-2"></i>
                    Componente Primaria (CP)
                  </td>
                  <td className="text-end">-</td>
                  <td className="text-end score-cell text-success">{irp.components.componentePrimaria.score.toFixed(2)}</td>
                  <td>{(irp.components.componentePrimaria.weight * 100).toFixed(0)}%</td>
                  <td className="text-end weighted-score-cell">{irp.components.componentePrimaria.weighted.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <i className="fas fa-chart-bar text-danger me-2"></i>
                    Leanus Score
                  </td>
                  <td className="text-end">{irp.components.leanusScore.scoreOriginale.toFixed(2)} ("{irp.components.leanusScore.scoreLabel}")</td>
                  <td className="text-end score-cell text-success">{irp.components.leanusScore.scoreNormalizzato.toFixed(2)}</td>
                  <td>{(irp.components.leanusScore.weight * 100).toFixed(0)}%</td>
                  <td className="text-end weighted-score-cell">{irp.components.leanusScore.weighted.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <i className="fas fa-university text-success me-2"></i>
                    Rating MCC (PD)
                  </td>
                  <td className="text-end">{irp.components.ratingMCC.pd}% (Fascia {irp.components.ratingMCC.fascia})</td>
                  <td className="text-end score-cell text-success">{irp.components.ratingMCC.scoreNormalizzato.toFixed(2)}</td>
                  <td>{(irp.components.ratingMCC.weight * 100).toFixed(0)}%</td>
                  <td className="text-end weighted-score-cell">{irp.components.ratingMCC.weighted.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <i className="fas fa-calculator text-success me-2"></i>
                    Z-Score di Altman
                  </td>
                  <td className="text-end">{irp.components.zScoreAltman.score.toFixed(2)} ("{irp.components.zScoreAltman.zona}")</td>
                  <td className="text-end score-cell text-success">{irp.components.zScoreAltman.scoreNormalizzato.toFixed(2)}</td>
                  <td>{(irp.components.zScoreAltman.weight * 100).toFixed(0)}%</td>
                  <td className="text-end weighted-score-cell">{irp.components.zScoreAltman.weighted.toFixed(2)}</td>
                </tr>
                <tr className="table-primary fw-bold">
                  <td>
                    <i className="fas fa-shield-alt me-2"></i>
                    Indice di Rischio Ponderato (IRP)
                  </td>
                  <td className="text-end"></td>
                  <td className="text-end"></td>
                  <td>100%</td>
                  <td className="text-end fs-5">{irpScore.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <small className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Fattore di aggiustamento applicato: {irp.adjustmentFactor}% ({irp.adjustmentReason})
                    </small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dettaglio Componenti */}
      <h3 className="section-title mt-5" id="component-details">
        <i className="fas fa-puzzle-piece me-2"></i>
        Dettaglio Componenti IRP
      </h3>

      <div className="row">
        {/* Componente Primaria */}
        <div className="col-lg-7 report-section">
          <div className="card component-card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                1. Componente Primaria (CP): <span className="fw-bold text-success">{irp.components.componentePrimaria.score.toFixed(2)}</span>{' '}
                <span className="status-badge bg-success float-end">Rischio Basso</span>
              </h5>
            </div>
            <div className="card-body">
              <p className="small">Media ponderata di 6 indicatori finanziari chiave.</p>
              <div className="table-responsive">
                <table className="table table-sm table-hover small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Indicatore</th>
                      <th className="text-end">Valore</th>
                      <th className="text-end">Punteggio</th>
                      <th>Peso</th>
                      <th className="text-end">Ponderato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(irp.components.componentePrimaria.indicators).map(([key, indicator]) => (
                      <tr key={key}>
                        <td>
                          <small>
                            {key === 'pfnEbitda' ? 'PFN/EBITDA' :
                             key === 'ebitOf' ? 'EBIT/OF' :
                             key === 'cicloCir' ? 'Ciclo Circ.' :
                             key === 'ebitdaRicavi' ? 'EBITDA/Ricavi' :
                             key === 'copAttivoFisso' ? 'Cop. Att. Fisso' :
                             key === 'dscr' ? 'DSCR' : key}
                          </small>
                        </td>
                        <td className="text-end">
                          {typeof indicator.value === 'number' ?
                            (key === 'ebitdaRicavi' ? `${indicator.value}%` :
                             key === 'cicloCir' ? `${indicator.value} gg` :
                             indicator.value.toFixed(2)) :
                            indicator.value}
                        </td>
                        <td className={`text-end ${indicator.score >= 70 ? 'text-success' : indicator.score >= 50 ? 'text-warning' : 'text-danger'}`}>
                          {indicator.score.toFixed(2)}
                        </td>
                        <td>{(indicator.weight * 100).toFixed(0)}%</td>
                        <td className="text-end">{indicator.weighted.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="border-top fw-bold">
                      <td colSpan="4">Punteggio CP Finale</td>
                      <td className="text-end">{irp.components.componentePrimaria.score.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Leanus Score */}
        <div className="col-lg-5 report-section">
          <div className="card component-card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                2. Leanus Score Norm.: <span className="fw-bold text-success">{irp.components.leanusScore.scoreNormalizzato.toFixed(2)}</span>{' '}
                <span className="status-badge bg-success float-end">Rischio Basso</span>
              </h5>
            </div>
            <div className="card-body">
              <p className="small mb-1">
                Score Originale: <strong>{irp.components.leanusScore.scoreOriginale.toFixed(2)} ("{irp.components.leanusScore.scoreLabel}")</strong>
              </p>
              <label className="small fw-bold">Posizionamento Scala Leanus (-40/+40)</label>
              <div className="leanus-scale mb-1">
                <div className="leanus-marker" style={{ left: `calc(50% + (${irp.components.leanusScore.scoreOriginale} / 80 * 100%))` }}></div>
                <div className="leanus-marker-label" style={{ left: `calc(50% + (${irp.components.leanusScore.scoreOriginale} / 80 * 100%))` }}>
                  {irp.components.leanusScore.scoreOriginale.toFixed(2)}
                </div>
              </div>
              <div className="leanus-scale-labels">
                <span>-40</span>
                <span>0</span>
                <span>+40</span>
              </div>
              <p className="small mt-3 mb-1">
                Normalizzazione 0-100: {irp.components.leanusScore.scoreNormalizzato.toFixed(2)}.
              </p>
              <div className="alert alert-success small p-2 mt-2 mb-0">
                <i className="fas fa-check-circle me-1"></i>
                Classificazione Leanus: "{irp.components.leanusScore.scoreLabel.toUpperCase()}" - L'azienda presenta indicatori di solidità e performance economico-finanziaria positivi, senza significative aree di criticità.
              </div>
            </div>
          </div>
        </div>

        {/* Rating MCC */}
        <div className="col-lg-5 report-section">
          <div className="card component-card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                3. Rating MCC (PD): <span className="fw-bold text-success">{irp.components.ratingMCC.scoreNormalizzato.toFixed(2)}</span>{' '}
                <span className="status-badge bg-success float-end">Rischio Basso</span>
              </h5>
            </div>
            <div className="card-body">
              <p className="small">
                PD: <strong>{irp.components.ratingMCC.pd}%</strong> | MCC: <strong>FASCIA "{irp.components.ratingMCC.fascia}"</strong>.
              </p>
              <p className="small">
                Conversione Score (80 + (2 - PD) × 10): {irp.components.ratingMCC.scoreNormalizzato.toFixed(2)}.
              </p>
              <div className="alert alert-success small p-2 mt-2 mb-0">
                <i className="fas fa-check-circle me-1"></i>
                Probabilità di default molto contenuta, con collocazione nella fascia 1%-2%. Indicativa di un profilo di rischio creditizio solido e di un'elevata capacità di far fronte agli impegni finanziari.
              </div>
            </div>
          </div>
        </div>

        {/* Z-Score Altman */}
        <div className="col-lg-7 report-section">
          <div className="card component-card h-100">
            <div className="card-header">
              <h5 className="mb-0">
                4. Z-Score di Altman Norm.: <span className="fw-bold text-success">{irp.components.zScoreAltman.scoreNormalizzato.toFixed(2)}</span>{' '}
                <span className="status-badge bg-success float-end">Rischio Minimo</span>
              </h5>
            </div>
            <div className="card-body">
              <p className="small">
                Z-Score Originale: <strong>{irp.components.zScoreAltman.score.toFixed(2)}</strong> (<span className="text-success">Zona Sicura</span>)
              </p>
              <label className="small fw-bold">Posizionamento Z-Score</label>

              {/* Visualizzazione Scala Z-Score */}
              <div className="zscore-scale-container">
                <div className="progress zscore-progress-bar">
                  <div className="progress-bar bg-danger" style={{ width: '40%' }} title="Alto Rischio (<1.81)"></div>
                  <div className="progress-bar bg-warning" style={{ width: '30%' }} title="Zona Grigia (1.81-2.99)"></div>
                  <div className="progress-bar bg-success" style={{ width: '30%' }} title="Zona Sicura (>2.99)"></div>
                </div>
                <div className="zscore-threshold-labels">
                  <span className="label-181">1.81</span>
                  <span className="label-299">2.99</span>
                </div>
                <div className="zscore-indicator-dot zone-success" style={{ left: '90%' }} title={`Z-Score: ${irp.components.zScoreAltman.score.toFixed(2)}`}>
                  <span className="zscore-value-label">{irp.components.zScoreAltman.score.toFixed(2)}</span>
                </div>
              </div>

              <p className="small mt-3 mb-1">
                Normalizzazione (0-100): {irp.components.zScoreAltman.scoreNormalizzato.toFixed(2)}.
              </p>
              <div className="alert alert-success small p-2 mt-2 mb-0">
                <i className="fas fa-check-circle me-1"></i>
                Lo Z-Score di {irp.components.zScoreAltman.score.toFixed(2)} posiziona l'azienda ampiamente nella "zona sicura" (Z &gt; 2,99), indicando una solidità strutturale molto forte e una probabilità di insolvenza nei prossimi 12-24 mesi statisticamente trascurabile.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Valutazione Finale e Raccomandazioni */}
      <div className="card mb-4 report-section recommendation-card">
        <div className="card-header">
          <h5 className="mb-0">Valutazione Finale e Raccomandazioni Basate sull'IRP</h5>
        </div>
        <div className="card-body">
          <h6>Interpretazione IRP ({irpScore.toFixed(2)} - {categoryLabel})</h6>
          <p className="small">
            L'Indice di Rischio Ponderato (IRP) di {irpScore.toFixed(2)}/100 colloca RELIVE COMMUNICATION S.R.L. nella fascia di rischio {categoryLabel.toUpperCase()} (categoria {category}), evidenziando una solidità economico-finanziaria adeguata, con alcuni punti di forza significativi ma anche aree di potenziale miglioramento che meritano attenzione.
          </p>

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="alert alert-success small p-2 h-100">
                <h6>
                  <i className="fas fa-check-circle me-1"></i> Punti Forza IRP
                </h6>
                <ul className="mb-0 ps-3">
                  <li>Eccellente solidità patrimoniale (PN €234.134, +69,23%)</li>
                  <li>Buona marginalità operativa (EBITDA 9,91% dei ricavi)</li>
                  <li>Assenza di debiti finanziari al 31/12/2024</li>
                  <li>Posizione finanziaria netta positiva (€-56.948)</li>
                  <li>ROE e ROI eccellenti (40,91% e 53,26% rispettivamente)</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="alert alert-danger small p-2 h-100">
                <h6>
                  <i className="fas fa-exclamation-triangle me-1"></i> Aree Criticità IRP
                </h6>
                <ul className="mb-0 ps-3">
                  <li>Tempi di incasso clienti eccessivi (DSO 262 giorni)</li>
                  <li>Ciclo del circolante elevato (119 giorni)</li>
                  <li>Tempi di pagamento fornitori elevati (DPO 222 giorni)</li>
                  <li>Crescita limitata dei ricavi (+1,64%)</li>
                  <li>Incremento significativo dei costi fissi (+22,4%)</li>
                </ul>
              </div>
            </div>
          </div>

          <h6 className="mt-4">Raccomandazioni Operative</h6>
          <ol className="small">
            <li>
              <strong>Gestione dei crediti commerciali:</strong> Implementazione di politiche di credit management più efficaci per ridurre i giorni di incasso clienti (DSO), con obiettivo di riduzione a 180 giorni. Impatto stimato: +3-5 punti IRP.
            </li>
            <li>
              <strong>Ottimizzazione del capitale circolante:</strong> Riequilibrare progressivamente i tempi di pagamento verso valori fisiologici (90-120 giorni) e sviluppare relazioni di partnership con i fornitori strategici. Impatto stimato: +1-2 punti IRP.
            </li>
            <li>
              <strong>Controllo dei costi fissi:</strong> Implementazione di un sistema di budgeting e controllo per allineare la crescita dei costi fissi con quella dei ricavi e recuperare efficienza operativa. Impatto stimato: +0,5-1 punto IRP.
            </li>
            <li>
              <strong>Sviluppo commerciale:</strong> Definizione di una strategia di crescita focalizzata sul cross-selling verso la clientela esistente e sullo sviluppo di servizi ad alto valore aggiunto. Impatto stimato: +1-2,5 punti IRP.
            </li>
            <li>
              <strong>Struttura finanziaria:</strong> Valutazione dell'opportunità di introdurre un moderato livello di leva finanziaria per supportare investimenti in crescita, mantenendo un rapporto PFN/EBITDA inferiore a 1x. Impatto stimato: +0,5-1,5 punti IRP.
            </li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  )
}
