import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

const flip = (array: number[], k: number): void => {
  let start = 0;
  while (start < k) {
    swap(array, start, k);
    recordAlgorithmFrame({ type: 'swap', indexA: start, indexB: k })
    start++;
    k--;
  }
};

export const pancakeSort = (array: number[]): void => {
  for (let end = array.length - 1; end > 0; end--) {
    let maxIndex = 0;
    for (let i = 1; i <= end; i++) {
      if (array[i] > array[maxIndex]) {
        maxIndex = i;
      }
    }

    if (maxIndex !== end) {
      if (maxIndex > 0) {
        flip(array, maxIndex);
      }
      flip(array, end);
    }
  }
};
