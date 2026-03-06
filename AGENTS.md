# ISONOMIA - Agent Documentation

## Project Overview

**ISONOMIA** ("Projekt Kronos") ist eine immersive, interaktive deutsche Web-Erfahrung, die Nutzer durch eine psychologisch optimierte Reise führt, um das Konzept der **Losdemokratie (Sortition)** verständlich zu machen. Die Anwendung übersetzt Gewaltfreie Kommunikation (GfK) in eine algorithmische State-Machine und nutzt visuelle Entitäten (Partikel) als mathematische Metaphern für demokratische Konzepte.

**Repository**: https://github.com/deusexlumen/ISONOMIA

### Kernproblem & Lösung

Das Projekt adressiert die kognitive Dissonanz zu Losdemokratie:
- Menschen haben gelernt "Wahlen = Demokratie"
- Losdemokratie klingt auf den ersten Blick "verrückt"
- Sofortige Ablehnung ohne Auseinandersetzung

Die Lösung ist eine **psychologische Reise-Architektur**:
1. Empathie aufbauen ("Wo drückt der Schuh?")
2. Validation ("Deine Angst ist real")
3. Dekonstruktion des bestehenden Systems
4. Alternative als Lösung präsentieren
5. Personalisierte Handlungsaufforderung

---

## Technology Stack

| Component | Technology | Version | Notes |
|-----------|------------|---------|-------|
| Core | HTML5, CSS3, Vanilla JavaScript | ES2015+ | Single-file architecture |
| 3D Engine | Three.js | v0.160.0 | Loaded from CDN (unpkg.com) |
| Animation | Anime.js | v4.2.2 | UMD bundle (local file) |
| Fonts | Google Fonts | - | Cinzel (display), Inter (body) |
| Build System | None | - | No bundler, no build step |
| Package Manager | None | - | Direct file inclusion |
| Language | German | - | All UI text in German |

### Anime.js Distribution Files

| File | Format | Size | Use Case |
|------|--------|------|----------|
| `anime.esm.js` | ES Module (unminified) | 316 KB | Development |
| `anime.esm.min.js` | ES Module (minified) | 89 KB | Production ESM |
| `anime.umd.js` | UMD (unminified) | 333 KB | Development |
| `anime.umd.min.js` | UMD (minified) | 89 KB | **Production, currently used** |

---

## Project Structure

```
ISONOMIA/
├── index.html                    # Hauptdatei - GOD MODE EDITION (~1,223 lines)
├── anime.umd.min.js              # Anime.js Animation Library (production)
├── anime.esm.js                  # Anime.js ES Module (development)
├── anime.esm.min.js              # Anime.js ES Module minified
├── anime.umd.js                  # Anime.js UMD (development)
├── README.md                     # Kurzbeschreibung (Deutsch)
├── AGENTS.md                     # Diese Datei
├── PROJECT_STATUS.md             # Detaillierter Projektstatus
├── index_immersive.html          # Backup: Erste 3D-Version
├── index_immersive_v2.html       # Backup: Mit Anime.js Effekten
├── index_immersive_GODMODE.html  # Backup: Maximum Edition
├── index_immersive_MAXIMUM.html  # Backup: Weitere Variante
├── index_KI_DEMO.html            # Experimentell: KI-Prototyp
├── index_backup.html             # Backup: Ursprüngliche Version
├── index_new.html                # Backup: Zwischenversion
├── isonomia_*.png                # Screenshots/Test-Bilder
├── audit_*.png                   # Audit Screenshots
├── immersive_*.png               # Immersive Version Screenshots
├── new_*.png                     # Neue Version Screenshots
├── test_*.png                    # Test Screenshots
├── AUDIT*.md                     # Audit Dokumentationen
├── 3D_*.md                       # 3D-Migrations-Analysen
├── DECISION_TREE_*.md            # Entscheidungsbaum-Analysen
├── FINAL_*.md                    # Finale Audit-Berichte
├── .git/                         # Git Repository
├── assets/                       # Leer (für zukünftige Assets)
├── docs/                         # Leer (für zukünftige Dokumentation)
└── src/                          # Leer (für zukünftige Source-Dateien)
```

---

## Architecture

### Single-File Application

Die gesamte Anwendung befindet sich in **einer einzigen Datei** (`index.html`):
- **HTML**: ~50 lines
- **CSS**: ~400 lines (im `<style>` Block)
- **JavaScript**: ~770 lines (im `<script>` Block)

**HTML Struktur:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <!-- Meta, Fonts, inline CSS -->
</head>
<body>
    <!-- Loading Screen -->
    <div id="loading">...</div>
    
    <!-- UI Controls -->
    <button id="audio-toggle">...</button>
    <div id="collectibles-container">...</div>
    <div id="profile-panel">...</div>
    
    <!-- Post-Processing Overlays -->
    <div id="vignette"></div>
    <div id="motion-blur"></div>
    <canvas id="chromatic-canvas"></canvas>
    
    <!-- 3D Canvas -->
    <div id="canvas-container"></div>
    
    <!-- UI Layer -->
    <div id="ui-layer"></div>
    
    <!-- Progress -->
    <div id="progress-container">...</div>
    
    <!-- Scripts -->
    <script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
    <script src="anime.umd.min.js"></script>
    <script>
        // Application Logic
    </script>
