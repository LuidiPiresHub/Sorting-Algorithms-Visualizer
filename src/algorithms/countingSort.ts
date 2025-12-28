import { recordAlgorithmFrame } from '../animation/recordFrame';

export const countingSort = (array: number[]): void => {
  const n = array.length;
  const max = Math.max(...array);
  const count = new Array(max + 1).fill(0);
  const output = new Array(n);

  for (let i = 0; i < n; i++) {
    recordAlgorithmFrame({ type: 'current', index: i });
    count[array[i]]++;
  }
  
  for (let i = 1; i <= max; i++) {
    recordAlgorithmFrame({ type: 'current', index: i });
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const value = array[i];
    const pos = count[value] -= 1;
    output[pos] = value;
    recordAlgorithmFrame({ type: 'set', index: pos, value: value });
  }

  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
};