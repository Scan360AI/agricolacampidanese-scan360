import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import LineChart from '../../components/charts/LineChart'
import BarChart from '../../components/charts/BarChart'
import RadarChart from '../../components/charts/RadarChart'
import financialData from '../../data/financial-data.json'

export default function Parte2Economico() {
  const { parte2, company } = financialData
  const [activeTab, setActiveTab] = useState('conto-economico')

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const formatPercent = (value) => `${value.toFixed(2)}%`

  // Chart: Ricavi ed EBITDA Trend
  const ricaviEbitdaChartData = {
    labels: parte2.incomeStatement.years,
    datasets: [
      {
        type: 'bar',
        label: 'Ricavi (€)',
        data: parte2.incomeStatement.ricavi,
        backgroundColor: 'rgba(25, 25, 112, 0.6)',
        borderColor: 'rgba(25, 25, 112, 1)',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        type: 'bar',
        label: 'EBITDA (€)',
        data: parte2.incomeStatement.ebitda,
        backgroundColor: 'rgba(77, 140, 87, 0.6)',
        borderColor: 'rgba(77, 140, 87, 1)',
        borderWidth: 1,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: 'EBITDA Margin (%)',
        data: parte2.incomeStatement.ebitdaPercent,
        borderColor: 'rgba(217, 140, 0, 1)',
        backgroundColor: 'rgba(217, 140, 0, 0.2)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y1'
      }
    ]
  }

  // Chart: Marginalità
  const marginalityChartData = {
    labels: parte2.marginality.years,
    datasets: [
      {
        label: 'Valore Aggiunto/Ricavi %',
        data: parte2.marginality.valoreAggiuntoRicavi,
        borderColor: 'rgba(25, 25, 112, 1)',
        backgroundColor: 'rgba(25, 25, 112, 0.1)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'MdC/Ricavi %',
        data: parte2.marginality.mdcRicavi,
        borderColor: 'rgba(42, 58, 128, 1)',
        backgroundColor: 'rgba(42, 58, 128, 0.1)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'EBITDA/Ricavi %',
        data: parte2.marginality.ebitdaRicavi,
        borderColor: 'rgba(77, 140, 87, 1)',
        backgroundColor: 'rgba(77, 140, 87, 0.1)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'ROS (EBIT/Ricavi) %',
        data: parte2.marginality.ros,
        borderColor: 'rgba(217, 140, 0, 1)',
        backgroundColor: 'rgba(217, 140, 0, 0.1)',
        borderWidth: 2,
        fill: true
      }
    ]
  }

  // Chart: Profitability Indices
  const profitabilityChartData = {
    labels: parte2.profitability.years,
    datasets: [
      {
        label: 'ROE %',
        data: parte2.profitability.roe,
        borderColor: 'rgba(25, 25, 112, 1)',
        backgroundColor: 'rgba(25, 25, 112, 0.2)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'ROI %',
        data: parte2.profitability.roi,
        borderColor: 'rgba(77, 140, 87, 1)',
        backgroundColor: 'rgba(77, 140, 87, 0.2)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'ROS %',
        data: parte2.profitability.ros,
        borderColor: 'rgba(217, 140, 0, 1)',
        backgroundColor: 'rgba(217, 140, 0, 0.2)',
        borderWidth: 2,
        fill: true
      }
    ]
  }

  // Chart: Leverage Evolution
  const leverageChartData = {
    labels: parte2.leverage.years,
    datasets: [
      {
        label: 'ROI %',
        data: parte2.leverage.roi,
        borderColor: 'rgba(25, 25, 112, 1)',
        backgroundColor: 'rgba(25, 25, 112, 0.2)',
        borderWidth: 2
      },
      {
        label: 'Spread (ROI-i) %',
        data: parte2.leverage.spread,
        borderColor: 'rgba(77, 140, 87, 1)',
        backgroundColor: 'rgba(77, 140, 87, 0.2)',
        borderWidth: 2
      }
    ]
  }

  // Chart: Benchmark Radar
  const benchmarkRadarData = {
    labels: [
      'Crescita Ricavi',
      'EBITDA Margin',
      'ROI',
      'Turnover',
      'Costo Personale (inv)',
      'PFN/EBITDA (inv)',
      'D/E (inv)'
    ],
    datasets: [
      {
        label: company.shortName,
        data: [33, 86, 290, 201, 95, 200, 200],
        backgroundColor: 'rgba(25, 25, 112, 0.3)',
        borderColor: 'rgba(25, 25, 112, 1)',
        borderWidth: 2
      },
      {
        label: 'Media Settore',
        data: [100, 100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(217, 140, 0, 0.3)',
        borderColor: 'rgba(217, 140, 0, 1)',
        borderWidth: 2
      }
    ]
  }

  return (
    <DashboardLayout
      title="Parte 2: Analisi Economica"
      subtitle="Redditività, marginalità e benchmark competitivo"
    >
      {/* Navigation Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'conto-economico' ? 'active' : ''}`}
            onClick={() => setActiveTab('conto-economico')}
          >
            <i className="fas fa-balance-scale me-2"></i>
            Conto Economico
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'marginalita' ? 'active' : ''}`}
            onClick={() => setActiveTab('marginalita')}
          >
            <i className="fas fa-percentage me-2"></i>
            Marginalità
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'redditivita' ? 'active' : ''}`}
            onClick={() => setActiveTab('redditivita')}
          >
            <i className="fas fa-chart-line me-2"></i>
            Redditività
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'benchmark' ? 'active' : ''}`}
            onClick={() => setActiveTab('benchmark')}
          >
            <i className="fas fa-chart-bar me-2"></i>
            Benchmark
          </button>
        </li>
      </ul>

      {/* Conto Economico Tab */}
      {activeTab === 'conto-economico' && (
        <>
          <h2 className="section-title">2.1.1 Conto Economico Riclassificato</h2>

          {/* Chart: Ricavi ed EBITDA */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="text-center mb-3">Andamento Ricavi ed EBITDA 2022-2024</h6>
              <div className="chart-container" style={{ height: '350px' }}>
                <BarChart
                  data={ricaviEbitdaChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: { display: true, text: 'Euro (€)' }
                      },
                      y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: { display: true, text: 'Percentuale (%)' },
                        grid: { drawOnChartArea: false }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Income Statement Table */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="mb-3">Conto Economico Riclassificato 2022-2024</h6>
              <div className="table-responsive">
                <table className="table table-sm table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Voce</th>
                      <th className="text-end">2022</th>
                      <th className="text-end">% Ricavi</th>
                      <th className="text-end">2023</th>
                      <th className="text-end">% Ricavi</th>
                      <th className="text-end">2024</th>
                      <th className="text-end">% Ricavi</th>
                      <th className="text-end">Var. % 23-24</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ricavi</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ricavi[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ricaviPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ricavi[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ricaviPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ricavi[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ricaviPercent[2])}</td>
                      <td className="text-success text-end">+1,64%</td>
                    </tr>
                    <tr>
                      <td>Valore della Produzione</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.valoreProduzione[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.valoreProduzionePercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.valoreProduzione[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.valoreProduzionePercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.valoreProduzione[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.valoreProduzionePercent[2])}</td>
                      <td className="text-success text-end">+2,27%</td>
                    </tr>
                    <tr>
                      <td>Valore Aggiunto su Consumi</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.valoreAggiunto[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.valoreAggiuntoPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.valoreAggiunto[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.valoreAggiuntoPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.valoreAggiunto[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.valoreAggiuntoPercent[2])}</td>
                      <td className="text-success text-end">+2,26%</td>
                    </tr>
                    <tr className="table-secondary">
                      <td><strong>Margine di Contribuzione</strong></td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.margineContribuzione[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.margineContribuzionePercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.margineContribuzione[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.margineContribuzionePercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.margineContribuzione[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.margineContribuzionePercent[2])}</td>
                      <td className="text-success text-end">+14,81%</td>
                    </tr>
                    <tr className="table-success fw-bold">
                      <td>EBITDA</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ebitda[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ebitdaPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ebitda[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ebitdaPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ebitda[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ebitdaPercent[2])}</td>
                      <td className="text-danger text-end">-2,68%</td>
                    </tr>
                    <tr>
                      <td>EBIT (Reddito Operativo)</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ebit[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ebitPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ebit[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ebitPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.ebit[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.ebitPercent[2])}</td>
                      <td className="text-danger text-end">-1,70%</td>
                    </tr>
                    <tr>
                      <td>Risultato Ante Imposte</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.risultatoAnteImposte[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.risultatoAnteImpostePercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.risultatoAnteImposte[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.risultatoAnteImpostePercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.risultatoAnteImposte[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.risultatoAnteImpostePercent[2])}</td>
                      <td className="text-success text-end">+44,07%</td>
                    </tr>
                    <tr className="table-success fw-bold">
                      <td>Utile/Perdita d'esercizio</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.utileEsercizio[0])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.utileEsercizioPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.utileEsercizio[1])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.utileEsercizioPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.incomeStatement.utileEsercizio[2])}</td>
                      <td className="text-end">{formatPercent(parte2.incomeStatement.utileEsercizioPercent[2])}</td>
                      <td className="text-success text-end">+131,00%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="alert-box alert-info mt-3">
                <h6>Analisi del Conto Economico ({company.shortName}):</h6>
                <ul className="small mb-0">
                  <li><strong>Ricavi:</strong> Crescita moderata dell'1,64% nel 2024, evidenziando stabilizzazione dopo il significativo incremento dell'anno precedente.</li>
                  <li><strong>Margine di Contribuzione (38,5%):</strong> Significativo miglioramento (+14,81%), con progressiva crescita dal 30,9% del 2022.</li>
                  <li><strong>EBITDA (9,9%):</strong> Lieve flessione (-2,68%) rispetto al 2023, pur mantenendosi ampiamente positivo.</li>
                  <li><strong>Utile Netto (9,3%):</strong> Eccezionale incremento (+131,00%), fortemente influenzato dalla drastica riduzione delle imposte (-99,04%).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cost Structure */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="mb-3">Struttura dei Costi 2022-2024</h6>
              <div className="table-responsive">
                <table className="table table-sm table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Categoria di Costo</th>
                      <th className="text-end">2022</th>
                      <th className="text-end">% Ricavi</th>
                      <th className="text-end">2023</th>
                      <th className="text-end">% Ricavi</th>
                      <th className="text-end">2024</th>
                      <th className="text-end">% Ricavi</th>
                      <th className="text-end">Var% 23-24</th>
                      <th>Valutazione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Acquisti</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.acquisti[0])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.acquistiPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.acquisti[1])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.acquistiPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.acquisti[2])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.acquistiPercent[2])}</td>
                      <td className="text-danger text-end">+51,09%</td>
                      <td><span className="status-badge bg-warning">Attenzione</span></td>
                    </tr>
                    <tr>
                      <td>Costi Variabili (Servizi)</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.costiVariabiliServizi[0])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.costiVariabiliServiziPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.costiVariabiliServizi[1])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.costiVariabiliServiziPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.costiVariabiliServizi[2])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.costiVariabiliServiziPercent[2])}</td>
                      <td className="text-success text-end">-4,36%</td>
                      <td><span className="status-badge bg-success">Miglioramento</span></td>
                    </tr>
                    <tr>
                      <td>Costi Fissi</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.costiFissi[0])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.costiFissiPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.costiFissi[1])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.costiFissiPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.costiFissi[2])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.costiFissiPercent[2])}</td>
                      <td className="text-danger text-end">+22,44%</td>
                      <td><span className="status-badge bg-warning">Attenzione</span></td>
                    </tr>
                    <tr>
                      <td>- Personale</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.personale[0])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.personalePercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.personale[1])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.personalePercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.personale[2])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.personalePercent[2])}</td>
                      <td className="text-danger text-end">+22,27%</td>
                      <td><span className="status-badge bg-warning">Attenzione</span></td>
                    </tr>
                    <tr>
                      <td>- Godimento beni di terzi</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.godimentoBeni[0])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.godimentoBeniPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.godimentoBeni[1])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.godimentoBeniPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.godimentoBeni[2])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.godimentoBeniPercent[2])}</td>
                      <td className="text-danger text-end">+23,26%</td>
                      <td><span className="status-badge bg-warning">Attenzione</span></td>
                    </tr>
                    <tr>
                      <td>Ammortamenti</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.ammortamenti[0])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.ammortamentiPercent[0])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.ammortamenti[1])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.ammortamentiPercent[1])}</td>
                      <td className="text-end">{formatCurrency(parte2.costStructure.ammortamenti[2])}</td>
                      <td className="text-end">{formatPercent(parte2.costStructure.ammortamentiPercent[2])}</td>
                      <td className="text-success text-end">-13,17%</td>
                      <td><span className="status-badge bg-secondary">In linea</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Marginalità Tab */}
      {activeTab === 'marginalita' && (
        <>
          <h2 className="section-title">2.1.2 Analisi della Marginalità</h2>

          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="text-center mb-3">Evoluzione delle Principali Marginalità (%)</h6>
                  <div className="chart-container" style={{ height: '350px' }}>
                    <LineChart data={marginalityChartData} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Evoluzione Indici di Marginalità</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Indicatore</th>
                          <th className="text-end">2022</th>
                          <th className="text-end">2023</th>
                          <th className="text-end">2024</th>
                          <th>Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Valore Aggiunto/Ricavi</td>
                          <td className="text-end">{formatPercent(parte2.marginality.valoreAggiuntoRicavi[0])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.valoreAggiuntoRicavi[1])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.valoreAggiuntoRicavi[2])}</td>
                          <td className="text-success"><i className="fas fa-arrow-up"></i></td>
                        </tr>
                        <tr>
                          <td>MdC/Ricavi</td>
                          <td className="text-end">{formatPercent(parte2.marginality.mdcRicavi[0])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.mdcRicavi[1])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.mdcRicavi[2])}</td>
                          <td className="text-success"><i className="fas fa-arrow-up"></i></td>
                        </tr>
                        <tr>
                          <td>EBITDA/Ricavi</td>
                          <td className="text-end">{formatPercent(parte2.marginality.ebitdaRicavi[0])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.ebitdaRicavi[1])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.ebitdaRicavi[2])}</td>
                          <td className="text-warning"><i className="fas fa-arrow-down"></i></td>
                        </tr>
                        <tr>
                          <td>ROS (EBIT/Ricavi)</td>
                          <td className="text-end">{formatPercent(parte2.marginality.ros[0])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.ros[1])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.ros[2])}</td>
                          <td className="text-warning"><i className="fas fa-arrow-down"></i></td>
                        </tr>
                        <tr>
                          <td>Utile Netto/Ricavi</td>
                          <td className="text-end">{formatPercent(parte2.marginality.utileNettoRicavi[0])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.utileNettoRicavi[1])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.utileNettoRicavi[2])}</td>
                          <td className="text-success"><i className="fas fa-arrow-up"></i></td>
                        </tr>
                        <tr className="table-secondary">
                          <td>Break-Even Point (€)</td>
                          <td className="text-end">{formatCurrency(parte2.marginality.breakEvenPoint[0])}</td>
                          <td className="text-end">{formatCurrency(parte2.marginality.breakEvenPoint[1])}</td>
                          <td className="text-end">{formatCurrency(parte2.marginality.breakEvenPoint[2])}</td>
                          <td className="text-warning"><i className="fas fa-arrow-up"></i></td>
                        </tr>
                        <tr className="table-secondary">
                          <td>Margine Sicurezza</td>
                          <td className="text-end">{formatPercent(parte2.marginality.margineSicurezza[0])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.margineSicurezza[1])}</td>
                          <td className="text-end">{formatPercent(parte2.marginality.margineSicurezza[2])}</td>
                          <td className="text-warning"><i className="fas fa-arrow-down"></i></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="alert-box alert-success small mt-3 p-2">
                    <h6 className="small">Break-Even e Leva Operativa (2024)</h6>
                    <ul className="list-unstyled mb-0 small">
                      <li><i className="fas fa-bullseye me-1"></i> BEP: €785.304 | Margine Sicurezza: 23,8% (Buono)</li>
                      <li><i className="fas fa-calculator me-1"></i> Moltiplicatore CF: 2,60</li>
                      <li><i className="fas fa-arrows-alt-v me-1"></i> Variazione ricavi per EBIT=0: -23,8%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Redditività Tab */}
      {activeTab === 'redditivita' && (
        <>
          <h2 className="section-title">2.1.4 Indici di Redditività</h2>

          <div className="row mb-4">
            <div className="col-md-3">
              <div className="kpi-card-v2 border-left-success">
                <div className="card-title-modern">ROE 2024</div>
                <div className="kpi-value-modern">{formatPercent(parte2.profitability.roe[2])}</div>
                <div className="kpi-trend-modern trend-up">
                  <span className="trend-icon">▲</span>
                  <span className="trend-value">+10,94 p.p.</span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="kpi-card-v2 border-left-success">
                <div className="card-title-modern">ROI 2024</div>
                <div className="kpi-value-modern">{formatPercent(parte2.profitability.roi[2])}</div>
                <div className="kpi-trend-modern trend-down">
                  <span className="trend-icon">▼</span>
                  <span className="trend-value">-14,62 p.p.</span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="kpi-card-v2 border-left-success">
                <div className="card-title-modern">ROS 2024</div>
                <div className="kpi-value-modern">{formatPercent(parte2.profitability.ros[2])}</div>
                <div className="kpi-trend-modern trend-down">
                  <span className="trend-icon">▼</span>
                  <span className="trend-value">-0,3 p.p.</span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="kpi-card-v2 border-left-success">
                <div className="card-title-modern">EBITDA Margin 2024</div>
                <div className="kpi-value-modern">{formatPercent(parte2.profitability.ebitdaMargin[2])}</div>
                <div className="kpi-trend-modern trend-down">
                  <span className="trend-icon">▼</span>
                  <span className="trend-value">-0,4 p.p.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="text-center mb-3">ROE, ROI, ROS - Evoluzione Triennale</h6>
                  <div className="chart-container" style={{ height: '350px' }}>
                    <LineChart data={profitabilityChartData} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Indici di Redditività 2022-2024</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Indice</th>
                          <th className="text-end">2022</th>
                          <th className="text-end">2023</th>
                          <th className="text-end">2024</th>
                          <th>Soglia</th>
                          <th>Valutazione</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ROE</td>
                          <td className="text-end">{formatPercent(parte2.profitability.roe[0])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.roe[1])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.roe[2])}</td>
                          <td>&gt; 7%</td>
                          <td><span className="status-badge bg-success">Eccellente</span></td>
                        </tr>
                        <tr>
                          <td>ROI</td>
                          <td className="text-end">{formatPercent(parte2.profitability.roi[0])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.roi[1])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.roi[2])}</td>
                          <td>&gt; 10%</td>
                          <td><span className="status-badge bg-success">Eccellente</span></td>
                        </tr>
                        <tr>
                          <td>ROS</td>
                          <td className="text-end">{formatPercent(parte2.profitability.ros[0])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.ros[1])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.ros[2])}</td>
                          <td>&gt; 6%</td>
                          <td><span className="status-badge bg-success">Ottimo</span></td>
                        </tr>
                        <tr>
                          <td>EBITDA Margin</td>
                          <td className="text-end">{formatPercent(parte2.profitability.ebitdaMargin[0])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.ebitdaMargin[1])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.ebitdaMargin[2])}</td>
                          <td>&gt; 8%</td>
                          <td><span className="status-badge bg-success">Buono</span></td>
                        </tr>
                        <tr>
                          <td>Redditività Netta</td>
                          <td className="text-end">{formatPercent(parte2.profitability.redditivityNetta[0])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.redditivityNetta[1])}</td>
                          <td className="text-end">{formatPercent(parte2.profitability.redditivityNetta[2])}</td>
                          <td>&gt; 5%</td>
                          <td><span className="status-badge bg-success">Eccellente</span></td>
                        </tr>
                        <tr>
                          <td>Turnover</td>
                          <td className="text-end">{parte2.profitability.turnover[0].toFixed(2)}</td>
                          <td className="text-end">{parte2.profitability.turnover[1].toFixed(2)}</td>
                          <td className="text-end">{parte2.profitability.turnover[2].toFixed(2)}</td>
                          <td>&gt; 2</td>
                          <td><span className="status-badge bg-success">Ottimo</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leverage Analysis */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">2.1.5 Effetto Leva Finanziaria</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-7 mb-3">
                  <h6 className="text-center mb-3">Evoluzione della Struttura Finanziaria</h6>
                  <div className="chart-container" style={{ height: '280px' }}>
                    <LineChart data={leverageChartData} />
                  </div>
                </div>

                <div className="col-lg-5">
                  <h6 className="mb-3">Analisi Effetto Leva 2022-2024</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Parametro</th>
                          <th className="text-end">2022</th>
                          <th className="text-end">2023</th>
                          <th className="text-end">2024</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ROI</td>
                          <td className="text-end">{formatPercent(parte2.leverage.roi[0])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.roi[1])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.roi[2])}</td>
                        </tr>
                        <tr>
                          <td>Costo medio debito (i)</td>
                          <td className="text-end">{formatPercent(parte2.leverage.costoMedioDebito[0])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.costoMedioDebito[1])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.costoMedioDebito[2])}</td>
                        </tr>
                        <tr>
                          <td>Spread (ROI - i)</td>
                          <td className="text-success text-end">+{formatPercent(parte2.leverage.spread[0])}</td>
                          <td className="text-success text-end">+{formatPercent(parte2.leverage.spread[1])}</td>
                          <td className="text-success text-end">+{formatPercent(parte2.leverage.spread[2])}</td>
                        </tr>
                        <tr>
                          <td>D/E (Debt/Equity)</td>
                          <td className="text-end">{parte2.leverage.debtEquity[0].toFixed(2)}</td>
                          <td className="text-end">{parte2.leverage.debtEquity[1].toFixed(2)}</td>
                          <td className="text-end">{parte2.leverage.debtEquity[2].toFixed(2)}</td>
                        </tr>
                        <tr className="table-secondary">
                          <td>Effetto leva</td>
                          <td className="text-success text-end">+{formatPercent(parte2.leverage.effettoLeva[0])}</td>
                          <td className="text-success text-end">+{formatPercent(parte2.leverage.effettoLeva[1])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.effettoLeva[2])}</td>
                        </tr>
                        <tr>
                          <td>ROE effettivo</td>
                          <td className="text-end">{formatPercent(parte2.leverage.roeEffettivo[0])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.roeEffettivo[1])}</td>
                          <td className="text-end">{formatPercent(parte2.leverage.roeEffettivo[2])}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="alert-box alert-info small mt-3">
                    <h6 className="small">Analisi Leva ({company.shortName}):</h6>
                    <ul className="list-unstyled mb-0 small">
                      <li><i className="fas fa-check-circle text-success me-1"></i> Spread (ROI-i) ampiamente positivo (+46,65%)</li>
                      <li><i className="fas fa-info-circle text-info me-1"></i> Effetto Leva azzerato (0,00%) per assenza debiti finanziari</li>
                      <li><i className="fas fa-arrow-down text-success me-1"></i> Azzeramento completo debito finanziario (D/E: 0,00)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Benchmark Tab */}
      {activeTab === 'benchmark' && (
        <>
          <h2 className="section-title">2.2 BENCHMARK E POSIZIONAMENTO COMPETITIVO</h2>

          <div className="row mb-4">
            <div className="col-lg-7 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="text-center mb-3">Posizionamento Competitivo (Base 100 = Media Settore)</h6>
                  <div className="chart-container" style={{ height: '350px' }}>
                    <RadarChart data={benchmarkRadarData} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 mb-4">
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-3">Posizionamento Competitivo 2024</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Indicatore</th>
                          <th className="text-end">RELIVE</th>
                          <th className="text-end">Media Sett.</th>
                          <th>Gap</th>
                          <th>Valutazione</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Crescita ricavi</td>
                          <td className="text-end">+{formatPercent(parte2.benchmark.crescitaRicavi.company)}</td>
                          <td className="text-end">+{formatPercent(parte2.benchmark.crescitaRicavi.sector)}</td>
                          <td className="text-danger">-3,36 p.p.</td>
                          <td><span className="status-badge bg-warning">Inferiore</span></td>
                        </tr>
                        <tr>
                          <td>EBITDA Margin</td>
                          <td className="text-end">{formatPercent(parte2.benchmark.ebitdaMargin.company)}</td>
                          <td className="text-end">{formatPercent(parte2.benchmark.ebitdaMargin.sector)}</td>
                          <td className="text-danger">-1,59 p.p.</td>
                          <td><span className="status-badge bg-secondary">In linea</span></td>
                        </tr>
                        <tr>
                          <td>ROI</td>
                          <td className="text-end">{formatPercent(parte2.benchmark.roi.company)}</td>
                          <td className="text-end">{formatPercent(parte2.benchmark.roi.sector)}</td>
                          <td className="text-success">+34,86 p.p.</td>
                          <td><span className="status-badge bg-success">Superiore</span></td>
                        </tr>
                        <tr>
                          <td>ROE</td>
                          <td className="text-end">{formatPercent(parte2.benchmark.roe.company)}</td>
                          <td className="text-end">{formatPercent(parte2.benchmark.roe.sector)}</td>
                          <td className="text-success">+18,21 p.p.</td>
                          <td><span className="status-badge bg-success">Superiore</span></td>
                        </tr>
                        <tr>
                          <td>Turnover</td>
                          <td className="text-end">{parte2.benchmark.turnover.company.toFixed(2)}</td>
                          <td className="text-end">{parte2.benchmark.turnover.sector.toFixed(2)}</td>
                          <td className="text-success">+2,92</td>
                          <td><span className="status-badge bg-success">Superiore</span></td>
                        </tr>
                        <tr>
                          <td>DSO (Giorni Crediti)</td>
                          <td className="text-end">{parte2.benchmark.dso.company}</td>
                          <td className="text-end">{parte2.benchmark.dso.sector}</td>
                          <td className="text-danger">+167</td>
                          <td><span className="status-badge bg-danger">Critico</span></td>
                        </tr>
                        <tr>
                          <td>DPO (Giorni Debiti)</td>
                          <td className="text-end">{parte2.benchmark.dpo.company}</td>
                          <td className="text-end">{parte2.benchmark.dpo.sector}</td>
                          <td className="text-danger">+117</td>
                          <td><span className="status-badge bg-warning">Attenzione</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6>Analisi posizionamento ({company.shortName}):</h6>
              <p className="small mb-0">
                {company.shortName} si posiziona <strong>significativamente meglio della media di settore</strong> in termini di
                redditività del capitale (ROI 53,26% vs 18,40%), efficienza nell'utilizzo delle risorse (Turnover 5,82 vs 2,90)
                e solidità finanziaria (assenza di debiti finanziari e PFN negativa). L'EBITDA margin (9,91%) è sostanzialmente
                in linea con il benchmark settoriale (11,50%). La <strong>principale criticità</strong> riguarda la gestione del
                capitale circolante, con tempi di incasso dei crediti commerciali (262 giorni) eccezionalmente superiori agli
                standard di settore (95 giorni). La crescita dei ricavi (+1,64%) risulta inferiore alla media di settore (+5,00%),
                evidenziando un potenziale ambito di miglioramento.
              </p>
            </div>
          </div>

          {/* Gap Analysis */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">2.2.2 Gap Analysis vs Best Practice</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Area</th>
                      <th>Situazione Attuale</th>
                      <th>Benchmark</th>
                      <th>Gap</th>
                      <th>Valutazione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gestione Crediti Clienti</td>
                      <td>DSO: 262 giorni</td>
                      <td>90-120 giorni</td>
                      <td className="text-danger">+172 giorni</td>
                      <td><span className="status-badge bg-danger">Critico</span></td>
                    </tr>
                    <tr>
                      <td>Gestione Debiti Fornitori</td>
                      <td>DPO: 222 giorni</td>
                      <td>60-90 giorni</td>
                      <td className="text-danger">+162 giorni</td>
                      <td><span className="status-badge bg-danger">Critico</span></td>
                    </tr>
                    <tr>
                      <td>Gestione del Circolante</td>
                      <td>Ciclo: 119 giorni</td>
                      <td>30-60 giorni</td>
                      <td className="text-danger">+74 giorni</td>
                      <td><span className="status-badge bg-danger">Critico</span></td>
                    </tr>
                    <tr>
                      <td>Crescita Ricavi</td>
                      <td>+1,64% (2023-2024)</td>
                      <td>+5-10%</td>
                      <td className="text-danger">-6,36 p.p.</td>
                      <td><span className="status-badge bg-warning">Problematico</span></td>
                    </tr>
                    <tr>
                      <td>Struttura Costi Fissi</td>
                      <td>+22,4% (2023-2024)</td>
                      <td>&lt;+5%</td>
                      <td className="text-danger">+17,4 p.p.</td>
                      <td><span className="status-badge bg-danger">Critico</span></td>
                    </tr>
                    <tr>
                      <td>Produttività Risorse</td>
                      <td>€171.791/dipendente</td>
                      <td>€120.000-150.000/dipendente</td>
                      <td className="text-success">+€31.791/dipendente</td>
                      <td><span className="status-badge bg-success">Eccellente</span></td>
                    </tr>
                    <tr>
                      <td>Redditività Operativa</td>
                      <td>ROS: 9,2%</td>
                      <td>5-7%</td>
                      <td className="text-success">+3,2 p.p.</td>
                      <td><span className="status-badge bg-success">Eccellente</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card summary-card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-check-circle text-primary me-2"></i>
                Conclusioni Analisi Economica e Benchmark ({company.shortName})
              </h5>
              <p>
                {company.shortName} presenta un <strong>profilo di redditività complessivamente positivo</strong>, con indicatori
                economico-finanziari eccellenti (ROE 40,91%, ROI 53,26%, ROS 9,2%) e significativamente superiori ai benchmark settoriali.
                La struttura patrimoniale è solida, con assenza di debiti finanziari e buona liquidità disponibile.
              </p>
              <p>
                Le <strong>principali criticità</strong> riguardano la gestione del capitale circolante, con tempi di incasso
                eccezionalmente elevati (DSO 262 giorni) e tempi di pagamento ai fornitori altrettanto dilatati (DPO 222 giorni).
                Ulteriori elementi di attenzione sono l'incremento dei costi fissi (+22,4%) significativamente superiore alla crescita
                dei ricavi (+1,64%) e la limitata espansione dimensionale.
              </p>
              <p>
                Le <strong>azioni prioritarie</strong> dovrebbero concentrarsi sull'ottimizzazione della gestione del circolante per
                liberare liquidità, sull'implementazione di un sistema strutturato di controllo dei costi fissi e sullo sviluppo di un
                piano commerciale per accelerare la crescita dei ricavi, capitalizzando sull'eccellente produttività delle risorse umane
                e sulla solidità patrimoniale.
              </p>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
