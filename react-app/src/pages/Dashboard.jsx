import DashboardLayout from '../components/DashboardLayout'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import financialData from '../data/financial-data.json'

export default function Dashboard() {
  // Prepare chart data for Ricavi & EBITDA
  const ricaviEbitdaData = {
    labels: financialData.dashboard.trendRicaviEbitda.labels,
    datasets: [
      {
        label: 'Ricavi (€)',
        data: financialData.dashboard.trendRicaviEbitda.ricavi,
        borderColor: 'rgb(25, 25, 112)',
        backgroundColor: 'rgba(25, 25, 112, 0.1)',
        type: 'line',
        tension: 0.1,
        yAxisID: 'y',
        fill: true
      },
      {
        label: 'EBITDA (€)',
        data: financialData.dashboard.trendRicaviEbitda.ebitda,
        borderColor: 'rgb(77, 140, 87)',
        backgroundColor: 'rgba(77, 140, 87, 0.7)',
        type: 'bar',
        yAxisID: 'y'
      },
      {
        label: 'EBITDA Margin (%)',
        data: financialData.dashboard.trendRicaviEbitda.ebitdaMargin,
        borderColor: 'rgb(217, 140, 0)',
        backgroundColor: 'transparent',
        type: 'line',
        tension: 0.1,
        yAxisID: 'y1',
        fill: false,
        borderDash: [5, 5]
      }
    ]
  }

  const ricaviEbitdaOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Trend Ricavi ed EBITDA',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''
            if (label) label += ': '

            const value = context.parsed.y
            if (context.dataset.label?.includes('%')) {
              label += value?.toFixed(2) + '%'
            } else {
              label += '€' + (value / 1000000).toFixed(2) + 'M'
            }
            return label
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Importo (€)'
        },
        ticks: {
          callback: function (value) {
            return '€' + (value / 1000000).toFixed(1) + 'M'
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Percentuale (%)'
        },
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(1) + '%'
          }
        }
      }
    }
  }

  // Prepare chart data for PFN/EBITDA
  const pfnEbitdaData = {
    labels: financialData.dashboard.trendPfnEbitda.labels,
    datasets: [
      {
        label: 'PFN/EBITDA',
        data: financialData.dashboard.trendPfnEbitda.pfnEbitda,
        borderColor: 'rgb(214, 34, 70)',
        backgroundColor: 'rgba(214, 34, 70, 0.2)',
        tension: 0.1,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(214, 34, 70)'
      },
      {
        label: 'Soglia Attenzione (<3.5x)',
        data: financialData.dashboard.trendPfnEbitda.soglia,
        borderColor: 'rgb(255, 193, 7)',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  }

  const pfnEbitdaOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Trend PFN/EBITDA',
        font: { size: 14, weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''
            if (label) label += ': '
            const value = context.parsed.y
            label += value?.toFixed(2) + 'x'
            return label
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Rapporto (x)'
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(1) + 'x'
          }
        }
      }
    }
  }

  return (
    <DashboardLayout
      title="Dashboard Completa"
      subtitle="Analisi dettagliata degli indicatori finanziari"
    >
      {/* Summary Cards */}
      <div className="row">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Ricavi 2024</div>
            <div className="kpi-value-modern">€1.03M</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">+1.64%</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-chart-line kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-warning">
            <div className="card-title-modern">EBITDA 2024</div>
            <div className="kpi-value-modern">€102K</div>
            <div className="kpi-trend-modern trend-down">
              <span className="trend-icon">▼</span>
              <span className="trend-value">-2.68%</span>
              <span>vs 2023</span>
            </div>
            <i className="fas fa-coins kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">PFN 2024</div>
            <div className="kpi-value-modern">-€57K</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">▲</span>
              <span className="trend-value">Cash Positive</span>
              <span>vs €3K (2023)</span>
            </div>
            <i className="fas fa-money-bill-wave kpi-icon-modern-bg"></i>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">PFN/EBITDA</div>
            <div className="kpi-value-modern">N/A</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-icon">✓</span>
              <span className="trend-value">Cash Positive</span>
              <span>Eccellente</span>
            </div>
            <i className="fas fa-balance-scale kpi-icon-modern-bg"></i>
          </div>
        </div>
      </div>

      {/* Charts */}
      <h2 className="section-title">
        <i className="fas fa-chart-bar"></i>
        Analisi Trend
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className="chart-container" style={{ height: '400px' }}>
            <BarChart data={ricaviEbitdaData} options={ricaviEbitdaOptions} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="chart-container" style={{ height: '400px' }}>
            <LineChart data={pfnEbitdaData} options={pfnEbitdaOptions} />
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="alert-box alert-success">
            <h5>
              <i className="fas fa-check-circle me-2"></i>
              Punti di Forza
            </h5>
            <ul>
              <li>PFN cash positive (€-57K) - Zero debiti finanziari</li>
              <li>Eccellente redditività (ROE 40,91%, ROI 53,26%)</li>
              <li>Patrimonio netto in forte crescita (+69,23%)</li>
              <li>Margine EBITDA solido (9,91%)</li>
              <li>IRP 78,50 - Categoria B (Rischio Moderato-Basso)</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="alert-box alert-warning">
            <h5>
              <i className="fas fa-exclamation-triangle me-2"></i>
              Aree di Attenzione
            </h5>
            <ul>
              <li>DSO molto elevato (262 giorni incasso crediti)</li>
              <li>Ciclo circolante in peggioramento (119 giorni)</li>
              <li>EBITDA in lieve calo (-2,68% vs 2023)</li>
              <li>Crescita ricavi moderata (+1,64%)</li>
              <li>DPO elevato (222 giorni pagamento fornitori)</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
