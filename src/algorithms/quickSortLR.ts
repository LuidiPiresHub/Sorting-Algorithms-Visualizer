import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

export const quickSortLR = (array: number[]): void => {
  const stack: Array<[number, number]> = [[0, array.length - 1]];

  while (stack.length) {
    const [start, end] = stack.pop()!;
    const mid = Math.floor((start + end) / 2);

    if (array[start] > array[mid]) {
      swap(array, start, mid);
      recordAlgorithmFrame({ type: 'swap', indexA: start, indexB: mid });
    }

    if (array[start] > array[end]) {
      swap(array, start, end);
      recordAlgorithmFrame({ type: 'swap', indexA: start, indexB: end });
    }

    if (array[mid] > array[end]) {
      swap(array, mid, end);
      recordAlgorithmFrame({ type: 'swap', indexA: mid, indexB: end });
    }

    const pivot = array[mid];
    let i = start;
    let j = end;

    while (true) {
      while (array[i] < pivot){
        recordAlgorithmFrame({ type: 'current', index: i });
         i++;
      }
      while (array[j] > pivot) {
        recordAlgorithmFrame({ type: 'current', index: j });
        j--;
      }

      if (i >= j) break;
      swap(array, i, j);
      recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: j });

      i++;
      j--;
    }

    if (j + 1 < end) stack.push([j + 1, end]);
    if (start < j) stack.push([start, j]);
  }
};
