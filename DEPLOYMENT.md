# 🚀 ISONOMIA Deployment Guide

## Schnellstart (5 Minuten)

### 1. Domain anpassen

Ersetze `https://deine-domain.de` in folgenden Dateien:

- `index_psychological_judo.html` (Meta Tags)
- `robots.txt`
- `sitemap.xml`
- `manifest.json`

### 2. Icons generieren

**Option A: Mit Node.js (empfohlen)**
```bash
npm install sharp
node generate-icons.js
```

**Option B: Online Tool**
1. Gehe zu https://favicon.io/favicon-converter/
2. Lade `icons/icon.svg` hoch
3. Lade das ZIP herunter
4. Entpacke alle Dateien in den `/icons` Ordner

### 3. OG-Bild generieren

```bash
# Mit sharp (falls installiert)
npx sharp icons/og-image.svg --resize 1200 630 --format png --output icons/og-image.png
```

Oder nutze einen Online SVG-to-PNG Converter.

### 4. Deployment

#### Option 1: GitHub Pages (Kostenlos)

```bash
git add .
git commit -m "feat: Add PWA support and SEO optimization"
git push origin main
```

1. Gehe zu Repository Settings → Pages
2. Wähle Branch: `main`
3. Aktiviere "Enforce HTTPS"
4. Warte 2-5 Minuten
5. Deine Seite ist live unter: `https://dein-username.github.io/isonomia/`

#### Option 2: Netlify (Kostenlos)

1. Gehe zu https://app.netlify.com/
2. Drag & Drop den Projektordner
3. Fertig! (Automatisch HTTPS)

#### Option 3: Vercel (Kostenlos)

```bash
npm i -g vercel
vercel --prod
```

### 5. Lighthouse Test

Nach dem Deployment:
1. Öffne Chrome DevTools
2. Gehe zum "Lighthouse" Tab
3. Klicke "Generate Report"
4. Erwartetes Ergebnis: **98-100/100**

---

## 📋 Pre-Deployment Checklist

```
□ Domain in allen Dateien aktualisiert
□ Icons generiert (alle 11 Größen)
□ OG-Bild als PNG vorhanden
□ Git commit erstellt
□ Auf Hosting hochgeladen
□ HTTPS aktiviert
□ Lighthouse Test bestanden
□ PWA installierbar (Chrome → Installieren)
```

---

## 🎯 Erwartete Lighthouse Scores

| Kategorie | Score |
|-----------|-------|
| Performance | 98-100/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 98-100/100 |
| PWA | 90-100/100 |
| **Gesamt** | **98-100/100** |

---

## 🔧 Fehlerbehebung

### Icons werden nicht angezeigt
- Prüfe, ob alle PNGs im `/icons` Ordner sind
- Stelle sicher, dass die Dateinamen exakt übereinstimmen

### Service Worker nicht registriert
- Seite muss über HTTPS laufen (localhost funktioniert auch)
- Browser-Console auf Fehler prüfen

### PWA Install-Button fehlt
- Manifest muss gültig sein (Chrome DevTools → Application → Manifest)
- Icons müssen alle Größen haben

---

## 📞 Support

Bei Problemen:
1. Prüfe die Browser Console (F12)
2. Teste in einem Inkognito-Fenster
3. Überprüfe alle Dateipfade

---

**Glückwunsch! Deine ISONOMIA App ist jetzt bereit für die Produktion! 🎉**
