# ISONOMIA - Agent Documentation

## Project Overview

**ISONOMIA** ("Projekt Kronos") is an interactive German-language web application that presents a philosophical narrative about political systems, democracy, and the ancient Greek concept of *Isonomie* (equality of political rights). The project translates Nonviolent Communication (GfK - "Gewaltfreie Kommunikation") into an algorithmic state machine, using visual entities (particles) as mathematical metaphors for democratic concepts.

The application guides users through a dialectical narrative exploring themes of:
- The failure of electoral systems to prevent dysfunction and polarization
- Political disenfranchisement and the feeling of powerlessness
- Elite over-representation in governance
- Sortition (lottery-based democracy) as an alternative model

**Repository**: https://github.com/deusexlumen/ISONOMIA

---

## Technology Stack

| Component | Technology | Version | Notes |
|-----------|------------|---------|-------|
| Core | HTML5, CSS3, Vanilla JavaScript | ES2015+ | Single-file architecture |
| Animation Library | Anime.js | v4.2.2 | UMD bundle used |
| 3D Engine | Three.js | v0.160.0 | Loaded from CDN (unpkg.com) |
| Fonts | Google Fonts | - | Cinzel (display), Inter (body) |
| Build System | None | - | No bundler, no build step |
| Package Manager | None | - | Direct file inclusion |
| Language | German | - | All UI text in German |

### Anime.js Distribution Files

The project includes Anime.js in multiple bundled formats:

| File | Format | Size | Use Case |
|------|--------|------|----------|
| `anime.esm.js` | ES Module (unminified) | 316 KB | Development, tree-shaking |
| `anime.esm.min.js` | ES Module (minified) | 89 KB | Production ESM builds |
| `anime.umd.js` | UMD (unminified) | 333 KB | Universal module compatibility |
| `anime.umd.min.js` | UMD (minified) | 89 KB | **Production, currently used** |

---

## Project Structure

```
ISONOMIA/
├── index.html              # Single-file application (~1,361 lines)
├── anime.esm.js           # Anime.js ES Module (development)
├── anime.esm.min.js       # Anime.js ES Module (production)
├── anime.umd.js           # Anime.js UMD (development)
├── anime.umd.min.js       # Anime.js UMD (production) - actively used
├── validate.js            # Node.js validation script for testing
├── README.md              # Project description (German)
├── AGENTS.md              # This file
├── isonomia_*.png         # Screenshot/test images
│   ├── isonomia_start.png
│   ├── isonomia_vault.png
│   ├── isonomia_3d_*.png  # 3D visualization screenshots
│   └── ...
├── AUDIT*.md              # Various audit documentation files
│   ├── AUDIT.md
│   ├── AUDIT_FINAL.md
│   ├── 3D_AUDIT_FINAL.md
│   └── ...
├── TEST_RESULTS_FINAL.md  # Final test results documentation
└── .git/                  # Git repository
```

### Architecture

This is a **single-file application** - all HTML structure, CSS styling (~375 lines), and JavaScript logic (~985 lines) are contained within `index.html`. There is no module bundler, no separate source directories, and no build process.

**HTML Structure:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <!-- Meta tags, viewport, title -->
    <!-- Inline CSS (~375 lines in <style>) -->
</head>
<body>
    <div class="noise-overlay"></div>           <!-- Noise texture overlay -->
    <div id="particle-container"></div>         <!-- Background DOM particles -->
    <canvas id="three-canvas"></canvas>         <!-- Three.js 3D canvas -->
    <button class="back-btn" id="back-btn">     <!-- Navigation back button -->
    <button class="audio-toggle" id="audio-toggle">  <!-- Audio toggle -->
    <main id="stage" role="main">               <!-- Content layer -->
        <div id="content-layer"></div>          <!-- Dynamic narrative content -->
    </main>
    <script src="anime.umd.min.js"></script>
    <script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
    <!-- Application Logic (~985 lines in <script>) -->
