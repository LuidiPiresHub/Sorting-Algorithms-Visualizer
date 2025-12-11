import { CANVAS_SIZE } from '../constants/canvas';
import { rainbowColors } from '../utils/arrayColors';

export const drawCircle = (ctx: CanvasRenderingContext2D, array: number[]): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const { width: cssW, height: cssH } = ctx.canvas.getBoundingClientRect();

  const scaleX = CANVAS_SIZE / cssW;
  const scaleY = CANVAS_SIZE / cssH;

  ctx.save();
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

  const size = Math.min(cssW, cssH);
  const centerX = cssW / 2;
  const centerY = cssH / 2;
  const radius = size / 2 - 20;

  const n = array.length;
  const offset = -Math.PI / 2;

  for (let i = 0; i < n; i++) {
    const startAngle = (i / n) * Math.PI * 2 + offset;
    const endAngle = ((i + 1) / n) * Math.PI * 2 + offset;

    const ratio = array[i] / n;
    ctx.fillStyle = rainbowColors(ratio);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fill();
  }

  ctx.restore();
};
