# SCAN360 - Strategic Corporate Analysis Navigator

Sistema di analisi strategica aziendale per **AGRICOLA CAMPIDANESE**, completamente riscritto in React con architettura moderna e dati separati.

## 🚀 Caratteristiche Principali

### Tecnologie Moderne
- **React 18.3** - Framework UI moderno e performante
- **Vite 5** - Build tool ultra-veloce (HMR istantaneo)
- **React Router 6** - Navigazione client-side fluida
- **Chart.js 4** + **react-chartjs-2** - Visualizzazioni dati interattive
- **Zustand** - State management leggero e performante

### Architettura
- **Separazione dati/codice**: Tutti i dati finanziari in file JSON facilmente aggiornabili
- **Component-based**: Componenti React riutilizzabili e manutenibili
- **Responsive**: Design completamente responsive (desktop, tablet, mobile)
- **Context API**: Gestione autenticazione centralizzata

### Funzionalità
- **Dashboard Esecutiva**: Panoramica KPI e indicatori chiave
- **Dashboard Completa**: Analisi dettagliata con grafici interattivi
- **Report Analitici**: 6 sezioni di analisi approfondita
- **Centrale Rischi**: Monitoraggio esposizioni bancarie
- **Monitor CDA**: Gestione Consiglio di Amministrazione
- **Bilancio Plus**: Analisi dettagliata bilancio
- **Sistema IRP**: Rating creditizio proprietario

## 📦 Installazione

```bash
cd react-app

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build di produzione
npm run preview
```

## 🔑 Accesso

**Credenziali Demo:**
- Username: `AdminAgricola`
- Password: `Campidanese2025`

Oppure:
- Username: `admin`
- Password: `admin`

## 📁 Struttura del Progetto

```
react-app/
├── public/                      # Asset statici
│   ├── favicon.png
│   ├── logo_scan.png
│   ├── logo_kitzanos.png
│   └── kitzanos_logo_scuro.png
│
├── src/
│   ├── assets/                  # Asset importati
│   │
│   ├── components/              # Componenti riutilizzabili
│   │   ├── charts/             # Componenti grafici
│   │   │   ├── BarChart.jsx
│   │   │   └── LineChart.jsx
│   │   ├── DashboardHeader.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── Footer.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── contexts/               # Context API
│   │   └── AuthContext.jsx    # Gestione autenticazione
│   │
│   ├── data/                   # 📊 DATI JSON
│   │   └── financial-data.json # TUTTI I DATI FINANZIARI
│   │
│   ├── hooks/                  # Custom hooks
│   │   └── useAuth.js
│   │
│   ├── pages/                  # Pagine applicazione
│   │   ├── reports/           # Pagine report
│   │   │   ├── Parte1Sintesi.jsx
│   │   │   ├── Parte2Economico.jsx
│   │   │   ├── Parte3Patrimoniale.jsx
│   │   │   ├── Parte4Bancabilita.jsx
│   │   │   ├── Parte5CircolanteFlussi.jsx
│   │   │   ├── Parte6RischiRaccomandazioni.jsx
│   │   │   └── IRPDettaglio.jsx
│   │   ├── BilancioPlusPage.jsx
│   │   ├── CentraleRischiPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   └── MonitorCDAPage.jsx
│   │
│   ├── styles/                 # Stili globali
│   │   └── index.css          # CSS unificato (mantiene lo stile originale)
│   │
│   ├── utils/                  # Utility functions
│   │
│   ├── App.jsx                 # Componente root + routing
│   └── main.jsx               # Entry point
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📊 Aggiornamento Dati

### File JSON Principale
Tutti i dati finanziari sono centralizzati in:

```
src/data/financial-data.json
```

### Struttura Dati JSON

Il file è organizzato in sezioni logiche:

```json
{
  "company": {
    "name": "...",
    "fullName": "...",
    "sector": "...",
    ...
  },

  "dashboard": {
    "trendRicaviEbitda": {...},
    "trendPfnEbitda": {...}
  },

  "parte1": {
    "mainMetrics": {...},
    "currentAssetsLiabilities": {...}
  },

  "parte2": {
    "marginality": {...},
    "profitabilityIndices": {...},
    "leverage": {...},
    "benchmarkRadar": {...}
  },

  "parte3": { ... },
  "parte4": { ... },
  "parte5": { ... },
  "parte6": { ... },

  "kpis": {
    "dashboard": [...]
  }
}
```

### Come Aggiornare i Dati

1. **Aprire il file JSON:**
   ```bash
   src/data/financial-data.json
   ```

2. **Modificare i valori desiderati:**
   ```json
   "ricavi": [20452000, 20622000, 21213000]
   ```

3. **Salvare il file** - L'app si aggiornerà automaticamente in dev mode

4. **Non è necessario modificare il codice React!**

### Esempi di Aggiornamento

**Aggiornare i ricavi 2024:**
```json
"dashboard": {
  "trendRicaviEbitda": {
    "ricavi": [null, 20621793, 22000000]  // ← Cambia qui
  }
}
```

**Aggiornare KPI della homepage:**
```json
"kpis": {
  "dashboard": [
    {
      "id": "ricavi",
      "title": "Ricavi Totali 2024",
      "value": "€22.0M",  // ← Cambia qui
      "trend": "up",
      "trendValue": "+6.7%"  // ← E qui
    }
  ]
}
```

**Aggiornare dati aziendali:**
```json
"company": {
  "name": "AGRICOLA CAMPIDANESE",
  "address": "Via Nuova, 456 - 09100 Cagliari",  // ← Cambia qui
  "phone": "+39 070 999888",  // ← E qui
  "email": "info@nuova-email.it"
}
```

## 🎨 Personalizzazione Stile

Lo stile è mantenuto identico all'originale tramite CSS variables:

```css
/* src/styles/index.css */

