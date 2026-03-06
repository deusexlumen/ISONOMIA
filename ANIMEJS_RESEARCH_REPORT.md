# Anime.js: Ausführliche Recherche & Analyse
## Stand: März 2026

---

## 1. ÜBERSICHT

**Anime.js** ist eine leichtgewichtige JavaScript-Animations-Bibliothek, die von Julian Garnier entwickelt wurde. Sie gehört zu den beliebtesten Animation-Libraries im Web-Entwicklungsbereich.

| Attribut | Wert |
|----------|------|
| **Erstveröffentlichung** | 2016 |
| **Aktuelle Version** | 4.2.0 (Stand: 2025) |
| **GitHub Stars** | ~66.000 |
| **NPM Weekly Downloads** | ~319.000 |
| **Lizenz** | MIT |
| **Dateigröße (minified)** | ~25 KB (v4) |

---

## 2. VERSIONSVERGLEICH: V3 vs V4

### 2.1 Breaking Changes in V4

Anime.js V4 wurde im Jahr 2024/2025 komplett neu geschrieben und bringt erhebliche API-Änderungen:

#### Import-Struktur
```javascript
// ❌ V3 (alt)
import anime from 'animejs';

// ✅ V4 (neu) - Modularer Import
import { animate, createTimeline, stagger } from 'animejs';
```

#### Timeline API
```javascript
// ❌ V3
const tl = anime.timeline({
  duration: 500,
  easing: 'easeInOutQuad'
});
tl.add({ targets: '.item', translateX: 100 });

// ✅ V4
const tl = createTimeline({
  defaults: {
    duration: 500,
    ease: 'inOutQuad'
  }
});
tl.add('.item', { translateX: 100 });
```

#### Stagger-Funktion
```javascript
// ❌ V3
delay: anime.stagger(100, { direction: 'reverse' })

// ✅ V4
delay: stagger(100, { reversed: true })
```

#### Richtungsparameter
```javascript
// ❌ V3
direction: 'reverse'  // oder 'alternate'

// ✅ V4
reversed: true        // Neue Parameter
alternate: true
```

### 2.2 Neue Features in V4

| Feature | Beschreibung | Beispiel |
|---------|--------------|----------|
| **Additive Animation** | Animationen können addiert werden | `composition: 'add'` |
| **CSS Variablen** | Direkte Animation von CSS-Variablen | `animate(el, { '--radius': '20px' })` |
| **From-To Syntax** | Explizite From/To-Werte | `translateX: { from: 50, to: 100 }` |
| **Labels in Timelines** | Benannte Marker | `tl.add('START', 100)` |
| **Position Operators** | Flexible Positionierung | `'<<+=200'`, `'START'` |
| **Loop in Children** | Unter-Animationen können loopen | Child-Animation mit `loop: true` |

---

## 3. KERNFEATURES

### 3.1 Easing-Funktionen

Anime.js bietet umfangreiche Easing-Optionen:

```javascript
// Robert Penner's Easing-Funktionen
easing: 'easeInQuad'
easing: 'easeOutQuad'
easing: 'easeInOutQuad'
easing: 'easeInCubic'
easing: 'easeOutExpo'
easing: 'easeInOutElastic'

// Spring-Physik
easing: 'spring(mass, stiffness, damping, velocity)'
// Beispiel: easing: 'spring(1, 100, 10, 0)'

// Elastic mit Parametern
easing: 'easeOutElastic(amplitude, period)'
// Beispiel: easing: 'easeOutElastic(1, 0.5)'

// Steps
easing: 'steps(10)'

// Cubic Bézier
easing: 'cubicBezier(.5, .05, .1, .3)'
```

### 3.2 Timeline-System

```javascript
import { createTimeline, stagger } from 'animejs';

const tl = createTimeline({
  loop: true,
  alternate: true,
  playbackRate: 0.5,
  defaults: {
    duration: 1000,
    ease: 'outExpo'
  }
});

// Hinzufügen von Animationen
tl.add('.circle', {
  scale: [0, 1],
  opacity: [0, 1],
  delay: stagger(100, { from: 'center' })
})
.add('.square', {
  translateX: 200,
  rotate: '1turn'
}, '-=300')  // 300ms vorher starten
.add('.triangle', {
  scale: 0.75
}, 'START')  // An Label-Position
.add('.final', {
  opacity: 1
}, '<<+=200');  // 200ms nach vorheriger
```

### 3.3 Stagger (Verzögerungseffekte)

```javascript
import { animate, stagger } from 'animejs';

animate('.grid-item', {
  translateY: [100, 0],
  opacity: [0, 1],
  delay: stagger(100, {
    from: 'center',      // Startposition: 'first', 'last', 'center'
    grid: [10, 5],       // Grid-Layout für 2D-Stagger
    axis: 'y',           // 'x', 'y', or null
    easing: 'inOutQuad'  // Easing für die Verzögerung
  }),
  duration: 800,
  ease: 'outExpo'
});
```

---

## 4. VERGLEICH MIT ANDEREN LIBRARIES

