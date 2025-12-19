import { recordAlgorithmFrame } from '../animation/animateAlgorithm';

const countingSortByDigit = (array: number[], exp: number, base: number): void => {
  const n = array.length;
  const count = new Array(base).fill(0);
  const output = new Array(n);

  for (let i = 0; i < n; i++) {
    const value = array[i];
    const digit = Math.floor(value / exp) % base;
    count[digit]++;
  }

  let running = 0;
  for (let i = 0; i < base; i++) {
    const old = count[i];
    count[i] = running;
    running += old;
  }

  for (let i = 0; i < n; i++) {
    const value = array[i];
    const digit = Math.floor(value / exp) % base;
    const pos = count[digit];
    output[pos] = value;
    count[digit]++;
    recordAlgorithmFrame({ type: 'set', index: pos, value: value });

  }

  for (let i = 0; i < n; i++) {
    array[i] = output[i];
    recordAlgorithmFrame({ type: 'set', index: i, value: output[i] });
  }
};

export const radixSortLSD = (array: number[], base: number = 4): void => {
  const max = Math.max(...array);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(array, exp, base);
    exp *= base;
  }
};
