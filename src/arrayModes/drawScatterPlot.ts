import { CANVAS_SIZE } from '../constants/canvas';
import type { IArrayModeFn } from '../interfaces/arrayMode';
import { getColors } from '../utils/colors';

export const drawScatterPlot: IArrayModeFn = ({ ctx, array, optionsRef }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  const n = array.length;
  const xStep = CANVAS_SIZE / n;
  const yScale = CANVAS_SIZE / n;
  const dotSize = 8;

  for (let i = 0; i < n; i++) {
    const value = array[i];
    const x = i * xStep;
    const y = CANVAS_SIZE - value * yScale;
    const ratio = value / n;

    ctx.fillStyle = getColors(optionsRef, ratio, i);
    ctx.fillRect(x, y, dotSize, dotSize);
  }
};
