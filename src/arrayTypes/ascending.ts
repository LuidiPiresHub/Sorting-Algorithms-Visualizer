import { recordAlgorithmFrame } from '../animation/recordFrame';

export const ascending = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    const value = i + 1;
    array[i] = value;
    recordAlgorithmFrame({ type: 'set', index: i, value });
  }
};
