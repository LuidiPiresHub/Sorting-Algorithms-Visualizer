import type { RefObject } from 'react';
import type { IArrayModeFn } from './arrayMode';

export type IFrame =
  | { type: 'swap', indexA: number, indexB: number }
  | { type: 'set', index: number, value: number }
  | { type: 'current', index: number }
  | { type: 'compare', indices: number[] }
  | { type: 'check', index: number }
  | { type: 'bucket', index: number, value: number, buckets: number[] }

export interface IAnimationOptions {
  speed: number;
  isAnimating: boolean;
  isColored: boolean;
  sound: boolean;
  highlight: boolean;
  drawFn: IArrayModeFn;
  image: HTMLImageElement;
  sortedSet: Set<number>;
  highlightSet: Set<number>
  arrayLength: number;
};

export interface IAnimateAlgorithm {
  ctx: CanvasRenderingContext2D;
  array: number[];
  optionsRef: RefObject<IAnimationOptions>;
  duration?: number;
}
