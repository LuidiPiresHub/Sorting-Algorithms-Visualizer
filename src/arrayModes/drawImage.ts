import { CANVAS_SIZE } from '../constants/canvas';
import type { IArrayModeFn } from '../interfaces/arrayMode';

export const drawImage: IArrayModeFn = ({ ctx, array, optionsRef }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const img = optionsRef.current.image
  const pieces = array.length;

  const pieceW_img = img.width / pieces;
  const pieceW_canvas = CANVAS_SIZE / pieces;

  for (let i = 0; i < pieces; i++) {
    const ti = array[i] - 1

    const sx = Math.floor(ti * pieceW_img);
    const sy = 0;
    const sw = Math.ceil(pieceW_img);
    const sh = img.height;

    const dx = Math.floor(i * pieceW_canvas);
    const dy = 0;
    const dw = Math.ceil(pieceW_canvas);
    const dh = CANVAS_SIZE;

    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }
};