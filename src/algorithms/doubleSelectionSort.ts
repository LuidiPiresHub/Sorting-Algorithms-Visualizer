import { recordAlgorithmFrame } from '../animation/animateAlgorithm';
import { swap } from '../utils/swap';

export const doubleSelectionSort = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    let min = i;
    let max = i;

    for (let j = i; j < n - i; j++) {
      if (array[j] < array[min]) min = j;
      if (array[j] > array[max]) max = j;
    }

    swap(array, i, min);
    recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: min });


    if (max === i) max = min;

    const lastIndex = n - 1 - i;
    swap(array, max, lastIndex);
    recordAlgorithmFrame({ type: 'swap', indexA: max, indexB: lastIndex });
  }
};
