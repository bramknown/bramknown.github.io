/** Drawing tools that operate on a layer context */

export function floodFill(ctx, x, y, fillColor, tolerance = 20) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const sx = Math.floor(x);
  const sy = Math.floor(y);
  if (sx < 0 || sy < 0 || sx >= w || sy >= h) return;

  const startIdx = (sy * w + sx) * 4;
  const sr = data[startIdx];
  const sg = data[startIdx + 1];
  const sb = data[startIdx + 2];
  const sa = data[startIdx + 3];

  // Parse fill color
  const tmp = document.createElement('canvas').getContext('2d');
  tmp.fillStyle = fillColor;
  tmp.fillRect(0, 0, 1, 1);
  const fc = tmp.getImageData(0, 0, 1, 1).data;
  const fr = fc[0], fg = fc[1], fb = fc[2], fa = 255;

  if (sr === fr && sg === fg && sb === fb && sa === fa) return;

  const stack = [[sx, sy]];
  const visited = new Uint8Array(w * h);

  const match = (idx) => {
    const dr = Math.abs(data[idx] - sr);
    const dg = Math.abs(data[idx + 1] - sg);
    const db = Math.abs(data[idx + 2] - sb);
    return dr + dg + db <= tolerance * 3;
  };

  while (stack.length) {
    const [cx, cy] = stack.pop();
    const i = cy * w + cx;
    if (visited[i]) continue;
    visited[i] = 1;
    const idx = i * 4;
    if (!match(idx)) continue;

    data[idx] = fr;
    data[idx + 1] = fg;
    data[idx + 2] = fb;
    data[idx + 3] = fa;

    if (cx > 0) stack.push([cx - 1, cy]);
    if (cx < w - 1) stack.push([cx + 1, cy]);
    if (cy > 0) stack.push([cx, cy - 1]);
    if (cy < h - 1) stack.push([cx, cy + 1]);
  }

  ctx.putImageData(imageData, 0, 0);
}

export function getPixelColor(ctx, x, y) {
  const d = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
  return `#${[d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

export function drawLine(ctx, x0, y0, x1, y1, color, size, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.restore();
}

export function drawRect(ctx, x0, y0, x1, y1, color, size, opacity, fill = false) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size;
  const x = Math.min(x0, x1);
  const y = Math.min(y0, y1);
  const w = Math.abs(x1 - x0);
  const h = Math.abs(y1 - y0);
  if (fill) ctx.fillRect(x, y, w, h);
  else ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

export function drawEllipse(ctx, x0, y0, x1, y1, color, size, opacity, fill = false) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const rx = Math.abs(x1 - x0) / 2;
  const ry = Math.abs(y1 - y0) / 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx || 0.5, ry || 0.5, 0, 0, Math.PI * 2);
  if (fill) ctx.fill();
  else ctx.stroke();
  ctx.restore();
}

export function drawRoundRect(ctx, x0, y0, x1, y1, color, size, opacity, fill = false, radius = 12) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size;
  const x = Math.min(x0, x1);
  const y = Math.min(y0, y1);
  const w = Math.abs(x1 - x0);
  const h = Math.abs(y1 - y0);
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  else ctx.stroke();
  ctx.restore();
}