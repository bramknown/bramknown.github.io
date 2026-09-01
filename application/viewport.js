export function createViewport({ state, layers, mainCanvas, overlayCanvas, container, area, resizeHandles, zoomLabel, canvasSize, coords, setStatus, composite, history }) {
  const stage = document.getElementById('canvas-stage');
  const rulerX = document.querySelector('.ruler-x');
  const rulerY = document.querySelector('.ruler-y');
  const rulerCorner = document.getElementById('ruler-corner');

  function rulerInterval() {
    const targetSpacing = 55;
    const raw = targetSpacing / state.zoom;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const normalized = raw / magnitude;
    const multiple = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return multiple * magnitude;
  }

  function renderRuler() {
    const areaRect = area.getBoundingClientRect();
    const canvasRect = mainCanvas.getBoundingClientRect();
    const rulerXRect = rulerX.getBoundingClientRect();
    const rulerYRect = rulerY.getBoundingClientRect();
    const interval = rulerInterval();
    const minorInterval = interval / 5;
    rulerX.replaceChildren();
    rulerY.replaceChildren();
    const visibleWidth = area.clientWidth;
    const visibleHeight = area.clientHeight;
    const firstX = Math.floor((-canvasRect.left + areaRect.left) / (minorInterval * state.zoom)) - 1;
    const lastX = Math.ceil((visibleWidth - (canvasRect.left - areaRect.left)) / (minorInterval * state.zoom)) + 1;
    for (let i = firstX; i <= lastX; i++) {
      const position = canvasRect.left - rulerXRect.left + i * minorInterval * state.zoom;
      const tick = document.createElement('span');
      tick.className = `ruler-tick ${i % 5 === 0 ? 'major' : 'minor'}`;
      tick.style.left = `${position}px`;
      rulerX.appendChild(tick);
      if (i % 5 === 0) {
        const label = document.createElement('span');
        label.className = 'ruler-number';
        label.textContent = i * minorInterval;
        label.style.left = `${position + 2}px`;
        rulerX.appendChild(label);
      }
    }
    const firstY = Math.floor((-canvasRect.top + areaRect.top) / (minorInterval * state.zoom)) - 1;
    const lastY = Math.ceil((visibleHeight - (canvasRect.top - areaRect.top)) / (minorInterval * state.zoom)) + 1;
    for (let i = firstY; i <= lastY; i++) {
      const position = canvasRect.top - rulerYRect.top + i * minorInterval * state.zoom;
      const tick = document.createElement('span');
      tick.className = `ruler-tick ${i % 5 === 0 ? 'major' : 'minor'}`;
      tick.style.top = `${position}px`;
      rulerY.appendChild(tick);
      if (i % 5 === 0) {
        const label = document.createElement('span');
        label.className = 'ruler-number';
        label.textContent = i * minorInterval;
        label.style.top = `${position + 2}px`;
        rulerY.appendChild(label);
      }
    }
  }

  function updateHandleSize() {
    const screenSize = Math.min(14, Math.max(6, 9 / Math.sqrt(state.zoom)));
    const handleSize = screenSize / state.zoom;
    const handleOffset = handleSize / 2 + 1;
    resizeHandles.forEach(handle => {
      handle.style.setProperty('--handle-size', `${handleSize}px`);
      handle.style.setProperty('--handle-offset', `${handleOffset}px`);
    });
  }

  function updateRulers() {
    const rect = container.getBoundingClientRect();
    const areaRect = area.getBoundingClientRect();
    rulerX.style.left = `${areaRect.left + 28}px`;
    rulerX.style.top = `${areaRect.top}px`;
    rulerX.style.width = `${Math.max(0, areaRect.width - 28)}px`;
    rulerY.style.left = `${areaRect.left}px`;
    rulerY.style.top = `${areaRect.top + 20}px`;
    rulerY.style.height = `${Math.max(0, areaRect.height - 20)}px`;
    rulerCorner.style.left = `${areaRect.left}px`;
    rulerCorner.style.top = `${areaRect.top}px`;
    const originX = rect.left - areaRect.left + area.scrollLeft;
    const originY = rect.top - areaRect.top + area.scrollTop;
    const interval = rulerInterval();
    const step = Math.max(10, interval * state.zoom);
    rulerX.style.setProperty('--ruler-origin', `${originX}px`);
    rulerX.style.setProperty('--ruler-step', `${step}px`);
    rulerY.style.setProperty('--ruler-origin', `${originY}px`);
    rulerY.style.setProperty('--ruler-step', `${step}px`);
    rulerX.style.setProperty('--ruler-label-offset', `${originX}px`);
    rulerY.style.setProperty('--ruler-label-offset', `${originY}px`);
    renderRuler();
  }

  function applyZoom(anchor, previousZoom = state.zoom) {
    const nextZoom = Math.max(0.1, Math.min(8, state.zoom));
    state.zoom = nextZoom;
    const areaRect = area.getBoundingClientRect();
    const anchorClientX = anchor ? anchor.clientX : areaRect.left + area.clientWidth / 2;
    const anchorClientY = anchor ? anchor.clientY : areaRect.top + area.clientHeight / 2;
    const previousScrollLeft = area.scrollLeft;
    const previousScrollTop = area.scrollTop;
    const beforeStage = stage.getBoundingClientRect();
    const pointerX = anchorClientX - areaRect.left;
    const pointerY = anchorClientY - areaRect.top;
    const contentX = previousScrollLeft + pointerX;
    const contentY = previousScrollTop + pointerY;
    const stageOriginX = previousScrollLeft + beforeStage.left - areaRect.left;
    const stageOriginY = previousScrollTop + beforeStage.top - areaRect.top;
    const canvasX = (contentX - stageOriginX) / previousZoom;
    const canvasY = (contentY - stageOriginY) / previousZoom;
    container.style.transform = `scale(${state.zoom})`;
    
    // Extended zoom area: double the canvas size
    const extendedWidth = layers.width * 2 * state.zoom;
    const extendedHeight = layers.height * 2 * state.zoom;
    stage.style.width = `${extendedWidth}px`;
    stage.style.height = `${extendedHeight}px`;
    
    // Center canvas in extended area
    const canvasOffsetX = (layers.width / 2) * state.zoom;
    const canvasOffsetY = (layers.height / 2) * state.zoom;
    container.style.left = `${canvasOffsetX}px`;
    container.style.top = `${canvasOffsetY}px`;
    
    updateHandleSize();
    zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    updateRulers();
    if (anchor) {
      const afterStage = stage.getBoundingClientRect();
      const afterOriginX = area.scrollLeft + afterStage.left - areaRect.left;
      const afterOriginY = area.scrollTop + afterStage.top - areaRect.top;
      const targetLeft = afterOriginX + canvasX * state.zoom - pointerX;
      const targetTop = afterOriginY + canvasY * state.zoom - pointerY;
      area.scrollLeft = Math.max(0, Math.min(area.scrollWidth - area.clientWidth, targetLeft));
      area.scrollTop = Math.max(0, Math.min(area.scrollHeight - area.clientHeight, targetTop));
      updateRulers();
    }
  }

  function setupCanvasSize() {
    mainCanvas.width = layers.width;
    mainCanvas.height = layers.height;
    overlayCanvas.width = layers.width;
    overlayCanvas.height = layers.height;
    container.style.width = `${layers.width}px`;
    container.style.height = `${layers.height}px`;
    container.style.left = '0px';
    container.style.top = '0px';
    canvasSize.textContent = `${layers.width} x ${layers.height} px`;
    // Extend stage to double the canvas size for zoom area
    const extendedWidth = layers.width * 2 * state.zoom;
    const extendedHeight = layers.height * 2 * state.zoom;
    stage.style.width = `${extendedWidth}px`;
    stage.style.height = `${extendedHeight}px`;
    applyZoom();
    // Center canvas in viewport
    const scrollLeft = (area.scrollWidth - area.clientWidth) / 2;
    const scrollTop = (area.scrollHeight - area.clientHeight) / 2;
    area.scrollLeft = Math.max(0, scrollLeft);
    area.scrollTop = Math.max(0, scrollTop);
    composite();
  }

  function fitCanvas() {
    const availableWidth = area.clientWidth - 48;
    const availableHeight = area.clientHeight - 48;
    state.zoom = Math.max(0.1, Math.min(1, availableWidth / layers.width, availableHeight / layers.height));
    applyZoom();
    // Center canvas in viewport
    const scrollLeft = (area.scrollWidth - area.clientWidth) / 2;
    const scrollTop = (area.scrollHeight - area.clientHeight) / 2;
    area.scrollLeft = Math.max(0, scrollLeft);
    area.scrollTop = Math.max(0, scrollTop);
  }

  function getPos(e) {
    const rect = mainCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) / state.zoom,
      y: (clientY - rect.top) / state.zoom
    };
  }

  function zoomAtPointer(e, factor) {
    const previousZoom = state.zoom;
    const next = state.zoom * factor;
    state.zoom = Math.max(0.1, Math.min(8, next));
    applyZoom({ clientX: e.clientX, clientY: e.clientY }, previousZoom);
  }

  document.getElementById('btn-zoom-in').addEventListener('click', () => {
    const rect = area.getBoundingClientRect();
    zoomAtPointer({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, 1.25);
  });
  document.getElementById('btn-zoom-out').addEventListener('click', () => {
    const rect = area.getBoundingClientRect();
    zoomAtPointer({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, 0.8);
  });
  document.getElementById('btn-zoom-fit').addEventListener('click', fitCanvas);
  area.addEventListener('wheel', e => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 1) return;
    e.preventDefault();
    zoomAtPointer(e, e.deltaY < 0 ? 1.1 : 0.9);
  }, { passive: false });
  area.addEventListener('scroll', updateRulers);
  window.addEventListener('resize', updateRulers);

  let resizeState = null;
  resizeHandles.forEach(handle => {
    handle.addEventListener('pointerdown', e => {
      e.preventDefault();
      e.stopPropagation();
      resizeState = {
        mode: handle.dataset.resize,
        startX: e.clientX,
        startY: e.clientY,
        width: layers.width,
        height: layers.height,
        snapshots: layers.layers.map(layer => ({
          canvas: layer.canvas,
          name: layer.name,
          visible: layer.visible,
          opacity: layer.opacity
        }))
      };
      history.push(layers.active.ctx.getImageData(0, 0, layers.width, layers.height));
      handle.setPointerCapture(e.pointerId);
      setStatus('Resizing canvas');
    });
    handle.addEventListener('pointermove', e => {
      if (!resizeState) return;
      const deltaX = Math.round((e.clientX - resizeState.startX) / state.zoom);
      const deltaY = Math.round((e.clientY - resizeState.startY) / state.zoom);
      const nextWidth = Math.max(1, Math.min(4000, resizeState.width + (resizeState.mode.includes('w') ? -deltaX : resizeState.mode.includes('e') ? deltaX : 0)));
      const nextHeight = Math.max(1, Math.min(4000, resizeState.height + (resizeState.mode.includes('n') ? -deltaY : resizeState.mode.includes('s') ? deltaY : 0)));
      if (nextWidth === layers.width && nextHeight === layers.height) return;
      
      // Store scroll position before resize
      const prevScrollLeft = area.scrollLeft;
      const prevScrollTop = area.scrollTop;
      
      layers.resize(nextWidth, nextHeight);
      const offsetX = resizeState.mode.includes('w') ? nextWidth - resizeState.width : 0;
      const offsetY = resizeState.mode.includes('n') ? nextHeight - resizeState.height : 0;
      layers.layers.forEach((layer, index) => {
        const snapshot = resizeState.snapshots[index];
        layer.ctx.clearRect(0, 0, nextWidth, nextHeight);
        layer.ctx.drawImage(snapshot.canvas, offsetX, offsetY);
      });
      
      // Update canvas sizes WITHOUT changing zoom
      mainCanvas.width = layers.width;
      mainCanvas.height = layers.height;
      overlayCanvas.width = layers.width;
      overlayCanvas.height = layers.height;
      container.style.width = `${layers.width}px`;
      container.style.height = `${layers.height}px`;
      canvasSize.textContent = `${layers.width} x ${layers.height} px`;
      
      // Update extended stage size to maintain zoom area
      const extendedWidth = layers.width * 2 * state.zoom;
      const extendedHeight = layers.height * 2 * state.zoom;
      stage.style.width = `${extendedWidth}px`;
      stage.style.height = `${extendedHeight}px`;
      
      // Lock opposite corner by adjusting scroll based on resize direction
      let newScrollLeft = prevScrollLeft;
      let newScrollTop = prevScrollTop;
      const widthDiff = nextWidth - resizeState.width;
      const heightDiff = nextHeight - resizeState.height;
      
      if (resizeState.mode.includes('w')) {
        // Resizing from west: adjust scroll to lock east side
        newScrollLeft = prevScrollLeft + widthDiff * state.zoom;
      }
      if (resizeState.mode.includes('n')) {
        // Resizing from north: adjust scroll to lock south side
        newScrollTop = prevScrollTop + heightDiff * state.zoom;
      }
      
      area.scrollLeft = newScrollLeft;
      area.scrollTop = newScrollTop;
      updateHandleSize();
      composite();
      updateRulers();
    });
    handle.addEventListener('pointerup', e => {
      if (!resizeState) return;
      handle.releasePointerCapture(e.pointerId);
      resizeState = null;
      setStatus(`Canvas resized to ${layers.width} x ${layers.height}`);
    });
  });

  return { setupCanvasSize, fitCanvas, applyZoom, getPos, updateRulers };
}