### 4.1 Performance-Benchmark (2026)

| Library | Bundle Size (gzipped) | Performance | Best For |
|---------|----------------------|-------------|----------|
| **TailwindCSS Motion** | ~5 KB | ⭐⭐⭐⭐⭐ Excellent | CSS-First, einfache Animationen |
| **React Spring** | ~45 KB | ⭐⭐⭐⭐ Smooth | Physik-basierte Animationen |
| **Anime.js** | ~52 KB | ⭐⭐⭐⭐ Excellent | SVG/Timeline-Sequenzen |
| **GSAP** | ~78 KB | ⭐⭐⭐ Good | Professionelle Scroll-Animationen |
| **Framer Motion** | ~85 KB | ⭐⭐⭐⭐ Smooth | Komplexe React-Interaktionen |

### 4.2 Detaillierter Vergleich: Anime.js vs GSAP

| Aspekt | Anime.js | GSAP |
|--------|----------|------|
| **Dateigröße** | ~25 KB | ~90 KB |
| **Lernkurve** | Flach | Steil |
| **Performance** | Gut | Exzellent |
| **Scroll-Animationen** | Eingeschränkt (kein Built-in) | Hervorragend (ScrollTrigger) |
| **SVG-Unterstützung** | Gut | Exzellent |
| **Kosten** | Kostenlos | Kostenlos (einige Plugins kostenpflichtig) |
| **Community** | Klein aber aktiv | Groß |
| **Timeline-System** | Gut | Exzellent |
| **Physik-Animationen** | Grundlegend | Fortgeschritten |

### 4.3 Wann welche Library?

**Anime.js wählen, wenn:**
- Leichtgewichtige Lösung benötigt wird
- SVG-Animationen im Fokus stehen
- Schneller Einstieg wichtig ist
- Keine komplexen Scroll-Animationen nötig
- Budget begrenzt ist

**GSAP wählen, wenn:**
- Professionelle Scroll-Animationen nötig
- Höchste Performance gefordert
- Komplexe Timeline-Steuerung
- Umfangreiche Browser-Kompatibilität
- Premium-Support benötigt

**Framer Motion wählen, wenn:**
- React-Projekt
- Gesten- und Drag-Animationen
- Deklarativer Ansatz bevorzugt
- Layout-Animationen wichtig

---

## 5. BEST PRACTICES

### 5.1 Performance-Optimierung

```javascript
// ✅ GUT: Verwende transform statt top/left
animate('.element', {
  translateX: 200,  // Hardware-beschleunigt
  scale: 1.5
});

// ❌ SCHLECHT: Layout-Triggering
animate('.element', {
  left: '200px',    // Verursacht Reflow
  top: '100px'
});
```

### 5.2 Memory Management & Cleanup

```javascript
// Animationen bereinigen
const animation = animate('.element', {
  translateX: 200,
  loop: true
});

// Später aufräumen
animation.pause();
animation.remove('.element');  // Entfernt Targets

// Oder alle Animationen stoppen
import { animate } from 'animejs';
animate.remove('.element');

// In React/Vue/Angular
useEffect(() => {
  const anim = animate('.element', { ... });
  
  return () => {
    anim.pause();  // Cleanup beim Unmount
  };
}, []);
```

### 5.3 Will-Change verwenden

```css
/* Nur wenn Animation aktiv */
.animating {
  will-change: transform, opacity;
}

/* Nach Animation entfernen */
.animation-complete {
  will-change: auto;
}
```

### 5.4 Reduzierte Bewegung berücksichtigen

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

animate('.element', {
  translateX: 200,
  duration: prefersReducedMotion ? 0 : 1000
});
```

---

## 6. ANWENDUNGSBEISPIELE

### 6.1 Text-Animation (Charakter für Charakter)

```javascript
import { animate, stagger } from 'animejs';

// HTML: <h1 class="title">Hello World</h1>
// CSS: .title .char { display: inline-block; }

const title = document.querySelector('.title');
title.innerHTML = title.textContent.replace(
  /\S/g,
  "<span class='char'>$&</span>"
);

animate('.title .char', {
  translateY: [100, 0],
  rotateX: [-90, 0],
  opacity: [0, 1],
  delay: stagger(35, { from: 'center' }),
  duration: 1400,
  ease: 'outElastic(1, .6)'
});
```

### 6.2 SVG-Pfad-Animation

```javascript
import { animate } from 'animejs';

animate('.svg-path', {
  strokeDashoffset: [animate.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: 500,
  direction: 'alternate',
  loop: true
});
```

### 6.3 Parallax-Scrolling

```javascript
import { animate, createTimer } from 'animejs';

// Mit createTimer für Scroll-Animationen
const scrollAnim = createTimer({
  duration: Infinity,
  autoplay: false
});

window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / 
    (document.body.scrollHeight - window.innerHeight);
  scrollAnim.seek(scrollAnim.duration * scrollPercent);
});

