import { recordAlgorithmFrame } from '../animation/animateAlgorithm';

export const insertionSort = (array: number[]): void => {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      recordAlgorithmFrame({ type: 'set', index: j + 1, value: array[j] });
      j--;
    }

    array[j + 1] = key;
    recordAlgorithmFrame({ type: 'set', index: j + 1, value: key });
  }
};
