import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

const insertionSort = (array: number[], start: number, end: number): void => {
  for (let i = start + 1; i < end + 1; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= start && array[j] > key) {
      array[j + 1] = array[j];
      recordAlgorithmFrame({ type: 'set', index: j + 1, value: array[j] });
      j--;
    }

    array[j + 1] = key;
    recordAlgorithmFrame({ type: 'set', index: j + 1, value: key });
  }
}

const heapify = (array: number[], start: number, end: number, offset: number): void => {
  const current = array[offset + start];
  let root = start;
  let child = root * 2 + 1;

  while (child < end) {
    if (child + 1 < end && array[offset + child] < array[offset + child + 1]) child++;
    array[offset + root] = array[offset + child];
    recordAlgorithmFrame({ type: 'set', index: offset + root, value: array[offset + child] });
    root = child;
    child = root * 2 + 1;
  }

  let lastParent = Math.floor((root - 1) / 2);
  while (root > start && array[offset + lastParent] < current) {
    array[offset + root] = array[offset + lastParent];
    recordAlgorithmFrame({ type: 'set', index: offset + root, value: array[offset + lastParent] });
    root = lastParent;
    lastParent = Math.floor((root - 1) / 2);
  }

  array[offset + root] = current;
  recordAlgorithmFrame({ type: 'set', index: offset + root, value: current });

};

const heapSort = (array: number[], start: number, end: number): void => {
  const heapSize = end - start + 1;
  const lastParent = Math.floor(heapSize / 2) - 1;

  for (let i = lastParent; i >= 0; i--) {
    heapify(array, i, heapSize, start);
  }

  for (let i = heapSize - 1; i > 0; i--) {
    swap(array, start, start + i);
    recordAlgorithmFrame({ type: 'swap', indexA: start, indexB: start + i });
    heapify(array, 0, i, start);
  }
};

const medianOfThree = (array: number[], start: number, end: number): number => {
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
  return mid;
}

const partition = (array: number[], start: number, end: number): number => {
  const medianIndex = medianOfThree(array, start, end);
  const pivot = array[medianIndex];
  let i = start;
  let j = end;

  while (true) {
    while (array[i] < pivot) i++;
    while (array[j] > pivot) j--;

    if (i >= j) return j;
    swap(array, i, j);
    recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: j });

    i++;
    j--;
  }
}

export const introSort = (array: number[]): void => {
  const n = array.length;
  const stack = [[0, n - 1, 0]];
  const threshold = 64; // Nota: normalmente entre 16 - 32, aumentado para facilitar a visualização do InsertionSort
  const depthLimit = Math.floor(0.9 * Math.log2(n)); // Nota: O valor original é 2 * log2(n); reduzido para acionar o HeapSort mais cedo e facilitar sua visualização.

  while (stack.length) {
    const [start, end, depth] = stack.pop()!;
    const partitionSize = end - start + 1

    if (partitionSize <= threshold) {
      insertionSort(array, start, end);
      continue;
    }

    if (depth >= depthLimit) {
      heapSort(array, start, end);
      continue;
    }

    const cutIndex = partition(array, start, end);

    if (cutIndex + 1 < end) stack.push([cutIndex + 1, end, depth + 1]);
    if (start < cutIndex) stack.push([start, cutIndex, depth + 1]);
  }
}