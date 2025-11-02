import DashboardLayout from '../../components/DashboardLayout'
import PieChart from '../../components/charts/PieChart'
import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'
import financialData from '../../data/financial-data.json'

export default function Parte3Patrimoniale() {
  const { parte3, company } = financialData

  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`
    }
    return `€${value.toFixed(0)}`
  }

  const formatPercent = (value) => `${value.toFixed(1)}%`

  // Chart: Assets Composition 2024
  const assetsChartData = {
    labels: ['Attivo Fisso Netto', 'Crediti Clienti', 'Rimanenze', 'Altri Crediti', 'Liquidità'],
    datasets: [{
      data: [
        parte3.balanceSheet.assets.attivoFissoNetto[2],
        parte3.balanceSheet.assets.creditiClienti[2],
        parte3.balanceSheet.assets.rimanenze[2],
        parte3.balanceSheet.assets.altriCrediti[2],
        parte3.balanceSheet.assets.liquidita[2]
      ],
      backgroundColor: [
        'rgba(25, 25, 112, 0.8)',
        'rgba(77, 140, 87, 0.8)',
        'rgba(217, 140, 0, 0.8)',
        'rgba(74, 105, 189, 0.8)',
        'rgba(79, 109, 122, 0.8)'
      ]
    }]
  }

  // Chart: Liabilities Composition 2024
  const liabilitiesChartData = {
    labels: ['Debiti Fornitori', 'Altri Debiti', 'Fondi', 'Debiti Finanziari', 'Patrimonio Netto'],
    datasets: [{
      data: [
        parte3.balanceSheet.liabilities.debitiFornitori[2],
        parte3.balanceSheet.liabilities.altriDebiti[2],
        parte3.balanceSheet.liabilities.fondi[2],
        parte3.balanceSheet.liabilities.debitiFinanziari[2],
        parte3.balanceSheet.liabilities.patrimonioNetto[2]
      ],
      backgroundColor: [
        'rgba(214, 34, 70, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(244, 67, 54, 0.8)',
        'rgba(76, 175, 80, 0.8)'
      ]
    }]
  }

  // Chart: Balance Sheet Evolution
  const balanceSheetEvolutionData = {
    labels: parte3.balanceSheet.years,
    datasets: [
      {
        label: 'Totale Attivo',
        data: parte3.balanceSheet.assets.totaleAttivo,
        backgroundColor: 'rgba(25, 25, 112, 0.6)',
        borderColor: 'rgba(25, 25, 112, 1)',
        borderWidth: 1
      },
      {
        label: 'Patrimonio Netto',
        data: parte3.balanceSheet.liabilities.patrimonioNetto,
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1
      },
      {
        label: 'Debiti Finanziari',
        data: parte3.balanceSheet.liabilities.debitiFinanziari,
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
        borderColor: 'rgba(244, 67, 54, 1)',
        borderWidth: 1
      }
    ]
  }

  // Chart: PFN Evolution
  const pfnEvolutionData = {
    labels: parte3.pfn.years,
    datasets: [{
      label: 'PFN (€)',
      data: parte3.pfn.pfn,
      borderColor: 'rgba(77, 140, 87, 1)',
      backgroundColor: 'rgba(77, 140, 87, 0.2)',
      borderWidth: 2,
      fill: true
    }]
  }

  return (
    <DashboardLayout
      title="Parte 3: Analisi Patrimoniale"
      subtitle="Struttura patrimoniale, attivo e passivo"
    >
      {/* KPIs Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-info">
            <div className="card-title-modern">Totale Attivo 2024</div>
            <div className="kpi-value-modern">{formatCurrency(parte3.balanceSheet.assets.totaleAttivo[2])}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">+31,9% vs 2022</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Patrimonio Netto 2024</div>
            <div className="kpi-value-modern">{formatCurrency(parte3.balanceSheet.liabilities.patrimonioNetto[2])}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">+69,2% vs 2023</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">Debiti Finanziari 2024</div>
            <div className="kpi-value-modern">{formatCurrency(parte3.balanceSheet.liabilities.debitiFinanziari[2])}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">Azzerati (-100%)</span>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card-v2 border-left-success">
            <div className="card-title-modern">PFN 2024</div>
            <div className="kpi-value-modern">{formatCurrency(parte3.pfn.pfn[2])}</div>
            <div className="kpi-trend-modern trend-up">
              <span className="trend-value">Cash Positive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Assets and Liabilities Composition */}
      <h2 className="section-title">3.1 Composizione Patrimoniale 2024</h2>
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="text-center mb-3">Composizione Impieghi (Attivo)</h6>
              <div className="chart-container" style={{ height: '300px' }}>
                <PieChart data={assetsChartData} />
              </div>
              <div className="mt-3 small">
                <p className="mb-1"><strong>Principali componenti:</strong></p>
                <ul className="mb-0">
                  <li>Crediti Clienti: {formatPercent(parte3.balanceSheet.assets.creditiClientiPercent[2])} (€{(parte3.balanceSheet.assets.creditiClienti[2]/1000).toFixed(0)}K)</li>
                  <li>Liquidità: {formatPercent(parte3.balanceSheet.assets.liquiditaPercent[2])} (€{(parte3.balanceSheet.assets.liquidita[2]/1000).toFixed(0)}K)</li>
                  <li>Attivo Fisso: {formatPercent(parte3.balanceSheet.assets.attivoFissoNettoPercent[2])} (€{(parte3.balanceSheet.assets.attivoFissoNetto[2]/1000).toFixed(0)}K)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="text-center mb-3">Composizione Fonti (Passivo)</h6>
              <div className="chart-container" style={{ height: '300px' }}>
                <PieChart data={liabilitiesChartData} />
              </div>
              <div className="mt-3 small">
                <p className="mb-1"><strong>Principali componenti:</strong></p>
                <ul className="mb-0">
                  <li>Debiti Fornitori: {formatPercent(parte3.balanceSheet.liabilities.debitiFornitoriPercent[2])} (€{(parte3.balanceSheet.liabilities.debitiFornitori[2]/1000).toFixed(0)}K)</li>
                  <li>Patrimonio Netto: {formatPercent(parte3.balanceSheet.liabilities.patrimonioNettoPercent[2])} (€{(parte3.balanceSheet.liabilities.patrimonioNetto[2]/1000).toFixed(0)}K)</li>
                  <li>Debiti Finanziari: {formatPercent(parte3.balanceSheet.liabilities.debitiFinanziariPercent[2])} (€0)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Sheet Table */}
      <h2 className="section-title">3.2 Stato Patrimoniale Riclassificato</h2>
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Voce</th>
                  <th className="text-end">2022</th>
                  <th className="text-end">%</th>
                  <th className="text-end">2023</th>
                  <th className="text-end">%</th>
                  <th className="text-end">2024</th>
                  <th className="text-end">%</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fw-bold"><td colSpan="7">IMPIEGHI</td></tr>
                <tr>
                  <td>Attivo Fisso Netto</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.attivoFissoNetto[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.attivoFissoNettoPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.attivoFissoNetto[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.attivoFissoNettoPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.attivoFissoNetto[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.attivoFissoNettoPercent[2])}</td>
                </tr>
                <tr>
                  <td>Crediti Clienti</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.creditiClienti[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.creditiClientiPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.creditiClienti[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.creditiClientiPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.creditiClienti[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.creditiClientiPercent[2])}</td>
                </tr>
                <tr>
                  <td>Liquidità</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.liquidita[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.liquiditaPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.liquidita[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.liquiditaPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.liquidita[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.liquiditaPercent[2])}</td>
                </tr>
                <tr className="table-primary fw-bold">
                  <td>Totale Attivo</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.totaleAttivo[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.totaleAttivoPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.totaleAttivo[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.totaleAttivoPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.assets.totaleAttivo[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.assets.totaleAttivoPercent[2])}</td>
                </tr>
                <tr className="fw-bold"><td colSpan="7">FONTI</td></tr>
                <tr>
                  <td>Debiti Fornitori</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.debitiFornitori[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.debitiFornitoriPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.debitiFornitori[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.debitiFornitoriPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.debitiFornitori[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.debitiFornitoriPercent[2])}</td>
                </tr>
                <tr>
                  <td>Debiti Finanziari</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.debitiFinanziari[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.debitiFinanziariPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.debitiFinanziari[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.debitiFinanziariPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.debitiFinanziari[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.debitiFinanziariPercent[2])}</td>
                </tr>
                <tr>
                  <td>Patrimonio Netto</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.patrimonioNetto[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.patrimonioNettoPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.patrimonioNetto[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.patrimonioNettoPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.patrimonioNetto[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.patrimonioNettoPercent[2])}</td>
                </tr>
                <tr className="table-primary fw-bold">
                  <td>Totale Passivo</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.totalePassivo[0])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.totalePassivoPercent[0])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.totalePassivo[1])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.totalePassivoPercent[1])}</td>
                  <td className="text-end">{formatCurrency(parte3.balanceSheet.liabilities.totalePassivo[2])}</td>
                  <td className="text-end">{formatPercent(parte3.balanceSheet.liabilities.totalePassivoPercent[2])}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Evolution Charts */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Evoluzione Patrimonio 2022-2024</h6>
              <div className="chart-container" style={{ height: '300px' }}>
                <BarChart data={balanceSheetEvolutionData} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-3">Evoluzione PFN 2022-2024</h6>
              <div className="chart-container" style={{ height: '300px' }}>
                <LineChart data={pfnEvolutionData} />
              </div>
              <div className="mt-3 small">
                <p className="mb-0"><strong>PFN 2024:</strong> {formatCurrency(parte3.pfn.pfn[2])} (Cash Positive - Eccellente)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solidity Indices */}
      <h2 className="section-title">3.6 Indici di Solidità Patrimoniale</h2>
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm table-striped table-hover">
              <thead className="table-light">
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
                  <td>Autonomia Finanziaria (PN/Tot. Passivo)</td>
                  <td className="text-end">{formatPercent(parte3.solidityIndices.autonomiaFinanziaria[0])}</td>
                  <td className="text-end">{formatPercent(parte3.solidityIndices.autonomiaFinanziaria[1])}</td>
                  <td className="text-end">{formatPercent(parte3.solidityIndices.autonomiaFinanziaria[2])}</td>
                  <td>&gt; 33%</td>
                  <td><span className="status-badge bg-success">Buona</span></td>
                </tr>
                <tr>
                  <td>Copertura Immobilizzazioni (PN/Immob.)</td>
                  <td className="text-end">{parte3.solidityIndices.coperturaImmobilizzazioni[0].toFixed(2)}</td>
                  <td className="text-end">{parte3.solidityIndices.coperturaImmobilizzazioni[1].toFixed(2)}</td>
                  <td className="text-end">{parte3.solidityIndices.coperturaImmobilizzazioni[2].toFixed(2)}</td>
                  <td>&gt; 1,0</td>
                  <td><span className="status-badge bg-success">Eccellente</span></td>
                </tr>
                <tr>
                  <td>Leva Finanziaria (Debiti Fin./PN)</td>
                  <td className="text-end">{parte3.solidityIndices.levaFinanziaria[0].toFixed(2)}</td>
                  <td className="text-end">{parte3.solidityIndices.levaFinanziaria[1].toFixed(2)}</td>
                  <td className="text-end">{parte3.solidityIndices.levaFinanziaria[2].toFixed(2)}</td>
                  <td>&lt; 1,0</td>
                  <td><span className="status-badge bg-success">Eccellente</span></td>
                </tr>
                <tr>
                  <td>Quoziente di Liquidità</td>
                  <td className="text-end">{formatPercent(parte3.solidityIndices.quozienteLiquidita[0])}</td>
                  <td className="text-end">{formatPercent(parte3.solidityIndices.quozienteLiquidita[1])}</td>
                  <td className="text-end">{formatPercent(parte3.solidityIndices.quozienteLiquidita[2])}</td>
                  <td>&gt; 4%</td>
                  <td><span className="status-badge bg-success">Adeguata</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="alert-box alert-success mt-3">
            <h6>Conclusioni ({company.shortName}):</h6>
            <ul className="mb-0 small">
              <li><strong>Eccellente rafforzamento patrimoniale:</strong> Patrimonio Netto +141,7% nel triennio</li>
              <li><strong>Azzeramento debiti finanziari:</strong> PFN negativa di €56.948 (cash positive)</li>
              <li><strong>Solidità patrimoniale eccellente:</strong> Copertura immobilizzazioni 10,67x</li>
              <li><strong>Criticità capitale circolante:</strong> DSO 262 giorni richiede ottimizzazione</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
