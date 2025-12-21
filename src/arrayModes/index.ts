import type { IArrayModeFn } from '../interfaces/arrayMode';
import { drawBars } from './drawBars';
import { drawCircle } from './drawCircle';
import { drawImage } from './drawImage';
import { drawSpiral } from './drawSpiral';

export const arrayModesMap = {
  'Bars': drawBars,
  'Circle': drawCircle,
  'Spiral': drawSpiral,
  'Image': drawImage,
} satisfies Record<string, IArrayModeFn>

export type IArrayMode = keyof typeof arrayModesMap;