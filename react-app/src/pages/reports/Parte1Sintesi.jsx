import DashboardLayout from '../../components/DashboardLayout'
import BarChart from '../../components/charts/BarChart'
import financialData from '../../data/financial-data.json'

export default function Parte1Sintesi() {
  const mainMetrics = financialData.parte1.mainMetrics

  const mainMetricsChartData = {
    labels: mainMetrics.labels,
    datasets: [
      {
        label: 'Ricavi (€000)',
        data: mainMetrics.ricavi.map(v => v / 1000),
        backgroundColor: 'rgba(25, 25, 112, 0.7)'
      },
      {
        label: 'EBITDA (€000)',
        data: mainMetrics.ebitda.map(v => v / 1000),
        backgroundColor: 'rgba(77, 140, 87, 0.7)'
      },
      {
        label: 'Patrimonio Netto (€000)',
        data: mainMetrics.patrimonioNetto.map(v => v / 1000),
        backgroundColor: 'rgba(217, 140, 0, 0.7)'
      }
    ]
  }

  return (
    <DashboardLayout
      title="Parte 1: Profilo Aziendale e Sintesi"
      subtitle="Panoramica generale e indicatori chiave"
    >
      {/* Company Profile */}
      <h2 className="section-title">
        <i className="fas fa-building"></i>
        Profilo Aziendale
      </h2>

      <div className="row">
        <div className="col-md-12">
          <div className="dashboard-card">
            <h5 style={{ color: 'var(--primary)', marginBottom: '20px' }}>
              {financialData.company.fullName}
            </h5>

            <div className="row">
              <div className="col-md-6">
                <div className="profile-info-section">
                  <ul>
                    <li>
                      <i className="fas fa-industry fa-fw"></i>
                      <strong>Settore:</strong> {financialData.company.sector}
                    </li>
                    <li>
                      <i className="fas fa-briefcase fa-fw"></i>
                      <strong>Tipo Società:</strong> {financialData.company.type}
                    </li>
                    <li>
                      <i className="fas fa-hashtag fa-fw"></i>
                      <strong>P.IVA:</strong> {financialData.company.fiscalCode}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-info-section">
                  <ul>
                    <li>
                      <i className="fas fa-map-marker-alt fa-fw"></i>
                      <strong>Sede:</strong> {financialData.company.address}
                    </li>
                    <li>
                      <i className="fas fa-phone fa-fw"></i>
                      <strong>Telefono:</strong> {financialData.company.phone}
                    </li>
                    <li>
                      <i className="fas fa-envelope fa-fw"></i>
                      <strong>Email:</strong> {financialData.company.email}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <h2 className="section-title">
        <i className="fas fa-chart-bar"></i>
        Indicatori Principali
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Ricavi 2024</div>
            <div className="kpi-value-modern">€21.2M</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+2.9%</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-chart-line kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">EBITDA 2024</div>
            <div className="kpi-value-modern">€843K</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+35.2%</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-coins kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Patrimonio Netto</div>
            <div className="kpi-value-modern">€698K</div>
            <div className="kpi-trend-modern trend-neutral">
              <span className="trend-icon">─</span>
              <span className="trend-value">0.0%</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-landmark kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="chart-container" style={{ height: '400px' }}>
            <BarChart
              data={mainMetricsChartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Evoluzione Metriche Principali (2022-2024)',
                    font: { size: 14, weight: 'bold' }
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        let label = context.dataset.label || ''
                        if (label) label += ': '
                        label += '€' + context.parsed.y.toFixed(0) + 'K'
                        return label
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: 'Importo (€000)'
                    },
                    ticks: {
                      callback: function (value) {
                        return '€' + value + 'K'
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* SWOT Analysis */}
      <h2 className="section-title">
        <i className="fas fa-chess"></i>
        Analisi SWOT
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="alert-box alert-success">
            <h5>
              <i className="fas fa-plus-circle me-2"></i>
              Punti di Forza (Strengths)
            </h5>
            <ul>
              <li>Presenza consolidata nel settore agricolo locale</li>
              <li>Miglioramento significativo della marginalità operativa</li>
              <li>Riduzione progressiva dell'indebitamento</li>
              <li>Base soci cooperativa stabile</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-danger">
            <h5>
              <i className="fas fa-minus-circle me-2"></i>
              Punti di Debolezza (Weaknesses)
            </h5>
            <ul>
              <li>PFN/EBITDA ancora elevato rispetto ai benchmark</li>
              <li>Capitale circolante netto negativo</li>
              <li>Liquidità ridotta</li>
              <li>ROE in diminuzione</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-info">
            <h5>
              <i className="fas fa-lightbulb me-2"></i>
              Opportunità (Opportunities)
            </h5>
            <ul>
              <li>Crescente domanda di prodotti agricoli di qualità</li>
              <li>Accesso a finanziamenti agevolati per il settore</li>
              <li>Possibilità di diversificazione produttiva</li>
              <li>Sviluppo canali di vendita diretta</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-warning">
            <h5>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Minacce (Threats)
            </h5>
            <ul>
              <li>Volatilità dei prezzi delle materie prime</li>
              <li>Condizioni climatiche avverse</li>
              <li>Aumento dei costi energetici</li>
              <li>Pressione competitiva nel settore</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
