import type { IArrayModeFn } from '../arrayModes';

export type IFrame =
  | { type: 'swap', indexA: number, indexB: number }
  | { type: 'set', index: number, value: number };

export interface IAnimationOptions {
  speed: number;
  rafId: number | null;
  color: boolean;
  sound: boolean;
  drawFn: IArrayModeFn;
  image: HTMLImageElement;
};