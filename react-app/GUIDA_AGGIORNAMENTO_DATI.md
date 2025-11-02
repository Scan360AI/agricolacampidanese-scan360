# 📊 Guida all'Aggiornamento dei Dati - SCAN360

Questa guida spiega come aggiornare i dati finanziari dell'applicazione SCAN360 senza modificare il codice React.

## 🎯 Concetto Chiave

**TUTTI i dati finanziari sono centralizzati in UN SOLO file JSON:**

```
react-app/src/data/financial-data.json
```

✅ Modifichi questo file → L'app si aggiorna automaticamente
❌ NON devi modificare nessun file .jsx/.js

## 📁 Struttura del File JSON

Il file `financial-data.json` è organizzato in sezioni logiche:

```
financial-data.json
├── company          # Dati aziendali
├── years            # Anni analizzati
├── dashboard        # Dati dashboard principale
├── parte1           # Dati report Parte 1
├── parte2           # Dati report Parte 2
├── parte3           # Dati report Parte 3
├── parte4           # Dati report Parte 4
├── parte5           # Dati report Parte 5
├── parte6           # Dati report Parte 6
└── kpis             # KPI homepage
```

## 🔧 Come Aggiornare i Dati

### 1️⃣ Aggiornare Dati Aziendali

**Posizione:** `company`

**Esempio:**
```json
{
  "company": {
    "name": "AGRICOLA CAMPIDANESE",
    "fullName": "AGRICOLA CAMPIDANESE - Società Cooperativa",
    "sector": "Agricoltura e Trasformazione Prodotti Agricoli",
    "type": "Società Cooperativa",
    "fiscalCode": "IT01234567890",
    "address": "Via Example, 123 - 09100 Cagliari (CA)",
    "phone": "+39 070 123456",
    "email": "info@agricolacampidanese.it"
  }
}
```

**Cosa puoi modificare:**
- Ragione sociale
- Indirizzo, telefono, email
- Partita IVA
- Settore di attività

### 2️⃣ Aggiornare KPI Homepage

**Posizione:** `kpis.dashboard`

**Esempio:**
```json
{
  "kpis": {
    "dashboard": [
      {
        "id": "ricavi",
        "title": "Ricavi Totali 2024",
        "value": "€21.2M",           // ← VALORE DA MOSTRARE
        "trend": "up",                // ← "up", "down", "neutral"
        "trendValue": "+2.9%",        // ← VARIAZIONE %
        "description": "Crescita modesta dei ricavi rispetto all'anno precedente",
        "link": "/report/parte2-economico",
        "icon": "fa-chart-line"       // ← Icona FontAwesome
      }
    ]
  }
}
```

**Campi modificabili:**
- `value`: Il valore da mostrare (es. "€25.5M", "1,234", "45%")
- `trend`: Direzione ("up", "down", "neutral")
- `trendValue`: Variazione rispetto al periodo precedente
- `description`: Descrizione del KPI
- `title`: Titolo del KPI

### 3️⃣ Aggiornare Dati Dashboard

**Posizione:** `dashboard`

**Esempio - Ricavi ed EBITDA:**
```json
{
  "dashboard": {
    "trendRicaviEbitda": {
      "labels": ["2022", "2023", "2024"],
      "ricavi": [null, 20621793, 21213405],
      "ebitda": [-459194, 623613, 843287],
      "ebitdaMargin": [null, 3.0, 3.98]
    }
  }
}
```

**Come modificare:**
- `ricavi`: Array con ricavi per anno (in Euro)
- `ebitda`: Array con EBITDA per anno (in Euro)
- `ebitdaMargin`: Array con margine EBITDA % per anno
- `null`: Usa `null` se il dato non è disponibile

**Esempio - PFN/EBITDA:**
```json
{
  "dashboard": {
    "trendPfnEbitda": {
      "labels": ["2022", "2023", "2024"],
      "pfnEbitda": [null, 8.92, 6.19],
      "soglia": [3.5, 3.5, 3.5]
    }
  }
}
```

- `pfnEbitda`: Rapporto PFN/EBITDA per anno
- `soglia`: Valore soglia di riferimento (costante)

### 4️⃣ Aggiornare Dati Report Parte 1

**Posizione:** `parte1`

