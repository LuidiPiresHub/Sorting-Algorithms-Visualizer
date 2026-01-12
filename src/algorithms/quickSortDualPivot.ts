import { swap } from '../utils/swap';
import { recordAlgorithmFrame } from '../animation/recordFrame';

const insertionSortSample = (array: number[]): void => {
  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
}

const chooseDualPivots = (array: number[], left: number, right: number): [number, number] => {
  const size = right - left + 1;

  const idx = [
    left,
    left + Math.floor(size * 0.25),
    left + Math.floor(size * 0.5),
    left + Math.floor(size * 0.75),
    right,
  ];

  const sample = idx.map((i) => array[i]);
  insertionSortSample(sample);

  const p1 = sample[1];
  const p2 = sample[3];

  return p1 <= p2 ? [p1, p2] : [p2, p1];
}

export const quickSortDualPivot = (array: number[]): void => {
  const stack: Array<[number, number]> = [];
  stack.push([0, array.length - 1]);

  while (stack.length) {
    const [left, right] = stack.pop()!;
    if (left >= right) continue;

    const [p1, p2] = chooseDualPivots(array, left, right);

    const p1Index = left;
    const p2Index = right;

    for (let i = left; i <= right; i++) {
      if (array[i] === p1) {
        swap(array, i, p1Index);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: p1Index });
        break;
      }
    }
    
    for (let i = right; i >= left; i--) {
      if (array[i] === p2) {
        swap(array, i, p2Index);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: p2Index });
        break;
      }
    }

    let lt = left + 1;
    let gt = right - 1;
    let i = lt;

    while (i <= gt) {
      if (array[i] < p1) {
        swap(array, i, lt);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: lt });
        lt++;
        i++;
      } else if (array[i] > p2) {
        swap(array, i, gt);
        recordAlgorithmFrame({ type: 'swap', indexA: i, indexB: gt });
        gt--;
      } else {
        i++;
      }
    }

    lt--;
    gt++;

    swap(array, left, lt);
    recordAlgorithmFrame({ type: 'swap', indexA: left, indexB: lt });
    swap(array, right, gt);
    recordAlgorithmFrame({ type: 'swap', indexA: right, indexB: gt });

    stack.push([gt + 1, right]);
    stack.push([lt + 1, gt - 1]);
    stack.push([left, lt - 1]);
  }
}
