import { recordAlgorithmFrame } from '../animation/recordFrame';

const countingSortByDigit = (array: number[], start: number, end: number, exp: number, base: number): void => {
  const n = end - start;
  const count = Array.from<number>({ length: base }).fill(0);
  const output = new Array<number>(n);

  for (let i = start; i < end; i++) {
    const value = array[i];
    const digit = Math.floor(value / exp) % base;
    count[digit]++;
    recordAlgorithmFrame({ type: 'current', index: i });
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = end - 1; i >= start; i--) {
    const value = array[i];
    const digit = Math.floor(value / exp) % base;
    const pos = --count[digit];
    output[pos] = value;
    recordAlgorithmFrame({ type: 'bucket', index: start + pos, value, buckets: [...count.map((c) => start + c)] });
  }

  for (let i = 0; i < n; i++) {
    array[start + i] = output[i];
  }
};

const radixMSD = (array: number[], start: number, end: number, exp: number, base: number): void => {
  if (end - start <= 1 || exp <= 0) return;

  countingSortByDigit(array, start, end, exp, base);

  let bucketStart = start;

  for (let digit = 0; digit < base; digit++) {
    let bucketEnd = bucketStart;

    while (bucketEnd < end && Math.floor(array[bucketEnd] / exp) % base === digit) {
      bucketEnd++
    }

    radixMSD(array, bucketStart, bucketEnd, Math.floor(exp / base), base);
    bucketStart = bucketEnd;
  }
};

export const radixSortMSD = (array: number[], base?: number): void => {
  if (!base) return;

  const start = 0;
  const end = array.length;
  const max = Math.max(...array);
  let exp = 1;

  while (Math.floor(max / exp) >= base) {
    exp *= base;
  }

  radixMSD(array, start, end, exp, base);
}
