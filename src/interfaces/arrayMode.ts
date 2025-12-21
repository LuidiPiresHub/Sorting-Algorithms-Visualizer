import type { RefObject } from 'react';
import type { IAnimationOptions } from './animation';

interface IArrayModeParams {
  ctx: CanvasRenderingContext2D,
  array: number[],
  optionsRef: RefObject<IAnimationOptions>,
}

export type IArrayModeFn = (params: IArrayModeParams) => void;
