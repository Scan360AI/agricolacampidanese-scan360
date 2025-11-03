import DashboardLayout from '../components/DashboardLayout'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import financialData from '../data/financial-data.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function Home() {
  const { company, irp, kpis, dashboard } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€ ${(value / 1000000).toFixed(2)} M`
    } else if (Math.abs(value) >= 1000) {
      return `€ ${(value / 1000).toFixed(0)} K`
    }
    return `€ ${value.toFixed(0)}`
  }

  // Data for charts
  const trendRicaviEbitdaData = {
    labels: dashboard.trendRicaviEbitda.labels,
    datasets: [
      {
        label: 'Ricavi (€M)',
        data: dashboard.trendRicaviEbitda.ricavi.map(v => v / 1000000),
        backgroundColor: 'rgba(25, 25, 112, 0.8)',
        borderColor: 'rgba(25, 25, 112, 1)',
        borderWidth: 2,
        type: 'bar',
        yAxisID: 'y'
      },
      {
        label: 'EBITDA (€K)',
        data: dashboard.trendRicaviEbitda.ebitda.map(v => v / 1000),
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 2,
        type: 'bar',
        yAxisID: 'y1'
      }
    ]
  }

  const trendPfnEbitdaData = {
    labels: dashboard.trendPfnEbitda.labels,
    datasets: [
      {
        label: 'PFN/EBITDA',
        data: dashboard.trendPfnEbitda.pfnEbitda,
        backgroundColor: 'rgba(74, 105, 189, 0.8)',
        borderColor: 'rgba(74, 105, 189, 1)',
        borderWidth: 2,
        type: 'bar'
      },
      {
        label: 'Soglia Critica (3.5x)',
        data: dashboard.trendPfnEbitda.soglia,
        backgroundColor: 'rgba(244, 67, 54, 0.3)',
        borderColor: 'rgba(244, 67, 54, 1)',
        borderWidth: 2,
        borderDash: [5, 5],
        type: 'line',
        pointRadius: 0
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 15, font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { weight: 'bold', size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: { color: '#e0e0e0', borderDash: [2, 3] },
        ticks: { font: { size: 11 } }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { font: { size: 11 } }
      }
    },
    animation: { duration: 400 }
  }

  const pfnChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, padding: 15, font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { weight: 'bold', size: 13 },
        bodyFont: { size: 12 },
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#e0e0e0', borderDash: [2, 3] },
        ticks: { font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      }
    },
    animation: { duration: 400 }
  }

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`${company.name} | ${company.reportDate}`}
    >
      {/* Intestazione pagina contenuto */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 fw-bold" style={{ color: 'var(--primary)' }}>
          Dashboard Esecutiva - {company.shortName}
        </h3>
      </div>

      {/* Sezione KPI Principali */}
      <section id="kpi-section">
        <h4 className="section-title small">
          <i className="fas fa-tachometer-alt me-2"></i>
          PANORAMICA KPI
        </h4>
        <div className="row">
          {/* KPI Card: IRP */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${irp.score >= 70 ? 'success' : irp.score >= 50 ? 'warning' : 'danger'}`}>
              <i className="fas fa-shield-alt kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">Indice Rischio (IRP)</h4>
              <div className="kpi-value-modern">{irp.score.toFixed(2)}</div>
              <div className="kpi-trend-modern">
                <span className={`status-badge bg-${irp.score >= 70 ? 'success' : irp.score >= 50 ? 'warning' : 'danger'}`}>
                  {irp.score >= 70 ? 'Basso' : irp.score >= 50 ? 'Medio' : 'Alto'}
                </span>
                <span className="text-muted ms-2">(Scala 0-100)</span>
              </div>
              <p className="kpi-description-modern">
                {irp.categoryLabel} - {irp.score >= 70 ? 'Profilo solido e affidabile' : irp.score >= 50 ? 'Squilibri strutturali, interventi necessari' : 'Rischio elevato'}
              </p>
            </div>
          </div>

          {/* KPI Card: Ricavi */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${kpis.economic.ricaviVariation > 0 ? 'success' : 'warning'}`}>
              <i className="fas fa-chart-bar kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">Ricavi</h4>
              <div className="kpi-value-modern">{formatCurrency(kpis.economic.ricavi2024)}</div>
              <div className={`kpi-trend-modern trend-${kpis.economic.ricaviVariation > 0 ? 'up' : 'down'}`}>
                <i className={`fas fa-arrow-${kpis.economic.ricaviVariation > 0 ? 'up' : 'down'} trend-icon`}></i>
                <span className="trend-value">{kpis.economic.ricaviVariation > 0 ? '+' : ''}{kpis.economic.ricaviVariation.toFixed(2)}%</span> <span className="text-muted small">vs 2023</span>
              </div>
              <p className="kpi-description-modern">
                {kpis.economic.ricaviVariation > 3 ? 'Crescita sostenuta' : kpis.economic.ricaviVariation > 0 ? 'Crescita modesta, resilienza commerciale' : 'Contrazione ricavi'}
              </p>
            </div>
          </div>

          {/* KPI Card: EBITDA Margin */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${kpis.economic.ebitdaMargin2024 >= 8 ? 'success' : kpis.economic.ebitdaMargin2024 >= 5 ? 'warning' : 'danger'}`}>
              <i className="fas fa-percent kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">EBITDA Margin</h4>
              <div className="kpi-value-modern">{kpis.economic.ebitdaMargin2024.toFixed(2)}%</div>
              <div className={`kpi-trend-modern trend-${(kpis.economic.ebitdaMargin2024 - kpis.economic.ebitdaMargin2023) > 0 ? 'up' : 'down'}`}>
                <i className={`fas fa-arrow-${(kpis.economic.ebitdaMargin2024 - kpis.economic.ebitdaMargin2023) > 0 ? 'up' : 'down'} trend-icon`}></i>
                <span className="trend-value">
                  {(kpis.economic.ebitdaMargin2024 - kpis.economic.ebitdaMargin2023) > 0 ? '+' : ''}
                  {(kpis.economic.ebitdaMargin2024 - kpis.economic.ebitdaMargin2023).toFixed(2)} p.p.
                </span> <span className="text-muted small">vs 2023</span>
              </div>
              <p className="kpi-description-modern">
                {kpis.economic.ebitdaMargin2024 >= 8 ? 'Marginalità ottima (benchmark 8-12%)' : kpis.economic.ebitdaMargin2024 >= 5 ? 'Marginalità accettabile' : 'Marginalità critica (benchmark 8-12%)'}
              </p>
            </div>
          </div>

          {/* KPI Card: PFN/EBITDA */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${kpis.financial.pfn2024 < 0 ? 'success' : 'danger'}`}>
              <i className="fas fa-balance-scale kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">PFN / EBITDA</h4>
              <div className="kpi-value-modern">
                {kpis.financial.pfn2024 < 0 ? 'N/A' : kpis.financial.pfnEbitda2024}
              </div>
              <div className={`kpi-trend-modern trend-${kpis.financial.pfn2024 < 0 ? 'up' : 'down'}`}>
                <i className={`fas fa-arrow-${kpis.financial.pfn2024 < 0 ? 'up' : 'down'} trend-icon`}></i>
                <span className="trend-value">
                  {kpis.financial.pfn2024 < 0 ? 'Cash Positive' : 'Trend negativo'}
                </span>
              </div>
              <p className="kpi-description-modern">
                {kpis.financial.pfn2024 < 0 ? 'Posizione finanziaria netta positiva (no debiti)' : 'Sostenibilità debito critica (>4,5x)'}
              </p>
            </div>
          </div>

          {/* KPI Card: DSO */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${kpis.workingCapital.dso2024 < 90 ? 'success' : 'warning'}`}>
              <i className="fas fa-file-invoice-dollar kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">Giorni Incasso Clienti</h4>
              <div className="kpi-value-modern">{kpis.workingCapital.dso2024} gg</div>
              <div className={`kpi-trend-modern trend-${(kpis.workingCapital.dso2024 - kpis.workingCapital.dso2023) < 0 ? 'down' : 'up'}`}>
                <i className={`fas fa-arrow-${(kpis.workingCapital.dso2024 - kpis.workingCapital.dso2023) < 0 ? 'down' : 'up'} trend-icon`}></i>
                <span className="trend-value">
                  {(kpis.workingCapital.dso2024 - kpis.workingCapital.dso2023) > 0 ? '+' : ''}
                  {(kpis.workingCapital.dso2024 - kpis.workingCapital.dso2023)} gg
                </span> <span className="text-muted small">vs 2023</span>
              </div>
              <p className="kpi-description-modern">
                {kpis.workingCapital.dso2024 < 90 ? 'Ottima gestione incassi (Benchmark 60-90gg)' : 'Tempi di incasso elevati, ottimizzare'}
              </p>
            </div>
          </div>

          {/* KPI Card: Cash Flow Operativo */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${kpis.financial.cashFlowOperativoRicavi2024 >= 5 ? 'success' : 'warning'}`}>
              <i className="fas fa-coins kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">Cash Flow Operativo</h4>
              <div className="kpi-value-modern">{formatCurrency(kpis.financial.cashFlowOperativo2024)}</div>
              <div className={`kpi-trend-modern trend-${kpis.financial.cashFlowOperativoRicavi2024 >= 5 ? 'up' : 'down'}`}>
                <i className={`fas fa-arrow-${kpis.financial.cashFlowOperativoRicavi2024 >= 5 ? 'up' : 'down'} trend-icon`}></i>
                <span className="trend-value">{kpis.financial.cashFlowOperativoRicavi2024.toFixed(2)}%</span> <span className="text-muted small">dei Ricavi</span>
              </div>
              <p className="kpi-description-modern">
                {kpis.financial.cashFlowOperativoRicavi2024 >= 5 ? 'Generazione cassa ottima (>5%)' : 'Generazione cassa insufficiente (<5%)'}
              </p>
            </div>
          </div>

          {/* KPI Card: Leanus Score */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className={`kpi-card-v2 border-left-${irp.components.leanusScore.scoreOriginale >= 6 ? 'success' : irp.components.leanusScore.scoreOriginale >= 3 ? 'warning' : 'danger'}`}>
              <i className="fas fa-user-shield kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">Leanus Score / Categoria</h4>
              <div className="kpi-value-modern">{irp.components.leanusScore.scoreOriginale.toFixed(2)}</div>
              <div className="kpi-trend-modern">
                <span className={`status-badge bg-${irp.components.leanusScore.scoreOriginale >= 6 ? 'success' : irp.components.leanusScore.scoreOriginale >= 3 ? 'warning' : 'danger'} me-2`}>
                  {irp.components.leanusScore.scoreLabel}
                </span>
                <span className={`status-badge bg-${irp.components.leanusScore.scoreOriginale >= 6 ? 'success' : 'warning'}`}>
                  {irp.components.leanusScore.scoreOriginale >= 6 ? 'GROWING' : 'STUCK'}
                </span>
              </div>
              <p className="kpi-description-modern">
                {irp.components.leanusScore.scoreOriginale >= 6 ? 'Equilibrio economico-patrimoniale' : 'Disequilibrio economico-patrimoniale'}
              </p>
            </div>
          </div>

          {/* KPI Card: Azione Prioritaria */}
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="kpi-card-v2 border-left-info">
              <i className="fas fa-tasks kpi-icon-modern-bg"></i>
              <h4 className="card-title-modern">Azione Prioritaria</h4>
              <div className="kpi-value-modern" style={{ fontSize: '1.5rem' }}>
                {kpis.workingCapital.dso2024 > 180 ? 'Ottimizzare DSO' : kpis.financial.pfn2024 < 0 ? 'Espansione' : 'Ricapitalizzazione'}
              </div>
              <div className="kpi-trend-modern">
                <span className={`status-badge bg-${kpis.workingCapital.dso2024 > 180 ? 'warning' : kpis.financial.pfn2024 < 0 ? 'success' : 'danger'}`}>
                  {kpis.workingCapital.dso2024 > 180 ? 'Alta Priorità' : kpis.financial.pfn2024 < 0 ? 'Opportunità' : 'Urgente'}
                </span>
              </div>
              <p className="kpi-description-modern">
                {kpis.workingCapital.dso2024 > 180
                  ? `Ridurre DSO da ${kpis.workingCapital.dso2024}gg a <150gg`
                  : kpis.financial.pfn2024 < 0
                    ? 'Valutare investimenti strategici e crescita'
                    : 'Aumento capitale €2M e ristrutturazione debito'
                }
              </p>
              <a href="/report/parte6" className="btn btn-outline-primary btn-sm btn-pill mt-2">
                Vedi Piano
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Grafici Chiave */}
      <section id="charts-section">
        <h4 className="section-title small mt-4">
          <i className="fas fa-chart-pie me-2"></i>
          GRAFICI CHIAVE
        </h4>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="dashboard-card">
              <h6 className="card-title-modern text-center">Trend Economico e Margine</h6>
              <div className="chart-container" style={{ height: '300px' }}>
                <Bar data={trendRicaviEbitdaData} options={chartOptions} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="dashboard-card">
              <h6 className="card-title-modern text-center">Sostenibilità Debito (PFN/EBITDA)</h6>
              <div className="chart-container" style={{ height: '300px' }}>
                <Bar data={trendPfnEbitdaData} options={pfnChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}
