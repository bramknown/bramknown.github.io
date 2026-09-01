import { LayerManager } from './layers.js';
import { History } from './history.js';
import {floodFill, getPixelColor, drawLine, drawRect, drawEllipse, drawRoundRect} from './tools.js';
import { createViewport } from './viewport.js';

const CANVAS_W = 900;
const CANVAS_H = 600;

const state = {
  tool: 'pencil',
  fg: '#000000',
  bg: '#ffffff',
  size: 4,
  opacity: 1,
  fillTolerance: 20,
  zoom: 1,
  drawing: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  selection: null, // {x,y,w,h}
  shiftKey: false
};

const mainCanvas = document.getElementById('main-canvas');
const overlayCanvas = document.getElementById('overlay-canvas');
const mainCtx = mainCanvas.getContext('2d', { alpha: true });
const overlayCtx = overlayCanvas.getContext('2d', { alpha: true });
const container = document.getElementById('canvas-container');
const area = document.getElementById('canvas-area');
const selectionBox = document.getElementById('selection-box');
const textBox = document.getElementById('text-input-box');
const textInput = document.getElementById('text-input');
const resizeHandles = document.querySelectorAll('.canvas-handle');

const layers = new LayerManager(CANVAS_W, CANVAS_H);
const history = new History(25);
function composite() {
  layers.composite(mainCtx);
}
function pushHistory() {
  const layer = layers.active;
  history.push(layer.ctx.getImageData(0, 0, layers.width, layers.height));
  updateUndoButtons();
}
function updateUndoButtons() {
  document.getElementById('btn-undo').disabled = !history.canUndo();
  document.getElementById('btn-redo').disabled = !history.canRedo();
}
const viewport = createViewport({
  state,
  layers,
  mainCanvas,
  overlayCanvas,
  container,
  area,
  resizeHandles,
  zoomLabel: document.getElementById('zoom-label'),
  canvasSize: document.querySelector('.canvas-size'),
  coords: document.getElementById('coords'),
  composite,
  history
});
const { setupCanvasSize, fitCanvas, applyZoom, getPos } = viewport;
const DEFAULT_PALETTE = [
  '#000000','#ffffff','#808080','#c0c0c0','#ff0000','#800000','#ffff00','#808000',
  '#00ff00','#008000','#00ffff','#008080','#0000ff','#000080','#ff00ff','#800080',
  '#ffa500','#a52a2a','#ffc0cb','#add8e6','#90ee90','#f5deb3','#dda0dd','#20b2aa'
];
function buildPalette() {
  const el = document.getElementById('palette');
  el.innerHTML = '';
  DEFAULT_PALETTE.forEach(c => {
    const s = document.createElement('div');
    s.className = 'swatch';
    s.style.background = c;
    s.title = c;
    s.addEventListener('click', () => {
      state.fg = c;
      document.getElementById('fg-color').value = c;
    });
    s.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      state.bg = c;
      document.getElementById('bg-color').value = c;
    });
    el.appendChild(s);
  });
}
function renderLayersUI() {
  const list = document.getElementById('layers-list');
  list.innerHTML = '';
  // Top of list = top layer
  for (let i = layers.layers.length - 1; i >= 0; i--) {
    const L = layers.layers[i];
    const item = document.createElement('div');
    item.className = 'layer-item' + (i === layers.activeIndex ? ' active' : '');
    item.innerHTML = `
      <span class="vis" title="Toggle visibility">${L.visible ? '👁' : '–'}</span>
      <input type="text" value="${L.name}" data-idx="${i}">
    `;
    item.querySelector('.vis').addEventListener('click', (e) => {
      e.stopPropagation();
      L.visible = !L.visible;
      composite();
      renderLayersUI();
    });
    item.querySelector('input').addEventListener('change', (e) => {
      L.name = e.target.value || L.name;
    });
    item.addEventListener('click', () => {
      layers.setActive(i);
      history.clear(); // new layer history
      pushHistory();
      renderLayersUI();
    });
    list.appendChild(item);
  }
}
function setTool(name) {
  state.tool = name;
  document.querySelectorAll('.tool').forEach(b => {
    b.classList.toggle('active', b.dataset.tool === name);
  });
  selectionBox.hidden = true;
  state.selection = null;
  textBox.hidden = true;
}
function startDraw(e) {
  e.preventDefault();
  const p = getPos(e);
  state.drawing = true;
  state.startX = state.lastX = p.x;
  state.startY = state.lastY = p.y;
  const ctx = layers.active.ctx;
  if (state.tool === 'eyedropper') {
    const color = getPixelColor(mainCtx, p.x, p.y); // sample composite
    state.fg = color;
    document.getElementById('fg-color').value = color;
    state.drawing = false;
    return;
  }
  if (state.tool === 'fill') {
    pushHistory();
    floodFill(ctx, p.x, p.y, state.fg, state.fillTolerance);
    composite();
    state.drawing = false;
    return;
  }
  if (state.tool === 'text') {
    textBox.style.left = p.x + 'px';
    textBox.style.top = p.y + 'px';
    textBox.hidden = false;
    textInput.value = '';
    textInput.style.color = state.fg;
    textInput.focus();
    state.drawing = false;
    return;
  }
  if (state.tool === 'select') {
    state.selection = { x: p.x, y: p.y, w: 0, h: 0 };
    updateSelectionBox();
    return;
  }
  // Freehand tools start a history checkpoint
  if (['pencil', 'brush', 'eraser'].includes(state.tool)) {
    pushHistory();
  }
}
function moveDraw(e) {
  const p = getPos(e);
  document.getElementById('coords').textContent = `${Math.round(p.x)}, ${Math.round(p.y)}`;
  if (!state.drawing) return;
  e.preventDefault();
  const ctx = layers.active.ctx;
  const ox = overlayCtx;
  if (state.tool === 'select') {
    state.selection.w = p.x - state.startX;
    state.selection.h = p.y - state.startY;
    updateSelectionBox();
    return;
  }
  if (['line', 'rect', 'ellipse', 'roundrect'].includes(state.tool)) {
    ox.clearRect(0, 0, layers.width, layers.height);
    const opts = {
      color: state.fg,
      size: state.size,
      opacity: state.opacity
    };
    if (state.tool === 'line') {
      drawLine(ox, state.startX, state.startY, p.x, p.y, opts.color, opts.size, opts.opacity);
    } else if (state.tool === 'rect') {
      drawRect(ox, state.startX, state.startY, p.x, p.y, opts.color, opts.size, opts.opacity, false);
    } else if (state.tool === 'ellipse') {
      drawEllipse(ox, state.startX, state.startY, p.x, p.y, opts.color, opts.size, opts.opacity, false);
    } else if (state.tool === 'roundrect') {
      drawRoundRect(ox, state.startX, state.startY, p.x, p.y, opts.color, opts.size, opts.opacity, false);
    }
    return;
  }
  // Freehand
  if (state.tool === 'pencil' || state.tool === 'brush') {
    ctx.save();
    ctx.globalAlpha = state.opacity;
    ctx.strokeStyle = state.fg;
    ctx.lineWidth = state.tool === 'pencil' ? Math.max(1, state.size * 0.6) : state.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.restore();
    composite();
  } else if (state.tool === 'eraser') {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = state.opacity;
    ctx.lineWidth = state.size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(state.lastX, state.lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.restore();
    composite();
  }
  state.lastX = p.x;
  state.lastY = p.y;
}
function endDraw(e) {
  if (!state.drawing) return;
  state.drawing = false;
  const p = e ? getPos(e) : { x: state.lastX, y: state.lastY };
  const ctx = layers.active.ctx;
  overlayCtx.clearRect(0, 0, layers.width, layers.height);
  if (['line', 'rect', 'ellipse', 'roundrect'].includes(state.tool)) {
    pushHistory();
    const color = state.fg;
    const size = state.size;
    const opacity = state.opacity;
    if (state.tool === 'line') {
      drawLine(ctx, state.startX, state.startY, p.x, p.y, color, size, opacity);
    } else if (state.tool === 'rect') {
      drawRect(ctx, state.startX, state.startY, p.x, p.y, color, size, opacity, false);
    } else if (state.tool === 'ellipse') {
      drawEllipse(ctx, state.startX, state.startY, p.x, p.y, color, size, opacity, false);
    } else if (state.tool === 'roundrect') {
      drawRoundRect(ctx, state.startX, state.startY, p.x, p.y, color, size, opacity, false);
    }
    composite();
  }
  if (state.tool === 'select' && state.selection) {
    // Normalize selection
    let { x, y, w, h } = state.selection;
    if (w < 0) { x += w; w = -w; }
    if (h < 0) { y += h; h = -h; }
    state.selection = { x, y, w, h };
    updateSelectionBox();
  }
}
function updateSelectionBox() {
  if (!state.selection) {
    selectionBox.hidden = true;
    return;
  }
  let { x, y, w, h } = state.selection;
  if (w < 0) { x += w; w = -w; }
  if (h < 0) { y += h; h = -h; }
  selectionBox.style.left = x + 'px';
  selectionBox.style.top = y + 'px';
  selectionBox.style.width = w + 'px';
  selectionBox.style.height = h + 'px';
  selectionBox.hidden = false;
}
/* ===== Text commit ===== */
textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    commitText();
  }
  if (e.key === 'Escape') {
    textBox.hidden = true;
  }
});
function commitText() {
  const text = textInput.value;
  if (!text.trim()) {
    textBox.hidden = true;
    return;
  }
  pushHistory();
  const ctx = layers.active.ctx;
  const x = parseFloat(textBox.style.left);
  const y = parseFloat(textBox.style.top);
  ctx.save();
  ctx.globalAlpha = state.opacity;
  ctx.fillStyle = state.fg;
  ctx.font = `${Math.max(12, state.size * 4)}px system-ui, sans-serif`;
  ctx.textBaseline = 'top';
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * (state.size * 4 + 4));
  });
  ctx.restore();
  composite();
  textBox.hidden = true;
}
/* ===== UI bindings ===== */
document.querySelectorAll('.tool').forEach(btn => {
  btn.addEventListener('click', () => setTool(btn.dataset.tool));
});
document.getElementById('fg-color').addEventListener('input', e => {
  state.fg = e.target.value;
});
document.getElementById('bg-color').addEventListener('input', e => {
  state.bg = e.target.value;
});
document.getElementById('btn-swap-colors').addEventListener('click', () => {
  [state.fg, state.bg] = [state.bg, state.fg];
  document.getElementById('fg-color').value = state.fg;
  document.getElementById('bg-color').value = state.bg;
});
document.getElementById('brush-size').addEventListener('input', e => {
  state.size = +e.target.value;
  document.getElementById('size-val').textContent = state.size;
});
document.getElementById('brush-opacity').addEventListener('input', e => {
  state.opacity = +e.target.value / 100;
  document.getElementById('opacity-val').textContent = e.target.value + '%';
});
document.getElementById('fill-tolerance').addEventListener('input', e => {
  state.fillTolerance = +e.target.value;
});
document.getElementById('btn-undo').addEventListener('click', () => {
  const data = history.undo();
  if (data) {
    layers.active.ctx.putImageData(data, 0, 0);
    composite();
    updateUndoButtons();
  }
});
document.getElementById('btn-redo').addEventListener('click', () => {
  const data = history.redo();
  if (data) {
    layers.active.ctx.putImageData(data, 0, 0);
    composite();
    updateUndoButtons();
  }
});
document.getElementById('btn-clear').addEventListener('click', () => {
  pushHistory();
  const ctx = layers.active.ctx;
  ctx.clearRect(0, 0, layers.width, layers.height);
  if (layers.activeIndex === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, layers.width, layers.height);
  }
  composite();
});
document.getElementById('btn-new').addEventListener('click', () => {
  layers.layers = [];
  layers.addLayer('Background');
  history.clear();
  pushHistory();
  setupCanvasSize();
  renderLayersUI();
});
document.getElementById('btn-save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = layers.toDataURL('image/png');
  link.click();
});
document.getElementById('btn-open').addEventListener('click', () => {
  document.getElementById('file-input').click();
});
document.getElementById('file-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    layers.resize(img.width, img.height);
    layers.layers = [];
    layers.addLayer('Background');
    layers.active.ctx.drawImage(img, 0, 0);
    history.clear();
    pushHistory();
    setupCanvasSize();
    renderLayersUI();
  };
  img.src = URL.createObjectURL(file);
  e.target.value = '';
});
document.getElementById('btn-crop').addEventListener('click', () => {
  const { x, y, w, h } = state.selection;
  const newLayers = new LayerManager(Math.round(w), Math.round(h));
  newLayers.layers = [];
  for (const L of layers.layers) {
    const idx = newLayers.addLayer(L.name);
    const nl = newLayers.layers[idx];
    nl.visible = L.visible;
    nl.opacity = L.opacity;
    nl.ctx.drawImage(L.canvas, x, y, w, h, 0, 0, w, h);
  }
  // Replace
  Object.assign(layers, newLayers);
  layers.activeIndex = Math.min(layers.activeIndex, layers.layers.length - 1);
  history.clear();
  pushHistory();
  state.selection = null;
  selectionBox.hidden = true;
  setupCanvasSize();
  renderLayersUI();
});

