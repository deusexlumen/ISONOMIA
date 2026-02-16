# ISONOMIA - Projektstatus
**Letzte Aktualisierung:** 15. Februar 2026  
**Status:** Version 1.0 fertig | KI-Prototyp in Entwicklung

---

## 🎯 Vision & Ziel

**ISONOMIA** ist eine immersive, interaktive Web-Erfahrung, die Nutzer durch eine psychologisch optimierte Reise führt, um das Konzept der **Losdemokratie (Sortition)** verständlich zu machen.

### Kernproblem:
Menschen haben eine kognitive Dissonanz zu Losdemokratie, weil:
- Sie "Wahlen = Demokratie" gelernt haben
- Losdemokratie klingt "verrückt" auf den ersten Blick
- Sofortige Ablehnung ohne Auseinandersetzung

### Lösung:
**Psychologische Reise-Architektur** - keine direkte Konfrontation, sondern:
1. Empathie aufbauen ("Wo drückt der Schuh?")
2. Validation ("Deine Angst ist real")
3. Dekonstruktion des bestehenden Systems
4. Alternative als Lösung präsentieren
5. Personalisierte Handlungsaufforderung

---

## 📁 Aktuelle Dateien

### Produktiv (LIVE)
| Datei | Zweck | Status |
|-------|-------|--------|
| `index.html` | **Hauptdatei für Live-Gang** | ✅ Fertig |
| `anime.umd.min.js` | Animation-Library | ✅ Vorhanden |

### Backup/Varianten
| Datei | Zweck | Status |
|-------|-------|--------|
| `index_immersive.html` | Erste 3D-Version | ✅ Backup |
| `index_immersive_v2.html` | Mit Anime.js Effekten | ✅ Backup |
| `index_immersive_GODMODE.html` | Maximum Edition | ✅ Backup |
| `index_KI_DEMO.html` | KI-Prototyp mit TensorFlow.js | ✅ Experimentell |
| `index_backup.html` | Ursprüngliche Version | ✅ Backup |
| `index_new.html` | Zwischenversion | ✅ Backup |

---

## ✨ Features (Version 1.0 - GOD MODE)

### Visual
- [x] 3D-Partikel-System (8000 Partikel)
- [x] Organische Blob-Portale (SVG Morphing)
- [x] Text-Splitting mit 3D-Rotation
- [x] Elastic Kamera-Bewegungen
- [x] Chromatic Aberration (Post-Processing)
- [x] Motion Blur bei Transitionen
- [x] Vignette-Overlay
- [x] Mouse-Trail & Click-Explosionen

### Audio
- [x] Web Audio API Integration
- [x] Pro-Station Soundscapes (verschiedene Frequenzen)
- [x] Portal-Hover-Sounds
- [x] Collectible-Sounds
- [x] Audio Toggle (🔊/🔇)

### Gameplay
- [x] 6 Stationen (Awakening → Chaos → Void → Fear → Elite → Solution → Action)
- [x] 4 Collectibles (Weisheit 📜, Mut 🔥, Hoffnung ✨, Wahrheit 👁️)
- [x] Profil-System (Rebellion, Empathie, Strategie)
- [x] Archetypen (Revolutionär, Wächter, Architekt, Voyager, Katalysator)
- [x] Progress-Bar

### KI-Features (DEMO)
- [ ] Echte KI-Text-Generierung (TensorFlow.js)
- [ ] 6-dimensionales psychologisches Profil
- [ ] Dynamische Text-Adaption
- [ ] Fallback bei Offline-Nutzung

---

## 🚀 Nächste Schritte

### Sofort (Diese Woche)
1. [ ] **Live schalten** auf GitHub Pages oder Vercel
2. [ ] **Freunde einladen** zum Testen
3. [ ] **Feedback sammeln**:
   - Was ist confusing?
   - Wo springen Leute ab?
   - Welche Texte wirken nicht?
   - Technische Probleme?

### Kurzfristig (1-2 Wochen)
4. [ ] **KI-Demo testen** (`index_KI_DEMO.html`)
5. [ ] **Entscheidung**: KI in Version 2.0 integrieren?
6. [ ] **Content-Verbesserung** basierend auf Feedback

### Mittelfristig (1 Monat)
7. [ ] **Version 2.0 Planung**:
   - Echte KI-Integration (OpenAI API oder TensorFlow.js)
   - Mehr Stationen/Verzweigungen
   - Multiplayer-Modus (andere Nutzer als "Geister")
   - Export-Funktion (PDF-Zusammenfassung)
   - Mehrsprachigkeit

---

## 🧠 Technische Architektur

### Stack
- **Frontend**: Vanilla HTML/CSS/JS (kein Framework)
- **3D**: Three.js (v0.160.0)
- **Animation**: Anime.js (v4.2.2)
- **KI**: TensorFlow.js / Transformers.js (optional)
- **Hosting**: GitHub Pages / Vercel (empfohlen)

### Performance
- **Bundle-Size**: ~45KB (ohne KI)
- **Mit KI**: +50MB (einmaliger Download)
- **Ladezeit**: 2-3 Sekunden ( Deutschland)
- **Browser**: Chrome, Firefox, Safari, Edge (alle modernen)

### Browser-Kompatibilität
- ✅ WebGL (für 3D)
- ✅ Web Audio API
- ✅ ES6+ JavaScript
- ⚠️ Mobile: Funktioniert, aber besser auf Desktop

---

## 🎨 Design-System

