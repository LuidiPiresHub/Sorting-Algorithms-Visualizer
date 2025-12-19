import { recordAlgorithmFrame } from '../animation/animateAlgorithm';

function getDigit(num: number, p: number, base: number): number {
  return Math.floor(num / base ** p) % base;
}

function countDigits(num: number, base: number): number {
  if (num === 0) return 1;
  return Math.floor(Math.log(num) / Math.log(base)) + 1;
}

function msdSortInPlace(
  arr: number[],
  start: number,
  end: number,
  p: number,
  base: number
): void {
  if (end - start <= 1 || p < 0) return;

  const buckets: number[][] = Array.from({ length: base }, () => []);

  for (let i = start; i < end; i++) {
    // recordAlgorithmFrame({ type: 'read', index: i });
    const digit = getDigit(arr[i], p, base);
    buckets[digit].push(arr[i]);
  }

  let index = end - 1;

  for (let b = buckets.length - 1; b >= 0; b--) {
    const bucket = buckets[b];

    for (let i = bucket.length - 1; i >= 0; i--) {
      const num = bucket[i];

      arr[index] = num;
      recordAlgorithmFrame({ type: 'set', index, value: num });

      index--;
    }
  }


  index = start;
  for (const bucket of buckets) {
    const size = bucket.length;
    if (size > 1) {
      msdSortInPlace(arr, index, index + size, p - 1, base);
    }
    index += size;
  }
}

export function radixSortMSD(arr: number[], base: number = 10): void {
  if (arr.length === 0) return;

  const max = Math.max(...arr);
  const k = countDigits(max, base);

  msdSortInPlace(arr, 0, arr.length, k - 1, base);
}
