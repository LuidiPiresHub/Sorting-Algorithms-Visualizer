import { recordAlgorithmFrame } from '../animation/recordFrame';
import { swap } from '../utils/swap';

interface Run {
  start: number;
  end: number;
}

let minGallop = 7;

const gallopLeft = (key: number, array: number[], start: number, length: number): number => {
  let lo = start;
  let hi = start + length;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (array[mid] < key) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const gallopRight = (key: number, array: number[], start: number, length: number): number => {
  let lo = start;
  let hi = start + length;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (array[mid] <= key) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const reverseGallopLeft = (key: number, array: number[], start: number, length: number): number => {
  let lo = start - length + 1;
  let hi = start + 1;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (array[mid] < key) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const reverseGallopRight = (key: number, array: number[], start: number, length: number): number => {
  let lo = start - length + 1;
  let hi = start + 1;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (array[mid] <= key) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const merge = (array: number[], leftRun: Run, rightRun: Run): Run => {
  const leftStart = leftRun.start;
  const leftEnd = leftRun.end;
  const rightStart = rightRun.start;
  const rightEnd = rightRun.end;

  const leftLen = leftEnd - leftStart;
  const rightLen = rightEnd - rightStart;

  const aux = new Array(Math.min(leftLen, rightLen));

  if (leftLen <= rightLen) {

    for (let i = 0; i < leftLen; i++) {
      aux[i] = array[leftStart + i];
    }

    let i = 0;
    let j = rightStart;
    let k = leftStart;

    let countLeft = 0;
    let countRight = 0;

    while (i < leftLen && j < rightEnd) {
      if (aux[i] <= array[j]) {
        array[k++] = aux[i++];
        recordAlgorithmFrame({ type: 'set', index: k - 1, value: aux[i - 1] });
        countLeft++;
        countRight = 0;
      } else {
        array[k++] = array[j++];
        recordAlgorithmFrame({ type: 'set', index: k - 1, value: array[j - 1] });
        countRight++;
        countLeft = 0;
      }

      if (countLeft >= minGallop || countRight >= minGallop) {

        if (countLeft >= minGallop) {
          const newJ = gallopRight(aux[i], array, j, rightEnd - j);
          const n = newJ - j;

          for (let t = 0; t < n; t++) {
            array[k++] = array[j++];
            recordAlgorithmFrame({ type: 'set', index: k - 1, value: array[j - 1] });
          }

          if (i >= leftLen || j >= rightEnd) break;
          array[k++] = aux[i++];
          recordAlgorithmFrame({ type: 'set', index: k - 1, value: aux[i - 1] });
        } else {
          const newI = gallopLeft(array[j], aux, i, leftLen - i);
          const n = newI - i;

          for (let t = 0; t < n; t++) {
            array[k++] = aux[i++];
            recordAlgorithmFrame({ type: 'set', index: k - 1, value: aux[i - 1] });
          }

          if (i >= leftLen || j >= rightEnd) break;
          array[k++] = array[j++];
          recordAlgorithmFrame({ type: 'set', index: k - 1, value: array[j - 1] });
        }

        minGallop++;
        countLeft = 0;
        countRight = 0;
      }
    }

    while (i < leftLen) {
      array[k++] = aux[i++];
      recordAlgorithmFrame({ type: 'set', index: k - 1, value: aux[i - 1] });
    }

  } else {
    for (let i = 0; i < rightLen; i++) {
      aux[i] = array[rightStart + i];
    }

    let i = rightLen - 1;
    let j = leftEnd - 1;
    let k = rightEnd - 1;

    let countLeft = 0;
    let countRight = 0;

    while (i >= 0 && j >= leftStart) {
      if (aux[i] >= array[j]) {
        array[k--] = aux[i--];
        recordAlgorithmFrame({ type: 'set', index: k + 1, value: aux[i + 1] });
        countLeft++;
        countRight = 0;
      } else {
        array[k--] = array[j--];
        recordAlgorithmFrame({ type: 'set', index: k + 1, value: array[j + 1] });
        countRight++;
        countLeft = 0;
      }

      if (countLeft >= minGallop || countRight >= minGallop) {

        if (countLeft >= minGallop) {
          const newJ = reverseGallopRight(aux[i], array, j, j - leftStart + 1);
          const n = j - newJ;

          for (let t = 0; t < n; t++) {
            array[k--] = array[j--];
            recordAlgorithmFrame({ type: 'set', index: k + 1, value: array[j + 1] });
          }
          if (i < 0 || j < leftStart) break;

          array[k--] = aux[i--];
          recordAlgorithmFrame({ type: 'set', index: k + 1, value: aux[i + 1] });
        } else {
          const newI = reverseGallopLeft(array[j], aux, i, i + 1);
          const n = i - newI;

          for (let t = 0; t < n; t++) {
            array[k--] = aux[i--];
            recordAlgorithmFrame({ type: 'set', index: k + 1, value: aux[i + 1] });
          }
          if (i < 0 || j < leftStart) break;

          array[k--] = array[j--];
          recordAlgorithmFrame({ type: 'set', index: k + 1, value: array[j + 1] });
        }

        minGallop++;
        countLeft = 0;
        countRight = 0;
      }
    }

    while (i >= 0) {
      array[k--] = aux[i--];
      recordAlgorithmFrame({ type: 'set', index: k + 1, value: aux[i + 1] });
    }
  }

  return { start: leftStart, end: rightEnd };
};

const fixInvariants = (array: number[], stack: Run[]): void => {
  while (stack.length >= 2) {
    if (stack.length >= 3) {
      const n = stack.length - 1;
      const A = stack[n - 2];
      const B = stack[n - 1];
      const C = stack[n];

      const lenA = A.end - A.start;
      const lenB = B.end - B.start;
      const lenC = C.end - C.start;

      const cond1 = lenA <= lenB + lenC;
      const cond2 = lenB <= lenC;

      if (cond1 || cond2) {
        if (lenA < lenC) {
          const merged = merge(array, A, B);
          stack.splice(n - 2, 2, merged);
        } else {
          const merged = merge(array, B, C);
          stack.splice(n - 1, 2, merged);
        }
        continue;
      }
    }

    const n = stack.length - 1;
    const B = stack[n - 1];
    const C = stack[n];

    const lenB = B.end - B.start;
    const lenC = C.end - C.start;

    if (lenB <= lenC) {
      const merged = merge(array, B, C);
      stack.splice(n - 1, 2, merged);
      continue;
    }

    break;
  }
};

const insertionSort = (array: number[], start: number, end: number): void => {
  for (let i = start + 1; i < end; i++) {
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
};

const reverse = (array: number[], start: number, end: number): void => {
  let i = start;
  let j = end - 1;
  while (i < j) {
    swap(array, i, j);
    recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: j });
    i++;
    j--;
  }
};

const detectRuns = (array: number[], minRun: number): Run[] => {
  const n = array.length;
  const stack: Run[] = [];
  let start = 0;

  while (start < n) {
    let end = start + 1;

    if (end >= n) {
      stack.push({ start, end });
      break;
    }

    const isAscending = array[start] <= array[end];
    if (isAscending) {
      while (end < n && array[end - 1] <= array[end]) end++;
    } else {
      while (end < n && array[end - 1] > array[end]) end++;
      reverse(array, start, end);
    }

    const runLen = end - start;
    if (runLen < minRun) {
      const newEnd = Math.min(n, start + minRun);
      insertionSort(array, start, newEnd);
      end = newEnd;
    }

    stack.push({ start, end });
    fixInvariants(array, stack);
    start = end;
  }

  return stack;
};

export const timSort = (array: number[]): void => {
  const MIN_RUN = 32;
  const runs = detectRuns(array, MIN_RUN);

  while (runs.length > 1) {
    const B = runs.pop()!;
    const A = runs.pop()!;
    const merged = merge(array, A, B);
    runs.push(merged);
  }
};