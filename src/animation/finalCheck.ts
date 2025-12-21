import { recordAlgorithmFrame } from './recordFrame';

export const finalCheck = (array: number[]): void => {
  for (let i = 0; i < array.length; i++) {
    recordAlgorithmFrame({ type: 'check', index: i })
  }
};
