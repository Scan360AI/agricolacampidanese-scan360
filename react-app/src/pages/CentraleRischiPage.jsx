import DashboardLayout from '../components/DashboardLayout'

export default function CentraleRischiPage() {
  return (
    <DashboardLayout
      title="Centrale Rischi"
      subtitle="Monitoraggio esposizioni e rating creditizio"
    >
      <div className="alert-box alert-warning">
        <h5>
          <i className="fas fa-exclamation-triangle me-2"></i>
          Monitoraggio Centrale Rischi
        </h5>
        <p>
          Questa sezione mostra l'esposizione verso il sistema bancario e le segnalazioni
          presso la Centrale dei Rischi di Banca d'Italia.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-university"></i>
        Esposizione Bancaria
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">Esposizione Totale</div>
            <div className="kpi-value-modern">€5.24M</div>
            <div className="kpi-description-modern">
              Debiti finanziari complessivi
            </div>
            <i className="fas fa-hand-holding-usd kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Utilizzo Accordato</div>
            <div className="kpi-value-modern">87%</div>
            <div className="kpi-description-modern">
              Percentuale linee di credito utilizzate
            </div>
            <i className="fas fa-percentage kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Rating Interno</div>
            <div className="kpi-value-modern">BB</div>
            <div className="kpi-description-modern">
              Valutazione creditizia del sistema bancario
            </div>
            <i className="fas fa-star kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        <i className="fas fa-exclamation-circle"></i>
        Dettaglio Esposizioni
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Istituto</th>
                  <th>Tipo Finanziamento</th>
                  <th className="text-end">Accordato</th>
                  <th className="text-end">Utilizzato</th>
                  <th className="text-end">% Utilizzo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Banca Agricola</strong></td>
                  <td>Mutuo a medio termine</td>
                  <td className="text-end">€3,000,000</td>
                  <td className="text-end">€2,800,000</td>
                  <td className="text-end">93%</td>
                  <td><span className="status-badge bg-success">In bonis</span></td>
                </tr>
                <tr>
                  <td><strong>Credito Cooperativo</strong></td>
                  <td>Linea di credito</td>
                  <td className="text-end">€1,500,000</td>
                  <td className="text-end">€1,200,000</td>
                  <td className="text-end">80%</td>
                  <td><span className="status-badge bg-success">In bonis</span></td>
                </tr>
                <tr>
                  <td><strong>Banca Commerciale</strong></td>
                  <td>Anticipo fatture</td>
                  <td className="text-end">€800,000</td>
                  <td className="text-end">€650,000</td>
                  <td className="text-end">81%</td>
                  <td><span className="status-badge bg-success">In bonis</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="alert-box alert-info mt-4">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Note
        </h5>
        <p style={{ marginBottom: 0 }}>
          Tutti i rapporti bancari risultano attualmente <strong>in bonis</strong>. Non si
          registrano sconfinamenti o segnalazioni negative presso la Centrale dei Rischi.
        </p>
      </div>
    </DashboardLayout>
  )
}
