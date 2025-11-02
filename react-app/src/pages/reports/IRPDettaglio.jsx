import DashboardLayout from '../../components/DashboardLayout'

export default function IRPDettaglio() {
  return (
    <DashboardLayout
      title="IRP - Indice di Rating Proprietario"
      subtitle="Dettaglio del sistema di valutazione creditizia"
    >
      <div className="alert-box alert-info">
        <h5>
          <i className="fas fa-star me-2"></i>
          Sistema IRP
        </h5>
        <p>
          L'Indice di Rating Proprietario (IRP) è un sistema di valutazione multidimensionale
          che assegna un punteggio di affidabilità creditizia basato su indicatori finanziari
          e qualitativi.
        </p>
      </div>

      <h2 className="section-title">
        <i className="fas fa-chart-line"></i>
        Punteggio Complessivo
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">IRP Score</div>
            <div className="kpi-value-modern">2.90</div>
            <div className="kpi-description-modern">
              Punteggio globale di affidabilità creditizia
            </div>
            <i className="fas fa-star kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">Rating Equivalente</div>
            <div className="kpi-value-modern">BB</div>
            <div className="kpi-description-modern">
              Classificazione rischio medio-alto
            </div>
            <i className="fas fa-chart-bar kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Categoria</div>
            <div className="kpi-value-modern">Zona Grigia</div>
            <div className="kpi-description-modern">
              Richiede monitoraggio attento
            </div>
            <i className="fas fa-flag kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        <i className="fas fa-list-ul"></i>
        Componenti del Rating
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Componente</th>
                  <th>Peso</th>
                  <th className="text-end">Punteggio</th>
                  <th className="text-end">Contributo</th>
                  <th>Valutazione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Redditività</strong></td>
                  <td>25%</td>
                  <td className="text-end">4.2</td>
                  <td className="text-end">1.05</td>
                  <td><span className="status-badge bg-success">Buona</span></td>
                </tr>
                <tr>
                  <td><strong>Solidità Patrimoniale</strong></td>
                  <td>20%</td>
                  <td className="text-end">2.1</td>
                  <td className="text-end">0.42</td>
                  <td><span className="status-badge bg-warning">Moderata</span></td>
                </tr>
                <tr>
                  <td><strong>Liquidità</strong></td>
                  <td>20%</td>
                  <td className="text-end">1.8</td>
                  <td className="text-end">0.36</td>
                  <td><span className="status-badge bg-danger">Critica</span></td>
                </tr>
                <tr>
                  <td><strong>Efficienza Operativa</strong></td>
                  <td>15%</td>
                  <td className="text-end">3.5</td>
                  <td className="text-end">0.53</td>
                  <td><span className="status-badge bg-success">Buona</span></td>
                </tr>
                <tr>
                  <td><strong>Sostenibilità Debito</strong></td>
                  <td>20%</td>
                  <td className="text-end">2.7</td>
                  <td className="text-end">0.54</td>
                  <td><span className="status-badge bg-warning">Moderata</span></td>
                </tr>
              </tbody>
              <tfoot>
                <tr style={{ fontWeight: 'bold', borderTop: '2px solid var(--primary)' }}>
                  <td>TOTALE</td>
                  <td>100%</td>
                  <td className="text-end">-</td>
                  <td className="text-end value-highlight">2.90</td>
                  <td><span className="status-badge bg-warning">Zona Grigia</span></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div className="alert-box alert-warning mt-4">
        <h5>
          <i className="fas fa-info-circle me-2"></i>
          Interpretazione
        </h5>
        <ul style={{ marginBottom: 0 }}>
          <li><strong>Score ≥ 3.0:</strong> Zona Sicurezza - Rischio basso</li>
          <li><strong>1.8 ≤ Score &lt; 3.0:</strong> Zona Grigia - Rischio medio, monitoraggio necessario</li>
          <li><strong>Score &lt; 1.8:</strong> Zona Rischio - Rischio elevato</li>
        </ul>
      </div>
    </DashboardLayout>
  )
}
