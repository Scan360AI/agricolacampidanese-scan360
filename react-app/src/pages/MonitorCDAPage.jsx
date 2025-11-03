import { useEffect, useRef } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function MonitorCDAPage() {
  const { company, irp, kpis, parte2, parte3 } = financialData

  const formatCurrency = (value) => {
    if (!value && value !== 0) return 'N/D'
    if (Math.abs(value) >= 1000000) {
      return `€ ${(value / 1000000).toFixed(1)} M`
    } else if (Math.abs(value) >= 1000) {
      return `€ ${(value / 1000).toFixed(0)} K`
    }
    return `€ ${value.toFixed(0)}`
  }

  const formatNumber = (value) => {
    if (!value && value !== 0) return 'N/D'
    return value.toFixed(2)
  }

  // Calculate year-over-year variations
  const ricaviVariation = ((kpis.economic.ricavi2024 - kpis.economic.ricavi2023) / kpis.economic.ricavi2023 * 100).toFixed(2)
  const ebitdaMarginChange = (kpis.economic.ebitdaMargin2024 - kpis.economic.ebitdaMargin2023).toFixed(2)
  const ebitdaVariation = ((kpis.economic.ebitda2024 - kpis.economic.ebitda2023) / kpis.economic.ebitda2023 * 100).toFixed(2)
  const utileNettoVariation = ((kpis.economic.utileNetto2024 - kpis.economic.utileNetto2023) / kpis.economic.utileNetto2023 * 100).toFixed(2)
  const dsoVariation = ((kpis.workingCapital.dso2024 - kpis.workingCapital.dso2023) / kpis.workingCapital.dso2023 * 100).toFixed(2)
  const cashFlowVariation = kpis.financial.cashFlowOperativo2023 ? ((kpis.financial.cashFlowOperativo2024 - kpis.financial.cashFlowOperativo2023) / Math.abs(kpis.financial.cashFlowOperativo2023) * 100).toFixed(2) : 'N/A'

  // PFN/EBITDA calculation
  const pfnEbitda2024 = kpis.financial.pfnEbitda2024 === "Negativo" ? "N/A" : (kpis.financial.pfn2024 / kpis.economic.ebitda2024).toFixed(2)
  const pfnEbitda2023 = kpis.financial.pfn2023 > 0 ? (kpis.financial.pfn2023 / kpis.economic.ebitda2023).toFixed(2) : "N/A"
  const pfnEbitdaVariation = (pfnEbitda2024 !== "N/A" && pfnEbitda2023 !== "N/A") ? ((pfnEbitda2024 - pfnEbitda2023) / pfnEbitda2023 * 100).toFixed(2) : "N/A"

  // D/E Ratio variation
  const deVariation = kpis.financial.deRatio2023 > 0 ? ((kpis.financial.deRatio2024 - kpis.financial.deRatio2023) / kpis.financial.deRatio2023 * 100).toFixed(2) : "N/A"

  return (
    <DashboardLayout
      title="Dashboard Esecutiva CDA"
      subtitle={`${company.name} | ${company.reportDate}`}
    >
      {/* Executive Summary Card */}
      <div className="card mb-4" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
        borderLeft: '5px solid var(--primary)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        <div className="card-body" style={{ padding: '1.5rem' }}>
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h4 className="mb-3" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                <i className="fas fa-info-circle me-2"></i>
                Executive Summary
              </h4>
              <p className="mb-2">
                L'analisi dell'Indice di Rischio Ponderato (IRP) di <strong>{company.name}</strong> evidenzia un{' '}
                <strong>profilo di rischio {irp.categoryLabel.toLowerCase()} ({irp.score.toFixed(2)}/100)</strong>,
                collocando l'entità nel range della scala valutativa. L'azienda manifesta{' '}
                <strong>eccellente solidità patrimoniale</strong> e <strong>alta redditività</strong> che configurano
                un profilo finanziario molto solido.
              </p>
              <p className="mb-0">
                Le <strong>principali aree di attenzione</strong> includono l'<strong>ottimizzazione del ciclo del circolante</strong> (DSO {kpis.workingCapital.dso2024} giorni)
                e il <strong>riequilibrio dei rapporti con i fornitori</strong> (DPO {kpis.workingCapital.dpo2024} giorni),
                richiedendo interventi gestionali mirati.
              </p>
            </div>
            <div className="col-lg-4 text-center mt-3 mt-lg-0">
              <h6 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#6c757d', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Indice Rischio (IRP)
              </h6>
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem auto',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                background: irp.score >= 70 ? 'radial-gradient(circle, #6bc571, #4CAF50)' :
                           irp.score >= 50 ? 'radial-gradient(circle, #ffd54f, #FFC107)' :
                           'radial-gradient(circle, #f6685e, #F44336)',
                border: '4px solid rgba(255, 255, 255, 0.5)'
              }}>
                <span style={{ fontSize: '2.8rem', fontWeight: 700, lineHeight: 1, textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
                  {irp.score.toFixed(1)}
                </span>
                <span style={{ fontSize: '0.7rem', opacity: 0.8, display: 'block', lineHeight: 1 }}>
                  / 100
                </span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.5rem', textAlign: 'center' }}>
                {irp.categoryLabel}{' '}
                <span className={`status-badge bg-${irp.score >= 70 ? 'success' : irp.score >= 50 ? 'warning' : 'danger'}`}
                      style={{ fontSize: '0.85rem', verticalAlign: 'middle', marginLeft: '8px' }}>
                  {irp.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione KPI Principali - 8 KPI Cards */}
      <section id="kpi-section" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-key me-2"></i>
          INDICATORI CHIAVE
        </h4>

        <div className="row">
          {/* KPI 1: Ricavi */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: '#4CAF50'
              }}>
                <i className="fas fa-euro-sign"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  Ricavi
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(kpis.economic.ricavi2024)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: ricaviVariation >= 0 ? '#4CAF50' : '#F44336'
                }}>
                  <i className={`fas fa-arrow-${ricaviVariation >= 0 ? 'up' : 'down'} me-1`}></i>
                  {ricaviVariation >= 0 ? '+' : ''}{ricaviVariation}% YoY
                </div>
              </div>
            </div>
          </div>

          {/* KPI 2: EBITDA Margin */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: kpis.economic.ebitdaMargin2024 >= 8 ? '#4CAF50' : '#FFC107'
              }}>
                <i className="fas fa-percent"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  EBITDA Margin
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {kpis.economic.ebitdaMargin2024.toFixed(2)}%
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: ebitdaMarginChange >= 0 ? '#4CAF50' : '#F44336'
                }}>
                  <i className={`fas fa-arrow-${ebitdaMarginChange >= 0 ? 'up' : 'down'} me-1`}></i>
                  {ebitdaMarginChange >= 0 ? '+' : ''}{ebitdaMarginChange} p.p.
                </div>
              </div>
            </div>
          </div>

          {/* KPI 3: EBITDA */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: '#FFC107'
              }}>
                <i className="fas fa-chart-line"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  EBITDA
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(kpis.economic.ebitda2024)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: ebitdaVariation >= 0 ? '#4CAF50' : '#F44336'
                }}>
                  <i className={`fas fa-arrow-${ebitdaVariation >= 0 ? 'up' : 'down'} me-1`}></i>
                  {ebitdaVariation >= 0 ? '+' : ''}{ebitdaVariation}% YoY
                </div>
              </div>
            </div>
          </div>

          {/* KPI 4: Utile Netto */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: '#4CAF50'
              }}>
                <i className="fas fa-coins"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  Utile Netto
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(kpis.economic.utileNetto2024)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: utileNettoVariation >= 0 ? '#4CAF50' : '#F44336'
                }}>
                  <i className={`fas fa-arrow-${utileNettoVariation >= 0 ? 'up' : 'down'} me-1`}></i>
                  {utileNettoVariation >= 0 ? '+' : ''}{utileNettoVariation}% YoY
                </div>
              </div>
            </div>
          </div>

          {/* KPI 5: PFN/EBITDA */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: '#4CAF50'
              }}>
                <i className="fas fa-balance-scale-right"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  PFN / EBITDA
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {kpis.financial.pfnEbitda2024 === "Negativo" ? "Neg." : pfnEbitda2024 + "x"}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#4CAF50'
                }}>
                  <i className="fas fa-check me-1"></i>
                  {kpis.financial.pfnEbitda2024 === "Negativo" ? "Cash Positive" : "Sotto controllo"}
                </div>
              </div>
            </div>
          </div>

          {/* KPI 6: Leva (D/E) */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: '#4CAF50'
              }}>
                <i className="fas fa-landmark"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  Leva (D/E)
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {kpis.financial.deRatio2024.toFixed(2)}x
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#4CAF50'
                }}>
                  <i className="fas fa-check me-1"></i>
                  Ottima
                </div>
              </div>
            </div>
          </div>

          {/* KPI 7: DSO */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: '#F44336'
              }}>
                <i className="fas fa-hourglass-half"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  DSO (Clienti)
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {kpis.workingCapital.dso2024} gg
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: dsoVariation >= 0 ? '#F44336' : '#4CAF50'
                }}>
                  <i className={`fas fa-arrow-${dsoVariation >= 0 ? 'up' : 'down'} me-1`}></i>
                  {dsoVariation >= 0 ? '+' : ''}{dsoVariation}%
                </div>
              </div>
            </div>
          </div>

          {/* KPI 8: Cash Flow Operativo */}
          <div className="col-lg-3 col-md-6 mb-3">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #dee2e6',
              height: '100%'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                color: 'white',
                marginRight: '12px',
                fontSize: '0.9rem',
                flexShrink: 0,
                backgroundColor: kpis.financial.cashFlowOperativo2024 > 0 ? '#4CAF50' : '#F44336'
              }}>
                <i className="fas fa-water"></i>
              </span>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6c757d',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '5px',
                  lineHeight: 1.2
                }}>
                  Cash Flow Operativo
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(kpis.financial.cashFlowOperativo2024)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: cashFlowVariation !== 'N/A' && cashFlowVariation >= 0 ? '#4CAF50' : '#F44336'
                }}>
                  <i className={`fas fa-arrow-${cashFlowVariation !== 'N/A' && cashFlowVariation >= 0 ? 'up' : 'down'} me-1`}></i>
                  {cashFlowVariation !== 'N/A' ? `${cashFlowVariation >= 0 ? '+' : ''}${cashFlowVariation}%` : 'vs 2023'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Alert Principali - 4 Alert Cards */}
      <section id="alerts-section" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-bell me-2" style={{ color: '#F44336' }}></i>
          ALERT PRINCIPALI
        </h4>

        <div className="row">
          {/* Alert 1: DSO Elevato */}
          <div className="col-lg-6 mb-4">
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #ffda6a',
              backgroundColor: '#fff3cd',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <i className="fas fa-hourglass-half" style={{
                fontSize: '1.8rem',
                marginRight: '1rem',
                flexShrink: 0,
                width: '40px',
                textAlign: 'center',
                color: '#8a6d3b'
              }}></i>
              <div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '1.1rem', color: '#664d03' }}>
                  DSO: {kpis.workingCapital.dso2024} giorni{' '}
                  <span className="badge text-dark ms-2" style={{
                    backgroundColor: '#FFC107',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600
                  }}>
                    Attenzione
                  </span>
                </h5>
                <p style={{ fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.5, color: '#664d03' }}>
                  Tempi di incasso crediti elevati (+{dsoVariation}% vs 2023), superiori al benchmark settoriale (~95gg).
                  Necessario intervento per ottimizzare la gestione del credito.
                </p>
              </div>
            </div>
          </div>

          {/* Alert 2: DPO Elevato */}
          <div className="col-lg-6 mb-4">
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #ffda6a',
              backgroundColor: '#fff3cd',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <i className="fas fa-calendar-times" style={{
                fontSize: '1.8rem',
                marginRight: '1rem',
                flexShrink: 0,
                width: '40px',
                textAlign: 'center',
                color: '#8a6d3b'
              }}></i>
              <div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '1.1rem', color: '#664d03' }}>
                  DPO: {kpis.workingCapital.dpo2024} giorni{' '}
                  <span className="badge text-dark ms-2" style={{
                    backgroundColor: '#FFC107',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600
                  }}>
                    Attenzione
                  </span>
                </h5>
                <p style={{ fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.5, color: '#664d03' }}>
                  Tempi di pagamento fornitori molto elevati, oltre il doppio del benchmark settoriale (~105gg).
                  Potrebbero generare tensioni nei rapporti commerciali.
                </p>
              </div>
            </div>
          </div>

          {/* Alert 3: Ciclo Circolante */}
          <div className="col-lg-6 mb-4">
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #9eeaf9',
              backgroundColor: '#cff4fc',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <i className="fas fa-sync-alt" style={{
                fontSize: '1.8rem',
                marginRight: '1rem',
                flexShrink: 0,
                width: '40px',
                textAlign: 'center',
                color: '#31708f'
              }}></i>
              <div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '1.1rem', color: '#055160' }}>
                  Ciclo Circolante: {kpis.workingCapital.cicloCircolante2024} giorni{' '}
                  <span className="badge text-dark ms-2" style={{
                    backgroundColor: '#0dcaf0',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600
                  }}>
                    Info
                  </span>
                </h5>
                <p style={{ fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.5, color: '#055160' }}>
                  Peggioramento significativo del ciclo del circolante rispetto al 2023 ({kpis.workingCapital.cicloCircolante2023} giorni),
                  principalmente dovuto all'aumento del DSO. Monitoraggio continuo raccomandato.
                </p>
              </div>
            </div>
          </div>

          {/* Alert 4: Crescita Ricavi */}
          <div className="col-lg-6 mb-4">
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #a3cfbb',
              backgroundColor: '#d1e7dd',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
            }}>
              <i className="fas fa-chart-line" style={{
                fontSize: '1.8rem',
                marginRight: '1rem',
                flexShrink: 0,
                width: '40px',
                textAlign: 'center',
                color: '#3c763d'
              }}></i>
              <div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '1.1rem', color: '#0a3622' }}>
                  Crescita Ricavi: +{ricaviVariation}%{' '}
                  <span className="badge ms-2" style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600
                  }}>
                    Positivo
                  </span>
                </h5>
                <p style={{ fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.5, color: '#0a3622' }}>
                  Crescita contenuta ma costante dei ricavi. Opportunità di accelerazione attraverso nuove iniziative commerciali
                  e sviluppo servizi ad alto valore aggiunto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Grafici Chiave CDA - 4 Charts */}
      <section id="charts-section" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-chart-pie me-2"></i>
          GRAFICI CHIAVE
        </h4>

        <div className="row">
          {/* Chart 1: Trend Economico */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Trend Economico (Ricavi/EBITDA)
                </h6>
                <div style={{ height: '300px' }}>
                  <Line
                    data={{
                      labels: ['2022', '2023', '2024'],
                      datasets: [
                        {
                          label: 'Ricavi (€K)',
                          data: [
                            kpis.economic.ricavi2022 / 1000,
                            kpis.economic.ricavi2023 / 1000,
                            kpis.economic.ricavi2024 / 1000
                          ],
                          borderColor: '#191970',
                          backgroundColor: 'rgba(25, 25, 112, 0.1)',
                          yAxisID: 'y',
                          tension: 0.3
                        },
                        {
                          label: 'EBITDA (€K)',
                          data: [
                            kpis.economic.ebitda2022 / 1000,
                            kpis.economic.ebitda2023 / 1000,
                            kpis.economic.ebitda2024 / 1000
                          ],
                          borderColor: '#4CAF50',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          yAxisID: 'y',
                          tension: 0.3
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          position: 'left'
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Sostenibilità Debito */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Sostenibilità Debito (PFN/EBITDA)
                </h6>
                <div style={{ height: '300px' }}>
                  <Line
                    data={{
                      labels: ['2022', '2023', '2024'],
                      datasets: [
                        {
                          label: 'PFN/EBITDA',
                          data: [
                            null,
                            parte3.pfn.pfnEbitda[1],
                            null
                          ],
                          borderColor: '#4CAF50',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          tension: 0.3,
                          spanGaps: true
                        },
                        {
                          label: 'Soglia Critica (3.5x)',
                          data: [3.5, 3.5, 3.5],
                          borderColor: '#F44336',
                          borderDash: [5, 5],
                          backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          pointRadius: 0
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'bottom'
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              if (context.dataIndex === 2 && context.datasetIndex === 0) {
                                return 'PFN/EBITDA: Cash Positive';
                              }
                              return context.dataset.label + ': ' + (context.parsed.y !== null ? context.parsed.y.toFixed(2) + 'x' : 'N/A');
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chart 3: Evoluzione Ciclo Circolante */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Evoluzione Ciclo Circolante (Giorni)
                </h6>
                <div style={{ height: '300px' }}>
                  <Bar
                    data={{
                      labels: ['2022', '2023', '2024'],
                      datasets: [
                        {
                          label: 'DSO',
                          data: [
                            kpis.workingCapital.dso2022,
                            kpis.workingCapital.dso2023,
                            kpis.workingCapital.dso2024
                          ],
                          backgroundColor: '#F44336'
                        },
                        {
                          label: 'DIO',
                          data: [
                            kpis.workingCapital.dio2022,
                            kpis.workingCapital.dio2023,
                            kpis.workingCapital.dio2024
                          ],
                          backgroundColor: '#FFC107'
                        },
                        {
                          label: 'DPO',
                          data: [
                            kpis.workingCapital.dpo2022,
                            kpis.workingCapital.dpo2023,
                            kpis.workingCapital.dpo2024
                          ],
                          backgroundColor: '#4CAF50'
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chart 4: Generazione Cassa Operativa */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Generazione Cassa Operativa (% Ricavi)
                </h6>
                <div style={{ height: '300px' }}>
                  <Bar
                    data={{
                      labels: ['2022', '2023', '2024'],
                      datasets: [
                        {
                          label: 'CF Operativo / Ricavi (%)',
                          data: [
                            parte2.profitability.cashFlowRicavi[0],
                            parte2.profitability.cashFlowRicavi[1],
                            parte2.profitability.cashFlowRicavi[2]
                          ],
                          backgroundColor: [
                            parte2.profitability.cashFlowRicavi[0] > 0 ? '#4CAF50' : '#F44336',
                            parte2.profitability.cashFlowRicavi[1] > 0 ? '#4CAF50' : '#F44336',
                            parte2.profitability.cashFlowRicavi[2] > 0 ? '#4CAF50' : '#F44336'
                          ]
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion: Approfondimenti Dettagliati - 6 Sections */}
      <h2 className="section-title" id="details-accordion" style={{
        color: 'var(--primary)',
        fontWeight: 600,
        marginTop: '3rem',
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid var(--secondary)',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <i className="fas fa-layer-group me-2"></i>
        Approfondimenti Dettagliati
      </h2>

      <div className="accordion mb-4" id="cdaDetailsAccordion">
        {/* Accordion 1: Performance Economica */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingEconomic">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEconomic"
              aria-expanded="false"
              aria-controls="collapseEconomic"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-chart-line me-2"></i>
              Performance Economica
              <span className="badge bg-success ms-2" style={{ fontSize: '0.75rem' }}>Buona</span>
            </button>
          </h2>
          <div id="collapseEconomic" className="accordion-collapse collapse" aria-labelledby="headingEconomic" data-bs-parent="#cdaDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Principali indicatori economici
              </h6>
              <div className="table-responsive mb-3">
                <table className="table table-sm table-striped">
                  <tbody>
                    <tr>
                      <td>Ricavi</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>{formatCurrency(kpis.economic.ricavi2024)}</td>
                      <td>
                        <i className={`fas fa-arrow-${ricaviVariation >= 0 ? 'up' : 'down'} ${ricaviVariation >= 0 ? 'text-success' : 'text-danger'}`}></i>
                        {' '}{ricaviVariation >= 0 ? '+' : ''}{ricaviVariation}%
                      </td>
                    </tr>
                    <tr>
                      <td>EBITDA</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                        {formatCurrency(kpis.economic.ebitda2024)} ({kpis.economic.ebitdaMargin2024.toFixed(2)}%)
                      </td>
                      <td>
                        <i className={`fas fa-arrow-${ebitdaVariation >= 0 ? 'up' : 'down'} ${ebitdaVariation >= 0 ? 'text-success' : 'text-danger'}`}></i>
                        {' '}{ebitdaVariation >= 0 ? '+' : ''}{ebitdaVariation}%
                      </td>
                    </tr>
                    <tr>
                      <td>EBIT</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                        {formatCurrency(kpis.economic.ebit2024)} ({kpis.economic.ebitMargin2024.toFixed(2)}%)
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success"></i>
                        {' '}Positivo
                      </td>
                    </tr>
                    <tr>
                      <td>Utile Netto</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                        {formatCurrency(kpis.economic.utileNetto2024)} ({kpis.economic.utileNettoMargin2024.toFixed(2)}%)
                      </td>
                      <td>
                        <i className={`fas fa-arrow-${utileNettoVariation >= 0 ? 'up' : 'down'} ${utileNettoVariation >= 0 ? 'text-success' : 'text-danger'}`}></i>
                        {' '}{utileNettoVariation >= 0 ? '+' : ''}{utileNettoVariation}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Indici di redditività
              </h6>
              <div className="table-responsive">
                <table className="table table-sm table-striped">
                  <tbody>
                    <tr>
                      <td>ROE</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>{kpis.economic.roe2024.toFixed(2)}%</td>
                      <td>
                        <span className="badge bg-success">Eccellente</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ROI</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>{kpis.economic.roi2024.toFixed(2)}%</td>
                      <td>
                        <span className="badge bg-success">Eccellente</span>
                      </td>
                    </tr>
                    <tr>
                      <td>ROS</td>
                      <td className="fw-bold" style={{ color: 'var(--primary)' }}>{kpis.economic.ros2024.toFixed(2)}%</td>
                      <td>
                        <span className="badge bg-success">Buono</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="alert alert-success small p-2">
                    <h6>Punti di forza:</h6>
                    <ul>
                      <li>ROE eccellente ({kpis.economic.roe2024.toFixed(2)}%)</li>
                      <li>Crescita utile netto (+{utileNettoVariation}%)</li>
                      <li>Marginalità operativa solida</li>
                      <li>ROI superiore al benchmark</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="alert alert-warning small p-2">
                    <h6>Aree di miglioramento:</h6>
                    <ul>
                      <li>Accelerare crescita ricavi (+{ricaviVariation}%)</li>
                      <li>Ottimizzare struttura dei costi</li>
                      <li>Incrementare margine operativo</li>
                      <li>Espandere base clienti</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 2: Struttura Patrimoniale */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingAssets">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAssets"
              aria-expanded="false"
              aria-controls="collapseAssets"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-landmark me-2"></i>
              Struttura Patrimoniale
              <span className="badge bg-success ms-2" style={{ fontSize: '0.75rem' }}>Solida</span>
            </button>
          </h2>
          <div id="collapseAssets" className="accordion-collapse collapse" aria-labelledby="headingAssets" data-bs-parent="#cdaDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Stato Patrimoniale Sintetico (Impieghi)
                  </h6>
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <td>Attivo Fisso Netto</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(parte3.balanceSheet.assets.attivoFissoNetto[2] * 1000)}
                        </td>
                        <td>
                          {parte3.balanceSheet.assets.attivoFissoNettoPercent[2].toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td>Crediti Clienti</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.workingCapital.crediti2024)}
                        </td>
                        <td>
                          {parte3.balanceSheet.assets.creditiClientiPercent[2].toFixed(1)}%
                        </td>
                      </tr>
                      <tr>
                        <td>Liquidità</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.financial.liquidita2024)}
                        </td>
                        <td>
                          {parte3.balanceSheet.assets.liquiditaPercent[2].toFixed(1)}%
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td><strong>Totale Attivo</strong></td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.patrimonial.totaleAttivo2024)}
                        </td>
                        <td>100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Struttura delle Fonti
                  </h6>
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <td>Patrimonio Netto</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.patrimonial.patrimonioNetto2024)}
                        </td>
                        <td>
                          <i className="fas fa-arrow-up text-success"></i>
                          {' '}+{kpis.patrimonial.patrimonioNettoVariation.toFixed(2)}%
                        </td>
                      </tr>
                      <tr>
                        <td>PFN</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.financial.pfn2024)}
                        </td>
                        <td>
                          <span className="badge bg-success">Cash Positive</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Debiti Finanziari</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(parte3.pfn.debitiFinanziari[2] * 1000)}
                        </td>
                        <td>
                          {parte3.balanceSheet.liabilities.debitiFinanziariPercent[2].toFixed(1)}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Indici di Solidità Patrimoniale
              </h6>
              <div className="table-responsive">
                <table className="table table-sm table-striped table-hover">
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th>Indice</th>
                      <th className="text-end">2022</th>
                      <th className="text-end">2023</th>
                      <th className="text-end">2024</th>
                      <th>Valutazione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Autonomia Fin.</td>
                      <td className="text-end">{parte3.solidityIndices.autonomiaFinanziaria[0].toFixed(1)}%</td>
                      <td className="text-end">{parte3.solidityIndices.autonomiaFinanziaria[1].toFixed(1)}%</td>
                      <td className="text-end">{parte3.solidityIndices.autonomiaFinanziaria[2].toFixed(1)}%</td>
                      <td><span className="badge bg-success">Buona</span></td>
                    </tr>
                    <tr>
                      <td>Cop. Immob.</td>
                      <td className="text-end">{parte3.solidityIndices.coperturaImmobilizzazioni[0].toFixed(2)}</td>
                      <td className="text-end">{parte3.solidityIndices.coperturaImmobilizzazioni[1].toFixed(2)}</td>
                      <td className="text-end">{parte3.solidityIndices.coperturaImmobilizzazioni[2].toFixed(2)}</td>
                      <td><span className="badge bg-success">Eccellente</span></td>
                    </tr>
                    <tr>
                      <td>Leva (D/E)</td>
                      <td className="text-end">{parte3.solidityIndices.levaFinanziaria[0].toFixed(2)}</td>
                      <td className="text-end">{parte3.solidityIndices.levaFinanziaria[1].toFixed(2)}</td>
                      <td className="text-end">{parte3.solidityIndices.levaFinanziaria[2].toFixed(2)}</td>
                      <td><span className="badge bg-success">Ottima</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="alert alert-success small p-2">
                    <h6>Punti di forza:</h6>
                    <ul>
                      <li>Crescita PN straordinaria (+{kpis.patrimonial.patrimonioNettoVariation.toFixed(2)}%)</li>
                      <li>Assenza debito finanziario</li>
                      <li>Ottima copertura immobilizzazioni</li>
                      <li>Autonomia finanziaria in crescita</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="alert alert-info small p-2">
                    <h6>Opportunità:</h6>
                    <ul>
                      <li>Possibile uso moderato leva finanziaria</li>
                      <li>Investimenti strategici finanziabili</li>
                      <li>Solidità per espansione</li>
                      <li>Capacità di autofinanziamento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 3: Situazione Finanziaria e Flussi */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingFinancial">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFinancial"
              aria-expanded="false"
              aria-controls="collapseFinancial"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-university me-2"></i>
              Situazione Finanziaria e Flussi
              <span className="badge bg-success ms-2" style={{ fontSize: '0.75rem' }}>Eccellente</span>
            </button>
          </h2>
          <div id="collapseFinancial" className="accordion-collapse collapse" aria-labelledby="headingFinancial" data-bs-parent="#cdaDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Indicatori Sostenibilità Debito
                  </h6>
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <td>PFN/EBITDA</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.financial.pfnEbitda2024}
                        </td>
                        <td><span className="badge bg-success">Eccellente</span></td>
                      </tr>
                      <tr>
                        <td>Leva (D/E)</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.financial.deRatio2024.toFixed(2)}x
                        </td>
                        <td><span className="badge bg-success">Ottima</span></td>
                      </tr>
                      <tr>
                        <td>DSCR</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.financial.dscr2024 ? kpis.financial.dscr2024.toFixed(2) + 'x' : 'N/A'}
                        </td>
                        <td><span className="badge bg-success">Eccellente</span></td>
                      </tr>
                      <tr>
                        <td>CF Op./Ricavi</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.financial.cashFlowOperativoRicavi2024.toFixed(2)}%
                        </td>
                        <td><span className="badge bg-success">Buono</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Posizione Finanziaria Netta
                  </h6>
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <td>Debiti Finanziari</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(parte3.pfn.debitiFinanziari[2] * 1000)}
                        </td>
                        <td>
                          <i className="fas fa-check text-success"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Liquidità</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.financial.liquidita2024)}
                        </td>
                        <td>
                          <i className="fas fa-arrow-up text-success"></i>
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td><strong>PFN</strong></td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.financial.pfn2024)}
                        </td>
                        <td>
                          <span className="badge bg-success">Cash Positive</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Analisi dei Flussi di Cassa 2024
              </h6>
              <div className="table-responsive">
                <table className="table table-sm table-striped">
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th>Voce</th>
                      <th className="text-end">Valore (€)</th>
                      <th className="text-end">% Ricavi</th>
                      <th>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>EBITDA</td>
                      <td className="text-end">{formatCurrency(kpis.economic.ebitda2024)}</td>
                      <td className="text-end">{kpis.economic.ebitdaMargin2024.toFixed(2)}%</td>
                      <td>Margine Op. Lordo</td>
                    </tr>
                    <tr style={{ backgroundColor: '#e8f5e9' }}>
                      <td><strong>Cash Flow Operativo</strong></td>
                      <td className="text-end"><strong>{formatCurrency(kpis.financial.cashFlowOperativo2024)}</strong></td>
                      <td className="text-end"><strong>{kpis.financial.cashFlowOperativoRicavi2024.toFixed(2)}%</strong></td>
                      <td>Liquidità da Gestione Core</td>
                    </tr>
                    <tr style={{ backgroundColor: '#e8f5e9' }}>
                      <td><strong>Free Cash Flow (FCF)</strong></td>
                      <td className="text-end"><strong>{formatCurrency(kpis.financial.freeCashFlow2024)}</strong></td>
                      <td className="text-end"><strong>{(kpis.financial.freeCashFlow2024 / kpis.economic.ricavi2024 * 100).toFixed(2)}%</strong></td>
                      <td>Cassa Libera</td>
                    </tr>
                    <tr style={{ backgroundColor: '#e3f2fd' }}>
                      <td><strong>Var. Netta Cassa</strong></td>
                      <td className="text-end"><strong>{formatCurrency(kpis.financial.variazioneNettaCassa2024)}</strong></td>
                      <td className="text-end"><strong>{(kpis.financial.variazioneNettaCassa2024 / kpis.economic.ricavi2024 * 100).toFixed(2)}%</strong></td>
                      <td>Incremento Liquidità</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="alert alert-success small p-2">
                    <h6>Punti di forza:</h6>
                    <ul>
                      <li>Posizione cash positive eccellente</li>
                      <li>CF operativo positivo ({kpis.financial.cashFlowOperativoRicavi2024.toFixed(2)}%)</li>
                      <li>FCF consistente</li>
                      <li>DSCR elevato ({kpis.financial.dscr2024 ? kpis.financial.dscr2024.toFixed(2) : 'N/A'}x)</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="alert alert-info small p-2">
                    <h6>Osservazioni:</h6>
                    <ul>
                      <li>Assenza totale debito finanziario</li>
                      <li>Generazione cassa costante</li>
                      <li>Solidità finanziaria ottimale</li>
                      <li>Capacità investimenti elevata</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 4: Capitale Circolante */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingCapital">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCapital"
              aria-expanded="false"
              aria-controls="collapseCapital"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-sync-alt me-2"></i>
              Capitale Circolante
              <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.75rem' }}>Attenzione</span>
            </button>
          </h2>
          <div id="collapseCapital" className="accordion-collapse collapse" aria-labelledby="headingCapital" data-bs-parent="#cdaDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Ciclo del Capitale Circolante
                  </h6>
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <td>Giorni Clienti (DSO)</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.workingCapital.dso2024} gg
                        </td>
                        <td className="text-danger">
                          <i className="fas fa-arrow-up"></i>
                          {' '}+{((kpis.workingCapital.dso2024 - kpis.workingCapital.dso2023) / kpis.workingCapital.dso2023 * 100).toFixed(0)}%
                        </td>
                        <td><span className="badge bg-danger">Critico</span></td>
                      </tr>
                      <tr>
                        <td>Giorni Magazzino (DIO)</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.workingCapital.dio2024} gg
                        </td>
                        <td>
                          <i className="fas fa-check text-success"></i>
                        </td>
                        <td><span className="badge bg-success">Ottimo</span></td>
                      </tr>
                      <tr>
                        <td>Giorni Fornitori (DPO)</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.workingCapital.dpo2024} gg
                        </td>
                        <td className="text-success">
                          <i className="fas fa-arrow-up"></i>
                          {' '}+{((kpis.workingCapital.dpo2024 - kpis.workingCapital.dpo2023) / kpis.workingCapital.dpo2023 * 100).toFixed(0)}%
                        </td>
                        <td><span className="badge bg-warning text-dark">Elevato</span></td>
                      </tr>
                      <tr style={{ backgroundColor: '#e8f5e9' }}>
                        <td><strong>Ciclo del Circolante</strong></td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {kpis.workingCapital.cicloCircolante2024} gg
                        </td>
                        <td className="text-danger">
                          <i className="fas fa-arrow-up"></i>
                          {' '}+{((kpis.workingCapital.cicloCircolante2024 - kpis.workingCapital.cicloCircolante2023) / kpis.workingCapital.cicloCircolante2023 * 100).toFixed(0)}%
                        </td>
                        <td><span className="badge bg-warning text-dark">Peggiorato</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Componenti Capitale Circolante
                  </h6>
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <td>Crediti Commerciali</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.workingCapital.crediti2024)}
                        </td>
                      </tr>
                      <tr>
                        <td>Rimanenze</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.workingCapital.rimanenze2024)}
                        </td>
                      </tr>
                      <tr>
                        <td>Debiti Fornitori</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.workingCapital.debitiFornitori2024)}
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: '#e3f2fd' }}>
                        <td><strong>CCN</strong></td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {formatCurrency(kpis.patrimonial.ccn2024)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="alert alert-warning mt-3 small p-2">
                <h5>Aree di attenzione Circolante:</h5>
                <ul>
                  <li>DSO molto elevato ({kpis.workingCapital.dso2024}gg vs benchmark ~95gg), richiede azioni immediate</li>
                  <li>DPO eccessivo ({kpis.workingCapital.dpo2024}gg vs benchmark ~105gg), possibile tensione fornitori</li>
                  <li>Peggioramento ciclo circolante ({kpis.workingCapital.cicloCircolante2024}gg da {kpis.workingCapital.cicloCircolante2023}gg)</li>
                  <li>Potenziale liberazione di ~€320K ottimizzando DSO</li>
                </ul>
              </div>

              <div className="alert alert-success mt-3 small p-2">
                <h5>Punti di forza:</h5>
                <ul>
                  <li>CCN in forte crescita (+{kpis.patrimonial.ccnVariation.toFixed(2)}%)</li>
                  <li>Gestione magazzino efficiente (DIO {kpis.workingCapital.dio2024}gg)</li>
                  <li>Solidità patrimoniale compensa inefficienze</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 5: Profilo di Rischio */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingRisk">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRisk"
              aria-expanded="false"
              aria-controls="collapseRisk"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-exclamation-triangle me-2"></i>
              Profilo di Rischio
              <span className="badge bg-success ms-2" style={{ fontSize: '0.75rem' }}>Basso</span>
            </button>
          </h2>
          <div id="collapseRisk" className="accordion-collapse collapse" aria-labelledby="headingRisk" data-bs-parent="#cdaDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <div className="row">
                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Indice Rischio Ponderato (IRP)
                  </h6>
                  <p>Valore: <strong>{irp.score.toFixed(2)} / 100</strong>{' '}
                    <span className={`badge bg-${irp.score >= 70 ? 'success' : irp.score >= 50 ? 'warning' : 'danger'}`}>
                      {irp.categoryLabel.toUpperCase()}
                    </span>
                  </p>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td>Component Score</td>
                        <td className="text-end">{irp.components.componentePrimaria.score.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Leanus Score Norm.</td>
                        <td className="text-end">{irp.components.leanusScore.scoreNormalizzato.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Rating MCC Norm.</td>
                        <td className="text-end">{irp.components.ratingMCC.scoreNormalizzato.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Z-Score Norm.</td>
                        <td className="text-end">{irp.components.zScoreAltman.scoreNormalizzato.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                    Modelli di Rating
                  </h6>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td>Z-Score Altman</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {irp.components.zScoreAltman.score.toFixed(2)}
                        </td>
                        <td><span className="badge bg-success">{irp.components.zScoreAltman.zona}</span></td>
                      </tr>
                      <tr>
                        <td>PD (MCC)</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {irp.components.ratingMCC.pd.toFixed(2)}%
                        </td>
                        <td><span className="badge bg-success">Fascia {irp.components.ratingMCC.fascia}</span></td>
                      </tr>
                      <tr>
                        <td>Leanus Score</td>
                        <td className="fw-bold" style={{ color: 'var(--primary)' }}>
                          {irp.components.leanusScore.scoreOriginale.toFixed(2)}
                        </td>
                        <td><span className="badge bg-success">{irp.components.leanusScore.scoreLabel}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Penalizzazioni
              </h6>
              <p className="small">
                <strong>Adjustment Factor:</strong> {irp.adjustmentFactor} punti<br />
                <strong>Motivo:</strong> {irp.adjustmentReason}
              </p>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="alert alert-success small p-2">
                    <h6>Positivi:</h6>
                    <ul>
                      <li>Z-Score eccellente ({irp.components.zScoreAltman.score.toFixed(2)})</li>
                      <li>PD molto bassa ({irp.components.ratingMCC.pd.toFixed(2)}%)</li>
                      <li>Leanus Score positivo</li>
                      <li>Solidità patrimoniale elevata</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="alert alert-warning small p-2">
                    <h6>Aree da monitorare:</h6>
                    <ul>
                      <li>DSO elevato penalizza IRP</li>
                      <li>Ciclo circolante in peggioramento</li>
                      <li>DPO eccessivo da normalizzare</li>
                      <li>Crescita ricavi da accelerare</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion 6: Piano d'Azione */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingActions">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseActions"
              aria-expanded="false"
              aria-controls="collapseActions"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-lightbulb me-2"></i>
              Piano d'Azione
            </button>
          </h2>
          <div id="collapseActions" className="accordion-collapse collapse" aria-labelledby="headingActions" data-bs-parent="#cdaDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>PRIORITÀ ALTA: Ottimizzazione Ciclo Circolante</h6>
                <div style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                  <strong>1a. Riduzione DSO:</strong> Implementare politiche di credit management più stringenti,
                  target riduzione DSO da {kpis.workingCapital.dso2024} a 150 giorni entro 6 mesi
                </div>
                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <strong>1b. Normalizzazione DPO:</strong> Riequilibrare tempi di pagamento fornitori
                  da {kpis.workingCapital.dpo2024} a 90-120 giorni per preservare relazioni commerciali
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>PRIORITÀ ALTA: Accelerazione Crescita</h6>
                <div style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                  <strong>2a. Sviluppo Commerciale:</strong> Implementare iniziative per incrementare crescita ricavi
                  dall'attuale +{ricaviVariation}% a +8-10%
                </div>
                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <strong>2b. Diversificazione:</strong> Espandere portafoglio servizi e base clienti per ridurre concentrazione
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>PRIORITÀ MEDIA: Consolidamento Posizione</h6>
                <div style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                  <strong>3a. Patrimonio Netto:</strong> Mantenere trend crescita PN (+{kpis.patrimonial.patrimonioNettoVariation.toFixed(2)}%)
                </div>
                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <strong>3b. Cash Position:</strong> Preservare posizione cash positive e solidità finanziaria
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>PRIORITÀ MEDIA: Investimenti Strategici</h6>
                <div style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                  <strong>4a. Digitalizzazione:</strong> Investire in processi e strumenti digitali per efficienza operativa
                </div>
                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                  <strong>4b. Risorse Umane:</strong> Potenziare team con competenze specialistiche ad alto valore
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="alert alert-success">
                    <h6>Impatto Stimato:</h6>
                    <ul>
                      <li>DSO: da {kpis.workingCapital.dso2024} a 150gg</li>
                      <li>Liberazione capitale: ~€320K</li>
                      <li>Crescita ricavi: da +{ricaviVariation}% a +8-10%</li>
                      <li>IRP: da {irp.score.toFixed(1)} a 85+</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="alert alert-primary">
                    <h6>Tempistiche:</h6>
                    <ul>
                      <li>Immediato (0-30gg): Politiche credit</li>
                      <li>Breve (30-90gg): Normalizzazione DPO</li>
                      <li>Medio (90-180gg): Iniziative commerciali</li>
                      <li>Lungo (180-360gg): Investimenti strategici</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione Azioni Prioritarie - Final Summary */}
      <section id="actions-summary" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-tasks me-2"></i>
          AZIONI PRIORITARIE
        </h4>

        <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <div className="card-body">
            <ol style={{ paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      color: 'white',
                      marginRight: '12px',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      backgroundColor: '#F44336'
                    }}>
                      <i className="fas fa-hourglass-half"></i>
                    </span>
                    <strong style={{ color: 'var(--primary)' }}>Ottimizzazione DSO</strong>
                    <p className="small text-muted mb-0" style={{ marginLeft: '44px', marginTop: '0.5rem' }}>
                      Ridurre tempi di incasso crediti da {kpis.workingCapital.dso2024} a 150 giorni attraverso
                      politiche di credit management più stringenti e incentivi per pagamenti anticipati.
                    </p>
                  </div>
                  <span className="badge ms-2" style={{
                    backgroundColor: '#F44336',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: '1rem'
                  }}>
                    Alta Priorità
                  </span>
                </div>
              </li>

              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      color: 'white',
                      marginRight: '12px',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      backgroundColor: '#FFC107'
                    }}>
                      <i className="fas fa-calendar-times"></i>
                    </span>
                    <strong style={{ color: 'var(--primary)' }}>Riequilibrio DPO</strong>
                    <p className="small text-muted mb-0" style={{ marginLeft: '44px', marginTop: '0.5rem' }}>
                      Normalizzare tempi di pagamento fornitori da {kpis.workingCapital.dpo2024} a 90-120 giorni
                      per preservare relazioni commerciali strategiche.
                    </p>
                  </div>
                  <span className="badge text-dark ms-2" style={{
                    backgroundColor: '#FFC107',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: '1rem'
                  }}>
                    Media Priorità
                  </span>
                </div>
              </li>

              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      color: 'white',
                      marginRight: '12px',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      backgroundColor: '#F44336'
                    }}>
                      <i className="fas fa-chart-line"></i>
                    </span>
                    <strong style={{ color: 'var(--primary)' }}>Accelerazione Crescita</strong>
                    <p className="small text-muted mb-0" style={{ marginLeft: '44px', marginTop: '0.5rem' }}>
                      Sviluppare iniziative commerciali per incrementare crescita ricavi dall'attuale +{ricaviVariation}%
                      a +8-10% annuo attraverso nuovi servizi e espansione geografica.
                    </p>
                  </div>
                  <span className="badge ms-2" style={{
                    backgroundColor: '#F44336',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: '1rem'
                  }}>
                    Alta Priorità
                  </span>
                </div>
              </li>

              <li style={{ marginBottom: 0, paddingBottom: 0, border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      color: 'white',
                      marginRight: '12px',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      backgroundColor: '#4CAF50'
                    }}>
                      <i className="fas fa-building"></i>
                    </span>
                    <strong style={{ color: 'var(--primary)' }}>Consolidamento Patrimoniale</strong>
                    <p className="small text-muted mb-0" style={{ marginLeft: '44px', marginTop: '0.5rem' }}>
                      Mantenere il trend di crescita del patrimonio netto (+{kpis.patrimonial.patrimonioNettoVariation.toFixed(2)}%)
                      e la posizione cash positive per solidità strutturale.
                    </p>
                  </div>
                  <span className="badge text-dark ms-2" style={{
                    backgroundColor: '#FFC107',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600,
                    flexShrink: 0,
                    marginLeft: '1rem'
                  }}>
                    Media Priorità
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

    </DashboardLayout>
  )
}
