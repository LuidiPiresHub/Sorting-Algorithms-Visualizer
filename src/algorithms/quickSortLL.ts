import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

export const quickSortLL = (array: number[]): void => {
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

    swap(array, mid, end);
    recordAlgorithmFrame({ type: 'swap', indexA: mid, indexB: end });

    const pivot = array[mid];
    let i = start - 1;

    for (let j = start; j < end; j++) {
      if (array[j] < pivot) {
        i++;
        swap(array, i, j);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: j });
      }
    }

    i++;
    swap(array, i, end);
    recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: end });

    if (i + 1 < end) stack.push([i + 1, end]);
    if (start < i) stack.push([start, i]);
  }
};
