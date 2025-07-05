/**
 * SCAN360 - init.js
 * Inizializzazione comune per tutte le pagine del minisito
 */

/**
 * Inizializza gli elementi della pagina dashboard
 */
function initDashboard() {
    console.log("Inizializzazione dashboard...");
    
    // Tenta di inizializzare il grafico Trend Ricavi/EBITDA
    try {
        const trendRicEbitdaData = getTrendRicaviEbitdaData_Dashboard();
        if (trendRicEbitdaData) {
            const trendRicEbitdaOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Valore (€)' },
                        position: 'left',
                        ticks: {
                            callback: function(value) {
                                if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(1) + ' M';
                                if (Math.abs(value) >= 1000) return (value / 1000).toFixed(0) + ' K';
                                return value;
                            }
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        title: { display: true, text: 'EBITDA Margin (%)' },
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        suggestedMin: 0,
                        suggestedMax: 15
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } },
                    title: { display: true, text: 'Evoluzione Ricavi e Margine EBITDA', font: { size: 14, weight: 'bold' } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    if (context.dataset.yAxisID === 'y1') {
                                        label += context.parsed.y.toFixed(1) + '%';
                                    } else {
                                        if (context.parsed.y >= 1) {
                                            label += context.parsed.y.toFixed(1) + ' M€';
                                        } else {
                                            label += (context.parsed.y * 1000).toFixed(0) + ' K€';
                                        }
                                    }
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: { duration: 400 }
            };
            initChart('trendRicaviEbitdaChart', 'bar', trendRicEbitdaData, trendRicEbitdaOptions);
        }
    } catch (error) {
        console.error("Errore inizializzazione grafico Trend Ricavi/EBITDA:", error);
    }
    
    // Tenta di inizializzare il grafico Trend PFN/EBITDA
    try {
        const trendPfnEbitdaData = getTrendPfnEbitdaData_Dashboard();
        if (trendPfnEbitdaData) {
            const trendPfnEbitdaOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        title: { display: true, text: 'Rapporto (x)' },
                        suggestedMin: -1,
                        suggestedMax: 4
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } },
                    title: { display: true, text: 'Evoluzione PFN/EBITDA vs Soglia', font: { size: 14, weight: 'bold' } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2) + 'x';
                                } else {
                                    label += 'N/D';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: { duration: 400 }
            };
            initChart('trendPfnEbitdaChart', 'line', trendPfnEbitdaData, trendPfnEbitdaOptions);
        }
    } catch (error) {
        console.error("Errore inizializzazione grafico Trend PFN/EBITDA:", error);
    }
    
    console.log("Inizializzazione dashboard completata.");
}

/**
 * Inizializzazione elementi comuni per le pagine di report
 */
