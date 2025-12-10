import { recordTransitionFrame } from '../animation/animateTransition';
import { swap } from '../utils/swap';

export const semi = (array: number[]): void => {
  const n = array.length;
  const half = Math.floor(n * 0.5);

  for (let i = 0; i < half; i++) {
    const value = i + 1;
    array[i] = value;
    recordTransitionFrame({ type: 'set', index: i, value });
  }

  for (let i = n - 1; i > half; i--) {
    const j = half + Math.floor(Math.random() * (n - half));
    swap(array, i, j);
    recordTransitionFrame({ type: 'swap', indexA: i, indexB: j });
  }
};
