import { recordAlgorithmFrame } from '../animation/animateAlgorithm';

const merge = (array: number[], aux: number[], left: number, mid: number, right: number): void => {
  let i = left;
  let j = mid;
  let k = left;

  while (i < mid && j < right) {
    aux[k++] = array[i] < array[j] ? array[i++] : array[j++];
  }

  while (i < mid) aux[k++] = array[i++];
  while (j < right) aux[k++] = array[j++];

  for (let t = left; t < right; t++) {
    array[t] = aux[t];
    recordAlgorithmFrame({ type: 'set', index: t, value: aux[t] });
  }
};

export const mergeSortBottomUp = (array: number[]) => {
  const n = array.length;
  const aux = new Array(n);
  for (let width = 1; width < n; width *= 2) {
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);
      merge(array, aux, left, mid, right)
    }
  }
};
