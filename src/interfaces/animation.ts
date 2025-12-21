import type { RefObject } from 'react';
import type { IArrayModeFn } from './arrayMode';

export type IFrame =
  | { type: 'compare', indexA: number, indexB: number }
  | { type: 'swap', indexA: number, indexB: number }
  | { type: 'set', index: number, value: number }
  | { type: 'current', index: number }
  | { type: 'min', index: number }
  | { type: 'max', index: number }
  | { type: 'check', index: number }

export interface IAnimationOptions {
  speed: number;
  isAnimating: boolean;
  isColored: boolean;
  sound: boolean;
  drawFn: IArrayModeFn;
  image: HTMLImageElement;
  sortedSet: Set<number>;
};

export interface IAnimateAlgorithm {
  ctx: CanvasRenderingContext2D;
  array: number[];
  optionsRef: RefObject<IAnimationOptions>;
  duration?: number;
}
