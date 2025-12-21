import type { RefObject } from 'react';
import type { IAnimationOptions } from '../interfaces/animation';

const defaultColors = (ratio: number): string => {
  return `rgb(${255 * ratio}, ${255 * (1 - ratio)}, 255)`
};

const rainbowColors = (ratio: number): string => {
  return `hsl(${360 * ratio}, 100%, 50%)`;
};

export const getColors = (optionsRef: RefObject<IAnimationOptions>, ratio: number, index: number): string => {
  const { sortedSet, isColored } = optionsRef.current
  if (sortedSet.has(index)) return 'lime';
  if (isColored) return rainbowColors(ratio)
  return defaultColors(ratio)
}
