import DashboardLayout from '../../components/DashboardLayout'

export default function Parte4Bancabilita() {
  return (
    <DashboardLayout
      title="Parte 4: Bancabilità"
      subtitle="Valutazione capacità di accesso al credito"
    >
      <div className="alert-box alert-warning">
        <h5>
          <i className="fas fa-university me-2"></i>
          Analisi di Bancabilità
        </h5>
        <p>
          Questa sezione valuta la capacità dell'azienda di accedere al credito bancario,
          analizzando sostenibilità del debito e rating creditizio.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-balance-scale"></i>
        Indicatori di Sostenibilità
      </h2>

      <div className="row">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-danger">
            <div className="card-title-modern">PFN/EBITDA</div>
            <div className="kpi-value-modern">6.19x</div>
            <i className="fas fa-balance-scale kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">D/E Ratio</div>
            <div className="kpi-value-modern">7.5x</div>
            <i className="fas fa-percentage kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">DSCR</div>
            <div className="kpi-value-modern">1.2x</div>
            <i className="fas fa-chart-line kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Rating</div>
            <div className="kpi-value-modern">BB</div>
            <i className="fas fa-star kpi-icon-modern-bg"></i>
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
