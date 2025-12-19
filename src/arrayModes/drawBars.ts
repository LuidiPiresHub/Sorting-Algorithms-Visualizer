import type { IArrayModeFn } from '.';
import { CANVAS_SIZE } from '../constants/canvas';
import { defaultColors } from '../utils/arrayColors';

export const drawBars: IArrayModeFn = ({ ctx, array }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const n = array.length;
  const w = CANVAS_SIZE / n;

  for (let i = 0; i < n; i++) {
    const ratio = array[i] / n;
    const h = ratio * CANVAS_SIZE;

    ctx.fillStyle = defaultColors(ratio)
    ctx.fillRect(Math.floor(w * i), CANVAS_SIZE - h, Math.ceil(w), h);
  }
};