</body>
</html>
```

---

## JavaScript Architecture

### Module Organization

The JavaScript code is organized into logical sections as modular objects:

| Section | Object | Purpose |
|---------|--------|---------|
| 1 | `narrativeData` | Narrative state machine (~45 nodes) |
| 2 | `Storage` | localStorage persistence |
| 3 | `UserProfile` | User behavior profiling & tracking |
| 4 | `ISONOMIA` | Main application controller |

### Narrative State Machine

The narrative is defined in `narrativeData` object with nodes representing dialog states:

**Narrative Phases:**
| Phase | Description | Key Nodes |
|-------|-------------|-----------|
| `entry` | "Wo drückt der Schuh?" - Problem identification | start |
| `reveal` | System analysis and truth revelation | path_system_frust, reveal_system_truth, paradox_vote |
| `empathy` | Validation of user feelings | path_powerless, path_fear |
| `transition` | Bridges between problem and solution | recognition_no_choice, reveal_danger |
| `solution` | Sortition/Sortition democracy explanation | solution_intro, explain_sortition, explain_mechanics |
| `objection` | Handling common objections | objection_crazy, objection_incompetence, objection_job |
| `action` | Call to action | action_path, action_talk, action_commit |
| `vault` | Resource library | vault_books |
| `exit` | Final state and restart | final |

**Node Structure:**
```javascript
{
    "nodeKey": {
        "text": "Display text...",           // Primary heading
        "subtext": "Explanatory text...",    // Secondary paragraph
        "options": [                          // Button options
            { 
                "label": "Button text", 
                "next": "targetNode",
                "profileSet": { "painPoint": "value", "archetype": "value" }
            }
        ],
        "visual": "breathe",                  // Particle animation mode
        "phase": "entry"                      // Narrative phase identifier
    }
}
```

**Visual Modes** (particle animation states):
| Mode | Description | Color Scheme |
|------|-------------|--------------|
| `breathe` | Gentle pulsing, random positions | Cyan (#00f5d4) |
| `tremble` | Subtle vibration | Cyan |
| `chaos` | Chaotic dispersion | Cyan → Magenta |
| `clash` | Two opposing groups (left vs right) | Cyan/Magenta split |
| `pyramid` | Hierarchical structure, white elite dots | Cyan + White elite |
| `grid` | Organized grid formation | Cyan |

### User Profiling System

`UserProfile` tracks:
- `painPoint`: 'dysfunction' | 'powerlessness' | 'fear'
- `archetype`: 'pragmatist' | 'idealist' | 'worrier'
- `pathTaken[]`: Array of navigation steps

Persisted to `sessionStorage` (cleared on browser close).

### Storage & Persistence

**Session Persistence** (`localStorage`):
- Key: `isonomia_session`
- Stores: currentStep, history, timestamp, date
- Expires after 24 hours

**Profile Persistence** (`sessionStorage`):
- Key: `isonomia_profile`
- Stores: painPoint, archetype, pathTaken

---

## CSS Architecture

### Design Tokens (CSS Custom Properties)

```css
:root {
    --bg: #050505;                    /* Dark background */
    --bg-secondary: #0a0a0a;
    --bg-tertiary: #111111;
    
    --cyan: #00f5d4;                  /* Primary accent */
    --cyan-dim: rgba(0, 245, 212, 0.6);
    --cyan-glow: rgba(0, 245, 212, 0.2);
    
    --magenta: #ff6b9d;               /* Secondary accent (conflict) */
    --magenta-dim: rgba(255, 107, 157, 0.6);
    --magenta-glow: rgba(255, 107, 157, 0.2);
    
    --gold: #ffd700;                  /* Special accent */
    
    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.7);
    --text-tertiary: rgba(255, 255, 255, 0.5);
    --text-muted: rgba(255, 255, 255, 0.35);
    
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-border-hover: rgba(0, 245, 212, 0.25);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    
    --font-display: 'Cinzel', serif;
    --font-primary: 'Inter', sans-serif;
}
```

### Component Classes

| Class | Purpose |
|-------|---------|
| `#particle-container` | Fixed background layer for DOM particles |
| `.dot` | Individual particle elements (80 instances) |
| `#stage` | Centered content container |
| `.gandalf-voice` | Narrative text styling |
| `.haptic-btn` | Interactive buttons with hover effects |
| `.section-label` | Phase indicator (small caps) |
| `.back-btn` | Navigation back button (fixed position) |
| `.audio-toggle` | Audio on/off toggle (fixed position) |
| `.noise-overlay` | SVG noise texture overlay |

### Z-Index Layers

| Layer | Element | z-index |
|-------|---------|---------|
| 0 | Three.js Canvas | 0 |
| 0 | Particle container | 0 |
| 1 | Noise overlay | 1 |
| 10 | Stage (content) | 10 |
| 100 | Back button, Audio toggle | 100 |

---

## 3D Engine (Three.js)

The application includes a basic Three.js integration:

**Features:**
- BufferGeometry particle system (200 particles)
- Continuous rotation animation
- Automatic fallback to 2D if WebGL unavailable
- Responsive to window resize

**Implementation:**
- Creates Points geometry with random positions
- Uses PointsMaterial with cyan color
- Animation loop via requestAnimationFrame
- Rotation: y += 0.0003, x += 0.0001 per frame

---

## Build and Test Commands

### No Build Process

This project has **no build step**. It can be opened directly in a browser by opening `index.html`.

### Local Development

Simply open `index.html` in any modern web browser:

```powershell
# Windows
start index.html

# Or with Python server
python -m http.server 8000
```