</body>
</html>
```

### JavaScript Architektur

**Hauptobjekt: `Journey`**

| Eigenschaft | Zweck |
|-------------|-------|
| `scene` | Three.js Szene |
| `camera` | Three.js Kamera |
| `renderer` | Three.js Renderer |
| `particleSystem` | 8000 Partikel System |
| `currentStation` | Aktuelle Station (Index) |
| `profile` | Nutzerprofil (Rebellion, Empathie, Strategie) |
| `collected` | Gesammelte Items (Set) |
| `stationData[]` | Array aller 7 Stationen |
| `textVariations` | Dynamische Text-Varianten pro Station |
| `archetypes[]` | Archetypen-Definitionen |

**Stationen (Station Data):**

| Index | ID | Name | Zweck |
|-------|-----|------|-------|
| 0 | `awakening` | Das Erwachen | Einstieg, Empathie aufbauen |
| 1 | `system_chaos` | Das Chaos | Dekonstruktion Wahlsystem |
| 2 | `power_void` | Die Leere | Machtlosigkeit validieren |
| 3 | `fear_vortex` | Der Strudel | Angst kanalisieren |
| 4 | `elite_pyramid` | Die Pyramide | Klassenfrage aufzeigen |
| 5 | `solution_realm` | Das Reich des Loses | Losdemokratie als Lösung |
| 6 | `action_nexus` | Der Nexus | Handlungsaufforderung |

**Station-Struktur:**
```javascript
{
    id: 'station_id',
    position: { x, y, z },        // 3D Kamera-Position
    title: 'Anzeige-Titel',
    text: 'Anzeige-Text',         // oder 'dynamic' für KI-Text
    color: '#00f5d4',             // Akzent-Farbe
    soundFreq: 110,               // Audio-Frequenz
    collectible: 'wisdom',        // Optional: Collectible-ID
    statBoost: { rebellion: 25 }, // Profil-Stat-Boost
    portals: [                    // Navigation-Optionen
        { label: 'Text', target: 'next_id', color: '#ff6b9d', stat: 'rebellion' }
    ]
}
```

---

## Features

### Visuelle Features
- [x] 3D-Partikel-System (8000 Partikel)
- [x] Organische Blob-Portale (SVG Morphing)
- [x] Text-Splitting mit 3D-Rotation
- [x] Elastic Kamera-Bewegungen
- [x] Chromatic Aberration (Post-Processing)
- [x] Motion Blur bei Transitionen
- [x] Vignette-Overlay
- [x] Mouse-Trail & Click-Explosionen

### Audio Features
- [x] Web Audio API Integration
- [x] Pro-Station Soundscapes (verschiedene Frequenzen)
- [x] Collectible-Sounds
- [x] Audio Toggle (🔊/🔇)

### Gameplay Features
- [x] 6 Stationen mit Verzweigungen
- [x] 4 Collectibles (Weisheit 📜, Mut 🔥, Hoffnung ✨, Wahrheit 👁️)
- [x] Profil-System (Rebellion, Empathie, Strategie)
- [x] 5 Archetypen (Revolutionär, Wächter, Architekt, Voyager, Katalysator)
- [x] Progress-Bar

---

## Design System

### Farben
```css
--cyan: #00f5d4;        /* Hauptakzent - Hoffnung, Lösung */
--magenta: #ff6b9d;     /* Chaos, Problem, Konflikt */
--gold: #ffd700;        /* Wichtig, Action, Elite */
--white: #ffffff;       /* Wahrheit, Neutral */
--bg: #000000;          /* Hintergrund */
```

### Typografie
- **Überschriften**: Cinzel (Serif) - Elegant, antik
- **Fließtext**: Inter (Sans) - Modern, lesbar

### Animation-Prinzipien
- **Easing**: `easeOutElastic` für UI, `easeOutExpo` für Texte
- **Dauer**: 800-1200ms für wichtige Transitionen
- **Stagger**: 30-50ms Verzögerung zwischen Elementen

---

## Build and Development

### No Build Process

Dieses Projekt hat **keinen Build-Schritt**. Es kann direkt im Browser geöffnet werden:

```powershell
# Windows
start index.html

# Oder mit Python Server
python -m http.server 8000
```

Oder mit jedem anderen statischen Server:
```bash
# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Lokale Entwicklung

1. Öffne `index.html` direkt im Browser
2. Für CORS-Testung: Nutze einen lokalen Server
3. Keine Hot-Reload notwendig - einfach Datei speichern und Browser refresh

---

## Testing

### Kein Automatisiertes Testing

Es gibt **kein automatisiertes Testing Framework**. Manuelles Testing:

**Checkliste:**
- [ ] Alle Stationen durchklickbar
- [ ] Partikel-Animation rendert korrekt
- [ ] 3D-Modus initialisiert (WebGL verfügbar)
- [ ] Portale reagieren auf Klicks
- [ ] Transitionen sind smooth
- [ ] Mobile Ansicht funktioniert
- [ ] Audio Toggle funktioniert
- [ ] Collectibles werden gesammelt
- [ ] Profil-Panel zeigt Stats korrekt
- [ ] Progress-Bar aktualisiert sich

### Browser-Kompatibilität

| Browser | Status | Hinweis |
|---------|--------|---------|
| Chrome | ✅ Vollständig | Empfohlen |
| Firefox | ✅ Vollständig | - |
| Safari | ⚠️ Teilweise | Web Audio API manchmal komisch |
| Edge | ✅ Vollständig | - |
| Mobile | ⚠️ Funktioniert | UI nicht optimiert für Touch |

**Anforderungen:**
- WebGL (für 3D)
- Web Audio API
- ES6+ JavaScript

---

## Code Style Guidelines

### Sprache

- **Alle UI-Texte sind auf Deutsch** - muss beibehalten werden
- **Code-Kommentare**: Gemischt Deutsch (narrative Abschnitte) und Englisch (technische Abschnitte)
- **Code-Identifier** (Variablen, Funktionen): Englisch

### CSS Konventionen

- CSS-Variablen für Farben in `:root`
- Klassen-Namen: Kebab-case (`.portal-container`, `.station-title`)
- IDs: Camel-case für JS-Referenzen (`#profile-panel`, `#audio-toggle`)
- `will-change` auf animierten Elementen für Performance

### JavaScript Konventionen

- Ein globales Objekt (`Journey`) als Namespace
- Arrow Functions für Callbacks
- Template Literals für HTML-Generierung
- Event Delegation für dynamische Elemente

**Beispiel:**
```javascript
const Journey = {
    currentStation: 0,
    
    init() {
        this.createScene();
        this.setupUI();
    },
    
    travelToStation(stationId) {
        // Implementation
    }
};

Journey.init();
```

---

## Deployment

### Erforderliche Dateien

Für Deployment werden nur diese Dateien benötigt:
- `index.html`
- `anime.umd.min.js`
- Three.js wird von CDN geladen

### Hosting-Optionen

1. **GitHub Pages** (empfohlen):
   ```bash
   git push origin main
   # Aktiviere GitHub Pages in Repository Settings
   ```

2. **Vercel**:
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Netlify**: Drag & Drop der Dateien

4. **Jeder andere statische Host**

---

## Security Considerations

- Keine serverseitige Verarbeitung (nur statische Dateien)
- Keine Benutzereingaben außer internem State-Tracking
- Keine Cookies
- XSS-Schutz durch `textContent` statt `innerHTML` für dynamische Inhalte
- Daten werden nicht persistiert (nur Session-State)
- Inline Scripts/Styles (CSP würde Modifikationen erfordern)

### Bekannte Einschränkungen

- Audio funktioniert erst nach User-Interaction (Browser-Policy)
- Keine Subresource Integrity (SRI) für Three.js CDN
- Mobile UI nicht optimiert

---

## Z-Index Layer

| Layer | Element | z-index |
|-------|---------|---------|
| 0 | Three.js Canvas | 1 |
| 1 | Chromatic Canvas | 2 |
| 2 | Vignette | 3 |
| 3 | Motion Blur | 4 |
| 10 | UI Layer | 10 |
| 20 | Profile Panel, Collectibles, Audio Toggle | 20 |
| 100 | Loading Screen | 1000 |

---

## Git History

```
12e3249 Genesis Protocol
9004bd0 update
5998c6e Update title and narrative text in index.html
18eb4e6 Refactor CSS and update narrative text in index.html
983cfba Add files via upload
13a2755 Add initial HTML structure and styles for ISONOMIA
918eaa7 Initial commit
```

---

## Ressourcen

- **Repository**: https://github.com/deusexlumen/ISONOMIA
- **Three.js Docs**: https://threejs.org/docs/
- **Anime.js Docs**: https://animejs.com/documentation/
- **Projekt Name**: ISONOMIA (ἰσονομία) - Antikes griechisches Konzept politischer Gleichheit

---

## Versionen & Varianten

| Datei | Beschreibung | Status |
|-------|--------------|--------|
| `index.html` | **AKTUELL - GOD MODE EDITION** | ✅ Produktiv |
| `index_immersive.html` | Erste 3D-Version | 📦 Backup |
| `index_immersive_v2.html` | Mit Anime.js Effekten | 📦 Backup |
| `index_immersive_GODMODE.html` | Maximum Edition | 📦 Backup |
| `index_immersive_MAXIMUM.html` | Weitere Variante | 📦 Backup |
| `index_KI_DEMO.html` | KI-Prototyp mit TensorFlow.js | 🧪 Experimentell |
| `index_backup.html` | Ursprüngliche Version | 📦 Backup |
| `index_new.html` | Zwischenversion | 📦 Backup |

---

*Dokumentation basiert auf Commit 12e3249*  
*Letzte Aktualisierung: März 2026*
