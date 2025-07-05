/**
 * SCAN360 - Common.js
 * File JavaScript comune con funzioni di utilità condivise tra tutte le pagine
 */

// ======================================================================
// UTILITY FUNZIONI
// ======================================================================

/**
 * Formatta un valore come valuta in Euro
 * @param {number} value - Valore da formattare
 * @param {boolean} compact - Se true, formatta in modo compatto (K, M)
 * @returns {string} Valore formattato
 */
function formatCurrency(value, compact = false) {
    if (value === null || value === undefined || isNaN(value)) {
        return 'N/D';
    }
    
    if (compact) {
        if (Math.abs(value) >= 1000000) {
            return (value / 1000000).toFixed(1) + ' M€';
        }
        if (Math.abs(value) >= 1000) {
            return (value / 1000).toFixed(0) + ' K€';
        }
        return value.toFixed(0) + ' €';
    }
    
    // Formattazione estesa
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Formatta una percentuale
 * @param {number} value - Valore da formattare
 * @param {number} decimals - Numero di decimali (default: 1)
 * @returns {string} Valore percentuale formattato
 */
function formatPercent(value, decimals = 1) {
    if (value === null || value === undefined || isNaN(value)) {
        return 'N/D';
    }
    return value.toFixed(decimals) + '%';
}

// ======================================================================
// GESTIONE UTENTE E AUTENTICAZIONE
// ======================================================================

/**
 * Controlla lo stato del login dell'utente
 * @returns {boolean} True se l'utente è loggato, false altrimenti
 */
function checkLoginStatus() {
    // Verifica basica presenza del token
    const token = localStorage.getItem('scan_token');
    const isLoggedIn = token !== null;
    
    // Pagina di login?
    const isLoginPage = window.location.pathname.includes('login.html');
    
    // Redirect alla pagina di login se non autenticato (eccetto login page)
    if (!isLoggedIn && !isLoginPage && !window.location.pathname.includes('demo')) {
        console.log("Utente non autenticato, redirect a login");
        window.location.href = 'login.html';
        return false;
    }
    
    // Aggiorna eventuale UI per utente loggato
    if (isLoggedIn) {
        updateLoggedInUI();
    }
    
    return isLoggedIn;
}

/**
 * Aggiorna gli elementi UI per l'utente loggato
 */
function updateLoggedInUI() {
    // Recupera info utente
    const userData = JSON.parse(localStorage.getItem('scan_user_data') || '{}');
    const userName = userData.nome || 'Utente';
    
    // Aggiorna elementi UI se presenti
    const userNameElement = document.getElementById('loggedUserName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    // Altri elementi UI potrebbero essere aggiornati qui
}

/**
 * Esegue il logout dell'utente
 */
function logout() {
    localStorage.removeItem('scan_token');
    localStorage.removeItem('scan_user_data');
    console.log("Logout effettuato");
    window.location.href = 'login.html';
}

// ======================================================================
// GESTIONE GRAFICI
// ======================================================================

/**
 * Inizializza un grafico Chart.js
 * @param {string} canvasId - ID dell'elemento canvas
 * @param {string} chartType - Tipo di grafico ('bar', 'line', 'pie', 'doughnut', 'radar')
 * @param {object} chartData - Oggetto dati per il grafico
 * @param {object} chartOptions - Opzioni di configurazione del grafico
 */
function initChart(canvasId, chartType, chartData, chartOptions) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        return; // Canvas non trovato, uscita silenziosa
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`Impossibile ottenere il contesto 2D per il canvas: ${canvasId}`);
        return;
    }

    // Validazione dati
    if (!chartData || typeof chartData !== 'object' || !Array.isArray(chartData.labels) || !Array.isArray(chartData.datasets)) {
        console.error(`Dati non validi o mancanti forniti a initChart per: ${canvasId}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px Titillium Web, sans-serif';
        ctx.fillStyle = '#dc3545';
        ctx.textAlign = 'center';
        ctx.fillText('Errore: Dati grafico non validi.', canvas.width / 2, canvas.height / 2);
        return;
    }

    try {
        // Distruggi grafico esistente se presente
        const existingChart = Chart.getChart(canvasId);
        if (existingChart instanceof Chart) {
            existingChart.destroy();
        }
        
        // Crea il nuovo grafico
        new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: chartOptions
        });
    } catch (error) {
        console.error(`Errore durante l'inizializzazione del grafico ${canvasId}:`, error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px Titillium Web, sans-serif';
        ctx.fillStyle = '#dc3545';
        ctx.textAlign = 'center';
        ctx.fillText(`Errore inizializzazione grafico.`, canvas.width / 2, canvas.height / 2);
    }
}

// ======================================================================
// FUNZIONI DOCUMENT
// ======================================================================

/**
 * Funzione per stampare il documento
 */
function printDocument() {
    window.print();
}

// ======================================================================
// EVENT LISTENERS
// ======================================================================

// Esecuzione all'avvio di ogni pagina
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus(); // Verifica sempre lo stato del login

    // Aggiungi listener al pulsante di stampa generico, se esiste
    const printBtn = document.querySelector('.print-button button');
    if (printBtn) {
        printBtn.addEventListener('click', printDocument);
    }
    
    // Aggiorna anno corrente nei footer
    const yearElements = document.querySelectorAll('[id^="currentYear"]');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
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
});
