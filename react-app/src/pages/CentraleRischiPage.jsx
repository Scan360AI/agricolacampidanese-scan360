import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function CentraleRischiPage() {
  const { company } = financialData

  // CR Data (placeholder - specific to Centrale Rischi analysis)
  const crData = {
    score: 68,
    category: 'Monitoraggio',
    categoryLabel: 'M',
    accordatoTotale: 7933629,
    utilizzatoTotale: 5853265,
    utilizzoPercentuale: 73.8,
    sconfini: 0,
    creditiScaduti: 277969,
    sofferenze: 0,
    bancheSegnalanti: 5,
    garanzieRicevute: 5141080,
    copertura: 64.8
  }

  const formatCurrency = (value) => {
    if (!value && value !== 0) return 'N/D'
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(3).replace(/\.?0+$/, '')}M`.replace(/(\.\d)M/, '.${1.slice(1,2)}M')
    } else if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toLocaleString('it-IT')}`
  }

  const formatNumber = (value) => {
    if (!value && value !== 0) return 'N/D'
    return value.toLocaleString('it-IT')
  }

  return (
    <DashboardLayout
      title="Report Centrale Rischi"
      subtitle={`${company.name} | Febbraio 2025`}
    >
      {/* Main Title */}
      <h2 className="section-title" id="cr-main-title" style={{
        color: 'var(--primary)',
        fontWeight: 600,
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid var(--secondary)',
        fontSize: '1.75rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <i className="fas fa-landmark me-2"></i>
        Analisi Centrale Rischi
      </h2>

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
                Sintesi Esecutiva CR (Febbraio 2025)
              </h4>
              <p className="mb-2">
                L'analisi della Centrale Rischi di <strong>{company.name}</strong> a Febbraio 2025 evidenzia
                un punteggio CR di {crData.score}/100 ('{crData.category}'). L'accordato totale è
                di {formatCurrency(crData.accordatoTotale)} con un utilizzo
                di {formatCurrency(crData.utilizzatoTotale)} ({crData.utilizzoPercentuale}%).
              </p>
              <p className="mb-0 text-danger">
                Il punteggio riflette una situazione da monitorare attentamente per la presenza di crediti scaduti.
              </p>
            </div>

            {/* CR Score Visual Section */}
            <div className="col-lg-4 text-center mt-3 mt-lg-0" id="cr-summary-section">
              <h6 style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#6c757d',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}>
                Punteggio Centrale Rischi
              </h6>

              {/* CR Score Circle */}
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem auto',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                border: '6px solid rgba(255, 255, 255, 0.5)',
                background: crData.score >= 80 ? 'radial-gradient(circle, #6bc571, #4CAF50)' :
                           crData.score >= 60 ? 'radial-gradient(circle, #ffd54f, #FFC107)' :
                           'radial-gradient(circle, #f6685e, #F44336)'
              }}>
                <span style={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
                }}>
                  {crData.score}
                </span>
                <span style={{
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  display: 'block',
                  lineHeight: 1
                }}>
                  / 100
                </span>
              </div>

              {/* Category Text */}
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                marginTop: '0.5rem',
                textAlign: 'center',
                color: crData.score >= 80 ? '#4CAF50' : crData.score >= 60 ? '#FFC107' : '#F44336'
              }}>
                {crData.category}{' '}
                <span className="status-badge text-dark" style={{
                  backgroundColor: crData.score >= 80 ? '#4CAF50' : crData.score >= 60 ? '#FFC107' : '#F44336',
                  color: crData.score >= 60 ? '#000' : '#fff',
                  fontSize: '0.85rem',
                  verticalAlign: 'middle',
                  marginLeft: '8px'
                }}>
                  {crData.categoryLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione KPI Principali CR - 8 KPI Cards */}
      <section id="kpi-section" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-key me-2"></i>
          INDICATORI CHIAVE CR (Febbraio 2025)
        </h4>

        <div className="row">
          {/* KPI 1: Monte Affidamenti */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                backgroundColor: '#191970'
              }}>
                <i className="fas fa-file-invoice-dollar"></i>
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
                  Monte Affidamenti
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(crData.accordatoTotale)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#4CAF50'
                }}>
                  <i className="fas fa-arrow-up me-1"></i>
                  In crescita +8.5%
                </div>
              </div>
            </div>
          </div>

          {/* KPI 2: Monte Utilizzi */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                backgroundColor: '#4f6d7a'
              }}>
                <i className="fas fa-hand-holding-usd"></i>
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
                  Monte Utilizzi
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(crData.utilizzatoTotale)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#6c757d'
                }}>
                  Utilizzo: {crData.utilizzoPercentuale}%
                </div>
              </div>
            </div>
          </div>

          {/* KPI 3: Sconfini / Impagati */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                <i className="fas fa-exclamation-triangle"></i>
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
                  Sconfini / Impagati
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#4CAF50',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  €0
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#4CAF50'
                }}>
                  Nessun sconfino
                </div>
              </div>
            </div>
          </div>

          {/* KPI 4: Crediti Scaduti */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                  Crediti Scaduti
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#FFC107',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(crData.creditiScaduti)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#FFC107'
                }}>
                  Presenza crediti scaduti
                </div>
              </div>
            </div>
          </div>

          {/* KPI 5: Sofferenze */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                <i className="fas fa-user-shield"></i>
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
                  Sofferenze
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#4CAF50',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  Assenti
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#4CAF50'
                }}>
                  Nessuna Segnalazione
                </div>
              </div>
            </div>
          </div>

          {/* KPI 6: Banche Segnalanti */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                backgroundColor: '#4f6d7a'
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
                  Banche Segnalanti
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {crData.bancheSegnalanti}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#6c757d'
                }}>
                  Stabile
                </div>
              </div>
            </div>
          </div>

          {/* KPI 7: Garanzie Ricevute */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                backgroundColor: '#191970'
              }}>
                <i className="fas fa-shield-alt"></i>
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
                  Garanzie Ricevute
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  {formatCurrency(crData.garanzieRicevute)}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#6c757d'
                }}>
                  Su proprie esposizioni
                </div>
              </div>
            </div>
          </div>

          {/* KPI 8: Tipo Garanzie Principali */}
          <div className="col-lg-3 col-md-6 mb-4">
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
                backgroundColor: '#4a69bd'
              }}>
                <i className="fas fa-tags"></i>
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
                  Tipo Garanzie Principali
                </div>
                <div style={{
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  color: '#343a40',
                  lineHeight: 1.2,
                  marginBottom: '3px'
                }}>
                  Varie fonti
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#6c757d'
                }}>
                  Copertura: {crData.copertura}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Alert Principali CR - 2 Alert Cards */}
      <section id="alerts-section" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-bell me-2" style={{ color: '#F44336' }}></i>
          ANOMALIE CR RILEVATE (Febbraio 2025)
        </h4>

        <div className="row">
          {/* Alert 1: Crediti Scaduti */}
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
                  Crediti Scaduti{' '}
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
                  Presenza di crediti scaduti autoliquidanti per €69.522 (impagati) e €208.447 (pagati) presso Banco di Sardegna.
                </p>
              </div>
            </div>
          </div>

          {/* Alert 2: Elevato Utilizzo Linee */}
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
              <i className="fas fa-chart-line" style={{
                fontSize: '1.8rem',
                marginRight: '1rem',
                flexShrink: 0,
                width: '40px',
                textAlign: 'center',
                color: '#31708f'
              }}></i>
              <div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '1.1rem', color: '#055160' }}>
                  Elevato Utilizzo Linee{' '}
                  <span className="badge text-dark ms-2" style={{
                    backgroundColor: '#0dcaf0',
                    fontSize: '0.75rem',
                    padding: '5px 10px',
                    fontWeight: 600
                  }}>
                    Monitoraggio
                  </span>
                </h5>
                <p style={{ fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.5, color: '#055160' }}>
                  Utilizzo complessivo del {crData.utilizzoPercentuale}% con punte elevate su alcune linee specifiche.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Grafici Chiave CR - 4 Charts */}
      <section id="charts-section" className="mb-4">
        <h4 className="section-title" style={{
          color: 'var(--primary)',
          fontWeight: 600,
          marginTop: '2.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid var(--secondary)',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <i className="fas fa-chart-pie me-2"></i>
          GRAFICI CHIAVE CR
        </h4>

        <div className="row">
          {/* Chart 1: Andamento Accordato/Utilizzato */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Andamento Accordato/Utilizzato Totale (12 mesi)
                </h6>
                <div style={{ height: '350px' }}>
                  <Bar
                    data={{
                      labels: ["feb-24", "mar-24", "apr-24", "mag-24", "giu-24", "lug-24", "ago-24", "set-24", "ott-24", "nov-24", "dic-24", "gen-25", "feb-25"],
                      datasets: [
                        {
                          label: 'Accordato',
                          data: [7300000, 7350000, 7400000, 7450000, 7500000, 7550000, 7600000, 7650000, 7700000, 7750000, 7800000, 7850000, 7933629],
                          backgroundColor: 'rgba(25, 25, 112, 0.8)'
                        },
                        {
                          label: 'Utilizzato',
                          data: [5400000, 5450000, 5500000, 5550000, 5600000, 5650000, 5700000, 5750000, 5800000, 5850000, 5900000, 5800000, 5853265],
                          backgroundColor: 'rgba(77, 140, 87, 0.8)'
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
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

          {/* Chart 2: Distribuzione Affidamenti */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Distribuzione Affidamenti per Tipo (Ult. Mese)
                </h6>
                <div style={{ height: '350px' }}>
                  <Doughnut
                    data={{
                      labels: ["Autoliquidante", "Scadenza", "Revoca"],
                      datasets: [{
                        data: [16.8, 77.0, 6.2],
                        backgroundColor: ['#4a69bd', '#191970', '#FFC107']
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
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

          {/* Chart 3: Andamento Segnalazioni Negative */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Andamento Segnalazioni Negative (Ultimi 6 mesi)
                </h6>
                <div style={{ height: '350px' }}>
                  <Bar
                    data={{
                      labels: ["set-24", "ott-24", "nov-24", "dic-24", "gen-25", "feb-25"],
                      datasets: [{
                        label: 'Sconfini/Impagati',
                        data: [0, 0, 0, 0, 0, 277969],
                        backgroundColor: 'rgba(214, 34, 70, 0.8)'
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
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

          {/* Chart 4: Andamento Garanzie */}
          <div className="col-lg-6 mb-4">
            <div className="card" style={{ border: '1px solid #dee2e6', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
              <div className="card-body">
                <h6 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
                  Andamento Garanzie Ricevute (12 mesi)
                </h6>
                <div style={{ height: '350px' }}>
                  <Line
                    data={{
                      labels: ["feb-24", "apr-24", "giu-24", "ago-24", "ott-24", "dic-24", "feb-25"],
                      datasets: [{
                        label: 'Garanzie',
                        data: [4800000, 4900000, 5000000, 5050000, 5100000, 5120000, 5141080],
                        borderColor: 'rgba(77, 140, 87, 1)',
                        tension: 0.1,
                        fill: false
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
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

      {/* Accordion: Approfondimenti Dettagliati CR - 6 Sections */}
      <h2 className="section-title" id="details-accordion" style={{
        color: 'var(--primary)',
        fontWeight: 600,
        marginTop: '3rem',
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid var(--secondary)',
        fontSize: '1.75rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <i className="fas fa-layer-group me-2"></i>
        Approfondimenti Dettagliati CR
      </h2>

      <div className="accordion mb-4" id="crDetailsAccordion">
        {/* Accordion 1: Scoring e Anomalie */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingScoring">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseScoring"
              aria-expanded="false"
              aria-controls="collapseScoring"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-star-half-alt me-2"></i>
              Scoring e Anomalie Rilevate
            </button>
          </h2>
          <div id="collapseScoring" className="accordion-collapse collapse" aria-labelledby="headingScoring" data-bs-parent="#crDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Punteggio CR (Febbraio 2025): {crData.score}/100 - {crData.category}
              </h6>
              <p>La presenza di crediti scaduti e l'elevato utilizzo delle linee richiedono un monitoraggio costante.</p>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Dettaglio Anomalie Presenti/Assenti
              </h6>
              <ul className="list-group list-group-flush small">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-times-circle text-success me-2"></i>Crediti Passati a Perdita / Sofferenze</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-check-circle text-success me-2"></i>Insoluti / Sconfini</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-tachometer-alt text-warning me-2"></i>Tensione Finanziaria</span>
                  <span className="badge bg-warning text-dark">Presente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-edit text-success me-2"></i>Errate Segnalazioni</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-shield-alt text-success me-2"></i>Anomalie su Garanzie</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-calendar-times text-warning me-2"></i>Crediti Scaduti &gt;90/180 gg</span>
                  <span className="badge bg-warning text-dark">Presente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-random text-success me-2"></i>Insoluti Categorie Particolari</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-chart-pie text-success me-2"></i>Concentrazione Rischio</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-gavel text-success me-2"></i>Posizioni Contestate</span>
                  <span className="badge bg-success">Assente</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span><i className="fas fa-chart-line text-success me-2"></i>Derivati Finanziari</span>
                  <span className="badge bg-success">Assente</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accordion 2: Affidamenti e Utilizzi */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingAffidamenti">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseAffidamenti"
              aria-expanded="false"
              aria-controls="collapseAffidamenti"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-credit-card me-2"></i>
              Affidamenti e Utilizzi
            </button>
          </h2>
          <div id="collapseAffidamenti" className="accordion-collapse collapse" aria-labelledby="headingAffidamenti" data-bs-parent="#crDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Monte Affidamenti e Utilizzi (Febbraio 2025)
              </h6>
              <div className="table-responsive mb-3">
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th className="text-end">Accordato (€)</th>
                      <th className="text-end">Utilizzato (€)</th>
                      <th className="text-end">Utilizzo %</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Autoliquidante</td>
                      <td className="text-end">€1.300.000</td>
                      <td className="text-end">€1.184.495</td>
                      <td className="text-end">91,1%</td>
                      <td>Elevato utilizzo</td>
                    </tr>
                    <tr>
                      <td>Scadenza</td>
                      <td className="text-end">€6.108.629</td>
                      <td className="text-end">€4.235.454</td>
                      <td className="text-end">69,3%</td>
                      <td>Utilizzo moderato</td>
                    </tr>
                    <tr>
                      <td>Revoca</td>
                      <td className="text-end">€528.299</td>
                      <td className="text-end">€433.316</td>
                      <td className="text-end">82,0%</td>
                      <td>Utilizzo elevato</td>
                    </tr>
                    <tr className="table-active">
                      <td><strong>Totale</strong></td>
                      <td className="text-end"><strong>€7.933.629</strong></td>
                      <td className="text-end"><strong>€5.853.265</strong></td>
                      <td className="text-end"><strong>73,8%</strong></td>
                      <td><strong>Monitorare</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Utilizzo Medio Linee (12 mesi)
              </h6>
              <ul className="small">
                <li>Autoliquidante: 85,5%</li>
                <li>Scadenza: 68,2%</li>
                <li>Revoca: 75,3%</li>
              </ul>
              <p>
                L'utilizzo delle linee autoliquidanti è molto elevato (91,1%), indicando una forte dipendenza dal circolante.
                Le linee a scadenza mostrano un utilizzo più equilibrato.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion 3: Sconfini e Impagati */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingSconfini">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSconfini"
              aria-expanded="false"
              aria-controls="collapseSconfini"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-exclamation-triangle me-2"></i>
              Sconfini e Impagati
            </button>
          </h2>
          <div id="collapseSconfini" className="accordion-collapse collapse" aria-labelledby="headingSconfini" data-bs-parent="#crDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Sconfini / Impagati Segnalati (Febbraio 2025)
              </h6>
              <p>Valore totale segnalato: <strong>€277.969</strong>.</p>
              <p>Tipo: <strong>Crediti Scaduti</strong></p>
              <p>Evitabili: <strong>Da verificare</strong></p>
              <p>Periodo Principale: <strong>Febbraio 2025</strong></p>
              <p>
                I crediti scaduti sono concentrati presso Banco di Sardegna con €69.522 impagati e €208.447 pagati.
              </p>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Banche con Segnalazioni Principali
              </h6>
              <ul className="small">
                <li>BANCO DI SARDEGNA SPA: Crediti autoliquidanti scaduti (Febbraio 2025) - Importo: €277.969</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accordion 4: Garanzie */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingGaranzie">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseGaranzie"
              aria-expanded="false"
              aria-controls="collapseGaranzie"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-shield-alt me-2"></i>
              Garanzie
            </button>
          </h2>
          <div id="collapseGaranzie" className="accordion-collapse collapse" aria-labelledby="headingGaranzie" data-bs-parent="#crDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Garanzie Ricevute (Febbraio 2025)
              </h6>
              <p>Totale garanzie ricevute: <strong>€5.141.080</strong>.</p>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Principali Garanti:
              </h6>
              <ul className="small">
                <li>FIDICOOP SARDEGNA SOC. COOPERATIVA: €1.014.765 (19,7%) - Trend: Stabile (Garanzie su varie linee)</li>
                <li>FONDO DI GARANZIA L. 23.12.96 N. 662: €1.024.978 (19,9%) - Trend: Stabile (Garanzie MCC)</li>
                <li>FONDO REGIONALE DI GARANZIA PER PMI SARDEGNA: €193.419 (3,8%) - Trend: Stabile (Garanzie regionali)</li>
                <li>Cointestazione FRESU-FURCAS-MURA: €2.907.918 (56,6%) - Trend: Stabile (Garanzie personali dei soci)</li>
              </ul>
              <p>
                Le garanzie sono ben diversificate tra fonti istituzionali (43,4%) e garanzie personali dei soci (56,6%).
              </p>
            </div>
          </div>
        </div>

        {/* Accordion 5: Analisi Tesoreria */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingTesoreria">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTesoreria"
              aria-expanded="false"
              aria-controls="collapseTesoreria"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-cash-register me-2"></i>
              Sintesi Analisi Tesoreria
            </button>
          </h2>
          <div id="collapseTesoreria" className="accordion-collapse collapse" aria-labelledby="headingTesoreria" data-bs-parent="#crDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Disponibilità Media Fidi a Revoca (12 mesi)
              </h6>
              <p>Le linee a revoca mostrano un margine disponibile limitato con un utilizzo medio dell'82%.</p>
              <ul className="small">
                <li>BANCO DI SARDEGNA: €112.983 (Oscillazione: Media)</li>
                <li>BANCA NAZIONALE DEL LAVORO: €12.258 (Oscillazione: Bassa)</li>
              </ul>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Equilibrio Utilizzo Linee (12 mesi)
              </h6>
              <ul className="small">
                <li>Autoliquidante: 85,5%</li>
                <li>Scadenza: 68,2%</li>
                <li>Revoca: 75,3%</li>
              </ul>
              <p>
                Squilibrato verso le linee autoliquidanti che mostrano un utilizzo molto elevato. Necessario riequilibrare.
              </p>

              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginTop: '1rem', marginBottom: '0.5rem' }}>
                Rischiosità Portafoglio / Impagati
              </h6>
              <p>
                La presenza di crediti scaduti e l'elevato utilizzo delle linee autoliquidanti indicano
                una potenziale tensione sulla liquidità aziendale.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion 6: Dettaglio per Banca */}
        <div className="accordion-item mb-3" style={{
          backgroundColor: '#ffffff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          <h2 className="accordion-header" id="headingBanche">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBanche"
              aria-expanded="false"
              aria-controls="collapseBanche"
              style={{
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'var(--primary)',
                backgroundColor: '#f8f9fa',
                borderRadius: '7px 7px 0 0'
              }}
            >
              <i className="fas fa-university me-2"></i>
              Dettaglio per Banca (Febbraio 2025)
            </button>
          </h2>
          <div id="collapseBanche" className="accordion-collapse collapse" aria-labelledby="headingBanche" data-bs-parent="#crDetailsAccordion">
            <div className="accordion-body" style={{ padding: '1.5rem', fontSize: '0.9rem' }}>
              <h6 style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                Dettaglio Accordato Operativo / Utilizzato (Ultimo Mese)
              </h6>
              <div className="table-responsive">
                <table className="table table-sm table-striped table-hover small">
                  <thead className="table-light">
                    <tr>
                      <th>Banca</th>
                      <th className="text-end">Acc. Autoliq (€)</th>
                      <th className="text-end">Acc. Scadenza (€)</th>
                      <th className="text-end">Acc. Revoca (€)</th>
                      <th className="text-end">Util. Autoliq (€)</th>
                      <th className="text-end">Util. Scadenza (€)</th>
                      <th className="text-end">Util. Revoca (€)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BANCO DI SARDEGNA SPA</td>
                      <td className="text-end">850.000</td>
                      <td className="text-end">3.518.604</td>
                      <td className="text-end">503.299</td>
                      <td className="text-end">834.671</td>
                      <td className="text-end">2.060.235</td>
                      <td className="text-end">390.333</td>
                    </tr>
                    <tr>
                      <td>BANCA NAZIONALE DEL LAVORO</td>
                      <td className="text-end">200.000</td>
                      <td className="text-end">0</td>
                      <td className="text-end">25.000</td>
                      <td className="text-end">179.258</td>
                      <td className="text-end">0</td>
                      <td className="text-end">12.742</td>
                    </tr>
                    <tr>
                      <td>BANCO DI DESIO E DELLA BRIANZA</td>
                      <td className="text-end">300.000</td>
                      <td className="text-end">525.000</td>
                      <td className="text-end">0</td>
                      <td className="text-end">244.764</td>
                      <td className="text-end">525.000</td>
                      <td className="text-end">0</td>
                    </tr>
                    <tr>
                      <td>BANCA DI CREDITO COOP.</td>
                      <td className="text-end">650.000</td>
                      <td className="text-end">1.810.242</td>
                      <td className="text-end">0</td>
                      <td className="text-end">570.069</td>
                      <td className="text-end">1.810.242</td>
                      <td className="text-end">0</td>
                    </tr>
                    <tr>
                      <td>Altri intermediari</td>
                      <td className="text-end">400.000</td>
                      <td className="text-end">255.783</td>
                      <td className="text-end">0</td>
                      <td className="text-end">339.237</td>
                      <td className="text-end">255.783</td>
                      <td className="text-end">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Nested Accordion for Historical Data */}
              <div className="accordion accordion-flush small mt-3" id="historicalBankData">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingHistory">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseHistory"
                      aria-expanded="false"
                      aria-controls="collapseHistory"
                    >
                      Visualizza Dati Storici Dettagliati per Banca (Ultimi 12 Mesi)
                    </button>
                  </h2>
                  <div id="collapseHistory" className="accordion-collapse collapse" aria-labelledby="headingHistory" data-bs-parent="#historicalBankData">
                    <div className="accordion-body p-0">
                      <p className="text-muted ps-3">
                        Tabella dettagliata dell'evoluzione mensile di accordato e utilizzato per singola banca.
                      </p>
                      <div className="table-responsive">
                        <table className="table table-sm table-bordered table-striped table-hover" style={{ fontSize: '0.75rem' }}>
                          <thead className="table-light">
                            <tr>
                              <th>Periodo</th>
                              <th className="text-end">Acc. Autoliq</th>
                              <th className="text-end">Acc. Scadenza</th>
                              <th className="text-end">Acc. Revoca</th>
                              <th className="text-end">Util. Autoliq</th>
                              <th className="text-end">Util. Scadenza</th>
                              <th className="text-end">Util. Revoca</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td>feb-25</td><td className="text-end">1.300.000</td><td className="text-end">6.108.629</td><td className="text-end">528.299</td><td className="text-end">1.184.495</td><td className="text-end">4.235.454</td><td className="text-end">433.316</td></tr>
                            <tr><td>gen-25</td><td className="text-end">1.300.000</td><td className="text-end">6.050.000</td><td className="text-end">528.299</td><td className="text-end">1.150.000</td><td className="text-end">4.200.000</td><td className="text-end">450.000</td></tr>
                            <tr><td>dic-24</td><td className="text-end">1.300.000</td><td className="text-end">6.000.000</td><td className="text-end">528.299</td><td className="text-end">1.200.000</td><td className="text-end">4.300.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>nov-24</td><td className="text-end">1.250.000</td><td className="text-end">6.000.000</td><td className="text-end">528.299</td><td className="text-end">1.100.000</td><td className="text-end">4.350.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>ott-24</td><td className="text-end">1.250.000</td><td className="text-end">5.950.000</td><td className="text-end">528.299</td><td className="text-end">1.150.000</td><td className="text-end">4.250.000</td><td className="text-end">450.000</td></tr>
                            <tr><td>set-24</td><td className="text-end">1.250.000</td><td className="text-end">5.900.000</td><td className="text-end">528.299</td><td className="text-end">1.100.000</td><td className="text-end">4.200.000</td><td className="text-end">450.000</td></tr>
                            <tr><td>ago-24</td><td className="text-end">1.200.000</td><td className="text-end">5.900.000</td><td className="text-end">528.299</td><td className="text-end">1.050.000</td><td className="text-end">4.200.000</td><td className="text-end">450.000</td></tr>
                            <tr><td>lug-24</td><td className="text-end">1.200.000</td><td className="text-end">5.850.000</td><td className="text-end">528.299</td><td className="text-end">1.100.000</td><td className="text-end">4.150.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>giu-24</td><td className="text-end">1.200.000</td><td className="text-end">5.800.000</td><td className="text-end">528.299</td><td className="text-end">1.100.000</td><td className="text-end">4.100.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>mag-24</td><td className="text-end">1.150.000</td><td className="text-end">5.800.000</td><td className="text-end">528.299</td><td className="text-end">1.050.000</td><td className="text-end">4.100.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>apr-24</td><td className="text-end">1.150.000</td><td className="text-end">5.750.000</td><td className="text-end">528.299</td><td className="text-end">1.000.000</td><td className="text-end">4.100.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>mar-24</td><td className="text-end">1.150.000</td><td className="text-end">5.700.000</td><td className="text-end">528.299</td><td className="text-end">1.000.000</td><td className="text-end">4.050.000</td><td className="text-end">400.000</td></tr>
                            <tr><td>feb-24</td><td className="text-end">1.100.000</td><td className="text-end">5.700.000</td><td className="text-end">528.299</td><td className="text-end">950.000</td><td className="text-end">4.050.000</td><td className="text-end">400.000</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}
