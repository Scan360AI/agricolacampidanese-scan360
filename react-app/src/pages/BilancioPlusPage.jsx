import { useEffect, useRef } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'
import { Chart, registerables } from 'chart.js'

// Register Chart.js components
Chart.register(...registerables)

export default function BilancioPlusPage() {
  const { company, kpis } = financialData

  // Chart refs
  const ebitdaChartRef = useRef(null)
  const ebitdaMarginChartRef = useRef(null)
  const pfnEbitdaChartRef = useRef(null)
  const liquiditaChartRef = useRef(null)

  // Chart instances refs
  const ebitdaChartInstance = useRef(null)
  const ebitdaMarginChartInstance = useRef(null)
  const pfnEbitdaChartInstance = useRef(null)
  const liquiditaChartInstance = useRef(null)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatPercentage = (value) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'decimal',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value) + '%'
  }

  // Optimization data (matching the HTML)
  const currentData = {
    ricavi: 21213405,
    ebitda: 841748,
    ebitdaMargin: 3.97,
    ebit: 291055,
    utileNetto: 59803,
    patrimonioNetto: 755925,
    pfn: 5221254,
    liquidita: 24900,
    pfnEbitda: 6.20,
    levaDE: 6.94,
    cashFlowOperativo: 423899,
    dso: 47,
    dpo: 75,
    dio: 20,
    ccc: -8,
    leanusScore: 0.95,
    zScore: 2.93,
    probDefault: 3.62,
    irp: 51.92
  }

  const optimizedData = {
    ebitda: 1186000,
    ebitdaMargin: 5.59,
    ebit: 726000,
    pfnEbitda: 3.56,
    dscr: 1.22,
    liquidita: 2650000,
    coperturaImmobilizzazioni: 0.32,
    irp: 68
  }

  // Optimization proposals
  const optimizationProposals = [
    {
      voce: 'Capitalizzazione Costi',
      situazione: 'Costi R&D non capitalizzati',
      azione: 'Capitalizzazione costi sviluppo',
      effetto: 'Incremento EBITDA',
      impatto: '+€180K (EBITDA), +€180K (attivo)',
      principio: 'OIC 24, Art. 2426 c.c.'
    },
    {
      voce: 'Ammortamenti',
      situazione: '€370.271 (1,75% ric)',
      azione: 'Revisione aliquote e vita utile',
      effetto: 'Riduzione costi',
      impatto: '-€90K (costo)',
      principio: 'OIC 16, Art. 2426 c.c.'
    },
    {
      voce: 'Rimanenze',
      situazione: '€872.688 (+26,1%)',
      azione: 'Applicazione FIFO weighted average',
      effetto: 'Incremento valore',
      impatto: '+€65K (rim.)',
      principio: 'OIC 13, Art. 2426 c.c.'
    },
    {
      voce: 'Oneri Finanziari',
      situazione: '€391.786 (7,47% deb)',
      azione: 'Capitalizzazione interessi su investimenti',
      effetto: 'Riduzione oneri',
      impatto: '-€75K (costo)',
      principio: 'OIC 12, Art. 2425 c.c.'
    },
    {
      voce: 'Crediti Clienti',
      situazione: '47 giorni',
      azione: 'Factoring pro-soluto 30%',
      effetto: 'Incremento liquidità',
      impatto: '+€825K (liquidità)',
      principio: 'OIC 15'
    },
    {
      voce: 'Debiti Finanziari',
      situazione: '€5.246.154 (52,1% BT)',
      azione: 'Consolidamento debito MLT',
      effetto: 'Stabilizzazione struttura',
      impatto: '-€150K (oneri/anno)',
      principio: 'OIC 19'
    },
    {
      voce: 'Attivo Fisso',
      situazione: '€5.608.391',
      azione: 'Sale & leaseback immobili',
      effetto: 'Generazione liquidità',
      impatto: '+€1.8M (liquidità)',
      principio: 'OIC 16, OIC 12'
    }
  ]

  useEffect(() => {
    // Colors matching HTML
    const colorAttuale = 'rgba(74, 105, 189, 0.7)'
    const colorAttualeBorder = 'rgba(74, 105, 189, 1)'
    const colorOttimizzato = 'rgba(76, 175, 80, 0.7)'
    const colorOttimizzatoBorder = 'rgba(76, 175, 80, 1)'

    // Common chart options
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        }
      },
      animation: {
        duration: 400
      }
    }

    // EBITDA Chart
    if (ebitdaChartRef.current) {
      if (ebitdaChartInstance.current) {
        ebitdaChartInstance.current.destroy()
      }
      const ctx = ebitdaChartRef.current.getContext('2d')
      ebitdaChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Attuale (2024)', 'Post Ottimizzazione'],
          datasets: [{
            label: 'EBITDA (€)',
            data: [currentData.ebitda, optimizedData.ebitda],
            backgroundColor: [colorAttuale, colorOttimizzato],
            borderColor: [colorAttualeBorder, colorOttimizzatoBorder],
            borderWidth: 1
          }]
        },
        options: {
          ...barChartOptions,
          scales: {
            ...barChartOptions.scales,
            y: {
              ...barChartOptions.scales.y,
              ticks: {
                callback: function(value) {
                  return new Intl.NumberFormat('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(value)
                }
              }
            }
          },
          plugins: {
            ...barChartOptions.plugins,
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'EBITDA: ' + new Intl.NumberFormat('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(context.parsed.y)
                }
              }
            }
          }
        }
      })
    }

    // EBITDA Margin Chart
    if (ebitdaMarginChartRef.current) {
      if (ebitdaMarginChartInstance.current) {
        ebitdaMarginChartInstance.current.destroy()
      }
      const ctx = ebitdaMarginChartRef.current.getContext('2d')
      ebitdaMarginChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Attuale (2024)', 'Post Ottimizzazione'],
          datasets: [{
            label: 'EBITDA Margin (%)',
            data: [currentData.ebitdaMargin, optimizedData.ebitdaMargin],
            backgroundColor: [colorAttuale, colorOttimizzato],
            borderColor: [colorAttualeBorder, colorOttimizzatoBorder],
            borderWidth: 1
          }]
        },
        options: {
          ...barChartOptions,
          scales: {
            ...barChartOptions.scales,
            y: {
              ...barChartOptions.scales.y,
              suggestedMin: 0,
              ticks: {
                callback: function(value) {
                  return value.toFixed(1) + '%'
                }
              }
            }
          },
          plugins: {
            ...barChartOptions.plugins,
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'EBITDA Margin: ' + context.parsed.y.toFixed(2) + '%'
                }
              }
            }
          }
        }
      })
    }

    // PFN/EBITDA Chart
    if (pfnEbitdaChartRef.current) {
      if (pfnEbitdaChartInstance.current) {
        pfnEbitdaChartInstance.current.destroy()
      }
      const ctx = pfnEbitdaChartRef.current.getContext('2d')
      pfnEbitdaChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Attuale (2024)', 'Post Ottimizzazione'],
          datasets: [{
            label: 'PFN/EBITDA',
            data: [currentData.pfnEbitda, optimizedData.pfnEbitda],
            backgroundColor: [colorAttuale, colorOttimizzato],
            borderColor: [colorAttualeBorder, colorOttimizzatoBorder],
            borderWidth: 1
          }]
        },
        options: {
          ...barChartOptions,
          scales: {
            ...barChartOptions.scales,
            y: {
              ...barChartOptions.scales.y,
              title: {
                display: true,
                text: 'Ratio'
              },
              ticks: {
                callback: function(value) {
                  return value.toFixed(2) + 'x'
                }
              }
            }
          },
          plugins: {
            ...barChartOptions.plugins,
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'PFN/EBITDA: ' + context.parsed.y.toFixed(2) + 'x'
                }
              }
            }
          }
        }
      })
    }

    // Liquidità Chart
    if (liquiditaChartRef.current) {
      if (liquiditaChartInstance.current) {
        liquiditaChartInstance.current.destroy()
      }
      const ctx = liquiditaChartRef.current.getContext('2d')
      liquiditaChartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Attuale (2024)', 'Post Ottimizzazione'],
          datasets: [{
            label: 'Liquidità (€)',
            data: [currentData.liquidita, optimizedData.liquidita],
            backgroundColor: [colorAttuale, colorOttimizzato],
            borderColor: [colorAttualeBorder, colorOttimizzatoBorder],
            borderWidth: 1
          }]
        },
        options: {
          ...barChartOptions,
          scales: {
            ...barChartOptions.scales,
            y: {
              ...barChartOptions.scales.y,
              title: {
                display: true,
                text: 'Euro'
              },
              ticks: {
                callback: function(value) {
                  return new Intl.NumberFormat('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(value)
                }
              }
            }
          },
          plugins: {
            ...barChartOptions.plugins,
            tooltip: {
              callbacks: {
                label: function(context) {
                  return 'Liquidità: ' + new Intl.NumberFormat('it-IT', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  }).format(context.parsed.y)
                }
              }
            }
          }
        }
      })
    }

    // Cleanup
    return () => {
      if (ebitdaChartInstance.current) ebitdaChartInstance.current.destroy()
      if (ebitdaMarginChartInstance.current) ebitdaMarginChartInstance.current.destroy()
      if (pfnEbitdaChartInstance.current) pfnEbitdaChartInstance.current.destroy()
      if (liquiditaChartInstance.current) liquiditaChartInstance.current.destroy()
    }
  }, [currentData, optimizedData])

  return (
    <DashboardLayout
      title="Analisi Finanziaria e Proposte di Ottimizzazione (Bilancio Plus)"
      subtitle={`${company.name} | Dati non definitivi 2024`}
    >
      <h2 className="section-title">
        <i className="fas fa-magic me-2"></i>
        Analisi Finanziaria e Proposte di Ottimizzazione
      </h2>

      {/* Sezione 1: Premessa */}
      <div className="card mb-4 report-section">
        <div className="card-header">
          <h5 className="mb-0">1. Premessa sulla Definitività dei Dati 2024</h5>
        </div>
        <div className="card-body small">
          <p>
            L'analisi si basa sui dati del bilancio 2024 di AGRICOLA CAMPIDANESE SOC. COOP. che, come precisato,
            non sono definitivi. Questo aspetto è cruciale in quanto le proposte di ottimizzazione devono essere
            considerate come raccomandazioni applicabili in fase di chiusura definitiva del bilancio, nel pieno
            rispetto dei principi contabili e della normativa vigente.
          </p>
        </div>
      </div>

      {/* Sezione 2: Sintesi Situazione Attuale */}
      <div className="card mb-4 report-section" id="summary">
        <div className="card-header">
          <h5 className="mb-0">2. Sintesi della Situazione Attuale</h5>
        </div>
        <div className="card-body small">
          <div className="row">
            <div className="col-md-6">
              <h6 className="card-title-small">2.1 Profilo Economico</h6>
              <ul className="list-styled">
                <li><strong>Ricavi:</strong> {formatCurrency(currentData.ricavi)} (<span className="text-success">+2,88%</span> vs 2023)</li>
                <li><strong>EBITDA:</strong> {formatCurrency(currentData.ebitda)} (3,97% sui Ricavi) (<span className="text-success">+34,98%</span> vs 2023)</li>
                <li><strong>EBIT:</strong> {formatCurrency(currentData.ebit)} (1,37% sui Ricavi) (<span className="text-success">+41,47%</span> vs 2023)</li>
                <li><strong>Utile netto:</strong> {formatCurrency(currentData.utileNetto)} (0,28% sui Ricavi) (<span className="text-success">+204,02%</span> vs 2023)</li>
              </ul>
              <h6 className="card-title-small mt-3">2.2 Profilo Patrimoniale</h6>
              <ul className="list-styled">
                <li><strong>Patrimonio Netto:</strong> {formatCurrency(currentData.patrimonioNetto)} (<span className="text-success">+8,35%</span> vs 2023)</li>
                <li><strong>PFN:</strong> {formatCurrency(currentData.pfn)} (<span className="text-success">-6,15%</span> vs 2023)</li>
                <li><strong>Liquidità:</strong> {formatCurrency(currentData.liquidita)} (<span className="text-danger">-91,17%</span> vs 2023)</li>
                <li><strong>PFN/EBITDA:</strong> {currentData.pfnEbitda.toFixed(2)} (<span className="badge bg-danger">Critico</span>)</li>
                <li><strong>Leva (D/E):</strong> {currentData.levaDE.toFixed(2)} (<span className="badge bg-danger">Critico</span>)</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6 className="card-title-small">2.3 Profilo Finanziario</h6>
              <ul className="list-styled">
                <li><strong>Cash Flow Operativo:</strong> {formatCurrency(currentData.cashFlowOperativo)} (2,00% sui Ricavi) (<span className="badge bg-danger">Insufficiente</span>)</li>
                <li><strong>DSO:</strong> {currentData.dso} giorni (<span className="text-success">↓-35gg</span> vs 2023)</li>
                <li><strong>DPO:</strong> {currentData.dpo} giorni (<span className="text-danger">↓-37gg</span> vs 2023)</li>
                <li><strong>DIO:</strong> {currentData.dio} giorni (<span className="text-danger">↑+4gg</span> vs 2023)</li>
                <li><strong>CCC:</strong> {currentData.ccc} giorni (<span className="text-danger">↑+6gg</span> vs 2023)</li>
              </ul>
              <h6 className="card-title-small mt-3">2.4 Indicatori di Rischio e Rating</h6>
              <ul className="list-styled">
                <li><strong>Leanus Score:</strong> "5 - Negativo" ({currentData.leanusScore.toFixed(2)}) (<span className="text-danger">Critico</span>)</li>
                <li><strong>Z-Score di Altman:</strong> {currentData.zScore.toFixed(2)} (<span className="badge bg-warning text-dark">Zona Grigia</span>)</li>
                <li><strong>Prob. Default (MCC):</strong> {currentData.probDefault.toFixed(2)}% (<span className="badge bg-danger">FASCIA "3"</span>)</li>
                <li><strong>IRP:</strong> {currentData.irp.toFixed(2)} (<span className="badge bg-warning text-dark">Rischio MEDIO</span>)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione 3: Aree di Potenziale Ottimizzazione */}
      <div className="card mb-4 report-section" id="optimization-areas">
        <div className="card-header">
          <h5 className="mb-0">3. Analisi delle Aree di Potenziale Ottimizzazione</h5>
        </div>
        <div className="card-body small">
          <div className="row">
            <div className="col-md-4">
              <h6 className="card-title-small">3.1 Area Economica</h6>
              <ul className="list-styled">
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Marg. Contr.: 11,8% (<span className="text-danger">-2,61%</span>)</li>
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> EBITDA Margin: 3,97% (vs benchmark 8-12%)</li>
                <li><i className="fas fa-info-circle text-secondary me-1"></i> Costi Fissi: €1.85M (8,7%)</li>
                <li><i className="fas fa-info-circle text-secondary me-1"></i> Costo Personale: €1.76M (8,3%)</li>
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Oneri Fin.: €391.786 (7,47% sui debiti)</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="card-title-small">3.2 Area Patrimoniale</h6>
              <ul className="list-styled">
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Attivo Fisso Netto: €5.61M (&gt; PN)</li>
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Copertura Immobilizzazioni: 0,13</li>
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Patrimonio Netto: €755.9K (6,5% del passivo)</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="card-title-small">3.3 Area Finanziaria</h6>
              <ul className="list-styled">
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Liquidità: €24.900 (0,12% ricavi)</li>
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> DSCR: 0,548 (&lt; 1,0)</li>
                <li><i className="fas fa-exclamation-triangle text-danger me-1"></i> Var. Netta Cassa: -€257.144 (-1,21%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione 4: Ipotesi di Ottimizzazione */}
      <div className="card mb-4 report-section" id="optimization-proposals">
        <div className="card-header">
          <h5 className="mb-0">4. Ipotesi di Ottimizzazione del Bilancio 2024</h5>
        </div>
        <div className="card-body">
          <h6 className="card-title-small">4.1 Premessa Metodologica</h6>
          <p className="small">
            Le seguenti ipotesi sono formulate nel rispetto dei principi contabili, con l'obiettivo di
            migliorare/ottimizzare gli indici chiave mantenendo una rappresentazione veritiera.
          </p>

          <h6 className="card-title-small mt-4">4.2 Tabella Miglioramenti Proposti</h6>
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Voce/Indice</th>
                  <th>Situazione Attuale (2024)</th>
                  <th>Azione Suggerita</th>
                  <th>Effetto Previsto</th>
                  <th>Impatto Quantitativo</th>
                  <th>Principio/Norma</th>
                </tr>
              </thead>
              <tbody>
                {optimizationProposals.map((proposal, idx) => (
                  <tr key={idx}>
                    <td><strong>{proposal.voce}</strong></td>
                    <td>{proposal.situazione}</td>
                    <td>{proposal.azione}</td>
                    <td>{proposal.effetto}</td>
                    <td className="text-end">
                      <span className="text-success">{proposal.impatto}</span>
                    </td>
                    <td>{proposal.principio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sezione Grafici Impatto */}
          <h6 className="card-title-small mt-5">5.0 Visualizzazione Impatto Ottimizzazioni</h6>
          <div className="row">
            <div className="col-lg-6 col-md-6 mb-3">
              <h6 className="text-center small">Grafico 5.1: EBITDA (€) - Prima vs Dopo</h6>
              <div className="chart-container" style={{
                height: '280px',
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <canvas ref={ebitdaChartRef}></canvas>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-3">
              <h6 className="text-center small">Grafico 5.2: EBITDA Margin (%) - Prima vs Dopo</h6>
              <div className="chart-container" style={{
                height: '280px',
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <canvas ref={ebitdaMarginChartRef}></canvas>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-3">
              <h6 className="text-center small">Grafico 5.3: PFN/EBITDA - Prima vs Dopo</h6>
              <div className="chart-container" style={{
                height: '280px',
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <canvas ref={pfnEbitdaChartRef}></canvas>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mb-3">
              <h6 className="text-center small">Grafico 5.4: Liquidità (€) - Prima vs Dopo</h6>
              <div className="chart-container" style={{
                height: '280px',
                backgroundColor: '#ffffff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <canvas ref={liquiditaChartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Accordion con Motivazioni Dettagliate */}
          <h6 className="card-title-small mt-4">4.3 Motivazioni dei Miglioramenti Proposti (Dettaglio)</h6>
          <div className="accordion small" id="motivationsAccordion">
            {/* 4.3.1 Capitalizzazione Costi */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv1">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv1"
                  aria-expanded="false"
                  aria-controls="collapseMotiv1"
                >
                  4.3.1 Capitalizzazione Costi di Sviluppo
                </button>
              </h2>
              <div
                id="collapseMotiv1"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv1"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> Identificati costi R&D e sviluppo prodotti innovativi non capitalizzati per €180.000.<br />
                  <strong>Soluzione Proposta:</strong> Capitalizzazione dei costi di sviluppo prodotti innovativi e processi di trasformazione secondo OIC 24.<br />
                  <strong>Ratio/Logica:</strong> Applicare il principio della competenza economica (OIC 11), correlando i costi di sviluppo ai benefici futuri che genereranno. La capitalizzazione è possibile quando i progetti hanno utilità pluriennale dimostrata.<br />
                  <strong>Benefici Attesi:</strong> Incremento dell'attivo patrimoniale e miglioramento dell'EBITDA margin di 0,85 punti percentuali (<span className="text-success">impatto EBITDA +€180K</span>, <span className="text-success">impatto attivo +€180K</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 24, Art. 2426 c.c., n. 5.
                </div>
              </div>
            </div>

            {/* 4.3.2 Ammortamenti */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv2"
                  aria-expanded="false"
                  aria-controls="collapseMotiv2"
                >
                  4.3.2 Revisione Piani di Ammortamento
                </button>
              </h2>
              <div
                id="collapseMotiv2"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv2"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> Incidenza degli ammortamenti (€370.271) rappresenta l'1,75% dei ricavi, superiore alla media settoriale dell'1,5-1,7%.<br />
                  <strong>Soluzione Proposta:</strong> Revisione delle aliquote entro i limiti massimi OIC 16/24, allungamento vita utile per impianti di trasformazione da 8 a 10 anni, applicazione del criterio component approach per impianti complessi.<br />
                  <strong>Ratio/Logica:</strong> Allineare i piani di ammortamento alla reale vita utile economica dei beni, considerando l'effettivo utilizzo e le caratteristiche tecniche specifiche del settore agroalimentare.<br />
                  <strong>Benefici Attesi:</strong> Riduzione degli ammortamenti di €90.000, incremento EBIT di 0,42 punti percentuali, miglioramento PFN/EBITDA di 0,30x (<span className="text-success">impatto costo amm.ti -€90K</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 16, Art. 2426 c.c., n. 2.
                </div>
              </div>
            </div>

            {/* 4.3.3 Rimanenze */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv3"
                  aria-expanded="false"
                  aria-controls="collapseMotiv3"
                >
                  4.3.3 Ottimizzazione Valutazione Rimanenze
                </button>
              </h2>
              <div
                id="collapseMotiv3"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv3"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> Variazione rimanenze positiva (+€180.422) con fatturato stabile (+2,88%).<br />
                  <strong>Soluzione Proposta:</strong> Applicazione del metodo FIFO weighted average, revisione del fondo obsolescenza magazzino, valorizzazione al fair value per prodotti agricoli stagionali.<br />
                  <strong>Ratio/Logica:</strong> Ottimizzare la valutazione delle rimanenze per riflettere più accuratamente il valore effettivo delle scorte, considerando la natura stagionale dei prodotti ortofrutticoli.<br />
                  <strong>Benefici Attesi:</strong> Incremento del valore delle rimanenze di €65.000, miglioramento del margine lordo di 0,31 punti percentuali (<span className="text-success">impatto rimanenze +€65K</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 13, Art. 2426 c.c., n. 9.
                </div>
              </div>
            </div>

            {/* 4.3.4 Oneri Finanziari */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv4">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv4"
                  aria-expanded="false"
                  aria-controls="collapseMotiv4"
                >
                  4.3.4 Capitalizzazione Interessi su Investimenti
                </button>
              </h2>
              <div
                id="collapseMotiv4"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv4"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> Oneri finanziari elevati (€391.786, 7,47% del debito medio) che erodono significativamente la marginalità operativa.<br />
                  <strong>Soluzione Proposta:</strong> Capitalizzazione degli interessi relativi a finanziamenti utilizzati per investimenti in corso di realizzazione, secondo quanto previsto dall'OIC 16.<br />
                  <strong>Ratio/Logica:</strong> Gli oneri finanziari sostenuti per l'acquisizione di immobilizzazioni possono essere capitalizzati fino al momento in cui il bene è pronto per l'uso, come parte del costo di acquisizione.<br />
                  <strong>Benefici Attesi:</strong> Riduzione degli oneri finanziari a conto economico di circa €75.000, miglioramento della sostenibilità finanziaria e degli indicatori MCC (<span className="text-success">impatto oneri fin. -€75K</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 16, par. 41, Art. 2426 c.c.
                </div>
              </div>
            </div>

            {/* 4.3.5 Crediti */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv5">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv5"
                  aria-expanded="false"
                  aria-controls="collapseMotiv5"
                >
                  4.3.5 Factoring Pro-Soluto su Crediti
                </button>
              </h2>
              <div
                id="collapseMotiv5"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv5"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> Liquidità critica (€24.900, 0,12% dei ricavi) con rischio di insolvenza tecnica.<br />
                  <strong>Soluzione Proposta:</strong> Implementazione di operazioni di factoring pro-soluto sul 30% del portafoglio crediti per generare liquidità immediata.<br />
                  <strong>Ratio/Logica:</strong> Il factoring pro-soluto consente la cessione definitiva dei crediti con trasferimento del rischio di insolvenza, migliorando immediatamente la posizione di liquidità e riducendo l'esposizione creditizia.<br />
                  <strong>Benefici Attesi:</strong> Generazione di liquidità immediata per circa €825.000, miglioramento del ciclo del circolante, riduzione del rischio di credito (<span className="text-success">impatto liquidità +€825K</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 15 (derecognition dei crediti), Legge 52/1991.
                </div>
              </div>
            </div>

            {/* 4.3.6 Debiti Finanziari */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv6">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv6"
                  aria-expanded="false"
                  aria-controls="collapseMotiv6"
                >
                  4.3.6 Consolidamento Debito a Medio-Lungo Termine
                </button>
              </h2>
              <div
                id="collapseMotiv6"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv6"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> 52,1% del debito finanziario (€2.736.050) è a breve termine, creando un grave squilibrio strutturale fonti-impieghi.<br />
                  <strong>Soluzione Proposta:</strong> Negoziazione con gli istituti di credito per il consolidamento di almeno il 70% del debito a breve in finanziamenti a medio-lungo termine (5-7 anni).<br />
                  <strong>Ratio/Logica:</strong> Allineare la struttura temporale del debito con la natura degli investimenti, rispettando il principio di correlazione fonti-impieghi e riducendo il rischio di rifinanziamento.<br />
                  <strong>Benefici Attesi:</strong> Stabilizzazione della struttura finanziaria, riduzione degli oneri finanziari di circa €150.000 annui grazie a tassi più favorevoli, miglioramento del DSCR (<span className="text-success">riduzione oneri -€150K/anno</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 19, principi di finanza aziendale.
                </div>
              </div>
            </div>

            {/* 4.3.7 Sale & Leaseback */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingMotiv7">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMotiv7"
                  aria-expanded="false"
                  aria-controls="collapseMotiv7"
                >
                  4.3.7 Operazione Sale & Leaseback Immobili
                </button>
              </h2>
              <div
                id="collapseMotiv7"
                className="accordion-collapse collapse"
                aria-labelledby="headingMotiv7"
                data-bs-parent="#motivationsAccordion"
              >
                <div className="accordion-body">
                  <strong>Problematica:</strong> Attivo fisso (€5.608.391) coperto solo al 13% dal patrimonio netto, con grave squilibrio patrimoniale e immobilizzazione di risorse.<br />
                  <strong>Soluzione Proposta:</strong> Operazione di sale & leaseback su parte degli immobili di proprietà, con cessione a società di leasing e contestuale stipula di contratto di locazione finanziaria.<br />
                  <strong>Ratio/Logica:</strong> Liberare risorse finanziarie immobilizzate in asset fissi mantenendone la disponibilità operativa, migliorando la struttura patrimoniale e la liquidità immediata.<br />
                  <strong>Benefici Attesi:</strong> Generazione di liquidità immediata per €1,8 milioni, riduzione dell'attivo fisso, miglioramento degli indici di copertura patrimoniale (<span className="text-success">impatto liquidità +€1,8M</span>).<br />
                  <strong>Normativa Riferimento:</strong> OIC 16, OIC 12, IFRS 16 (per comparabilità internazionale).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione 6: Impatto Complessivo */}
      <div className="card mb-4 report-section" id="impact-summary">
        <div className="card-header">
          <h5 className="mb-0">6. Impatto Complessivo delle Ottimizzazioni Proposte</h5>
        </div>
        <div className="card-body small">
          <div className="row">
            <div className="col-md-4">
              <h6 className="card-title-small">6.1 Impatto Indici Economici</h6>
              <ul className="list-styled">
                <li><strong>EBITDA:</strong> <span className="text-success">~€1.186K</span> (da €841K, +41,0%)</li>
                <li><strong>EBITDA Margin:</strong> <span className="text-success">~5,59%</span> (da 3,97%)</li>
                <li><strong>EBIT:</strong> <span className="text-success">~€726K</span> (da €291K, +149,5%)</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="card-title-small">6.2 Impatto Indici Patrimoniali/Finanziari</h6>
              <ul className="list-styled">
                <li><strong>PFN/EBITDA:</strong> <span className="text-success">~3,56x</span> (da 6,20x)</li>
                <li><strong>DSCR:</strong> <span className="text-success">~1,22</span> (da 0,548)</li>
                <li><strong>Liquidità:</strong> <span className="text-success">~€2,65M</span> (da €24.9K)</li>
                <li><strong>Copertura Immobilizzazioni:</strong> <span className="text-success">~0,32</span> (da 0,13)</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="card-title-small">6.3 Impatto Rating/Rischio</h6>
              <ul className="list-styled">
                <li><strong>Leanus Score:</strong> <span className="text-success">Potenziale miglioramento a "3-4"</span></li>
                <li><strong>Z-Score Altman:</strong> <span className="text-success">Potenziale miglioramento a &gt;3,0 (zona sicura)</span></li>
                <li><strong>Prob. Default (MCC):</strong> <span className="text-success">Potenziale miglioramento a FASCIA "2"</span></li>
                <li><strong>IRP:</strong> <span className="text-success">Miglioramento da 51,92 a ~68 (Rischio MEDIO-BASSO)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione 7: Conclusioni */}
      <div className="card mb-4 report-section" id="final-thoughts">
        <div className="card-header">
          <h5 className="mb-0">7. Considerazioni Finali</h5>
        </div>
        <div className="card-body small">
          <p>
            Le ottimizzazioni proposte si inquadrano in una strategia di <span className="text-success">ristrutturazione
            finanziaria e patrimoniale urgente</span> volta a risolvere le criticità strutturali dell'azienda.
            L'implementazione coordinata di queste misure potrebbe trasformare una situazione di <span className="text-danger">pre-insolvenza
            tecnica</span> in un percorso di risanamento sostenibile.
          </p>
          <p>
            Si raccomanda di procedere con un <span className="text-warning">approccio sequenziale</span>, dando priorità
            alle azioni con impatto immediato sulla liquidità (factoring, sale & leaseback) per poi implementare le
            ottimizzazioni contabili in sede di chiusura definitiva del bilancio 2024. È essenziale accompagnare queste
            misure con un <span className="text-success">piano industriale credibile</span> che preveda il miglioramento
            strutturale della marginalità operativa, attualmente insufficiente per garantire la sostenibilità a lungo termine.
          </p>
          <p>
            La situazione richiede inoltre un <span className="text-warning">intervento di ricapitalizzazione</span> di
            almeno €2 milioni che, sebbene non incluso nelle ottimizzazioni contabili, rappresenta un elemento imprescindibile
            per il riequilibrio patrimoniale dell'azienda nel medio termine. Senza questo intervento, anche le ottimizzazioni
            proposte potrebbero risultare insufficienti a garantire la continuità aziendale.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
