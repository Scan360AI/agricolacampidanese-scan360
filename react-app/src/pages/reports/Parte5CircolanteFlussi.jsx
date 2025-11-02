import DashboardLayout from '../../components/DashboardLayout'

export default function Parte5CircolanteFlussi() {
  return (
    <DashboardLayout
      title="Parte 5: Circolante e Flussi di Cassa"
      subtitle="Analisi capitale circolante e cash flow"
    >
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-exchange-alt me-2"></i>
          Circolante e Flussi
        </h5>
        <p>
          Questa sezione analizza il capitale circolante netto, i flussi di cassa operativi
          e la gestione della liquidità aziendale.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-coins"></i>
        Indicatori di Liquidità
      </h2>

      <div className="row">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-danger">
            <div className="card-title-modern">CCN</div>
            <div className="kpi-value-modern">-€4.8M</div>
            <i className="fas fa-sync-alt kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Cash Flow Op.</div>
            <div className="kpi-value-modern">€424K</div>
            <i className="fas fa-hand-holding-usd kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">DSO</div>
            <div className="kpi-value-modern">47 gg</div>
            <i className="fas fa-calendar kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">DPO</div>
            <div className="kpi-value-modern">75 gg</div>
            <i className="fas fa-calendar-check kpi-icon-modern-bg"></i>
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
