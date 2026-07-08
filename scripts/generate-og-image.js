/**
 * Generate OG Image PNG from SVG
 *
 * This script converts the og-image.svg to og-image.png
 * at the optimal size for social media (1200x630)
 *
 * Usage:
 *   node scripts/generate-og-image.js
 *
 * Requires: sharp (already installed)
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

const svgPath = path.join(__dirname, '../public/og-image.svg');
const outputPath = path.join(__dirname, '../public/og-image.png');

async function generateOGImage() {
  console.log('🎨 Converting OG image from SVG to PNG...\n');

  try {
    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
      console.error(`❌ SVG file not found at: ${svgPath}`);
      process.exit(1);
    }

    const svgBuffer = fs.readFileSync(svgPath);

    // Convert SVG to PNG at 1200x630 (optimal for OG images)
    await sharp(svgBuffer)
      .resize(1200, 630)
      .png()
      .toFile(outputPath);

    console.log('✅ OG image generated successfully!');
    console.log(`📁 File saved to: ${outputPath}`);
    console.log(`📊 Size: 1200x630px (optimal for social media)`);
    console.log('\n🎯 This image will be used for:');
    console.log('   - Facebook share previews');
    console.log('   - LinkedIn share previews');
    console.log('   - Twitter card images');
    console.log('   - WhatsApp link previews');
    console.log('   - Slack unfurls\n');

  } catch (error) {
    console.error('❌ Error generating OG image:', error.message);
    process.exit(1);
  }
}

generateOGImage();
