import { recordAlgorithmFrame } from '../animation/animateAlgorithm';
import { swap } from '../utils/swap';

export const selectionSort = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let min = i;

    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[min]) min = j;
    }

    if (i !== min) {
      swap(array, i, min);
      recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: min });
    }
  }
};
