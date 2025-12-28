import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

export const combSort = (array: number[]): void => {
  const n = array.length;
  const shrinkFactor = 1.3;

  let gap = n;
  let swapped = true;

  while (gap > 1 || swapped) {
    gap = Math.max(Math.floor(gap / shrinkFactor), 1);
    swapped = false;

    for (let i = 0; i + gap < n; i++) {
      recordAlgorithmFrame({ type: 'current', index: i + gap });
      if (array[i] > array[i + gap]) {
        swap(array, i, i + gap);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: i + gap });
        swapped = true;
      }
    }
  }
}