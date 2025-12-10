import { recordTransitionFrame } from '../animation/animateTransition';

export const ascending = (array: number[]): void => {
  const n = array.length;

  for (let i = 0; i < n; i++) {
    const value = i + 1;
    array[i] = value;
    recordTransitionFrame({ type: 'set', index: i, value });
  }
};
