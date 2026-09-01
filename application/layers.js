/** Simple layer manager. Each layer owns an offscreen canvas. */
export class LayerManager {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.layers = [];
    this.activeIndex = 0;
    this.addLayer('Background');
  }

  addLayer(name = `Layer ${this.layers.length + 1}`) {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d', { alpha: true });
    // Transparent by default except first layer
    if (this.layers.length === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, this.width, this.height);
    }
    this.layers.push({
      name,
      canvas,
      ctx,
      visible: true,
      opacity: 1
    });
    this.activeIndex = this.layers.length - 1;
    return this.activeIndex;
  }

  deleteLayer(index) {
    if (this.layers.length <= 1) return false;
    this.layers.splice(index, 1);
    if (this.activeIndex >= this.layers.length) {
      this.activeIndex = this.layers.length - 1;
    }
    return true;
  }

  mergeDown(index) {
    if (index <= 0) return false;
    const upper = this.layers[index];
    const lower = this.layers[index - 1];
    lower.ctx.globalAlpha = upper.opacity;
    lower.ctx.drawImage(upper.canvas, 0, 0);
    lower.ctx.globalAlpha = 1;
    this.layers.splice(index, 1);
    this.activeIndex = index - 1;
    return true;
  }

  get active() {
    return this.layers[this.activeIndex];
  }

  setActive(index) {
    if (index >= 0 && index < this.layers.length) {
      this.activeIndex = index;
    }
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    for (const layer of this.layers) {
      const old = layer.canvas;
      const nc = document.createElement('canvas');
      nc.width = width;
      nc.height = height;
      const nctx = nc.getContext('2d', { alpha: true });
      nctx.drawImage(old, 0, 0);
      layer.canvas = nc;
      layer.ctx = nctx;
    }
  }

  /** Composite all visible layers onto a target 2d context */
  composite(targetCtx) {
    targetCtx.clearRect(0, 0, this.width, this.height);
    for (const layer of this.layers) {
      if (!layer.visible) continue;
      targetCtx.globalAlpha = layer.opacity;
      targetCtx.drawImage(layer.canvas, 0, 0);
    }
    targetCtx.globalAlpha = 1;
  }

  /** Export flattened PNG data URL */
  toDataURL(type = 'image/png', quality) {
    const c = document.createElement('canvas');
    c.width = this.width;
    c.height = this.height;
    this.composite(c.getContext('2d'));
    return c.toDataURL(type, quality);
  }
}