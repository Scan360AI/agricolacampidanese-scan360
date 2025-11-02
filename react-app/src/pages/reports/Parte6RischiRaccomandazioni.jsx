import DashboardLayout from '../../components/DashboardLayout'

export default function Parte6RischiRaccomandazioni() {
  return (
    <DashboardLayout
      title="Parte 6: Rischi e Raccomandazioni"
      subtitle="Analisi rischi e suggerimenti strategici"
    >
      <div className="alert-box alert-warning">
        <h5>
          <i className="fas fa-shield-alt me-2"></i>
          Rischi e Raccomandazioni
        </h5>
        <p>
          Questa sezione identifica i principali rischi aziendali e fornisce raccomandazioni
          strategiche per mitigare le criticità rilevate.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-exclamation-triangle"></i>
        Principali Rischi
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="alert-box alert-danger">
            <h5>
              <i className="fas fa-times-circle me-2"></i>
              Rischi Critici
            </h5>
            <ul>
              <li>Elevato rapporto PFN/EBITDA (6.19x)</li>
              <li>Capitale circolante netto negativo</li>
              <li>Liquidità insufficiente</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-warning">
            <h5>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Rischi Moderati
            </h5>
            <ul>
              <li>ROE in diminuzione</li>
              <li>Dipendenza da finanziamenti bancari</li>
              <li>Esposizione a volatilità materie prime</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        <i className="fas fa-lightbulb"></i>
        Raccomandazioni
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <h5 style={{ color: 'var(--primary)', marginBottom: '20px' }}>
              Azioni Prioritarie
            </h5>
            <ol style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
              <li>
                <strong>Riduzione indebitamento:</strong> Continuare la strategia di riduzione del
                debito per portare PFN/EBITDA sotto 3.5x
              </li>
              <li>
                <strong>Gestione capitale circolante:</strong> Ottimizzare i tempi di incasso e
                pagamento per migliorare il CCN
              </li>
              <li>
                <strong>Rafforzamento patrimoniale:</strong> Valutare aumenti di capitale o
                reinvestimento utili
              </li>
              <li>
                <strong>Diversificazione:</strong> Esplorare nuovi canali di vendita e prodotti per
                ridurre rischi
              </li>
              <li>
                <strong>Controllo costi:</strong> Implementare sistema di monitoraggio costi fissi
                e variabili
              </li>
            </ol>
          </div>
        </div>
      </div>

      <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
        <i className="fas fa-info-circle me-2"></i>
        Questa pagina è in fase di sviluppo. I dati sono disponibili nel file JSON.
      </p>
    </DashboardLayout>
  )
}