// Elemente animieren
scrollAnim.add('.parallax-bg', {
  translateY: [0, -200],
  ease: 'linear'
});
```

### 6.4 Audio-Visualisierung

```javascript
import { animate, stagger } from 'animejs';

// Für Audio-Visualisierung
animate('.visual-bar', {
  scaleY: {
    value: [0, 1],
    duration: 100,
    easing: 'easeOutQuad'
  },
  backgroundColor: ['#ff6b6b', '#4ecdc4'],
  delay: stagger(50),
  loop: true,
  alternate: true
});
```

---

## 7. HÄUFIGE FEHLER & LÖSUNGEN

### 7.1 Animation Jank/Stuttering

**Problem:** Ruckelnde Animationen

**Lösung:**
```javascript
// Verwende nur hardware-beschleunigte Properties
// ✅ transform (translate, scale, rotate)
// ✅ opacity
// ❌ width, height, top, left (verursachen Reflow)
```

### 7.2 Memory Leaks

**Problem:** Animationen laufen weiter nach Element-Entfernung

**Lösung:**
```javascript
// Cleanup beim Unmount/Navigation
window.addEventListener('beforeunload', () => {
  anime.remove();  // Alle Animationen stoppen
});

// Oder spezifisch
animation.pause();
animation.remove('.target');
```

### 7.3 Safari-Spezifische Probleme

**Problem:** Filter-Animationen ruckeln in Safari

**Lösung:**
```css
@supports (-webkit-backdrop-filter: blur(1px)) {
  .safari-optimized {
    /* Einfachere Animationen in Safari */
    will-change: transform;
  }
}
```

---

## 8. INTEGRATION IN PROJEKTE

### 8.1 Installation

```bash
# NPM
npm install animejs

# Yarn
yarn add animejs

# CDN
<script src="https://cdn.jsdelivr.net/npm/animejs@4.2.0/dist/bundles/anime.umd.min.js"></script>
```

### 8.2 Verfügbare Bundle-Formate

| Format | Datei | Verwendung |
|--------|-------|------------|
| **ESM** | `anime.esm.js` | Moderne Bundler (Vite, Webpack 5+) |
| **UMD** | `anime.umd.js` | Browser, AMD, CommonJS |
| **IIFE** | `anime.iife.js` | Script-Tag (global) |
| **CommonJS** | `anime.cjs` | Node.js |

### 8.3 ISONOMIA-Projekt: Aktuelle Verwendung

Das ISONOMIA-Projekt verwendet Anime.js V4.2.2 im **UMD-Format**:

```html
<script src="anime.umd.min.js"></script>
<script>
  // UMD: Global verfügbar
  const { animate, createTimeline, stagger } = anime;
  
  // Animation
  anime({
    targets: '.element',
    translateX: 250,
    duration: 800,
    easing: 'easeOutElastic(1, .5)'
  });
  
  // Timeline
  const tl = anime.timeline({ ... });
  tl.add({ ... });
</script>
```

**Hinweis:** Die neue V4-Syntax (`createTimeline`, `stagger` als Funktion) ist bereits im Projekt implementiert.

---

## 9. ZUSAMMENFASSUNG

### Stärken von Anime.js

✅ **Leichtgewichtig** (~25 KB minified)  
✅ **Einfache API** - Schneller Einstieg  
✅ **Hervorragende SVG-Unterstützung**  
✅ **Mächtiges Timeline-System**  
✅ **Vielfältige Easing-Funktionen**  
✅ **Kostenlos** (MIT-Lizenz)  
✅ **Aktive Entwicklung** (V4 2024/2025)  

### Schwächen

❌ **Kleinere Community** als GSAP/Framer Motion  
❌ **Kein Built-in Scroll-Trigger** (wie GSAP)  
❌ **Eingeschränkte Interaktivität** (kein Drag-and-Drop)  
❌ **Gelegentliche Browser-Inkompatibilitäten**  

### Fazit

**Anime.js ist die ideale Wahl für:**
- Projekte mit Fokus auf SVG-Animationen
- Entwickler, die schnell produktiv werden wollen
- Anwendungen mit begrenztem Budget
- Projekte, die eine leichtgewichtige Lösung benötigen

**Für ISONOMIA ist Anime.js perfekt geeignet**, da:
- Text-Animationen (Charakter-basiert) einfach zu implementieren sind
- Das Timeline-System komplexe Sequenzen ermöglicht
- Die geringe Dateigröße die Ladezeit nicht beeinträchtigt
- Die 3D-Integration (Three.js) ergänzt wird

---

## 10. RESSOURCEN

- **Offizielle Dokumentation:** https://animejs.com/documentation/
- **GitHub Repository:** https://github.com/juliangarnier/anime
- **NPM Package:** https://www.npmjs.com/package/animejs
- **CodePen Beispiele:** https://codepen.io/tag/anime-js
- **V4 Migration Guide:** https://github.com/juliangarnier/anime/releases/tag/4.0.0

---

*Recherche erstellt: März 2026*  
*Quellen: Offizielle Dokumentation, GitHub, NPM, Tech-Blogs, Benchmark-Studien*