:root {
  --primary: #191970;    /* Midnight Blue */
  --secondary: #4a69bd;  /* Blu accenti */
  --success: #4CAF50;    /* Verde */
  --warning: #FFC107;    /* Giallo/Arancio */
  --danger: #F44336;     /* Rosso */
  ...
}
```

Per cambiare i colori, modifica le variabili CSS.

## 📱 Responsive Design

L'applicazione è completamente responsive:

- **Desktop** (> 992px): Layout con sidebar fissa
- **Tablet** (768px - 991px): Sidebar collassabile
- **Mobile** (< 768px): Sidebar nascosta, layout mobile-first

## 🔐 Autenticazione

L'autenticazione usa `Context API` e `localStorage`:

- Sessione persistente
- Protezione route automatica
- Logout sicuro

**⚠️ IMPORTANTE:** L'autenticazione attuale è solo per demo. Per produzione, implementare:
- Backend API con JWT
- Hash password
- Sessioni server-side
- HTTPS obbligatorio

## 🚀 Deploy

### Build di Produzione

```bash
npm run build
```

Genera la cartella `dist/` con i file ottimizzati.

### Deploy su Hosting Statico

**Netlify / Vercel:**
1. Connetti il repository
2. Build command: `npm run build`
3. Publish directory: `dist`

**Server Apache/Nginx:**
1. Copia il contenuto di `dist/` sul server
2. Configura rewrite per SPA (redirect a index.html)

### Configurazione SPA

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 📈 Performance

- **Vite HMR**: Aggiornamento istantaneo in sviluppo
- **Code splitting**: Caricamento ottimizzato
- **Tree shaking**: Bundle minimizzato
- **Lazy loading**: Componenti caricati on-demand (possibile espansione futura)

## 🧪 Testing (Future)

```bash
# Unit tests (da configurare)
npm run test

# E2E tests (da configurare)
npm run test:e2e
```

## 📝 Scripts Disponibili

```bash
npm run dev        # Sviluppo (port 3000)
npm run build      # Build produzione
npm run preview    # Preview build locale
npm run lint       # Linting codice
```

## 🛠️ Estensioni Consigliate VS Code

- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag

## 📖 Documentazione Tecnica

### Gestione Grafici

I grafici usano **Chart.js 4** tramite **react-chartjs-2**:

```jsx
import LineChart from '../components/charts/LineChart'

<LineChart
  data={chartData}
  options={chartOptions}
/>
```

### Routing

Usa **React Router 6** con protezione route:

```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### State Management

- **AuthContext**: Gestione autenticazione
- **Local State**: useState per stati componente
- **Zustand**: Pronto per state globale complesso (già installato)

## 🐛 Troubleshooting

**Errore "Module not found":**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Hot reload non funziona:**
```bash
# Riavvia il server
npm run dev
```

**Errori di build:**
```bash
# Pulisci e rebuilda
rm -rf dist
npm run build
```

## 🔄 Migrazione da Versione Precedente

### Differenze Principali

| Aspetto | Vecchia Versione | Nuova Versione React |
|---------|------------------|---------------------|
| Build | Nessuno | Vite |
| Routing | HTML multipli | React Router SPA |
| Dati | Hardcoded JS | JSON separati |
| Stile | CSS statico | CSS + React components |
| Grafici | Chart.js vanilla | react-chartjs-2 |
| Auth | JS inline | Context API |

### Vantaggi della Nuova Versione

✅ **Performance**: Vite è 10-100x più veloce di Webpack
✅ **Manutenibilità**: Componenti riutilizzabili
✅ **Scalabilità**: Architettura modulare
✅ **Aggiornamenti**: Dati JSON modificabili senza toccare codice
✅ **DX**: Developer experience superiore
✅ **Modern**: Stack tecnologico 2024

## 📞 Supporto

Per supporto o domande:
- Email: info@kitzanoslab.com
- Documentazione: Questo README

## 📄 Licenza

© 2024 Kitzanos Lab - SCAN360

---

**Powered by React + Vite + Chart.js**