document.getElementById('btn-add-layer').addEventListener('click', () => {
  layers.addLayer();
  history.clear();
  pushHistory();
  renderLayersUI();
  composite();
});
document.getElementById('btn-delete-layer').addEventListener('click', () => {
  if (layers.deleteLayer(layers.activeIndex)) {
    history.clear();
    pushHistory();
    renderLayersUI();
    composite();
  }
});
document.getElementById('btn-merge-down').addEventListener('click', () => {
  if (layers.mergeDown(layers.activeIndex)) {
    history.clear();
    pushHistory();
    renderLayersUI();
    composite();
  }
});

/* Pointer events */
mainCanvas.addEventListener('mousedown', startDraw);
mainCanvas.addEventListener('mousemove', moveDraw);
window.addEventListener('mouseup', endDraw);
mainCanvas.addEventListener('touchstart', startDraw, { passive: false });
mainCanvas.addEventListener('touchmove', moveDraw, { passive: false });
window.addEventListener('touchend', endDraw);

/* Keyboard */
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.ctrlKey && e.key === 'z') {
    e.preventDefault();
    document.getElementById('btn-undo').click();
  }
  if (e.ctrlKey && e.key === 'y') {
    e.preventDefault();
    document.getElementById('btn-redo').click();
  }
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    document.getElementById('btn-save').click();
  }
  if (e.ctrlKey && e.key === 'n') {
    e.preventDefault();
    document.getElementById('btn-new').click();
  }
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (state.selection && state.selection.w > 1) {
      pushHistory();
      const ctx = layers.active.ctx;
      const { x, y, w, h } = state.selection;
      ctx.clearRect(x, y, w, h);
      composite();
    }
  }
  // Tool shortcuts
  const map = { p: 'pencil', b: 'brush', e: 'eraser', f: 'fill', i: 'eyedropper', t: 'text', s: 'select', l: 'line', r: 'rect', o: 'ellipse' };
  if (!e.ctrlKey && map[e.key.toLowerCase()]) {
    setTool(map[e.key.toLowerCase()]);
  }
});

/* Init */
buildPalette();
setupCanvasSize();
fitCanvas();
pushHistory();
renderLayersUI();
setTool('pencil');