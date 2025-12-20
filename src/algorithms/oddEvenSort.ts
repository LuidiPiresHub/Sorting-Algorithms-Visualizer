import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

export const oddEvenSort = (array: number[]): void => {
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 1; i < array.length - 1; i += 2) {
      recordAlgorithmFrame({ type: 'compare', indexA: i, indexB: i + 1 });
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: i + 1 });
        sorted = false;
      }
    }

    for (let i = 0; i < array.length - 1; i += 2) {
      recordAlgorithmFrame({ type: 'compare', indexA: i, indexB: i + 1 });
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: i + 1 });
        sorted = false;
      }
    }
  }
};
