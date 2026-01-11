import type { RefObject } from 'react';
import type { IAnimationOptions } from '../interfaces/animation';

export const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export const animationDelay = (ms: number, optionsRef: RefObject<IAnimationOptions>): Promise<void> => {
  return new Promise((resolve) => {
    let start = 0;

    const step = (time: number) => {
      if (!optionsRef.current.isAnimating) {
        resolve();
        return;
      }

      if (!start) start = time;

      if (time - start >= ms) {
        resolve();
        return;
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  });
};
