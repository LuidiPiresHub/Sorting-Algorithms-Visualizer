import { recordAlgorithmFrame } from '../animation/recordFrame';

export const descending = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    const value = n - i;
    array[i] = value;
    recordAlgorithmFrame({ type: 'set', index: i, value });
  }
};
