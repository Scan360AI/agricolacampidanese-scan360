/**
 * SCAN360 - charts_config.js
 * Configurazione centralizzata per tutti i grafici dell'applicazione
 */

// ======================================================================
// CONFIGURAZIONI COMUNI PER GRAFICI
// ======================================================================

/**
 * Opzioni comuni per tutti i grafici
 */
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                padding: 5,
                font: { size: 11 }
            },
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
            }
        },
        x: {
            ticks: {
                padding: 5,
                font: { size: 11 }
            },
            grid: {
                display: false,
                drawBorder: false
            }
        }
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 12,
                padding: 15,
                font: { size: 11 }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { weight: 'bold', size: 13 },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 4,
            displayColors: true
        }
    },
    animation: {
        duration: 500
    }
};

/**
 * Opzioni specifiche per grafici radar
 */
const radarChartOptions = {
    ...commonChartOptions,
    scales: {
        r: {
            angleLines: {
                display: true,
                color: 'rgba(0, 0, 0, 0.1)'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
                backdropColor: 'transparent',
                font: { size: 10 }
            }
        }
    }
};

// ======================================================================
// DASHBOARD - DATI GRAFICI
// ======================================================================

/**
 * Dati per il grafico Trend Ricavi/EBITDA nella Dashboard
 * @returns {Object} Configurazione dati grafico
 */
function getTrendRicaviEbitdaData_Dashboard() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                type: 'bar',
                label: 'Ricavi',
                data: [1.67, 2.98, 10.75],
                backgroundColor: 'rgba(25, 25, 112, 0.7)',
                order: 2,
                yAxisID: 'y'
            },
            {
                type: 'line',
                label: 'EBITDA %',
                data: [-0.24, 16.11, 6.60],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                order: 1,
                yAxisID: 'y1'
            }
        ]
    };
}

/**
 * Dati per il grafico Trend PFN/EBITDA nella Dashboard
 * @returns {Object} Configurazione dati grafico
 */
function getTrendPfnEbitdaData_Dashboard() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'PFN/EBITDA',
                data: [null, -0.45, 0.36],
                borderColor: '#4a69bd',
                backgroundColor: 'rgba(74, 105, 189, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Soglia Critica',
                data: [3.5, 3.5, 3.5],
                borderColor: '#F44336',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }
        ]
    };
}

// ======================================================================
// REPORT DETTAGLIO - DATI GRAFICI
// ======================================================================

/**
 * Dati per il grafico metriche principali
 * @returns {Object} Configurazione dati grafico
 */
function getMainMetricsData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                type: 'bar',
                label: 'Ricavi',
                data: [1670, 2980, 10750],
                backgroundColor: 'rgba(25, 25, 112, 0.7)',
                order: 2
            },
            {
                type: 'bar',
                label: 'EBITDA',
                data: [-4, 480, 710],
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                order: 1
            },
            {
                type: 'line',
                label: 'Patrimonio Netto',
                data: [80, 483, 634],
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };
}

/**
 * Dati per il grafico attivo/passivo corrente
 * @returns {Object} Configurazione dati grafico
 */
function getCurrentAssetsLiabilitiesData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                type: 'bar',
                label: 'Attivo Corrente',
                data: [1500000, 2000000, 5250000],
                backgroundColor: 'rgba(74, 105, 189, 0.7)',
                order: 2
            },
            {
                type: 'bar',
                label: 'Passivo Corrente',
                data: [1350000, 1620000, 4580000],
                backgroundColor: 'rgba(244, 67, 54, 0.7)',
                order: 1
            },
            {
                type: 'line',
                label: 'Rapporto Corrente',
                data: [1.11, 1.23, 1.15],
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };
}

/**
 * Dati per il grafico trend economico
 * @returns {Object} Configurazione dati grafico
 */
function getEconomicTrendData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                type: 'bar',
                label: 'Ricavi',
                data: [1670, 2980, 10750],
                backgroundColor: 'rgba(25, 25, 112, 0.7)',
                order: 2
            },
            {
                type: 'bar',
                label: 'EBITDA',
                data: [-4, 480, 710],
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                order: 1
            },
            {
                type: 'line',
                label: 'EBITDA %',
                data: [-0.24, 16.11, 6.60],
                borderColor: '#4CAF50',
                borderWidth: 2,
                borderDash: [0],
                fill: false,
                tension: 0.3,
                pointRadius: 4,
                yAxisID: 'y1'
            }
        ]
    };
}

/**
 * Dati per il grafico Z-Score
 * @returns {Object} Configurazione dati grafico
 */