**Metriche Principali:**
```json
{
  "parte1": {
    "mainMetrics": {
      "labels": ["2022", "2023", "2024"],
      "ricavi": [20452000, 20622000, 21213000],
      "ebitda": [-459000, 624000, 843000],
      "patrimonioNetto": [680000, 698000, 698000]
    }
  }
}
```

**Attivo e Passivo Corrente:**
```json
{
  "parte1": {
    "currentAssetsLiabilities": {
      "labels": ["2023", "2024"],
      "attivoCorrente": [8033878, 5851602],
      "passivoCorrente": [10719370, 10689441],
      "capitaleCircolanteNetto": [-2685492, -4837839]
    }
  }
}
```

### 5️⃣ Aggiornare Dati Report Parte 2 (Economico)

**Posizione:** `parte2`

**Marginalità:**
```json
{
  "parte2": {
    "marginality": {
      "labels": ["2022", "2023", "2024"],
      "valoreAggiunto": [null, 22.0, 24.2],
      "margineContribuzione": [null, 12.0, 12.7],
      "ebitdaPercent": [null, 3.0, 4.0],
      "ebitPercent": [null, 0.9, 1.95]
    }
  }
}
```

**Indici di Redditività:**
```json
{
  "parte2": {
    "profitabilityIndices": {
      "labels": ["2022", "2023", "2024"],
      "roe": [5.56, 2.82, 0.26],
      "roi": [null, 1.32, 6.99],
      "ros": [null, 0.9, 1.95]
    }
  }
}
```

**Leverage:**
```json
{
  "parte2": {
    "leverage": {
      "labels": ["2023", "2024"],
      "roi": [1.32, 6.99],
      "roe": [2.82, 0.26],
      "costoDebito": [null, 7.97]
    }
  }
}
```

### 6️⃣ Aggiornare Dati Report Parte 3 (Patrimoniale)

**Posizione:** `parte3`

**Composizione Attivo:**
```json
{
  "parte3": {
    "assets": {
      "labels": [
        "Immob. Materiali",
        "Immob. Finanziarie",
        "Immob. Immateriali",
        "Magazzino",
        "Crediti Comm.",
        "Liquidità"
      ],
      "values": [4989493, 372971, 186412, 872688, 2738671, 17094]
    }
  }
}
```

**Composizione Passivo:**
```json
{
  "parte3": {
    "liabilities": {
      "labels": [
        "Patrimonio Netto",
        "Debiti Fin. MLT",
        "Debiti Fin. BT",
        "Debiti Comm.",
        "Altri Debiti"
      ],
      "values": [697950, 0, 5238348, 3908102, 1542992]
    }
  }
}
```

**Trend PFN:**
```json
{
  "parte3": {
    "pfnTrend": {
      "labels": ["2022", "2023", "2024"],
      "debitiFinanziariTotali": [6682048, 5845199, 5238348],
      "liquidita": [568187, 282044, 17094],
      "pfn": [6113861, 5563155, 5221254]
    }
  }
}
```

### 7️⃣ Aggiornare Dati Report Parte 4 (Bancabilità)

**Posizione:** `parte4`

**Sostenibilità Debito:**
```json
{
  "parte4": {
    "debtSustainability": {
      "labels": [
        "PFN/EBITDA (inv)",
        "D/E (inv)",
        "DSCR",
        "Oneri Fin./Ricavi (inv)",
        "Cash Flow Op./Ricavi",
        "Leanus Score"
      ],
      "agricolaCampidanese": [16, 13, 56, 48, 40, 2],
      "target": [33, 50, 100, 67, 50, 75]
    }
  }
}
```

### 8️⃣ Aggiornare Dati Report Parte 5 (Circolante)

**Posizione:** `parte5`

**Ciclo Capitale Circolante:**
```json
{
  "parte5": {
    "workingCapitalCycle": {
      "labels": [
        "Crediti Clienti (DSO)",
        "Magazzino (DIO)",
        "Debiti Fornitori (DPO)",
        "Ciclo Circolante"
      ],
      "agricolaCampidanese": [47, 20, 75, -8],
      "benchmark": [75, 45, 90, 30]
    }
  }
}
```

