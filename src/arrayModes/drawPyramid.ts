import { CANVAS_SIZE } from '../constants/canvas';
import type { IArrayModeFn } from '../interfaces/arrayMode';
import { getColors } from '../utils/colors';

export const drawPyramid: IArrayModeFn = ({ ctx, array, optionsRef }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const n = array.length;
  const h = CANVAS_SIZE / n;

  for (let i = 0; i < n; i++) {
    const ratio = array[i] / n;
    const w = ratio * CANVAS_SIZE;

    ctx.fillStyle = getColors(optionsRef, ratio, i);
    ctx.fillRect((CANVAS_SIZE - w) / 2, Math.floor(i * h), w, Math.ceil(h));
  }
};
