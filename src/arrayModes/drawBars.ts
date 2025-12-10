import { CANVAS_SIZE } from '../constants/canvas';

export const drawBars = (ctx: CanvasRenderingContext2D, array: number[]): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const n = array.length;
  const w = CANVAS_SIZE / n;

  for (let i = 0; i < n; i++) {
    const ratio = array[i] / n;
    const h = ratio * CANVAS_SIZE;

    ctx.fillStyle = `rgb(${255 * ratio}, ${255 * (1 - ratio)}, 255)`;
    ctx.fillRect(Math.floor(w * i), CANVAS_SIZE - h, Math.ceil(w), h);
  }
};
