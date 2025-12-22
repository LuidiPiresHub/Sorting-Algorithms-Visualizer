import type { RefObject } from 'react';
import type { IAnimationOptions } from '../interfaces/animation';

const defaultColors = (ratio: number): string => {
  return `rgb(${255 * ratio}, ${255 * (1 - ratio)}, 255)`
};

const rainbowColors = (ratio: number): string => {
  return `hsl(${360 * ratio}, 100%, 50%)`;
};


export const getColors = (optionsRef: RefObject<IAnimationOptions>, ratio: number, index: number): string => {
  const { sortedSet, isColored, highlight, highlightSet, arrayLength } = optionsRef.current
  const radius = Math.max(0, Math.floor(arrayLength * 0.01));

  if (sortedSet.has(index)) return 'lime';

  if (highlight) {
    for (const h of highlightSet) {
      if (Math.abs(index - h) <= radius) {
        return isColored ? 'white' : 'red';
      }
    }
  }

  return isColored ? rainbowColors(ratio) : defaultColors(ratio);
}
