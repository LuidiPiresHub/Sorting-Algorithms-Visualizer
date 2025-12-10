import { binaryInsertionSort } from './binaryInsertionSort';
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
import { radixSort } from './radixSort';
import { selectionSort } from './selectionSort';
import { shellSort } from './shellSort';
import { timSort } from './timSort';

export const algorithms = {
  'Binary Insertion Sort': binaryInsertionSort,
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
  'Radix Sort ( LSD - Base 4 )': radixSort,
  'Selection Sort': selectionSort,
  'Shell Sort': shellSort,
  'Tim Sort': timSort,
}

export type IAlgorithm = keyof typeof algorithms;
