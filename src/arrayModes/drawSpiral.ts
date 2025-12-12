import { CANVAS_SIZE } from '../constants/canvas';
import { rainbowColors } from '../utils/arrayColors';

export const drawSpiral = (ctx: CanvasRenderingContext2D, array: number[]): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const { width: cssW, height: cssH } = ctx.canvas.getBoundingClientRect();
  const scaleX = CANVAS_SIZE / cssW;
  const scaleY = CANVAS_SIZE / cssH;

  ctx.save();
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

  const centerX = cssW / 2;
  const centerY = cssH / 2;
  const ringRadius = Math.min(cssW, cssH) / 2 - 20;
  const dotRadius = Math.min(cssW, cssH) < 300 ? 1 : 3;

  const n = array.length;
  const offset = -Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const angle = (i / n) * (Math.PI * 2) + offset;
    const ratio = array[i] / n;

    const r = ratio * ringRadius;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;

    ctx.fillStyle = rainbowColors(ratio);

    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
};
