import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

const heapify = (array: number[], start: number, end: number): void => {
  const value = array[start];
  let root = start;
  let child = 2 * root + 1;

  while (child < end) {
    if (child + 1 < end && array[child] < array[child + 1]) child++;
    array[root] = array[child];
    recordAlgorithmFrame({ type: 'set', index: root, value: array[child] });
    root = child;
    child = 2 * root + 1;
  }

  let parent = Math.floor((root - 1) / 2);
  while (root > start && array[parent] < value) {
    array[root] = array[parent];
    recordAlgorithmFrame({ type: 'set', index: root, value: array[parent] });
    root = parent;
    parent = Math.floor((root - 1) / 2);
  }

  array[root] = value;
  recordAlgorithmFrame({ type: 'set', index: root, value: value });
}

export const heapSort = (array: number[]): void => {
  const heapSize = array.length;

  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    heapify(array, i, heapSize);
  }

  for (let i = heapSize - 1; i > 0; i--) {
    swap(array, 0, i)
    recordAlgorithmFrame({ type: 'swap', indexA: 0, indexB: i });
    heapify(array, 0, i);
  }
}