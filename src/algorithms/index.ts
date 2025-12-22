import { bubbleSort } from './bubbleSort';
import { cocktailShakerSort } from './cocktailShakerSort';
import { combSort } from './combSort';
import { countingSort } from './countingSort';
import { doubleSelectionSort } from './doubleSelectionSort';
import { heapSort } from './heapSort';
import { insertionSort } from './insertionSort';
import { introSort } from './introSort';
import { mergeSortBottomUp } from './mergeSortBottomUp';
import { mergeSortTopDown } from './mergeSortTopDown';
import { oddEvenSort } from './oddEvenSort';
import { quickSortLL } from './quickSortLL';
import { quickSortLR } from './quickSortLR';
import { radixSortLSD } from './radixSortLSD';
import { radixSortMSD } from './radixSortMSD';
import { selectionSort } from './selectionSort';
import { shellSort } from './shellSort';
import { timSort } from './timSort';

type IAlgorithmFn = (array: number[], base?: number) => void;

export const algorithmsMap = {
  'Bubble Sort': bubbleSort,
  'Cocktail Shaker Sort': cocktailShakerSort,
  'Comb Sort': combSort,
  'Counting Sort': countingSort,
  'Double Selection Sort': doubleSelectionSort,
  'Heap Sort': heapSort,
  'Insertion Sort': insertionSort,
  'Intro Sort': introSort,
  'Merge Sort ( Bottom-Up )': mergeSortBottomUp,
  'Merge Sort ( Top-Down )': mergeSortTopDown,
  'Odd-Even Sort': oddEvenSort,
  'Quick Sort ( LL Pointers )': quickSortLL,
  'Quick Sort ( LR Pointers )': quickSortLR,
  'Radix Sort ( LSD )': radixSortLSD,
  'Radix Sort ( MSD )': radixSortMSD,
  'Selection Sort': selectionSort,
  'Shell Sort': shellSort,
  'Tim Sort': timSort,
} satisfies Record<string, IAlgorithmFn>;


export type IAlgorithm = keyof typeof algorithmsMap;
