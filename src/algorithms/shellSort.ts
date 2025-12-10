import { recordAlgorithmFrame } from '../animation/animateAlgorithm';

export const shellSort = (array: number[]): void => {
  const n = array.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const key = array[i];
      let j = i

      while (j >= gap && array[j - gap] > key) {
        array[j] = array[j - gap];
        recordAlgorithmFrame({ type: 'set', index: j, value: array[j - gap] });
        j -= gap;
      }

      array[j] = key;
      recordAlgorithmFrame({ type: 'set', index: j, value: key });
    }
    gap = Math.floor(gap / 2);
  }
};
