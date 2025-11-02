import DashboardLayout from '../components/DashboardLayout'

export default function MonitorCDAPage() {
  return (
    <DashboardLayout
      title="Monitor CDA"
      subtitle="Monitoraggio Consiglio di Amministrazione"
    >
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-users me-2"></i>
          Monitor CDA
        </h5>
        <p>
          Sistema di monitoraggio dedicato alle attività e decisioni del Consiglio di
          Amministrazione.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-chart-pie"></i>
        Composizione CDA
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Membri Totali</div>
            <div className="kpi-value-modern">7</div>
            <div className="kpi-description-modern">
              Composizione attuale del consiglio
            </div>
            <i className="fas fa-users kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Riunioni 2024</div>
            <div className="kpi-value-modern">12</div>
            <div className="kpi-description-modern">
              Numero di riunioni tenutesi nell'anno
            </div>
            <i className="fas fa-calendar kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">Delibere 2024</div>
            <div className="kpi-value-modern">48</div>
            <div className="kpi-description-modern">
              Delibere approvate nell'anno corrente
            </div>
            <i className="fas fa-file-alt kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        <i className="fas fa-list"></i>
        Membri del Consiglio
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ruolo</th>
                  <th>Data Nomina</th>
                  <th>Scadenza Mandato</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Mario Rossi</strong></td>
                  <td>Presidente</td>
                  <td>15/04/2022</td>
                  <td>14/04/2025</td>
                  <td><span className="status-badge bg-success">Attivo</span></td>
                </tr>
                <tr>
                  <td><strong>Luigi Bianchi</strong></td>
                  <td>Vice Presidente</td>
                  <td>15/04/2022</td>
                  <td>14/04/2025</td>
                  <td><span className="status-badge bg-success">Attivo</span></td>
                </tr>
                <tr>
                  <td><strong>Anna Verdi</strong></td>
                  <td>Consigliere</td>
                  <td>15/04/2022</td>
                  <td>14/04/2025</td>
                  <td><span className="status-badge bg-success">Attivo</span></td>
                </tr>
                <tr>
                  <td><strong>Paolo Neri</strong></td>
                  <td>Consigliere</td>
                  <td>15/04/2022</td>
                  <td>14/04/2025</td>
                  <td><span className="status-badge bg-success">Attivo</span></td>
                </tr>
                <tr>
                  <td><strong>Maria Gialli</strong></td>
                  <td>Consigliere</td>
                  <td>15/04/2022</td>
                  <td>14/04/2025</td>
                  <td><span className="status-badge bg-success">Attivo</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        <i className="fas fa-clipboard-list"></i>
        Ultime Delibere
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Oggetto</th>
                  <th>Tipo</th>
                  <th>Esito</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>15/01/2024</td>
                  <td>Approvazione Budget 2024</td>
                  <td><span className="status-badge bg-info">Economica</span></td>
                  <td><span className="status-badge bg-success">Approvata</span></td>
                </tr>
                <tr>
                  <td>20/02/2024</td>
                  <td>Investimenti in macchinari</td>
                  <td><span className="status-badge bg-warning">Investimenti</span></td>
                  <td><span className="status-badge bg-success">Approvata</span></td>
                </tr>
                <tr>
                  <td>18/03/2024</td>
                  <td>Revisione politiche creditizie</td>
                  <td><span className="status-badge bg-info">Finanziaria</span></td>
                  <td><span className="status-badge bg-success">Approvata</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
