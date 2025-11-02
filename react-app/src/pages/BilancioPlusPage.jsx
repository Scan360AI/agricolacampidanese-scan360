import DashboardLayout from '../components/DashboardLayout'
import financialData from '../data/financial-data.json'

export default function BilancioPlusPage() {
  const mainMetrics = financialData.parte1.mainMetrics

  return (
    <DashboardLayout
      title="Bilancio Plus"
      subtitle="Analisi dettagliata del bilancio aziendale"
    >
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Bilancio Plus
        </h5>
        <p>
          Questa sezione offre un'analisi approfondita del bilancio aziendale con indicatori
          chiave e confronti temporali.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-chart-bar"></i>
        Metriche Principali
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <h5 style={{ color: 'var(--primary)', marginBottom: '20px' }}>
              Evoluzione Indicatori Chiave
            </h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Indicatore</th>
                  <th className="text-end">2022</th>
                  <th className="text-end">2023</th>
                  <th className="text-end">2024</th>
                  <th className="text-end">Variazione %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ricavi</strong></td>
                  <td className="text-end">€{(mainMetrics.ricavi[0] / 1000).toFixed(0)}K</td>
                  <td className="text-end">€{(mainMetrics.ricavi[1] / 1000).toFixed(0)}K</td>
                  <td className="text-end value-highlight">€{(mainMetrics.ricavi[2] / 1000).toFixed(0)}K</td>
                  <td className="text-end text-success">+2.9%</td>
                </tr>
                <tr>
                  <td><strong>EBITDA</strong></td>
                  <td className="text-end text-danger">€{(mainMetrics.ebitda[0] / 1000).toFixed(0)}K</td>
                  <td className="text-end">€{(mainMetrics.ebitda[1] / 1000).toFixed(0)}K</td>
                  <td className="text-end value-highlight">€{(mainMetrics.ebitda[2] / 1000).toFixed(0)}K</td>
                  <td className="text-end text-success">+35.2%</td>
                </tr>
                <tr>
                  <td><strong>Patrimonio Netto</strong></td>
                  <td className="text-end">€{(mainMetrics.patrimonioNetto[0] / 1000).toFixed(0)}K</td>
                  <td className="text-end">€{(mainMetrics.patrimonioNetto[1] / 1000).toFixed(0)}K</td>
                  <td className="text-end value-highlight">€{(mainMetrics.patrimonioNetto[2] / 1000).toFixed(0)}K</td>
                  <td className="text-end text-secondary">0.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Ricavi 2024</div>
            <div className="kpi-value-modern">€21.2M</div>
            <div className="kpi-description-modern">
              Crescita sostenuta rispetto all'anno precedente
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">EBITDA 2024</div>
            <div className="kpi-value-modern">€843K</div>
            <div className="kpi-description-modern">
              Miglioramento significativo della marginalità
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Patrimonio Netto</div>
            <div className="kpi-value-modern">€698K</div>
            <div className="kpi-description-modern">
              Stabile rispetto al 2023
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