Or serve with any static file server:
```bash
# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Testing

**No automated testing framework is configured.**

A basic Node.js validation script exists (`validate.js`) that checks for critical components:

```bash
node validate.js
```

This script validates:
- Presence of critical JavaScript components (UserProfile, narrativeData)
- Proper method signatures
- Narrative node count
- Potential code issues

**Manual testing checklist:**
- [ ] All narrative paths navigable
- [ ] Particle animations render correctly (2D mode)
- [ ] 3D mode initializes when WebGL available
- [ ] Buttons respond to clicks
- [ ] Transition animations smooth
- [ ] Mobile viewport displays correctly
- [ ] Back button functions (also test Escape key)
- [ ] Session persistence works (refresh page)
- [ ] Audio toggle UI responds

---

## Code Style Guidelines

### Language

- **All UI text is in German** - maintain this for any user-facing content
- Comments are mixed German (narrative sections) and English (technical sections)
- Code identifiers (variables, functions) are in English

### CSS Conventions

- CSS variables for theming in `:root`
- BEM-like naming for classes (`.gandalf-voice`, `.haptic-btn`)
- `will-change: transform, opacity` on animated elements for performance
- Glassmorphism effects with backdrop-filter

### JavaScript Conventions

- Module pattern with namespace objects (`ISONOMIA`, `UserProfile`, etc.)
- Arrow functions for callbacks
- Template literals for HTML generation
- Event delegation for dynamic elements
- XSS sanitization via `sanitize()` method

---

## Mobile & Accessibility

### Responsive Breakpoints

- Mobile: `max-width: 768px`
- Adjustments: Smaller typography, reduced padding, repositioned fixed buttons

### Accessibility Features

- Semantic HTML (`role="main"`, `role="article"`, `aria-live="polite"`)
- ARIA labels on interactive elements
- `prefers-reduced-motion` media query support
- Keyboard navigation (ESC to go back)
- Focus indicators on buttons

### Audio

- Audio toggle button present but audio implementation is visual-only placeholder
- No actual Web Audio API integration currently active

---

## Deployment

Deploy as static files to any web host:
- GitHub Pages
- Netlify
- Vercel
- Any standard web server

**Required files for deployment**:
- `index.html`
- `anime.umd.min.js` (critical dependency)
- Three.js is loaded from CDN (no local file needed)

---

## Security Considerations

- No server-side processing (static files only)
- No user input collection beyond internal state tracking
- No cookies used
- XSS protection via `sanitize()` method using textContent
- Data stored in `localStorage`/`sessionStorage` (client-side only)
- Inline scripts/styles (CSP would require modifications)

**Known Issues**:
- No Subresource Integrity (SRI) for Three.js CDN (see TEST_RESULTS_FINAL.md)

---

## External Dependencies

| Library | Version | License | Source |
|---------|---------|---------|--------|
| Anime.js | v4.2.2 | MIT | Bundled files |
| Three.js | v0.160.0 | MIT | CDN (unpkg.com) |
| Google Fonts | - | OFL | fonts.googleapis.com |

### CDN Dependencies

The following are loaded from external CDN:
```html
<script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

For offline use, download and include locally.

---

## Git History

Recent commits:
```
5998c6e Update title and narrative text in index.html
18eb4e6 Refactor CSS and update narrative text in index.html
983cfba Add files via upload
13a2755 Add initial HTML structure and styles for ISONOMIA
918eaa7 Initial commit
```

---

## Resources and References

- **GitHub Repository**: https://github.com/deusexlumen/ISONOMIA
- **Anime.js Documentation**: https://animejs.com/documentation/
- **Three.js Documentation**: https://threejs.org/docs/
- **Project Name**: ISONOMIA (ἰσονομία) - Ancient Greek concept of political equality

---

## Key Implementation Details

### Particle System Architecture

The application has dual particle systems:

1. **DOM-based (2D primary)**:
   - 80 div elements with class `.dot`
   - Animated via Anime.js
   - Colors: Cyan (#00f5d4), Magenta (#ff6b9d), White (#ffffff)

2. **WebGL-based (3D secondary)**:
   - Three.js Points with BufferGeometry
   - 200 particles, cyan colored
   - Continuous rotation animation
   - Falls back gracefully if WebGL unavailable

### State Transition Flow

```
User Click → Event Delegation → ISONOMIA.transition() → 
  1. Update UserProfile if profileSet data present
  2. Record path in pathTaken
  3. Animate content out (blur + fade)
  4. Update history and currentStep
  5. Render new content
  6. Animate content in
  7. Apply visual mode → Update particles
  8. Save to Storage
```

### Statistics (from TEST_RESULTS_FINAL.md)

- Code lines: ~1,361
- JavaScript modules: 4
- Functions: ~50
- Narrative nodes: ~45
- Visual modes: 6

---

*Document Version: 2026-02-15*  
*Project Version: Based on commit 5998c6e*
