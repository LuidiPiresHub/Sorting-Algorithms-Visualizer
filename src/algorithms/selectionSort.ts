import { recordAlgorithmFrame } from '../animation/animateAlgorithm';
import { swap } from '../utils/swap';

export const selectionSort = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let min = i;
    recordAlgorithmFrame({ type: 'min', index: min });


    for (let j = i + 1; j < n; j++) {
      recordAlgorithmFrame({ type: 'compare', indexA: j, indexB: min });
      if (array[j] < array[min]) {
        min = j;
        recordAlgorithmFrame({ type: 'min', index: min });
      }
    }

    if (i !== min) {
      swap(array, i, min);
      recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: min });
    }
  }
};
