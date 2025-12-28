/**
 * Generate snazzy icons for SuperOmniBar extension
 * Creates icons with a modern, sleek design featuring a search bar/omnibar icon
 */

const fs = require('fs');
const path = require('path');

// Check if canvas is available, if not, provide instructions
let canvas;
try {
  canvas = require('canvas');
} catch (e) {
  console.log('Installing canvas package...');
  console.log('Please run: npm install canvas');
  process.exit(1);
}

const { createCanvas } = canvas;

function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background gradient - modern blue to purple
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(0.5, '#764ba2');
  gradient.addColorStop(1, '#f093fb');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Add a subtle glass effect overlay
  const overlayGradient = ctx.createLinearGradient(0, 0, size, size);
  overlayGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
  overlayGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
  ctx.fillStyle = overlayGradient;
  ctx.fillRect(0, 0, size, size);
  
  // Draw search bar/omnibar icon
  const padding = size * 0.2;
  const barWidth = size - (padding * 2);
  const barHeight = size * 0.25;
  const barY = size * 0.35;
  const barX = padding;
  const cornerRadius = barHeight * 0.3;
  
  // Bar background with glass effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  roundRect(ctx, barX, barY, barWidth, barHeight, cornerRadius);
  ctx.fill();
  
  // Bar border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = size * 0.02;
  roundRect(ctx, barX, barY, barWidth, barHeight, cornerRadius);
  ctx.stroke();
  
  // Search icon (magnifying glass) on the right
  const iconSize = barHeight * 0.6;
  const iconX = barX + barWidth - iconSize - (barHeight * 0.2);
  const iconY = barY + (barHeight * 0.2);
  const iconCenterX = iconX + iconSize * 0.5;
  const iconCenterY = iconY + iconSize * 0.5;
  
  // Magnifying glass circle
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = size * 0.03;
  ctx.beginPath();
  ctx.arc(iconCenterX - iconSize * 0.1, iconCenterY - iconSize * 0.1, iconSize * 0.35, 0, Math.PI * 2);
  ctx.stroke();
  
  // Magnifying glass handle
  ctx.beginPath();
  ctx.moveTo(iconCenterX + iconSize * 0.15, iconCenterY + iconSize * 0.15);
  ctx.lineTo(iconCenterX + iconSize * 0.4, iconCenterY + iconSize * 0.4);
  ctx.stroke();
  
  // Add some sparkle/shine effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(barX + barWidth * 0.15, barY + barHeight * 0.5, size * 0.03, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(barX + barWidth * 0.3, barY + barHeight * 0.5, size * 0.02, 0, Math.PI * 2);
  ctx.fill();
  
  return canvas;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Generate icons
const sizes = [16, 48, 128];
const iconsDir = path.join(__dirname, 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Generating icons...');

sizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(iconsDir, `icon-${size}.png`);
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Created icon-${size}.png (${size}x${size})`);
});

console.log('\n✨ All icons generated successfully!');