function initReportPage() {
    console.log("Inizializzazione pagina report...");
    
    // Attiva tooltip Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Attiva la navigazione sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    sidebarLinks.forEach(link => {
        // Evidenzia link attivo in base all'URL corrente
        if (window.location.href.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
        
        // Evento click per mobile (opzionale)
        link.addEventListener('click', function() {
            // Per versioni mobile, potrebbe chiudere la sidebar dopo il click
            const sidebar = document.querySelector('.sidebar');
            if (window.innerWidth < 992 && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    });
    
    console.log("Inizializzazione pagina report completata.");
}

/**
 * Inizializza tutti i grafici della pagina report corrente
 * Questa funzione rileva quali grafici sono presenti e li inizializza
 */
function initReportCharts() {
    console.log("Inizializzazione grafici report...");
    
    // La funzione inizializza ogni grafico solo se il relativo elemento canvas esiste nella pagina
    
    // Grafici parte 1: Sintesi
    if (document.getElementById('mainMetricsChart')) {
        try {
            const data = getMainMetricsData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Valori in €000' },
                        ticks: { callback: function(v) { return v.toLocaleString('it-IT'); } }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Evoluzione Ricavi, EBITDA e Patrimonio Netto' }
                }
            };
            initChart('mainMetricsChart', 'bar', data, options);
        } catch(e) {
            console.error("Errore grafico mainMetricsChart:", e);
        }
    }
    
    if (document.getElementById('currentAssetsLiabilitiesChart')) {
        try {
            const data = getCurrentAssetsLiabilitiesData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Valore (€)' },
                        ticks: { callback: function(v) { return formatCurrency(v); } }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Andamento Attivo e Passivo Corrente' }
                }
            };
            initChart('currentAssetsLiabilitiesChart', 'bar', data, options);
        } catch(e) {
            console.error("Errore grafico currentAssetsLiabilitiesChart:", e);
        }
    }
    
    // Grafici parte 2: Economico
    if (document.getElementById('economicTrendChart')) {
        try {
            const data = getEconomicTrendData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Valori in €000' },
                        ticks: { callback: function(v) { return v.toLocaleString('it-IT'); } }
                    },
                    y1: {
                        position: 'right',
                        title: { display: true, text: 'EBITDA %' },
                        grid: { drawOnChartArea: false },
                        suggestedMin: 0,
                        suggestedMax: 15,
                        ticks: { callback: function(v) { return v + '%'; } }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Trend Economico e Marginalità' }
                }
            };
            initChart('economicTrendChart', 'bar', data, options);
        } catch(e) {
            console.error("Errore grafico economicTrendChart:", e);
        }
    }
    
    // Grafici parte 5: Circolante e Flussi
    if (document.getElementById('dsoDpoTrendChart')) {
        try {
            const data = getDsoDpoTrendData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Giorni' }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Evoluzione DSO, DPO e Ciclo Circolante' }
                }
            };
            initChart('dsoDpoTrendChart', 'line', data, options);
        } catch(e) {
            console.error("Errore grafico dsoDpoTrendChart:", e);
        }
    }
    
    if (document.getElementById('cashFlowOpTrendChart')) {
        try {
            const data = getTrendCashFlowOpData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Percentuale (%)' },
                        ticks: { callback: function(v) { return v + '%'; } }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Cash Flow Operativo in % sui Ricavi' }
                }
            };
            initChart('cashFlowOpTrendChart', 'line', data, options);
        } catch(e) {
            console.error("Errore grafico cashFlowOpTrendChart:", e);
        }
    }
    
    if (document.getElementById('cashFlowProjectionChart')) {
        try {
            const data = getCashFlowProjectionData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Flussi di Cassa (€)' },
                        ticks: { callback: function(v) { return formatCurrency(v); } }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: { display: true, text: 'Liquidità Finale (€)' },
                        grid: { drawOnChartArea: false },
                        ticks: { callback: function(v) { return formatCurrency(v); } }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Proiezioni Finanziarie 2024-2028' }
                }
            };
            initChart('cashFlowProjectionChart', 'bar', data, options);
        } catch(e) {
            console.error("Errore grafico cashFlowProjectionChart:", e);
        }
    }
    
    // Grafici parte 6: Rischi
    if (document.getElementById('zscoreChart')) {
        try {
            const data = getZscoreData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Z-Score' },
                        suggestedMin: 0,
                        suggestedMax: 4
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Evoluzione Z-Score e Soglie di Riferimento' }
                }
            };
            initChart('zscoreChart', 'line', data, options);
        } catch(e) {
            console.error("Errore grafico zscoreChart:", e);
        }
    }
    
    if (document.getElementById('riskIndicatorsChart')) {
        try {
            const data = getRiskIndicatorsData();
            initChart('riskIndicatorsChart', 'radar', data, radarChartOptions);
        } catch(e) {
            console.error("Errore grafico riskIndicatorsChart:", e);
        }
    }
    
    if (document.getElementById('sensitivityChart')) {
        try {
            const data = getSensitivityData();
            const options = {
                ...commonChartOptions,
                scales: {
                    y: {
                        ...commonChartOptions.scales.y,
                        title: { display: true, text: 'Variazione percentuale critica (%)' },
                        ticks: { callback: function(v) { return v + '%'; } }
                    }
                },
                plugins: {
                    ...commonChartOptions.plugins,
                    title: { display: true, text: 'Analisi di Sensitività - Variazioni Critiche' }
                }
            };
            initChart('sensitivityChart', 'bar', data, options);
        } catch(e) {
            console.error("Errore grafico sensitivityChart:", e);
        }
    }
    
    console.log("Inizializzazione grafici report completata.");
}

// ======================================================================
// EVENT LISTENERS PER INIZIALIZZAZIONE
// ======================================================================

// Esecuzione all'avvio di ogni pagina
document.addEventListener('DOMContentLoaded', function() {
    // Determina il tipo di pagina e inizializza di conseguenza
    const isReportPage = document.querySelector('.sidebar-nav') !== null;
    const isDashboardPage = document.querySelector('.dashboard-container') !== null && 
                           !document.URL.includes('/report/');
    
    // Inizializza elementi comuni per tutte le pagine
    // Aggiorna anno corrente nei footer
    const yearElements = document.querySelectorAll('[id^="currentYear"]');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Inizializzazione specifica per tipo di pagina
    if (isReportPage) {
        // Inizializza elementi pagina report
        initReportPage();
        // Inizializza i grafici presenti nella pagina report
        initReportCharts();
    } else if (isDashboardPage) {
        // Inizializza la dashboard
        initDashboard();
    }
    
    // Aggiorna badge IRP header (se presente)
    const irpHeaderBadge = document.getElementById('irp-header-badge');
    if (irpHeaderBadge) {
        const irpScoreValue = 87.03; // Valore fisso o da API
        let badgeClass = 'bg-success'; // Default: Basso rischio
        
        if (irpScoreValue >= 71) badgeClass = 'bg-success'; // Basso
        else if (irpScoreValue < 51) badgeClass = 'bg-danger'; // Alto
        else badgeClass = 'bg-warning text-dark'; // Medio
        
        irpHeaderBadge.className = `badge ${badgeClass} me-3`;
        irpHeaderBadge.textContent = `IRP: ${irpScoreValue.toFixed(1)} (B+)`;
    }
    
    // Definisci funzioni globali se non esistono già
    if (typeof logout !== 'function') {
        window.logout = function() {
            console.log("Logout action triggered (placeholder)");
            // Implementazione reale da aggiungere se necessario
        }
    }
    
    // Funzione di stampa
    if (typeof printDocument !== 'function') {
        window.printDocument = function() {
            window.print();
        }
    }
});
