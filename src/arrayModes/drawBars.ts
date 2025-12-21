import { CANVAS_SIZE } from '../constants/canvas';
import type { IArrayModeFn } from '../interfaces/arrayMode';
import { getColors } from '../utils/colors';

export const drawBars: IArrayModeFn = ({ ctx, array, optionsRef }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const n = array.length;
  const w = CANVAS_SIZE / n;

  for (let i = 0; i < n; i++) {
    const ratio = array[i] / n;
    const h = ratio * CANVAS_SIZE;

    ctx.fillStyle = getColors(optionsRef, ratio, i);
    ctx.fillRect(Math.floor(w * i), CANVAS_SIZE - h, Math.ceil(w), h);
  }
};
