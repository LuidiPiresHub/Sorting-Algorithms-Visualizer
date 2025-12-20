import { recordAlgorithmFrame } from '../animation/recordFrame';

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

const divide = (array: number[], aux: number[], left: number, right: number): void => {
  if (right - left <= 1) return;
  const mid = Math.floor((left + right) / 2);
  divide(array, aux, left, mid);
  divide(array, aux, mid, right);
  merge(array, aux, left, mid, right);
};

export const mergeSortTopDown = (array: number[]): void => {
  const n = array.length;
  const aux = new Array(n);
  const left = 0;
  const right = array.length;
  divide(array, aux, left, right);
};