**Cash Flow Waterfall:**
```json
{
  "parte5": {
    "cashFlowWaterfall": {
      "labels": [
        "EBITDA",
        "Imposte",
        "+Δ Circ.",
        "=CF Op.",
        "-Invest.",
        "=FCF",
        "+Δ Debt",
        "-Divid.",
        "=Δ Cassa"
      ],
      "values": [843287, 0, 440239, 423899, -80407, 343492, -606851, -1591, -264950]
    }
  }
}
```

### 9️⃣ Aggiornare Dati Report Parte 6 (Rischi)

**Posizione:** `parte6`

**Z-Score:**
```json
{
  "parte6": {
    "zscore": {
      "labels": ["2022", "2023", "2024"],
      "zscore": [null, null, 2.90],
      "sogliaSicurezza": [2.99, 2.99, 2.99],
      "sogliaRischio": [1.81, 1.81, 1.81]
    }
  }
}
```

**Analisi Sensitività:**
```json
{
  "parte6": {
    "sensitivity": {
      "labels": [
        "Ricavi",
        "Costi Fissi",
        "Crediti Clienti (gg)",
        "Debiti Fornitori (gg)"
      ],
      "variazioneCritica": [-1.95, 23.5, 1, -30]
    }
  }
}
```

## 💡 Consigli Pratici

### ✅ Best Practices

1. **Usa un editor con syntax highlighting JSON** (VS Code, Sublime Text)
2. **Valida il JSON** prima di salvare (usa jsonlint.com)
3. **Fai backup** del file prima di modifiche importanti
4. **Testa in sviluppo** prima di deployare
5. **Mantieni la struttura** esistente (non rimuovere campi)

### ⚠️ Errori Comuni

**Virgola finale:**
```json
// ❌ SBAGLIATO
{
  "value": 123,
  "name": "test",  // ← Virgola finale
}

// ✅ CORRETTO
{
  "value": 123,
  "name": "test"
}
```

**Virgolette doppie:**
```json
// ❌ SBAGLIATO
{
  'name': 'test'
}

// ✅ CORRETTO
{
  "name": "test"
}
```

**Numeri senza virgolette:**
```json
// ❌ SBAGLIATO
{
  "ricavi": "21213405"
}

// ✅ CORRETTO
{
  "ricavi": 21213405
}
```

**Null per dati mancanti:**
```json
// ❌ SBAGLIATO
{
  "ricavi": ["", 20621793, 21213405]
}

// ✅ CORRETTO
{
  "ricavi": [null, 20621793, 21213405]
}
```

## 🔍 Validazione JSON

### Online
- https://jsonlint.com
- https://jsonformatter.org

### VS Code
Installa l'estensione "JSON Tools" per validazione automatica

### Command Line
```bash
# Valida il file JSON
cat financial-data.json | jq .
```

## 🚀 Workflow di Aggiornamento

1. **Apri** `src/data/financial-data.json`
2. **Modifica** i valori desiderati
3. **Valida** il JSON (online o con editor)
4. **Salva** il file
5. **Testa** l'app in sviluppo (`npm run dev`)
6. **Verifica** che i dati siano aggiornati correttamente
7. **Committa** le modifiche (se usi git)
8. **Deploya** in produzione

## 📅 Aggiornamento Periodico Consigliato

### Mensile
- Aggiornare liquidità e CCN
- Aggiornare esposizioni bancarie
- Verificare KPI dashboard

### Trimestrale
- Aggiornare tutti i KPI
- Aggiornare grafici trend
- Rivedere analisi SWOT

### Annuale
- Aggiornare bilancio completo
- Aggiornare tutti i report
- Ricalcolare rating IRP
- Aggiornare benchmark di settore

## 🆘 Aiuto e Supporto

### Problemi Comuni

**L'app non si aggiorna dopo la modifica:**
- Controlla la console per errori JSON
- Riavvia il server di sviluppo (`npm run dev`)
- Pulisci la cache del browser (Ctrl+Shift+R)

**Errore "Unexpected token":**
- JSON non valido
- Usa jsonlint.com per trovare l'errore

**Grafici non visualizzati:**
- Verifica che gli array abbiano la stessa lunghezza di `labels`
- Controlla che i valori siano numeri (non stringhe)

### Contatti
- Email: info@kitzanoslab.com
- Documentazione: README.md

---

**Ultima modifica:** 2024
**Versione:** 2.0
