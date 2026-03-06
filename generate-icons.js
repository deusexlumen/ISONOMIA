/**
 * Icon Generator Script for ISONOMIA
 * Generates all required PWA icon sizes from SVG
 * 
 * Usage:
 *   Option 1: node generate-icons.js (requires sharp npm package)
 *   Option 2: Use online converter like https://favicon.io/
 *   Option 3: Use Figma/Sketch to export PNGs
 * 
 * Required sizes:
 *   - favicon-16x16.png
 *   - favicon-32x32.png
 *   - apple-touch-icon.png (180x180)
 *   - icon-72x72.png
 *   - icon-96x96.png
 *   - icon-128x128.png
 *   - icon-144x144.png
 *   - icon-152x152.png
 *   - icon-192x192.png
 *   - icon-384x384.png
 *   - icon-512x512.png
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'icons');
const SVG_SOURCE = path.join(ICONS_DIR, 'icon.svg');

const SIZES = [
  { name: 'favicon-16x16', size: 16 },
  { name: 'favicon-32x32', size: 32 },
  { name: 'apple-touch-icon', size: 180 },
  { name: 'icon-72x72', size: 72 },
  { name: 'icon-96x96', size: 96 },
  { name: 'icon-128x128', size: 128 },
  { name: 'icon-144x144', size: 144 },
  { name: 'icon-152x152', size: 152 },
  { name: 'icon-192x192', size: 192 },
  { name: 'icon-384x384', size: 384 },
  { name: 'icon-512x512', size: 512 }
];

async function generateIcons() {
  console.log('🎨 ISONOMIA Icon Generator\n');
  
  // Check if sharp is installed
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.log('⚠️  Sharp package not found.');
    console.log('\n📦 Installiere sharp mit:');
    console.log('   npm install sharp\n');
    console.log('🌐 Alternative: Nutze einen Online-Converter:');
    console.log('   1. Gehe zu https://favicon.io/favicon-converter/');
    console.log('   2. Lade icons/icon.svg hoch');
    console.log('   3. Lade das generierte ZIP herunter');
    console.log('   4. Entpacke in den /icons Ordner\n');
    console.log('🎨 Oder nutze Figma:');
    console.log('   - Importiere icon.svg');
    console.log('   - Exportiere als PNG in allen Größen\n');
    return;
  }
  
  // Check if source SVG exists
  if (!fs.existsSync(SVG_SOURCE)) {
    console.error('❌ Source SVG not found:', SVG_SOURCE);
    return;
  }
  
  console.log('📁 Generating icons...\n');
  
  for (const { name, size } of SIZES) {
    const outputPath = path.join(ICONS_DIR, `${name}.png`);
    
    try {
      await sharp(SVG_SOURCE)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`  ✅ ${name}.png (${size}x${size})`);
    } catch (err) {
      console.error(`  ❌ Failed to generate ${name}:`, err.message);
    }
  }
  
  console.log('\n✨ All icons generated successfully!');
  console.log(`📂 Location: ${ICONS_DIR}\n`);
}

// Alternative: Create HTML page for manual generation
function createGeneratorHTML() {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>ISONOMIA Icon Generator</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #000;
            color: #fff;
        }
        h1 { color: #00f5d4; }
        .icon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .icon-item {
            background: #111;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }
        .icon-item img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
        }
        .icon-name {
            font-size: 12px;
            color: #00f5d4;
        }
        button {
            background: #00f5d4;
            color: #000;
            border: none;
            padding: 15px 30px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px 5px;
        }
        button:hover {
            background: #00c4aa;
        }
        .instructions {
            background: #111;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 4px solid #00f5d4;
        }
    </style>
</head>
<body>
    <h1>🎨 ISONOMIA Icon Generator</h1>
    
    <div class="instructions">
        <h3>📋 Anleitung:</h3>
        <ol>
            <li>Klicke auf "Icons Vorschau" um alle Größen zu sehen</li>
            <li>Rechtsklick auf jedes Icon → "Bild speichern unter..."</li>
            <li>Speichere im <code>/icons</code> Ordner mit dem angezeigten Namen</li>
        </ol>
    </div>
    
    <button onclick="generateIcons()">🖼️ Icons Vorschau</button>
    <button onclick="downloadAll()">⬇️ Alle Herunterladen</button>
    
    <div id="icon-container" class="icon-grid"></div>
    
    <script>
        const sizes = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512];
        
        function generateIcons() {
            const container = document.getElementById('icon-container');
            container.innerHTML = '';
            
            sizes.forEach(size => {
                const item = document.createElement('div');
                item.className = 'icon-item';
                
                const img = document.createElement('img');
                img.src = 'icons/icon.svg';
                img.width = Math.min(size, 128);
                img.height = Math.min(size, 128);
                
                const name = document.createElement('div');
                name.className = 'icon-name';
                name.textContent = getIconName(size);
                
                item.appendChild(img);
                item.appendChild(name);
                container.appendChild(item);
            });
        }
        
        function getIconName(size) {
            if (size === 16) return 'favicon-16x16.png';
            if (size === 32) return 'favicon-32x32.png';
            if (size === 180) return 'apple-touch-icon.png';
            return \`icon-\${size}x\${size}.png\`;
        }
        
        function downloadAll() {
            alert('Bitte speichere jedes Icon einzeln mit Rechtsklick → "Bild speichern unter..."');
        }
    </script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'icon-generator.html'), html);
  console.log('📄 Created icon-generator.html for manual generation');
}

// Run
if (require.main === module) {
  generateIcons().then(() => {
    createGeneratorHTML();
  }).catch(console.error);
}

module.exports = { generateIcons, SIZES };
