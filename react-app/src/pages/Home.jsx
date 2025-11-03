import { Link } from 'react-router-dom'
import financialData from '../data/financial-data.json'

export default function Home() {
  const { company, irp, kpis } = financialData

  return (
    <div style={{
      fontFamily: "'Titillium Web', sans-serif",
      backgroundColor: '#ffffff',
      color: '#2a2a2a',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'rgb(25, 25, 112)',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0'
          }}>
            <div>
              <img src="/assets/img/logo_scan.png" alt="SCAN360 Logo" height="50" />
            </div>
            <div>
              <img src="/assets/img/logo_kitzanos.png" alt="Kitzanos Logo" height="30" />
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Hero Section */}
        <div style={{
          height: '400px',
          position: 'relative',
          marginTop: '30px',
          marginBottom: '40px',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: 'rgb(25, 25, 112)',
          backgroundImage: 'linear-gradient(135deg, rgb(25, 25, 112) 0%, rgba(25, 25, 112, 0.7) 100%), url(https://wallpaper.dog/large/976123.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px'
        }}>
          <div style={{
            maxWidth: '60%',
            position: 'relative',
            zIndex: 2
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {company.name}
            </h1>
            <div style={{ fontSize: '1.2rem', marginBottom: '30px', lineHeight: 1.6, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: '30px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}>
                  <i className="fas fa-calendar-alt me-2"></i> <strong>Report:</strong> {company.reportDate}
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}>
                  <i className="fas fa-map-marker-alt me-2"></i> <strong>Sede:</strong> Italia
                </span>
              </div>
              <div style={{ display: 'flex', gap: '30px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}>
                  <i className="fas fa-id-card me-2"></i> <strong>Settore:</strong> {company.sector}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '30px', marginBottom: '15px', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}>
                  <i className="fas fa-money-bill-wave me-2"></i> <strong>Ricavi 2024:</strong> €{(kpis.economic.ricavi2024 / 1000000).toFixed(2)}M
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}>
                  <i className="fas fa-shield-alt me-2"></i> <strong>IRP:</strong> {irp.score.toFixed(2)}/100 ({irp.categoryLabel})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <h2 style={{
          color: '#2a2a2a',
          margin: '40px 0 20px',
          fontWeight: 600,
          paddingBottom: '10px',
          fontSize: '1.8rem',
          borderBottom: '2px solid rgb(25, 25, 112)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-toolbox me-2"></i> I prodotti SCAN360
        </h2>

        {/* Netflix Style Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* Card 1: Analisi Economico Finanziaria */}
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <div className="movie-card" style={{
              width: '100%',
              height: '400px',
              position: 'relative',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              backgroundImage: 'url(https://wallpaper.dog/large/976123.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <span style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 3,
                backgroundColor: 'rgb(77, 140, 87)',
                color: 'white'
              }}>
                Servizio attivo
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(25, 25, 112, 0.7) 90%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px'
              }}>
                <div style={{ color: 'white', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    Analisi Economico Finanziaria
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Analisi approfondita della performance economico-finanziaria aziendale con benchmark di settore, indicatori di rischio e raccomandazioni operative.
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="fas fa-check-circle me-1"></i> Procedi al servizio
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: Zero Moment of Truth */}
          <a href="https://rococo-squirrel-3950d1.netlify.app/zmot-main" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div className="movie-card" style={{
              width: '100%',
              height: '400px',
              position: 'relative',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              backgroundImage: 'url(https://wallpaper.dog/large/877553.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <span style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 3,
                backgroundColor: 'rgb(217, 140, 0)',
                color: 'white'
              }}>
                Richiedilo ora
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(25, 25, 112, 0.7) 90%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px'
              }}>
                <div style={{ color: 'white', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    Zero Moment of Truth
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Valutazione strategica della reputazione digitale e presenza online della tua azienda, con analisi della concorrenza e piano d'azione ottimizzato.
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="fas fa-external-link-alt me-1"></i> Visualizza la demo
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* Card 3: Monitor CdA */}
          <Link to="/monitor-cda" style={{ textDecoration: 'none' }}>
            <div className="movie-card" style={{
              width: '100%',
              height: '400px',
              position: 'relative',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              backgroundImage: 'url(https://wallpaper.dog/large/976022.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <span style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 3,
                backgroundColor: 'rgb(77, 140, 87)',
                color: 'white'
              }}>
                Servizio attivo
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(25, 25, 112, 0.7) 90%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px'
              }}>
                <div style={{ color: 'white', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    Monitor CdA
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Dashboard integrata per il monitoraggio continuo degli indicatori chiave di performance e di rischio, allineata con gli obblighi del Codice della Crisi.
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="fas fa-check-circle me-1"></i> Procedi al servizio
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 4: Bilancio Plus */}
          <Link to="/bilancio-plus" style={{ textDecoration: 'none' }}>
            <div className="movie-card" style={{
              width: '100%',
              height: '400px',
              position: 'relative',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              backgroundImage: 'url(https://wallpaper.dog/large/976123.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <span style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 3,
                backgroundColor: 'rgb(77, 140, 87)',
                color: 'white'
              }}>
                Servizio attivo
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(25, 25, 112, 0.7) 90%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px'
              }}>
                <div style={{ color: 'white', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    Bilancio Plus
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Analisi predittiva e prospettica del bilancio con simulazioni di scenari, supporto alla pianificazione finanziaria e ottimizzazione delle strategie.
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="fas fa-external-link-alt me-1"></i> Scopri di più
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 5: Centrale Rischi */}
          <Link to="/centrale-rischi" style={{ textDecoration: 'none' }}>
            <div className="movie-card" style={{
              width: '100%',
              height: '400px',
              position: 'relative',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              backgroundImage: 'url(https://wallpaper.dog/large/976022.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <span style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                padding: '5px 10px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 3,
                backgroundColor: 'rgb(77, 140, 87)',
                color: 'white'
              }}>
                Servizio attivo
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(25, 25, 112, 0.7) 90%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px'
              }}>
                <div style={{ color: 'white', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '10px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
                  }}>
                    Centrale Rischi
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.9,
                    marginBottom: '15px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    Dashboard integrata per l'analisi della centrale rischi.
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="fas fa-check-circle me-1"></i> Procedi al servizio
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '3rem', padding: '2rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-0">&copy; 2025 SCAN360 by Kitzanos. Tutti i diritti riservati.</p>
            </div>
            <div className="col-md-6 text-end">
              <img src="/assets/img/kitzanos_logo_scuro.png" alt="Kitzanos Logo" height="30" />
            </div>
          </div>
        </div>
      </footer>

      {/* Add hover effect via style tag */}
      <style>{`
        .movie-card:hover {
          transform: scale(1.03);
          z-index: 5;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