function getZscoreData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'Z-Score',
                data: [0.84, 5.22, 11.86],
                borderColor: '#4a69bd',
                backgroundColor: 'rgba(74, 105, 189, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Soglia Rischio Elevato',
                data: [1.8, 1.8, 1.8],
                borderColor: '#F44336',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            },
            {
                label: 'Soglia Sicurezza',
                data: [3.0, 3.0, 3.0],
                borderColor: '#4CAF50',
                borderWidth: 2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0
            }
        ]
    };
}

/**
 * Dati per il grafico Indicatori di Rischio (radar)
 * @returns {Object} Configurazione dati grafico radar
 */
function getRiskIndicatorsData() {
    return {
        labels: [
            'Liquidità',
            'Solvibilità',
            'Redditività',
            'Operatività',
            'Dimensione',
            'Capitalizzazione'
        ],
        datasets: [
            {
                label: 'Score Attuale',
                data: [78, 92, 85, 68, 45, 82],
                backgroundColor: 'rgba(74, 105, 189, 0.2)',
                borderColor: '#4a69bd',
                borderWidth: 2,
                pointBackgroundColor: '#4a69bd',
                pointRadius: 4
            },
            {
                label: 'Benchmark Settore',
                data: [65, 70, 60, 75, 65, 60],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: '#4CAF50',
                borderWidth: 2,
                pointBackgroundColor: '#4CAF50',
                pointRadius: 4
            }
        ]
    };
}

/**
 * Dati per il grafico analisi di sensitività
 * @returns {Object} Configurazione dati grafico 
 */
function getSensitivityData() {
    return {
        labels: ['Margini (%)', 'Ricavi (%)', 'Costi Fissi (%)', 'DSO (giorni)', 'DPO (giorni)'],
        datasets: [{
            label: 'Variazione critica',
            data: [-35, -25, 40, 60, -30],
            backgroundColor: [
                'rgba(244, 67, 54, 0.7)',
                'rgba(244, 67, 54, 0.7)',
                'rgba(76, 175, 80, 0.7)',
                'rgba(76, 175, 80, 0.7)',
                'rgba(244, 67, 54, 0.7)'
            ],
            borderColor: [
                'rgb(244, 67, 54)',
                'rgb(244, 67, 54)',
                'rgb(76, 175, 80)',
                'rgb(76, 175, 80)',
                'rgb(244, 67, 54)'
            ],
            borderWidth: 1
        }]
    };
}

/**
 * Dati per il grafico DSO/DPO/DIO
 * @returns {Object} Configurazione dati grafico 
 */
function getDsoDpoTrendData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [
            {
                label: 'DSO',
                data: [139, 139, 144],
                borderColor: '#4a69bd',
                backgroundColor: 'rgba(74, 105, 189, 0.2)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'DIO',
                data: [41, 41, 37],
                borderColor: '#FFC107',
                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'DPO',
                data: [115, 115, 119],
                borderColor: '#4a69bd',
                backgroundColor: 'rgba(74, 105, 189, 0.2)',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Ciclo Circolante',
                data: [65, 15, 62],
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                fill: true,
                tension: 0.1,
                borderWidth: 2
            }
        ]
    };
}

/**
 * Dati per il grafico Cash Flow Operativo
 * @returns {Object} Configurazione dati grafico 
 */
function getTrendCashFlowOpData() {
    return {
        labels: ['2022', '2023', '2024'],
        datasets: [{
            label: 'Cash Flow Operativo / Ricavi (%)',
            data: [7.11, 14.49, -1.94],
            borderColor: 'rgb(77, 140, 87)',
            backgroundColor: 'rgba(77, 140, 87, 0.2)',
            fill: true,
            tension: 0.1
        }]
    };
}

/**
 * Dati per il grafico Proiezione Cash Flow
 * @returns {Object} Configurazione dati grafico 
 */
function getCashFlowProjectionData() {
    return {
        labels: ['2024', '2025', '2026', '2027', '2028'],
        datasets: [
            {
                type: 'bar',
                label: 'Cash Flow Operativo',
                data: [250000, 680000, 850000, 920000, 980000],
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                order: 1
            },
            {
                type: 'bar',
                label: 'Cash Flow Investimenti',
                data: [-180000, -220000, -320000, -280000, -250000],
                backgroundColor: 'rgba(255, 193, 7, 0.7)',
                order: 2
            },
            {
                type: 'bar',
                label: 'Cash Flow Finanziario',
                data: [-120000, -150000, -180000, -200000, -220000],
                backgroundColor: 'rgba(74, 105, 189, 0.7)',
                order: 3
            },
            {
                type: 'line',
                label: 'Liquidità Finale',
                data: [650000, 960000, 1310000, 1750000, 2260000],
                borderColor: '#F44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };
}
