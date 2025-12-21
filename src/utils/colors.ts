import type { RefObject } from 'react';
import type { IAnimationOptions } from '../interfaces/animation';

const defaultColors = (ratio: number): string => {
  return `rgb(${255 * ratio}, ${255 * (1 - ratio)}, 255)`
};

const rainbowColors = (ratio: number): string => {
  return `hsl(${360 * ratio}, 100%, 50%)`;
};

export const getColors = (optionsRef: RefObject<IAnimationOptions>, ratio: number, index: number): string => {
  const { sortedSet, isColored, highlight: { persistent, transient } } = optionsRef.current
  if (sortedSet.has(index)) return 'lime';

if (transient.has(index)) return 'red';
if (persistent.get('min') === index) return 'blue';
if (persistent.get('max') === index) return 'yellow';
if (persistent.get('current') === index) return 'black';

  if (isColored) return rainbowColors(ratio)
  return defaultColors(ratio)
}
