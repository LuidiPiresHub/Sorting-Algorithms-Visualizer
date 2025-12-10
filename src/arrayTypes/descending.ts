import { recordTransitionFrame } from '../animation/animateTransition';

export const descending = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    const value = n - i;
    array[i] = value;
    recordTransitionFrame({ type: 'set', index: i, value });
  }
};
