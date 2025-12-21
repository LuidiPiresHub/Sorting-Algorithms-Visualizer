import { CANVAS_SIZE } from '../constants/canvas';
import type { IArrayModeFn } from '../interfaces/arrayMode';

export const drawImage: IArrayModeFn = ({ ctx, array, optionsRef }): void => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  
  const { image } = optionsRef.current;
  const { width: cssW, height: cssH } = ctx.canvas.getBoundingClientRect();

  const scaleX = CANVAS_SIZE / cssW;
  const scaleY = CANVAS_SIZE / cssH;

  ctx.save();
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);

  const imgRatio = image.width / image.height;
  const canvasRatio = cssW / cssH;

  let drawW: number, drawH: number;

  if (imgRatio > canvasRatio) {
    drawW = cssW;
    drawH = drawW / imgRatio;
  } else {
    drawH = cssH;
    drawW = drawH * imgRatio;
  }

  const offsetX = (cssW - drawW) / 2;
  const offsetY = (cssH - drawH) / 2;

  const N = array.length;
  const pieceW_img = image.width / N;
  const pieceW_canvas = drawW / N;

  let xAcc = offsetX;

  for (let i = 0; i < N; i++) {
    const tileIndex = array[i] - 1;

    const sx = tileIndex * pieceW_img;
    const sw = pieceW_img;

    const dx = Math.round(xAcc);
    xAcc += pieceW_canvas;

    const nextX = Math.round(xAcc);
    const dw = nextX - dx;

    ctx.drawImage(
      image,
      sx,
      0,
      sw,
      image.height,
      dx,
      offsetY,
      dw,
      drawH
    );
  }

  ctx.restore();
};
