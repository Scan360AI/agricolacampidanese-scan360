import DashboardLayout from '../../components/DashboardLayout'

export default function Parte3Patrimoniale() {
  return (
    <DashboardLayout
      title="Parte 3: Analisi Patrimoniale"
      subtitle="Struttura patrimoniale, attivo e passivo"
    >
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-building me-2"></i>
          Analisi Patrimoniale
        </h5>
        <p>
          Questa sezione analizza la composizione dell'attivo e del passivo aziendale, la
          struttura del patrimonio netto e gli indicatori di solidità patrimoniale.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-chart-pie"></i>
        Indicatori Patrimoniali
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Totale Attivo</div>
            <div className="kpi-value-modern">€11.4M</div>
            <i className="fas fa-wallet kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">Patrimonio Netto</div>
            <div className="kpi-value-modern">€698K</div>
            <i className="fas fa-landmark kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-danger">
            <div className="card-title-modern">Indebitamento</div>
            <div className="kpi-value-modern">€10.7M</div>
            <i className="fas fa-money-bill-wave kpi-icon-modern-bg"></i>
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
