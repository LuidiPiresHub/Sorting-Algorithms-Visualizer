import { CANVAS_SIZE } from '../constants/canvas';
import type { IArrayModeFn } from '../interfaces/arrayMode';

export const drawImage: IArrayModeFn = ({ ctx, array, optionsRef }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = 'rgb(30,30,50)';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const img = optionsRef.current.image;
  const pieces = array.length;

  const { width: visualW, height: visualH } = ctx.canvas.getBoundingClientRect();

  const scaleX = CANVAS_SIZE / visualW;
  const scaleY = CANVAS_SIZE / visualH;

  const scale = Math.min(visualW / img.width, visualH / img.height);
  const scaledVisualW = Math.round(img.width * scale);
  const scaledVisualH = Math.round(img.height * scale);

  const visualOffsetX = Math.round((visualW - scaledVisualW) / 2);
  const visualOffsetY = Math.round((visualH - scaledVisualH) / 2);

  const offsetX = Math.round(visualOffsetX * scaleX);
  const offsetY = Math.round(visualOffsetY * scaleY);
  const canvasW = Math.round(scaledVisualW * scaleX);
  const canvasH = Math.round(scaledVisualH * scaleY);

  const pieceW_img = img.width / pieces;
  const pieceW_canvas = canvasW / pieces;

  for (let i = 0; i < pieces; i++) {
    const ti = array[i] - 1;

    const sx = Math.floor(ti * pieceW_img);
    const sy = 0;
    const sw = Math.ceil(pieceW_img);
    const sh = img.height;

    const dx = Math.floor(offsetX + i * pieceW_canvas);
    const dy = offsetY;
    const dw = Math.ceil(pieceW_canvas);
    const dh = canvasH;

    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }
};