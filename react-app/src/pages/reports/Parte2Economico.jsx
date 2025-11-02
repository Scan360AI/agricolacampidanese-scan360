import DashboardLayout from '../../components/DashboardLayout'
import LineChart from '../../components/charts/LineChart'
import financialData from '../../data/financial-data.json'

export default function Parte2Economico() {
  const marginality = financialData.parte2.marginality
  const profitability = financialData.parte2.profitabilityIndices

  const marginalityChartData = {
    labels: marginality.labels,
    datasets: [
      {
        label: 'Valore Aggiunto %',
        data: marginality.valoreAggiunto,
        borderColor: 'rgba(25, 25, 112, 1)',
        fill: false
      },
      {
        label: 'Margine di Contribuzione %',
        data: marginality.margineContribuzione,
        borderColor: 'rgba(42, 58, 128, 1)',
        fill: false
      },
      {
        label: 'EBITDA %',
        data: marginality.ebitdaPercent,
        borderColor: 'rgba(77, 140, 87, 1)',
        fill: false
      },
      {
        label: 'EBIT %',
        data: marginality.ebitPercent,
        borderColor: 'rgba(217, 140, 0, 1)',
        fill: false
      }
    ]
  }

  const profitabilityChartData = {
    labels: profitability.labels,
    datasets: [
      {
        label: 'ROE %',
        data: profitability.roe,
        borderColor: 'rgba(25, 25, 112, 1)',
        backgroundColor: 'rgba(25, 25, 112, 0.2)',
        fill: true
      },
      {
        label: 'ROI %',
        data: profitability.roi,
        borderColor: 'rgba(77, 140, 87, 1)',
        backgroundColor: 'rgba(77, 140, 87, 0.2)',
        fill: true
      },
      {
        label: 'ROS %',
        data: profitability.ros,
        borderColor: 'rgba(217, 140, 0, 1)',
        backgroundColor: 'rgba(217, 140, 0, 0.2)',
        fill: true
      }
    ]
  }

  return (
    <DashboardLayout
      title="Parte 2: Analisi Economica"
      subtitle="Redditività, marginalità e indicatori di performance"
    >
      {/* KPIs */}
      <h2 className="section-title">
        <i className="fas fa-chart-line"></i>
        Indicatori di Redditività
      </h2>

      <div className="row">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">ROI 2024</div>
            <div className="kpi-value-modern">6.99%</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+5.67pp</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">ROE 2024</div>
            <div className="kpi-value-modern">0.26%</div>
            <div className="kpi-trend-modern trend-down">
              <span className="trend-icon">▼</span>
              <span className="trend-value">-2.56pp</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">ROS 2024</div>
            <div className="kpi-value-modern">1.95%</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+1.05pp</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">EBITDA Margin</div>
            <div className="kpi-value-modern">3.98%</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+0.98pp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marginality Chart */}
      <h2 className="section-title">
        <i className="fas fa-percentage"></i>
        Analisi della Marginalità
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="chart-container" style={{ height: '400px' }}>
            <LineChart
              data={marginalityChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Evoluzione Marginalità (%)',
                    font: { size: 14, weight: 'bold' }
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || ''
                        if (label) label += ': '
                        label += context.parsed.y?.toFixed(2) + '%'
                        return label
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: 'Percentuale (%)'
                    },
                    ticks: {
                      callback: function (value) {
                        return value.toFixed(1) + '%'
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Profitability Chart */}
      <h2 className="section-title">
        <i className="fas fa-coins"></i>
        Indicatori di Profittabilità
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="chart-container" style={{ height: '400px' }}>
            <LineChart
              data={profitabilityChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'ROE, ROI, ROS - Evoluzione Triennale',
                    font: { size: 14, weight: 'bold' }
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || ''
                        if (label) label += ': '
                        label += context.parsed.y?.toFixed(2) + '%'
                        return label
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: 'Percentuale (%)'
                    },
                    ticks: {
                      callback: function (value) {
                        return value.toFixed(1) + '%'
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="alert-box alert-success">
            <h5>
              <i className="fas fa-check-circle me-2"></i>
              Punti Positivi
            </h5>
            <ul>
              <li>ROI in forte crescita: da 1.32% a 6.99%</li>
              <li>ROS raddoppiato rispetto al 2023</li>
              <li>EBITDA margin in miglioramento (3.98%)</li>
              <li>Efficienza operativa in aumento</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-warning">
            <h5>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Aree di Miglioramento
            </h5>
            <ul>
              <li>ROE in diminuzione (da 2.82% a 0.26%)</li>
              <li>Marginalità ancora contenuta rispetto al settore</li>
              <li>Necessità di ottimizzare la struttura patrimoniale</li>
              <li>Controllo dei costi fissi</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
