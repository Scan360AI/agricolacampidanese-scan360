import DashboardLayout from '../../components/DashboardLayout'
import financialData from '../../data/financial-data.json'

export default function Parte6RischiRaccomandazioni() {
  const { company, irp, swot } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const riskIndicators = [
    { name: 'Patrimonio Netto', y2022: '€96.884', y2023: '€138.351', y2024: '€234.134', trend: '↑', rating: 'Forte rafforzamento (+69,23%)', class: 'text-success' },
    { name: 'Indice di Autonomia Finanziaria', y2022: '14,9%', y2023: '20,1%', y2024: '27,3%', trend: '↑', rating: 'Miglioramento costante', class: 'text-success' },
    { name: 'Copertura Immobilizzazioni', y2022: '5,92', y2023: '5,35', y2024: '10,67', trend: '↑', rating: 'Eccellente', class: 'text-success' },
    { name: 'PFN/EBITDA', y2022: 'Negativo', y2023: '0,03', y2024: 'Negativo', trend: '↑', rating: 'Eccellente (cash positive)', class: 'text-success' },
    { name: 'Oneri Finanziari/Ricavi', y2022: '0,11%', y2023: '0,21%', y2024: '0,14%', trend: '↓↑', rating: 'Contenuto', class: 'text-success' },
    { name: 'Giorni Crediti Clienti', y2022: '209', y2023: '219', y2024: '262', trend: '↓', rating: 'Critico', class: 'text-danger' },
    { name: 'Giorni Debiti Fornitori', y2022: '202', y2023: '150', y2024: '222', trend: '↑', rating: 'Molto elevato', class: 'text-warning' },
    { name: 'Cash Flow Operativo/Ricavi', y2022: '1,42%', y2023: '-3,50%', y2024: '6,19%', trend: '↑', rating: 'Netto miglioramento', class: 'text-success' },
    { name: 'ROI', y2022: '113,84%', y2023: '67,88%', y2024: '53,26%', trend: '↓', rating: 'Eccellente nonostante il calo', class: 'text-success' }
  ]

  const redFlags = [
    { area: 'Crediti commerciali', signal: 'DSO estremamente elevato', value: '262 giorni (+43 gg vs 2023)', risk: 'Immobilizzazione di circa €492.468 di liquidità potenziale' },
    { area: 'Debiti fornitori', signal: 'DPO molto elevato', value: '222 giorni (+72 gg vs 2023)', risk: 'Tensioni nei rapporti con fornitori e potenziale perdita di condizioni favorevoli' },
    { area: 'Struttura costi', signal: 'Incremento costi fissi', value: '+22,4% vs ricavi +1,64%', risk: 'Perdita di efficienza operativa e riduzione marginalità' },
    { area: 'Ciclo circolante', signal: 'Ciclo complessivo in aumento', value: '119 giorni (+49 gg vs 2023)', risk: 'Assorbimento di capitale circolante e tensioni di liquidità' },
    { area: 'Fiscalità', signal: 'Volatilità della PTN', value: 'Da €106.706 a €24.311 (-77,21%)', risk: 'Potenziale impatto sulla pianificazione finanziaria' }
  ]

  const accountingAnomalies = [
    { area: 'Crediti commerciali', anomaly: 'Forte crescita rispetto ai ricavi', alert: '⚠️', note: '+21,80% crediti vs +1,64% ricavi' },
    { area: 'Ciclo del circolante', anomaly: 'Forte differenza DSO/DPO', alert: '⚠️', note: 'DSO 262 giorni vs DPO 222 giorni' },
    { area: 'Utile netto', anomaly: 'Forte crescita non proporzionale all\'EBIT', alert: '⚠️', note: '+131% vs EBIT -1,71%' },
    { area: 'Incidenza fiscale', anomaly: 'Riduzione drastica delle imposte', alert: '⚠️⚠️', note: '€242 nel 2024 vs €25.184 nel 2023' }
  ]

  const actionPlan = [
    {
      area: 'Gestione Crediti',
      icon: 'fa-exchange-alt',
      current: 'DSO: 262 giorni, €748.028',
      action: 'Implementare politiche di credit management più stringenti',
      effects: 'Riduzione DSO a 150 giorni: liberazione di €320.000 di liquidità',
      priority: 'Alta',
      priorityClass: 'bg-danger'
    },
    {
      area: 'Debiti Fornitori',
      icon: 'fa-boxes',
      current: 'DPO: 222 giorni, €421.125',
      action: 'Riequilibrare i rapporti con fornitori strategici',
      effects: 'Riduzione DPO a 180 giorni: impiego di €118.000 di liquidità',
      priority: 'Media',
      priorityClass: 'bg-warning text-dark'
    },
    {
      area: 'Capitale Circolante',
      icon: 'fa-sync-alt',
      current: 'CCN in forte crescita (+32,3%)',
      action: 'Ottimizzare la gestione complessiva del CCN con approccio integrato',
      effects: 'Riduzione del 15% del CCN: liberazione di €32.000 di liquidità',
      priority: 'Media',
      priorityClass: 'bg-warning text-dark'
    },
    {
      area: 'Immobilizzazioni',
      icon: 'fa-money-bill-wave',
      current: 'Bassa incidenza (2,6%) con trend decrescente (-15,2%)',
      action: 'Valutare investimenti strategici in tecnologie e infrastrutture digitali',
      effects: 'Incremento capacità produttiva, ROI atteso: 35%',
      priority: 'Media',
      priorityClass: 'bg-warning text-dark'
    },
    {
      area: 'Struttura Finanziaria',
      icon: 'fa-balance-scale',
      current: 'Ottima (PFN cash positive, zero debiti)',
      action: 'Valutare l\'opportunità di utilizzare moderata leva finanziaria per investimenti strategici',
      effects: 'Incremento redditività capitale proprio (ROE +5-8%)',
      priority: 'Bassa',
      priorityClass: 'bg-success'
    },
    {
      area: 'Liquidità',
      icon: 'fa-chart-pie',
      current: 'Consistente (€56.948)',
      action: 'Implementare strategie di cash management per ottimizzare rendimenti',
      effects: 'Rendimento addizionale: €1.700 annui',
      priority: 'Bassa',
      priorityClass: 'bg-success'
    }
  ]

  return (
    <DashboardLayout
      title="Parte 6: Analisi Rischi e Raccomandazioni"
      subtitle={`${company.name} - Rischi e Piano d'Azione`}
    >
      {/* Section 6: Risk Analysis */}
      <h2 className="section-title">
        <i className="fas fa-exclamation-triangle"></i>
        6. ANALISI DEI RISCHI
      </h2>

      {/* 6.1 Risk Indicators */}
      <div className="card mb-4">
        <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          <h5 className="mb-0">6.1 Indicatori di Rischio</h5>
        </div>
        <div className="card-body">
          <p>
            L'analisi del profilo di rischio di {company.name} si basa su un approccio integrato che
            considera molteplici dimensioni valutative. La tabella seguente sintetizza i principali
            indicatori di rischio valutati nel periodo di riferimento:
          </p>
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Indicatore</th>
                  <th className="text-end">12/2022</th>
                  <th className="text-end">12/2023</th>
                  <th className="text-end">12/2024</th>
                  <th className="text-center">Trend</th>
                  <th>Valutazione</th>
                </tr>
              </thead>
              <tbody>
                {riskIndicators.map((indicator, idx) => (
                  <tr key={idx}>
                    <td>{indicator.name}</td>
                    <td className="text-end">{indicator.y2022}</td>
                    <td className="text-end">{indicator.y2023}</td>
                    <td className="text-end">{indicator.y2024}</td>
                    <td className="text-center">{indicator.trend}</td>
                    <td className={indicator.class}>{indicator.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small mt-3">
            L'analisi evidenzia un profilo di rischio complessivamente contenuto, con indicatori patrimoniali
            e reddituali eccellenti. Si rilevano tuttavia criticità significative nella gestione del capitale
            circolante, con particolare riferimento ai giorni di incasso dei crediti commerciali.
          </p>
        </div>
      </div>

      {/* 6.2 Z-Score and Rating */}
      <div className="card mb-4">
        <div className="card-header" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
          <h5 className="mb-0">6.2 Z-Score e Rating</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm table-striped">
              <thead className="table-light">
                <tr>
                  <th>Indicatore</th>
                  <th className="text-end">12/2022</th>
                  <th className="text-end">12/2023</th>
                  <th className="text-end">12/2024</th>
                  <th>Interpretazione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Z-Score Altman</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end fw-bold">{irp.components.zScoreAltman.score.toFixed(2)}</td>
                  <td><span className="status-badge bg-success">Zona sicura</span></td>
                </tr>
                <tr>
                  <td>Probabilità di Default (MCC)</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end fw-bold">{irp.components.ratingMCC.pd.toFixed(2)}%</td>
                  <td><span className="status-badge bg-success">Rischio molto contenuto</span></td>
                </tr>
                <tr>
                  <td>Leanus Score</td>
                  <td className="text-end">2 - Buono</td>
                  <td className="text-end">3 - Discreto</td>
                  <td className="text-end fw-bold">2 - {irp.components.leanusScore.scoreLabel}</td>
                  <td><span className="status-badge bg-success">Recupero solidità</span></td>
                </tr>
                <tr>
                  <td>Rating MCC</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end fw-bold">Fascia "{irp.components.ratingMCC.fascia}"</td>
                  <td><span className="status-badge bg-success">Merito creditizio buono</span></td>
                </tr>
                <tr>
                  <td>IRP (Indice di Rischio Ponderato)</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end">n.d.</td>
                  <td className="text-end fw-bold">{irp.score.toFixed(2)}</td>
                  <td><span className="status-badge bg-success">Categoria {irp.category} ({irp.categoryLabel})</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <h6>Interpretazione</h6>
          <p>
            Lo Z-Score di Altman, calcolato sul bilancio dell'esercizio 2024, è pari a{' '}
            <strong>{irp.components.zScoreAltman.score.toFixed(2)}</strong>. Questo valore si colloca
            ampiamente nella "zona di sicurezza" secondo il modello di Altman (Z &gt; 2,99), indicando una
            bassissima probabilità di default.
          </p>
          <p>
            L'Indice di Rischio Ponderato (IRP) pari a <strong>{irp.score.toFixed(2)}</strong> posiziona
            l'azienda nella categoria di rischio {irp.category}, indicando un rischio {irp.categoryLabel.toLowerCase()}
            e una solidità adeguata.
          </p>
        </div>
      </div>

      {/* 6.3 Red Flags */}
      <div className="card mb-4">
        <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          <h5 className="mb-0">6.3 Red Flags e Segnali d'Allarme</h5>
        </div>
        <div className="card-body">
          <h6>Principali Red Flags Identificate (2024)</h6>
          <div className="table-responsive">
            <table className="table table-sm table-hover small">
              <thead className="table-light">
                <tr>
                  <th>Area</th>
                  <th>Segnale di Allarme</th>
                  <th>Valore/Trend</th>
                  <th>Rischio Potenziale</th>
                </tr>
              </thead>
              <tbody>
                {redFlags.map((flag, idx) => (
                  <tr key={idx}>
                    <td>{flag.area}</td>
                    <td>{flag.signal}</td>
                    <td>{flag.value}</td>
                    <td>{flag.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6.4 Accounting Manipulations Analysis */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">6.4 Analisi di Potenziali Manipolazioni Contabili</h5>
        </div>
        <div className="card-body small">
          <p>
            La verifica degli indicatori di qualità del bilancio non ha evidenziato segnali di manipolazioni
            contabili significative. Tuttavia, si rilevano alcuni aspetti meritevoli di attenzione:
          </p>
          <div className="table-responsive">
            <table className="table table-sm">
              <thead className="table-light">
                <tr>
                  <th>Area</th>
                  <th>Anomalia</th>
                  <th className="text-center">Valutazione</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {accountingAnomalies.map((anomaly, idx) => (
                  <tr key={idx}>
                    <td>{anomaly.area}</td>
                    <td>{anomaly.anomaly}</td>
                    <td className="text-center">{anomaly.alert}</td>
                    <td>{anomaly.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            <strong>Considerazioni:</strong> L'analisi di questi elementi non porta a concludere la presenza
            di manipolazioni contabili, ma suggerisce la necessità di un monitoraggio attento della qualità
            del bilancio e dell'evoluzione degli indicatori economico-finanziari, in particolare per quanto
            riguarda la gestione fiscale che presenta variazioni significative difficilmente ripetibili nei
            prossimi esercizi.
          </p>
        </div>
      </div>

      {/* 6.5 Sensitivity Analysis */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">6.5 Analisi di Sensitività</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm table-striped">
              <thead className="table-light">
                <tr>
                  <th>Parametro</th>
                  <th>Valore Critico</th>
                  <th>Interpretazione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Variazione Ricavi che rende l'EBIT = 0</td>
                  <td>-23,81%</td>
                  <td className="text-success">Buon margine di sicurezza</td>
                </tr>
                <tr>
                  <td>Variazione Costi Fissi che rende l'EBIT = 0</td>
                  <td>+32,08%</td>
                  <td className="text-success">Buona capacità di assorbire incrementi nei costi fissi</td>
                </tr>
                <tr>
                  <td>Variazione Crediti Clienti che azzera la Liquidità</td>
                  <td>+20 giorni</td>
                  <td className="text-warning">Moderata sensibilità a variazioni DSO</td>
                </tr>
                <tr>
                  <td>Variazione Rimanenze che annulla il Patrimonio Netto</td>
                  <td>-9.822 giorni</td>
                  <td className="text-success">Eccellente copertura patrimoniale</td>
                </tr>
                <tr>
                  <td>Variazione Debiti Fornitori che azzera la Liquidità</td>
                  <td>-30 giorni</td>
                  <td className="text-warning">Moderata dipendenza dai termini di pagamento</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="alert alert-warning small mt-3">
            <i className="fas fa-exclamation-triangle me-1"></i>
            I risultati dell'analisi di sensitività mostrano che l'EBIT dell'azienda si azzererebbe in caso
            di riduzione dei ricavi del 23,81% o incremento dei costi fissi del 32,08%. Questi valori testimoniano
            un elevato grado di resilienza operativa. Tuttavia, l'azienda presenta una vulnerabilità nella
            gestione della liquidità a breve termine.
          </div>
        </div>
      </div>

      {/* 6.6 Stress Test Results */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">6.6 Risultati Stress Test</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive small">
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th>Test di Stress</th>
                  <th>Risultato</th>
                  <th className="text-center">Superamento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Variazione Ricavi che rende l'EBIT = 0</td>
                  <td>-23,81%</td>
                  <td className="text-center text-success">✓</td>
                </tr>
                <tr>
                  <td>Variazione Costi Fissi che rende l'EBIT = 0</td>
                  <td>+32,08%</td>
                  <td className="text-center text-success">✓</td>
                </tr>
                <tr>
                  <td>Variazione Crediti Clienti che azzera la Liquidità</td>
                  <td>+20 giorni</td>
                  <td className="text-center text-success">✓ (con riserva)</td>
                </tr>
                <tr>
                  <td>Variazione Rimanenze che annulla il Patrimonio Netto</td>
                  <td>-9.822 giorni</td>
                  <td className="text-center text-success">✓</td>
                </tr>
                <tr>
                  <td>Variazione Debiti Fornitori che azzera la Liquidità</td>
                  <td>-30 giorni</td>
                  <td className="text-center text-danger">✗</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small mt-3 mb-1">Si evidenziano inoltre le seguenti anomalie:</p>
          <ul className="small">
            <li>Giorni crediti clienti superiori a 120 (262 giorni)</li>
            <li>Giorni debiti fornitori superiori a 120 (222 giorni)</li>
          </ul>
          <p className="small mt-2">
            L'azienda ha superato <strong>4 test di stress su 5 (80%)</strong>, evidenziando una buona
            resilienza complessiva a condizioni avverse. La principale area di vulnerabilità è rappresentata
            dalla gestione del capitale circolante, mentre la struttura economica e patrimoniale presenta
            una buona solidità intrinseca.
          </p>
        </div>
      </div>

      {/* Section 7: Recommendations */}
      <h2 className="section-title mt-5">
        <i className="fas fa-lightbulb"></i>
        7. RACCOMANDAZIONI
      </h2>

      {/* 7.1 Action Plan */}
      <div className="card mb-4">
        <div className="card-header" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
          <h5 className="mb-0">7.1 Piano d'Azione e Raccomandazioni Operative</h5>
        </div>
        <div className="card-body">
          <p>
            Sulla base dell'analisi condotta, si delineano le seguenti raccomandazioni strategiche e
            operative per ottimizzare il profilo economico-finanziario di {company.name}:
          </p>
          <div className="table-responsive small">
            <table className="table table-sm table-hover">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '20%' }}>Area</th>
                  <th style={{ width: '25%' }}>Situazione Attuale</th>
                  <th style={{ width: '30%' }}>Azione Raccomandata</th>
                  <th style={{ width: '20%' }}>Effetti Previsti</th>
                  <th style={{ width: '5%' }} className="text-center">Priorità</th>
                </tr>
              </thead>
              <tbody>
                {actionPlan.map((action, idx) => (
                  <tr key={idx}>
                    <td>
                      <i className={`fas ${action.icon} me-1`}></i> {action.area}
                    </td>
                    <td dangerouslySetInnerHTML={{ __html: action.current.replace(/\n/g, '<br>') }}></td>
                    <td>{action.action}</td>
                    <td dangerouslySetInnerHTML={{ __html: action.effects.replace(/\n/g, '<br>') }}></td>
                    <td className="text-center">
                      <span className={`status-badge ${action.priorityClass}`}>{action.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7.3 Action Plan by Timeframe */}
      <div className="card mb-4">
        <div className="card-header" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
          <h5 className="mb-0">7.3 Piano d'Azione Articolato per Timeframe</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100" style={{ borderLeft: '4px solid var(--danger)' }}>
                <div className="card-body">
                  <h6 className="text-danger mb-3">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    Azioni Immediate (0-3 mesi)
                    <span className="status-badge bg-danger float-end">Alta</span>
                  </h6>
                  <ul className="small">
                    <li>Analisi dettagliata del portafoglio crediti con segmentazione per anzianità e rischiosità</li>
                    <li>Identificazione delle posizioni critiche e definizione di un piano di azione specifico per cliente</li>
                    <li>Ottimizzazione della tesoreria con pianificazione dettagliata dei flussi di cassa a 90 giorni</li>
                    <li>Revisione delle politiche commerciali con analisi della redditività per cliente</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card h-100" style={{ borderLeft: '4px solid var(--warning)' }}>
                <div className="card-body">
                  <h6 className="text-warning mb-3">
                    <i className="fas fa-clock me-2"></i>
                    Azioni a Breve Termine (3-12 mesi)
                    <span className="status-badge bg-warning text-dark float-end">Media</span>
                  </h6>
                  <ul className="small">
                    <li>Implementazione di un sistema di scoring clienti con limiti di fido interno</li>
                    <li>Digitalizzazione del ciclo attivo e passivo con sistemi di approvazione automatizzati</li>
                    <li>Sviluppo di reportistica periodica automatizzata per il monitoraggio dei KPI chiave</li>
                    <li>Implementazione di sistemi di reporting integrati con definizione di KPI specifici</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card h-100" style={{ borderLeft: '4px solid var(--success)' }}>
                <div className="card-body">
                  <h6 className="text-success mb-3">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Azioni a Medio-Lungo Termine (1-3 anni)
                    <span className="status-badge bg-success float-end">Bassa</span>
                  </h6>
                  <ul className="small">
                    <li>Valutazione di opportunità di crescita organica e per linee esterne</li>
                    <li>Definizione di un piano industriale pluriennale con analisi di potenziali diversificazioni</li>
                    <li>Revisione dell'organigramma aziendale con sviluppo di competenze specialistiche interne</li>
                    <li>Implementazione di sistemi incentivanti basati su KPI</li>
                    <li>Valutazione di operazioni straordinarie e pianificazione della distribuzione di dividendi</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card mb-4" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
        <div className="card-header" style={{ backgroundColor: 'var(--success)', color: 'white' }}>
          <h5 className="mb-0">
            <i className="fas fa-check-circle me-2"></i>
            Sintesi Interventi Prioritari
          </h5>
        </div>
        <div className="card-body">
          <p className="mb-3">
            L'implementazione di queste raccomandazioni consentirà all'azienda di ottimizzare il proprio
            profilo economico-finanziario, con un potenziale impatto positivo stimato in:
          </p>
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-success">Benefici Attesi:</h6>
              <ul className="small mb-0">
                <li><strong>€244.953</strong> di liberazione di capitale circolante</li>
                <li><strong>€50.000-70.000</strong> incremento redditività annua</li>
                <li>Riduzione DSO a <strong>150 giorni</strong> (-112 giorni)</li>
                <li>Normalizzazione DPO a <strong>90-120 giorni</strong></li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="text-success">Obiettivi Strategici:</h6>
              <ul className="small mb-0">
                <li>Miglioramento significativo degli indicatori di performance</li>
                <li>Riduzione dei fattori di rischio identificati</li>
                <li>Rafforzamento della posizione competitiva</li>
                <li>Ottimizzazione della struttura finanziaria</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
