import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

export const doubleSelectionSort = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    let min = i;
    let max = i;

    for (let j = i; j < n - i; j++) {
      recordAlgorithmFrame({ type: 'compare', indexA: j, indexB: min });
      if (array[j] < array[min]) {
        min = j;
        recordAlgorithmFrame({ type: 'min', index: min });
      }
      if (array[j] > array[max]) {
        max = j;
        recordAlgorithmFrame({ type: 'max', index: max });
      }
    }

    swap(array, i, min);
    recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: min });


    if (max === i) max = min;

    const lastIndex = n - 1 - i;
    swap(array, max, lastIndex);
    recordAlgorithmFrame({ type: 'swap', indexA: max, indexB: lastIndex });
  }
};