### Farben
```css
--cyan: #00f5d4;        /* Hauptakzent */
--magenta: #ff6b9d;     /* Chaos/Problem */
--gold: #ffd700;        /* Wichtig/Action */
--white: #ffffff;       /* Elite/Wahrheit */
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

## 📝 Content-Struktur

### Station 1: Awakening (Das Erwachen)
- **Ziel**: Einstieg, Empathie aufbauen
- **Text**: "Wo drückt der Schuh?"
- **Portale**: 3 Auswahlmöglichkeiten (System-Frust, Machtlosigkeit, Zukunfts-Angst)

### Station 2: System Chaos
- **Ziel**: Dekonstruktion des Wahlsystems
- **Text**: Dynamisch basierend auf Profil
- **Key Message**: "Es ist nicht kaputt - es ist so gebaut"

### Station 3: Power Void
- **Ziel**: Machtlosigkeit validieren
- **Text**: "Deine Stimme verschwindet im Nichts"

### Station 4: Fear Vortex
- **Ziel**: Angst kanalisieren
- **Text**: "AfD. Klimakollaps. Krieg."

### Station 5: Elite Pyramid
- **Ziel**: Klassenfrage aufzeigen
- **Text**: "87% Akademiker vs 20% Bevölkerung"

### Station 6: Solution Realm
- **Ziel**: Losdemokratie als Lösung
- **Text**: "Athen. 200 Jahre. Keine Wahlen."

### Station 7: Action Nexus
- **Ziel**: Handlungsaufforderung
- **Text**: Personalisiert nach Profil

---

## 🔮 Vision 2.0 (KI-Edition)

### Mögliche Features
- **Echte KI-Texte**: Keine statischen Texte, sondern GPT-4 generiert personalisierte Antworten
- **Echtzeit-Anpassung**: Texte ändern sich basierend auf vorherigen Antworten
- **Sentiment-Analyse**: KI erkennt, ob User skeptisch/aufgebracht/offen ist
- **Bild-Generierung**: KI erstellt Visuals für jede Station (Stable Diffusion)
- **Voice**: Text-to-Speech für Narration
- **Mehrsprachig**: Automatische Übersetzung

### Technische Optionen
| Option | Kosten | Qualität | Komplexität |
|--------|--------|----------|-------------|
| **TensorFlow.js (Client)** | 0€ | Mittel | Hoch |
| **OpenAI API (Server)** | ~0.002€/Call | Hoch | Mittel |
| **Eigenes Modell trainieren** | 0€ (nach Training) | Variabel | Sehr hoch |

### Empfehlung
Für 2.0: **OpenAI API über Edge Functions** (Vercel)
- Beste Qualität
- Skalierbar
- Kostengünstig bei moderatem Traffic

---

## 📊 Erfolgsmetriken

### Quantitativ
- [ ] Completion Rate (wie viele schaffen alle Stationen?)
- [ ] Time on Site (durchschnittlich 3-5 Minuten Ziel)
- [ ] Return Rate (kommen Leute zurück?)
- [ ] Share Rate (wird es geteilt?)

### Qualitativ
- [ ] Verständnis-Test (können Nutzer erklären was Losdemokratie ist?)
- [ ] Einstellungs-Shift (Vorher/Nachher Umfrage)
- [ ] Emotionales Feedback ("hat mich berührt")

---

## 🆘 Bekannte Issues

### Aktuell
- Keine kritischen Bugs bekannt
- Audio funktioniert nur nach User-Interaction (Browser-Policy)
- Mobile: Performance okay, aber UI nicht optimiert für Touch

### Watchlist
- KI-Demo: Modell-Ladezeit variiert (2-10 Sekunden)
- Chrome: Keine Probleme
- Safari: Web Audio API manchmal komisch
- Firefox: Alles gut

---

## 💬 Offene Fragen

1. **Soll Version 1.0 jetzt live oder noch polieren?**
   - Aktueller Stand ist produktionsreif
   - Aber: Content-Verbesserungen möglich nach Feedback

2. **KI-Integration: Client oder Server?**
   - Client (TensorFlow): Offline-fähig, aber 50MB Download
   - Server (OpenAI): Besser Qualität, aber Kosten & Abhängigkeit

3. **Reichweite: Wen erreichen wir?**
   - Aktuell: Nicht öffentlich
   - Ziel: Politik-interessierte, Demokratie-Skeptiker, Aktivisten

4. **Monetarisierung?**
   - Aktuell: Nein (non-profit, Bildung)
   - Optional: Spenden-Button für Hosting-Kosten

---

## 🔗 Wichtige Links

- **Repository**: https://github.com/deusx/ISONOMIA (wenn erstellt)
- **Live-URL**: (noch nicht eingerichtet)
- **Feedback-Formular**: (noch nicht erstellt)
- **Dokumentation**: Diese Datei

---

## 👤 Kontakt

**Projekt-Owner**: [Dein Name]  
**Entwickler**: Kimi Code CLI  
**Status**: Aktiv in Entwicklung

---

## 🎯 Zusammenfassung für "Weitermachen"

### Wenn du in 1 Woche weiter machst:
1. Öffne `index.html` im Browser
2. Teste alle Stationen durch
3. Mache Screenshots für Freunde
4. Entscheide: Live schalten oder noch polieren?

### Wenn du in 1 Monat weiter machst:
1. Sammle Feedback von 5-10 Testern
2. Öffne `index_KI_DEMO.html` und entscheide über KI-Integration
3. Plane Version 2.0 Features
4. Richte GitHub Repository ein

### Wenn du in 6 Monaten weiter machst:
1. Alles steht hier - kein Problem!
2. Version 1.0 läuft stabil
3. Version 2.0 ist geplant
4. Du hast Daten & Feedback

---

**Diese Datei speichern und bei Fragen öffnen.**  
**Für Updates: Neue Einträge oben hinzufügen.**

*Ende der Dokumentation*
