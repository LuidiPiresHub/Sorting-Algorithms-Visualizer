import type { RefObject } from 'react';
import type { IAnimationOptions } from '../interfaces/animation';
import { drawBars } from './drawBars';
import { drawCircle } from './drawCircle';
import { drawImage } from './drawImage';
import { drawSpiral } from './drawSpiral';

export type IArrayModeFn = (ctx: CanvasRenderingContext2D, array: number[], optionsRef: RefObject<IAnimationOptions>) => void;

export const arrayModesMap = {
  'Bars': drawBars,
  'Circle': drawCircle,
  'Spiral': drawSpiral,
  'Image': drawImage,
} satisfies Record<string, IArrayModeFn>

export type IArrayMode = keyof typeof arrayModesMap;