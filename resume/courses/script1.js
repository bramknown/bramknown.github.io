// Historical Astronomy Diagrams - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  initZodiacWheel();
  addCardInteractivity();
});

/**
 * Populate the large zodiac / degree wheel with ticks, numbers and letters
 */
function initZodiacWheel() {
  const svg = document.getElementById('zodiac-wheel');
  if (!svg) return;

  const ticksGroup = svg.querySelector('#ticks');
  const lettersGroup = svg.querySelector('#letters');
  const cx = 250, cy = 250;
  const outerR = 220;
  const letterR = 200;
  const numberR = 180;

  // 360 degree ticks (major every 10°, minor every 5°)
  for (let i = 0; i < 360; i += 5) {
    const rad = (i - 90) * Math.PI / 180; // start from top
    const isMajor = i % 10 === 0;
    const isBig = i % 30 === 0;
    const len = isBig ? 18 : (isMajor ? 12 : 6);
    const r1 = outerR;
    const r2 = outerR - len;

    const x1 = cx + r1 * Math.cos(rad);
    const y1 = cy + r1 * Math.sin(rad);
    const x2 = cx + r2 * Math.cos(rad);
    const y2 = cy + r2 * Math.sin(rad);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#2c1810');
    line.setAttribute('stroke-width', isBig ? 1.5 : 0.8);
    ticksGroup.appendChild(line);

    // Numbers every 30 degrees
    if (isBig) {
      const numR = numberR;
      const nx = cx + numR * Math.cos(rad);
      const ny = cy + numR * Math.sin(rad);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', nx);
      text.setAttribute('y', ny);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-size', '11');
      text.setAttribute('font-family', 'IM Fell English, serif');
      text.setAttribute('fill', '#2c1810');
      text.textContent = (i === 0 ? 30 : i / 30 * 30) || 30; // simplified labeling
      // Better: use 0-360 or 1-12 style
      const degLabel = i === 0 ? '30' : String(i);
      text.textContent = degLabel;
      ticksGroup.appendChild(text);
    }
  }

  // Outer letters A-Z around the wheel (classic style)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet.split('').forEach((letter, idx) => {
    const angle = (idx / 26) * 360 - 90;
    const rad = angle * Math.PI / 180;
    const lx = cx + letterR * Math.cos(rad);
    const ly = cy + letterR * Math.sin(rad);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', lx);
    text.setAttribute('y', ly);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '13');
    text.setAttribute('font-family', 'Cinzel, serif');
    text.setAttribute('font-weight', '700');
    text.setAttribute('fill', '#2c1810');
    text.textContent = letter;
    lettersGroup.appendChild(text);
  });

  // Make the whole wheel rotatable on click / drag
  let rotation = 0;
  let isDragging = false;
  let startAngle = 0;

  svg.style.cursor = 'grab';

  svg.addEventListener('mousedown', (e) => {
    isDragging = true;
    svg.style.cursor = 'grabbing';
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    startAngle = Math.atan2(my, mx) * 180 / Math.PI - rotation;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    svg.style.cursor = 'grab';
  });

  svg.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    const currentAngle = Math.atan2(my, mx) * 180 / Math.PI;
    rotation = currentAngle - startAngle;
    svg.style.transform = `rotate(${rotation}deg)`;
  });

  // Also allow simple click to advance by 30 degrees
  svg.addEventListener('click', (e) => {
    if (e.detail === 1 && !isDragging) {
      // small delay to distinguish from drag
    }
  });
}

/**
 * Add subtle interactivity to cards
 */
function addCardInteractivity() {
  const cards = document.querySelectorAll('.diagram-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// Optional: console info
console.log('Historical Astronomy Diagrams loaded. Drag the large zodiac wheel to rotate.');
