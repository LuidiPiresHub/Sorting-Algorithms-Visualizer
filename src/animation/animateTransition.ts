import type { IAnimateTransition, IFrame } from '../interfaces/animation';
import { swap } from '../utils/swap';

const frames: IFrame[] = [];

export const recordTransitionFrame = (frame: IFrame): void => {
  frames.push(frame);
};

export const animateTransition = ({ ctx, array, optionsRef, duration } : IAnimateTransition): Promise<void> => {
  return new Promise((resolve) => {
    const n = frames.length;
    let start: number | null = null;
    let lastIdx = 0;

    const step = (time: number): void => {
      if (!optionsRef.current.rafId) {
        frames.length = 0;
        return;
      }
      
      if (!start) start = time;

      const progress = Math.min((time - start) / duration, 1);
      const idx = Math.floor(progress * n);

      while (lastIdx < idx) {
        const f = frames[lastIdx];
        if (f.type === 'swap') swap(array, f.indexA, f.indexB);
        if (f.type === 'set') array[f.index] = f.value;
        lastIdx++;
      }

      optionsRef.current.drawFn({ ctx, array, optionsRef });

      if (progress < 1) {
        optionsRef.current.rafId = requestAnimationFrame(step);
      } else {
        frames.length = 0;
        resolve();
      }
    };

    optionsRef.current.rafId = requestAnimationFrame(step);
  })
};
