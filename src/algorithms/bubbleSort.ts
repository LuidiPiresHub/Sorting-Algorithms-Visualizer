import { recordAlgorithmFrame } from '../animation/animateAlgorithm';
import { swap } from '../utils/swap';

export const bubbleSort = (array: number[]): void => {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        recordAlgorithmFrame({ type: 'swap', indexA: j, indexB: j + 1 });
        swapped = true;
      }
    }
    if (!swapped) break;
  }
};
