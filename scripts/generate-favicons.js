/**
 * Generate favicon files from SVG
 *
 * This script generates PNG favicons at various sizes.
 *
 * Usage:
 *   node scripts/generate-favicons.js
 *
 * Requires: sharp (npm install sharp)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
try {
  var sharp = require('sharp');
} catch (e) {
  console.log('\n❌ Error: sharp is not installed');
  console.log('📦 Install it with: npm install sharp --save-dev\n');
  process.exit(1);
}

const svgPath = path.join(__dirname, '../public/favicon.svg');
const publicDir = path.join(__dirname, '../public');

// Sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from SVG...\n');

  const svgBuffer = fs.readFileSync(svgPath);

  for (const { size, name } of sizes) {
    try {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));

      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  console.log('\n✅ Favicon generation complete!');
  console.log('📁 Files saved to: frontend/public/\n');
  console.log('📝 Next steps:');
  console.log('   1. Update frontend/src/app/layout.tsx with favicon metadata');
  console.log('   2. Generate favicon.ico from PNG files (use online converter if needed)');
  console.log('   3. Test favicons at: https://realfavicongenerator.net/favicon_checker\n');
}

generateFavicons().catch(console.error);
