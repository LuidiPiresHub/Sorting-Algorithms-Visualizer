import type { IArrayModeFn } from '../interfaces/arrayMode';
import { drawBars } from './drawBars';
import { drawCircle } from './drawCircle';
import { drawSpiral } from './drawSpiral';
import { drawPyramid } from './drawPyramid';
import { drawImage } from './drawImage';

export const arrayModesMap = {
  'Bars': drawBars,
  'Circle': drawCircle,
  'Spiral': drawSpiral,
  'Pyramid': drawPyramid,
  'Image': drawImage,
} satisfies Record<string, IArrayModeFn>

export type IArrayMode = keyof typeof arrayModesMap;