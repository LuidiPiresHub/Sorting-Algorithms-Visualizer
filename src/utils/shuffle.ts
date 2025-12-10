import { recordTransitionFrame } from '../animation/animateTransition';
import { swap } from './swap';

export const shuffle = (array: number[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
    recordTransitionFrame({ type: 'swap', indexA: i, indexB: j });
  }
}
