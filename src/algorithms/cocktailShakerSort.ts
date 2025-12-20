import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

export const cocktailShakerSort = (array: number[]): void => {
  let start = 0;
  let end = array.length - 1;
  let swapped = true;

  while (true) {
    swapped = false;

    for (let i = start; i < end; i++) {
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: i + 1 });
        swapped = true;
      }
    }

    if (!swapped) break;

    swapped = false;
    end--

    for (let j = end; j > start; j--) {
      if (array[j] < array[j - 1]) {
        swap(array, j, j - 1);
        recordAlgorithmFrame({ type: 'swap', indexA: j, indexB: j - 1 });
        swapped = true;
      }
    }

    start++
  }
}