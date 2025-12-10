import { recordAlgorithmFrame } from '../animation/animateAlgorithm';

export const binaryInsertionSort = (array: number[]): void => {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];

    let left = 0;
    let right = i;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (key < array[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    for (let j = i; j > left; j--) {
      array[j] = array[j - 1];
      recordAlgorithmFrame({ type: 'set', index: j, value: array[j - 1] });
    }

    array[left] = key;
    recordAlgorithmFrame({ type: 'set', index: left, value: key });
  }
};